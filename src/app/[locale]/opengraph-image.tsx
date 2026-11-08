import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Akram Aldwikat — Full-Stack Software Engineer";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "74px",
        background: "#f6f7f2",
        color: "#142b24",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, letterSpacing: 2 }}>
        AKRAM ALDWIKAT
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 76,
          lineHeight: 1.1,
          maxWidth: 1000,
        }}
      >
        Software that solves real business problems.
      </div>
      <div style={{ display: "flex", fontSize: 26, color: "#37634e" }}>
        Full-Stack Engineering · Business Systems · APIs
      </div>
    </div>,
    size,
  );
}
