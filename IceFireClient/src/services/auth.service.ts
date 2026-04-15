import { User } from '../types/user';

const users: User[] = [];

export function registerUser(username: string, password: string): boolean {
  if (users.find(u => u.username === username)) return false;
  users.push({ username, password });
  return true;
}

export function validateUser(username: string, password: string): boolean {
  return !!users.find(u => u.username === username && u.password === password);
}