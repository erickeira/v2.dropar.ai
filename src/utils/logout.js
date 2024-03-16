import { setApiToken } from './api'
export const logout = () => {
    localStorage.removeItem('dropar_authtoken');
}