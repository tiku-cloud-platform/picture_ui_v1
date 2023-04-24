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
			        <tn-button backgroundColor="#3668fc" shape="round" padding="20rpx 20rpx" width="150rpx" @tap="linkSearch">
			          <text class="tn-color-white">搜 索</text>
			        </tn-button>
			      </view>
			    </view>
			  </view>
			</view>
			<!-- 搜索框结束 -->

			<!-- 站点列表开始 -->
			<!-- 方式5，图片形式，安卓手机 start-->
			<view v-if="isAndroid" class="tn-flex tn-flex-wrap tn-padding-top home-shadow" style="padding-top: 0rpx;">
			 <block v-for="(item, index) in siteList" :key="index">
			  <view class="tn-margin-bottom tn-margin-top-sm" style="width: 25%;" @click="menuTn(index)">
			    <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
			      <view class="icon5__item--icon tn-flex tn-flex-row-center tn-flex-col-center" :style="'background-image:url('+ item.url + item.path +');background-size:100% 100%;background-size: cover;'">
			      </view>
			      <view class="tn-color-black tn-text-center">
			        <text class="tn-text-ellipsis">{{ item.title }}</text>
			      </view>
			    </view>
			  </view>
			 </block>
			</view>
			<!-- 方式5 end-->
			
			<!-- 方式5，图片形式，苹果手机 start-->
			<view v-else class="tn-flex tn-flex-wrap tn-padding-top home-shadow" style="padding-top: 0rpx;">
			 <block v-for="(item, index) in siteList" :key="index">
			  <view class="tn-margin-bottom tn-margin-top-sm" style="width: 25%;" @click="menuTn(index)">
			    <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
			      <view class="icon5__item--icon tn-flex tn-flex-row-center tn-flex-col-center" :style="'background-image:url('+ item.url + item.path +');background-size:100% 100%;background-size: cover;'">
			      </view>
			      <view class="tn-color-black tn-text-center">
			        <text class="tn-text-ellipsis">{{ item.title }}</text>
			      </view>
			    </view>
			  </view>
			 </block>
			</view>
			<!-- 方式5 end-->
			<!-- 站点列表结束 -->
		</view>
		
		<!-- 回到首页悬浮按钮-->
		<view v-if="showScropTop">
			<nav-index-button></nav-index-button>
		</view>
	</view>

</template>

<script>
	import { linkList } from '@/utils/api/source.js'
	import NavIndexButton from '@/libs/components/nav-index-button.vue'
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'SourceSiteList',
		components: { NavIndexButton },
		mixins: [template_page_mixin],
		data() {
			return {
				siteList: [],
				searchWhere: {
					size: 20,
					title: "",
					page: 1,
				},
				isAndroid: true,
				showScropTop: false,
			}
		},
		created() {
			const systemInfo = uni.getSystemInfoSync()
			if (systemInfo.system.toLocaleLowerCase().includes('ios')) {
			  this.isAndroid = false
			} else {
			  this.isAndroid = true
			}
			this.linkList()
		},
		methods: {
			searchInput(e) {
				this.searchWhere.title = e.detail.value
			},
			linkSearch() {
				this.searchWhere.page = 1
				this.searchWhere.size = 20
				this.linkList()
				this.siteList = []
			},
			menuTn(index) {
				let _that = this
				if (_that.siteList[index].type == 1) {
					uni.navigateToMiniProgram({
						appId: _that.siteList[index].app_id,
						path: _that.siteList[index].link_url,
					})
				} else {
					uni.setClipboardData({
						data: _that.siteList[index].link_url,
						success() {
							_that.$func.showToast('复制成功')
						}
					})
				}
			},
			linkList(){
				uni.showLoading({
					title: "数据努力加载中"
				})
				linkList(this.searchWhere).then(res => {
					uni.hideLoading()
					if (res.items.length < 1) {
						this.$func.showToast('暂无新数据')
						return
					}
					this.siteList.push(...res.items)
					this.searchWhere.page = res.page + 1
					this.searchWhere.size = res.size
				})
			},
		},
		onReachBottom() {
			this.linkList()
		},
		onPageScroll(e) {
			if (e.scrollTop > 1000) {
				this.showScropTop = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon5 {
	  &__item {
	    // width: 30%;
	    background-color: #FFFFFF;
	    border-radius: 10rpx;
	    padding: 0rpx;
	    margin: 0rpx;
	    transform: scale(1);
	    transition: transform 0.3s linear;
	    transform-origin: center center;
	    
	    &--icon {
	      width: 96rpx;
	      height: 96rpx;
	      border-radius: 50%;
	      margin-bottom: 18rpx;
	      position: relative;
	      z-index: 1;
	    }
	  }
	}
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