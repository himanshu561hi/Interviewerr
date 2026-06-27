"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { Loader2, Edit2, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [editingId, setEditingId] = useState(null);
  const [editCredits, setEditCredits] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      toast.error("Failed to load users");
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setEditCredits(user.credits);
  };

  const handleSaveCredits = async (user) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email, credits: editCredits }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update");
      }

      toast.success("Credits updated successfully");
      setEditingId(null);
      fetchUsers(); // refresh data
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 rounded-t-lg">
          <tr>
            <th className="px-6 py-4 rounded-tl-lg">User</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Plan</th>
            <th className="px-6 py-4">Credits</th>
            <th className="px-6 py-4 rounded-tr-lg text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-white border-b hover:bg-gray-50/50">
              <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                {user.profile_image ? (
                  <img src={user.profile_image} alt={user.name} className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}
                {user.name}
              </td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                  user.plan === 'basic' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {user.plan?.toUpperCase()}
                </span>
              </td>
              <td className="px-6 py-4">
                {editingId === user.id ? (
                  <Input 
                    type="number" 
                    value={editCredits} 
                    onChange={(e) => setEditCredits(parseInt(e.target.value) || 0)}
                    className="w-20 h-8 text-sm"
                  />
                ) : (
                  <span className="font-semibold text-gray-700">{user.credits} / {user.totalCredits}</span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                {editingId === user.id ? (
                  <div className="flex items-center justify-end gap-2">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => handleSaveCredits(user)}>
                      <Check className="w-4 h-4 text-green-600" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setEditingId(null)}>
                      <X className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                ) : (
                  <Button size="sm" variant="ghost" onClick={() => handleEditClick(user)}>
                    <Edit2 className="w-4 h-4 text-gray-500" />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && (
        <div className="text-center p-10 text-gray-500">No users found.</div>
      )}
    </div>
  );
}
