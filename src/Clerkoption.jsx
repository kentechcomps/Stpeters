import { Link } from "react-router-dom"
import { UserPlus, Wallet, AlertCircle, LogOut, FileText, Home } from "lucide-react";
const Clerkoptions = () => {


  return (
    <>
        <div className="text-sm text-gray-600 mb-6">
          Dashboard / Clerk
        </div>

        <h1 className="text-2xl font-bold text-purple-900 mb-6">Clerk Dashboard</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Add Student */}
          <Link
            to="/clerksdashboard/users"
            className="bg-white shadow-md p-6 rounded-2xl hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">Add Student/Parent</h2>
              <UserPlus className="text-purple-600" size={30} />
            </div>
            <p className="text-gray-500 mt-2">Register a new student/Parent</p>
          </Link>

          {/* Record Payment */}
          <Link
            to="/clerk/payments/add"
            className="bg-white shadow-md p-6 rounded-2xl hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">Record Payment</h2>
              <Wallet className="text-green-600" size={30} />
            </div>
            <p className="text-gray-500 mt-2">Log fees payment & issue receipts.</p>
          </Link>

          {/* Outstanding Fees */}
          <Link
            to="/clerk/payments/outstanding"
            className="bg-white shadow-md p-6 rounded-2xl hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">Outstanding Fees</h2>
              <AlertCircle className="text-red-600" size={30} />
            </div>
            <p className="text-gray-500 mt-2">Check unpaid balances.</p>
          </Link>
        </div>

    </>
  )
}
export default Clerkoptions