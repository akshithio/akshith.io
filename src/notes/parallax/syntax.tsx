import type { ReactNode } from "react";

// A small tokenizer for the code blocks in the Parallax note. It covers the
// TypeScript and JavaScript the post quotes: comments, strings, template
// literals, regular expressions, numbers, keywords and types. Anything it does
// not recognise is emitted as plain text, so a miss shows as black code.

type Token = { text: string; color?: string };

const COMMENT = "#6f6f78";
const STRING = "#1f7a46";
const KEYWORD = "#8757ec";
const NUMBER = "#b4610f";
const TYPE = "#1f5fd0";
const REGEX = "#c2373c";

const KEYWORDS = new Set([
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "for",
  "of",
  "in",
  "while",
  "do",
  "switch",
  "case",
  "break",
  "continue",
  "new",
  "try",
  "catch",
  "finally",
  "throw",
  "typeof",
  "instanceof",
  "delete",
  "void",
  "await",
  "async",
  "export",
  "import",
  "from",
  "class",
  "extends",
  "interface",
  "type",
  "implements",
  "public",
  "private",
  "readonly",
  "true",
  "false",
  "null",
  "undefined",
  "this",
]);

const TYPES = new Set([
  "string",
  "number",
  "boolean",
  "any",
  "unknown",
  "never",
  "void",
  "Array",
  "Record",
  "Promise",
  "Math",
  "Object",
  "JSON",
  "RegExp",
  "Set",
  "Map",
]);

const IDENTIFIER = /[A-Za-z_$][\w$]*/y;
const NUMERIC = /\d[\d_.]*/y;
const WHITESPACE = /\s+/y;
// A slash starts a regular expression when the previous token is an operator,
// a keyword or an opening bracket; after a value it is division.
const REGEX_ALLOWED_BEFORE = /[=(,:[!&|?{};+\-*%<>~^]$/;

function readQuoted(source: string, start: number, quote: string): number {
  let index = start + 1;
  while (index < source.length) {
    const char = source[index];
    if (char === "\\") {
      index += 2;
      continue;
    }
    if (char === quote) return index + 1;
    if (char === "\n" && quote !== "`") return index;
    index += 1;
  }
  return source.length;
}

function readRegex(source: string, start: number): number | null {
  let index = start + 1;
  let inClass = false;
  while (index < source.length) {
    const char = source[index];
    if (char === "\\") {
      index += 2;
      continue;
    }
    if (char === "\n") return null;
    if (char === "[") inClass = true;
    else if (char === "]") inClass = false;
    else if (char === "/" && !inClass) {
      index += 1;
      while (index < source.length && /[a-z]/.test(source[index] ?? ""))
        index += 1;
      return index;
    }
    index += 1;
  }
  return null;
}

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let index = 0;
  let previous = "";
  const push = (text: string, color?: string) => {
    if (!text) return;
    tokens.push({ text, color });
    const trimmed = text.trim();
    if (trimmed) previous = trimmed;
  };

  while (index < source.length) {
    const rest = source.slice(index);

    WHITESPACE.lastIndex = 0;
    const space = WHITESPACE.exec(rest);
    if (space) {
      tokens.push({ text: space[0] });
      index += space[0].length;
      continue;
    }

    if (rest.startsWith("//")) {
      const end = rest.indexOf("\n");
      const text = end === -1 ? rest : rest.slice(0, end);
      push(text, COMMENT);
      index += text.length;
      continue;
    }

    if (rest.startsWith("/*")) {
      const end = rest.indexOf("*/");
      const text = end === -1 ? rest : rest.slice(0, end + 2);
      push(text, COMMENT);
      index += text.length;
      continue;
    }

    const char = rest[0] ?? "";

    if (char === '"' || char === "'" || char === "`") {
      const end = readQuoted(source, index, char);
      push(source.slice(index, end), STRING);
      index = end;
      continue;
    }

    if (
      char === "/" &&
      (previous === "" ||
        REGEX_ALLOWED_BEFORE.test(previous) ||
        KEYWORDS.has(previous))
    ) {
      const end = readRegex(source, index);
      if (end !== null) {
        push(source.slice(index, end), REGEX);
        index = end;
        continue;
      }
    }

    NUMERIC.lastIndex = 0;
    const numeric = NUMERIC.exec(rest);
    if (numeric && /\d/.test(char)) {
      push(numeric[0], NUMBER);
      index += numeric[0].length;
      continue;
    }

    IDENTIFIER.lastIndex = 0;
    const identifier = IDENTIFIER.exec(rest);
    if (identifier) {
      const word = identifier[0];
      push(
        word,
        KEYWORDS.has(word) ? KEYWORD : TYPES.has(word) ? TYPE : undefined,
      );
      index += word.length;
      continue;
    }

    push(char);
    index += 1;
  }

  return tokens;
}

/** Highlights a TypeScript or JavaScript snippet. */
export function highlightCode(source: string): ReactNode[] {
  return tokenize(source).map((token, position) =>
    token.color ? (
      <span key={position} style={{ color: token.color }}>
        {token.text}
      </span>
    ) : (
      <span key={position}>{token.text}</span>
    ),
  );
}

/** Highlights the prompt excerpts: {plx:…} tags and nothing else. */
export function highlightPrompt(source: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const tag = /\{\s*\/?\s*plx:[a-z]+[^}]*\}/g;
  let cursor = 0;
  for (const match of source.matchAll(tag)) {
    const index = match.index ?? 0;
    if (index > cursor)
      nodes.push(<span key={`t${index}`}>{source.slice(cursor, index)}</span>);
    nodes.push(
      <span key={index} style={{ color: TYPE }}>
        {match[0]}
      </span>,
    );
    cursor = index + match[0].length;
  }
  if (cursor < source.length)
    nodes.push(<span key="tail">{source.slice(cursor)}</span>);
  return nodes;
}

/**
 * Highlights the WebSocket message table: the direction, the JSON message and
 * the description on each line, in the keyword, code and comment colours.
 */
export function highlightMessages(source: string): ReactNode[] {
  return source.split("\n").flatMap((line, row) => {
    const match = /^(\S+ → \S+)(\s+)(\{.*\})(\s+)(.*)$/.exec(line);
    const end = row < source.split("\n").length - 1 ? "\n" : "";
    if (!match) return [<span key={row}>{line + end}</span>];
    const [, direction, gapA, message, gapB, note] = match;
    return [
      <span key={`${row}d`} style={{ color: KEYWORD }}>
        {direction}
      </span>,
      <span key={`${row}a`}>{gapA}</span>,
      <span key={`${row}m`}>{highlightCode(message ?? "")}</span>,
      <span key={`${row}b`}>{gapB}</span>,
      <span key={`${row}n`} style={{ color: COMMENT }}>
        {note + end}
      </span>,
    ];
  });
}
