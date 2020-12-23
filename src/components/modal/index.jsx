import React from "react";

export default function Modal({ children, modal }) {
  return (
    <div
      className={`${
        modal.value ? `flex` : `hidden`
      } flex-col items-center bg-black z-10 bg-opacity-50  fixed justify-center text-center top-0 left-0 right-0 bottom-0`}
    >
      <div className={`text-black bg-dark-gray p-2`}>
        <button
          className='text-white transform translate-x-36 cursor-pointer'
          onClick={(e) => modal.setModal((data) => !data)}
        >
          <span role='img' aria-label='close'>
            ❌
          </span>
        </button>

        {children}
      </div>
    </div>
  );
}
