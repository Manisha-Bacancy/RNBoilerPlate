import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import PostsRedux from './reducer_actions';
import PostsRenderItem from './components/PostsRenderItem';
import {Headers} from '../../components/';
import I18n from '../../I18n';

interface IProps {
  navigation: any;
}
declare global {
  interface Console {
    tron: any;
  }
}
export const Home: React.FC<IProps> = props => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch(); // useDispatch is work same like mapDispatchToProps method for dispatching event To redux
  const state = useSelector((state: any) => {
    // useSelector is work same like mapStateToProps for getting state variable from redux
    return {
      postsDataRes: state.posts.postsDataRes,
      postsResError: state.posts.postsResError,
    };
  });

  const fetchPostsList = () => {
    dispatch(PostsRedux.postsRequest());
  };
  //use effect perform side effect in functional component
  // use effect is a replacement of componentDidMount,componentDidUpadte and componentWillUnMount method of class
  useEffect(() => {
    setLoading(true);
    fetchPostsList();
  }, []);

  useEffect(() => {
    if (state.postsDataRes != null) {
      console.tron.log(
        '🚀 ~ file: index.tsx ~ line 43 ~ useEffect ~ postsDataRes',
        state.postsDataRes,
      );
      setLoading(false);
      setPosts(state.postsDataRes);
    } else if (state.postsResError != null) {
      setLoading(false);
    }
  }, [state]);
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Headers title={I18n.t('home.title')} navigation={props.navigation} />
        {loading ? (
          <View style={styles.indicatorContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={styles.postListContainer}>
            <FlatList
              data={posts}
              renderItem={({item, index}) => (
                <PostsRenderItem item={item} index={index} />
              )}
              extraData={posts}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
      <SafeAreaView style={styles.safeAreaBottomeContainer} />
    </SafeAreaView>
  );
};
