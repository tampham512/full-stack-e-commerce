import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// Components
import Product from "../components/Product";
// Redux
import { listProducts } from "../actions/productActions";
import CheckboxNav from "../components/CheckboxNav";

const listCheckbox = [
  {
    title: "available",
    list: [
      {
        name: "In stock",
        value: "in_stock",
      },
      {
        name: "Out of stock",
        value: "out_of_stock",
      },
    ],
  },
  {
    title: "product type",
    list: [
      { name: "assorted", value: "assorted" },
      { name: "box", value: "box", disabled: true },
      { name: "chair", value: "chair", disabled: true },
      { name: "pant", value: "pant" },
    ],
  },
];

const ListProduct = () => {
  const dispatch = useDispatch();
  // Grab the data from the state
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // Whatever is put inside the useEffect function will run as soon as the component loads.
  useEffect(() => {
    // Dispatch the list products action and fill our state
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div style={{ display: "flex" }}>
      <CheckboxNav listCheck={listCheckbox} />
      <Row style={{ width: "75%" }} md={3}>
        {products.map((product) => (
          <Col key={product._id} sm>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ListProduct;
