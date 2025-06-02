"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

function SaplingWindow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const { resolvedTheme } = useTheme();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [shouldLoad, setShouldLoad] = useState(false);

  const treeDataRef = useRef<{
    sentence: string;
    baseLen: number;
    initialTilt: number;
    xOffset: number;
    angle: number;
  }>();

  const noiseRef = useRef(0);

  const checkScreenSize = useCallback(() => {
    const width = window.innerWidth;
    const shouldShow = width > 768;
    setShouldLoad(shouldShow);

    setWindowSize({
      width: width,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [checkScreenSize]);

  const noise = useCallback((x: number) => {
    return Math.sin(x) * 0.5 + 0.5;
  }, []);

  const generateTree = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;

    const axiom = "-X";
    let sentence = axiom;
    const rules: { [key: string]: string } = {
      X: "F+[[X]-X]-F[-FX]+X",
      F: "FF",
    };

    let len = 400;
    const angle = (Math.PI / 180) * 25;
    let generation = 0;
    const targetGenerations = 7;

    const minDimension = Math.min(canvasWidth, canvasHeight);
    const scaleFactor = 0.46;
    len = minDimension * scaleFactor;

    const initialTilt =
      canvasWidth > 1200 && canvasWidth > canvasHeight
        ? (-15 * Math.PI) / 180
        : 0;

    const shouldShiftRight =
      windowSize.width >= 1024 && windowSize.width <= 1500;
    const xOffset = shouldShiftRight ? 400 : 600;

    while (generation < targetGenerations) {
      len *= 0.5;
      let nextSentence = "";
      for (let i = 0; i < sentence.length; i++) {
        const char = sentence[i];
        nextSentence += rules[char as string] || char;
      }
      sentence = nextSentence;
      generation++;
    }

    treeDataRef.current = {
      sentence,
      baseLen: len,
      initialTilt,
      xOffset,
      angle,
    };
  }, [windowSize]);

  const animate = useCallback(() => {
    if (!canvasRef.current || !treeDataRef.current || !shouldLoad) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const rect = canvas.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    const { sentence, baseLen, initialTilt, xOffset, angle } =
      treeDataRef.current;

    const treeColor = resolvedTheme === "dark" ? "#6B8E23" : "#228B23";
    const bgColor = resolvedTheme === "dark" ? "#111" : "#eee";

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.strokeStyle = treeColor;
    ctx.lineWidth = 1;

    const targetGenerations = 7;
    const segments: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }> = [];

    const stack: Array<{
      x: number;
      y: number;
      angle: number;
      len: number;
      depth: number;
      windOffset: number;
    }> = [];

    let x = canvasWidth - xOffset;
    let y = canvasHeight;
    let currentAngle = initialTilt - Math.PI / 2;
    let currentLen = baseLen;
    let currentDepth = 0;
    let windOffset = 0;

    for (let i = 0; i < sentence.length; i++) {
      const char = sentence[i];

      if (char === "F") {
        let windAngle =
          noise(noiseRef.current + baseLen / 100 + windOffset) * 11.2;

        let windIntensity = Math.min(currentDepth / targetGenerations, 1);
        windIntensity = windIntensity * windIntensity;

        windAngle *= windIntensity;
        windAngle = (windAngle * Math.PI) / 180;

        const finalAngle = currentAngle + windAngle;
        const x2 = x + Math.cos(finalAngle) * currentLen;
        const y2 = y + Math.sin(finalAngle) * currentLen;

        segments.push({ x1: x, y1: y, x2: x2, y2: y2 });

        x = x2;
        y = y2;
        windOffset += windAngle * 0.07;
      } else if (char === "+") {
        currentAngle += angle;
      } else if (char === "-") {
        currentAngle -= angle;
      } else if (char === "[") {
        stack.push({
          x: x,
          y: y,
          angle: currentAngle,
          len: currentLen,
          depth: currentDepth,
          windOffset: windOffset,
        });
        currentDepth++;
      } else if (char === "]") {
        if (stack.length > 0) {
          const state = stack.pop()!;
          x = state.x;
          y = state.y;
          currentAngle = state.angle;
          currentLen = state.len;
          currentDepth = state.depth;
          windOffset = state.windOffset;
        }
        currentDepth--;
      }
    }

    ctx.beginPath();
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      if (seg) {
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
      }
    }
    ctx.stroke();

    noiseRef.current += 0.007;

    animationRef.current = requestAnimationFrame(animate);
  }, [resolvedTheme, shouldLoad, noise]);

  const handleResize = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.parentElement!.getBoundingClientRect();

    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    generateTree();
  }, [generateTree]);

  useEffect(() => {
    if (!shouldLoad || !canvasRef.current) return;

    handleResize();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [shouldLoad, handleResize, animate]);

  if (!shouldLoad) {
    return null;
  }

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100vh" }} />;
}

export default SaplingWindow;
