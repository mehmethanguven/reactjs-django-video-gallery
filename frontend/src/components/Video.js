import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { VideoURL } from '../contants';
import VideoPlayer from './VideoPlayer';

function Video({ video, isPlaying, isMuted }) {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/video/${video._id}`}>
        <VideoPlayer
          url={VideoURL + video.url}
          isLight='true'
          isPlaying={isPlaying}
          isMuted={isMuted}
        />
      </Link>

      <Card.Body>
        <Link to={{ pathname: `/video/${video._id}`, state: video }}>
          <Card.Title as='div'>
            <strong>{video.title}</strong>
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Video;
