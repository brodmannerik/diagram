import { useState, useEffect } from "react";
import { Button, Flex } from "@radix-ui/themes";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import DiagramContainer, { DiagramType } from "./Components/DiagramContainer";
import ResearchPage from "./pages/ResearchPage";

type Language = "en" | "de";

// Updated element types to include connection
type HoverElementType =
  | "variable"
  | "flow"
  | "connection"
  | "condition"
  | "process"
  | "none";

// Define a type for button hover tracking
type ButtonHoverType = "paper" | "color" | "title" | "none";

// Main App component that serves as the router
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DiagramView />} />
        <Route path="/research" element={<ResearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// DiagramView component (formerly the main App content)
function DiagramView() {
  const navigate = useNavigate();
  const [diagramType, setDiagramType] = useState<DiagramType>("main");
  const [language, setLanguage] = useState<Language>("en");
  const [isColored, setIsColored] = useState<boolean>(false);
  // Hover information states
  const [hoverElement, setHoverElement] = useState<HoverElementType>("none");
  const [buttonHover, setButtonHover] = useState<ButtonHoverType>("none");

  const diagramLabels: Record<DiagramType, string> = {
    main: "Germanys Far Right",
    alternative1: "Alternative View 1",
    alternative2: "Alternative View 2",
  };

  const colorLabels = {
    colored: "Blue",
    bw: "Colored",
  };

  // Handle paper button click - now navigates to research page
  const handlePaperClick = () => {
    console.log("Navigating to research page");
    navigate("/research");
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

  // Color toggle function
  const toggleColor = () => {
    console.log("Toggling color");
    setIsColored((prev) => !prev);
  };

  // Set up hover detection
  useEffect(() => {
    // Function to handle mouse over events on SVG elements
    const handleMouseOver = (e: MouseEvent) => {
      // Only process SVG element hovers when no button is being hovered
      if (buttonHover === "none") {
        const target = e.target as Element;
        console.log("Hovered element:", target);

        // Determine what type of element was hovered
        if (
          target.tagName === "rect" ||
          target.classList.contains("variable")
        ) {
          setHoverElement("variable");
        } else if (target.tagName === "path" || target.tagName === "line") {
          // All paths and lines are now just "connection" - no more flow detection
          setHoverElement("connection");
        } else if (
          target.tagName === "diamond" ||
          target.classList.contains("condition")
        ) {
          setHoverElement("condition");
        } else {
          setHoverElement("none");
        }
      }
    };

    // Function to handle mouse out events
    const handleMouseOut = () => {
      // Only clear element hover when no button is hovered
      if (buttonHover === "none") {
        setHoverElement("none");
      }
    };

    // Add event listeners to the SVG container
    const svgContainer = document.querySelector(".diagram-container");
    if (svgContainer) {
      svgContainer.addEventListener("mouseover", handleMouseOver);
      svgContainer.addEventListener("mouseout", handleMouseOut);
    }

    // Clean up event listeners on unmount or when dependencies change
    return () => {
      if (svgContainer) {
        svgContainer.removeEventListener("mouseover", handleMouseOver);
        svgContainer.removeEventListener("mouseout", handleMouseOut);
      }
    };
  }, [isColored, buttonHover]); // Re-run when color toggle or button hover changes

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

  // Helper function to get info text based on hover state
  const getInfoText = (): string => {
    // Button hover takes precedence
    if (buttonHover === "paper") return "Open Research";
    if (buttonHover === "color") return "Show Color";
    if (buttonHover === "title") return "Switch Diagram";

    // If no button is hovered, show element info
    return getElementDescription(hoverElement);
  };

  // Helper function to get element description
  const getElementDescription = (type: HoverElementType): string => {
    switch (type) {
      case "variable":
        return "Variable";
      case "flow":
        return "Flow";
      case "connection":
        return "Connection";
      case "condition":
        return "Condition";
      case "process":
        return "Process";
      case "none":
      default:
        return "Hover over elements";
    }
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
        <Button
          size="4"
          onClick={handleButtonClick}
          style={blueButtonStyle}
          onMouseEnter={() => setButtonHover("title")}
          onMouseLeave={() => setButtonHover("none")}
        >
          {diagramLabels[diagramType]}
        </Button>

        {/* Color toggle button */}
        <Button
          size="4"
          onClick={toggleColor}
          style={whiteButtonStyle}
          onMouseEnter={() => setButtonHover("color")}
          onMouseLeave={() => setButtonHover("none")}
        >
          {isColored ? colorLabels.colored : colorLabels.bw}
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
        <Button
          size="4"
          onClick={handlePaperClick}
          style={whiteButtonStyle}
          onMouseEnter={() => setButtonHover("paper")}
          onMouseLeave={() => setButtonHover("none")}
        >
          <Flex align="center" gap="2">
            {/* Crumpled paper icon - using your SVG */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "#0000FF" }}
            >
              <path
                d="M4.60913 0.0634287C4.39082 0.0088505 4.16575 0.12393 4.08218 0.332867L3.1538 2.6538L0.832866 3.58218C0.702884 3.63417 0.604504 3.7437 0.566705 3.87849C0.528906 4.01329 0.555994 4.158 0.639992 4.26999L2.01148 6.09864L1.06343 9.89085C1.00944 10.1068 1.12145 10.3298 1.32691 10.4154L4.20115 11.613L5.62557 13.7496C5.73412 13.9124 5.93545 13.9864 6.12362 13.9327L9.62362 12.9327C9.62988 12.9309 9.63611 12.929 9.64229 12.9269L12.6423 11.9269C12.7923 11.8769 12.905 11.7519 12.9393 11.5976L13.9393 7.09761C13.9776 6.92506 13.9114 6.74605 13.77 6.63999L11.95 5.27499V2.99999C11.95 2.82955 11.8537 2.67373 11.7012 2.5975L8.70124 1.0975C8.67187 1.08282 8.64098 1.07139 8.60913 1.06343L4.60913 0.0634287ZM11.4323 6.01173L12.7748 7.01858L10.2119 9.15429C10.1476 9.20786 10.0995 9.2783 10.0731 9.35769L9.25382 11.8155L7.73849 10.8684C7.52774 10.7367 7.25011 10.8007 7.11839 11.0115C6.98667 11.2222 7.05074 11.4999 7.26149 11.6316L8.40341 12.3453L6.19221 12.9771L4.87441 11.0004C4.82513 10.9265 4.75508 10.8688 4.67307 10.8346L2.03046 9.73352L2.85134 6.44999H4.99999C5.24852 6.44999 5.44999 6.24852 5.44999 5.99999C5.44999 5.75146 5.24852 5.54999 4.99999 5.54999H2.72499L1.7123 4.19974L3.51407 3.47903L6.35769 4.4269C6.53655 4.48652 6.73361 4.42832 6.85138 4.28111L8.62413 2.06518L11.05 3.27811V5.19533L8.83287 6.08218C8.70996 6.13134 8.61494 6.23212 8.57308 6.35769L8.07308 7.85769C7.99449 8.09346 8.12191 8.34831 8.35769 8.4269C8.59346 8.50549 8.84831 8.37807 8.9269 8.14229L9.3609 6.84029L11.4323 6.01173ZM7.71052 1.76648L6.34462 3.47386L4.09505 2.724L4.77192 1.03183L7.71052 1.76648ZM10.2115 11.7885L12.116 11.1537L12.7745 8.19034L10.8864 9.76374L10.2115 11.7885Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </Flex>
        </Button>
      </div>

      {/* Bottom right info button - visible when hovering elements OR buttons */}
      {(hoverElement !== "none" || buttonHover !== "none") && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
            transition: "opacity 0.2s ease-in",
          }}
        >
          <Button size="4" style={whiteButtonStyle}>
            <Flex align="center" gap="2">
              {/* Info icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: "#0000FF" }}
              >
                <path
                  d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>{getInfoText()}</span>
            </Flex>
          </Button>
        </div>
      )}

      {/* Diagram display */}
      <DiagramContainer
        diagramType={diagramType}
        language={language}
        isColored={isColored}
      />
    </>
  );
}

export default App;
