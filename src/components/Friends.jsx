import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Friends = ({ setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUserState] = useState(null); // Track the currently selected user
  const [visibleProfileId, setVisibleProfileId] = useState(null); // Track which profile details are visible

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:8081/api/friends');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    // Check if the clicked user is already selected
    if (selectedUser && selectedUser.id === user.id) {
      setSelectedUserState(null); // Deselect user if clicked again
      setSelectedUser(null); // Update the parent component if necessary
      setVisibleProfileId(null); // Hide profile details if already selected
    } else {
      setSelectedUserState(user); // Set the selected user when clicked
      setSelectedUser(user); // Update the parent component
      setVisibleProfileId(user.id); // Show the profile details for the clicked user
    }
  };

  return (
    <div className="friends-container">
      <h1>All Users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching users: {error}</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="friends-list">
          {users.map(user => (
            <li key={user.id}>
              <Link to="#" onClick={() => handleUserClick(user)} className="friend-link">
                {user.name} (@{user.screen_name})
              </Link>
              {/* Show profile details only for the currently selected user */}
              {visibleProfileId === user.id && (
               <div className='profile-details'>
               <button className="action-button" style={{ marginRight: '10px', marginLeft:'20px' }}>
                 <i className="fas fa-comment">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-phone">
                     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                     <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                   </svg>
                 </i>
               </button>
               <button className="action-button" style={{ marginRight: '10px' }}>
                 <i className="fas fa-hand-sparkles">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-message">
                     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                     <path d="M8 9h8" />
                     <path d="M8 13h6" />
                     <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
                   </svg>
                 </i>
               </button>
               <button className="action-button">
                 <i className="fas fa-thumbs-up">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bell">
                     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                     <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                     <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                   </svg>
                 </i>
               </button>
             </div>
             
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Friends;
