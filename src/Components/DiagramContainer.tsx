import React from "react";

// Define DiagramType directly here since import is failing
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

const svgStyle = {
  width: "100%",
  height: "100%",
  maxWidth: "98vw",
  maxHeight: "90vh",
  objectFit: "contain" as const,
};

const DiagramContainer: React.FC<DiagramProps> = ({
  className = "",
  diagramType = "main",
  language = "en",
}) => {
  console.log(
    "DiagramContainer rendering with type:",
    diagramType,
    "language:",
    language
  );

  // For now, always display the SVG from the public folder
  // We can ignore diagramType temporarily
  return (
    <div className={`diagram-container ${className}`} style={containerStyle}>
      {/* Using object tag to maintain SVG interactivity */}
      <object
        type="image/svg+xml"
        data="/svg-for-web.svg"
        style={svgStyle}
        aria-label="Diagram"
      >
        Your browser does not support SVG
      </object>
    </div>
  );
};

export default DiagramContainer;
