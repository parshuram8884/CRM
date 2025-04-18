import React from "react";

const HostingModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-opacity-40 z-50 flex items-center justify-center">
      <div className="relative bg-white w-[512px] rounded-[20px] p-6 shadow-xl h-[731px]">
        {/* Title + Close */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[22px] font-Circular Std text-[#171832]">Hosting</h2>
          <button
            onClick={onClose}
            className="w-[40px] h-[40px] rounded-full border-[#171832] bg-[#F8F8F8] text-lg font-bold flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Dropdowns and Inputs */}
        <div className="flex flex-col gap-4">
          {/* Hosting Type */}
          <div>
            <label className="block text-sm font-Circular Std size-14px w-452 h-5 mb-1">Hosting Type</label>
            <select className="w-[452px] h-[45px] px-4 rounded-md border bg-[#F5F5F5] color-[#171832] appearance-none"    style={{
        borderBottomRightRadius: "10px",
        borderBottomLeftRadius: "10px",
        boxShadow: "0px 10px 20px 0px #0000001A",
      }}>
              <option>Cloud Hosting</option>
              <option>VPN Hosting</option>
              <option>Web Hosting</option>
              <option>Other Hosting</option>
            </select>
          </div>

          {/* Hosting Details */}
          <div>
            <label className="block text-sm color-[#171832] font-Circular Std mb-1">Hosting Details</label>
            <input
              type="text"
              placeholder="Details"
              className="w-[452px] h-[45px] px-4 color-[#171832] rounded-md border bg-[#F5F5F5]"
            />
          </div>

          {/* Remarks */}
          <div>
            <label className="w-[452px] h-[18px] color-[#171832] block text-sm font-Circular Std mb-1">Remarks</label>
            <input
              type="text"
              placeholder="Remarks"
              className="w-[452px] h-[45px] px-4 rounded-md color-[#171832] border bg-[#F5F5F5]"
            />
          </div>

          {/* Extra Addon Feature */}
          <div>
            <label className="block text-sm color-[#171832] font-Circular Std mb-1">Extra Addon Feature</label>
            <input
              type="text"
              placeholder="Addon Feature"
              className="w-[452px] h-[45px] px-4 rounded-md color-[#171832] border bg-[#F5F5F5]"
            />
          </div>

          {/* Select Year */}
          <div>
            <label className="block text-sm color-[#171832] font-Circular Std mb-1">Select Year</label>
            <select className="w-[452px] h-[45px] px-4 rounded-md color-[#171832] border bg-[#F5F5F5] appearance-none">
              <option>1 Year</option>
              <option>2 Years</option>
              <option>3 Years</option>
            </select>
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-sm color-[#171832] font-Circular Std mb-1">Pricing</label>
            <input
              type="text"
              placeholder="₹2500"
              className="w-[452px] h-[45px] px-4 rounded-md color-[#171832] border bg-[#F5F5F5]"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="w-[100px] h-[45px] border border-[#2D74FF80] rounded-md text-[#2D74FF]"
          >
            Cancel
          </button>
          <button className="w-[100px] h-[45px] bg-[#2D74FF]  text-white rounded-md">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostingModal;
