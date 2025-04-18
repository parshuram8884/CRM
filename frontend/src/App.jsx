import { useState } from 'react'
import DescriptionModal from './components/DescriptionBox'
import HostingModal from './components/HostingModal'
import LeadManagement from './components/LeadManagement'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LeadManagement />} />
      </Routes>
      {/* <div className="relative h-screen bg-gray-100">
      <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Open Description Modal
        </button>

        {showModal && <DescriptionModal onClose={() => setShowModal(false)} />}
      </div>
      <div>
      <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600  text-white rounded"
        >
          Open Hosting Modal
        </button>

        {open && <HostingModal onClose={() => setOpen(false)} />}
      </div> */}
    </BrowserRouter>
  )
}

export default App
