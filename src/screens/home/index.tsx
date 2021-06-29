import React, {useEffect, useState, useRef} from 'react';
import {View, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import PostsRedux from './reducer_actions';
import PostsRenderItem from './components/PostsRenderItem';
import {Headers, TextInputView} from '../../components/';
import I18n from '../../I18n';
import Loader from '../../components/loaders/loader';

interface IProps {
  navigation: any;
}
declare global {
  interface Console {
    tron: any;
  }
}
export const Home: React.FC<IProps> = props => {
  const [isLoading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [search, setSearch] = useState('');
  const searchRef = useRef(null);

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
      setLoading(false);
      setPosts(state.postsDataRes);
      setFullData(state.postsDataRes);
    } else if (state.postsResError != null) {
      setLoading(false);
    }
  }, [state]);
  //Search view--Done't remove code
  // const onSearchTextChange = (value: string) => {
  //   let text = value.toLowerCase();

  //   let filteredName: any = fullData.filter(item => {
  //     return item.title.toLowerCase().match(text);
  //   });

  //   if (!text || text === '') {
  //     setPosts(posts);
  //     setSearch('');
  //   } else if (!Array.isArray(filteredName) && !filteredName.length) {
  //     // set no data flag to true so as to render flatlist conditionally
  //   } else if (Array.isArray(filteredName)) {
  //     setPosts(filteredName);
  //     setSearch(value);
  //   }
  // };
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Headers
          title={I18n.t('home.title')}
          navigation={props.navigation}
          leftButtonType={'menu'}
          leftIcon={'md-menu'}
          rightIcon={'notifications-outline'}
          badge1Count={1}
          rightAction={() => props.navigation.navigate('Notification')}
          leftAction={() => props.navigation.openDrawer()}
        />

        <View style={styles.postListContainer}>
          {/* Search view don't remove code */}
          {/* <TextInputView
            icon={'search'}
            refProp={searchRef}
            placeholder={I18n.t('home.search')}
            onChangeText={text => {
              onSearchTextChange(text);
            }}
            numberOfLines={1}
            onSubmitEditing={() => onSearchTextChange(search)}
            returnKeyType={'search'}
            value={search}
            textInputContainerStyle={styles.textInputContainerStyle}
            iconStyles={styles.iconStyle}
            errorMessage={''}
          /> */}
          <FlatList
            data={posts}
            renderItem={({item, index}) => (
              <PostsRenderItem item={item} index={index} />
            )}
            style={{flex: 1}}
            extraData={posts}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <Loader loading={isLoading} />
      <SafeAreaView style={styles.safeAreaBottomeContainer} />
    </SafeAreaView>
  );
};
