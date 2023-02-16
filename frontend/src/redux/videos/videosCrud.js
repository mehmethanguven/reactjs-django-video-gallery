import axios from 'axios';

export function fetchVideos(keyword = '') {
  console.log('videos fetched', keyword);
  return axios.get(`/api/videos${keyword}`);
}
export function fetchRelatedVideos(id) {
  console.log('videos fetched', id);
  return axios.get(`/api/videos/related/${id}`);
}

export function fetchVideo(id) {
  return axios.get(`/api/videos/${id}`);
}

export function addVideo(item) {
  return axios.post(`/api/videos/create/`, item);
}

export function deleteVideo(id) {
  return axios.delete(`/api/videos/delete/${id}/`);
}
