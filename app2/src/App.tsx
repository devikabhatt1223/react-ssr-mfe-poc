import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./styles/index.css";

export const App: React.FC = () => {
  return (
    <div className="remote-app">
      <h1>Remote App-2 [Client Side Rendering]</h1>
      <br />
      <nav className="remote-nav">
        <Link to="/app2/child1" className="remote-link">
          Child Route-1
        </Link>
        <Link to="/app2/child2" className="remote-link">
          Child Route-2
        </Link>
      </nav>

      <div className="remote-content">
        <Routes>
          <Route
            index
            path="/"
            element={
              <div>Click Child1 or Child2 to navigate to child routes.</div>
            }
          />
          <Route
            path="child1"
            element={
              <div>This is a child route within Remote App 2 - Sub1</div>
            }
          />
          <Route
            path="child2"
            element={
              <div>This is a child route within Remote App 2 - Sub2</div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
