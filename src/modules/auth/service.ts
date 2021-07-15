import axios from '../../api/axios';

export const endpoints = {
  login: 'user/login',
  posts: 'posts',
};

/**
 * API login with email and password
 * @param email
 * @param password
 * @returns {Promise<unknown>}
 */
export const loginWithEmail = (data: any) => axios.post(endpoints.login, data);

export const getPosts = () => axios.get(endpoints.posts);
