<template>
	<view class="page-b">

		<!-- 顶部自定义导航 -->
		<tn-nav-bar fixed alpha customBack>
		  <view slot="back" class='tn-custom-nav-bar__back'
		    @click="goBack">
		    <text class='icon tn-icon-left'></text>
		    <text class='icon tn-icon-home-capsule-fill'></text>
		  </view>
		</tn-nav-bar>

		<view class="tn-classify__wrap" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
			<!-- 搜索框 -->
			<view class="tn-search-fixed">
			  <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin" :style="{marginTop: 10 + 'px'}">
			    
			    <view class="justify-content-item align-content-item" style="width: 100vw;">
			      <view class="tn-flex tn-flex-col-center" style="border-radius: 100rpx;padding: 10rpx 20rpx 10rpx 20rpx;width: 95%;background-color: rgba(248, 247, 248, 0.9);">
			        <text class="tn-icon-search justify-content-item tn-padding-right-xs tn-color-gray tn-text-lg"></text>
			        <input class="justify-content-item" placeholder="想搜点什么咧" name="input" @input="searchInput" placeholder-style="color:#AAAAAA" style="width: 90%;"></input>
			      </view>
			    </view>
			    
			    <view class="align-content-item">
			      <view class="justify-content-item tn-text-center">
			        <tn-button backgroundColor="#3668fc" shape="round" padding="20rpx 20rpx" width="150rpx" @click="emoSearch">
			          <text class="tn-color-white">搜 索</text>
			        </tn-button>
			      </view>
			    </view>
			  </view>
			</view>
			<!-- 搜索框结束 -->

			<!-- 图片列表开始 -->
			<view class="emo-container">
				<template v-for="(item, index) in imageList">
					<view class="item-header" :index="index" @click="list(index)">
						<text class="item-title">{{ item.title }}</text>
						<text class="item-more-title">更多 ></text>
					</view>
					<view class="item-container" :index="index" @click="list(index)">
						<template v-for="(it ,ix) in (item.img)">
							<view class="item-image">
								<image :src="it.img_back" mode="scaleToFill" style="height: 100%;width: 100%;border-radius: 6rpx;"></image>
							</view>
						</template>
					</view>
				</template>
			</view>
			<!-- 图片列表结束 -->
		</view>
		
		<!-- 回到首页悬浮按钮-->
		<view v-if="showScropTop">
			<nav-index-button></nav-index-button>
		</view>
	</view>

</template>

<script>
	import { emoGroupList } from '@/utils/api/emo.js'
	import NavIndexButton from '@/libs/components/nav-index-button.vue'
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'EmoList',
		components: { NavIndexButton },
		mixins: [template_page_mixin],
		data() {
			return {
				imageList: [],
				searchWhere: {
					size: 20,
					title: "",
					page: 1,
				},
				showScropTop: false,
			}
		},
		onLoad() {
			console.log("onload执行")
			this.getEmoGroupList()
		},
		methods: {
			searchInput(e) {
				this.searchWhere.title = e.detail.value
			},
			emoSearch() {
				this.searchWhere.page = 1
				this.searchWhere.size = 20
				this.imageList = []
				console.log("搜索执行")
				this.getEmoGroupList()
			},
			getEmoGroupList(){
				uni.showLoading({
					title: "数据努力加载中"
				})
				emoGroupList(this.searchWhere).then(res => {
					uni.hideLoading()
					if (res.items.length < 1) {
						this.$func.showToast('暂无新数据')
						return
					}
					this.imageList.push(...res.items)
					this.searchWhere.page = res.page + 1
					this.searchWhere.size = res.size
				})
			},
			list(index) {
				uni.navigateTo({
					url: '/pageA/emo/detail?uid=' + this.imageList[index].uid
				})
			}
		},
		onReachBottom() {
			console.log("到达底部执行")
			this.getEmoGroupList()
		},
		onPageScroll(e) {
			if (e.scrollTop > 1000) {
				this.showScropTop = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tn-custom-nav-bar__back {
	  width: 100%;
	  height: 100%;
	  position: relative;
	  display: flex;
	  justify-content: space-evenly;
	  align-items: center;
	  box-sizing: border-box;
	  background-color: rgba(0, 0, 0, 0.15);
	  border-radius: 1000rpx;
	  border: 1rpx solid rgba(255, 255, 255, 0.5);
	  color: #FFFFFF;
	  font-size: 18px;
	  
	  .icon {
	    display: block;
	    flex: 1;
	    margin: auto;
	    text-align: center;
	  }
	  
	  &:before {
	    content: " ";
	    width: 1rpx;
	    height: 110%;
	    position: absolute;
	    top: 22.5%;
	    left: 0;
	    right: 0;
	    margin: auto;
	    transform: scale(0.5);
	    transform-origin: 0 0;
	    pointer-events: none;
	    box-sizing: border-box;
	    opacity: 0.7;
	    background-color: #FFFFFF;
	  }
	}
	.emo-container {
		margin: 8px 12px 0px 12px;
	}
	.item-container {
		display: flex;
		flex-direction: row;
		height: 160rpx;
		margin-bottom: 20rpx;
	}
	.item-header {
		height: 50rpx;
		line-height: 50rpx;
		margin-bottom: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.item-title {
		font-size: 30rpx;
		color: #000;
	}
	.item-more-title {
		font-size: 20rpx;
		color: gray;
	}
	.item-image:not(:first-child) {
		margin-left: 1%;
	}
	.item-image {
		width: 24%;
		height: 100%;
	}
	.page-b {
		max-height: 100vh;
	}

	/* 自定义导航栏内容 start */
	.custom-nav {
		height: 100%;

		&__back {
			margin: auto 30rpx;
			margin-right: 10rpx;
			flex-basis: 5%;
			width: 100rpx;
			position: absolute;
		}
	}


	.left-width {
		flex-basis: 28%;
	}

	/* 自定义导航栏内容 end */
	.tn-classify {

		/* 搜索栏 start */
		&__search {
			&--wrap {}

			&__box {
				flex: 1;
				text-align: center;
				padding: 20rpx 30rpx;
				margin: 0 30rpx;
				border-radius: 60rpx;
				font-size: 30rpx;
			}

			&__icon {
				padding-right: 10rpx;
			}

			&__text {
				padding-right: 10rpx;
			}
		}

		/* 搜索栏 end */
	}
</style>