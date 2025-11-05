// src/ParentsDashboard.jsx
import React, { useState , useEffect } from "react";
import { Home,ArrowRight, BookOpen, CreditCard, Bell, MessageSquare, Download, LogOut , Wallet, Receipt, FileText, Search } from "lucide-react";
import { useAuth } from "./Authcontext"

const ParentsDashboard = () => {
  const [activeTab, setActiveTab] = useState("performance");
  
  const [feeBalance, setFeeBalance] = useState(12000); // Example balance
  const [totalFees, setTotalFees] = useState(50000);
  
  const { user, parentData, studentData } = useAuth();

  const studentId = studentData ? studentData.id : null; // Assuming studentData has an 'id' field
  
  console.log(studentId);
  const getCategoryColor = (category) => {
  switch (category) {
    case "exam":
      return "bg-yellow-50 border-yellow-200 text-yellow-800";
    case "trip":
      return "bg-green-50 border-green-200 text-green-800";
    case "holiday":
      return "bg-blue-50 border-blue-200 text-blue-800";
    case "general":
    default:
      return "bg-gray-50 border-gray-200 text-gray-800";
  }
};

const getCategoryIcon = (category) => {
  switch (category) {
    case "exam":
      return "📘";
    case "trip":
      return "🚌";
    case "holiday":
      return "🎉";
    case "general":
    default:
      return "ℹ️";
  }
};
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("general");
    const [announcements, setAnnouncements] = useState([]);
   
  const paymentHistory = [
    { id: 1, date: "2025-01-12", amount: 15000, method: "M-Pesa", status: "Paid" },
    { id: 2, date: "2025-03-05", amount: 23000, method: "Bank Transfer", status: "Paid" },
  ];
 

    // Fetch announcements
    useEffect(() => {
      fetch("http://localhost:5000/api/announcements")
        .then((res) => res.json())
        .then((data) => {
          // ensure array
          if (Array.isArray(data)) setAnnouncements(data);
          else setAnnouncements([]);
        })
        .catch(() => setAnnouncements([]));
    }, []);
  

  
 
  
 

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

// 🧾 Fetch Student Payments from Flask
const [payments, setPayments] = useState([]);
useEffect(() => {
  if (!studentId) return;

  fetch(`http://127.0.0.1:5000/api/payments/${studentId}`)
    .then(res => res.json())
    .then(data => {
      if (data.payments) setPayments(data.payments);
      else setPayments([]);
    })
    .catch(err => console.error("Error fetching payments:", err));
}, [studentId]);
console.log(payments);

// Reset page to 1 when search changes
useEffect(() => {
  setPage(1);
}, [search]);

// 📄 Handle Invoice Download
const handleInvoiceDownload = (paymentId) => {
  window.open(`http://127.0.0.1:5000/api/invoice/${paymentId}`, "_blank");
};





 const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const [instructions, setInstructions] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

const handlePayment = async () => {
    if (!phone || !amount) {
      setMessage("Please enter both phone number and amount.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: studentId, phone, amount }),
      });

      const data = await res.json();
      if (res.ok) {
        setInstructions(data.instructions);
        setMessage("Follow the instructions below to complete your payment.");
      } else {
        setMessage(data.error || "Payment initialization failed.");
      }
    } catch (err) {
      setMessage("Error connecting to server.");
    }

    setLoading(false);
  };

  const handleConfirm = async () => {
    setMessage("Confirming payment...");
    try {
      const res = await fetch("http://127.0.0.1:5000/api/confirm_payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: studentId }),
      });
      const data = await res.json();
      if (res.ok) {
        setConfirmed(true);
        setMessage("Payment marked for verification. Thank you!");
      } else {
        setMessage(data.error);
      }
    } catch (err) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-700 text-white flex flex-col mt-16">
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
      <main className="flex-1 p-8 overflow-y-auto mt-16">
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
     <div className="space-y-4 max-w-md">
      {!instructions ? (
        <>
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
        </>
      ) : (
        <div className="bg-gray-50 border p-4 rounded-lg space-y-2">
          <h3 className="font-semibold text-lg">Buy Goods Payment Instructions</h3>
          {instructions.steps.map((step, index) => (
            <p key={index} className="text-sm text-gray-700">
              {index + 1}. {step}
            </p>
          ))}
          <button
            onClick={handleConfirm}
            disabled={confirmed}
            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-3 hover:bg-blue-700"
          >
            {confirmed ? "Awaiting Verification..." : "I’ve Paid"}
          </button>
        </div>
      )}

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
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
  {(() => {
    const itemsPerPage = 10;
    const filteredPayments = payments.filter((payment) =>
      payment.id.toString().includes(search) ||
      new Date(payment.created_at).toLocaleDateString().includes(search) ||
      (payment.term || "").toLowerCase().includes(search.toLowerCase()) ||
      payment.amount.toString().includes(search)
    );
    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
    const paginatedPayments = filteredPayments.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return paginatedPayments.map((payment) => (
      <tr key={payment.id} className="hover:bg-gray-50">
        <td className="py-3 px-4 border-b font-medium">{payment.id}</td>
        <td className="py-3 px-4 border-b">
          {new Date(payment.created_at).toLocaleDateString()}
        </td>
        <td className="py-3 px-4 border-b">{payment.term || "N/A"}</td>
        <td className="py-3 px-4 border-b">KES {payment.amount.toLocaleString()}</td>
        <td
          className={`py-3 px-4 border-b font-semibold ${
            payment.status === "confirmed"
              ? "text-green-600"
              : payment.status === "pending"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {payment.status}
        </td>
        <td className="py-3 px-4 border-b">
          <button
            onClick={() => handleInvoiceDownload(payment.id)}
            className="flex items-center bg-purple-600 text-white px-3 py-1 rounded-lg shadow hover:bg-purple-700"
          >
            <Download className="w-4 h-4 mr-2" /> Invoice
          </button>
        </td>
      </tr>
    ));
  })()}
</tbody>

        </table>

        {/* Pagination Controls */}
        {(() => {
          const itemsPerPage = 10;
          const filteredPayments = payments.filter((payment) =>
            payment.id.toString().includes(search) ||
            new Date(payment.created_at).toLocaleDateString().includes(search) ||
            (payment.term || "").toLowerCase().includes(search.toLowerCase()) ||
            payment.amount.toString().includes(search)
          );
          const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

          const handlePageChange = (newPage) => {
            if (newPage >= 1 && newPage <= totalPages) {
              setPage(newPage);
            }
          };

          if (totalPages <= 1) return null;

          return (
            <div className="flex justify-between items-center mt-4 px-4">
              <div className="text-sm text-gray-600">
                Showing {((page - 1) * itemsPerPage) + 1} to {Math.min(page * itemsPerPage, filteredPayments.length)} of {filteredPayments.length} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 rounded-lg ${
                      page === i + 1
                        ? "bg-purple-600 text-white"
                        : "border hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Next
                </button>
              </div>
            </div>
          );
        })()}

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
    <div className="grid grid-cols-1  p-6">
      {/* Left Side - Post/Edit Form */}


      {/* Right Side - Recent Announcements */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">📰 Recent Announcements</h2>
        <div className="space-y-3 max-h-[70vh] overflow-y-auto">
          {announcements.length === 0 ? (
            <p className="text-gray-500">No announcements yet.</p>
          ) : (
            announcements.map((ann) => {
              const colorCls = getCategoryColor(ann.category);
              const icon = getCategoryIcon(ann.category);
              const createdAt = ann.created_at ? new Date(ann.created_at).toLocaleString() : "—";

              return (
                <div key={ann.id} className={`p-3 rounded-lg border ${colorCls}`}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold flex items-center gap-2">
                        <span className="text-xl">{icon}</span>
                        <span>{ann.title}</span>
                      </h3>
                      <p className="text-sm mt-1 text-gray-700">{ann.content}</p>
                      <div className="text-xs mt-2 text-gray-500">
                        {ann.category?.toUpperCase() ?? "GENERAL"} • {createdAt}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEdit(ann)}
                        className="px-3 py-1 border rounded-lg text-sm hover:bg-white/30 bg-white/40"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(ann.id)}
                        className="px-3 py-1 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
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