import { extendType, nonNull, nullable, stringArg } from "nexus";
import { generateResponse, logError } from "../utils/index.js";

export const PostMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: 'CreateUserResponse',
      args: {
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
      },
      async resolve(_, { firstName, lastName }, { dataSources }) {
        try {
          const data = await dataSources.UserAPI().createUser(firstName, lastName);
          return data;
        } catch (error) {
          logError(
            error.message,
            'createUserError',
            5,
            error
          );
          return generateResponse(
            true,
            `Something went wrong while creating users. We're working on it`,
            500,
            'createUserError',
            null
          );
        }
      }
    });
    t.field('updateUser', {
      type: 'GenericResponse',
      args: {
        userId: nonNull(stringArg()),
        firstName: nullable(stringArg()),
        lastName: nullable(stringArg()),
        username: nullable(stringArg()),
      },
      async resolve(_, { userId, firstName, lastName, username }, { dataSources }) {
        try {
          if ((!firstName && !lastName && !username) || !userId)
            return generateResponse(
              true,
              'Something went wrong while validating your request',
              403,
              'inputParamsValidationFailed',
              null
            );
          const data = await dataSources.UserAPI().updateUser({ userId, firstName, lastName, username });
          return data;
        } catch (error) {
          logError(
            error.message,
            'updateUserError',
            5,
            error
          );
          return generateResponse(
            true,
            `Something went wrong while updating users. We're working on it`,
            500,
            'updateUserError',
            null
          );
        }
      }
    });
    t.field('deleteUser', {
      type: 'GenericResponse',
      args: {
        userId: nonNull(stringArg()),
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
          const data = await dataSources.UserAPI().deleteUser(userId);
          return data;
        } catch (error) {
          logError(
            error.message,
            'deleteUserError',
            5,
            error
          );
          return generateResponse(
            true,
            `Something went wrong while deleting users. We're working on it`,
            500,
            'deleteUserError',
            null
          );
        }
      }
    });
  }
});