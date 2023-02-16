import axios from 'axios'
import { apiUrl } from '../constants'

export const CATEGORIES_URL = `${apiUrl}/categories`

export function fetchCategories(keyword = '') {
	console.log('categories fetched')
	return axios.get(`/api/categories${keyword}`)
}

export function fetchCategory(id) {
	return axios.get(`/api/categories/${id}`)
}

export function addCategory(item) {
	return axios.post(`/api/categories/create/`,item)
	// return axios.post(CATEGORIES_URL, item)
}

export function updateCategory(item) {
	return axios.put(`/api/categories/update/${item._id}/`,item)
	// return axios.put(`${CATEGORIES_URL}/${item._id}`, item)
}

export function deleteCategory(id) {
	return axios.delete(`/api/categories/delete/${id}/`)
	//return axios.delete(`${CATEGORIES_URL}/${categoryId}`)
}
