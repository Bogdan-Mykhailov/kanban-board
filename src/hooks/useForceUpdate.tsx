import { useState } from 'react';

export const useForceUpdate = () => {
  const [, setForceUpdate] = useState(false);

  return () => setForceUpdate((prev) => !prev);
};
