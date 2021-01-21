import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../store/configureStore';
import postModule from '../../store/modules/post';
import { IPostRequest } from '../../store/modules/post/post.interface';

import Editor from './components/blogEditor';

function BlogCreate() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [editor, setEditor] = useState<any>();
  // let editor: any = null;

  const postState = useSelector((store: RootState) => store.post.postReducer);
  const { isLoading, isDone, error: isSigninError } = postState;

  const onReadyEditor = (editor_: any): void => {
    console.log('onReadyEditor_ data : ', editor_);
    setEditor(editor_);
  };

  useEffect(() => {
    return () => {
      setEditor(null);
    };
  }, []);

  const onClickBtnSaveData = async () => {
    if (editor !== undefined) {
      console.log('onClickBtnSaveData :', await editor.saver.save());
      const content = await editor.saver.save();
      console.log('onClickBtnSaveData contents.toString() :', JSON.stringify(content));
      saveData(JSON.stringify(content));
    }
  };

  const saveData = async (content: string) => {
    const reqPostData: IPostRequest = {
      title: 'newTitle',
      desc: 'newDesc',
      subject: 'newDesc',
      content,
      contentHtml: 'newDesc',
    };
    dispatch(postModule.actions.ADD_POST_REQUEST(reqPostData));
  };

  return (
    <div>
      블로그 작성
      <div>ddd</div>
      <div>
        <button type="button" onClick={onClickBtnSaveData}>
          saveData
        </button>
      </div>
      <Editor onReadyEditor={onReadyEditor} />
    </div>
  );
}

export default BlogCreate;
