import { IUser } from "../typeDefs.js";
import { generateAlphaNumericId, generateResponse, isUsernameUnique, usersData } from "../utils/index.js";

export const UserAPI = () => {
  return {
    async createUser(firstName: string, lastName: string) {
      try {
        const userId = generateAlphaNumericId(15);
        const fullName = firstName + ' ' + lastName;
        const username = fullName.replace(/\s+/g, '') + "_" + userId;
        if (!(username && isUsernameUnique(userId, username)))
          return generateResponse(
            true,
            'Username already exists. Please try again',
            400,
            'usernameAlreadyExists',
            null
          );
        usersData.push({ userId, firstName, lastName, fullName, username });
        return generateResponse(
          false,
          'User created successfully',
          200,
          '',
          { userId }
        );
      } catch (error) {
        throw (error)
      }
    },
    async updateUser(inputData: any) {
      try {
        const { userId, firstName, lastName, username } = inputData;
        const _updateData: Partial<IUser> = {
          ...(firstName && firstName.length > 0 && { firstName }),
          ...(lastName && lastName.length > 0 && { lastName }),
          ...(username && username.length > 0 && { username }),
        };
        if (_updateData.username && !isUsernameUnique(userId, _updateData.username))
          return generateResponse(
            true,
            'Username already exists. Please try with different username',
            400,
            'usernameAlreadyExists',
            null
          );
        const userIndex = usersData.findIndex(user => user.userId === userId);
        if (userIndex === -1)
          return generateResponse(
            true,
            'User does not exists.',
            404,
            'userNotFound',
            null
          );
        Object.assign(usersData[userIndex], _updateData);
        return generateResponse(
          false,
          'User updated successfully',
          200,
          '',
          null
        );
      } catch (error) {
        throw (error)
      }
    },
    async deleteUser(userId: string) {
      try {
        const userIndex = usersData.findIndex(user => user.userId === userId);
        if (userIndex === -1)
          return generateResponse(
            true,
            'User does not exists.',
            404,
            'userNotFound',
            null
          );
        usersData.splice(userIndex, 1);
        return generateResponse(
          false,
          'User deleted successfully',
          200,
          '',
          null
        );
      } catch (error) {
        throw (error)
      }
    },
    async getUserById(userId: string) {
      try {
        const user: IUser = usersData.find(user => user.userId === userId);
        if (!user)
          return generateResponse(
            true,
            'User does not exists.',
            404,
            'userNotFound',
            null
          );
        return generateResponse(
          false,
          'User fetched successfully',
          200,
          '',
          user
        );
      } catch (error) {
        throw (error)
      }
    },
    async getUserByUsername(username: string) {
      try {
        const user: IUser = usersData.find(user => user.username === username);
        if (!user)
          return generateResponse(
            true,
            'User does not exists.',
            404,
            'userNotFound',
            null
          );
        return generateResponse(
          false,
          'User fetched successfully',
          200,
          '',
          user
        );
      } catch (error) {
        throw (error)
      }
    },
  }
}