import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import postModule from '../store/modules/post';

function About() {
  const dispatch = useDispatch();
  const postState = useSelector((store: RootState) => store.post.postReducer);
  const { posts } = postState;

  const fetchPosts = () => {
    dispatch(postModule.actions.GET_POSTS_REQUEST());
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div>어바웃</div>
      <div>
        {posts.map((post, index) => (
          <div key={index}>{post.title}</div>
        ))}
      </div>
    </>
  );
}

export default About;
