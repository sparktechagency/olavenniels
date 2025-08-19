import { Button, ConfigProvider, Input, Popconfirm, Table } from 'antd'
import React, { useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa';
import MakeAdminForm from './MakeAdminForm';
import toast from 'react-hot-toast';
import { useDeleteAdminMutation, useGetAdminsQuery } from '../../../Redux/Apis/service/adminApis';

function MakeAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1)
  const { data } = useGetAdminsQuery({ page })
  const [deleteAdminMutation] = useDeleteAdminMutation();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Popconfirm title="Are you sure to delete this Admin?" onConfirm={() => deleteAdmin(record?._id)}>
          <Button size='large' shape='circle' icon={<FaTrash />} />
        </Popconfirm>
      ),
    },
  ];
  const deleteAdmin = async (key) => {
    console.log(key)
    try {
      await deleteAdminMutation({ id: key }).unwrap().then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          setPage(1);
        }
      });
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  const handleSearch = (value) => {
    // setData((prev) => prev.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())));
  };
  return (
    <div>
      <div className="flex items-center gap-2 justify-end">
        <Input
          placeholder="Search Admin"
          onChange={(e) => handleSearch(e.target.value)}
          size="large"
          className="max-w-[250px]"
        />
        <Button
          type="primary"
          size="large"
          icon={<FaPlus />}
          onClick={() => setIsModalOpen(true)}
          style={{ backgroundColor: "var(--secondary-color)", color: "white" }}
        >
          Add Admin
        </Button>
      </div>
      <h1 className="text-2xl text-white font-bold mb-4">All Admin</h1>
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
          bordered
          columns={columns}
          dataSource={data?.admins}
          size='large'
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showQuickJumper: true,
            showTotal: false,
            position: ["bottomCenter"],
            size: "large",
            defaultCurrent: 1,
            total: data?.admins?.length,
            onChange: (page, pageSize) => {
              console.log("Page:", page);
              console.log("Page Size:", pageSize);
            },
          }}
          scroll={{ x: "max-content" }}
          rowKey="_id" />
      </ConfigProvider>
      <MakeAdminForm open={isModalOpen} onCancel={() => setIsModalOpen(false)} />
    </div>
  )
}

export default MakeAdmin