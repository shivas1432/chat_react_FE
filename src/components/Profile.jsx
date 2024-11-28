import React, { useEffect, useState } from 'react';
// Removed Link import since it's not used
import { useNavigate } from 'react-router-dom'; 

const Profile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return; // Don't fetch if userId is not available
      try {
        const response = await fetch(`http://localhost:8081/api/profile/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  // Function to handle the close button click
  const handleCloseProfile = () => {
    navigate('/chat'); // Navigate to the friends page
  };

  return (
    <div className="profile-container">
      <button className="close-button" onClick={handleCloseProfile}>&times;</button> {/* Close button */}
      <h1>{user.name}'s Profile</h1>
      <div className="profile-banner">
        <img src={user.profile_banner_url} alt="Profile Banner" className="profile-banner-image" />
      </div>
      <img src={user.profile_image_url_https} alt={user.name} className="profile-image" />
      <p><strong>Username:</strong> {user.screen_name}</p>
      <p><strong>Followers:</strong> {user.followers_count}</p>
      <p><strong>Friends:</strong> {user.friends_count}</p>
      <p><strong>Favorites:</strong> {user.favourites_count}</p>
      <p><strong>Statuses Count:</strong> {user.statuses_count}</p>
      <p><strong>Listed Count:</strong> {user.listed_count}</p>
      <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {user.location}</p>
      <p><strong>Description:</strong> {user.description}</p>
      <p><strong>URL:</strong> <a href={user.url} target="_blank" rel="noopener noreferrer">{user.url}</a></p>
      <p><strong>Time Zone:</strong> {user.time_zone}</p>
      <p><strong>Verified:</strong> {user.verified ? "Yes" : "No"}</p>
    </div>
  );
};

export default Profile;
