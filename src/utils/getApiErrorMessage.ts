import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit/react';

const getApiErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
  if ('status' in error) {
    return (
      (error.data instanceof Object && 'message' in error.data && `${error.data.message}`) ||
      ('error' in error && error.error) ||
      `Ошибка: ${error.status}`
    );
  }

  return error.message ? `${error.name}: ${error.message}` : 'Неизвестная ошибка';
};

export default getApiErrorMessage;
