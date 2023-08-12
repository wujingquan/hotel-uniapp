<template>
	<u-list @scrolltolower="scrolltolower">
		<u-list-item v-for="(item, index) in list" :key="index">
			<u-cell :title="item.citys" @click="selectCity(item.citys)">
			</u-cell>
		</u-list-item>
	</u-list>
</template>

<script>
	import * as http from '@/lib/http.js'
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			this.getData()
		},
		methods: {
			async getData() {
				const res = await http.get('/api/city/index')
				if (res.code !== 0) return
				this.list = res.data
			},
			selectCity(item) {
				uni.navigateBack()
				uni.$emit('selectedCity', item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}
</style>