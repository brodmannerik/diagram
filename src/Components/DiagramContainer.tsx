import React, { useEffect, useState, useRef } from "react";

export type DiagramType = "main" | "alternative1" | "alternative2";
type Language = "en" | "de";

export interface DiagramProps {
  className?: string;
  diagramType?: DiagramType;
  language?: Language;
  isColored?: boolean; // This prop now controls color conversion
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
  isColored = false, // Default to non-colored (convert to blue)
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Always use the colored SVG
    const svgFile = "/my-diagram-color.svg";

    fetch(svgFile)
      .then((response) => response.text())
      .then((text) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, "image/svg+xml");
        const svgElement = svgDoc.documentElement;

        // Store original viewBox and dimensions
        const originalViewBox = svgElement.getAttribute("viewBox");
        const originalWidth = svgElement.getAttribute("width");
        const originalHeight = svgElement.getAttribute("height");

        // Ensure we have a viewBox (needed for non-scaling-stroke to work properly)
        if (!originalViewBox && originalWidth && originalHeight) {
          // If no viewBox but has width/height, create one
          const width = parseFloat(originalWidth);
          const height = parseFloat(originalHeight);
          svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`);
        }

        // If not in colored mode, convert non-blue and non-black colors to blue
        if (!isColored) {
          // Process color attributes in SVG elements
          function processColors(element: Element) {
            // Process fill attributes
            if (element.hasAttribute("fill")) {
              const fill = element.getAttribute("fill");
              // Only change non-blue, non-black, and non-none fills
              if (
                fill !== "#0000FF" &&
                fill !== "blue" &&
                fill !== "#000000" &&
                fill !== "black" &&
                fill !== "none" &&
                fill !== "transparent"
              ) {
                element.setAttribute("fill", "#0000FF");
              }
            }

            // Process stroke attributes
            if (element.hasAttribute("stroke")) {
              const stroke = element.getAttribute("stroke");
              // Only change non-blue, non-black, and non-none strokes
              if (
                stroke !== "#0000FF" &&
                stroke !== "blue" &&
                stroke !== "#000000" &&
                stroke !== "black" &&
                stroke !== "none" &&
                stroke !== "transparent"
              ) {
                element.setAttribute("stroke", "#0000FF");
              }
            }

            // Process style attributes
            if (element.hasAttribute("style")) {
              let styleAttr = element.getAttribute("style") || "";

              // Process fill in style attribute
              styleAttr = styleAttr.replace(
                /fill\s*:\s*([^;]+)/g,
                (match, color) => {
                  // Keep blue, black, none, and transparent colors
                  if (
                    color.includes("blue") ||
                    color.includes("#0000FF") ||
                    color.includes("black") ||
                    color.includes("#000000") ||
                    color.includes("none") ||
                    color.includes("transparent")
                  ) {
                    return match;
                  }
                  return "fill: #0000FF";
                }
              );

              // Process stroke in style attribute
              styleAttr = styleAttr.replace(
                /stroke\s*:\s*([^;]+)/g,
                (match, color) => {
                  // Keep blue, black, none, and transparent colors
                  if (
                    color.includes("blue") ||
                    color.includes("#0000FF") ||
                    color.includes("black") ||
                    color.includes("#000000") ||
                    color.includes("none") ||
                    color.includes("transparent")
                  ) {
                    return match;
                  }
                  return "stroke: #0000FF";
                }
              );

              element.setAttribute("style", styleAttr);
            }

            // Process all child elements recursively
            for (let i = 0; i < element.children.length; i++) {
              processColors(element.children[i]);
            }
          }

          // Process CSS in style elements
          const styleElements = svgDoc.querySelectorAll("style");
          styleElements.forEach((style) => {
            let cssText = style.textContent || "";

            // Replace all colors except blue, black, none, and transparent
            // This regex is more complex to avoid capturing blue and black
            cssText = cssText.replace(
              /([^-])color\s*:\s*(?!blue|#0000FF|black|#000000|none|transparent)([^;]+)/g,
              "$1color: #0000FF"
            );

            cssText = cssText.replace(
              /([^-])fill\s*:\s*(?!blue|#0000FF|black|#000000|none|transparent)([^;]+)/g,
              "$1fill: #0000FF"
            );

            cssText = cssText.replace(
              /([^-])stroke\s*:\s*(?!blue|#0000FF|black|#000000|none|transparent)([^;]+)/g,
              "$1stroke: #0000FF"
            );

            style.textContent = cssText;
          });

          // Process all elements starting from the root
          processColors(svgElement);
        }

        // The viewBox is critical for non-scaling-stroke to work properly
        // Add custom CSS to enforce stroke width more aggressively
        const styleElement = svgDoc.createElementNS(
          "http://www.w3.org/2000/svg",
          "style"
        );
        styleElement.textContent = `
          * {
            vector-effect: non-scaling-stroke !important;
          }
          path, line, polyline, rect, circle, ellipse, polygon {
            vector-effect: non-scaling-stroke !important;
          }
        `;
        svgElement.appendChild(styleElement);

        // Set SVG to be responsive while preserving aspect ratio
        svgElement.setAttribute("width", "100%");
        svgElement.setAttribute("height", "100%");
        svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");

        // Add basic centering style
        const existingStyle = svgElement.getAttribute("style") || "";
        svgElement.setAttribute(
          "style",
          existingStyle + "; display: block; margin: 0 auto;"
        );

        // Apply your existing stroke processing code
        function processStrokeWidths(element: Element) {
          // Make sure all elements with strokes have vector-effect
          if (
            element.hasAttribute("stroke") ||
            element.tagName.toLowerCase() === "path" ||
            element.tagName.toLowerCase() === "line" ||
            element.tagName.toLowerCase() === "polyline" ||
            element.tagName.toLowerCase() === "rect" ||
            element.tagName.toLowerCase() === "circle" ||
            element.tagName.toLowerCase() === "ellipse" ||
            element.tagName.toLowerCase() === "polygon"
          ) {
            element.setAttribute("vector-effect", "non-scaling-stroke");
          }

          // Process stroke-width attribute - reduce to half
          if (element.hasAttribute("stroke-width")) {
            const currentWidth = parseFloat(
              element.getAttribute("stroke-width") || "1"
            );
            element.setAttribute("stroke-width", String(currentWidth / 2));
          }

          // Process stroke-width in style attribute
          if (element.hasAttribute("style")) {
            let styleAttr = element.getAttribute("style") || "";

            // Add vector-effect to inline style
            if (!styleAttr.includes("vector-effect")) {
              styleAttr += "; vector-effect: non-scaling-stroke";
            }

            // Reduce stroke width in inline style
            styleAttr = styleAttr.replace(
              /stroke-width\s*:\s*([0-9.]+)([a-z%]*)/g,
              (width, unit) => {
                const halfWidth = parseFloat(width) / 2;
                return `stroke-width:${halfWidth}${unit}`;
              }
            );

            element.setAttribute("style", styleAttr);
          }

          // If element has a stroke but no stroke-width, add a default half-thickness
          if (
            (element.hasAttribute("stroke") ||
              [
                "path",
                "line",
                "polyline",
                "rect",
                "circle",
                "ellipse",
                "polygon",
              ].includes(element.tagName.toLowerCase())) &&
            !element.hasAttribute("stroke-width")
          ) {
            element.setAttribute("stroke-width", "0.5"); // Default half thickness
          }

          // Process all child elements recursively
          for (let i = 0; i < element.children.length; i++) {
            processStrokeWidths(element.children[i]);
          }
        }

        // Process CSS in style elements for stroke width
        const existingStyleElements = svgDoc.querySelectorAll("style");
        existingStyleElements.forEach((style) => {
          let cssText = style.textContent || "";
          // Replace stroke-width in CSS
          cssText = cssText.replace(
            /stroke-width\s*:\s*([0-9.]+)([a-z%]*)/g,
            // @ts-ignore
            (match, width, unit) => {
              const halfWidth = parseFloat(width) / 2;
              return `stroke-width:${halfWidth}${unit}`;
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
  }, [diagramType, language, isColored]);

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
