interface IProps {
  navigation: any;
  state: any;
}

declare global {
  interface Console {
    tron: any;
  }
}

interface IState {
  posts: {
    postsDataRes: any;
    postsResError: any;
  };
}
export {IProps, IState};
