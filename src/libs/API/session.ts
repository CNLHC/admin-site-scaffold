import Axios from 'axios';
import { AuthPost } from '../auth/method';

export const logout = async () => {
  return AuthPost('/api/logout')
};
