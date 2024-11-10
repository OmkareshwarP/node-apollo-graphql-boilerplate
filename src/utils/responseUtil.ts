/* eslint-disable @typescript-eslint/no-explicit-any */
interface ResponseData {
  error: boolean;
  message: string;
  statusCode: number;
  errorCodeForClient: string;
  data: any;
}

const generateResponse = (
  error: boolean,
  message: string,
  statusCode: number,
  errorCodeForClient: string,
  data: any
) => {
  const responseData: ResponseData = {
    error,
    message,
    statusCode,
    errorCodeForClient,
    data
  };

  return responseData;
};
export { generateResponse };
