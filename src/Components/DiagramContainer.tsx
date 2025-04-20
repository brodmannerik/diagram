import React, { useEffect, useState, useRef } from "react";

export type DiagramType = "main" | "alternative1" | "alternative2";
type Language = "en" | "de";

export interface DiagramProps {
  className?: string;
  diagramType?: DiagramType;
  language?: Language;
}

// Simple container style that centers content
const containerStyle = {
  width: "100%",
  height: "calc(100vh - 80px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  position: "relative" as const,
  zIndex: 1,
};

const DiagramContainer: React.FC<DiagramProps> = ({
  className = "",
  diagramType = "main",
  language = "en",
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch the new SVG file
    fetch("/my-diagram.svg")
      .then((response) => response.text())
      .then((text) => {
        // Parse the SVG content
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, "image/svg+xml");
        const svgElement = svgDoc.documentElement;

        // Simply ensure the SVG is responsive and centered
        svgElement.setAttribute("width", "100%");
        svgElement.setAttribute("height", "100%");
        svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");

        // Add basic centering style
        const existingStyle = svgElement.getAttribute("style") || "";
        svgElement.setAttribute(
          "style",
          existingStyle + "; display: block; margin: 0 auto;"
        );

        // Convert back to a string
        const serializer = new XMLSerializer();
        const modifiedSvgString = serializer.serializeToString(svgDoc);

        setSvgContent(modifiedSvgString);
      })
      .catch((error) => {
        console.error("Error loading SVG:", error);
      });
  }, []);

  return (
    <div
      className={`diagram-container ${className}`}
      style={containerStyle}
      ref={containerRef}
    >
      {svgContent ? (
        <div
          dangerouslySetInnerHTML={{ __html: svgContent }}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      ) : (
        <div>Loading diagram...</div>
      )}
    </div>
  );
};

export default DiagramContainer;
