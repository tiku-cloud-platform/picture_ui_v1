import request from "@/utils/request"

export function menuList(params) {
	return request.get("menu/list", {
		params: params,
	}).then(res => {
		return res.data
	})
}
