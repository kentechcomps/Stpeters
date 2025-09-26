// src/ParentsDashboard.jsx
import React, { useState } from "react";
import { Home,ArrowRight, BookOpen, CreditCard, Bell, MessageSquare, Download, LogOut , Wallet, Receipt, FileText, Search } from "lucide-react";

const ParentsDashboard = () => {
  const [activeTab, setActiveTab] = useState("performance");

  const [feeBalance, setFeeBalance] = useState(12000); // Example balance
  const [totalFees, setTotalFees] = useState(50000);

  
  const paymentHistory = [
    { id: 1, date: "2025-01-12", amount: 15000, method: "M-Pesa", status: "Paid" },
    { id: 2, date: "2025-03-05", amount: 23000, method: "Bank Transfer", status: "Paid" },
  ];

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Mock Fee Payment Data
  const payments = [
    { id: "INV001", date: "2025-01-12", term: "Term 1", amount: 15000, status: "Paid" },
    { id: "INV002", date: "2025-03-05", term: "Term 2", amount: 14500, status: "Paid" },
    { id: "INV003", date: "2025-05-18", term: "Term 3", amount: 16000, status: "Pending" },
  ];

  // Search filter
  const filtered = payments.filter((p) =>
    p.term.toLowerCase().includes(search.toLowerCase()) ||
    p.date.includes(search) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);


 const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };






  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-700 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-purple-600">
          Parent Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("performance")}
            className={`flex items-center gap-2 p-3 w-full rounded-lg hover:bg-purple-600 ${
              activeTab === "performance" ? "bg-purple-600" : ""
            }`}
          >
            <BookOpen size={18} /> Student Performance
          </button>

          <button
            onClick={() => setActiveTab("fees")}
            className={`flex items-center gap-2 p-3 w-full rounded-lg hover:bg-purple-600 ${
              activeTab === "fees" ? "bg-purple-600" : ""
            }`}
          >
            <CreditCard size={18} /> Fees & Payments
          </button>

          <button
            onClick={() => setActiveTab("announcements")}
            className={`flex items-center gap-2 p-3 w-full rounded-lg hover:bg-purple-600 ${
              activeTab === "announcements" ? "bg-purple-600" : ""
            }`}
          >
            <Bell size={18} /> Announcements
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`flex items-center gap-2 p-3 w-full rounded-lg hover:bg-purple-600 ${
              activeTab === "messages" ? "bg-purple-600" : ""
            }`}
          >
            <MessageSquare size={18} /> Messages
          </button>

          <button
            onClick={() => setActiveTab("downloads")}
            className={`flex items-center gap-2 p-3 w-full rounded-lg hover:bg-purple-600 ${
              activeTab === "downloads" ? "bg-purple-600" : ""
            }`}
          >
            <Download size={18} /> Downloads
          </button>
        </nav>

        <button className="p-4 flex items-center gap-2 bg-purple-800 hover:bg-purple-900">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === "performance" && (
          <section>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">📊 Student Performance</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="font-semibold mb-2">Grades Overview</h3>
                <p>Math: A | English: B | Science: A | History: C</p>
              </div>
              <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="font-semibold mb-2">Attendance</h3>
                <p>92% Present | 8% Absent</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "fees" && (
          <section>
          <div className="p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-purple-700 mb-4">💰 Fee Management</h2>
      <p className="text-gray-600 mb-6">Track your child’s fees, payments, and receipts.</p>

      {/* Balance Card */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded-xl p-6 flex items-center space-x-4">
          <Wallet className="w-10 h-10 text-purple-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Outstanding Balance</h3>
            <p className="text-2xl font-bold text-red-600">KES {feeBalance.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex items-center space-x-4">
          <Receipt className="w-10 h-10 text-green-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Total Fees</h3>
            <p className="text-2xl font-bold text-purple-700">KES {totalFees.toLocaleString()}</p>
          </div>
        </div>
      </div>
        <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">💳 Pay School Fees via M-Pesa</h2>
      
      <div className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Enter Safaricom Number (2547... format)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />
        <input
          type="number"
          placeholder="Enter Amount (KES)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-green-700"
        >
          {loading ? "Processing..." : "Pay with M-Pesa"}
          {!loading && <ArrowRight className="ml-2" />}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
      {/* Payment History Table */}
       <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-800">💳 Fee Payment History</h2>

        {/* Search */}
        <div className="flex items-center border rounded-lg bg-white px-3 py-2 shadow-sm">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by term, date, or invoice ID"
            className="outline-none w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-lg p-4 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-purple-100 text-purple-900">
              <th className="py-3 px-4 border-b">Invoice ID</th>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Term</th>
              <th className="py-3 px-4 border-b">Amount (KES)</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b font-medium">{payment.id}</td>
                <td className="py-3 px-4 border-b">{payment.date}</td>
                <td className="py-3 px-4 border-b">{payment.term}</td>
                <td className="py-3 px-4 border-b">KES {payment.amount.toLocaleString()}</td>
                <td
                  className={`py-3 px-4 border-b font-semibold ${
                    payment.status === "Paid"
                      ? "text-green-600"
                      : payment.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {payment.status}
                </td>
                <td className="py-3 px-4 border-b">
                  <button
                    onClick={() => alert(`Downloading ${payment.id}`)}
                    className="flex items-center bg-purple-600 text-white px-3 py-1 rounded-lg shadow hover:bg-purple-700"
                  >
                    <Download className="w-4 h-4 mr-2" /> Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Results */}
        {filtered.length === 0 && (
          <p className="text-gray-500 text-center py-6">No payments found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-purple-200 text-purple-700 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-1 bg-purple-100 text-purple-700 rounded-lg">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-purple-200 text-purple-700 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>

      {/* Summary */}
      <div className="mt-6 p-6 bg-purple-50 border rounded-xl">
        <h4 className="text-lg font-semibold text-purple-700 mb-2">💡 Summary</h4>
        <p className="text-gray-700">
          You have paid <b>KES {paymentHistory.reduce((a, b) => a + b.amount, 0).toLocaleString()}</b> 
          out of <b>KES {totalFees.toLocaleString()}</b>.  
          Remaining balance is <b className="text-red-600">KES {feeBalance.toLocaleString()}</b>.
        </p>
      </div>

    </div>
          </section>
        )}

        {activeTab === "announcements" && (
          <section>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">📢 Announcements</h2>
            <ul className="space-y-3">
              <li className="bg-white p-4 shadow rounded-lg">School closes on 20th Dec</li>
              <li className="bg-white p-4 shadow rounded-lg">Parents Meeting: 5th Jan</li>
              <li className="bg-white p-4 shadow rounded-lg">Exam Results Released!</li>
            </ul>
          </section>
        )}

        {activeTab === "messages" && (
          <section>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">✉️ Messages</h2>
            <div className="bg-white p-6 shadow rounded-lg">
              <textarea
                placeholder="Send a message to teacher/admin..."
                className="w-full border rounded-lg p-3 mb-3"
              ></textarea>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Send Message
              </button>
            </div>
          </section>
        )}

        {activeTab === "downloads" && (
          <section>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">⬇️ Downloads</h2>
            <div className="bg-white p-6 shadow rounded-lg flex justify-between items-center">
              <span>Report Card - Term 2</span>
              <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                <Download size={18} /> Download
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ParentsDashboard;
