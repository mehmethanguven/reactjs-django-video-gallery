import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Video from '../../components/Video'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import * as actions from '../../redux/videos/videosActions'
import { Button } from '@material-ui/core'
import { VideoEditDialog } from '../../components/dialogs/VideoEditDialog'
function HomeScreen() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const { currentState } = useSelector(
    (state) => ({ currentState: state.videos }),
    shallowEqual,
  )
  const {
    videos: items,
    listLoading,
    error,
    isOpenDialogEditForm,
  } = currentState

  useEffect(() => {
    dispatch(actions.fetchVideos(''))
  }, [dispatch])

  const handleOpenEditForm = () => {
    dispatch(actions.handleDialogEditForm({ open: true }))
  }
  return (
    <div>
      <VideoEditDialog open={isOpenDialogEditForm} />
      {listLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <Row>
            {items && items.length > 0 ? (
              items.map((video) => (
                <Col key={video._id} sm={12} md={6} lg={6} xl={6}>
                  <Video video={video} />
                </Col>
              ))
            ) : userInfo ? (
              <Row>
                <Col xs={12}>
                  <h5>No video found please upload one</h5>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleOpenEditForm}
                  >
                    NEW
                  </Button>
                </Col>
              </Row>
            ) : (
              <div className='mt-5 mx-auto'>
                <h5 className='mb-3'>No videos found.</h5>
                <p>You need to login and to add one</p>
              </div>
            )}
          </Row>
        </div>
      )}
    </div>
  )
}

export default HomeScreen
