import React, { useEffect, useState } from "react";
import BookCard from "../../components/books/BookCard";
import { Modal } from "antd";
import BookInfoModal from "../../components/books/components/BookInfoModal";
import toast from "react-hot-toast";
import { useAllBooksQuery, useDeleteEBookMutation } from "../../Redux/Apis/books/eBookApi";
import CategorSelect from "../../components/books/components/share/CategorSelect";
import Loader from "../../components/Loader/Loader";
import EbookCreate from "../../components/books/components/book-creation/EbookCreate";
import NoBookFound from "../../components/common/NoBookFound";

function Ebook() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("")
  const [showBookDetails, setShowBookDetails] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [category, setCategory] = useState("")
  const { data: ebooks, isLoading } = useAllBooksQuery({ categoryName: category, search })
  const [deleteEBook] = useDeleteEBookMutation()
  const handleView = (item) => {
    setSelectedItem(item)
    setShowBookDetails(true)
  };
  const handleEdit = (item) => {
    setSelectedItem(item)
    setShowModal(true)
  };
  const handleDelete = async (item) => {
    console.log(item)
    try {
      await deleteEBook({ id: item }).unwrap().then((res) => {
        if (res?.success) {
          toast.success(res?.message || "Ebook Deleted Successfully")
        }
      })
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong")
    }
  };
  //for filter by category
  const handleCategoryChange = (value) => {
    setCategory(value)
  }

  if (isLoading) {
    return <Loader message="Loading Ebook..." />
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="titleStyle">E-book</h2>
        <div className="flex items-center gap-2">
          <CategorSelect style={{ width: "200px" }} onChange={handleCategoryChange} setSearch={setSearch} /> {/*for filter by category*/}
          <button
            onClick={() => setShowModal(true)}
            className="px-4 cursor-pointer py-[6px] rounded-md !text-sm !text-[var(--font-color)] !bg-[var(--secondary-color)]"
          >
            + Add New Book
          </button>
        </div>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.isArray(ebooks?.ebooks) && ebooks?.ebooks?.length > 0 ? ebooks?.ebooks?.map((book) => {
          return (
            <BookCard
              key={book?._id}
              book={book}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              e_book={book?.pdfFile}
            />
          )
        }) : <div className="col-span-4">
          <NoBookFound title="The E-book library appears to be empty right now. Don't worry, great stories are on their way!" />
        </div>}
      </div>
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        centered
        footer={null}
        width={800}
        closeIcon={false}
        maskClosable={false}
        destroyOnClose
      >
        <EbookCreate item={selectedItem} setShowModal={setShowModal} />
      </Modal>
      <Modal
        open={showBookDetails}
        onCancel={() => {
          setSelectedItem(null)
          setShowBookDetails(false)
        }}
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
