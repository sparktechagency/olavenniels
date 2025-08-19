import React, { useState } from "react";
import { Table, Button, Space, Input, ConfigProvider, Popconfirm } from "antd";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import CategoryCreateModal from "./components/CategoryCreateModal";
import { useGetCategoriesQuery, useDeleteCategoryMutation } from "../../Redux/Apis/service/categoryApis";
import { imageUrl } from "../../utils/server";

function Category() {
  const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  const [deleteCategory, { isLoading: isDeleteLoading }] = useDeleteCategoryMutation();
  const [categoryData, setCategoryData] = useState([
    {
      key: "1",
      name: "John Doe",
      image:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
    },
    {
      key: "2",
      name: "Jane Smith",
      image:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
    },
    {
      key: "3",
      name: "John Doe",
      image:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img
          src={imageUrl(record?.image)}
          alt="User"
          style={{ width: 50, height: 50, borderRadius: "5%" }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            shape="circle"
            icon={<FaEdit />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            placement="bottomRight"
            title="Are you sure to delete this category?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record)}>
            <Button shape="circle" icon={<FaTrash />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = async (record) => {
    try {
      await deleteCategory({ id: record?._id }).unwrap().then((res) => {
        if (res?.success) {
          toast.success(res?.message);
        }
      })
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  const handleEdit = (record) => {
    setIsModalOpen(true);
    setData(record);
  };

  const handleSearch = (value) => {
    console.log(value);
  };
  const handleAddCategory = () => {
    setIsModalOpen(true);
    setData(null);
  }
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 justify-end">
        <Input
          placeholder="Search Category"
          onChange={handleSearch}
          size="large"
          className="mb-4 max-w-[250px]"
        />
        <Button
          type="primary"
          size="large"
          icon={<FaPlus />}
          onClick={() => handleAddCategory()}
          style={{ backgroundColor: "var(--secondary-color)", color: "white" }}
        >
          Add Category
        </Button>
      </div>
      <h1 className="text-2xl text-white font-bold mb-4">All Category</h1>
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
          loading={isCategoriesLoading || isDeleteLoading}
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
            total: categories?.data?.pagination?.total,
            current: categories?.data?.pagination?.page,
            onChange: (page, pageSize) => {
              console.log("Page:", page);
              console.log("Page Size:", pageSize);
            },
          }}
          dataSource={categories?.data?.bookCategories}
        /></ConfigProvider>
      <CategoryCreateModal categoryData={data} open={isModalOpen} onCancel={() => setIsModalOpen(false)} />
    </div>
  );
}
export default Category