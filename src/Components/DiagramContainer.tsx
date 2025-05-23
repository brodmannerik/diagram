import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export type DiagramType = "main" | "alternative1" | "alternative2";
type Language = "en" | "de";

export interface DiagramProps {
  className?: string;
  diagramType?: DiagramType;
  language?: Language;
  isColored?: boolean;
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
  const navigate = useNavigate(); // Add this for navigation

  useEffect(() => {
    // Use the new relations.svg file
    const svgFile = "/relations.svg";

    fetch(svgFile)
      .then((response) => response.text())
      .then((text) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, "image/svg+xml");
        const svgElement = svgDoc.documentElement;

        // Setup proper sizing and positioning with slightly reduced size
        svgElement.setAttribute("width", "120%"); // Reduced from 140%
        svgElement.setAttribute("height", "120%"); // Reduced from 140%

        // Keep meet aspect ratio but allow it to be larger than container
        svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");

        // Keep original viewBox or create one if missing
        if (!svgElement.hasAttribute("viewBox")) {
          const width = svgElement.getAttribute("width") || "800";
          const height = svgElement.getAttribute("height") || "600";
          svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`);
        }

        // Add basic styling with slightly reduced scale
        const existingStyle = svgElement.getAttribute("style") || "";
        svgElement.setAttribute(
          "style",
          existingStyle +
            "; display: block; margin: 0 auto; transform: scale(1.3); transform-origin: center center;"
        );

        // Process text elements for better rendering with smaller increase
        const textElements = svgDoc.querySelectorAll("text");
        textElements.forEach((text) => {
          text.setAttribute("font-weight", "300");
          text.setAttribute("text-rendering", "optimizeLegibility");

          // Make text slightly larger, but less than before
          const currentSize = text.getAttribute("font-size") || "12";
          const newSize = parseInt(currentSize) * 1.1;
          text.setAttribute("font-size", newSize.toString());
        });

        // Convert the modified SVG back to a string
        const serializer = new XMLSerializer();
        const modifiedSvgString = serializer.serializeToString(svgDoc);

        setSvgContent(modifiedSvgString);
      })
      .catch((error) => {
        console.error("Error loading SVG:", error);
      });
  }, [diagramType, language]);

  // Add this new effect to handle clicks after the SVG is loaded
  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    // Wait a bit for the SVG to be fully rendered in the DOM
    const timer = setTimeout(() => {
      const svgContainer = containerRef.current?.querySelector("svg");
      if (!svgContainer) return;

      // Function to check text and determine which group it belongs to
      const getGroupId = (text) => {
        text = text.toLowerCase();
        if (text.includes("anastasia") || text.includes("settler"))
          return "settler";
        if (text.includes("esoteric") || text.includes("right-wing"))
          return "esoteric";
        if (text.includes("conspir")) return "conspiricists";
        if (text.includes("reich") || text.includes("citizen")) return "reich";
        if (text.includes("nazi")) return "nazis";
        return null;
      };

      // Add click handlers to both text elements and their parent groups
      const allElements = svgContainer.querySelectorAll("*");
      allElements.forEach((el) => {
        // Check text content
        const text = el.textContent?.trim() || "";
        const groupId = getGroupId(text);

        if (groupId) {
          // Find the parent rect or group for this text
          let targetElement = el;
          let parent = el.parentElement;

          // Look for a good clickable parent
          while (parent && parent.tagName !== "svg") {
            if (parent.tagName === "g" || parent.tagName === "rect") {
              targetElement = parent;
              break;
            }
            parent = parent.parentElement;
          }

          // Make the element clickable
          targetElement.style.cursor = "pointer";
          targetElement.addEventListener("click", () => {
            console.log(`Clicked on ${groupId}`);
            navigate(`/research/${groupId}`);
          });
        }

        // Also check for rectangle elements with specific fill colors or other attributes
        if (el.tagName === "rect") {
          // Save the original styles
          const originalFill = el.getAttribute("fill");
          const originalStroke = el.getAttribute("stroke");

          // Check if this rect has nearby text that indicates a group
          const parentGroup = el.parentElement;
          if (parentGroup) {
            const nearbyTexts = Array.from(
              parentGroup.querySelectorAll("text")
            ).map((text) => text.textContent?.trim() || "");

            for (const text of nearbyTexts) {
              const groupId = getGroupId(text);
              if (groupId) {
                // Make this rect clickable
                el.style.cursor = "pointer";
                el.addEventListener("click", () => {
                  console.log(`Clicked on ${groupId} (from rect)`);
                  navigate(`/research/${groupId}`);
                });

                // Add hover effect
                el.addEventListener("mouseenter", () => {
                  el.setAttribute("fill-opacity", "0.8");
                  el.setAttribute("stroke-width", "2");
                });

                el.addEventListener("mouseleave", () => {
                  el.setAttribute("fill-opacity", "1");
                  el.setAttribute("stroke-width", "1");
                });

                break;
              }
            }
          }
        }
      });
    }, 200); // Small delay to ensure SVG is in the DOM

    return () => clearTimeout(timer);
  }, [svgContent, navigate]);

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
            overflow: "hidden",
          }}
        />
      ) : (
        <div>Loading diagram...</div>
      )}
    </div>
  );
};

export default DiagramContainer;
