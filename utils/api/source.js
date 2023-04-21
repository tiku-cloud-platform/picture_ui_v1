import request from "@/utils/request"

export function categoryList(params) {
	return request.get("source/category", {
		params: params,
	}).then(res => {
		return res.data
	})
}

export function itemList(params) {
	return request.get("source/item", {
		params: params,
	}).then(res => {
		return res.data
	})
}

export function item(params) {
	return request.get("source/detail", {
		params: params,
	}).then(res => {
		return res.data
	})
}