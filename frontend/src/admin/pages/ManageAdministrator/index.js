import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../../components/Box";

import Table from "../../components/Table";
import { createUser, getUsersAdmin } from "../../../actions/userActions";

import {
  DotChartOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Button from "../../components/Button";
import { Dropdown, Menu, message, Modal, Popover, Tag } from "antd";
import H1 from "../../components/Heading/H1";
import Upsert from "./components/Upsert";

function Index() {
  const dispatch = useDispatch();
  const usersAdmin = useSelector((state) => state.usersAdmin);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState("");

  const createUserData = useSelector((state) => state.getData);
  console.log(
    "🚀 ~ file: index.js:21 ~ Index ~ createUserData",
    createUserData
  );
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (createUserData?.user?.status == 200) {
      messageApi.open({
        type: "success",
        content: "Created Success!",
        duration: 5,
      });
      dispatch(getUsersAdmin());
      setIsModalOpen(false);
    }
  }, [createUserData]);

  const handleOk = (values) => {
    console.log(values);
    dispatch(createUser({ ...values, isAdmin: true }));
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getUsersAdmin());
  }, []);
  const handleClickAction =
    (_id) =>
    ({ key }) => {
      switch (key) {
        case "edit":
          setEditId(_id);
          setIsModalOpen(true);
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
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      isSearch: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      isSearch: true,
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      isSearch: true,
      width: "20%",

      //   sorter: (a, b) => a.address.length - b.address.length,
      //   sortDirections: ["descend", "ascend"],
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
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box fontSize="22px" marginBottom="20px" fontWeight="bold">
          Manage Adminstrator
        </Box>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="middle"
          onClick={showModal}
        >
          Add
        </Button>
      </Box>

      <Table columns={columns} dataSource={usersAdmin?.user?.data} />
      <Modal
        title={<H1>{editId ? "Edit" : "Add"} Administrator</H1>}
        open={isModalOpen}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
        footer={false}
      >
        <Upsert
          onCancel={handleCancel}
          onFinish={handleOk}
          erorrs={createUserData}
          editId={editId}
        />
      </Modal>
    </Box>
  );
}

export default Index;
