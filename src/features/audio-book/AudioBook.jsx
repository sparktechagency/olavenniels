import React, { useState, useCallback } from "react";
import BookCard from "../../components/books/BookCard";
import { Select, Input, ConfigProvider, Modal } from "antd";
import AudioBookCreate from "../../components/books/components/audio_related/AudioBookCreate";
import BookInfoModal from "../../components/books/components/BookInfoModal";
import toast from "react-hot-toast";
import { useAllAudioBooksQuery, useDeleteAudioBookMutation } from "../../Redux/Apis/books/audioBookApi";
import Loader from "../../components/Loader/Loader";
import CategorSelect from "../../components/books/components/share/CategorSelect";

function AudioBook() {
  const [showModal, setShowModal] = useState(false);
  const [showBookDetails, setShowBookDetails] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [search, setSearch] = useState("")
  const { data: audioBooks, isLoading: isAudioBooksLoading } = useAllAudioBooksQuery();
  const [deleteAudioBook, { isLoading }] = useDeleteAudioBookMutation()
  const handleView = useCallback((item) => {
    setSelectedItem(item)
    setShowBookDetails(true)
  }, [])
  const handleEdit = useCallback((item) => {
    setSelectedItem(item)
    setShowModal(true)
  }, [])
  const handleDelete = useCallback(async (item) => {
    await deleteAudioBook({ id: item?._id }).unwrap().then((res) => {
      if (res?.success) {
        toast.success(res?.message || "Audio Book Deleted Successfully")
      }
    })
  }, [deleteAudioBook])

  if (isAudioBooksLoading) {
    return <Loader message="Loading Audio Books..." />
  }
  const handleCategoryChange = (value) => {
    console.log(value)
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="titleStyle">Audio Book</h2>
        <div className="flex items-center gap-2">
          <CategorSelect onChange={handleCategoryChange} setSearch={setSearch} />
          <button
            onClick={() => setShowModal(true)}
            className="px-4 cursor-pointer py-[6px] rounded-md !text-sm !text-[var(--font-color)] !bg-[var(--secondary-color)]"
          >
            + Add New Book
          </button>
        </div>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.isArray(audioBooks?.data?.audioBooks) && audioBooks?.data?.audioBooks?.length > 0 ? audioBooks?.data?.audioBooks?.map((book) => (
          <BookCard
            key={book?._id}
            book={book}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            e_book={false}
          />
        )) : <p>No Audio Books Found</p>}
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
        <AudioBookCreate item={selectedItem} setShowModal={setShowModal} />
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

export default AudioBook;
