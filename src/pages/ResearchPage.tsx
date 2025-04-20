import { Button, Flex, Heading, Text, Box } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

function ResearchPage() {
  const navigate = useNavigate();

  // Button styling (same as in main app for consistency)
  const buttonStyle = {
    padding: "16px 32px",
    borderRadius: "17.495px",
    fontSize: "18px",
    fontWeight: "400",
    zIndex: 1000,
    cursor: "pointer",
    backgroundColor: "#FFFFFF",
    color: "#0000FF",
    border: "1px solid #0000FF",
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header with back button */}
      <Flex justify="between" align="center" mb="6">
        <Heading size="8">Research Documentation</Heading>
        <Button size="4" onClick={() => navigate("/")} style={buttonStyle}>
          Back to Diagram
        </Button>
      </Flex>

      {/* Content */}
      <Box mb="6">
        <Heading size="6" mb="2">
          Introduction
        </Heading>
        <Text as="p" size="4" mb="4">
          This research documentation provides background information on the
          data visualization and the methodology used to compile the information
          presented in the diagram.
        </Text>

        <Heading size="6" mb="2">
          Data Sources
        </Heading>
        <Text as="p" size="4" mb="4">
          The data for this visualization was collected from multiple sources
          including:
        </Text>
        <ul style={{ fontSize: "18px", lineHeight: 1.6, marginBottom: "20px" }}>
          <li>Academic research papers on German far-right movements</li>
          <li>Government reports and public records</li>
          <li>Journalistic investigations from reputable news outlets</li>
          <li>
            Public statements and official documents from the organizations
            depicted
          </li>
        </ul>

        <Heading size="6" mb="2">
          Methodology
        </Heading>
        <Text as="p" size="4" mb="4">
          The relationships depicted in the diagram were established based on:
        </Text>
        <ul style={{ fontSize: "18px", lineHeight: 1.6, marginBottom: "20px" }}>
          <li>Documented financial connections between organizations</li>
          <li>Overlapping membership and leadership</li>
          <li>Shared ideological positions and public statements</li>
          <li>Joint events, campaigns and collaborative activities</li>
        </ul>

        <Heading size="6" mb="2">
          Further Reading
        </Heading>
        <Text as="p" size="4" mb="4">
          For more detailed information, please consult the following resources:
        </Text>
        <ul style={{ fontSize: "18px", lineHeight: 1.6 }}>
          <li>
            <a href="#" style={{ color: "#0000FF" }}>
              Complete Research Report (PDF)
            </a>
          </li>
          <li>
            <a href="#" style={{ color: "#0000FF" }}>
              Data Methodology Documentation
            </a>
          </li>
          <li>
            <a href="#" style={{ color: "#0000FF" }}>
              Source Database
            </a>
          </li>
        </ul>
      </Box>
    </div>
  );
}

export default ResearchPage;
