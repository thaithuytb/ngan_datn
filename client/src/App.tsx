import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/index";
import NodataDisplay from "./components/noData";
import Monitoring from "./pages/monitoring";
import SensorContextProvider from "./contexts/sersorContext";

function App() {
  return (
    <SensorContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/no-data" element={<NodataDisplay />} />
          <Route path="/theo-doi-cam-bien" element={<Monitoring />} />
        </Routes>
      </BrowserRouter>
    </SensorContextProvider>
  );
}

export default App;
