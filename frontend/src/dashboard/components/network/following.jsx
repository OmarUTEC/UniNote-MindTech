import React, { useState, useEffect } from 'react';

const Following = ({ userId }) => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await fetch(`http://34.239.210.249:5000/following/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFollowing(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFollowing();
  }, [userId]);

  const handleUnfollow = async (followingId) => {
    try {
      const response = await fetch(`http://34.239.210.249:5000/unfollow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          follower_id: userId,
          following_id: followingId
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setFollowing(following.filter(follow => follow.id !== followingId));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 px-6">
      <h2 className="text-2xl font-bold mb-4 text-white">FOLLOWING</h2>
      <hr className="border-white my-4" />
      
      <div className="mt-20"> {/* Ajuste: Margen superior aumentado */}
        <div className="bg-blue-100 p-8 rounded-lg shadow-lg">
          <ul>
            {following.map((follow, index) => (
              <li key={index} className="flex items-center bg-white p-6 mb-6 rounded-lg shadow-md justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
                  <div>
                    <h3 className="text-lg font-bold">{follow.username}</h3>
                    <p className="text-gray-600">Universidad de Ingeniería y Tecnología, estudiante de la carrera de Computer Science.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
                    onClick={() => handleUnfollow(follow.id)}
                  >
                    Dejar de Seguir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Following;

