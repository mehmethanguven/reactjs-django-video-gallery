import * as requestFromServer from './categoriesCrud';
import {categoriesSlice, callTypes} from './categoriesSlice';

const {actions} = categoriesSlice;

export const fetchCategories = (keyword) => (dispatch) => {
	dispatch(actions.startCall({callType: callTypes.list}));
	return requestFromServer
		.fetchCategories(keyword)
		.then((response) => {
			const {data} = response;

			console.log('category items', data);
			const {categories, page, pages} = data;
			dispatch(actions.categoriesFetched({categories, page, pages}));
		})
		.catch((error) => {
			error.clientMessage = "Can't find category categories";
			dispatch(actions.catchError({error, callType: callTypes.list}));
		});
};

export const fetchCategory = (id) => (dispatch) => {
	if (!id) {
		return dispatch(
			actions.categoryFetched({categoryCategoryForEdit: undefined})
		);
	}

	dispatch(actions.startCall({callType: callTypes.action}));
	return requestFromServer
		.fetchCategory(id)
		.then((response) => {
			const category = response.data.item;
			dispatch(actions.categoryFetched({categoryForEdit: category}));
		})
		.catch((error) => {
			error.clientMessage = "Can't find category";
			dispatch(actions.catchError({error, callType: callTypes.action}));
		});
};

export const deleteCategory = (id) => (dispatch) => {
	dispatch(actions.startCall({callType: callTypes.action}));
	return requestFromServer
		.deleteCategory(id)
		.then((response) => {
			console.log('category is deleted', id);
			dispatch(actions.categoryDeleted({id}));
		})
		.catch((error) => {
			error.clientMessage = "Can't delete category category";
			dispatch(actions.catchError({error, callType: callTypes.action}));
		});
};

export const addCategory = (categoryForCreation) => (dispatch) => {
	dispatch(actions.startCall({callType: callTypes.action}));
	return requestFromServer
		.addCategory(categoryForCreation)
		.then((response) => {
			const {data} = response;
			dispatch(actions.categoryAdded({data}));
		})
		.catch((error) => {
			error.clientMessage = "Can't add category";
			dispatch(actions.catchError({error, callType: callTypes.action}));
		});
};

export const updateCategory = (item) => (dispatch) => {
	console.log('update category is called', item);
	dispatch(actions.startCall({callType: callTypes.action}));
	return requestFromServer
		.updateCategory(item)
		.then(() => {
			dispatch(actions.categoryUpdated({item}));
		})
		.catch((error) => {
			error.clientMessage = "Can't update category category";
			dispatch(actions.catchError({error, callType: callTypes.action}));
		});
};

export const selectCategory = (item) => (dispatch) => {
	dispatch(actions.categorySelected({item}));
};

export const handleDialog = (open) => (dispatch) => {
	dispatch(actions.handleDialog(open));
};
export const handleDialogEditForm = (open) => (dispatch) => {
	dispatch(actions.handleDialogEditForm(open));
};
