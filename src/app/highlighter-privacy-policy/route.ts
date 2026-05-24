const policy = `Highlighter Privacy Policy

Effective date: May 23, 2026

Highlighter is a Chrome extension for highlighting text and saving private notes on webpages.

Data collection

Highlighter does not collect, sell, share, or transfer personal information.

The extension stores highlighted text, note text, selected highlight colors, page URLs, and per-domain enable or disable preferences locally in the browser's extension storage. This information stays on the user's device and is not sent to a server.

Highlighter does not use analytics, advertising, tracking pixels, remote logging, or third-party data processors.

Permissions

Highlighter requests browser permissions needed to provide its core features:

- activeTab, scripting, and host permissions allow the extension to add highlights and notes to webpages.
- storage allows highlights, notes, colors, and preferences to be saved locally.
- contextMenus allows highlight and note actions to appear in the browser context menu.

Highlighter only uses these permissions to provide the highlighting and note-taking features described in the extension.

Data sharing

Highlighter does not share user data with anyone.

Data deletion

Users can delete saved highlights and notes from the extension UI. Users can also remove all locally stored extension data by uninstalling the extension or clearing the extension's browser storage.

Limited use

Highlighter's use of information received from Google APIs will adhere to the Chrome Web Store User Data Policy, including the Limited Use requirements.

Contact

For questions about this privacy policy, contact the developer at mail@akshith.io.
`;

export function GET() {
  return new Response(policy, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
