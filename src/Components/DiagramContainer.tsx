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

        // Ensure SVG is responsive and centered
        svgElement.setAttribute("width", "100%");
        svgElement.setAttribute("height", "100%");
        svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");

        // Add basic centering style
        const existingStyle = svgElement.getAttribute("style") || "";
        svgElement.setAttribute(
          "style",
          existingStyle + "; display: block; margin: 0 auto;"
        );

        // Reduce line thickness and maintain consistent stroke width
        function processStrokeWidths(element: Element) {
          // Process stroke-width attribute
          if (element.hasAttribute("stroke-width")) {
            const currentWidth = parseFloat(
              element.getAttribute("stroke-width") || "1"
            );
            element.setAttribute("stroke-width", String(currentWidth / 2));

            // Add vector-effect to ensure consistent stroke width
            element.setAttribute("vector-effect", "non-scaling-stroke");
          }

          // Process stroke-width in style attribute
          if (element.hasAttribute("style")) {
            let styleAttr = element.getAttribute("style") || "";
            styleAttr = styleAttr.replace(
              /stroke-width\s*:\s*([0-9.]+)([a-z%]*)/g,
              (match, width, unit) => {
                const halfWidth = parseFloat(width) / 2;
                return `stroke-width:${halfWidth}${unit}`;
              }
            );
            element.setAttribute("style", styleAttr);
          }

          // If element has a stroke but no stroke-width, add a default half-thickness
          if (
            element.hasAttribute("stroke") &&
            !element.hasAttribute("stroke-width")
          ) {
            element.setAttribute("stroke-width", "0.5"); // Default half thickness
            element.setAttribute("vector-effect", "non-scaling-stroke");
          }

          // Process all child elements recursively
          for (let i = 0; i < element.children.length; i++) {
            processStrokeWidths(element.children[i]);
          }
        }

        // Process CSS in style elements
        const styleElements = svgDoc.querySelectorAll("style");
        styleElements.forEach((style) => {
          let cssText = style.textContent || "";
          // Replace stroke-width in CSS
          cssText = cssText.replace(
            /stroke-width\s*:\s*([0-9.]+)([a-z%]*)/g,
            (match, width, unit) => {
              const halfWidth = parseFloat(width) / 2;
              return `stroke-width:${halfWidth}${unit}; vector-effect:non-scaling-stroke`;
            }
          );
          style.textContent = cssText;
        });

        // Start processing from the SVG root
        processStrokeWidths(svgElement);

        // Convert the modified SVG back to a string
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
