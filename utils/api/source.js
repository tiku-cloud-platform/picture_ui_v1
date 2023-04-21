import request from "@/utils/request"

export function categoryList(params) {
	return request.get("source/category", {
		params: params,
	}).then(res => {
		return res.data
	})
}