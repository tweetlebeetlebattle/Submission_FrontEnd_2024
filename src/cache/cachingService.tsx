import { AuthInfo } from '../types/types';

const CachingService = {
  storeAuthInfo(authInfo: AuthInfo) {
    localStorage.setItem('authInfo', JSON.stringify(authInfo));
  },

  loadAuthInfo() {
    const authInfoString = localStorage.getItem('authInfo');
    return authInfoString ? JSON.parse(authInfoString) : null;
  },

  removeAuthInfo() {
    localStorage.removeItem('authInfo');
  },
};

export default CachingService;
