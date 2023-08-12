import config from '@/config.js'

export const get = async (url) => {
	const res = await uni.request({
		url: config.BASE_URL + url
	})
	return res.data
}