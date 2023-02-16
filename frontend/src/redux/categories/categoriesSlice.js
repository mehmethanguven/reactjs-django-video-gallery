import { createSlice } from '@reduxjs/toolkit'
const initialValues = {
	_id: '',
	name: '',
	nameTR:'',
	isActive: true
}

const initialCategoryState = {
	listLoading: false,
	listLoadingEnrolled: false,
	listLoadingGiven: false,
	actionsLoading: false,
	count: 0,
	ccategories: null,
	categories: null,
	itemForEdit: initialValues,
	lastError: null,
	pages: 0,
	page: 1,
	success: false,
	isEnrolled: false,
	isOpenDialog: false,
	isOpenDialogEditForm: false
}
export const callTypes = {
	list: 'list',
	action: 'action'
}

export const categoriesSlice = createSlice({
	name: 'categories',
	initialState: initialCategoryState,
	reducers: {
		catchError: (state, action) => {
			state.error = `${action.type}: ${action.payload.error}`
			if (action.payload.callType === callTypes.list) {
				state.listLoading = false
			} else {
				state.actionsLoading = false
			}
		},
		startCall: (state, action) => {
			state.error = null
			if (action.payload.callType === callTypes.list) {
				state.listLoading = true
			} else {
				state.actionsLoading = true
			}
		},

		categoryFetched: (state, action) => {
			state.actionsLoading = false
			state.courseForEdit = action.payload.courseForEdit
			state.error = null
		},

		categoriesFetched: (state, action) => {
			const { count, categories, page, pages } = action.payload
			state.listLoading = false
			state.error = null
			state.categories = categories
			state.count = count
			state.page = page
			state.pages = pages
		},
		categoryAdded: (state, action) => {
			state.listLoading = false
			state.actionsLoading = false
			state.error = null
			state.categories.push(action.payload.data)
			state.isOpenDialogEditForm = false
		},
		categoryUpdated: (state, action) => {
			state.error = null
			state.actionsLoading = false
			state.categories = state.categories.map((item) => {
				if (item._id === action.payload.item._id) {
					return action.payload.item
				}
				return item
			})
			state.itemForEdit = initialValues
			state.isOpenDialogEditForm = false
		},
		categoryDeleted: (state, action) => {
			state.error = null
			state.actionsLoading = false
			state.categories = state.categories.filter((el) => el._id !== action.payload.id)
			state.count = state.count - 1
		},
		categorySelected: (state, action) => {
			state.itemForEdit = action.payload.item
			state.isOpenDialogEditForm = true
		},
		handleDialog: (state, action) => {
			const { open } = action.payload
			state.isOpenDialog = open
			if (!open) {
				state.actionsLoading = false
			}
		},
		handleDialogEditForm: (state, action) => {
			const { open } = action.payload
			state.isOpenDialogEditForm = open
			if (!open) {
				state.actionsLoading = false
				state.itemForEdit = initialValues
			}
		}
	}
})
