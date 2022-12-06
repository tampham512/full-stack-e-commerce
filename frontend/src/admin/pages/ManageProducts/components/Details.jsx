import { listProductDetails } from "../../../../actions/productActions";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Form, Input, Skeleton, Switch, Upload } from "antd";
import React, { useMemo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Box from "../../../../components/Box";
import Button from "../../../components/Button";
import { getOrderDetails } from "../../../../actions/orderActions";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Message from "../../../../components/Message";
import { Link } from "react-router-dom";

const { TextArea } = Input;
function Upsert(props) {
  const { onCancel, detailsId } = props;
  // Get order details from state
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);

  useEffect(() => {
    if (detailsId) {
      dispatch(listProductDetails(detailsId));
    }
  }, [detailsId]);

  const dataImg = useMemo(() => {
    return productDetails?.product?.image?.map((item) => ({
      uid: item._id,
      name: item.src,
      status: "done",
      url: `/images/${item.src}`,
    }));
  }, [productDetails]);

  return (
    <Skeleton loading={!productDetails?.product}>
      <StyledUpsert>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                {/* <h2>Shipping</h2> */}
                <p>
                  <strong>Name: </strong>
                  {productDetails?.product.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  {/* {order.user.email} */}
                </p>
                <p>
                  <strong>Address: </strong>
                  {/* {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country} */}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  Payment on delivery
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <Upload listType="picture-card" fileList={dataImg}>
                  {""}
                </Upload>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Review List</h2>
                {productDetails?.product.length === 0 ? (
                  <Message>Review is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {productDetails?.product?.reviews.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col>{item.user.email}</Col>
                          <Col>{item.comment}</Col>
                          <Col>{item.rating}</Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          {/* <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  {error && <Message variant="danger">{error}</Message>}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col> */}
        </Row>

        <Box className="footer-modal-form">
          <Button onClick={onCancel}>Cancel</Button>
        </Box>
      </StyledUpsert>
    </Skeleton>
  );
}

export default Upsert;
export const StyledUpsert = styled.div`
  margin-top: 20px;
  .ant-form-item {
    margin-bottom: 16px !important;
  }

  .ant-input-password {
    padding: 0px 11px;
  }
  .ant-form-item-label {
    padding-bottom: 0;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;
