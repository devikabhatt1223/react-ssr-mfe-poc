import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import NonVirtualizeList from "./components/NonVirtualizeList";
import VirtualizedList from "./components/VirtualizeList";
import "./styles/index.css";

export const App: React.FC = () => {
  return (
    <div className="remote-app">
      <h1>Remote App-1 [Client Side Rendering]</h1>
      <br />
      <nav className="remote-nav">
        <Link to="/app1/nonVirtualizedList" className="remote-link">
          Non Virtualize List
        </Link>
        <Link to="/app1/virtualizedList" className="remote-link">
          Virtualize List
        </Link>
      </nav>
      <div className="remote-content">
        <Routes>
          <Route
            index
            path="/"
            element={
              <div>
                You can view the virtualized list or the non-virtualized list by
                clicking these links and you can see console log to check
                rendering time.
              </div>
            }
          />
          <Route path="nonVirtualizedList" element={<NonVirtualizeList />} />
          <Route path="virtualizedList" element={<VirtualizedList />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
