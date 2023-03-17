import "./App.css";
import Headers from "./components/Headers";
import Footer from "./components/Footer";

import Body from "./pages/body";
import ModelControl from "./pages/modelControl";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
function App() {
  /**
   * false login
   * true  product list
   */
  const isclose = useSelector((state) => state.reducer.isclose);

  useEffect(() => {
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  const handleTabClose = () => {
    window.localStorage.clear();
  };

  return (
    <div>
      <Headers className="header" />
      {isclose ? <Body className="body" /> : <ModelControl />}
      <Footer className="footer" />
    </div>
  );
}
export default App;
