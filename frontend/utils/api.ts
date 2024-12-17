import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
});

// 型定義
interface User {
  id: number;
  name: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get('/users');
  return data;
};

export const fetchUserById = async (id: number): Promise<User> => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};
