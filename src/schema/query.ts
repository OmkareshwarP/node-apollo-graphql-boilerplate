import { extendType, nonNull, stringArg } from "nexus";
import { generateResponse, logError, usersData } from "../utils/index.js";

export const Queries = extendType({
  type: 'Query',
  definition(t) {
    t.field('getAllUsers', {
      type: 'GetAllUsersResponse',
      async resolve() {
        try {
          return generateResponse(
            false,
            'User fetched successfully',
            200,
            '',
            usersData || []
          );
        } catch (error) {
          logError(
            error.message,
            'getAllUsersError',
            5,
            error
          );
          return generateResponse(
            true,
            `Something went wrong while getting users. We're working on it`,
            500,
            'getAllUsersError',
            null
          );
        }
      }
    });
    t.field('getUserById', {
      type: 'GetUserByIdResponse',
      args: {
        userId: nonNull(stringArg())
      },
      async resolve(_, { userId }, { dataSources }) {
        try {
          if (!userId)
            return generateResponse(
              true,
              'Something went wrong while validating your request',
              403,
              'inputParamsValidationFailed',
              null
            );
          const data = await dataSources.UserAPI().getUserById(userId);
          return data;
        } catch (error) {
          logError(
            error.message,
            'getUserByIdError',
            5,
            error
          );
          return generateResponse(
            true,
            `Something went wrong while getting user. We're working on it`,
            500,
            'getUserByIdError',
            null
          );
        }
      }
    });
    t.field('getUserByUsername', {
      type: 'GetUserByUsernameResponse',
      args: {
        username: nonNull(stringArg())
      },
      async resolve(_, { username }, { dataSources }) {
        try {
          if (!username)
            return generateResponse(
              true,
              'Something went wrong while validating your request',
              403,
              'inputParamsValidationFailed',
              null
            );
          const data = await dataSources.UserAPI().getUserByUsername(username);
          return data;
        } catch (error) {
          logError(
            error.message,
            'getUserByUsernameError',
            5,
            error
          );
          return generateResponse(
            true,
            `Something went wrong while getting user. We're working on it`,
            500,
            'getUserByUsernameError',
            null
          );
        }
      }
    });
  }
});