import request from "@/utils/request"

export function configState(params) {
	return request.get("config/state", {
		params: params,
	}).then(res => {
		return res.data
	})
}