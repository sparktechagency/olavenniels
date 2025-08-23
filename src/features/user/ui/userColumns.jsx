import React from "react";
import { FaEye } from "react-icons/fa";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Tag, Tooltip } from "antd";
import UserImage from "../../../components/common/UserImage";

export const userColumns = (onView, onBlock) => [
  {
    title: "User",
    key: "user",
    render: (_, record) => (
      <div className="flex items-center gap-2">
        <UserImage user={record} />
      </div>
    ),
  },
  {
    title: "Verified",
    dataIndex: "isVerified",
    key: "isVerified",
    render: (isVerified) =>
      isVerified ? (
        <Tag color="green">Verified</Tag>
      ) : (
        <Tag color="red">Not Verified</Tag>
      ),
  },
  {
    title: "Blocked",
    dataIndex: "isBlocked",
    key: "isBlocked",
    render: (isBlocked) =>
      isBlocked ? (
        <Tag color="red">Blocked</Tag>
      ) : (
        <Tag color="blue">Active</Tag>
      ),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date) => new Date(date).toLocaleDateString(),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space>
        <Tooltip title="View User">
          <Button shape="circle" icon={<FaEye />} onClick={() => onView(record)} />
        </Tooltip>
        <Tooltip title={`Block / Unblock`}>
          <Popconfirm
            placement="bottomRight"
            title={`Are you sure to ${record.isBlocked ? "unblock" : "block"} this user?`}
            onConfirm={() => onBlock(record)}>
            <Button shape="circle" danger={record.isBlocked} icon={!record.isBlocked ? <UnlockOutlined /> : <LockOutlined />} />
          </Popconfirm>
        </Tooltip>
      </Space>
    ),
  },
];
