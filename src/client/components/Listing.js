import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listingProduct } from "../actions";
import Card from "./Card";
export default function Listing({
  setDetailpage,
  setProductDetail,
  setEdit,
  lowtohigh,
  hightolow,
  setEditName,
  set,
  pagenumber,
  setTest,
  test,
}) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.showProduct);
  // const [showitem, setShowitem] = useState(10);

  const currentnumber_before = (pagenumber - 1) * 10;
  const currentnumber_after = pagenumber * 10;
  useEffect(() => {
    listingProduct(dispatch)();
  }, [dispatch]);
  // }, []);
  if (lowtohigh) {
    product.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (hightolow) {
    product.sort(function (a, b) {
      return b.price - a.price;
    });
  }

  return (
    <>
      {product.map((e, index) => {
        if (currentnumber_before <= index && index < currentnumber_after) {
          // number--;
          return (
            <Card
              setTest={setTest}
              key={index}
              item={e}
              setDetailpage={setDetailpage}
              setProductDetail={setProductDetail}
              setEdit={setEdit}
              setEditName={setEditName}
              set={set}
              test={test}
            />
          );
        }
      })}
    </>
  );
}
