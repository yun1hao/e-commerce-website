import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";

import React, { useEffect, useState } from "react";
function App() {
  const [openCart, setopenCart] = useState(false);
  const [test, setTest] = useState(0);

  return (
    <>
      <Header
        className="header"
        setopenCart={setopenCart}
        test={test}
        setTest={setTest}
      />
      <Body
        className="body"
        setopenCart={setopenCart}
        openCart={openCart}
        setTest={setTest}
        test={test}
      />
      <Footer className="footer" />
      {/* </div> */}
    </>
  );
}

export default App;
