import { getUsers } from "../lib/actions/users";
import UsersGrid from "./UsersGrid";

export default async function DashboardPage() {
  const users = await getUsers();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Manage your users</p>
      </div>

      <UsersGrid users={users} />
    </div>
  );
}
