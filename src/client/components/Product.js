import React, { useEffect, useState } from "react";
import { addProductdata, modProduct } from "../actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Sort from "./Sort";
import Listing from "./Listing";
import "./Product.css";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";

function Product({ openCart, setopenCart, setTest, test }) {
  const dispatch = useDispatch();
  const [ifclick, setIfclick] = useState(false);
  const [addProduct, setAddproduct] = useState(false);
  const [imagelink, setimgelinke] = useState("");
  const [imgesource, setimgesource] = useState("");
  const [productName, setproductName] = useState("");
  const [productDescription, setproductDescription] = useState("");
  const [productCategory, setproductCategory] = useState("Category1");
  const [productprice, setproductprice] = useState("");
  const [productQuantity, setproductQuantity] = useState("");
  const [mainpage, setMainpage] = useState(false);
  const [detailpage, setDetailpage] = useState(false);
  const [productdetail, setProductDetail] = useState({});
  const [edit, setEdit] = useState(false);
  const [pagenumber, setPagenumber] = useState(1);

  const [lowtohigh, setlowtohigh] = useState(false);
  const [hightolow, sethightolow] = useState(false);
  const [editname, setEditName] = useState("");
  const [editdescription, setEitdescription] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [editLink, setEditLink] = useState("");
  const [id, setId] = useState("");

  const isSignedstatus = useSelector((state) => state.checkSignedIn);
  const Tokencuurent = useSelector((state) => state.showCartProduct);
  const isadmin = Tokencuurent.isAdmin;

  const set = {
    setEitdescription,
    setEditCategory,
    setEditPrice,
    setEditQuantity,
    setEditLink,
    setId,
  };
  // const background = ifclick ? "#5048e5" : "white";

  const onchange_text = (e) => {
    setimgelinke(e.target.value);
    console.log(imagelink);
  };
  const content = {
    name: productName,
    description: productDescription,
    category: productCategory,
    price: productprice * 1,
    source: imagelink,
    quantity: productQuantity * 1,
  };
  const adding = () => {
    console.log(content);
    addProductdata(dispatch)(content);
    setproductName("");
    setproductDescription("");
    setproductCategory("");
    setimgesource("");
    setproductprice("");
    setproductQuantity("");
    setMainpage(true);
  };
  const editconTent = {
    id: id,
    name: editname,
    description: editdescription,
    category: editCategory,
    price: editPrice * 1,
    quantity: editQuantity * 1,
    source: editLink,
  };

  const editing = () => {
    console.log(editconTent);
    modProduct(dispatch)(editconTent);
    setMainpage(true);
    setEdit(false);
  };

  return (
    <>
      <>
        {!addProduct || mainpage ? (
          <>
            {detailpage ? (
              <>
                <ProductDetail
                  detail={productdetail}
                  setMainpage={setMainpage}
                  setDetailpage={setDetailpage}
                  productdetail={productdetail}
                  setTest={setTest}
                  test={test}
                  setEdit={setEdit}
                  setEditName={setEditName}
                  set={set}
                  setProductDetail={setProductDetail}
                />
              </>
            ) : (
              <>
                {edit ? (
                  <>
                    <div className="outline">
                      <h2>Edit product</h2>
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
                                onChange={(e) => setEditLink(e)}
                              />
                              <button
                                onClick={() =>
                                  setimgesource(productdetail.source)
                                }
                              >
                                Preview
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="image-preview">
                          <img src={productdetail.source} alt="" />
                        </div>
                        <div className="add-button">
                          <button
                            onClick={() => {
                              editing();
                            }}
                          >
                            Edit Product
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {openCart ? (
                      <>
                        <div className="cart-show">
                          <Cart
                            setopenCart={setopenCart}
                            setTest={setTest}
                            test={test}
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="header-part">
                      <h2>Products</h2>
                      <div className="header-right">
                        <div className="sorting">
                          <Sort
                            setlowtohigh={setlowtohigh}
                            sethightolow={sethightolow}
                            className="sorting-tab"
                          />
                        </div>

                        {isadmin ? (
                          <button
                            className="product-add"
                            onClick={() => {
                              setAddproduct(true);
                              setMainpage(false);
                            }}
                          >
                            Add Product
                          </button>
                        ) : (
                          <></>
                        )}

                        {/* </div> */}
                      </div>
                    </div>
                    <div className="body-part">
                      <Listing
                        pagenumber={pagenumber}
                        setDetailpage={setDetailpage}
                        setProductDetail={setProductDetail}
                        setEdit={setEdit}
                        lowtohigh={lowtohigh}
                        hightolow={hightolow}
                        setEditName={setEditName}
                        set={set}
                        setTest={setTest}
                        test={test}
                      />
                    </div>
                    <div className="footer-part">
                      <button
                        className="left-button"
                        onClick={() => {
                          if (pagenumber > 1) {
                            setPagenumber(pagenumber - 1);
                          }
                        }}
                      >
                        {"<<"}
                      </button>
                      <button
                        className="middle-button"
                        style={{
                          backgroundColor:
                            pagenumber == 1 ? "#5048e5" : "white",
                        }}
                        onClick={() => {
                          setIfclick(!ifclick);
                          setPagenumber(1);
                        }}
                      >
                        1
                      </button>
                      <button
                        className="middle-button"
                        style={{
                          backgroundColor:
                            pagenumber == 2 ? "#5048e5" : "white",
                        }}
                        onClick={() => {
                          setIfclick(!ifclick);
                          setPagenumber(2);
                        }}
                      >
                        2
                      </button>
                      <button
                        className="middle-button"
                        style={{
                          backgroundColor:
                            pagenumber == 3 ? "#5048e5" : "white",
                        }}
                        onClick={() => {
                          setIfclick(!ifclick);
                          setPagenumber(3);
                        }}
                      >
                        3
                      </button>
                      <button
                        className="middle-button"
                        style={{
                          backgroundColor:
                            pagenumber == 4 ? "#5048e5" : "white",
                        }}
                        onClick={() => {
                          setIfclick(!ifclick);
                          setPagenumber(4);
                        }}
                      >
                        4
                      </button>
                      <button
                        className="middle-button"
                        style={{
                          backgroundColor:
                            pagenumber == 5 ? "#5048e5" : "white",
                        }}
                        onClick={() => {
                          setIfclick(!ifclick);
                          setPagenumber(5);
                        }}
                      >
                        5
                      </button>
                      <button
                        className="right-button"
                        onClick={() => {
                          setIfclick(!ifclick);
                          setPagenumber(pagenumber + 1);
                        }}
                      >
                        {">>"}
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <>
              <div className="outline">
                <h2>Create product</h2>
                <div className="form">
                  <div className="name-product">
                    <span>Product name</span>
                    <br />
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setproductName(e.target.value)}
                    />
                  </div>
                  <div className="description">
                    <span>Product Description </span>
                    <br />
                    <textarea
                      name=""
                      cols="60"
                      rows="6"
                      value={productDescription}
                      onChange={(e) => setproductDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="Category-price">
                    <div className="category">
                      <span>Category</span>
                      <br />
                      <select
                        name=""
                        id=""
                        defaultValue={productCategory}
                        onChange={(e) => setproductCategory(e.target.value)}
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
                        value={productprice}
                        onChange={(e) => setproductprice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="quatity-link">
                    <div className="quantity">
                      <span>In stock Quantity</span>
                      <br />
                      <input
                        type="text"
                        value={productQuantity}
                        onChange={(e) => setproductQuantity(e.target.value)}
                      />
                    </div>
                    <div className="image-link">
                      <span>Add image Link</span>
                      <div className="link-input">
                        <input type="text" onChange={(e) => onchange_text(e)} />
                        <button onClick={() => setimgesource(imagelink)}>
                          Upload
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="image-preview">
                    <img src={imgesource} alt="" />
                  </div>
                  <div className="add-button">
                    <button
                      onClick={() => {
                        adding();
                      }}
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </div>
            </>
          </>
        )}
      </>
    </>
  );
}

export default Product;
