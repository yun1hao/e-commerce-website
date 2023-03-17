import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import Card  from "./card";
import Datail from "./datail"
import Sort from "../../components/Sort"
import { listingProduct, RemoveGuestCart,ListingCart } from "../../actions";
import {SHOW_PRODUCT} from "../../store/storeKey"
import "./body.css"

export default function Body() {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [lowtohigh, setlowtohigh] = useState(false);
  const [hightolow, sethightolow] = useState(false);
  const [productdetail, setProductDetail] = useState({});
  const isSignedstatus = useSelector((state) => state.checkSignedIn); //已登录
  const showProduct = useSelector((state) => state.showProduct); //未登录
  const [showAddProduct,setShowAddProduct] = useState(false); //点击新增产品
  const product = useSelector((state) => {
    if(!state.checkSignedIn.token || state.checkSignedIn.token && state.checkSignedIn.product.length <= 0){
      return state.showProduct
    }
    if(isSignedstatus.token && isSignedstatus.product.length > 0 ){
        //  let newuUnion = [...state.showProduct,...state.checkSignedIn.product]
        //   for (let i = 0, len = state.showProduct.length; i < len; i++ ) {
        //     for (let j = 0, length = state.checkSignedIn.product.length; j < length; j++) {
        //       if (state.showProduct[i].name === state.checkSignedIn.product[j].name) {
        //         newuUnion.splice(newuUnion.findIndex(item => item.name === state.checkSignedIn.product[j].name), 1)
        //       }
        //     }
        //   }
      // return newuUnion
      // let newProduct = isSignedstatus.product.map((value)=>{
      //   showProduct.forEach((item)=>{
      //     value.number = value.name === item.name ? item.number : value.number
      //   })
      //   return value
      // })
      // console.log(newProduct,'newProduct')
      // return newProduct
      return isSignedstatus.product
    }
  });
  
  useEffect(() => {
    
    if(!isSignedstatus.token){
      let list = showProduct.filter((v)=>{
            return v.number > 0
          })
          if(list.length <= 0){
            listingProduct(dispatch)()
          }
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
      v.number = item.name === v.name ? item.number : v.number
      return v
    })
    dispatch({
      type: SHOW_PRODUCT,
      payload: {
        allproduct:newProduct
      },
    });
  }
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
      ? <Datail setShowAddProduct={setShowAddProduct} showAddProduct={showAddProduct} setEdit={setEdit} changeProduct={changeProduct} productdetail={productdetail} /> 
      : <Card setEdit={setEdit} setProductDetail={setProductDetail} changeProduct={changeProduct} product={product} />
       }
    </div>
  );
}

