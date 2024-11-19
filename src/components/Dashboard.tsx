import { useAuth } from "../contexts/AuthContext";

export const Dashboard = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="mb-4">
          <p className="text-gray-600">Email: {user?.email}</p>
        </div>
        <button
          onClick={signOut}
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
