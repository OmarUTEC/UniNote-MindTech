import React, { useState, useEffect } from 'react';

const Followers = ({ userId }) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/followers/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFollowers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFollowers();
  }, [userId]);

  const handleFollow = async (followerId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/follow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          follower_id: userId,
          following_id: followerId
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newFollower = await response.json();
      setFollowers(followers.map(follower => 
        follower.id === followerId ? { ...follower, isFollowing: true } : follower
      ));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-blue-100 p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Followers</h2>
      <ul>
        {followers.map((follower, index) => (
          <li key={index} className="flex items-center bg-white p-4 mb-4 rounded-lg shadow-md justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
              <div>
                <h3 className="text-lg font-bold">{follower.username}</h3>
                <p className="text-gray-600">Universidad de Ingeniería y Tecnología, estudiante de la carrera de Computer Science.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!follower.isFollowing && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                  onClick={() => handleFollow(follower.id)}
                >
                  Seguir
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Followers;
