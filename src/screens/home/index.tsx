import React, {Fragment, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import NavigationService from '../../navigation/NavigationService';
import {useDispatch, useSelector} from 'react-redux';
import PostsRedux from '../../redux/reducersAndActions/PostsRedux';
import {smartScale} from '../../config/Metrics';
import PostsRenderItem from './components/PostsRenderItem';
import Headers from '../../components/headers/Header';
import I18n from '../../I18n';
import {IState, IProps} from '../../typescript/typeScriptDeclaration';

const Home: React.FC<IProps> = props => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state: IState) => {
    return {
      postsDataRes: state.posts.postsDataRes,
      postsResError: state.posts.postsResError,
    };
  });

  const fetchPostsList = () => {
    dispatch(PostsRedux.postsRequest());
  };
  useEffect(() => {
    setLoading(true);
    fetchPostsList();
  }, []);
  useEffect(() => {
    if (state.postsDataRes != null) {
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

export default Home;
