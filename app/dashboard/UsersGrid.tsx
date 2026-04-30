"use client";

import { useState } from "react";
import { updateUser, deleteUser } from "../lib/actions/users";

// ✅ simple type (no Prisma import)
type User = {
  id: string;
  name: string | null;
  email: string;
};

export default function UsersGrid({ users }: { users: User[] }) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [form, setForm] = useState({ name: "", email: "" });

  const openEdit = (user: User) => {
    setSelectedUser(user);
    setForm({ name: user.name || "", email: user.email });
    setIsEditOpen(true);
  };

  const openDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    await updateUser(selectedUser.id, form);

    setIsEditOpen(false);
    window.location.reload(); // simple refresh
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    await deleteUser(selectedUser.id);

    setIsDeleteOpen(false);
    window.location.reload(); // simple refresh
  };

  return (
    <div className="max-w-6xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Users</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
          >
            <p className="text-sm text-gray-400 mb-1">Name</p>
            <p className="text-sm font-medium text-gray-900 mb-3">
              {user.name || "No name"}
            </p>

            <p className="text-sm text-gray-400 mb-1">Email</p>
            <p className="text-sm text-gray-700 mb-4">{user.email}</p>

            <div className="flex gap-2">
              <button
                onClick={() => openEdit(user)}
                className="flex-1 text-sm bg-black text-white py-1.5 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => openDelete(user)}
                className="flex-1 text-sm bg-red-500 text-white py-1.5 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
            <h3 className="text-lg text-black font-semibold">Edit User</h3>

            <input
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full border p-2 rounded text-black"
            />

            <input
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full border p-2 rounded text-black"
            />

            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-black text-white py-2 rounded"
              >
                Update
              </button>

              <button
                onClick={() => setIsEditOpen(false)}
                className="flex-1 bg-green-500 text-white border py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4">
            <h3 className="text-lg font-semibold text-black">Confirm Delete</h3>

            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white py-2 rounded"
              >
                Delete
              </button>

              <button
                onClick={() => setIsDeleteOpen(false)}
                className="flex-1 border py-2 rounded  bg-green-500 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
