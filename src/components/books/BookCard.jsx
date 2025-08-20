import React, { useState, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import BookImage from "./components/BookImage";
import BookInfo from "./components/BookInfo";
import { imageUrl } from "../../utils/server";
import AudioControls from "./components/audio_related/AudioControls";

function BookCard({ book, onView, onEdit, onDelete, e_book }) {
  const [showAudio, setShowAudio] = useState(false);
  const audioRef = useRef(null);

  const handlePlayClick = useCallback(() => {
    if (!book?.audioFile) return;
    setShowAudio(true);
    requestAnimationFrame(() => {
      audioRef.current?.play()?.catch(console.error);
    });
  }, [book?.audioFile]);

  const handleCloseClick = useCallback(() => {
    setShowAudio(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [audioRef]);

  const handleAudioEnded = useCallback(() => {
    setShowAudio(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [audioRef]);

  const handleView = useCallback(() => {
    onView(book);
  }, [book]);

  const handleEdit = useCallback(() => {
    onEdit(book);
  }, [book]);

  const handleDelete = useCallback(() => {
    onDelete(book?._id);
  }, [book]);

  return (
    <div className="p-4 bg-[var(--primary-color)] rounded border border-gray-200/40 shadow-md">
      <BookImage banner={imageUrl(book?.bookCover)} bookName={book?.bookName} />

      <div className="mt-3 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {showAudio ? (
            <AudioControls
              audio={book?.audioFile}
              audioRef={audioRef}
              onEnded={handleAudioEnded}
              onClose={handleCloseClick}
            />
          ) : (
            <BookInfo
              bookName={book?.bookName}
              author={book?.author}
              category={book?.category?.name}
              hasAudio={!!book?.audioFile}
              onPlayClick={handlePlayClick}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              e_book={e_book}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default React.memo(BookCard);
