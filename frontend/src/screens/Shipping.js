import React, { useState } from "react";
import { Form, Button, Row, Col, ListGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";

import { saveShippingAddress } from "../actions/cartActions";

import CheckoutSteps from "../components/CheckoutSteps";
import { Badge } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Shipping = ({ history }) => {
  // Get shipping address from global state
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [contact, setContact] = useState(shippingAddress.contact);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, city, postalCode, country, contact })
    );
    // Move to the payments page
    history.push("/payment");
  };

  return (
    <FormContainer>
      <div style={{ display: "flex" }}>
        <div
          className="sc-left"
          style={{ width: "60%", backgroundColor: "white" }}
        >
          <CheckoutSteps step1 step2 />
          <Form onSubmit={submitHandler} style={{ margin: "20px" }}>
            <Row>
              <Col>
                <span>Contact information</span>
              </Col>
              <Col style={{ textAlign: "right" }}>
                Already have account? <Link to="/login">Login</Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="contact">
                  <Form.Control
                    type="text"
                    placeholder="Email or phone number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <span>Shipping address</span>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="address">
                  <Form.Control
                    type="text"
                    placeholder="Name line"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Form.Group controlId="town">
                  <Form.Control
                    type="text"
                    placeholder="Number line"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col xs={6}>
                <Form.Group controlId="city">
                  <Form.Control
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="country">
                  <Form.Control
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>&lt;- Return to cart</Col>
              <Col style={{ textAlign: "right" }}>
                <Button type="submit" variant="danger" size="lg">
                  Continue to shipping
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div
          className="sc-right"
          style={{ width: "40%", margin: "20px", float: "left" }}
        >
          <ListGroup variant="flush">
            {cart.cartItems.map((item, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={3}>
                    <Badge count={item.qty}>
                      <Image src={item.image} alt={item.name} />
                    </Badge>
                  </Col>
                  <Col>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </FormContainer>
  );
};

export default Shipping;
