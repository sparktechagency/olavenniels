import React, { useState, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import BookImage from "./components/BookImage";
import BookInfo from "./components/BookInfo";
import AudioControls from "./components/AudioControls";

function BookCard({ item, onView, onEdit, onDelete ,e_book }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAudio, setShowAudio] = useState(false);
  const audioRef = useRef(null);

  const handlePlayClick = useCallback(() => {
    if (!item?.audio) return;

    setShowAudio(true);
    setIsPlaying(true);

    requestAnimationFrame(() => {
      audioRef.current?.play()?.catch(console.error);
    });
  }, [item?.audio]);

  const handleCloseClick = useCallback(() => {
    setShowAudio(false);
    setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false);
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
      <BookImage banner={item?.banner} bookName={item?.bookName} />

      <div className="mt-3 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {showAudio ? (
            <AudioControls
              audio={item?.audio}
              audioRef={audioRef}
              onEnded={handleAudioEnded}
              onClose={handleCloseClick}
            />
          ) : (
            <BookInfo
              bookName={item?.bookName}
              author={item?.author}
              category={item?.category}
              hasAudio={!!item?.audio}
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
