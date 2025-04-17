import React from "react";

interface SVGDisplayProps {
  svgPath: string;
}

const SVGDisplay: React.FC<SVGDisplayProps> = ({ svgPath }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <img
        src={svgPath}
        alt="SVG Display"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
};

export default SVGDisplay;
