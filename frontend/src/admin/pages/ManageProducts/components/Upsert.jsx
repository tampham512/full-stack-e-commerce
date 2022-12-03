import { listProductDetails } from "../../../../actions/productActions";
import { Form, Input, Skeleton, Switch } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Box from "../../../../components/Box";
import Button from "../../../components/Button";

const { TextArea } = Input;
function Upsert(props) {
  const { onFinish, onCancel, erorrs, editId } = props;
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);

  const [form] = Form.useForm();
  useEffect(() => {
    if (erorrs?.data?.status == 400) {
      form.setFields([
        {
          name: "slug",
          errors: [erorrs?.data?.data.email],
        },
      ]);
    }
  }, [erorrs]);
  useEffect(() => {
    if (productDetails?.product && editId) {
      form.setFieldsValue({
        name: productDetails?.product.name,
        slug: productDetails?.product.slug,
        description: productDetails?.product.description,
        status: productDetails?.product?.status ? true : false,
      });
    }
  }, [productDetails]);

  useEffect(() => {
    if (editId) {
      dispatch(listProductDetails(editId));
    } else {
      form.setFieldsValue({
        name: "",
        slug: "",
        description: "",
        status: true,
      });
    }
  }, [editId]);

  useEffect(() => {
    form.setFieldsValue({
      name: "",
      slug: "",
      description: "",
      status: true,
    });
  }, []);

  return (
    <Skeleton loading={editId && !productDetails?.product}>
      <StyledUpsert>
        <Form
          onFinish={onFinish}
          layout="vertical"
          className="row-col"
          form={form}
        >
          <Form.Item
            className="username"
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input name category!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            className="dataname"
            label="slug"
            name="slug"
            rules={[
              {
                required: true,
                message: "Please input slug category!",
              },
            ]}
            autoComplete={false}
          >
            <Input placeholder="Slug" />
          </Form.Item>

          <Form.Item
            className="description"
            label="Description"
            name="description"
          >
            <TextArea rows={4} placeholder="Description" />
          </Form.Item>

          {editId && (
            <Form.Item
              className="dataname"
              label="Status"
              name="status"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          )}
          <Box className="footer-modal-form">
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" className="ml-2" htmlType="submit">
              Save
            </Button>
          </Box>
        </Form>
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
