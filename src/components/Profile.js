import React, { useState } from "react";

const Profile = () => {
  const [username, setUsername] = useState("User123");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="profile">
      <h2>Profile</h2>
      <div>
        <label>Username</label>
        <input type="text" value={username} onChange={handleChangeUsername} />
      </div>
      <button>Save Changes</button>
    </div>
  );
};

export default Profile;
