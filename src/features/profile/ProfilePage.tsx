import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Profile = {
  name: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  avatar: string;
};

export const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  // Fetch user profile from backend
  const fetchProfile = async () => {
    const res = await fetch("http://localhost:8080/api/users/profile", {
      headers: {
        Authorization: "Bearer YOUR_TOKEN",
      },
    });
    const data = await res.json();
    setProfile(data);
  };

  // Update profile to backend
  const handleUpdate = async () => {
    await fetch("http://localhost:8080/api/users/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_TOKEN",
      },
      body: JSON.stringify(profile),
    });
    setIsEditing(false);
  };

  if (!profile) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold mb-8">Profile Information</h1>

        <div className="flex gap-8">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <Avatar className="w-28 h-28">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          {/* Profile Details */}
          <div className="flex-1 space-y-4">
            <Field label="Full Name">
              {isEditing ? (
                <input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="input"
                />
              ) : (
                profile.name
              )}
            </Field>

            <Field label="Date of Birth">
              {isEditing ? (
                <input
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) =>
                    setProfile({ ...profile, dateOfBirth: e.target.value })
                  }
                  className="input"
                />
              ) : (
                profile.dateOfBirth
              )}
            </Field>

            <Field label="Phone Number">
              {isEditing ? (
                <input
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  className="input"
                />
              ) : (
                profile.phone
              )}
            </Field>

            <Field label="Address">
              {isEditing ? (
                <input
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                  className="input"
                />
              ) : (
                profile.address
              )}
            </Field>

            <div className="pt-4 flex gap-3">
              {isEditing ? (
                <>
                  <Button onClick={handleUpdate}>Save</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  Update Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex gap-4 items-center">
    <div className="w-40 text-gray-500">{label}</div>
    <div className="flex-1 font-medium">{children}</div>
  </div>
);
