import React from "react";

function Loader({ message }) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin mb-3 border-yellow-500 mx-auto"></div>
        <p className="text-zinc-600 dark:text-zinc-400">{message}</p>
      </div>
    </div>
  );
}

export default Loader;
