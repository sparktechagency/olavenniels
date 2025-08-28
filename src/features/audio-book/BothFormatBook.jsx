import React, { useState } from "react";
import BookCard from "../../components/books/BookCard";
import { Modal } from "antd";
import BookInfoModal from "../../components/books/components/BookInfoModal";
import toast from "react-hot-toast";
import CategorSelect from "../../components/books/components/share/CategorSelect";
import { useBothFormatBooksQuery, useDeleteBothFormatBookMutation } from "../../Redux/Apis/books/bothFormatBook";
import Loader from "../../components/Loader/Loader";
import NoBookFound from "../../components/common/NoBookFound";
import BothFormateBookCreate from "../../components/books/components/both-formate-book/BothFormateBookCreate";

function BothFormatBook() {
  const [showModal, setShowModal] = useState(false);
  const [showBookDetails, setShowBookDetails] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [category, setCategory] = useState("")
  const [search, setSearch] = useState("")
  const { data: bothFormatBooks, isLoading: isBothFormatBooksLoading } = useBothFormatBooksQuery({ categoryName: category, search: search })
  const [deleteBothFormatBook, { isLoading: isDeleting }] = useDeleteBothFormatBookMutation();

  const handleView = (item) => {
    setSelectedItem(item)
    setShowBookDetails(true)
  };
  const handleEdit = (item) => {
    setSelectedItem(item)
    setShowModal(true)
  };
  const handleDelete = async (item) => {
    try {
      await deleteBothFormatBook({ id: item }).unwrap().then((res) => {
        if (res?.success) {
          toast.success(res?.message || "Book Deleted Successfully")
        }
      })
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete book");
    }
  };

  const handleCategoryChange = (value) => {
    setCategory(value)
  }

  if (isBothFormatBooksLoading) {
    return <Loader message="Loading..." />
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="titleStyle">Both Format Book</h2>
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
        {bothFormatBooks?.books?.length > 0 ? bothFormatBooks?.books?.map((book, i) => (
          <BookCard
            key={i}
            book={book}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            e_book={book?.pdfFile}
          />
        )) : <div className="col-span-4"> <NoBookFound title2="Oops! No Both Format Books Found" title="The Both Format Book library appears to be empty right now. Don't worry, great stories are on their way!" /></div>}
      </div>
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        centered
        footer={null}
        width={800}
        closable={false}
        destroyOnClose
      >
        <BothFormateBookCreate item={selectedItem} setSelectedItem={setSelectedItem} setShowModal={setShowModal} />
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

export default BothFormatBook;
