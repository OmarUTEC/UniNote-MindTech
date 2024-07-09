import React, { useState, useEffect } from 'react';

const Followers = ({ userId }) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFollowers, setShowFollowers] = useState(true);

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
      }
    };

    const fetchFollowing = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/following/${userId}`, {
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

    const fetchFollowersCount = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/followers_count/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFollowersCount(data.count);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchFollowingCount = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/following_count/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFollowingCount(data.count);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFollowers();
    fetchFollowing();
    fetchFollowersCount();
    fetchFollowingCount();
  }, [userId]);

  useEffect(() => {
    if (followers.length > 0 && following.length > 0) {
      const updatedFollowers = followers.map(follower => ({
        ...follower,
        isFollowing: following.some(f => f.id === follower.id)
      }));
      setFollowers(updatedFollowers);
    }
  }, [followers, following]);

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
      setFollowing([...following, followers.find(follower => follower.id === followerId)]);
      setFollowers(followers.map(follower => 
        follower.id === followerId ? { ...follower, isFollowing: true } : follower
      ));
      setFollowingCount(followingCount + 1);  // Incrementar el conteo de seguidos
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUnfollow = async (followingId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/unfollow`, {
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
      setFollowers(followers.map(follower => 
        follower.id === followingId ? { ...follower, isFollowing: false } : follower
      ));
      setFollowingCount(followingCount - 1);  // Decrementar el conteo de seguidos
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-12 px-12">
      <div className="flex justify-between mb-5">
        <button
          className={`text-black text-2xl font-bold ${showFollowers ? 'font-bold mb-4 text-black' : ''}`}
          onClick={() => setShowFollowers(true)}
        >
          {followersCount} FOLLOWERS
        </button>
        
        <button
          className={`text-white text-2xl font-bold ${!showFollowers ? 'font-bold mb-4 text-white' : ''}`}
          onClick={() => setShowFollowers(false)}
        >
          {followingCount} FOLLOWING
        </button>
      </div>

      {showFollowers ? (
        <>
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
                        <p className="text-gray-600">Universidad de Ingeniería y Tecnología, estudiante de la carrera de {follower.career}.</p>
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
        </>
      ) : (
        <>
          <hr className="border-white mb-4" />
          <div className="mt-20">
            <div className="bg-blue-100 p-8 rounded-lg shadow-lg">
              <ul>
                {following.map((follow, index) => (
                  <li key={index} className="flex items-center bg-white p-6 mb-6 rounded-lg shadow-md justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-500 rounded-full"></div>
                      <div>
                        <h3 className="text-xl font-bold">{follow.username}</h3>
                        <p className="text-gray-600">Universidad de Ingeniería y Tecnología, estudiante de la carrera de {follow.career}.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
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
        </>
      )}
    </div>
  );
};

export default Followers;