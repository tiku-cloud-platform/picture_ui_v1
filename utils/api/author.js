import request from "@/utils/request"

export function checkAuthorAvatar(params) {
	return request.get("author/is_update_avatar", 
		{params: params}
	).then(res => {
		return res.data
	})
}

export function publishWallPaper(params) {
	return request.post("author/publish_wall_paper", params).then(res => {
		return res.data
	})
}