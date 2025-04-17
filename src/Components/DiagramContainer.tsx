import React, { useEffect, useState, useRef } from "react";

export type DiagramType = "main" | "alternative1" | "alternative2";
type Language = "en" | "de";

export interface DiagramProps {
  className?: string;
  diagramType?: DiagramType;
  language?: Language;
}

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
    // Fetch the SVG file
    fetch("/svg-for-web.svg")
      .then((response) => response.text())
      .then((text) => {
        // Parse the SVG content
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, "image/svg+xml");
        const svgElement = svgDoc.documentElement;

        // Make sure SVG has proper sizing attributes
        svgElement.setAttribute("width", "100%");
        svgElement.setAttribute("height", "100%");
        svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");

        // Find and modify all style elements in the SVG - more selective approach
        const styleElements = svgDoc.querySelectorAll("style");
        styleElements.forEach((style) => {
          let cssText = style.textContent || "";
          // Keep "none" values intact, only change actual colors
          cssText = cssText.replace(
            /fill:\s*#[0-9a-fA-F]{3,6}/g,
            "fill: #0000FF"
          );
          cssText = cssText.replace(
            /stroke:\s*#[0-9a-fA-F]{3,6}/g,
            "stroke: #0000FF"
          );
          style.textContent = cssText;
        });

        // Process all elements with a more selective approach
        function processElement(element: Element) {
          // For fill attributes - only change if it's an actual color (not none/transparent)
          if (
            element.hasAttribute("fill") &&
            element.getAttribute("fill") !== "none" &&
            element.getAttribute("fill") !== "transparent" &&
            element.getAttribute("fill")?.startsWith("#")
          ) {
            element.setAttribute("fill", "#0000FF");
          }

          // For stroke attributes - only change if it's an actual color
          if (
            element.hasAttribute("stroke") &&
            element.getAttribute("stroke") !== "none" &&
            element.getAttribute("stroke") !== "transparent" &&
            element.getAttribute("stroke")?.startsWith("#")
          ) {
            element.setAttribute("stroke", "#0000FF");
          }

          // Handle style attribute - be selective about what we change
          if (element.hasAttribute("style")) {
            let styleAttr = element.getAttribute("style") || "";
            // Only replace actual color values, not 'none' or other values
            styleAttr = styleAttr.replace(
              /fill:\s*#[0-9a-fA-F]{3,6}/g,
              "fill: #0000FF"
            );
            styleAttr = styleAttr.replace(
              /stroke:\s*#[0-9a-fA-F]{3,6}/g,
              "stroke: #0000FF"
            );
            element.setAttribute("style", styleAttr);
          }

          // Element-specific handling
          switch (element.tagName.toLowerCase()) {
            case "text":
              // For text, we typically want to change the fill (text color)
              if (
                !element.hasAttribute("fill") ||
                element.getAttribute("fill") === "black"
              ) {
                element.setAttribute("fill", "#0000FF");
              }
              break;

            case "path":
            case "line":
            case "polyline":
              // For line elements, prioritize stroke over fill
              if (
                !element.hasAttribute("stroke") &&
                !element.hasAttribute("fill")
              ) {
                element.setAttribute("stroke", "#0000FF");
              }
              break;

            case "rect":
            case "circle":
            case "ellipse":
            case "polygon":
              // For shape elements, add blue stroke if no styling is present
              if (
                !element.hasAttribute("stroke") &&
                !element.hasAttribute("fill")
              ) {
                element.setAttribute("stroke", "#0000FF");
                element.setAttribute("fill", "none");
              }
              break;
          }

          // Process all child elements recursively
          for (let i = 0; i < element.children.length; i++) {
            processElement(element.children[i]);
          }
        }

        // Start processing from the SVG root element
        processElement(svgElement);

        // Convert the modified SVG back to a string
        const serializer = new XMLSerializer();
        const modifiedSvgString = serializer.serializeToString(svgDoc);

        // Set the modified SVG content
        setSvgContent(modifiedSvgString);
      })
      .catch((error) => {
        console.error("Error loading SVG:", error);
      });
  }, []);

  // Enhanced rendering with fallback
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
        <div style={{ color: "#0000FF" }}>Loading diagram...</div>
      )}
    </div>
  );
};

export default DiagramContainer;
