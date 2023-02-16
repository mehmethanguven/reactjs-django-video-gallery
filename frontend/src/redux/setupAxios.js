export default function setupAxios(axios, store) {
	console.log('setupAxios called...');
	const {userLogin} = store.getState();
	console.log('user', userLogin);
	if (userLogin !== null) {
		axios.interceptors.request.use(
			(config) => {
				const {
					userLogin: {userInfo},
				} = store.getState();

				if (userInfo && userInfo.token) {
					config.headers.Authorization = `Bearer ${userInfo.token}`;
				}

				return config;
			},
			(err) => Promise.reject(err)
		);
	}
}
