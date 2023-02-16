import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Switch from '@mui/material/Switch';
import CommentList from '../../components/CommentList';
import VideoPlayer from '../../components/VideoPlayer';
import * as actions from '../../redux/videos/videosActions';
import { VideoURL } from '../../contants';

function VideoScreen({ match, history }) {
  const videoId = match.params.id;
  console.log('videoId', videoId);
  const [toggle, setToggle] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const handleToggleChange = () => {
    setToggle(!toggle);
  };

  const dispatch = useDispatch();
  const { currentState } = useSelector(
    (state) => ({ currentState: state.videos }),
    shallowEqual,
  );
  const { itemForEdit, relatedVideos } = currentState;

  useEffect(() => {
    dispatch(actions.fetchVideos(''));
  }, [dispatch]);
  useEffect(() => {
    dispatch(actions.fetchVideo(videoId));
    setTimeout(() => {
      setIsMuted(false);
    }, 500);
  }, [dispatch, videoId]);
  useEffect(() => {
    dispatch(actions.fetchRelatedVideos(videoId));
  }, [dispatch, videoId]);

  const loading = false;
  const error = false;

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item></ListGroup.Item>
              </ListGroup>
              {itemForEdit && itemForEdit.url && (
                <>
                  <h5>Title: {itemForEdit.title}</h5>
                  <VideoPlayer
                    url={VideoURL + itemForEdit.url}
                    height='400px'
                    width='600px'
                    isPlaying={true}
                    isMuted={isMuted}
                  />{' '}
                </>
              )}

              {/* <Image src='images/alexa.jpg' alt={itemForEdit.title} fluid /> */}
              <div className='mt-5 col-10'>
                <label>
                  <span className='ml-2'>Show / Hide Comments</span>
                  <Switch onChange={handleToggleChange} checked={toggle} />
                </label>
                {toggle && <CommentList />}
              </div>
            </Col>

            <Col md={4}>
              <ListGroup variant='flush' className='mt-5'>
                <ListGroup.Item>
                  <h6>Related Videos</h6>
                </ListGroup.Item>
              </ListGroup>
              <div className='flex'>
                {relatedVideos && relatedVideos.length > 0 ? (
                  relatedVideos.map((video) => {
                    return (
                      <div key={video._id}>
                        <Link to={`/video/${video._id}`}>
                          <VideoPlayer
                            isLight='true'
                            height='200px'
                            width='300px'
                            url={VideoURL + video.url}
                          ></VideoPlayer>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <h5>No related video found</h5>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default VideoScreen;
