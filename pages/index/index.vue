<template>
	<view class="content">
		<u-notice-bar :text="text1" style="width: 100%;"></u-notice-bar>
		
		<img src="" alt="">
		<u-swiper
			:list="list1"
></u-swiper>
		
		<view class="search-box">
			<view class="">
				<view class="city" @click="selectCity">
					<text>城市</text>
					<text>{{ city }}</text>
				</view>
				<view class="">
					日期
				</view>
				<view class="">
					
					<u-button type="success" text="查找酒店" @click="findHotel"></u-button>
				</view>
			</view>
		</view>
		
		<view class="hot-city">
			
		</view>
		<u-divider text="热门城市"></u-divider>
		<u-divider text="酒店推荐"></u-divider>
		
		<view class="recommend-hotel">
			<view v-for="item in hotel_system" class="image-box">
				<u--image :showLoading="true" :src="item.cover_img" width="100%" height="120px" @click="click"></u--image>
			</view>
		</view>
		
		<u-tabbar
			:value="value1"
			@change="change1"
			:fixed="true"
			:placeholder="false"
			:safeAreaInsetBottom="true"
		>
			<u-tabbar-item text="首页" icon="home" @click="click1" ></u-tabbar-item>
			<u-tabbar-item text="订单" icon="photo" @click="click1" ></u-tabbar-item>
			<u-tabbar-item text="店内服务" icon="play-right" @click="click1" ></u-tabbar-item>
			<u-tabbar-item text="我的" icon="account" @click="click1" ></u-tabbar-item>
		</u-tabbar>
		<u-modal :show="showModal" @confirm="showModal = false" title="提示" content="请先选择城市"></u-modal>
	</view>
</template>

<script>
	import * as http from '@/lib/http.js'
	import config from '@/config.js'
	export default {
		data() {
			return {
				value1: 0,
				title: 'Hello1',
				text1: '这是一段很长的文字，这是一段很长的文字，这是一段很长的文字，这是一段很长的文字，这是一段很长的文字',
				list: [{
						name: '选项一',
						subname: "选项一描述",
						color: '#ffaa7f',
						fontSize: '20'
					},
					{
						name: '选项二禁用',
						disabled: true
					},
					{
						name: '开启load加载', //开启后文字不显示
						loading: true
					}
				],
				show: false,
				city: '',
				showModal: false,
				list1: [],
				hotel_system: []
			}
		},
		onLoad() {
			uni.$on('selectedCity', (city) => {
				this.city = city
			})
			this.getData()
		},
		methods: {
			async getData() {
				const res = await http.get('/api/hotelIndex/index')
				if (res.code !== 0) return
				this.list1 = res.data.propaganda_img.map(item => item.image)
				this.hotel_system = res.data.hotel_system.map(item => {
					item.cover_img = config.BASE_URL + item.cover_img
					return item
				})
				console.log(this.hotel_system)
			},
			selectCity() {
				uni.navigateTo({
					url: '/pages/index/cityList'
				})
			},
			findHotel() {
				if (!this.city) {
					this.showModal = true
				}
			}
		}
	}
</script>

<style lang="scss">
.content {
	.search-box {
		background: red;
		margin: 20px;
		border-radius: 20px;
		overflow: hidden;
		padding-bottom: 20px;
		.city {
			background: #F2F2F2;
			height: 45px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		button {
			width: 80%;
			border-radius: 8px;
		}
	}
	.recommend-hotel {
		width: 100%;
		.image-box {
			height: 120px;
			margin: 0 auto;
			padding: 10px 20px;
		}
	}
}
</style>