import React, { useState } from "react";
import { useSelector } from "react-redux";
import Edit from "./edit"
import List from "./list"

export default function Datail({productdetail,setEdit,showAddProduct,setShowAddProduct}) {
  console.log(showAddProduct,'showAddProduct')
    const [detailpage, setDetailpage] = useState(false);
  return (
    <div className="datail">
    {
        detailpage || showAddProduct
         ? <Edit setShowAddProduct = {setShowAddProduct} showAddProduct={showAddProduct} setEdit={setEdit} setDetailpage={setDetailpage} productdetail = {productdetail} /> 
         : <List setEdit={setEdit} setDetailpage={setDetailpage} productdetail = {productdetail}  /> 
    }
    </div>
  );
}
