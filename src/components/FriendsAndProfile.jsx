import React, { useState } from 'react';
import Friends from './Friends';
import Profile from './Profile';
import '../css/FriendsAndProfile.css';


const FriendsAndProfile = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="fpc">
      <Friends setSelectedUser={setSelectedUser} />
      {selectedUser && <Profile userId={selectedUser.id} />} {/* Show profile if a user is selected */}
    </div>
  );
};

export default FriendsAndProfile;
