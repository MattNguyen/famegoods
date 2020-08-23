import React, { useEffect, useState, useRef } from "react";

export default function BottomSheetModal({ children, onExit }) {
  const [didMount, setDidMount] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setDidMount(true);
    }, 50);
    return () => document.body.classList.remove("fixed");
  }, []);
  function exit() {
    setDidMount(false);
    setTimeout(() => {
      onExit();
    }, 100);
  }
  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-10 bg-black bg-opacity-75 flex flex-col"
    >
      <div onClick={exit} className="h-32 w-full" />
      <div
        className={
          "flex-auto w-full bg-white rounded-t-lg relative transform transition-transform duration-300 ease-in-out " +
          (didMount ? "translate-y-0" : "translate-y-full")
        }
      >
        <div
          className="absolute w-32 top-0 border-2 border-gray-400 m-6"
          style={{ left: "26%" }}
        />
        {children}
      </div>
    </div>
  );
}

