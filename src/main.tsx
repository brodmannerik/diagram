import { Theme } from "@radix-ui/themes";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "@radix-ui/themes/styles.css";

createRoot(document.getElementById('root')!).render(
  <Theme>
    <App />
  </Theme>,
)
