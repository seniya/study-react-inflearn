import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { Card, Form, Input, Button, Collapse, Select, Upload, InputNumber, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { RootState } from '../../store/configureStore';
import postModule from '../../store/modules/post';
import { IPostRequest } from '../../store/modules/post/post.interface';
import Editor from './components/blogEditor';
import { apiAddImage } from '../../store/modules/attachment/attachment.api';

const CATEGORY_ITEMS = [
  { id: 1, name: 'Blog' },
  { id: 2, name: 'Test' },
  { id: 3, name: 'Test1' },
  { id: 4, name: 'Test2' },
  { id: 5, name: 'Test3' },
];
const CATEGORY_NAMES = ['Blog', 'Test', 'Test1', 'Test2', 'Test3'];

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

  useEffect(() => {
    if (isDone) {
      message.success('성공적');
      // history.push('/blogs');
    }
    if (isSigninError) {
      message.error(isSigninError);
    }
    return () => {
      dispatch(postModule.actions.POST_RESET());
    };
  }, [isDone, isSigninError]);

  const imageUpload = async (file: File) => {
    const fdata = new FormData();
    fdata.append('title', 'editor_upload');
    fdata.append('file', file);
    try {
      const resData = await apiAddImage(fdata);
      if (resData.result.code !== 'RS0000') throw new Error(resData.result.message || 'error');
      return resData;
    } catch (error) {
      throw new Error(error || 'error');
    }
  };
  const onAddImageBlobHook_ = async (file: File) => {
    const resData = await imageUpload(file);
    const returnValue = {
      success: 1,
      file: { url: resData.data.download },
    };
    return new Promise((resolve) => {
      resolve(returnValue);
    });
  };

  const fetchPostData = async (values: any) => {
    const content = await editor.saver.save();
    const contentStr = JSON.stringify(content);

    const reqPostData: IPostRequest = {
      title: values.title,
      desc: values.desc,
      subject: values.subject || values.title,
      subjectTitle: values.subjectTitle || values.title,
      subjectOrder: values.subjectOrder || 1,
      content: contentStr,
      contentHtml: contentStr,
    };
    if (fileList.length > 0) {
      reqPostData.attachment = fileList[0].response.data;
    }
    if (categories.length > 0) {
      const categories_ = [];

      for (let i = 0; i < categories.length; i++) {
        const cateName = categories[i];
        const item = _.find(CATEGORY_ITEMS, { name: cateName });
        if (item !== undefined) {
          categories_.push(item);
        }
      }
      reqPostData.categories = categories_;
    } else {
      reqPostData.categories = [CATEGORY_ITEMS[0]];
    }
    dispatch(postModule.actions.ADD_POST_REQUEST(reqPostData));
  };

  const onFinish = (values: any) => {
    console.log('onFinish Success:', values);
    fetchPostData(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error(errorInfo);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const [fileList, updateFileList] = useState<any[]>([]);

  const uploadUrl = `${
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_API_URL_DEV
      : process.env.REACT_APP_API_URL_PROD
  }/attachments/image`;
  const authorization = 'Bearer ' + localStorage.getItem('MALRANG_TOKEN') || '';
  const uploadProps = {
    name: 'file',
    action: uploadUrl,
    headers: {
      authorization: authorization,
    },
    accept: 'image/png, image/jpeg',
    onChange(info: any) {
      console.log('uploadProps 1 info.fileList : ', info.fileList);
      if (info.file.status !== 'uploading') {
        updateFileList(info.fileList.filter((file: any) => !!file.status));
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      console.log('uploadProps 2 fileList : ', fileList);
    },
  };

  const [categories, updateCategories] = useState<string[]>([]);
  const filteredOptions = CATEGORY_NAMES.filter((o) => !categories.includes(o));
  const handleChangeSelect = (selectedItems: string[]) => {
    updateCategories(selectedItems);
  };

  return (
    <>
      <Form
        {...formItemLayout}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Card
          title="블로그 작성"
          extra={<a href="#">Cancel</a>}
          style={{ width: '100%' }}
          actions={[
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>,
          ]}
        >
          <Form.Item
            label="제목 (Title)"
            name="title"
            rules={[{ required: true, message: 'Please input Title!' }]}
          >
            <Input placeholder="input Title" />
          </Form.Item>
          <Form.Item
            label="설명 (Desc)"
            name="desc"
            rules={[{ required: true, message: 'Please input desc!' }]}
          >
            <Input.TextArea placeholder="input Desc" autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>
          <Collapse ghost>
            <Collapse.Panel header="주제 그룹 (Subject)" key="1">
              <Form.Item label="주제 (Subject)" name="subject">
                <Input placeholder="input Subject. 미입력시 제목" />
              </Form.Item>
              <Form.Item label="소 제목 (Subject Title)" name="subjectTitle">
                <Input placeholder="input Subject Title" />
              </Form.Item>
              <Form.Item
                label="순번 (Subject Order)"
                name="subjectOrder"
                rules={[{ type: 'number', message: 'Please input type number!' }]}
                initialValue={1}
              >
                <InputNumber min={1} />
              </Form.Item>
            </Collapse.Panel>
            <Collapse.Panel header="추가 항목 (Extra Item)" key="2">
              <Form.Item label="카테고리 (Category)">
                <Select mode="multiple" style={{ width: '100%' }} onChange={handleChangeSelect}>
                  {filteredOptions.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="대표 이미지 (Image)">
                <Upload {...uploadProps} listType="picture" maxCount={1}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Collapse.Panel>
          </Collapse>
          ,
          <Card title="본문 (Content)" style={{ width: '100%' }}>
            <Editor onReadyEditor={onReadyEditor} onAddImageBlobHook={onAddImageBlobHook_} />
          </Card>
        </Card>
      </Form>
    </>
  );
}

export default BlogCreate;
