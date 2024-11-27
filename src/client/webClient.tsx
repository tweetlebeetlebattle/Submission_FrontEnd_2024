import axios, { Method, AxiosError } from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL as string;

export const post = async (
  path: string,
  body: Record<string, any>,
  authorization?: string
) => {
  return performRequest('POST', path, body, 'application/json', authorization);
};

export const postFormData = async (
  path: string,
  body: FormData,
  authorization?: string
) => {
  return performRequest('POST', path, body, undefined, authorization);
};

export const fetch = async (path: string, authorization?: string) => {
  return performRequest('GET', path, undefined, undefined, authorization);
};

interface ServerExceptionProps {
  status: number;
  message: string;
  title?: string;
}

class ServerException extends Error {
  public status: number;
  public title?: string;

  constructor({ status, message, title }: ServerExceptionProps) {
    super(message);
    this.status = status;
    this.name = 'ServerException';
    this.title = title;
  }
}

const performRequest = async (
  method: Method,
  path: string,
  body?: Record<string, any> | FormData,
  contentType?: string,
  authorization?: string
): Promise<any> => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  if (contentType && !(body instanceof FormData)) {
    headers['Content-Type'] = contentType;
  }

  if (authorization) {
    headers['Authorization'] = `Bearer ${authorization}`;
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`Requesting ${method} ${BASE_URL}${path}`);
  }

  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${path}`,
      data: body,
      headers,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      const message = data?.message || 'An error occurred';
      const title = data?.title || 'Error';
      console.error(
        `Request failed with status: ${status}, message: ${message}`
      );
      throw new ServerException({ status, message, title });
    } else {
      console.error('An unexpected error occurred', error);
      throw new Error('An unexpected error occurred');
    }
  }
};
