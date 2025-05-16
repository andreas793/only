import React, {StrictMode} from "react";
import {App} from "./component/app.component";
import {createRoot} from "react-dom/client";


createRoot(document.querySelector("#root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);