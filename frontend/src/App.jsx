import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/root.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {routes.map((route, index) => ( <Route key={index} path={route.path} element={<route.Element/>}/> ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
