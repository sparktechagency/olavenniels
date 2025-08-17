import React, { useState, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import BookImage from "./components/BookImage";
import BookInfo from "./components/BookInfo";
import { imageUrl } from "../../utils/server";
import AudioControls from "./components/audio_related/AudioControls";

function BookCard({ item, onView, onEdit, onDelete, e_book }) {
  const [showAudio, setShowAudio] = useState(false);
  const audioRef = useRef(null);

  const handlePlayClick = useCallback(() => {
    if (!item?.audioFile) return;
    setShowAudio(true);
    requestAnimationFrame(() => {
      audioRef.current?.play()?.catch(console.error);
    });
  }, [item?.audioFile]);

  const handleCloseClick = useCallback(() => {
    setShowAudio(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const handleAudioEnded = useCallback(() => {
  }, []);

  const handleView = useCallback(() => {
    onView(item);
  }, []);

  const handleEdit = useCallback(() => {
    onEdit(item);
  }, []);

  const handleDelete = useCallback(() => {
    onDelete(item);
  }, []);

  return (
    <div className="p-4 bg-[var(--primary-color)] rounded border border-gray-200/40 shadow-md">
      <BookImage banner={imageUrl(item?.bookCover)} bookName={item?.bookName} />

      <div className="mt-3 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {showAudio ? (
            <AudioControls
              audio={item?.audioFile}
              audioRef={audioRef}
              onEnded={handleAudioEnded}
              onClose={handleCloseClick}
            />
          ) : (
            <BookInfo
              bookName={item?.bookName}
              author={item?.author}
              category={item?.category?.name}
              hasAudio={!!item?.audioFile}
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
