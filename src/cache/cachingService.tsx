import { AuthInfo } from "../types/types";

const CachingService = {  // store data in the browser until the user clears it
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
  