import React, { useState } from "react";
import { useSelector } from "react-redux";
import Product from "./Product";
import ModelControl from "./ModelControl";

function Body({ openCart, setopenCart, setTest, test }) {
  const ifclose = useSelector((state) => state.reducer.isclose);
  const isSignedstatus = useSelector((state) => state.checkSignedIn.token);

  return (
    <div className="app">
      {!ifclose ? (
        <ModelControl
          setTest={setTest}
          test={test}
          isSignedstatus={isSignedstatus}
        />
      ) : (
        <Product
          openCart={openCart}
          setopenCart={setopenCart}
          setTest={setTest}
          test={test}
        />
      )}
    </div>
  );
}

export default Body;
