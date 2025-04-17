import React, { useState } from "react";
import { Button, Flex } from "@radix-ui/themes";

const SVGSelector: React.FC = () => {
  const [selectedSVG, setSelectedSVG] = useState<string>(
    "public/svg-for-web.svg"
  );

  const svgOptions = [
    { label: "SVG for Web", value: "public/svg-for-web.svg" },
    { label: "Diagram 1", value: "public/other-diagrams/diagram1.svg" },
    { label: "Diagram 2", value: "public/other-diagrams/diagram2.svg" },
  ];

  const handleSVGChange = (value: string) => {
    setSelectedSVG(value);
  };

  return (
    <Flex direction="column" align="center" py="4">
      {svgOptions.map((option) => (
        <Button
          key={option.value}
          onClick={() => handleSVGChange(option.value)}
          style={{
            margin: "8px",
            backgroundColor: "#0000FF",
            color: "#FFFFFF",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {option.label}
        </Button>
      ))}
      <div style={{ marginTop: "20px" }}>
        <img
          src={selectedSVG}
          alt="Selected SVG"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
    </Flex>
  );
};

export default SVGSelector;
