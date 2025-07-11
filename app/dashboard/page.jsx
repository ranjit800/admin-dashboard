"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ListingTable from "@/components/ListingTable";
import { useFeedback } from "@/context/FeedbackContext";
import { logAction } from "@/lib/logs";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const { setMessage } = useFeedback();

  useEffect(() => {
    if (user === null) return; // still loading
    if (!user) router.push("/login");
    else fetchListings();
  }, [user]);

  const fetchListings = async () => {
    const res = await fetch("/api/listings");
    const data = await res.json();
    setListings(data);
  };

  const handleAction = async (id, actionOrData, type = "status") => {
    if (type === "edit") {
      await fetch(`/api/listings/${id}`, {
        method: "PUT",
        body: JSON.stringify(actionOrData),
      });

      setListings((prev) => prev.map((item) => (item.id === id ? { ...item, ...actionOrData } : item)));

      setMessage(`Listing updated: ${actionOrData.title} by ${actionOrData.owner}`);

      // 🔍 Log Edit
      logAction({
        admin: user.email,
        listingId: id,
        action: `edited (${actionOrData.title})`,
      });
    } else {
      await fetch(`/api/listings/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: actionOrData }),
      });

      setListings((prev) => prev.map((item) => (item.id === id ? { ...item, status: actionOrData } : item)));

      setMessage(`Listing ${actionOrData} successfully`);

      // 🔍 Log Approve/Reject
      logAction({
        admin: user.email,
        listingId: id,
        action: actionOrData,
      });
    }
  };

  if (!user) return null;

  return (
    <div className="px-8 min-h-[100vh] max-h-auto bg-black">
      {/* Header with Audit Logs + Logout */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-cyan-200 py-8">Dashboard</h1>
        <div className="flex gap-3">
          <a href="/audit" className="px-3 py-1 rounded-md text-xs bg-cyan-700 hover:bg-cyan-600 text-white font-semibold">
            Audit Logs
          </a>
          <button onClick={logout} className="btn-sm bg-red-600 hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>

      <ListingTable listings={listings} onAction={handleAction} />
    </div>
  );
}
