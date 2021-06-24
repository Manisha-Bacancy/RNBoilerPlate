// @flow

const Routes = {
  UsersAPIRoute: 'user/',
  PostAPIRoute: 'posts',
};
export const APIStatus = {
  SUCCESS: 200,
  ERROR: 400,
  OTP_REQUEST: 402,
};

export const APIEndpoints = {
  //auth
  LOGIN: Routes.UsersAPIRoute + 'login',
  //post
  POSTS_LIST: Routes.PostAPIRoute,
};
