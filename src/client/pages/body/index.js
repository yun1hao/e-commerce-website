import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import Card  from "./card";
import Datail from "./datail"
import Sort from "../../components/Sort"
import { listingProduct, RemoveGuestCart,ListingCart } from "../../actions";
import {SHOW_PRODUCT} from "../../store/storeKey"
import "./body.css"

export default function Body({product,setProduct,changeProduct,setlowtohigh,sethightolow}) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  // const [lowtohigh, setlowtohigh] = useState(false);
  // const [hightolow, sethightolow] = useState(false);
  const [productdetail, setProductDetail] = useState({});
  const isSignedstatus = useSelector((state) => state.checkSignedIn); //已登录
  const [showAddProduct,setShowAddProduct] = useState(false); //点击新增产品

  // const [product,setProduct] = useState([])
  // useEffect(() => {
  //   if(!isSignedstatus.token){
  //     listingProduct(dispatch)().then((res)=>{
  //       setProduct(res)
  //     })
  //   }else{
  //     ListingCart(dispatch)().then((res)=>{
  //       setProduct(res)
  //     })
  //   }
  // }, []);

  // if (lowtohigh) {
  //   product.sort(function (a, b) {
  //     return a.price - b.price;
  //   });
  // } else if (hightolow) {
  //   product.sort(function (a, b) {
  //     return b.price - a.price;
  //   });
  // }

  // const changeProduct = (item)=>{
  //   let newProduct = product.map((v)=>{
  //     v.number = item.id === v.id ? item.number : v.number
  //     return v
  //   })
  //   setProduct(newProduct)
  // }
  return (
    <div className="body">
      {
        !edit ? <div className="header-part">
        <h2>Products</h2>
        <div className="header-right">
          <div className="sorting">
            <Sort
              setlowtohigh={setlowtohigh}
              sethightolow={sethightolow}
              className="sorting-tab"
            />
          </div>

        
          {isSignedstatus.isAdmin ? (
                          <button
                            className="product-add"
                            onClick={() => {
                              setEdit(true)
                              setShowAddProduct(true)
                            }}
                          >
                            Add Product
                          </button>
                        ) : (
                          <></>
                        )}


        </div>
      </div> : <></>
      }

      {edit 
      ? <Datail product={product} 
      setShowAddProduct={setShowAddProduct} 
      showAddProduct={showAddProduct}
      setProduct={setProduct} 
      setEdit={setEdit} 
      changeProduct={changeProduct} 
      productdetail={productdetail} /> 
      : <Card setProduct={setProduct} 
      setEdit={setEdit} 
      setProductDetail={setProductDetail} 
      changeProduct={changeProduct} 
      product={product} />
       }
    </div>
  );
}

