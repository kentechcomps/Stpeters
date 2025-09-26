// ClerkPayments.jsx
import React, { useState } from "react";
import { Download, Wallet } from "lucide-react";
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
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    class: "",
    amount: "",
    method: "Mpesa",
    transactionCode: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [outstandingPage, setOutstandingPage] = useState(1);
  const [searchOutstanding, setSearchOutstanding] = useState("");
  const [searchPayments, setSearchPayments] = useState("");
  const itemsPerPage = 5;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPayments([...payments, formData]);
    setFormData({
      studentId: "",
      studentName: "",
      class: "",
      amount: "",
      method: "Mpesa",
      transactionCode: "",
    });
    setCurrentPage(1);
  };

  // Generate sample Outstanding Fees
  const outstandingFees = Array.from({ length: 50 }, (_, i) => ({
    studentId: `ST${String(i + 1).padStart(3, "0")}`,
    studentName: `Student ${i + 1}`,
    class: `Form ${(i % 4) + 1}`,
    outstanding: Math.floor(Math.random() * 15000) + 1000,
  }));

  // 🔍 Filtering
  const filteredOutstanding = outstandingFees.filter(
    (fee) =>
      fee.studentId.toLowerCase().includes(searchOutstanding.toLowerCase()) ||
      fee.studentName.toLowerCase().includes(searchOutstanding.toLowerCase()) ||
      fee.class.toLowerCase().includes(searchOutstanding.toLowerCase())
  );

  const filteredPayments = payments.filter(
    (pay) =>
      pay.studentId.toLowerCase().includes(searchPayments.toLowerCase()) ||
      pay.studentName.toLowerCase().includes(searchPayments.toLowerCase()) ||
      pay.class.toLowerCase().includes(searchPayments.toLowerCase()) ||
      pay.method.toLowerCase().includes(searchPayments.toLowerCase())
  );

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
    } else {
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

  const classCounts = [...new Set(payments.map((p) => p.class))].map((cls) => ({
    class: cls,
    amount: payments
      .filter((p) => p.class === cls)
      .reduce((sum, p) => sum + Number(p.amount), 0),
  }));

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
            placeholder="Student ID"
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
          <input
            type="text"
            name="class"
            placeholder="Class (e.g. Form 2)"
            value={formData.class}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
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
                    <td className="border p-2">{pay.studentId}</td>
                    <td className="border p-2">{pay.studentName}</td>
                    <td className="border p-2">{pay.class}</td>
                    <td className="border p-2 text-green-600">
                      {Number(pay.amount).toLocaleString()}
                    </td>
                    <td className="border p-2">{pay.method}</td>
                    <td className="border p-2">{pay.transactionCode}</td>
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
