import React from "react";
import { Table, Button, Space, message, Input, Tag, ConfigProvider } from "antd";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { FaEye } from "react-icons/fa";

function AllUser() {
  const [userData, setUserData] = React.useState([
    {
      key: "1",
      name: "John Doe",
      userImage:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
      userType: "Free",
      country: "Bangladesh",
      email: "john.doe@example.com",
      isBlocked: false,
    },
    {
      key: "2",
      name: "Jane Smith",
      userImage:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
      userType: "Premium",
      country: "Bangladesh",
      email: "jane.smith@example.com",
      isBlocked: false,
    },
    {
      key: "3",
      name: "John Doe",
      userImage:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
      userType: "Not Subscribed",
      country: "Bangladesh",
      email: "john.doe@example.com",
      isBlocked: false,
    },
  ]);

  const columns = [
    {
      title: "User’s Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <img
            src={record.userImage}
            alt="User"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Subscription",
      dataIndex: "userType",
      key: "userType",
      render: (text, record) => (
        <Tag color={record.userType === "Premium" ? "green" : record.userType === "Free" ? "blue" : "red"}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            shape="circle"
            icon={<FaEye />}
            onClick={() => handleViewUser(record)}
          />
          <Button
            shape="circle"
            danger={!record.isBlocked}
            style={{
              backgroundColor: record.isBlocked ? "#1890ff" : "#ff4d4f",
              color: record.isBlocked ? "white" : "white",
            }}
            icon={record.isBlocked ? <UnlockOutlined /> : <LockOutlined />}
            onClick={() => handleToggleBlock(record)}
          />
        </Space>
      ),
    },
  ];

  const handleToggleBlock = (record) => {
    const updatedData = userData.map((user) =>
      user.key === record.key
        ? {
          ...user,
          isBlocked: !user.isBlocked,
        }
        : user
    );
    setUserData(updatedData);
    message.success(
      `User ${record.name} is now ${record.isBlocked ? "unblocked" : "blocked"}`
    );
  };

  const handleViewUser = (record) => {
    console.log(record)
  };

  const handleSearch = (value) => {
    console.log(value);
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 justify-end">
        <Input
          placeholder="Search users"
          onChange={handleSearch}
          size="large"
          className="mb-4 max-w-[400px]"
        />
      </div>
      <h1 className="text-2xl text-white font-bold mb-4">All Users</h1>
      <ConfigProvider theme={{
        components: {
          Table: {
            colorBgContainer: "rgb(42,42,42)",
            colorText: "rgba(255,255,255,0.88)",
            colorTextHeading: "rgba(255,255,255,0.88)"
          }
        }
      }}>
        <Table
          scroll={{ x: "max-content" }}
          columns={columns}
          bordered
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showQuickJumper: true,
            showTotal: false,
            position: ["bottomCenter"],
            size: "large",
            defaultCurrent: 1,
            total: userData.length,
            onChange: (page, pageSize) => {
              console.log("Page:", page);
              console.log("Page Size:", pageSize);
            },
          }}
          dataSource={userData}
        /></ConfigProvider>
    </div>
  );
}

export default AllUser;
