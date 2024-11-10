/* eslint-disable @typescript-eslint/no-explicit-any */
import pino from 'pino';
import { getCurrentTime } from './timeUtil.js';

interface LogErrorData {
  timeStamp: number;
  errorMessage: string;
  errorCodeForClient: string;
  errorOrigin: string;
  errorLevel: number;
  errorStack: any;
  inputParams?: any;
}

interface LogData {
  timeStamp: number;
  logMessage: string;
  logCodeForServer: string;
  logOrigin: string;
  logLevel: number;
  logData: any;
}

const logger = pino({
  level: 'info'
});

const logError = (
  errorMessage: string,
  errorCodeForClient: string,
  errorLevel: number,
  error: any,
  inputParams?: any
) => {
  const timeStamp = getCurrentTime();
  const errorOrigin: string = process.env.SERVICE_NAME;
  const loggerData: LogErrorData = {
    timeStamp,
    errorMessage,
    errorCodeForClient,
    errorOrigin,
    errorLevel,
    errorStack: error.stack,
    inputParams
  };
  logger.error(loggerData);
};

const logData = (
  logMessage: string,
  logCodeForServer: string,
  logLevel: number,
  logData: any
) => {
  const timeStamp = getCurrentTime();
  const logOrigin: string = process.env.SERVICE_NAME;
  const loggerData: LogData = {
    timeStamp,
    logMessage,
    logCodeForServer,
    logOrigin,
    logLevel,
    logData
  };
  logger.info(loggerData);
};

export { logError, logData };
