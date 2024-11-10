import { customAlphabet } from 'nanoid';

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const generateAlphaNumericId = (length: number) => {
  const nanoid = customAlphabet(alphabet, length);
  const generatedNanoid = nanoid();

  return generatedNanoid;
};
