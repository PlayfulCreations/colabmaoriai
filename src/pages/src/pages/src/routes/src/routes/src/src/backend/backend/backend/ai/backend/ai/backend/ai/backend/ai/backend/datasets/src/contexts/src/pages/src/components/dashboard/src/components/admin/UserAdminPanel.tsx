import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { listUsers, deleteUser, changeUserRole } from "../../services/api";

const UserAdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<{ username: string; role: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<string | null>(null);
  const [editRole, setEditRole] = useState<string>("user");
  const [msg, setMsg] = useState<string | null>(null);

  const fetchUsers = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    setMsg(null);
    try {
      const res = await listUsers(user.token);
      setUsers(res);
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [user]);

  const handleDelete = async (username: string) => {
    if (!user) return;
    setError(null);
    setMsg(null);
    try {
      await deleteUser(username, user.token);
      setMsg(`User "${username}" deleted`);
      fetchUsers();
    } catch (err: any) {
      setError(err.message || "Failed to delete user");
    }
  };

  const handleRoleChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !editUser) return;
    setError(null);
    setMsg(null);
    try {
      await changeUserRole(editUser, editRole, user.token);
      setMsg(`Role for "${editUser}" updated`);
      setEditUser(null);
      fetchUsers();
    } catch (err: any) {
      setError(err.message || "Failed to change role");
    }
  };

  return (
    <section className="mb-8">
      <h3 className="text-2xl font-semibold mb-2">User Management</h3>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {msg && <div className="text-green-600 mb-2">{msg}</div>}
      <ul className="list-disc pl-6 space-y-2">
        {users.map(u => (
          <li key={u.username} className="flex items-center gap-4">
            <span>
              <b>{u.username}</b> <span className="text-gray-600">({u.role})</span>
            </span>
            {u.username !== "admin" && (
              <>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(u.username)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => {
                    setEditUser(u.username);
                    setEditRole(u.role);
                  }}
                >
                  Change Role
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      {editUser && (
        <form className="mt-4 flex gap-2 items-center" onSubmit={handleRoleChange}>
          <span>Change role for <b>{editUser}</b>:</span>
          <select
            className="border px-2 py-1 rounded"
            value={editRole}
            onChange={e => setEditRole(e.target.value)}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <button className="bg-green-600 text-white px-3 py-1 rounded" type="submit">
            Update
          </button>
          <button className="bg-gray-300 px-3 py-1 rounded" type="button" onClick={() => setEditUser(null)}>
            Cancel
          </button>
        </form>
      )}
    </section>
  );
};

export default UserAdminPanel;
