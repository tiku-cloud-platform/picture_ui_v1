<template>
	<view class="components tn-safe-area-inset-bottom">
		<tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
		<view class="top-backgroup">
			<image src='https://tnuiimage.tnkjapp.com/index_bg/components_new.jpg' mode='widthFix' class='backgroud-image'>
			</image>
		</view>

		<block v-for="(item, index) in navList" :key="index">
			<view class="nav_title--wrap tn-margin-bottom-sm">
				<view class="nav_title tn-cool-bg-color-15">{{ item.title}}</view>
			</view>
			<view class='nav-list'>
				<block v-for="(content_item, content_index) in item.list" :key="content_index">
					<view hover-class='none' @click="clickMenu(content_index)"
						class="nav-list-item tn-shadow-blur tn-cool-bg-image tn-flex tn-flex-col-center tn-flex-row-between" :class="[
              getRandomCoolBg(content_index)
            ]">
						<view class="nav-link tn-flex-1">
							<view class='title'>{{ content_item.title }}</view>
						</view>
						<view class="icon">
							<view style="width: 100%; height: 100%;"><image :src="content_item.url + content_item.path" style="width: 100%; height: 100%;"></image></view>
						</view>
					</view>
				</block>
			</view>
		</block>

		<view class="tn-padding-bottom-xs"></view>

	</view>
</template>

<script>
	import { seriesList } from '@/utils/api/image'
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'ImageCategory',
		mixins: [template_page_mixin],
		data() {
			return {
				navList: [{
					title: '壁纸系列',
					backgroundColor: 'tn-cool-bg-color-1',
					list: []
				}]
			}
		},
		created() {
			this.getImageSeriesList()
		},
		methods: {
			clickMenu(index) {
				uni.navigateTo({
					url: '/pageB/wallpaper/wallpaper?params=' + JSON.stringify(this.navList[0].list[index])
				})
			},
			getImageSeriesList() {
				seriesList().then(res => {
					this.navList[0].list = res.items
				})
			},
			getRandomCoolBg() {
				let color = [
					'red',
					'purplered',
					'purple',
					'bluepurple',
					'aquablue',
					'blue',
					'indigo',
					'cyan',
					'teal',
					'green',
					'yellowgreen',
					'lime',
					'yellow',
					'orangeyellow',
					'orange',
					'orangered',
					'brown',
					'grey',
					'gray'
				]
				const index = Math.floor(Math.random() * color.length)
				const colorValue = color[index]
				return 'tn-bg' + '-' + colorValue
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
	/* 顶部背景图 start */
	.top-backgroup {
		height: 450rpx;
		z-index: -1;

		.backgroud-image {
			width: 100%;
			height: 667rpx;
		}
	}

	/* 顶部背景图 end */

	/* 标题start */
	.nav_title {
		-webkit-background-clip: text;
		color: transparent;

		&--wrap {
			position: relative;
			display: flex;
			height: 120rpx;
			font-size: 46rpx;
			align-items: center;
			justify-content: center;
			font-weight: bold;
			background-image: url(https://tnuiimage.tnkjapp.com/title_bg/title44.png);
			background-size: cover;
		}
	}

	/* 标题end */

	/* 组件导航列表 start*/
	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0rpx 12rpx 0rpx;
		justify-content: space-between;

		/* 列表元素 start */
		.nav-list-item {
			padding: 30rpx 30rpx 20rpx 30rpx;
			border-radius: 12rpx;
			width: 45%;
			margin: 0 18rpx 40rpx;
			background-size: cover;
			background-position: 50%;
			position: relative;
			z-index: 99;

			/* 元素标题 start */
			.nav-link {
				font-size: 32rpx;
				line-height: 1.2;
				text-transform: capitalize;
				padding: 0rpx 10rpx 0rpx 0;
				position: relative;

				.title {
					color: black;
					text-align: left;
				}
			}

			/* 元素标题 end */

			/* 元素图标 start */
			.icon {
				font-variant: small-caps;
				width: 70rpx;
				height: 70rpx;
				line-height: 70rpx;
				margin: 0;
				padding: 0;
				display: inline-flex;
				text-align: center;
				justify-content: center;
				vertical-align: middle;
				font-size: 45rpx;
				color: #FFFFFF;
				white-space: nowrap;
				opacity: 0.9;
				background-color: rgba(0, 0, 0, 0.05);
				background-size: cover;
				background-position: 50%;
				border-radius: 5000rpx;
			}

			/* 元素图标 end */
		}

		/* 列表元素 end */
	}

	/* 组件导航列表 end*/
</style>