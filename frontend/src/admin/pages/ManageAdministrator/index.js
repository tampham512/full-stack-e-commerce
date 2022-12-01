import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../../components/Box";

import Table from "../../components/Table";
import { getUsersAdmin } from "../../../actions/userActions";

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

function Index() {
  const dispatch = useDispatch();
  const usersAdmin = useSelector((state) => state.usersAdmin);
  console.log("🚀 ~ file: index.js:39 ~ Index ~ usersAdmin", usersAdmin);

  useEffect(() => {
    dispatch(getUsersAdmin());
  }, []);

  const columns = [
    {
      title: "Name",
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
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      isSearch: true,
      //   sorter: (a, b) => a.address.length - b.address.length,
      //   sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",

      //   sorter: (a, b) => a.address.length - b.address.length,
      //   sortDirections: ["descend", "ascend"],
    },
  ];
  return (
    <Box backgroundColor="#fff" padding="20px">
      <Box fontSize="22px" marginBottom="20px" fontWeight="bold">
        Manage Adminstrator
      </Box>
      <Table columns={columns} dataSource={usersAdmin?.user?.data} />
    </Box>
  );
}

export default Index;
