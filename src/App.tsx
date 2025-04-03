import { useState } from "react";
import { Button, Flex } from "@radix-ui/themes";
import DiagramContainer from "./Components/DiagramContainer";
import { DiagramType } from "./Components/Diagram";

type Language = "en" | "de";

function App() {
  const [diagramType, setDiagramType] = useState<DiagramType>("main");
  const [language, setLanguage] = useState<Language>("en");

  console.log("App rendering with diagram type:", diagramType, "language:", language);

  const diagramLabels: Record<DiagramType, string> = {
    main: "Germanys Far Right",
    alternative1: "Alternative View 1", 
    alternative2: "Alternative View 2"
  };

  const languageLabels: Record<Language, string> = {
    en: "Sprache",
    de: "Language"
  };

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

  const toggleLanguage = () => {
    console.log("Toggling language from", language);
    setLanguage(prev => (prev === "en" ? "de" : "en"));
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
          {languageLabels[language]} {/* Show opposite language name */}
        </Button>
      </Flex>

      <DiagramContainer diagramType={diagramType} language={language} />
    </>
  );
}

export default App;
