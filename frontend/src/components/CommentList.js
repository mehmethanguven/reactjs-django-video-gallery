import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { ListGroup, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as actions from '../redux/videos/videosActions';
import moment from 'moment';

import Message from './Message';

function CommentList() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { currentState } = useSelector(
    (state) => ({ currentState: state.videos }),
    shallowEqual,
  );
  const { itemForEdit, comments } = currentState;
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(comment, itemForEdit);
    const newComment = {
      id: uuid(),
      videoId: itemForEdit._id,
      comment: comment,
      createdAt: Date.now(),
    };
    setComment(e.target.value);
    console.log(newComment);
    dispatch(actions.addComment(newComment));
    setComment('');
  };

  return (
    <div>
      <ListGroup variant='flush' className='mt-2'>
        <ListGroup.Item>
          <h5>Comment List</h5>
        </ListGroup.Item>
      </ListGroup>
      {comments.length === 0 && <Message variant='info'>No Comments</Message>}

      <ListGroup variant='flush'>
        {comments
          .filter((item) => item.videoId === itemForEdit._id)
          .map((item) => (
            <ListGroup.Item key={item.id}>
              <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
                {item.comment}
              </p>
              <p>
                {moment
                  .utc(item.createdAt)
                  .local()
                  .startOf('seconds')
                  .fromNow()}
              </p>
            </ListGroup.Item>
          ))}

        <ListGroup.Item>
          <h4 className='mt-3'>Write a comment</h4>

          {userInfo ? (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='comment'>
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as='textarea'
                  row='5'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary'>
                Submit
              </Button>
            </Form>
          ) : (
            <Message variant='info'>
              Please <Link to='/login'>login</Link> to write a review
            </Message>
          )}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default CommentList;
