import { Button, ConfigProvider, Input, Popconfirm, Table } from 'antd'
import React, { useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa';
import MakeAdminForm from './MakeAdminForm';
import toast from 'react-hot-toast';
import { useDeleteAdminMutation, useGetAdminsQuery } from '../../../Redux/Apis/service/adminApis';

function MakeAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const { data, isLoading } = useGetAdminsQuery({ page, search: searchTerm, limit: 5 })
  const [deleteAdminMutation, { isLoading: isDeleting }] = useDeleteAdminMutation();
  const [deleteID, setDeleteID] = useState(null)
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
        <Popconfirm title="Are you sure to delete this Admin?" onConfirm={() => {
          deleteAdmin(record?._id)
          setDeleteID(record?._id)
        }}>
          <Button loading={deleteID === record?._id} disabled={deleteID === record?._id} size='large' shape='circle' icon={<FaTrash />} />
        </Popconfirm>
      ),
    },
  ];
  const deleteAdmin = async (key) => {
    try {
      await deleteAdminMutation({ id: key }).unwrap().then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          setPage(1);
          setDeleteID(null)
        }
      });
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
      setDeleteID(null)
    }
    finally {
      setDeleteID(null)
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value)
    setPage(1)
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
          loading={isLoading}
          bordered
          columns={columns}
          dataSource={data?.admins}
          size='large'
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showQuickJumper: false,
            showTotal: false,
            position: ["bottomCenter"],
            size: "large",
            defaultCurrent: 1,
            total: data?.admins?.length,
            onChange: (page) => {
              setPage(page)
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