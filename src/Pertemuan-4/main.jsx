import { createRoot } from "react-dom/client";
import './tailwind.css';
import CafeDirectory from "./CafeSearchFilter";

createRoot(document.getElementById("root"))
    .render(
        <div>
            <CafeDirectory />
        </div>
    )