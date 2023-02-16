import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({
  url,
  isLight = false,
  isPlaying = false,
  isMuted = true,
  height = '300px',
  width = '500px',
}) => (
  <div>
    <ReactPlayer
      style={{ pointerEvents: isLight ? 'none' : 'auto' }}
      url={url}
      height={height}
      width={width}
      controls={true}
      muted={isMuted}
      playing={isPlaying}
    />
  </div>
);

export default VideoPlayer;
