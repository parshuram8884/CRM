import React from "react";
import Swal from "sweetalert2";
import { MdDashboard } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { GiCash } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { TbInvoice } from "react-icons/tb";
import { FaLock } from "react-icons/fa";
import { IoTrendingUp } from "react-icons/io5";
import { BsBarChartFill } from "react-icons/bs";
import { FaChartPie } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import Toggle from "./Toggle";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FiEdit, FiUser, FiTrash2, FiMoreVertical } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
import HostingModal from "./HostingModal";
import DescriptionModal from "./DescriptionBox";

export default function LeadManagement() {
  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isHostingModalOpen, setIsHostingModalOpen] = useState(false);
  const [pendingHostingLeadId, setPendingHostingLeadId] = useState(null);
  // State for leads data
  const [leads, setLeads] = useState([
    {
      id: "ICCLNT_2025",
      date: "16/04/2024",
      clientName: "seema",
      phoneNumber: "+911234567890",
      businessName: "Next One",
      industryType: "E-Commerce",
      status: "Processing",
      seo: true,
      hosting: false,
    },
    {
      id: "ICCLNT_2026",
      date: "16/04/2024",
      clientName: "Neha",
      phoneNumber: "+911234567890",
      businessName: "Next One",
      industryType: "E-Commerce",
      status: "Closed",
      seo: true,
      hosting: false,
    },
    {
      id: "ICCLNT_2027",
      date: "16/04/2024",
      clientName: "Shivani",
      phoneNumber: "+911234567890",
      businessName: "Next One",
      industryType: "E-Commerce",
      status: "Received",
      seo: true,
      hosting: false,
    },
    {
      id: "ICCLNT_2028",
      date: "16/04/2024",
      clientName: "Rekha",
      phoneNumber: "+911234567890",
      businessName: "Next One",
      industryType: "E-Commerce",
      status: "Rejected",
      seo: true,
      hosting: false,
    },
    {
      id: "ICCLNT_2029",
      date: "16/04/2024",
      clientName: "Nancy",
      phoneNumber: "+911234567890",
      businessName: "Next One",
      industryType: "E-Commerce",
      status: "Processing",
      seo: true,
      hosting: false,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusSort, setStatusSort] = useState(null); // 'asc' | 'desc' | null
  const [industrySort, setIndustrySort] = useState(null); // 'asc' | 'desc' | null

  // Get unique status and industry types for dropdowns
  const uniqueStatuses = Array.from(new Set(leads.map((l) => l.status)));
  const uniqueIndustries = Array.from(new Set(leads.map((l) => l.industryType)));

  // Filtered leads by search
  const filteredLeads = leads.filter(
    (lead) =>
      lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting logic
  let sortedLeads = [...filteredLeads];
  if (statusSort) {
    sortedLeads.sort((a, b) => {
      if (a.status < b.status) return statusSort === "asc" ? -1 : 1;
      if (a.status > b.status) return statusSort === "asc" ? 1 : -1;
      return 0;
    });
  }
  if (industrySort) {
    sortedLeads.sort((a, b) => {
      if (a.industryType < b.industryType) return industrySort === "asc" ? -1 : 1;
      if (a.industryType > b.industryType) return industrySort === "asc" ? 1 : -1;
      return 0;
    });
  }

  // Status options
  const statusOptions = ["Received", "Processing", "Closed", "Rejected"];
  // Add this useEffect to apply custom styles to SweetAlert
  useEffect(() => {
    // Add custom styles for SweetAlert
    const style = document.createElement("style");
    style.innerHTML = `
    .swal2-input, .swal2-select, .swal2-file {
      width: 100% !important;
      margin: 0 !important;
      padding: 0.5rem !important;
      border: 1px solid #d1d5db !important;
      border-radius: 0.375rem !important;
    }
    .swal2-file {
      border: none !important;
    }
    .swal2-checkbox {
      width: 1rem !important;
      height: 1rem !important;
    }
  `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Then add the click outside effect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".action-menu")) {
        setLeads(leads.map((lead) => ({ ...lead, showActions: false })));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [leads]);

  // Toggle handlers
  const handleSeoToggle = (leadId) => {
    setLeads(
      leads.map((lead) => {
        if (lead.id === leadId) {
          if (!lead.hosting) setIsHostingModalOpen(true);
          return { ...lead, hosting: !lead.hosting };
        }
        return lead;
      })
    );
  };

  const handleHostingToggle = (leadId) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead.hosting) {
      setPendingHostingLeadId(leadId);
      setIsHostingModalOpen(true);
    } else {
      setLeads(
        leads.map((lead) =>
          lead.id === leadId ? { ...lead, hosting: false } : lead
        )
      );
    }
  };

  const handleSaveHosting = () => {
    if (pendingHostingLeadId) {
      setLeads(
        leads.map((lead) =>
          lead.id === pendingHostingLeadId ? { ...lead, hosting: true } : lead
        )
      );
      setIsHostingModalOpen(false);
      setPendingHostingLeadId(null);
    }
  };

  const toggleActionMenu = (leadId) => {
    setLeads(
      leads.map((lead) =>
        lead.id === leadId
          ? { ...lead, showActions: !lead.showActions }
          : { ...lead, showActions: false }
      )
    );
  };

  // Function to get status badge style
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Processing":
        return "bg-orange-100 text-orange-800";
      case "Closed":
        return "bg-indigo-100 text-indigo-800";
      case "Received":
        return "bg-teal-100 text-teal-800";
      case "Rejected":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  // For delete confirmation
  const handleDelete = (leadId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Filter out the lead with the matching ID
        setLeads(leads.filter((lead) => lead.id !== leadId));

        Swal.fire("Deleted!", "Client has been deleted.", "success");
      }
    });

    // Close the action menu
    toggleActionMenu(leadId);
  };

  // "Add Client" button click
  const handleAddClientClick = () => {
    Swal.fire({
      title: "Add Client",
      html: `
    
      <form id="clientForm" class="text-left">
        <div class="mb-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
          <input id="clientName" class="swal2-input w-full" placeholder="Enter client name" required>
        </div>
        
       <div class="flex justify-between w-full ">
        <div class="mb-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input id="clientEmail" type="email" class="swal2-input w-full" placeholder="Enter email" required>
        </div>
        
        <div class="mb-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
          <input id="clientPhone" class="swal2-input w-full" placeholder="Enter phone number" required>
        </div>
       </div>
        
       <div class="flex justify-between w-full ">
        <div class="mb-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
          <input id="businessName" class="swal2-input w-full" placeholder="Enter business name" required>
        </div>
        
        <div class="mb-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Industry Type *</label>
          <input id="industryType" class="swal2-input w-full" placeholder="Enter industry type" required>
        </div>
       </div>
        <div class="mb-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
          <select id="clientStatus" class="swal2-select w-full">
            <option value="Received">Received</option>
            <option value="Processing">Processing</option>
            <option value="Closed">Closed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div class="space-y-2">
        <div>Description</div>
        <textarea id="clientDescription"  class="w-full bg-[#F8F8F8] outline-none h-[80px]" placeholder="Enter description"></textarea>
        </div>
        <div class="mb-3 ">
          <label class="block text-sm font-medium text-gray-700 mb-1">Attach Document</label>
          <input id="clientDocument" type="file" class="w-full bg-[#F8F8F8] border-dashed border flex items-center justify-center  p-2 border-blue-400 outline-none h-[80px]">
        </div>
        
        <div class="flex space-x-2 mt-4">
          <div class="flex items-center">
            <label class="mr-2 text-sm font-medium text-gray-700">SEO</label>
            <input id="seoToggle" type="checkbox" class="swal2-checkbox">
          </div>
          
          <div class="flex items-center">
            <label class="mr-2 text-sm font-medium text-gray-700">Hosting</label>
            <input id="hostingToggle" type="checkbox" class="swal2-checkbox">
          </div>
        </div>
      </form>
    `,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2D74FF",
      cancelButtonColor: "#d33",
      width: "600px",
      showCloseButton: true, // Enable the built-in close button
      didOpen: () => {
        // Add event listener to the custom close button
        document.getElementById("closeButton").addEventListener("click", () => {
          Swal.close();
        });
      },
      preConfirm: () => {
        const clientName = document.getElementById("clientName").value;
        const clientEmail = document.getElementById("clientEmail").value;
        const clientPhone = document.getElementById("clientPhone").value;
        const businessName = document.getElementById("businessName").value;
        const industryType = document.getElementById("industryType").value;
        const clientStatus = document.getElementById("clientStatus").value;
        const clientDocument =
          document.getElementById("clientDocument").files[0];
        const seoToggle = document.getElementById("seoToggle").checked;
        const hostingToggle = document.getElementById("hostingToggle").checked;

        // Validate required fields
        if (
          !clientName ||
          !clientEmail ||
          !clientPhone ||
          !businessName ||
          !industryType
        ) {
          Swal.showValidationMessage("Please fill all required fields");
          return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(clientEmail)) {
          Swal.showValidationMessage("Please enter a valid email address");
          return false;
        }

        return {
          clientName,
          clientEmail,
          clientPhone,
          businessName,
          industryType,
          clientStatus,
          clientDocument: clientDocument ? clientDocument.name : null,
          seoToggle,
          hostingToggle,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const data = result.value;

        // Generate a new ID
        const newId = `ICCLNT_${Math.floor(2030 + Math.random() * 1000)}`;

        // Get current date in DD/MM/YYYY format
        const today = new Date();
        const date = `${today.getDate().toString().padStart(2, "0")}/${(
          today.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${today.getFullYear()}`;

        // Create new lead object
        const newLead = {
          id: newId,
          date: date,
          clientName: data.clientName,
          email: data.clientEmail,
          phoneNumber: data.clientPhone,
          businessName: data.businessName,
          industryType: data.industryType,
          status: data.clientStatus,
          document: data.clientDocument,
          seo: data.seoToggle,
          hosting: data.hostingToggle,
          showActions: false,
          showStatusDropdown: false,
        };

        // Add to leads array
        setLeads([...leads, newLead]);

        // Show success message
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Client added successfully",
          text: `New client ${data.clientName} has been added`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // Handle edit button click
  const handleEdit = (leadId) => {
    const lead = leads.find((l) => l.id === leadId);

    Swal.fire({
      title: "Edit Client Details",
      html: `
        <form id="editForm" class="text-left">
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
            <input id="editClientName" class="swal2-input w-full" value="${
              lead.clientName
            }" required>
          </div>
          
          <div class="flex justify-between w-full gap-4">
            <div class="mb-3 w-1/2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input id="editEmail" type="email" class="swal2-input w-full" value="${
                lead.email
              }" required>
            </div>
            
            <div class="mb-3 w-1/2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input id="editPhone" class="swal2-input w-full" value="${
                lead.phoneNumber
              }" required>
            </div>
          </div>
  
          <div class="flex justify-between w-full gap-4">
            <div class="mb-3 w-1/2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
              <input id="editBusiness" class="swal2-input w-full" value="${
                lead.businessName
              }" required>
            </div>
            
            <div class="mb-3 w-1/2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Industry Type *</label>
              <input id="editIndustry" class="swal2-input w-full" value="${
                lead.industryType
              }" required>
            </div>
          </div>
  
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
            <select id="editStatus" class="swal2-select w-full">
              ${statusOptions
                .map(
                  (status) =>
                    `<option value="${status}" ${
                      lead.status === status ? "selected" : ""
                    }>${status}</option>`
                )
                .join("")}
            </select>
          </div>
  
          <div class="flex space-x-4 mt-4">
            <div class="flex items-center">
              <label class="mr-2 text-sm font-medium text-gray-700">SEO</label>
              <input id="editSeo" type="checkbox" class="swal2-checkbox" ${
                lead.seo ? "checked" : ""
              }>
            </div>
            
            <div class="flex items-center">
              <label class="mr-2 text-sm font-medium text-gray-700">Hosting</label>
              <input id="editHosting" type="checkbox" class="swal2-checkbox" ${
                lead.hosting ? "checked" : ""
              }>
            </div>
          </div>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      confirmButtonColor: "#2D74FF",
      cancelButtonColor: "#d33",
      width: "600px",
      preConfirm: () => {
        const updatedData = {
          clientName: document.getElementById("editClientName").value,
          email: document.getElementById("editEmail").value,
          phoneNumber: document.getElementById("editPhone").value,
          businessName: document.getElementById("editBusiness").value,
          industryType: document.getElementById("editIndustry").value,
          status: document.getElementById("editStatus").value,
          seo: document.getElementById("editSeo").checked,
          hosting: document.getElementById("editHosting").checked,
        };

        if (
          !updatedData.clientName ||
          !updatedData.email ||
          !updatedData.phoneNumber ||
          !updatedData.businessName ||
          !updatedData.industryType
        ) {
          Swal.showValidationMessage("Please fill all required fields");
          return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(updatedData.email)) {
          Swal.showValidationMessage("Please enter a valid email address");
          return false;
        }

        return updatedData;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setLeads(
          leads.map((lead) =>
            lead.id === leadId ? { ...lead, ...result.value } : lead
          )
        );

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Changes saved successfully",
          text: `Client ${result.value.clientName} has been updated`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });

    toggleActionMenu(leadId);
  };

  // Handle edit completion
  const handleDescription = (leadId) => {
    Swal.fire({
      title: "Description",
      html: `
        <div class="text-left p-4">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Details</label>
            <textarea 
              id="details" 
              class="w-full h-24 p-2 border rounded-md bg-[#F8F8F8] resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter description details..."
            ></textarea>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Reference File</label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-all cursor-pointer">
              <input type="file" id="referenceFile" class="hidden" />
              <div class="">
                <FiUploadCloud class="h-6 w-6 text-gray-400" />
                <p class="text-sm text-gray-500">Drag here to browse</p>
              </div>
            </div>
            <p id="fileName" class="mt-2 text-sm text-gray-500"></p>
          </div>
        </div>
      `,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2D74FF",
      cancelButtonColor: "#d33",
      width: "500px",
      didOpen: () => {
        const fileInput = document.getElementById("referenceFile");
        const fileNameDisplay = document.getElementById("fileName");
        const dropZone = fileInput.parentElement;

        fileInput.onchange = (e) => {
          if (e.target.files[0]) {
            fileNameDisplay.textContent = e.target.files[0].name;
          }
        };

        dropZone.onclick = () => fileInput.click();

        // Drag and drop functionality
        dropZone.ondragover = (e) => {
          e.preventDefault();
          dropZone.classList.add("border-blue-400");
        };

        dropZone.ondragleave = () => {
          dropZone.classList.remove("border-blue-400");
        };

        dropZone.ondrop = (e) => {
          e.preventDefault();
          dropZone.classList.remove("border-blue-400");
          fileInput.files = e.dataTransfer.files;
          if (e.dataTransfer.files[0]) {
            fileNameDisplay.textContent = e.dataTransfer.files[0].name;
          }
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const details = document.getElementById("details").value;
        const file = document.getElementById("referenceFile").files[0];

        // Handle the save action
        setLeads(
          leads.map((lead) => {
            if (lead.id === leadId) {
              return {
                ...lead,
                description: details,
                referenceFile: file ? file.name : null,
              };
            }
            return lead;
          })
        );

        Swal.fire({
          icon: "success",
          title: "Description saved successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });

    // Close the action menu
    toggleActionMenu(leadId);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="bg-[#1D1D42] w-full md:w-[18%] text-white h-auto md:h-screen space-y-4">
          <div className="flex items-center gap-6 text-white p-4">
            <img src="/logo.png" alt="Infotech Clinic Logo" className="w-[50px] h-[55px]" />
            <div>Infotech Clinic</div>
            <div className="-rotate-90">
              <BiSolidBarChartAlt2 />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2 items-center text-12 cursor-pointer hover:bg-[#27274F] px-4 py-2">
              <MdDashboard />
              <div>Dashboard</div>
            </div>
            <div className="flex gap-2 items-center text-12 cursor-pointer hover:bg-[#27274F] px-4 py-2">
              <FaCirclePlus />
              <div>Lead Management</div>
            </div>
            <div className="flex gap-2 items-center text-12 cursor-pointer hover:bg-[#27274F] px-4 py-2">
              <div className="relative">
                <BsBarChartFill />
                <div className="absolute top-[-8px] left-[-3px]">
                  <IoTrendingUp />
                </div>
              </div>
              <div>Sales Management</div>
            </div>
            <div className="flex gap-2 items-center text-12 cursor-pointer hover:bg-[#27274F] px-4 py-2">
              <FaUsers />
              <div>User Management</div>
            </div>
            <div className="flex gap-2 items-center text-12 cursor-pointer hover:bg-[#27274F] px-4 py-2">
              <GiCash />
              <div>Finance Management</div>
            </div>
            <div className="flex gap-2 items-center text-12 cursor-pointer hover:bg-[#27274F] px-4 py-2">
              <FaChartPie />
              <div>Analytics</div>
            </div>
            <div className="flex gap-2 items-center text-12 cursor-pointer hover:bg-[#27274F] px-4 py-2">
              <FaTasks />
              <div>Task Management</div>
            </div>
            <div className="flex gap-2 items-center text-12 cursor-pointer hover:bg-[#27274F] px-4 py-2">
              <TbInvoice />
              <div>Invoice</div>
            </div>
            <div className="flex gap-2 items-center text-12 cursor-pointer hover:bg-[#27274F] px-4 py-2">
              <FaLock />
              <div>Data Management</div>
            </div>
            <div className="flex gap-2 items-center text-12 cursor-pointer hover:bg-[#27274F] px-4 py-2">
              <IoLocationSharp />
              <div>Track Management</div>
            </div>
            <div className="flex gap-2 items-center text-12 cursor-pointer hover:bg-[#27274F] px-4 py-2">
              <IoSettings />
              <div>Setting</div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-center border-b-2 py-2 border-gray-200 p-4 md:p-6 gap-4">
            <div className="text-[22px] font-semibold">Lead Management</div>
            <div className="flex gap-2 items-center text-[18px] text-gray-500">
              <div className="text-[25px]">
                <IoIosNotifications />
              </div>
              <div>User Name</div>
              <IoIosArrowDown />
            </div>
          </div>
          <div className="py-2 flex flex-col md:flex-row flex-wrap justify-between items-center p-4 md:p-6 gap-4">
            {/* Searchbar  */}
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by ID or Name"
                className="border-2 py-1 px-7 border-gray-200 rounded-md w-full md:w-[300px] outline-none"
              />
              <div className="absolute top-[7px] left-[8px] text-gray-500 text-[20px]">
                <CiSearch />
              </div>
            </div>
            <div
              onClick={handleAddClientClick}
              className="bg-[#2D74FF] px-2 py-1 rounded-sm cursor-pointer font-semibold text-white flex gap-1 items-center w-full md:w-auto justify-center"
            >
              <FaPlus />
              Add Client
            </div>
          </div>
          <div className="p-2 md:p-6 bg-[#F8F8F8] h-auto md:h-[601px] overflow-x-auto">
            <div className="overflow-x-auto rounded-md bg-white h-auto md:h-[510px] p-2 md:p-6">
              <table className="min-w-[600px] w-full divide-y divide-gray-200 text-xs md:text-sm">
                <thead className="bg-white">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                      Date
                    </th>
                    <th className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                      ID
                    </th>
                    <th className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                      Client Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                      Phone Number
                    </th>
                    <th className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                      Business Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                      <div className="flex flex-col">
                        <span>Industry Type</span>
                        <div className="flex gap-1 mt-1">
                          <select
                            className="border border-gray-200 rounded-md text-xs outline-none"
                            value={industrySort || ""}
                            onChange={(e) =>
                              setIndustrySort(e.target.value || null)
                            }
                          >
                            <option value="">Sort</option>
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                          </select>
                        </div>
                      </div>
                    </th>
                    <th className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                      <div className="flex flex-col">
                        <span>Status</span>
                        <div className="flex gap-1 mt-1">
                          <select
                            className="border border-gray-200 rounded-md text-xs outline-none"
                            value={statusSort || ""}
                            onChange={(e) =>
                              setStatusSort(e.target.value || null)
                            }
                          >
                            <option value="">Sort</option>
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                          </select>
                        </div>
                      </div>
                    </th>
                    <th className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                      SEO
                    </th>
                    <th className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                      Hosting
                    </th>
                    <th className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{lead.date}</td>
                      <td className="px-4 py-2 text-blue-600 font-medium">
                        {lead.id}
                      </td>
                      <td className="px-4 py-2">{lead.clientName}</td>
                      <td className="px-4 py-2">{lead.phoneNumber}</td>
                      <td className="px-4 py-2">{lead.businessName}</td>
                      <td className="px-4 py-2">{lead.industryType}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                            lead.status
                          )}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <Toggle
                          isChecked={lead.seo}
                          onChange={handleSeoToggle}
                          id={lead.id}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <Toggle
                          isChecked={lead.hosting}
                          onChange={handleHostingToggle}
                          id={lead.id}
                        />
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500 relative">
                        <button
                          onClick={() => toggleActionMenu(lead.id)}
                          className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                        >
                          <FiMoreVertical className="h-5 w-5 text-gray-500" />
                        </button>
                        {lead.showActions && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 action-menu">
                            <div className="py-1">
                              <button
                                onClick={() => handleEdit(lead.id)}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                <FiEdit className="mr-3 h-4 w-4" />
                                Edit
                              </button>
                              <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                <FiUser className="mr-3 h-4 w-4" />
                                Description
                              </button>
                              {showModal && (
                                <DescriptionModal
                                  onClose={() => setShowModal(false)}
                                />
                              )}
                              <button
                                onClick={() => handleDelete(lead.id)}
                                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                              >
                                <FiTrash2 className="mr-3 h-4 w-4" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex w-full justify-end gap-2 p-2 md:p-4">
              <div className="bg-white p-2 cursor-pointer">
                <MdKeyboardDoubleArrowLeft />
              </div>
              <div className="bg-white p-2 cursor-pointer">
                <MdKeyboardArrowLeft />
              </div>
              <div className="bg-white p-2 cursor-pointer">
                <MdKeyboardArrowRight />
              </div>
              <div className="bg-white p-2 cursor-pointer">
                <MdKeyboardDoubleArrowRight />
              </div>
            </div>
          </div>
        </div>
        {isHostingModalOpen && (
          <HostingModal
            onClose={() => {
              setIsHostingModalOpen(false);
              setPendingHostingLeadId(null);
            }}
            onSave={handleSaveHosting}
          />
        )}
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .md\\:flex-row { flex-direction: column !important; }
          .md\\:w-\\[18\\%\\] { width: 100% !important; }
          .md\\:h-screen { height: auto !important; }
          .md\\:p-6 { padding: 1rem !important; }
          .md\\:h-\\[510px\\] { height: auto !important; }
          .md\\:h-\\[601px\\] { height: auto !important; }
          .md\\:text-sm { font-size: 0.85rem !important; }
          .min-w-\\[600px\\] { min-width: 100vw !important; }
        }
        @media (max-width: 600px) {
          .p-4, .md\\:p-6 { padding: 0.5rem !important; }
          .gap-4 { gap: 0.5rem !important; }
          .flex-wrap { flex-wrap: wrap !important; }
        }
      `}</style>
    </div>
  );
}
