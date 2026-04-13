import { createRoot } from "react-dom/client";
import FormBouquet from "./FormBouquet";
import './tailwind.css';

createRoot(document.getElementById("root"))
    .render(
        <div>
            <FormBouquet/>
        </div>
    )