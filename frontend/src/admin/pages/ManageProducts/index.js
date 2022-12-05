import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../../components/Box";

import Table from "../../components/Table";

import {
  listProducts,
  updateProductById,
  createProduct,
  deleteProductById,
} from "../../../actions/productActions";

import { PlusOutlined } from "@ant-design/icons";
import Button from "../../components/Button";
import { Dropdown, Menu, message, Modal, Popover, Tag } from "antd";
import H1 from "../../components/Heading/H1";
import Upsert from "./components/Upsert";
import useUpdateEffect from "../../../hook/useUpdateEffect";
import ModalDelete from "../../components/Modal/ModalDelete";

function Index() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editId, setEditId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [isModalDelete, setIsModalDelete] = useState(false);
  const upsertProduct = useSelector((state) => state.upsertProduct);

  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalOpen(true);
  };

  useUpdateEffect(() => {
    if (upsertProduct?.data?.status == 200) {
      messageApi.open({
        type: "success",
        content: editId ? "Edited Success!" : "Created Success!",
        duration: 3,
      });
      dispatch(listProducts());
      setIsModalOpen(false);
    }
  }, [upsertProduct]);

  const handleOk = (values) => {
    const formData = new FormData();
    // values
    console.log("🚀 ~ file: index.js:72 ~ handleOk ~ editId", editId);

    formData.append("name", values.name);
    formData.append("countInStock", values.countInStock);
    formData.append("category", values.category);

    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("status", values.status ? 1 : 0);
    console.log(values.image);
    if (values?.image?.length > 0) {
      values.image.forEach((item, index) => {
        if (item && item?.originFileObj) {
          formData.append("image", item?.originFileObj, item?.name);
        }
      });
    }

    if (editId) {
      dispatch(updateProductById(editId, formData));
    } else {
      dispatch(createProduct(formData));
    }

    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalDelete(false);
    setEditId("");
  };
  const handleDelete = () => {
    dispatch(deleteProductById(deleteId));
    dispatch(listProducts());
    setIsModalDelete(false);
    messageApi.open({ type: "success", content: "Success", duration: 3 });
  };
  useEffect(() => {
    dispatch(listProducts());
  }, []);

  const handleClickAction =
    (_id) =>
    ({ key }) => {
      switch (key) {
        case "edit":
          setEditId(_id);
          setIsModalOpen(true);
          break;
        case "delete":
          setDeleteId(_id);
          setIsModalDelete(true);
          break;
      }
    };

  const items = [
    {
      label: "Edit",
      key: "edit",
    },
    {
      label: "Delete",
      key: "delete",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      isSearch: true,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      width: "20%",
      isSearch: true,
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      isSearch: true,
      width: "20%",
      render: (record) => record.createdAt.substring(0, 10),
      sorter: (a, b) => a.createdAt.length - b.createdAt.length,
      sortDirections: ["descend", "ascend", "descend"],
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ["descend", "ascend"],
      render: (_, { status }) =>
        status == 1 ? (
          <Tag color={"green"} key={status}>
            Enable
          </Tag>
        ) : (
          <Tag color={"volcano"} key={status}>
            Disable
          </Tag>
        ),
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      align: "center",
      render: (_, { _id }) => (
        <Dropdown
          menu={{ items, onClick: handleClickAction(_id) }}
          placement="bottom"
          arrow
          trigger={["click"]}
        >
          <Box
            as="i"
            className="bx bx-dots-horizontal-rounded"
            fontSize="35px"
            maxHeight="20px"
            cursor="pointer"
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <Box backgroundColor="#fff" padding="20px">
      {contextHolder}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="20px"
      >
        <Box fontSize="22px" fontWeight="bold">
          Manage Products
        </Box>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="middle"
          onClick={showModal}
        >
          Add Product
        </Button>
      </Box>
      <Modal
        open={isModalDelete}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
        footer={false}
        width="460px"
      >
        <ModalDelete
          onCancel={handleCancel}
          onDelete={handleDelete}
        ></ModalDelete>
      </Modal>
      <Table columns={columns} dataSource={productList?.products} />
      {isModalOpen && (
        <Modal
          title={<H1>{editId ? "Edit" : "Add"} Product</H1>}
          open={isModalOpen}
          onCancel={handleCancel}
          okText="Save"
          cancelText="Cancel"
          footer={false}
          width="1000px"
        >
          <Upsert
            onCancel={handleCancel}
            onFinish={handleOk}
            erorrs={upsertProduct}
            editId={editId}
          />
        </Modal>
      )}
    </Box>
  );
}

export default Index;
