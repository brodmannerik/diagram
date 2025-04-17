import { useState } from "react";
import { Button, Flex } from "@radix-ui/themes";
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

  return (
    <>
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
        <Button
          size="4"
          onClick={handleButtonClick}
          style={{
            backgroundColor: "#0000FF",
            padding: "16px 32px",
            borderRadius: "17.495px",
            fontSize: "18px",
            fontWeight: "400",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          {diagramLabels[diagramType]}
        </Button>

        {/* Language toggle button */}
        <Button
          size="4"
          onClick={toggleLanguage}
          style={{
            backgroundColor: "#FFFFFF",
            padding: "16px 32px",
            borderRadius: "17.495px",
            fontSize: "18px",
            fontWeight: "400",
            color: "#0000FF",
            border: "1px solid #0000FF",
            zIndex: 1000,
          }}
        >
          {languageLabels[language]}
        </Button>
      </Flex>

      {/* Diagram display */}
      <DiagramContainer diagramType={diagramType} language={language} />
    </>
  );
}

export default App;
