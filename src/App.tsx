import { useState } from "react";
import { Button, Flex } from "@radix-ui/themes";
import { FileIcon } from "@radix-ui/react-icons";
import DiagramContainer, { DiagramType } from "./Components/DiagramContainer";

type Language = "en" | "de";

function App() {
  const [diagramType, setDiagramType] = useState<DiagramType>("main");
  const [language, setLanguage] = useState<Language>("en");

  const diagramLabels: Record<DiagramType, string> = {
    main: "Germanys Far Right",
    alternative1: "Alternative View 1",
    alternative2: "Alternative View 2",
  };

  const languageLabels: Record<Language, string> = {
    en: "Sprache", // Button shows German word when in English mode
    de: "Language", // Button shows English word when in German mode
  };

  // Handle paper button click
  const handlePaperClick = () => {
    console.log("Paper button clicked");
    // Add your functionality here
  };

  // Cycle through diagram types when button is clicked
  const handleButtonClick = () => {
    if (diagramType === "main") {
      console.log("Changing to alternative1");
      setDiagramType("alternative1");
    } else if (diagramType === "alternative1") {
      console.log("Changing to alternative2");
      setDiagramType("alternative2");
    } else {
      console.log("Changing to main");
      setDiagramType("main");
    }
  };

  // Toggle between languages
  const toggleLanguage = () => {
    console.log("Toggling language from", language);
    setLanguage((prev) => (prev === "en" ? "de" : "en"));
  };

  // Common button styling
  const buttonStyle = {
    padding: "16px 32px",
    borderRadius: "17.495px",
    fontSize: "18px",
    fontWeight: "400",
    zIndex: 1000,
    cursor: "pointer",
  };

  // Blue button style
  const blueButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#0000FF",
  };

  // White button style
  const whiteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#FFFFFF",
    color: "#0000FF",
    border: "1px solid #0000FF",
  };

  return (
    <>
      {/* Top header buttons */}
      <Flex
        width="100%"
        justify="between"
        py="4"
        px="4"
        style={{
          position: "relative",
          zIndex: 1000,
        }}
      >
        {/* Main button - cycles through diagrams */}
        <Button size="4" onClick={handleButtonClick} style={blueButtonStyle}>
          {diagramLabels[diagramType]}
        </Button>

        {/* Language toggle button */}
        <Button size="4" onClick={toggleLanguage} style={whiteButtonStyle}>
          {languageLabels[language]}
        </Button>
      </Flex>

      {/* Bottom left button - fixed position */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 1000,
        }}
      >
        <Button size="4" onClick={handlePaperClick} style={whiteButtonStyle}>
          <Flex align="center" gap="2">
            <FileIcon width="18" height="18" />
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.60913 0.0634287C4.39082 0.0088505 4.16575 0.12393 4.08218 0.332867L3.1538 2.6538L0.832866 3.58218C0.702884 3.63417 0.604504 3.7437 0.566705 3.87849C0.528906 4.01329 0.555994 4.158 0.639992 4.26999L2.01148 6.09864L1.06343 9.89085C1.00944 10.1068 1.12145 10.3298 1.32691 10.4154L4.20115 11.613L5.62557 13.7496C5.73412 13.9124 5.93545 13.9864 6.12362 13.9327L9.62362 12.9327C9.62988 12.9309 9.63611 12.929 9.64229 12.9269L12.6423 11.9269C12.7923 11.8769 12.905 11.7519 12.9393 11.5976L13.9393 7.09761C13.9776 6.92506 13.9114 6.74605 13.77 6.63999L11.95 5.27499V2.99999C11.95 2.82955 11.8537 2.67373 11.7012 2.5975L8.70124 1.0975C8.67187 1.08282 8.64098 1.07139 8.60913 1.06343L4.60913 0.0634287ZM11.4323 6.01173L12.7748 7.01858L10.2119 9.15429C10.1476 9.20786 10.0995 9.2783 10.0731 9.35769L9.25382 11.8155L7.73849 10.8684C7.52774 10.7367 7.25011 10.8007 7.11839 11.0115C6.98667 11.2222 7.05074 11.4999 7.26149 11.6316L8.40341 12.3453L6.19221 12.9771L4.87441 11.0004C4.82513 10.9265 4.75508 10.8688 4.67307 10.8346L2.03046 9.73352L2.85134 6.44999H4.99999C5.24852 6.44999 5.44999 6.24852 5.44999 5.99999C5.44999 5.75146 5.24852 5.54999 4.99999 5.54999H2.72499L1.7123 4.19974L3.51407 3.47903L6.35769 4.4269C6.53655 4.48652 6.73361 4.42832 6.85138 4.28111L8.62413 2.06518L11.05 3.27811V5.19533L8.83287 6.08218C8.70996 6.13134 8.61494 6.23212 8.57308 6.35769L8.07308 7.85769C7.99449 8.09346 8.12191 8.34831 8.35769 8.4269C8.59346 8.50549 8.84831 8.37807 8.9269 8.14229L9.3609 6.84029L11.4323 6.01173ZM7.71052 1.76648L6.34462 3.47386L4.09505 2.724L4.77192 1.03183L7.71052 1.76648ZM10.2115 11.7885L12.116 11.1537L12.7745 8.19034L10.8864 9.76374L10.2115 11.7885Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
            {/* <span>Documents</span> */}
          </Flex>
        </Button>
      </div>

      {/* Diagram display */}
      <DiagramContainer diagramType={diagramType} language={language} />
    </>
  );
}

export default App;
