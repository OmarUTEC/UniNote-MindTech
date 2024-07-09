import React, { useState } from 'react';
import Followers from './followers';
import Network from '../../Network';

const ParentComponent = ({ userId }) => {
  const [followingCount, setFollowingCount] = useState(0);

  return (
    <div>
      <Followers userId={userId} setFollowingCount={setFollowingCount} />
      <Network userId={userId} followingCount={followingCount} />
    </div>
  );
};

export default ParentComponent;
