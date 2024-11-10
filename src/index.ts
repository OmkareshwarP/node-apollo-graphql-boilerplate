import { ApolloServer } from '@apollo/server';
import { GraphQLError } from 'graphql';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeSchema } from 'nexus';
import * as dotenv from 'dotenv';
import path from 'path';
import * as types from './schema/index.js';
import {
  logError,
  getDirname,
  logData,
} from './utils/index.js';
import { UserAPI } from './datasources/index.js';

dotenv.config({ path: '.env' });

if (process.env.SM) {
  process.env = { ...process.env, ...JSON.parse(process.env.SM) }
}


//  __dirname returns the absolute path, whereas the getDirname function in the given code returns the directory name relative to the current working directory
const __dirname = getDirname(import.meta.url);

const schema = makeSchema({
  types,
  sourceTypes: {
    modules: [
      {
        module: path.join(__dirname, 'typeDefs.ts'),
        alias: 't'
      }
    ]
  },
  contextType: {
    module: path.join(__dirname, 'context.ts'),
    export: 'Context'
  }
});

const port = process.env.PORT;
const GQL_INTROSPECTION_KEY = process.env.GQL_INTROSPECTION_KEY;
const server = new ApolloServer({
  schema,
  introspection: process.env.introspection === 'true',
  includeStacktraceInErrorResponses:
    process.env.includeStacktraceInErrorResponses === 'true',
  plugins: [
    {
      async requestDidStart(requestContext) {
        // Within this returned object, define functions that respond
        // to request-specific lifecycle events.
        return {
          async willSendResponse({ response, errors }) {
            for (const error of errors || []) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              logError(error.message, 'GraphQLError', 5, error, { response: response?.body?.singleResult?.data })
            }
          }
        };
      },
    },
  ],
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const isIntroSpectionQuery = req.body.operationName === 'IntrospectionQuery';
    if (isIntroSpectionQuery) {
      const introspectionKey = req.headers['gql-introspection-key'];
      if (!introspectionKey || introspectionKey !== GQL_INTROSPECTION_KEY) {
        throw new GraphQLError('Unauthorized introspection', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }
    }
    return {
      dataSources: {
        UserAPI
      },
    };
  },
  listen: { port: parseInt(port) }
});
logData(`🚀 Server listening at: ${url}`, 'serverStarted', 2, '');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('unhandledRejection', (reason: any) => {
  logError(
    'unhandledRejection',
    'unhandledRejection',
    9,
    reason
  );
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('uncaughtException', (reason: any) => {
  logError(
    'unhandledException',
    'unhandledException',
    9,
    reason
  );
});
