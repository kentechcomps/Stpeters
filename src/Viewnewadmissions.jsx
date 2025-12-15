import React, { useEffect, useState } from "react";
import { supabase } from "./Supabaseclient";

export default function AdminAdmissions() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAdmissions = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("admissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setAdmissions(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load admissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading admissions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        📋 New Admissions
      </h1>

      {admissions.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          No admissions found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3 text-left">DOB</th>
                <th className="px-4 py-3 text-left">Guardian</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Class</th>
                <th className="px-4 py-3 text-left">Documents</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {admissions.map((adm) => (
                <tr
                  key={adm.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {adm.first_name} {adm.last_name}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {adm.dob}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {adm.guardian_name}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {adm.guardian_phone}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {adm.grade}
                  </td>

                  <td className="px-4 py-3">
                    {adm.documents && adm.documents.length > 0 ? (
                      <ul className="space-y-1">
                        {adm.documents.map((doc, i) => (
                          <li key={i}>
                            <a
                              href={doc}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm"
                            >
                              View Document {i + 1}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400 text-sm">
                        No documents
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-gray-500 text-sm">
                    {new Date(adm.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
