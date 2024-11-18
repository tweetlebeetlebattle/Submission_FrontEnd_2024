import { post } from './webClient';

const apiTerminal = {
  async register(username: string, email: string, password: string) {
    try {
      const response = await post('/api/Auth/register', {
        username,
        email,
        password,
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async login(email: string, password: string) {
    try {
      const response = await post('/api/Auth/login', {
        email,
        password,
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  },
};

export default apiTerminal;
