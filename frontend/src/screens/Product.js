import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Bootstrap Components
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";

import { Button as Bt } from "antd";
// Components
import Rating from "../components/Rating";
// Redux Actions
import { listProductDetails, listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import styled from "styled-components";
import Product from "../components/Product";

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  // Grab the data from the state
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // Whatever is put inside the useEffect function will run as soon as the component loads.
  useEffect(() => {
    // Dispatch the list products action and fill our state
    dispatch(listProducts());
  }, [dispatch]);

  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loadingDetail, errorDetail, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  const handleMinus = (e) => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handlePlus = (e) => {
    if (qty < product.countInStock) {
      setQty(qty + 1);
    }
  };
  return (
    <>
      <Link className="btn btn-secondary my-3" to="/">
        Go Back
      </Link>
      {loadingDetail ? (
        <Loader />
      ) : errorDetail ? (
        <Message variant="danger">{errorDetail}</Message>
      ) : (
        <>
          <Wrapper>
            <Row>
              <Col md={5}>
                <Image src={product.image} alt={product.name} fluid></Image>
              </Col>
              <Col md={7}>
                <div className="info">
                  <h3>{product.name}</h3>
                  <p>
                    <span className="price">${product.price}</span>
                  </p>
                  <div>
                    <span>
                      {product.countInStock > 0
                        ? `Available: ${product.countInStock} In Stock`
                        : "Out of Stock"}{" "}
                    </span>
                  </div>
                </div>
                <div className="describe">
                  <p>{product.description}</p>
                </div>
                <Row>
                  <Col md={2}>
                    <Quantity className="control-qty">
                      <div className="minus" onClick={(e) => handleMinus(e)}>
                        <span>-</span>
                      </div>
                      <div>{qty}</div>
                      <div className="plus" onClick={(e) => handlePlus(e)}>
                        <span>+</span>
                      </div>
                    </Quantity>
                  </Col>
                  <Col md={8}>
                    <Bt
                      disabled={product.countInStock === 0}
                      type="primary"
                      danger
                      onClick={addToCartHandler}
                    >
                      ADD TO CART
                    </Bt>{" "}
                  </Col>
                </Row>
                <div className="category">
                  <p>Category: {product.category}</p>
                </div>
              </Col>
            </Row>
          </Wrapper>
          <Row>
            <>
              <div className="advertise-product" style={{marginBottom:"-20px"}}>
                <div>
                  <h3>RELATED PRODUCTS</h3>
                </div>
              </div>
              <Row md={4}>
                {products.slice(0, 4).map((product) => (
                  <Col key={product._id} sm>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </>
          </Row>
          <Row>
            <>
              <div className="advertise-product" style={{marginBottom:"-20px"}}>
                <h3>CUSTOM COLLECTION</h3>
              </div>
              <Row md={4}>
                {products.slice(0, 4).map((product) => (
                  <Col key={product._id} sm>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;

const Quantity = styled.div`
  display: flex;
  padding-top: 5px;
  div {
    background-color: rgba(255, 255, 255);
    width: 30px;
    border: 1px solid #000;
    height: 30px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }

  .plus {
    border-radius: 0 3px 3px 0;
  }
  .minus {
    border-radius: 3px 0 0 3px;
  }
`;

const Wrapper = styled.div`
  h3 {
    font-size: 34px;
    font-weight: 400;
    line-height: 28px;
    margin-bottom: 10px;
    color: #000;
  }

  .price {
    font-size: 24px;
  }

  .describe {
    border-bottom: 1px solid #e1e1e1;
    border-top: 1px solid #e1e1e1;
    clear: both;
    margin: 25px 0;
    padding: 19px 0;
    word-wrap: break-word;

    p {
      font-size: 15px;
      line-height: 24px;
      font-weight: 400;
    }
  }

  .category {
    margin-top: 20px;
  }
`;
