import React, { useState } from "react";
import { useSelector } from "react-redux";
import Edit from "./edit"
import List from "./list"

export default function Datail({productdetail,setEdit,showAddProduct,setShowAddProduct,changeProduct,product,setProduct}) {
  console.log(showAddProduct,'showAddProduct')
    const [detailpage, setDetailpage] = useState(false);
  return (
    <div className="datail">
    {
        detailpage || showAddProduct
         ? <Edit product={product} setProduct={setProduct} changeProduct={changeProduct} setShowAddProduct = {setShowAddProduct} showAddProduct={showAddProduct} setEdit={setEdit} setDetailpage={setDetailpage} productdetail = {productdetail} /> 
         : <List setProduct={setProduct} changeProduct={changeProduct} setEdit={setEdit} setDetailpage={setDetailpage} productdetail = {productdetail}  /> 
    }
    </div>
  );
}
