import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import postModule from '../../store/modules/post';
import { useEffect, useState } from 'react';
import Viewer from './components/blogViewer';
import { Skeleton } from 'antd';

function BlogRead() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const postState = useSelector((store: RootState) => store.post.postReducer);
  const { post, isDoneReadPost } = postState;

  const fetchPost = (id: string) => {
    dispatch(postModule.actions.READ_POST_REQUEST(id));
  };

  useEffect(() => {
    fetchPost(id);
    return () => {
      dispatch(postModule.actions.READ_POST_RESET());
    };
  }, []);

  const [content, setContent] = useState<any>();

  useEffect(() => {
    if (isDoneReadPost) {
      const parseContent = JSON.parse(post?.content || '{}');
      setContent(parseContent);
    }
  }, [isDoneReadPost]);

  return (
    <>
      <Link to={`/blogs/update/${id}`}>수정</Link>
      {isDoneReadPost && content ? (
        <Viewer editorData={content} />
      ) : (
        // <Blocks
        //   data={content}
        //   config={defaultConfigs}
        //   renderers={{
        //     checklist: Checklist,
        //   }}
        // />
        <Skeleton active />
      )}
    </>
  );
}

export default BlogRead;
