import React, { useEffect, useState } from "react";
import { supabase } from "./Supabaseclient";
import {
  Shield,
  Bell,
  Users,
  Palette,
  Database,
  KeyRound,
  ClipboardList,
} from "lucide-react";

const SettingsPage = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch settings from Supabase
  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase.from("settings").select("*").limit(1);
      if (error) console.error("Error fetching settings:", error.message);
      else setSettings(data);
      setLoading(false);
    };
    fetchSettings();
  }, []);

  // Update Supabase on change
  const updateSetting = async (field, value) => {
    if (!settings) return;
    const updated = { ...settings, [field]: value, updated_at: new Date().toISOString() };
    setSettings(updated);
    

    const { error } = await supabase
      .from("settings")
      .update({ [field]: value, updated_at: new Date().toISOString() })
      .eq("id", settings.id);

    if (error) console.error("Error updating setting:", error);
  };

  if (loading) return <div className="p-6 text-center">Loading settings...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">⚙️ Admin Settings</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Security */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">Security</h2>
          </div>
          <ul className="space-y-3 text-gray-600">
            <li>✅ Enable Two-Factor Authentication</li>
            <li>✅ Password Policy</li>
            <li>✅ Session Timeout</li>
          </ul>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="text-green-600" />
            <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span>Email Notifications</span>
            <button
              onClick={() => updateSetting("email_notifications", !settings.email_notifications)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                settings.email_notifications ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                  settings.email_notifications ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span>SMS Notifications</span>
            <button
              onClick={() => updateSetting("sms_notifications", !settings.sms_notifications)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                settings.sms_notifications ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                  settings.sms_notifications ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
          </div>
          <p className="text-gray-600 mb-3">Limit number of users in the system.</p>
          <input
            type="number"
            value={settings.max_users}
            onChange={(e) => updateSetting("max_users", parseInt(e.target.value))}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">Max allowed users: {settings.max_users}</p>
        </div>

        {/* Appearance */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <Palette className="text-pink-600" />
            <h2 className="text-xl font-semibold text-gray-800">Appearance</h2>
          </div>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <button
              onClick={() => updateSetting("dark_mode", !settings.dark_mode)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                settings.dark_mode ? "bg-indigo-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                  settings.dark_mode ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Database */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Database</h2>
          </div>
          <button
            onClick={() => updateSetting("last_backup", new Date().toISOString())}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg shadow"
          >
            Backup Now
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Last backup: {new Date(settings.last_backup).toLocaleString()}
          </p>
        </div>

        {/* API */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <KeyRound className="text-yellow-600" />
            <h2 className="text-xl font-semibold text-gray-800">API & Integrations</h2>
          </div>
          <p className="text-gray-600 mb-3">Manage API integrations.</p>
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg shadow">
            Generate API Key
          </button>
        </div>

        {/* Audit Logs */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 md:col-span-2">
          <div className="flex items-center space-x-3 mb-4">
            <ClipboardList className="text-red-600" />
            <h2 className="text-xl font-semibold text-gray-800">Audit Logs</h2>
          </div>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>👩‍💻 Admin updated settings – 2h ago</li>
            <li>📢 Teacher Mary sent announcements – 5h ago</li>
            <li>🎓 New student registered – 1 day ago</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
