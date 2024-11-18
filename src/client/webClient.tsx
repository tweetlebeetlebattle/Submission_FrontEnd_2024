import axios, { Method, AxiosError } from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL as string;

export const post = async (
  path: string,
  body: Record<string, any>,
  authorization?: string
) => {
  return performRequest('POST', path, body, 'application/json', authorization);
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
  body?: Record<string, any>,
  contentType?: string,
  authorization?: string
): Promise<any> => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  if (authorization) {
    headers['Authorization'] = `Bearer ${authorization}`;
  }

  console.log(BASE_URL);

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
      console.error(
        `Request failed with status: ${status}, message: ${data.message}`
      );
      throw new ServerException({
        status,
        message: data.message,
        title: data.title,
      });
    } else {
      console.error('An unexpected error occurred', error);
      throw new Error('An unexpected error occurred');
    }
  }
};
