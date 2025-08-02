import React, { useEffect, useState } from "react";
import BookCard from "../../components/books/BookCard";
import { Select, Input, Button, ConfigProvider, Modal } from "antd";
import BookCreate from "../../components/books/components/BookCreate";

function AudioBook() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(true);
  useEffect(() => {
    fetch("/dummy.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const handleView = (item) => {
    console.log(item);
  };
  const handleEdit = (item) => {
    console.log(item);
  };
  const handleDelete = (item) => {
    console.log(item);
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="titleStyle">Audio Book</h2>
        <div className="flex items-center gap-2">
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  colorBgElevated: "rgb(250,186,0)",
                  colorBgContainer: "rgb(87,87,87)",
                  colorBorder: "rgb(255,255,255)",
                  colorText: "rgb(255,255,255)",
                  optionSelectedBg: "rgb(250,140,22)",
                },
              },
            }}
          >
            <Input placeholder="Search" style={{ width: 250 }} />
            <Select placeholder="Category" style={{ width: 170 }}>
              <Select.Option value="fiction">Fiction</Select.Option>
              <Select.Option value="download">Downloaded</Select.Option>
              <Select.Option value="inProgress">In Progress</Select.Option>
              <Select.Option value="finished">Finished</Select.Option>
            </Select>
          </ConfigProvider>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 cursor-pointer py-[6px] rounded-md !text-sm !text-[var(--font-color)] !bg-[var(--secondary-color)]"
          >
            + Add New Book
          </button>
        </div>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((item, i) => (
          <BookCard
            key={i}
            item={item}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        centered
        footer={null}
        width={800}
      >
        <BookCreate />
      </Modal>
    </div>
  );
}

export default AudioBook;
