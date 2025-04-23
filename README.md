# CNDiagram

A visual graph visualization tool for exploring connected data. This project provides interactive diagram capabilities with particular support for research and data visualization.

## Features

- **Interactive Graph Visualization**: Navigate and explore connected nodes with smooth panning and zooming
- **Research View**: Dedicated research page for exploring complex datasets and their connections
- **Obsidian Canvas Integration**: Support for displaying Obsidian canvas files with nodes and edge connections
- **Dual Layout System**: Switch between diagram and research views
- **Zoom Controls**: Precision control of diagram scale with dedicated buttons
- **Responsive Design**: Works on both desktop and mobile devices
- **Edge Visualization**: Clear visual representation of connections between nodes

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/cndiagram.git

# Navigate to project directory
cd cndiagram

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage

### Main Diagram View

The main diagram view provides an interactive flowchart with clickable elements:

1. Click on nodes to explore different elements in the diagram
2. Toggle color mode as needed for different visualization options

### Research View

The research view displays a canvas of interconnected nodes:

1. Navigate to `/research` or use the "Research Map" button
2. Pan the canvas by clicking and dragging
3. Zoom in/out using the controls in the bottom right
4. View node and edge statistics in the bottom left counter

## Technologies

- React
- TypeScript
- Vite
- Radix UI Components
- HTML Canvas API
- SVG for diagram elements
- React Router for navigation

## Project Structure

```
cndiagram/
├── src/
│   ├── Components/
│   │   └── DiagramContainer.tsx  # Main diagram visualization component
│   ├── pages/
│   │   └── ResearchPage.tsx      # Research view with canvas visualization
│   ├── App.tsx                   # Main application with routing
│   └── App.css                   # Global styles
├── public/
│   └── ...                       # Static assets
└── ...                           # Configuration files
```

## Browser Compatibility

This application works best in modern browsers including:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Development

### Requirements

- Node.js 16.x or higher
- npm 8.x or higher

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Technical Notes

This project is built with Vite for fast development and optimized builds. Two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
