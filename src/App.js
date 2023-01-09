import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header/Header";
import Content from "./Components/Content/Content";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import TriggerURL from "./Components/AnotherPage/TriggerURL";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Content />} />
        <Route path="/trigger" element={<TriggerURL />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
