import request from "@/utils/request"

export function uploadImage(fileUrl) {
	return request.upload('file/upload', {
		fileType: "image",
		name: "file",
		filePath: fileUrl,
	}).then(res => {
		return res
	})
}