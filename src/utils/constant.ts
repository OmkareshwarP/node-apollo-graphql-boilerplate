import { IUser } from "../typeDefs.js";

export const usersData: IUser[] = []

export const isUsernameUnique = (userId: string, username: string): boolean => {
  return !usersData.some(user => user.username === username && user.userId !== userId);
}