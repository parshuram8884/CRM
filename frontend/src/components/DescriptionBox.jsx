import React from "react";
import { FiX } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";

const DescriptionModal = ({ onClose }) => {
  return (
    <div className="block fixed inset-0  bg-opacity-40 flex justify-center items-center z-50">
      <div className="relative bg-white w-[512px] h-[514px] rounded-[20px] shadow-xl">

        {/* Description Title */}
        <div
          className="absolute"
          style={{
            top: "27px", // 231 - 204
            left: "30px", // 494.5 - 464.5
            width: "117px",
            height: "28px",
            background: "white",
            fontFamily: "Circular Std, sans-serif",
            fontWeight: 500,
            fontSize: "22px",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#171832",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
          }}
        >
          Description
        </div>

        {/* Cross Button */}
        <button
          className="absolute flex items-center justify-center text-xl font-bold"
          style={{
            top: "21px", // 225 - 204
            left: "442px", // 906.5 - 464.5
            width: "40px",
            height: "40px",
            background: "#F8F8F8",
            border: "1px  #171832",
            borderRadius: "50%",
          }}
          onClick={onClose}
        >
          <FiX className="text-[#171832]" />
        </button>

        {/* Modal Content */}
        <div className="p-6 pt-[90px]">
          {/* Details */}
          <div
  className="absolute"
  style={{
    top: "96px",
    left: "30px",
    width: "452px",
    height: "228px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  }}
>
  <label className="text-sm font-medium text-[#171832]">Details</label>
  <textarea
    className="w-full h-full bg-[#F8F8F8] rounded-xl p-4 text-sm text-gray-700 resize-none outline-none"
    placeholder="Write description here..."
  />
</div>

          {/* Reference File */}
          <div
    className="absolute"
    style={{
      top: "344px",
      left: "30px",
      width: "452px",
      height: "73px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}
  >
    <label className="text-sm font-medium text-[#171832]">Reference file</label>
    <div className="flex items-center gap-2 px-4 py-3 bg-[#F8F8F8] rounded-xl text-blue-600 text-sm font-medium">
      <HiOutlineDocumentText className="text-lg text-[#171832]" />
      <a href="#" className="hover:underline">
        Ebook.pdf
      </a>
    </div>
  </div>

          {/* Buttons */}
          <div
  className="absolute flex justify-end gap-4"
  style={{
    top: "439px",
    left: "215px",
    width: "267px",
    height: "45px",
    borderRadius: "5px",
    padding: "0 10px",
  }}
>
  <button
    className="w-1/2 h-full border border-1px solid #2D74FF80 text-[#2D74FF] bg-transparent rounded-[5px] hover:bg-[#2D74FF10]"
    onClick={onClose}
  >
    Cancel
  </button>
  <button className="w-1/2 h-full bg-[#2D74FF] text-white rounded-[5px] hover:bg-[#1f5edf]">
    Save
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionModal;
