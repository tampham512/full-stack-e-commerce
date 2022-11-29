import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
// Components
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
// Redux
import { listProducts } from "../actions/productActions";
import CheckboxNav from "../components/CheckboxNav";
import Slider from "../components/Slider";

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

const Home = () => {
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
    <>
      <Slider />
      <div
        style={{
          marginTop: "44px",
          position: "relative",    
          textAlign: "center",
        }}
      >
        <h3
          style={{
            border: "medium none",
            color: "#000",
            fontSize: "28px",
            marginBottom:"0",
            fontWeight: "500", 
          }}
        >
          FEATURED PRODUCT
        </h3>
        <p>Featured Collections Created And Curated By Our Editors.</p>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
      )}
    </>
  );
};

export default Home;
