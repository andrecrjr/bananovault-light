import React from "react";

export default function Modal({ children, modal }) {
  return (
    <div
      className={`${
        modal.value ? `flex` : `hidden`
      } flex-col items-center bg-black bg-opacity-50  fixed justify-center text-center top-0 left-0 right-0 bottom-0`}
    >
      <div className={`left-5 text-black`}>
        <button
          className='absolute text-white'
          onClick={(e) => modal.setModal((data) => !data)}
        >
          X
        </button>

        {children}
      </div>
    </div>
  );
}
