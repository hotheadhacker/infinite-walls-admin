import axios from 'axios'
import query from '@src/lib/services/query';
import mutation from '@src/lib/services/mutation';
// import { createBrowserHistory } from 'history'
import { getToken } from '../helpers/utility'

// const history = createBrowserHistory({ forceRefresh: true })

const webAPIHost = process.env.REACT_APP_WEB_API_HOST

function getAPIHeader () {
	const token = getToken()
	return {
		headers: {
			'authorization': token
		}
	}
}

// function unauthorizedHandleFn () {
// 	clearToken()
// 	history.push('/signin')
// }

const Api = {
	login: (data, cb) => {
		return axios.post(webAPIHost, { query: query.AUTH_USER, variables: data }, {})
		.then(response => {
			cb(null, response)
		}).catch((error) => {
			cb(error, null)
		})
	},
	getCategories: (data, cb) => {
		const options = getAPIHeader();
		return axios.post(webAPIHost, { query: query.GET_CATEGORIES, variables: data }, options)
		.then(response => {
			cb(null, response)
		}).catch((error) => {
			cb(error, null)
		})
	},
	addCategory: (data, cb) => {
		const options = getAPIHeader();
		return axios.post(webAPIHost, { query: mutation.ADD_CATEGORY, variables: data }, options)
		.then(response => {
			cb(null, response)
		}).catch((error) => {
			cb(error, null)
		})
	},
	editCategory: (data, cb) => {
		const options = getAPIHeader();
		return axios.post(webAPIHost, { query: mutation.EDIT_CATEGORY, variables: data }, options)
		.then(response => {
			cb(null, response)
		}).catch((error) => {
			cb(error, null)
		})
	},
	deleteCategory: (data, cb) => {
		const options = getAPIHeader();
		return axios.post(webAPIHost, { query: mutation.DELETE_CATEGORY, variables: data }, options)
		.then(response => {
			cb(null, response)
		}).catch((error) => {
			cb(error, null)
		})
	},
	getWallpapers: (data, cb) => {
		const options = getAPIHeader();
		return axios.post(webAPIHost, { query: query.GET_WALLPAPERS, variables: data }, options)
		.then(response => {
			cb(null, response)
		}).catch((error) => {
			cb(error, null)
		})
	},
	addWallpaper: (data, cb) => {
		const options = getAPIHeader();
		return axios.post(webAPIHost, { query: mutation.ADD_WALLPAPER, variables: data }, options)
		.then(response => {
			cb(null, response)
		}).catch((error) => {
			cb(error, null)
		})
	},
	editWallpaper: (data, cb) => {
		const options = getAPIHeader();
		return axios.post(webAPIHost, { query: mutation.EDIT_WALLPAPER, variables: data }, options)
		.then(response => {
			cb(null, response)
		}).catch((error) => {
			cb(error, null)
		})
	},
	deleteWallpaper: (data, cb) => {
		const options = getAPIHeader();
		return axios.post(webAPIHost, { query: mutation.DELETE_WALLPAPER, variables: data }, options)
		.then(response => {
			cb(null, response)
		}).catch((error) => {
			cb(error, null)
		})
	},
	getUsers: (data, cb) => {
		const options = getAPIHeader();
		return axios.post(webAPIHost, { query: query.GET_USERS, variables: data }, options)
		.then(response => {
			cb(null, response)
		}).catch((error) => {
			cb(error, null)
		})
	},
	
}

export default Api;
