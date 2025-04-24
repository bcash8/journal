import { BrowserRouter } from "react-router";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Router } from "./navigation/Router";

function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <Router />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
