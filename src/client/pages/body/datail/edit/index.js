import React, { useEffect, useState } from "react";
import { addProductdata, modProduct,listingProduct,EditProducts,addAllproduct } from "../../../../actions/index";
import { useDispatch,useSelector } from "react-redux";
import {SHOW_PRODUCT,SIGNIN_STATUS} from "../../../../store/storeKey"
import CloseIcon from "@mui/icons-material/Close";
import "./edit.css";

export default function Edit({ 
  productdetail,
  setEdit,
  showAddProduct,
  setShowAddProduct,
  product,
  setProduct
 }) {
  const dispatch = useDispatch();
  const [imgesource, setimgesource] = useState(showAddProduct ? '' : productdetail.source);
  const [editname, setEditName] = useState(showAddProduct ? '' : productdetail.name);
  const [editdescription, setEitdescription] = useState(showAddProduct ? '' : productdetail.description);
  const [editCategory, setEditCategory] = useState(showAddProduct ? 'Category1' : productdetail.category);
  const [editPrice, setEditPrice] = useState(showAddProduct ? '' : productdetail.price);
  const [editQuantity, setEditQuantity] = useState(showAddProduct ? '' : productdetail.quantity);
  const [editLink, setEditLink] = useState(showAddProduct ? '' : productdetail.source);
  const [id, setId] = useState(productdetail.id);
  const isSignedstatus = useSelector((state) => state.checkSignedIn);

  const editconTent = {
    id: id,
    name: editname,
    description: editdescription,
    category: editCategory,
    price: editPrice ? editPrice * 1 : 1,
    quantity: editQuantity ? editQuantity : 1,
    source: editLink,
  };

  const setLink =(e)=>{
    setEditLink(e.target.value)
  }
  const adding = ()=>{
    delete editconTent.id
    let next = true
    for(let i in editconTent){
      if(editconTent[i] === '' || editconTent[i] === undefined || editconTent[i] === null ){
        next = false
      }
    }
    if(!next){
      alert("新增产品参数不能为空!")
      return
    }
    addProductdata(dispatch)(editconTent).then((res)=>{
      editconTent.id = res.id
      editconTent.number = 0
      product.push(editconTent)
      addAllproduct(dispatch)({
        user: isSignedstatus.user,
        cart:product
      }).then((resolut)=>{
        console.log(resolut,'resolut')
        setProduct(resolut)
        setEdit(false)
        setShowAddProduct(false)
      })
    })
  }

  const editing = () => {
    if(isSignedstatus.token){
      EditProducts(dispatch)({
        user:isSignedstatus.user,
        cart:editconTent
      }).then((res)=>{
        setProduct(changDataList(product,editconTent))
        setEdit(false)
          setShowAddProduct(false)
      })
      return
    }else{
      modProduct(dispatch)(editconTent).then(()=>{
      setProduct(changDataList(product,editconTent))
      setEdit(false)
      setShowAddProduct(false)
      })
    }
  };

  const changDataList = (data,editconTent)=>{
    let newshowProduct = data.map((v)=>{
      v.category = v.id === editconTent.id && v.category != editconTent.category ? editconTent.category : v.category
      v.description = v.id === editconTent.id && v.description != editconTent.description ? editconTent.description : v.description
      v.name = v.id === editconTent.id && v.name != editconTent.name ? editconTent.name : v.name
      v.price = v.id === editconTent.id && v.price != editconTent.price ? editconTent.price : v.price
      v.quantity = v.id === editconTent.id && v.quantity != editconTent.quantity ? editconTent.quantity : v.quantity
      v.source = v.id === editconTent.id && v.source != editconTent.source ? editconTent.source : v.source
      return v
    })
    return newshowProduct
  }

  return (
    <>
       
                    <div className="outline">
                      <div className="editTit">
                      <h2>Edit product</h2>
                      <CloseIcon
            className="close-detai"
            onClick={() => {
              setEdit(false)
              setShowAddProduct(false)
            }}
          />
                      </div>
               
                      <div className="form">
                        <div className="name-product">
                          <span>Product name</span>
                          <br />
                          <input
                            type="text"
                            value={editname}
                            onChange={(e) => setEditName(e.target.value)}
                          />
                        </div>
                        <div className="description">
                          <span>Product Description </span>
                          <br />
                          <textarea
                            name=""
                            cols="60"
                            rows="6"
                            value={editdescription}
                            onChange={(e) => setEitdescription(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="Category-price">
                          <div className="category">
                            <span>Category</span>
                            <br />
                            <select
                              name=""
                              id=""
                              defaultValue={editCategory}
                              onChange={(e) => setEditCategory(e.target.value)}
                            >
                              <option value="Category1">Category1</option>
                              <option value="Category2">Category2</option>
                              <option value="Category3">Category3</option>
                            </select>
                          </div>
                          <div className="price">
                            <span>price</span>
                            <input
                              type="text"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="quatity-link">
                          <div className="quantity">
                            <span>In stock Quantity</span>
                            <br />
                            <input
                              type="text"
                              value={editQuantity}
                              onChange={(e) => setEditQuantity(e.target.value)}
                            />
                          </div>
                          <div className="image-link">
                            <span>Edit image Link</span>
                            <div className="link-input">
                              <input
                                type="text"
                                value={editLink}
                                onChange={setLink}
                              />
                              <button
                                onClick={() =>
                                  setimgesource(imgesource)
                                }
                              >
                                Preview
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="image-preview">
                          <img src={editLink} alt="" />
                        </div>
                        <div className="add-button">
                          {
                            showAddProduct ? <button
                            onClick={() => adding()}
                          >
                            Add Product
                          </button> : <button
                            onClick={() => editing()}
                          >
                            Edit Product
                          </button>
                          }
                        </div>
                      </div>
                    </div>
                </>
  )
}

