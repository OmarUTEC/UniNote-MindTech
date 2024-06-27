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
        // Agregar propiedad isFollowing a cada seguidor
        const followersWithFollowing = data.map(follower => ({
          ...follower,
          isFollowing: false  // Inicialmente ninguno sigue
        }));
        setFollowers(followersWithFollowing);
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
      //const newFollower = await response.json();
      // Actualizar estado para marcar como seguido
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
    <div className="max-w-4xl mx-auto mt-8 px-6">
      <h2 className="text-2xl font-bold mb-4 text-white">FOLLOWERS</h2>
      <hr className="border-white my-4" />
      <div className="mt-20">
        <div className="bg-blue-100 p-8 rounded-lg shadow-lg">
          <ul>
            {followers.map((follower, index) => (
              <li key={index} className="flex items-center bg-white p-6 mb-6 rounded-lg shadow-md justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full"></div>
                  <div>
                    <h3 className="text-xl font-bold">{follower.username}</h3>
                    <p className="text-gray-600">Universidad de Ingeniería y Tecnología, estudiante de la carrera de Computer Science.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {follower.isFollowing ? (
                    <button
                      className="bg-gray-300 text-gray-600 px-4 py-2 rounded shadow cursor-not-allowed"
                      disabled
                    >
                      Siguiendo
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
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
      </div>
    </div>
  );
};

export default Followers;
