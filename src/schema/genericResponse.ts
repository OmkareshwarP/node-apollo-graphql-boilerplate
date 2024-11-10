import { objectType } from 'nexus';

export const GenericResponse = objectType({
  name: 'GenericResponse',
  definition(t) {
    t.nonNull.boolean('error');
    t.nonNull.string('message');
    t.nonNull.int('statusCode');
    t.nonNull.string('errorCodeForClient');
    t.string('data');
  }
});
