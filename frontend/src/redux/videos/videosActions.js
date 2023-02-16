import * as requestFromVideo from './videosCrud';
import { videosSlice, callTypes } from './videosSlice';

const { actions } = videosSlice;

export const fetchVideos = (keyword) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromVideo
    .fetchVideos(keyword)
    .then((response) => {
      const { data } = response;

      console.log('video items', data);
      const { videos, page, pages } = data;
      dispatch(actions.videosFetched({ videos, page, pages }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find course videos";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRelatedVideos = (id) => (dispatch) => {
  // console.log('relatedVideosFetched action', id);
  // dispatch(actions.relatedVideosFetched({ id }));
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromVideo
    .fetchRelatedVideos(id)
    .then((response) => {
      const { data } = response;

      console.log('video items', data);
      const { videos } = data;
      dispatch(actions.relatedVideosFetched({ videos }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find course videos";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchVideo = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.videoFetched({ courseVideoForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromVideo
    .fetchVideo(id)
    .then((response) => {
      const item = response.data;
      console.log('response', item);
      dispatch(actions.videoFetched(item));
    })
    .catch((error) => {
      error.clientMessage = "Can't find course";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteVideo = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromVideo
    .deleteVideo(id)
    .then((response) => {
      console.log('course is deleted', id);
      dispatch(actions.videoDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete course video";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const addVideo = (videoForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromVideo
    .addVideo(videoForCreation)
    .then((response) => {
      const { data } = response;
      dispatch(actions.videoAdded({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't add video";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const selectVideo = (item) => (dispatch) => {
  console.log('selected Video ', item);
  dispatch(actions.videoSelected({ item }));
};

export const addComment = (item) => (dispatch) => {
  console.log('comment added ', item);
  dispatch(actions.commentAdded({ item }));
};

export const handleDialog = (open) => (dispatch) => {
  dispatch(actions.handleDialog(open));
};
export const handleDialogEditForm = (open) => (dispatch) => {
  dispatch(actions.handleDialogEditForm(open));
};
