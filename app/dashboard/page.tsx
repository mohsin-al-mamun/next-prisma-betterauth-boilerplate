import { getUsers } from "../lib/actions/users";

export default async function DashboardPage() {
  const users = await getUsers();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Manage your users</p>
      </div>

      {/* Card Container */}
      <div className="max-w-6xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Users</h2>

        {/* Grid Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition"
            >
              <p className="text-sm text-gray-400 mb-1">ID</p>
              <p className="text-sm font-medium text-gray-800 mb-3">
                {user.id}
              </p>

              <p className="text-sm text-gray-400 mb-1">Name</p>
              <p className="text-sm font-medium text-gray-900 mb-3">
                {user.name || "No name"}
              </p>

              <p className="text-sm text-gray-400 mb-1">Email</p>
              <p className="text-sm text-gray-700">{user.email}</p>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-10 text-gray-500 text-sm">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
}
