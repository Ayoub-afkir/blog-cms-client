import {
  useEffect,
  useState,
} from 'react';

import api from '../api/axios';

interface User {
  id: number;
  name: string;
  email: string;
  // add other user fields
}

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/user")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { user, loading };
}
