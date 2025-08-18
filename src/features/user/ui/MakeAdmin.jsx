import { Button, ConfigProvider, Input, Popconfirm, Table } from 'antd'
import React, { useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa';
import MakeAdminForm from './MakeAdminForm';
import toast from 'react-hot-toast';
import { useGetAdminsQuery } from '../../../Redux/Apis/service/adminApis';

function MakeAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: admins } = useGetAdminsQuery({ searchTerm: '', page: 1, limit: 10 })
  
  const [data, setData] = useState([
    {
      key: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      key: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
    {
      key: '3',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  ]);
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
        <Popconfirm title="Are you sure to delete this Admin?" onConfirm={() => deleteAdmin(record.key)}>
          <Button size='large' shape='circle' icon={<FaTrash />} />
        </Popconfirm>
      ),
    },
  ];
  const deleteAdmin = (key) => {
    setData((prev) => prev.filter((item) => item.key !== key));
    toast.success('Admin deleted successfully');
  };

  const handleSearch = (value) => {
    setData((prev) => prev.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())));
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
          dataSource={data}
          size='large'
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showQuickJumper: true,
            showTotal: false,
            position: ["bottomCenter"],
            size: "large",
            defaultCurrent: 1,
            total: data?.length,
            onChange: (page, pageSize) => {
              console.log("Page:", page);
              console.log("Page Size:", pageSize);
            },
          }}
          scroll={{ x: "max-content" }}
          rowKey="key" />
      </ConfigProvider>
      <MakeAdminForm setData={setData} open={isModalOpen} onCancel={() => setIsModalOpen(false)} />
    </div>
  )
}

export default MakeAdmin