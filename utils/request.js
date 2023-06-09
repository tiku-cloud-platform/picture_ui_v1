import Request from "luch-request"

let baseUrl = "后端api地址"
const http = new Request({
	baseURL: baseUrl,
	timeout: 5000,
	responseType: "application/json",
})
http.interceptors.request.use((config) => {
	config.header = {
		Authorization: 'Bearer ' + uni.getStorageSync("login"),
	}
	return config
})
http.interceptors.response.use((response) => {
	return response.data
}, (response) => {
	if (response.statusCode === 200 && response.code === 101) {
		uni.showToast({
			title: response.data.msg || '请求失败',
			icon: "none",
			duration: 3000,
		})
	}
	if (response.statusCode === 500) {
		uni.showToast({
			title: response.data.msg || '服务器错误',
			icon: "none",
			duration: 3000,
		})
	} else if (response.statusCode === 400) {
		uni.showToast({
			title: response.data.msg,
			icon: "none",
			duration: 3000,
		})
	} else if (response.statusCode === 404) {
		uni.showToast({
			title: response.data.msg,
			icon: "none",
			duration: 3000,
		})
	} else if (response.statusCode === 422) {
		uni.showToast({
			title: response.data.msg,
			icon: "none",
			duration: 3000,
		})
	} else if (response.statusCode === 401) {
		uni.navigateTo({
			url: '/pageA/login/login'
		})
	} else if (response.statusCode === 403) {
		uni.showToast({
			title: response.data.msg,
			icon: "none",
			duration: 3000,
		})
	} else if (response.errMsg === "request:fail timeout") {
		uni.showToast({
			title: "网络请求超时",
			icon: "none",
			duration: 3000,
		})
	} else {
		console.log(response)
		uni.showToast({
			title: response.errMsg,
			icon: "none",
			duration: 3000,
		})
	}
})
export default http
