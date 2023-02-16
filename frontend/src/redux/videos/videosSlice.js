import { createSlice } from '@reduxjs/toolkit';
const initialValues = {
  _id: null,
  title: '',
  url: '',
};

const initialVideoState = {
  listLoading: false,
  listLoadingEnrolled: false,
  listLoadingGiven: false,
  actionsLoading: false,
  count: 0,
  cvideos: null,
  videos: null,
  relatedVideos: null,
  itemForEdit: initialValues,
  lastError: null,
  pages: 0,
  page: 1,
  success: false,
  isEnrolled: false,
  isOpenDialog: false,
  isOpenDialogEditForm: false,
  error: '',
  errorCreate: false,
  successCreate: false,
  errorDelete: false,
  successDelete: false,
  comments: [],
};
export const callTypes = {
  list: 'list',
  action: 'action',
};

export const videosSlice = createSlice({
  name: 'videos',
  initialState: initialVideoState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },

    videoFetched: (state, action) => {
      state.actionsLoading = false;
      state.itemForEdit = action.payload;
      state.error = null;
    },

    videosFetched: (state, action) => {
      const { count, videos, page, pages } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.videos = videos;
      state.count = count;
      state.page = page;
      state.pages = pages;
    },
    relatedVideosFetched: (state, action) => {
      const { videos } = action.payload;
      //console.log('relatedVideosFetched', id);
      state.error = null;
      state.actionsLoading = false;
      state.relatedVideos = videos;
      // if (state.videos && state.videos.length > 0) {
      //   state.relatedVideos = state.videos.filter((el) => el._id === id);
      //   state.count = state.count - 1;
      // }
    },
    videoAdded: (state, action) => {
      state.listLoading = false;
      state.actionsLoading = false;
      state.error = null;
      state.videos.push(action.payload.data);
      state.isOpenDialogEditForm = false;
    },
    videoDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.videos = state.videos.filter((el) => el._id !== action.payload.id);
      state.count = state.count - 1;
    },

    videoSelected: (state, action) => {
      state.itemForEdit = action.payload.item;
      state.isOpenDialogEditForm = true;
    },
    commentAdded: (state, action) => {
      const { item } = action.payload;
      state.comments.push(item);
    },
    handleDialog: (state, action) => {
      const { open } = action.payload;
      state.isOpenDialog = open;
      if (!open) {
        state.actionsLoading = false;
      }
    },
    handleDialogEditForm: (state, action) => {
      const { open } = action.payload;
      state.isOpenDialogEditForm = open;
      if (!open) {
        state.actionsLoading = false;
        state.itemForEdit = initialValues;
      }
    },
  },
});
