import React from "react";
import { Button, Card } from "react-bootstrap";
import style from "styled-components";
import Rating from "./Rating";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const addToCartHandler = (id) => {
    console.log("asd", id);
  };
  return (
    <Card className="my-3 p-3 rounded">
      <Wrapper>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>

        <div className="product-hover">
          <div className="action">
            <div className="item" onClick={(e) => addToCartHandler(product._id)}>
              <i className="fa fa-shopping-cart"></i>
            </div>
            <div className="item">
              <i class="fa fa-heart"></i>
            </div>
            <div className="item">
              <i class="fa fa-eye"></i>
            </div>
          </div>
        </div>
      </Wrapper>
    </Card>
  );
};

export default Product;

const Wrapper = style.div` 
  position: relative;
  
  .product-hover {
    padding: 0 16px;
    position: absolute;   
    transform: translateY(20px);
    transition: transform 1s ease 1s;
    width: 100%;     
    display:none;

    .action {  
      background: #fbfbfb none repeat scroll 0 0;
      box-shadow: 0 2px 3px #0000001a;
      padding: 7px 28px;
      overflow: hidden;

      .item {
        color: #a3a3a3;
        font-size: 20px;
        line-height: 32px;
        width: 33%; 
        padding: 4px;
        text-align: center; 
        background: transparent;
        border-radius: 50%;
        display: inline-block;

        &:hover {
          color: #fff;
          background: #f05b64;
        }
      }
    }
  }
  &:hover { 
    .product-hover {
        bottom 20px;
        transform: translateY(0);
        display:block;
    }
  }
  
`;
