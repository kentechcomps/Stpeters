// ClerkPayments.jsx
import React, { useState, useEffect } from "react";
import { CloudSnowIcon, Download, Wallet } from "lucide-react";
import { supabase } from "./Supabaseclient";
import { Bar } from "react-chartjs-2";
import * as XLSX from "xlsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ClerkPayments = () => {
  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);
  const [outstandingFees, setOutstandingFees] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    class: "",
    amount: "",
    method: "Mpesa",
    transactionCode: "",
  });
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [outstandingPage, setOutstandingPage] = useState(1);
  const [searchOutstanding, setSearchOutstanding] = useState("");
  const [searchPayments, setSearchPayments] = useState("");
  const itemsPerPage = 5;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("recordedpayments")
      .insert([
        {
          student_id: formData.studentId,
          student_name: formData.studentName,
          class_level: formData.class,
          amount: formData.amount,
          method: formData.method,
          transaction_code: formData.transactionCode,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase Insert Error:", error);
      alert("Failed to save payment!");
      return;
    }

    console.log("Payment saved:", data);

    // Update local UI
    setPayments((prev) => [data, ...prev]);

    // Reset form
    setFormData({
      studentId: "",
      studentName: "",
      class: "",
      amount: "",
      method: "Mpesa",
      transactionCode: "",
    });

    setCurrentPage(1);
    alert("Payment saved successfully!");
  };

  // Fetch payments
  useEffect(() => {
    const fetchPayments = async () => {
      let { data: paymentsData, error } = await supabase
        .from("recordedpayments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching payments:", error);
      } else {
        setPayments(paymentsData || []);
      }
    };

    fetchPayments();
  }, []);

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      let { data: studentsData, error } = await supabase
        .from("students")
        .select("*");

      if (error) {
        console.error("Error fetching students:", error);
      } else {
        setStudents(studentsData || []);
      }
    };

    fetchStudents();
  }, []);

  const [fees, setFees] = useState([]);
  const [form, setForm] = useState({
    class_level: "",
    term: "",
    year: new Date().getFullYear(),
    amount: "",
  });
  const [message, setMessage] = useState("");

  const fetchFees = async () => {
    const res = await fetch("http://127.0.0.1:5000/api/fees");
    const data = await res.json();
    setFees(data);
  };

  const handleSubmitfees = async (e) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("http://127.0.0.1:5000/api/fees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Fee structure saved!");
      setForm({ class_level: "", term: "", year: new Date().getFullYear(), amount: "" });
      fetchFees();
    } else {
      setMessage(data.error || "❌ Failed to save fee.");
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/classes");
      const data = await res.json();
      setClasses(data);
      console.log("Classes fetched:", data);
    } catch (err) {
      console.error("Error fetching classes:", err.message);
    }
  };

  // Compute outstanding fees
  const termOrder = { "Term 1": 1, "Term 2": 2, "Term 3": 3 };
  useEffect(() => {
    if (students.length > 0 && fees.length > 0 && payments.length > 0) {
      const computedOutstanding = students.map((student) => {
        const classFees = fees.filter((f) => f.class_level === student.class_level);
        if (!classFees.length) {
          return {
            studentId: student.id,
            studentName: student.name,
            class: student.class_level,
            outstanding: 0,
          };
        }

        let latestFee = classFees[0];
        for (let i = 1; i < classFees.length; i++) {
          const feeDate = new Date(
            classFees[i].year,
            (termOrder[classFees[i].term] || 0) - 1,
            1
          ).getTime();
          const latestDate = new Date(
            latestFee.year,
            (termOrder[latestFee.term] || 0) - 1,
            1
          ).getTime();
          if (feeDate > latestDate) {
            latestFee = classFees[i];
          }
        }

        const totalFees = latestFee.amount || 0;
        const totalPaid = payments
          .filter((p) => p.student_id === student.id)
          .reduce((sum, p) => sum + Number(p.amount), 0);
        const outstanding = Math.max(0, totalFees - totalPaid);

        return {
          studentId: student.id,
          studentName: student.name,
          class: student.class_level,
          outstanding,
        };
      });

      setOutstandingFees(computedOutstanding.filter((o) => o.outstanding > 0));
    }
  }, [students, fees, payments]);

  // 🔍 Filtering
  const filteredOutstanding = outstandingFees.filter(
    (fee) =>
      fee.studentId.toLowerCase().includes(searchOutstanding.toLowerCase()) ||
      fee.studentName.toLowerCase().includes(searchOutstanding.toLowerCase()) ||
      fee.class.toLowerCase().includes(searchOutstanding.toLowerCase())
  );

  const filteredPayments = payments.filter((pay) => {
    const search = searchPayments.toLowerCase();

    return (
      (pay.student_id || "").toLowerCase().includes(search) ||
      (pay.student_name || "").toLowerCase().includes(search) ||
      (pay.class_level || "").toLowerCase().includes(search) ||
      (pay.method || "").toLowerCase().includes(search) ||
      (pay.transaction_code || "").toLowerCase().includes(search)
    );
  });

  // Pagination for Outstanding
  const indexOfLastOutstanding = outstandingPage * itemsPerPage;
  const indexOfFirstOutstanding = indexOfLastOutstanding - itemsPerPage;
  const currentOutstanding = filteredOutstanding.slice(
    indexOfFirstOutstanding,
    indexOfLastOutstanding
  );
  const totalOutstandingPages = Math.ceil(filteredOutstanding.length / itemsPerPage);

  // Pagination for Payments
  const indexOfLastPayment = currentPage * itemsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemsPerPage;
  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  // Reusable Pagination UI
  const getPaginationNumbers = (current, total) => {
    const maxPagesToShow = 5;
    const pages = [];
    let startPage = Math.max(1, current - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(total, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return {
      pages,
      showLeftEllipsis: startPage > 1,
      showRightEllipsis: endPage < total,
    };
  };

  const paginate = (pageNumber, type) => {
    if (type === "payments") {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    } else if (type === "outstanding") {
      if (pageNumber >= 1 && pageNumber <= totalOutstandingPages) {
        setOutstandingPage(pageNumber);
      }
    }
  };

  // 🔽 Export to Excel/CSV
  const exportToExcel = (data, filename) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  // Charts
  const paymentMethods = ["Mpesa", "Cash", "Bank"];
  const methodCounts = paymentMethods.map(
    (method) => payments.filter((p) => p.method === method).length
  );

  const classCounts = [...new Set(payments.map((p) => p.class_level))]
    .map((cls) => ({
      class: cls,
      amount: payments
        .filter((p) => p.class_level === cls)
        .reduce((sum, p) => sum + Number(p.amount), 0),
    }))
    .filter((c) => c.amount > 0); // Only include classes with payments

  const methodChartData = {
    labels: paymentMethods,
    datasets: [
      {
        label: "Number of Payments",
        data: methodCounts,
        backgroundColor: ["#6B7280", "#10B981", "#3B82F6"],
      },
    ],
  };

  const classChartData = {
    labels: classCounts.map((c) => c.class || "Unknown"),
    datasets: [
      {
        label: "Total Amount (KES)",
        data: classCounts.map((c) => c.amount),
        backgroundColor: ["#8B5CF6", "#EC4899", "#F59E0B", "#10B981"],
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-900 mb-6 flex items-center gap-2">
        <Wallet className="text-purple-600" /> Fees & Payments
      </h1>
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Set Fees</h2>

        {/* Flex container for form and table */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side: Form */}
          <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Add / Update Fee</h3>
            <form onSubmit={handleSubmitfees} className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Class Name
                </label>
                <select
                  name="class_level"
                  required
                  value={form.class_level}
                  onChange={(e) => setForm({ ...form, class_level: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.name}>
                      {cls.name} ({cls.category})
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                placeholder="Term (e.g. Term 2)"
                value={form.term}
                onChange={(e) => setForm({ ...form, term: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Year"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Amount (KES)"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full border p-2 rounded"
              />

              <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Save Fee
              </button>
            </form>

            {message && <p className="text-center text-sm mt-3">{message}</p>}
          </div>

          {/* Right side: Table */}
          <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-4 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-3">Current Fees</h3>
            <table className="w-full border text-left text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Class</th>
                  <th className="p-2 border">Term</th>
                  <th className="p-2 border">Year</th>
                  <th className="p-2 border">Amount (KES)</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((f) => (
                  <tr key={f.id} className="hover:bg-gray-50">
                    <td className="p-2 border">{f.class_level}</td>
                    <td className="p-2 border">{f.term}</td>
                    <td className="p-2 border">{f.year}</td>
                    <td className="p-2 border">{f.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Record Payment Form */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Record Payment</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="studentId"
            placeholder="Student number"
            value={formData.studentId}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
          <input
            type="text"
            name="studentName"
            placeholder="Student Name"
            value={formData.studentName}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
          <select
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.name}>
                {cls.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="amount"
            placeholder="Amount Paid"
            value={formData.amount}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
          <select
            name="method"
            value={formData.method}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          >
            <option value="Mpesa">Mpesa</option>
            <option value="Cash">Cash</option>
            <option value="Bank">Bank</option>
          </select>
          <input
            type="text"
            name="transactionCode"
            placeholder="Transaction Code"
            value={formData.transactionCode}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
          <button
            type="submit"
            className="col-span-2 bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800"
          >
            Save Payment
          </button>
        </form>
      </div>

      {/* Outstanding Fees */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Outstanding Fees</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchOutstanding}
              onChange={(e) => setSearchOutstanding(e.target.value)}
              className="border rounded-lg p-2"
            />
            <button
              onClick={() =>
                exportToExcel(filteredOutstanding, "Outstanding_Fees_Report")
              }
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Download size={18} /> Download
            </button>
          </div>
        </div>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="border p-2 text-left">Student ID</th>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Class</th>
              <th className="border p-2 text-left">Outstanding (KES)</th>
            </tr>
          </thead>
          <tbody>
            {currentOutstanding.map((fee, index) => (
              <tr key={index}>
                <td className="border p-2">{fee.studentId}</td>
                <td className="border p-2">{fee.studentName}</td>
                <td className="border p-2">{fee.class}</td>
                <td className="border p-2 text-red-600">
                  {fee.outstanding.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        {totalOutstandingPages > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={() => paginate(outstandingPage - 1, "outstanding")}
              disabled={outstandingPage === 1}
              className="px-3 py-1 rounded bg-purple-700 text-white hover:bg-purple-800 disabled:bg-gray-300"
            >
              Prev
            </button>
            {getPaginationNumbers(outstandingPage, totalOutstandingPages).pages.map(
              (page) => (
                <button
                  key={page}
                  onClick={() => paginate(page, "outstanding")}
                  className={`px-3 py-1 rounded ${
                    outstandingPage === page
                      ? "bg-purple-700 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() => paginate(outstandingPage + 1, "outstanding")}
              disabled={outstandingPage === totalOutstandingPages}
              className="px-3 py-1 rounded bg-purple-700 text-white hover:bg-purple-800 disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Recorded Payments */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Recorded Payments</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchPayments}
              onChange={(e) => setSearchPayments(e.target.value)}
              className="border rounded-lg p-2"
            />
            <button
              onClick={() => exportToExcel(filteredPayments, "Recorded_Payments")}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Download size={18} /> Download
            </button>
          </div>
        </div>
        {payments.length === 0 ? (
          <p className="text-gray-500">No payments recorded yet.</p>
        ) : (
          <>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Class</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Method</th>
                  <th className="border p-2">Transaction Code</th>
                </tr>
              </thead>
              <tbody>
                {currentPayments.map((pay, index) => (
                  <tr key={index}>
                    <td className="border p-2">{pay.student_id}</td>
                    <td className="border p-2">{pay.student_name}</td>
                    <td className="border p-2">{pay.class_level}</td>
                    <td className="border p-2 text-green-600">
                      {Number(pay.amount).toLocaleString()}
                    </td>
                    <td className="border p-2">{pay.method}</td>
                    <td className="border p-2">{pay.transaction_code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4 gap-2">
                <button
                  onClick={() => paginate(currentPage - 1, "payments")}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-purple-700 text-white hover:bg-purple-800 disabled:bg-gray-300"
                >
                  Prev
                </button>
                {getPaginationNumbers(currentPage, totalPages).pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => paginate(page, "payments")}
                    className={`px-3 py-1 rounded ${
                      currentPage === page ? "bg-purple-700 text-white" : "bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1, "payments")}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded bg-purple-700 text-white hover:bg-purple-800 disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Graphical Analysis */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Payment Analysis</h2>
        {payments.length === 0 ? (
          <p className="text-gray-500">No payment data available for analysis.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-semibold mb-2">Payments by Method</h3>
              <Bar data={methodChartData} options={{ responsive: true }} />
            </div>
            <div>
              <h3 className="text-md font-semibold mb-2">Total Amount by Class</h3>
              <Bar data={classChartData} options={{ responsive: true }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClerkPayments;