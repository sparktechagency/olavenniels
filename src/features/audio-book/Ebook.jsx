import React, { useEffect, useState } from "react";
import BookCard from "../../components/books/BookCard";
import { ConfigProvider, Input, Modal, Select } from "antd";
import BookCreate from "../../components/books/components/BookCreate";
import BookInfoModal from "../../components/books/components/BookInfoModal";
import toast from "react-hot-toast";
import { useAllBooksQuery } from "../../Redux/Apis/books/eBookApi";

function Ebook() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showBookDetails, setShowBookDetails] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const { data: booksData } = useAllBooksQuery()
  console.log(booksData?.ebooks)
  useEffect(() => {
    fetch("/dummy2.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const handleView = (item) => {
    setSelectedItem(item)
    setShowBookDetails(true)
  };
  const handleEdit = (item) => {
    setSelectedItem(item)
    setShowModal(true)
  };
  const handleDelete = (item) => {
    console.log(item);
    toast.success("Delete functionality is not implemented yet")
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="titleStyle">E - Book</h2>
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
        {booksData?.ebooks?.map((book) => (
          <BookCard
            key={book?._id}
            book={book}
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
        <BookCreate setShowModal={setShowModal} />
      </Modal>
      <Modal
        open={showBookDetails}
        onCancel={() => setShowBookDetails(false)}
        centered
        footer={null}
        width={600}
        maskClosable={false}
        destroyOnClose
      >
        <BookInfoModal item={selectedItem} />
      </Modal>
    </div>
  );
}

export default Ebook;
