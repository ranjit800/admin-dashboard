'use client';
import { useState } from 'react';
import EditModal from './EditModal';

export default function ListingTable({ listings, onAction }) {
  const [editItem, setEditItem] = useState(null);
  const [loadingButton, setLoadingButton] = useState({ id: null, action: null });
  const [selectedStatus, setSelectedStatus] = useState('all');

  const isButtonLoading = (id, action) =>
    loadingButton.id === id && loadingButton.action === action;

  const handleStatusChange = async (id, status) => {
    setLoadingButton({ id, action: status });
    await onAction(id, status);
    setLoadingButton({ id: null, action: null });
  };

  const filteredListings =
    selectedStatus === 'all'
      ? listings
      : listings.filter((car) => car.status === selectedStatus);

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-2 px-2 py-3 sticky top-0 z-30 bg-[#0f0f0f] border-b border-gray-800 rounded-lg">
        {['all', 'approved', 'pending', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-3 py-1 text-xs font-semibold rounded-md border capitalize
              ${selectedStatus === status
                ? 'bg-cyan-600 text-white border-cyan-600'
                : 'bg-transparent text-gray-300 border-gray-600 hover:bg-gray-800'
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Listing Table */}
      <div className="h-[calc(100vh-25vh)] overflow-y-auto custom-scroll rounded-xl shadow-lg border border-gray-800 bg-[#0f0f0f]">
        <table className="min-w-full text-sm text-left text-gray-300">
          <thead className="bg-[#1f1f1f] text-cyan-400 border-b border-cyan-700 uppercase text-xs font-semibold sticky top-0 z-20">
            <tr>
              <th className="px-6 py-4">Car Name</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Owner</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredListings.map((car) => {
              const { id, title, price, location, owner, status } = car;

              return (
                <tr
                  key={id}
                  className="border-t border-gray-800 hover:bg-[#1a1a1a] transition-all"
                >
                  <td className="px-6 py-4 font-medium">{title}</td>
                  <td className="px-6 py-4">{price}</td>
                  <td className="px-6 py-4">{location}</td>
                  <td className="px-6 py-4">{owner}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-bold shadow-sm ${
                        status === 'approved'
                          ? 'bg-green-500/20 text-green-400 border border-green-500'
                          : status === 'rejected'
                          ? 'bg-red-500/20 text-red-400 border border-red-500'
                          : 'bg-yellow-500/20 text-yellow-300 border border-yellow-400'
                      }`}
                    >
                      {status}
                    </span>
                  </td>

                  <td className="px-6 py-4 flex flex-wrap gap-2">
                    <button
                      className={`px-3 py-1 rounded-md text-xs font-semibold tracking-wide shadow transition-all duration-150 ${
                        status === 'approved'
                          ? 'bg-green-700/30 text-green-300 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-500 text-white'
                      }`}
                      disabled={
                        status === 'approved' || isButtonLoading(id, 'approved')
                      }
                      onClick={() => handleStatusChange(id, 'approved')}
                    >
                      {isButtonLoading(id, 'approved') ? 'Loading...' : 'Approve'}
                    </button>

                    <button
                      className={`px-3 py-1 rounded-md text-xs font-semibold tracking-wide shadow transition-all duration-150 ${
                        status === 'rejected'
                          ? 'bg-red-700/30 text-red-300 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-500 text-white'
                      }`}
                      disabled={
                        status === 'rejected' || isButtonLoading(id, 'rejected')
                      }
                      onClick={() => handleStatusChange(id, 'rejected')}
                    >
                      {isButtonLoading(id, 'rejected') ? 'Loading...' : 'Reject'}
                    </button>

                    <button
                      className="px-3 py-1 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold tracking-wide shadow"
                      onClick={() => setEditItem(car)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editItem && (
        <EditModal
          listing={editItem}
          onClose={() => setEditItem(null)}
          onUpdate={onAction}
        />
      )}
    </>
  );
}
