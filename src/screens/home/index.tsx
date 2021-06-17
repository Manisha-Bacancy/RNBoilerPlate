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
interface Props {
  navigation: any;
}
const Home: React.FC<Props> = props => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => {
    return {
      postsDataRes: state.posts.postsDataRes,
      postsResError: state.posts.postsResError,
    };
  });

  const fetchPostsList = () => {
    dispatch(PostsRedux.postsRequest());
  };
  useEffect(() => {
    fetchPostsList();
  }, []);
  useEffect(() => {
    setLoading(true);
    if (state.postsDataRes != null) {
      setPosts(state.postsDataRes);
      setLoading(false);
    } else if (state.postsResError != null) {
      setLoading(false);
    }
  }, [state]);
  return (
    <Fragment>
      <SafeAreaView style={styles.safeAreaBottomeContainer} />
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <Headers title={I18n.t('home.title')} navigation={props.navigation} />
          {loading ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator />
            </View>
          ) : (
            <View style={{flex: 1, margin: smartScale(10)}}>
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
      </SafeAreaView>
    </Fragment>
  );
};

export default Home;
