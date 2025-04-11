import "./App.css";
import { BrowserRouter } from "react-router";
import { Router } from "./navigation/Router";
import { MilkdownProvider } from "@milkdown/react";

function App() {
  return (
    <BrowserRouter>
      <MilkdownProvider>
        <Router />
      </MilkdownProvider>
    </BrowserRouter>
  );
}

export default App;
