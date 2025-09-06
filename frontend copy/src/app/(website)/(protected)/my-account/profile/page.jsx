"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/context/UserContext";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user } = useUser();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Fetch user data
  async function getProfile(id) {
    try {
      const { data } = await axiosInstance.get(`/api/user/${id}`);
      setUserData({
        name: data?.data?.name || "",
        email: data?.data?.email || "",
        password: "",
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
      toast.error("Failed to load profile");
    }
  }

  // Update user data
  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put(`/api/user/${user._id}`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user?._id) {
      getProfile(user._id);
    }
  }, [user]);

  return (
    <div className="mt-4 md:mt-0">
      <Card>
        <CardContent className="space-y-4 px-6">
          <CardTitle className="text-xl mb-4">Edit Profile</CardTitle>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={userData.name}
                disabled={!editMode}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={userData.email}
                disabled={!editMode}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={userData.password}
                disabled={!editMode}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </div>
            {/* Edit Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-mode"
                checked={editMode}
                onCheckedChange={(val) => setEditMode(!!val)}
              />
              <Label htmlFor="edit-mode">Edit Mode</Label>
            </div>
            {editMode && (
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
