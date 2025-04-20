import { Button, Flex, Text, Theme } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  useTransition,
} from "react";
import { debounce, throttle } from "lodash";
import "../App.css";

// Define interfaces for the canvas data
interface CanvasNode {
  id: string;
  type: string;
  text?: string;
  file?: string;
  subpath?: string;
  width: number;
  height: number;
  x: number;
  y: number;
  color?: string;
  fontSize?: number;
  url?: string;
}

interface CanvasEdge {
  id: string;
  fromNode: string;
  fromSide: string;
  toNode: string;
  toSide: string;
}

interface CanvasData {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
}

// Inline styles to avoid CSS conflicts
const styles = {
  canvasViewer: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    position: "relative" as const,
    backgroundColor: "#f8f9fa",
  },
  canvasContent: {
    position: "absolute" as const,
    transformOrigin: "0 0",
    willChange: "transform",
  },
  edge: {
    stroke: "#FF0000",
    strokeWidth: 3,
    strokeOpacity: 0.8,
  },
  debugPanel: {
    position: "absolute" as const,
    top: "70px",
    left: "20px",
    background: "rgba(255,255,255,0.8)",
    padding: "10px",
    zIndex: 9999,
    fontSize: "12px",
    borderRadius: "4px",
  },
};

function ResearchPage() {
  const navigate = useNavigate();
  const [canvasData, setCanvasData] = useState<CanvasData | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nodeCount, setNodeCount] = useState(0);
  const [edgeCount, setEdgeCount] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const canvasEdgesRef = useRef<HTMLCanvasElement>(null);

  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);
  const transformRef = useRef({ scale: 1, x: 0, y: 0 });
  // @ts-expect-error - useTransition is complex with TypeScript
  const [isPending, startTransition] = useTransition();

  // Button styling (same as main app for consistency)
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

  useEffect(() => {
    transformRef.current = { scale, x: position.x, y: position.y };
  }, [scale, position]);

  const debouncedStateUpdate = useMemo(
    () =>
      debounce((newScale, newPosition) => {
        startTransition(() => {
          setScale(newScale);
          setPosition(newPosition);
        });
      }, 20),
    []
  );

  useEffect(() => {
    return () => {
      debouncedStateUpdate.cancel();
    };
  }, [debouncedStateUpdate]);

  // Always use light mode
  const darkMode = false;

  const getImagePath = (obsidianPath: string | undefined): string => {
    if (!obsidianPath) return "";

    // Extract just the filename from the path (everything after the last slash)
    const filename = obsidianPath.split("/").pop();

    if (!filename) return "";

    // Return path to the image in the flat images folder
    return `/images/${filename}`;
  };

  // Load canvas from public directory
  useEffect(() => {
    const loadCanvasFromPublic = async () => {
      try {
        setLoading(true);

        // Fetch the canvas file from public directory
        const response = await fetch("/canvas/Beliefs.canvas");
        if (!response.ok) {
          throw new Error(`Failed to load canvas file: ${response.statusText}`);
        }

        const data = await response.json();
        setCanvasData(data);
        setNodeCount(data.nodes.length);
        setEdgeCount(data.edges.length);

        // Give the DOM time to render before centering
        setTimeout(() => centerCanvas(data), 100);
      } catch (err) {
        console.error("Error loading canvas:", err);
        setError(err instanceof Error ? err.message : "Failed to load canvas");
      } finally {
        setLoading(false);
      }
    };

    loadCanvasFromPublic();
  }, []);

  // Handle mobile device optimizations
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setScale((prev) => Math.max(prev, 0.5)); // Ensure minimum scale on mobile
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Mobile-specific optimizations
    if (window.innerWidth < 768) {
      setScale(0.5);
    }
  }, []);

  const centerCanvas = (data: CanvasData) => {
    if (!data.nodes.length || !canvasRef.current) return;

    // Find the bounding box of all nodes
    const minX = Math.min(...data.nodes.map((n) => n.x));
    const maxX = Math.max(...data.nodes.map((n) => n.x + n.width));
    const minY = Math.min(...data.nodes.map((n) => n.y));
    const maxY = Math.max(...data.nodes.map((n) => n.y + n.height));

    const canvasWidth = canvasRef.current.clientWidth;
    const canvasHeight = canvasRef.current.clientHeight;

    // Calculate center position
    const centerX = canvasWidth / 2 - (minX + maxX) / 2;
    const centerY = canvasHeight / 2 - (minY + maxY) / 2;

    // Apply the centering position
    setPosition({ x: centerX, y: centerY });

    // Reset scale to ensure everything is visible
    setScale(0.8);
  };

  // Mouse interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left mouse button
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    e.preventDefault(); // Prevent text selection during drag
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging) return;

      // Calculate position change
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;

      setPosition((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));

      setDragStart({ x: e.clientX, y: e.clientY });
    },
    [dragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  // Replace the handleWheel function with this version that only prevents default scrolling
  const handleWheel = useCallback((e: WheelEvent) => {
    // Only prevent default browser scrolling behavior
    // but don't do any zooming with the wheel
    if ((e.target as HTMLElement).closest(".canvas-node")) {
      return; // Allow scrolling inside nodes
    }

    e.preventDefault(); // Prevent page scrolling
    // Remove all the zooming logic
  }, []);

  // Zoom button handlers
  const handleZoomIn = useCallback(() => {
    const {
      scale: currentScale,
      x: currentX,
      y: currentY,
    } = transformRef.current;

    const newScale = Math.min(currentScale * 1.2, 5);
    const scaleFactor = newScale / currentScale;

    const viewportWidth = canvasRef.current?.clientWidth || 0;
    const viewportHeight = canvasRef.current?.clientHeight || 0;
    const viewportCenterX = (viewportWidth / 2 - currentX) / currentScale;
    const viewportCenterY = (viewportHeight / 2 - currentY) / currentScale;

    const newX = currentX - viewportCenterX * (scaleFactor - 1) * currentScale;
    const newY = currentY - viewportCenterY * (scaleFactor - 1) * currentScale;

    transformRef.current = { scale: newScale, x: newX, y: newY };

    if (canvasRef.current) {
      const content = canvasRef.current.querySelector(
        ".canvas-content"
      ) as HTMLElement;
      if (content) {
        content.style.transform = `translate(${newX}px, ${newY}px) scale(${newScale})`;
      }
    }

    setScale(newScale);
    setPosition({ x: newX, y: newY });
  }, []);

  const handleZoomOut = useCallback(() => {
    const {
      scale: currentScale,
      x: currentX,
      y: currentY,
    } = transformRef.current;

    const newScale = Math.max(currentScale / 1.2, 0.1);
    const scaleFactor = newScale / currentScale;

    const viewportWidth = canvasRef.current?.clientWidth || 0;
    const viewportHeight = canvasRef.current?.clientHeight || 0;
    const viewportCenterX = (viewportWidth / 2 - currentX) / currentScale;
    const viewportCenterY = (viewportHeight / 2 - currentY) / currentScale;

    const newX = currentX - viewportCenterX * (scaleFactor - 1) * currentScale;
    const newY = currentY - viewportCenterY * (scaleFactor - 1) * currentScale;

    transformRef.current = { scale: newScale, x: newX, y: newY };

    if (canvasRef.current) {
      const content = canvasRef.current.querySelector(
        ".canvas-content"
      ) as HTMLElement;
      if (content) {
        content.style.transform = `translate(${newX}px, ${newY}px) scale(${newScale})`;
      }
    }

    setScale(newScale);
    setPosition({ x: newX, y: newY });
  }, []);

  // Add event listeners for mouse wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  // Add mouse event listeners
  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, handleMouseMove, handleMouseUp]);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: TouchEvent) => {
    e.preventDefault();

    if (e.touches.length === 1) {
      lastTouchRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  }, []);

  const handleTouchMove = useCallback(
    throttle((e: TouchEvent) => {
      e.preventDefault();

      if (e.touches.length === 1 && lastTouchRef.current) {
        const dx = e.touches[0].clientX - lastTouchRef.current.x;
        const dy = e.touches[0].clientY - lastTouchRef.current.y;

        const dampingFactor = 0.6;
        const newX = position.x + dx * dampingFactor;
        const newY = position.y + dy * dampingFactor;

        setPosition({ x: newX, y: newY });

        lastTouchRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    }, 30),
    [position]
  );

  const handleTouchEnd = useCallback(() => {
    lastTouchRef.current = null;
  }, []);

  // Add touch event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("wheel", handleWheel, { passive: false });
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Get color for node based on type
  const getNodeColor = (node: CanvasNode) => {
    if (node.color) return node.color;

    switch (node.type) {
      case "text":
        return darkMode ? "#2D3748" : "#EDF2F7";
      case "file":
        return darkMode ? "#293845" : "#E6F0F6";
      case "link":
        return darkMode ? "#2C3A47" : "#EBF4FF";
      default:
        return darkMode ? "#2D3748" : "#F7FAFC";
    }
  };

  // Determine if a node is visible in the viewport
  const isNodeVisible = useCallback(
    (node: CanvasNode) => {
      if (!canvasRef.current) return false;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const margin = window.innerWidth < 768 ? 200 : 300;

      const nodeLeft = node.x * scale + position.x;
      const nodeTop = node.y * scale + position.y;
      const nodeRight = nodeLeft + node.width * scale;
      const nodeBottom = nodeTop + node.height * scale;

      return (
        nodeRight + margin >= 0 &&
        nodeLeft - margin <= viewportWidth &&
        nodeBottom + margin >= 0 &&
        nodeTop - margin <= viewportHeight
      );
    },
    [position, scale]
  );

  // Get visible nodes based on viewport
  const visibleNodes = useMemo(() => {
    if (!canvasData?.nodes) return [];
    return canvasData.nodes.filter(isNodeVisible);
  }, [canvasData?.nodes, isNodeVisible]);

  // Get visible edges based on visible nodes
  const visibleEdges = useMemo(() => {
    if (!canvasData?.edges || !canvasData?.nodes) return [];
    const visibleNodeIds = new Set(visibleNodes.map((node) => node.id));
    return canvasData.edges.filter(
      (edge) =>
        visibleNodeIds.has(edge.fromNode) && visibleNodeIds.has(edge.toNode)
    );
  }, [canvasData?.edges, visibleNodes]);

  // Format Obsidian wiki links to look like links
  const formatObsidianLinks = (text: string) => {
    return text.replace(/\[\[(.*?)\]\]/g, '<span class="wiki-link">$1</span>');
  };

  // Render individual node
  const renderNode = (node: CanvasNode & { style?: React.CSSProperties }) => {
    // Use provided style or build default style
    const style = node.style || {
      position: "absolute" as const,
      left: `${node.x}px`,
      top: `${node.y}px`,
      width: `${node.width}px`,
      height: `${node.height}px`,
      backgroundColor: getNodeColor(node),
      border: `1px solid ${
        darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
      }`,
      borderRadius: "3px",
      padding: "8px 12px",
      boxShadow: darkMode
        ? "0 2px 5px rgba(0, 0, 0, 0.4)"
        : "0 2px 5px rgba(0, 0, 0, 0.1)",
      overflow: "auto",
      color: darkMode ? "#E2E8F0" : "#1A202C",
      fontSize: node.fontSize ? `${node.fontSize}px` : "14px",
      userSelect: "text",
      cursor: "default",
      maxHeight: `${node.height}px`,
      zIndex: 10, // Default z-index for nodes
    };

    // Rest of the function remains the same
    const handleNodeInteraction = (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
    };

    return (
      <div
        key={node.id}
        style={style}
        className={`canvas-node canvas-node-${node.type}`}
        onMouseDown={handleNodeInteraction}
        onTouchStart={handleNodeInteraction}
        onWheel={(e) => {
          const target = e.currentTarget;
          const isScrollable = target.scrollHeight > target.clientHeight;
          if (isScrollable) {
            e.stopPropagation();
          }
        }}
      >
        {node.type === "text" && (
          <div
            className="node-content text-content"
            dangerouslySetInnerHTML={{
              __html: formatObsidianLinks(node.text || ""),
            }}
          />
        )}
        {node.type === "file" && (
          <div className="node-content file-content">
            <div className="file-header">
              <svg
                className="file-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19"
                  stroke={darkMode ? "#E2E8F0" : "#4A5568"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H14L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z"
                  stroke={darkMode ? "#E2E8F0" : "#4A5568"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <strong>{node.file}</strong>
            </div>
            {node.subpath && (
              <div className="file-subpath">Subpath: {node.subpath}</div>
            )}
            <div className="file-content-container">
              {node.file?.endsWith(".png") ||
              node.file?.endsWith(".jpg") ||
              node.file?.endsWith(".jpeg") ? (
                <>
                  <img
                    src={getImagePath(node.file)}
                    alt={node.file?.split("/").pop() || "Canvas image"}
                    className="canvas-image"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      (
                        e.currentTarget.nextSibling as HTMLElement
                      ).style.display = "flex";
                    }}
                  />
                  <div
                    className="image-placeholder"
                    style={{ display: "none" }}
                  >
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                        stroke={darkMode ? "#E2E8F0" : "#4A5568"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
                        stroke={darkMode ? "#E2E8F0" : "#4A5568"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 15L16 10L5 21"
                        stroke={darkMode ? "#E2E8F0" : "#4A5568"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Image not found: {node.file?.split("/").pop()}</span>
                  </div>
                </>
              ) : (
                <div className="file-placeholder">
                  <span>{node.file}</span>
                </div>
              )}
            </div>
          </div>
        )}
        {node.type === "link" && (
          <div className="node-content link-content">
            <div className="link-header">
              <svg
                className="link-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.362 15.0435 15.0796 14.9404 15.7513 14.6908C16.4231 14.4412 17.0318 14.0513 17.54 13.55L20.54 10.55C21.4508 9.59699 21.9548 8.33397 21.9434 7.02299C21.932 5.71201 21.4061 4.45794 20.4791 3.5309C19.5521 2.60386 18.298 2.07802 16.987 2.06663C15.676 2.05523 14.413 2.55921 13.46 3.47L11.75 5.18"
                  stroke={darkMode ? "#E2E8F0" : "#4A5568"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60707C11.7642 9.26331 11.0685 9.05889 10.3533 9.00768C9.63799 8.95646 8.92039 9.05961 8.24866 9.30921C7.57694 9.5588 6.96824 9.94872 6.46 10.45L3.46 13.45C2.54918 14.403 2.04519 15.666 2.05659 16.977C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.44791 21.3961 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58695 21.4408 10.54 20.53L12.24 18.83"
                  stroke={darkMode ? "#E2E8F0" : "#4A5568"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="link-title">External Link</span>
            </div>
            <a
              href={node.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-url"
            >
              {node.url}
            </a>
          </div>
        )}
      </div>
    );
  };

  // Complete overhaul of the edge rendering system

  // 1. First, add this logging to check if edges exist
  useEffect(() => {
    if (canvasData?.edges) {
      console.log(`Found ${canvasData.edges.length} edges in canvas data`);
      console.log("Sample edge:", canvasData.edges[0]);
    }
  }, [canvasData]);

  // 2. Replace the entire renderEdge function with this simplified version
  const renderEdge = (edge: CanvasEdge) => {
    if (!canvasData) return null;

    const fromNode = canvasData.nodes.find((n) => n.id === edge.fromNode);
    const toNode = canvasData.nodes.find((n) => n.id === edge.toNode);

    if (!fromNode || !toNode) {
      return null;
    }

    // Calculate center points of nodes for simpler rendering
    const startX = fromNode.x + fromNode.width / 2;
    const startY = fromNode.y + fromNode.height / 2;
    const endX = toNode.x + toNode.width / 2;
    const endY = toNode.y + toNode.height / 2;

    return (
      <svg
        key={edge.id}
        width="5000"
        height="5000"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 9999, // Very high z-index to ensure visibility
          pointerEvents: "none",
        }}
      >
        {/* Super visible line for debugging */}
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke="#FF0000" // Bright red
          strokeWidth={5}
          strokeOpacity={1}
          strokeDasharray="5,5" // Dashed line for better visibility
        />

        {/* Larger endpoint circle for debugging */}
        <circle cx={endX} cy={endY} r={8} fill="#FF0000" />
      </svg>
    );
  };

  // 3. Replace the canvas-content section with this simplified structure
  useEffect(() => {
    // Prevent scale from being zero - which would cause division by zero
    if (scale <= 0.01) {
      setScale(0.01);
    }
  }, [scale]);

  // Add this to your useEffect dependencies
  const memoizedRenderEdges = useMemo(() => {
    // This function will only recompute when scale, position, or canvasData changes
    return (scale: number, position: { x: number; y: number }) => {
      if (!canvasData?.edges) return null;

      return canvasData.edges.map((edge) => {
        const fromNode = canvasData.nodes.find((n) => n.id === edge.fromNode);
        const toNode = canvasData.nodes.find((n) => n.id === edge.toNode);

        if (!fromNode || !toNode) return null;

        const fromX =
          fromNode.x * scale + position.x + (fromNode.width * scale) / 2;
        const fromY =
          fromNode.y * scale + position.y + (fromNode.height * scale) / 2;
        const toX = toNode.x * scale + position.x + (toNode.width * scale) / 2;
        const toY = toNode.y * scale + position.y + (toNode.height * scale) / 2;

        return (
          <line
            key={edge.id}
            x1={fromX}
            y1={fromY}
            x2={toX}
            y2={toY}
            stroke="#0000FF"
            strokeWidth={1.5}
            strokeOpacity={0.6}
          />
        );
      });
    };
  }, [canvasData]);

  // Add this function to draw edges
  const drawEdgesOnCanvas = useCallback(() => {
    if (!canvasData?.edges || !canvasEdgesRef.current) return;

    const canvas = canvasEdgesRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas dimensions to match viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set line style
    ctx.strokeStyle = "#0000FF";
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.5;

    // Draw all edges
    canvasData.edges.forEach((edge) => {
      const fromNode = canvasData.nodes.find((n) => n.id === edge.fromNode);
      const toNode = canvasData.nodes.find((n) => n.id === edge.toNode);

      if (!fromNode || !toNode) return;

      // Calculate positions with transform
      const fromX =
        fromNode.x * scale + position.x + (fromNode.width * scale) / 2;
      const fromY =
        fromNode.y * scale + position.y + (fromNode.height * scale) / 2;
      const toX = toNode.x * scale + position.x + (toNode.width * scale) / 2;
      const toY = toNode.y * scale + position.y + (toNode.height * scale) / 2;

      // Draw line
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();
    });
  }, [canvasData, scale, position]);

  // Update canvas whenever transform changes
  useEffect(() => {
    drawEdgesOnCanvas();
  }, [drawEdgesOnCanvas, scale, position]);

  // Also update on resize
  useEffect(() => {
    function handleResize() {
      drawEdgesOnCanvas();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawEdgesOnCanvas]);

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      {/* Top left button (same as main page) */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,
        }}
      >
        <Button
          size="4"
          style={{
            padding: "16px 32px",
            borderRadius: "17.495px",
            fontSize: "18px",
            fontWeight: "400",
            zIndex: 1000,
            cursor: "pointer",
            backgroundColor: "#0000FF",
            color: "#FFFFFF",
          }}
        >
          Germanys Far Right
        </Button>
      </div>

      {/* Back to Diagram button - moved to top right */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <Button size="4" onClick={() => navigate("/")} style={buttonStyle}>
          Back to Diagram
        </Button>
      </div>

      <Theme>
        <div className="app-container light-mode" style={{ height: "100vh" }}>
          {loading && <div className="loading-overlay">Loading canvas...</div>}
          {error && <div className="error-message">{error}</div>}

          <div
            ref={canvasRef}
            className="canvas-viewer"
            onMouseDown={handleMouseDown}
            style={{
              cursor: dragging ? "grabbing" : "grab",
              touchAction: "none",
              height: "100vh",
              width: "100vw",
              overflow: "hidden",
            }}
          >
            <div className="canvas-grid"></div>

            {/* Canvas for edges - always below nodes */}
            <canvas
              ref={canvasEdgesRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 5,
                pointerEvents: "none",
              }}
            />

            {/* Regular content with nodes */}
            <div
              className="canvas-content"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: "0 0",
                zIndex: 10, // Higher than canvas
              }}
            >
              {visibleNodes.map((node) => renderNode(node))}
            </div>

            {/* RESTORED: Zoom controls */}
            <div
              className="zoom-controls"
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                zIndex: 1000,
                backgroundColor: "white",
                padding: "8px",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Flex gap="1" align="center" justify="center">
                <Button
                  size="2"
                  variant="soft"
                  onClick={handleZoomOut}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleZoomOut();
                  }}
                  aria-label="Zoom out"
                >
                  −
                </Button>

                <div className="zoom-text">
                  <Text size="2" weight="medium">
                    {Math.round(scale * 100)}%
                  </Text>
                </div>

                <Button
                  size="2"
                  variant="soft"
                  onClick={handleZoomIn}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleZoomIn();
                  }}
                  aria-label="Zoom in"
                >
                  +
                </Button>
              </Flex>
            </div>

            {/* RESTORED: Node count indicator */}
            <div
              className="node-count-indicator"
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                zIndex: 1000,
                backgroundColor: "white",
                padding: "8px",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Text size="2" weight="medium">
                {nodeCount} nodes, {edgeCount} edges
              </Text>
            </div>
          </div>
        </div>
      </Theme>
    </div>
  );
}

export default ResearchPage;
