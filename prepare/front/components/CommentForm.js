import { Button, Form, Input } from 'antd'
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';

const CommentForm = ({ post }) => {
  
  const id = useSelector((state) => state.user.me?.id)
  const [commentText, setCommentText] = useState('')
  const onSubmitComment = useCallback(() => {
    console.log('user id : ', id)
    console.log('post.id : ', post.id)
    console.log(commentText);
  }, [commentText]);

  const onChangeCommentText = useCallback((e) => {
    console.log('onChangeCommentText e : ', e.target.value)
    setCommentText(e.target.value);
  }, []);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0, zIndex: 1 }}>
        <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
        <Button style={{ position: 'absolute', right: 0, bottom: -40 }} type="primary" htmlType="submit">삐약</Button>
      </Form.Item>
      {/* <Form.Item style={{ position: 'relative', margin: 0 }}></Form.Item> */}
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm