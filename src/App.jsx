import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
import SideNav from "./components/SideNav"; // import SideNav
import "./App.css"; // optional for layout styles

const Home = lazy(() => import("./pages/Home"));
const PortFolio = lazy(() => import("./pages/PortFolio"));

function App() {
  return (
    <Router>
      <div className="app-layout">
        <SideNav />
        <div className="main-content">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<PortFolio />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
