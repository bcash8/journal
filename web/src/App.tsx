import "./App.css";
import { BrowserRouter } from "react-router";
import { Router } from "./navigation/Router";
import { Header } from "./components/Header/Header";

function Layout() {
  return (
    <div>
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
