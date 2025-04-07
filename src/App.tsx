import { useState } from "react";

export default function RandomColor(): JSX.Element {
  const [typeOfColor, setTypeOfColor] = useState<"hex" | "rgb">("hex");
  const [color, setColor] = useState<string>("#000000");

  function randomColorUtility(length: number): number {
    return Math.floor(Math.random() * length);
  }

  function handleCreateRandomHexColor(): void {
    const hex: (number | string)[] = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUtility(hex.length)];
    }
    setColor(hexColor);
  }

  function handleCreateRandomRgbColor(): void {
    const r: number = randomColorUtility(256);
    const g: number = randomColorUtility(256);
    const b: number = randomColorUtility(256);
    setColor(`rgb(${r},${g},${b})`);
  }

  function handleGenerateColor(): void {
    if (typeOfColor === "hex") {
      handleCreateRandomHexColor();
    } else {
      handleCreateRandomRgbColor();
    }
  }

  function getTextColor(bg: string): string {
    if (bg.startsWith("#")) {
      const hex = bg.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 155 ? "#000" : "#fff";
    } else if (bg.startsWith("rgb")) {
      const rgb = bg.match(/\d+/g);
      if (!rgb) return "#fff";
      const [r, g, b] = rgb.map(Number);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 155 ? "#000" : "#fff";
    }
    return "#fff";
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: color,
        transition: "background 0.3s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          paddingTop: "20px",
        }}
      >
        <button onClick={() => setTypeOfColor("hex")}>Use HEX</button>
        <button onClick={() => setTypeOfColor("rgb")}>Use RGB</button>
        <button onClick={handleGenerateColor}>Generate Random Color</button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: getTextColor(color),
          fontSize: "60px",
          marginTop: "50px",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h3>{typeOfColor === "rgb" ? "RGB Color" : "HEX Color"}</h3>
        <h1>{color}</h1>
      </div>
    </div>
  );
}
