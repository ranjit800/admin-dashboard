'use client';
import { useState } from 'react';

export default function EditModal({ listing, onClose, onUpdate }) {
  const [title, setTitle] = useState(listing.title || '');
  const [owner, setOwner] = useState(listing.owner || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/listings/${listing.id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, owner }),
    });
    onUpdate(listing.id, { title, owner }, 'edit');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">Edit Listing</h2>

        <label className="block mb-2 font-medium">Car Name</label>
        <input
          className="input mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium">Owner</label>
        <input
          className="input mb-4"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          required
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-sm bg-gray-300 text-black hover:bg-gray-400"
          >
            Cancel
          </button>
          <button type="submit" className="btn-sm bg-blue-600 hover:bg-blue-700">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
