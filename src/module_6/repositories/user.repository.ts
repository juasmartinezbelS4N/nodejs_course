import { User } from "../types";
import database from "../database";

export const getUsers = (): User[] => {
  return database.users;
};

export const getUser = (id: string): User | undefined => {
  return getUsers().find((user) => user.id == id)
};