import jwtDecode from 'jwt-decode';

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem('token');
    }
    return null;
};

export const removeToken = () => localStorage.removeItem('token');

export const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;

    try {
        const { exp } = jwtDecode(token);
        return exp * 1000 > Date.now();
    } catch {
        return false;
    }
};
