import { useState } from 'react';

const ResponsiveDiagram = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  // Example function that uses setHoveredNode
  const handleNodeHover = (nodeName: string | null) => {
    setHoveredNode(nodeName);
  };
  
  // Assuming you'll import your SVG or paste the code from Illustrator here
  // This is a placeholder for your actual SVG content
  const yourSVGContent = `
    <!-- Your exported SVG from Illustrator would go here -->
    <!-- This is just a representation -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
      <!-- Your SVG content here -->
    </svg>
  `;
  
  return (
    <div className="flex flex-col h-screen w-full">
      {/* Header with properly positioned buttons */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors">
          Hello
        </button>
        <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-6 rounded-full transition-colors">
          Language
        </button>
        <div 
          className="w-full h-full touch-auto"
          dangerouslySetInnerHTML={{ __html: yourSVGContent }}
          onMouseLeave={() => handleNodeHover(null)}
        />
        {/* You can render your SVG directly here */}
        <div 
          className="w-full h-full touch-auto"
          dangerouslySetInnerHTML={{ __html: yourSVGContent }}
        />
        
        {/* Alternative: For better control, you could also use the SVG as a component */}
        {/* 
        <YourSVGComponent 
          className="w-full h-full" 
          onNodeHover={setHoveredNode} 
        />
        */}
        
        {/* Optional tooltip */}
        {hoveredNode && (
          <div className="absolute top-4 right-4 bg-white shadow-lg p-3 rounded-lg border border-gray-200">
            {hoveredNode}
          </div>
        )}
      </div>
    </div>
  );
};

// If you want to create a proper React component from your SVG
// const YourSVGComponent = ({ className, onNodeHover }) => {
//   return (
//     <svg 
//       xmlns="http://www.w3.org/2000/svg" 
//       viewBox="0 0 800 600" 
//       className={className}
//       preserveAspectRatio="xMidYMid meet"
//     >
//       {/* Your SVG elements with added interactivity */}
//       {/* Example of an interactive node: */}
//       <g onMouseEnter={() => onNodeHover('Node 1')} onMouseLeave={() => onNodeHover(null)}>
//         {/* Your node elements */}
//       </g>
      
//       {/* Rest of your SVG content */}
//     </svg>
//   );
// };

export default ResponsiveDiagram;