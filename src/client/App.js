import "./App.css";
import Headers from "./components/Headers";
import Footer from "./components/Footer";

import Body from "./pages/body";
import ModelControl from "./pages/modelControl";
import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { listingProduct, RemoveGuestCart,ListingCart } from "./actions/index";
import {SHOW_PRODUCT} from "./store/storeKey"

function App() {
  const dispatch = useDispatch();
  const isclose = useSelector((state) => state.reducer.isclose);

  const [lowtohigh, setlowtohigh] = useState(false);
  const [hightolow, sethightolow] = useState(false);
  const isSignedstatus = useSelector((state) => state.checkSignedIn); //已登录

  const [product,setProduct] = useState([])
  useEffect(() => {
    if(!isSignedstatus.token){
      listingProduct(dispatch)().then((res)=>{
        setProduct(res)
      })
    }else{
      ListingCart(dispatch)().then((res)=>{
        setProduct(res)
      })
      window.removeEventListener('beforeunload', handleTabClose);
    }
  }, []);

  if (lowtohigh) {
    product.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (hightolow) {
    product.sort(function (a, b) {
      return b.price - a.price;
    });
  }

  const changeProduct = (item)=>{
    let newProduct = product.map((v)=>{
      v.number = item.id === v.id ? item.number : v.number
      return v
    })
    setProduct(newProduct)
  }

  const handleTabClose = ()=>{
    window.localStorage.clear()
  }

  return (
    <div>
      <Headers product={product} setProduct={setProduct} changeProduct={changeProduct} className="header"/>
      {
        isclose ? <Body product={product} setProduct={setProduct} changeProduct={changeProduct} setlowtohigh={setlowtohigh} sethightolow={sethightolow}  className="body"/> : <ModelControl product={product}/>
      }
      <Footer className="footer" />
    </div>
  );
}
export default App;
