const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5006';

export const config = {
  apiUrl: apiUrl.replace(/\/$/, ''),
};

export default config;
