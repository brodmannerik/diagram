import { Button, Flex } from "@radix-ui/themes";
import Diagram from "./Components/Diagram";

function App() {
  return (
    <>
      <Flex 
        width="100%" 
        justify="between" 
        py="4" 
        px="4"
      >
        <Button 
          size="4" 
          style={{ 
            backgroundColor: "#0000FF",
            padding: "16px 32px",
            borderRadius: "17.495px",
            fontSize: "18px",
            fontWeight: "600"
          }}
        >
          Hello
        </Button>
        <Button 
          size="4" 
          style={{ 
            backgroundColor: "#FFFFFF",
            padding: "16px 32px",
            borderRadius: "17.495px",
            fontSize: "18px",
            fontWeight: "600",
            color: "#0000FF",
            border: "1px solid #0000FF"
          }}
        >
          Language
        </Button>
      </Flex>
      <Diagram />
    </>
  )
}

export default App
