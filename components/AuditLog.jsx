"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getLogs } from "@/lib/logs";

export default function AuditPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [logs, setLogs] = useState([]);
  const [isMounted, setIsMounted] = useState(false); // Hydration check

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (!user) {
      router.push("/login");
    } else {
      const fetchedLogs = getLogs();
      setLogs(fetchedLogs.reverse());
    }
  }, [user, isMounted]);

  if (!isMounted || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-cyan-300"> Audit Trail</h2>
        <a href="/" className="text-sm text-cyan-400 underline hover:text-cyan-200">
          ← Back to Dashboard
        </a>
      </div>

      {logs.length === 0 ? (
        <p className="text-gray-400">No actions logged yet.</p>
      ) : (
        <ul className="space-y-3 text-sm">
          {logs.map((log, i) => (
            <li key={i} className="border border-gray-700 rounded p-3 bg-[#1a1a1a]">
              <div className="text-cyan-400 font-semibold">
                {log.admin} <span className="text-gray-400">→</span> <span className="capitalize">{log.action}</span>
              </div>
              <div className="text-gray-400 text-xs mt-1">
                Listing ID: <span className="text-white">{log.listingId}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
