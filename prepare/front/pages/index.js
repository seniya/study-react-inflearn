import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost, loadPostsLoading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      // console.log('window.scrollY : ', window.scrollY);
      // console.log('document.documentElement.clientHeight : ', document.documentElement.clientHeight);
      // console.log('document.documentElement.scrollHeight : ', document.documentElement.scrollHeight);
      // console.log('hasMorePost : ', hasMorePost);
      // console.log('loadPostsLoading : ', loadPostsLoading);

      if (
        (window.scrollY + document.documentElement.clientHeight)
        > (document.documentElement.scrollHeight - 300)) {
        if (hasMorePost && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
            data: mainPosts[mainPosts.length - 1].id,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, hasMorePost, loadPostsLoading]);

  return (
    <AppLayout>
      { me && <PostForm /> }
      { mainPosts.map((post) => <PostCard key={post.id} post={post} />) }
    </AppLayout>
  );
};

export default Home;
