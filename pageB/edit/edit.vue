<template>
	<view class="template-edit tn-safe-area-inset-bottom">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar fixed alpha customBack>
			<view slot="back" class='tn-custom-nav-bar__back' @click="goBack">
				<text class='icon tn-icon-left'></text>
				<text class='icon tn-icon-home-capsule-fill'></text>
			</view>
		</tn-nav-bar>

		<template v-if="show == 1">
			<view class="tn-safe-area-inset-bottom" :style="{paddingTop: vuex_custom_bar_height + 'px'}">

				<!-- 图片描述开始 -->
				<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top tn-margin">
					<view class="tn-flex justify-content-item">
						<view class="tn-bg-black tn-color-white tn-text-center"
							style="border-radius: 100rpx;margin-right: 8rpx;width: 45rpx;height: 45rpx;line-height: 45rpx;">
							<text class="tn-icon-topics" style="font-size: 30rpx;"></text>
						</view>
						<view class="tn-text-lg tn-padding-right-xs tn-text-bold">为该套壁纸写点什么呢 *</view>
					</view>
					<view class="justify-content-item tn-text-df tn-color-grey">
						<text class="tn-padding-xs">6-20字内</text>
						<text class="tn-icon-keyboard-circle"></text>
					</view>
				</view>

				<view class="tn-margin tn-bg-gray--light" style="border-radius: 10rpx;padding: 20rpx 30rpx;">
					<input placeholder="为该套壁纸 描述一个适合的名称吧" :value="imageText" name="input" @input="inputImageTitle"
						placeholder-style="color:#AAAAAA"></input>
				</view>
				<view class="tn-margin tn-bg-gray--light tn-padding" style="border-radius: 10rpx;">
					<textarea maxlength="30" placeholder="好的描述 有助于用户更方便的了解你的作品" @input="inputImageDesc"
						placeholder-style="color:#AAAAAA; width:100%;" style="height: 60rpx;"></textarea>
				</view>
				<!-- 图片描述结束 -->

				<!-- 图片积分开始 -->
				<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top tn-margin">
					<view class="tn-flex justify-content-item">
						<view class="tn-bg-black tn-color-white tn-text-center"
							style="border-radius: 100rpx;margin-right: 8rpx;width: 45rpx;height: 45rpx;line-height: 45rpx;">
							<text class="tn-icon-lucky-money" style="font-size: 30rpx;"></text>
						</view>
						<view class="tn-text-lg tn-padding-right-xs tn-text-bold">壁纸积分 *</view>
					</view>
					<view class="justify-content-item tn-text-df tn-color-grey">
						<text class="tn-padding-xs">保留2位小数(0表示免费)</text>
						<text class="tn-icon-lucky-money"></text>
					</view>
				</view>

				<view class="tn-margin tn-bg-gray--light" style="border-radius: 10rpx;padding: 20rpx 30rpx;">
					<input placeholder="为该套壁纸写点什么呢" type="digit" :value="imageScore" name="input" @input="inputImageScore"
						placeholder-style="color:#AAAAAA"></input>
				</view>
				<!-- 图片积分结束 -->

				<!-- 壁纸类型开始 -->
				<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top tn-margin">
					<view class="tn-flex justify-content-item">
						<view class="tn-bg-black tn-color-white tn-text-center"
							style="border-radius: 100rpx;margin-right: 8rpx;width: 45rpx;height: 45rpx;line-height: 45rpx;">
							<text class="tn-icon-ticket" style="font-size: 30rpx;"></text>
						</view>
						<view class="tn-text-lg tn-padding-right-xs tn-text-bold">设备类型 *</view>
					</view>
					<view class="justify-content-item tn-text-df tn-color-grey">
						<text class="tn-padding-xs">选择壁纸设备类型</text>
						<text class="tn-icon-ticket"></text>
					</view>
				</view>

				<view class="tn-margin tn-bg-gray--light" style="border-radius: 10rpx;padding: 20rpx 30rpx;">
					<!-- <input placeholder="为该套壁纸写点什么呢" type="number" :value="imageScore" name="input" @input="inputImageScore" placeholder-style="color:#AAAAAA"></input> -->
					<picker @change="bindPickerChange1" :value="imageDevie" :range="array1">
						<view class="tn-flex tn-flex-row-between">
							<view class="justify-content-item">
								<view class="tn-text-bold tn-text-lg">
									类型
								</view>
								<view class="tn-color-gray tn-padding-top-xs">
									{{array1[imageDevie]}}
								</view>
							</view>
							<view class="justify-content-item tn-text-lg tn-color-grey">
								<view class="tn-icon-right tn-padding-top"></view>
							</view>
						</view>
					</picker>
				</view>
				<!-- 壁纸类型结束 -->

				<!-- 图片上传开始 -->
				<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top-xl tn-margin">
					<view class="tn-flex justify-content-item">
						<view class="tn-bg-black tn-color-white tn-text-center"
							style="border-radius: 100rpx;margin-right: 8rpx;width: 45rpx;height: 45rpx;line-height: 45rpx;">
							<text class="tn-icon-image" style="font-size: 30rpx;"></text>
						</view>
						<view class="tn-text-lg tn-padding-right-xs tn-text-bold">发点什么图咧 *</view>
					</view>
					<view class="justify-content-item tn-text-df tn-color-grey">
						<text class="tn-padding-xs">可拖动排序哦</text>
						<text class="tn-icon-baby"></text>
					</view>
				</view>

				<view class="tn-margin-left tn-padding-top-xs">
					<tn-image-upload-drag ref="imageUpload" :action="action" :width="236" :height="236" :formData="formData"
						:fileList="fileList" :disabled="disabled" :autoUpload="autoUpload" :maxCount="maxCount" :header="header"
						:showUploadList="showUploadList" :showProgress="showProgress" :deleteable="deleteable"
						:customBtn="customBtn" @sort-list="onSortList" />
				</view>
				<!-- 图片上传结束 -->

				<!-- 壁纸系列开始 -->
				<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top-xl tn-margin">
					<view class="tn-flex justify-content-item">
						<view class="tn-bg-black tn-color-white tn-text-center"
							style="border-radius: 100rpx;margin-right: 8rpx;width: 45rpx;height: 45rpx;line-height: 45rpx;">
							<text class="tn-icon-tag" style="font-size: 30rpx;"></text>
						</view>
						<view class="tn-text-lg tn-padding-right-xs tn-text-bold">壁纸系列</view>
					</view>
					<view class="justify-content-item tn-text-df tn-color-grey">
						<text class="tn-padding-xs">单选哦</text>
						<text class="tn-icon-constellation"></text>
					</view>
				</view>

				<view class="tn-tag-content tn-margin tn-text-justify">
					<view v-for="(item, index) in categoryList" :key="index"
						class="tn-tag-content__item tn-margin-right tn-round tn-text-sm tn-text-bold"
						:class="[item.select ? `tn-bg-${item.color}--light tn-color-${item.color}` : 'tn-bg-gray--light tn-color-gray--dark']"
						@click="handleTagsClick(1, index)">
						<text :class="['tn-padding-right-xs tn-icon-' + item.icon]"></text> {{ item.title }}
					</view>
				</view>
				<!-- 壁纸系列结束 -->

				<!-- 壁纸标签开始 -->
				<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top-xl tn-margin">
					<view class="tn-flex justify-content-item">
						<view class="tn-bg-black tn-color-white tn-text-center"
							style="border-radius: 100rpx;margin-right: 8rpx;width: 45rpx;height: 45rpx;line-height: 45rpx;">
							<text class="tn-icon-ticket" style="font-size: 30rpx;"></text>
						</view>
						<view class="tn-text-lg tn-padding-right-xs tn-text-bold">壁纸标签</view>
					</view>
					<view class="justify-content-item tn-text-df tn-color-grey">
						<text class="tn-padding-xs">单选哦</text>
						<text class="tn-icon-constellation"></text>
					</view>
				</view>

				<view class="tn-tag-content tn-margin tn-text-justify">
					<view v-for="(item, index) in seriesList" :key="index"
						class="tn-tag-content__item tn-margin-right tn-round tn-text-sm tn-text-bold"
						:class="[item.select ? `tn-bg-${item.color}--light tn-color-${item.color}` : 'tn-bg-gray--light tn-color-gray--dark']"
						@click="handleTagsClick(2, index)">
						<text :class="['tn-padding-right-xs tn-icon-' + item.icon]"></text> {{ item.title }}
					</view>
				</view>
				<!-- 壁纸标签结束 -->

				<!-- 悬浮按钮-->
				<view class="tn-flex tn-footerfixed">
					<view class="tn-flex-1 justify-content-item tn-margin-sm tn-text-center">
						<tn-button backgroundColor="#3668fc" padding="40rpx 0" width="70%" fontBold @click="submit">
							<!-- <text class="tn-icon-light tn-padding-right-xs tn-color-black"></text> -->
							<text class="tn-color-white">发 布 壁 纸</text>
							<!-- <text class="tn-icon-camera tn-padding-left-xs tn-color-black"></text> -->
						</tn-button>
						<view class="tn-padding-xs tn-text-sm">
							<text class="tn-icon-tip-fill tn-color-gray tn-padding-right-xs"></text>
							<text class="tn-color-gray">日签 +20 积分</text>
						</view>
					</view>
				</view>

				<!-- 发布须知开始 -->
				<view class="author-setting" @click="atuhorPublish">
					<view class="">
						<text class="tn-icon-safe-fill" style="font-size: 50rpx;color: red;"></text>
					</view>
				</view>
				<!-- 发布须知结束 -->

			</view>
		</template>

		<view class='tn-tabbar-height'></view>

	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	import {
		checkAuthorAvatar,
		publishWallPaper
	} from "@/utils/api/author.js"
	import {
		configState
	} from "@/utils/api/sys.js"
	import {
		imageCategoryAll,
		imageSeriesAll,
	} from "@/utils/api/image.js"
	export default {
		name: 'TemplateEdit',
		mixins: [template_page_mixin],
		data() {
			return {
				array1: ['手机壁纸', '电脑壁纸', '平板壁纸'],
				categoryList: [],
				seriesList: [],
				action: getApp().globalData.baseUrl + "file/author", //'https://www.hualigs.cn/api/upload',
				formData: {},
				header: {
					Authorization: 'Bearer ' + uni.getStorageSync("login"),
				},
				showUploadList: true,
				customBtn: true,
				autoUpload: true,
				showProgress: true,
				deleteable: true,
				customStyle: false,
				maxCount: 9,
				disabled: false,
				isUpdate: 0, // 是否更新了用户头像信息
				show: 2,
				// 表单数据
				imageText: "", // 图片专辑名称
				imageDesc: "", // 图片专辑描述
				fileList: [], // 相册图片集合
				imageScore: 0.00, // 图片积分
				imageCategoryUid: "", // 图片分类
				imageSeriesUid: "", // 图片标签
				imageDevie: 0, // 图片设备类型
			}
		},
		onLoad() {},
		onShow() {
			this.checkAuthorAvatar()
			this.getImageCategory()
			this.getImageSeries()
			this.getSysState()
		},
		methods: {
			getSysState () {
				configState({key: "wechat_mini_state"}).then(res => {
					this.show = res.val
				})
			},
			bindPickerChange1(e) {
				this.imageDevie = e.detail.value
			},
			// 获取壁纸分类
			getImageCategory() {
				imageCategoryAll({}).then(res => {
					this.categoryList = res
				})
			},
			// 发布须知
			atuhorPublish() {
				uni.navigateTo({
					url: "/pageA/about/about?uid=493050725513824825"
				})
			},
			// 获取壁纸系列
			getImageSeries() {
				imageSeriesAll({}).then(res => {
					this.seriesList = res
				})
			},
			// 作者是否更新过头像和昵称
			checkAuthorAvatar() {
				checkAuthorAvatar().then(res => {
					this.isUpdate = res.is_update
					if (res.is_update < 1) {
						uni.showModal({
							title: '操作提示',
							content: res.msg,
							confirmText: "立即修改",
							cancelText: "暂不修改",
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: "/pageA/set/set"
									})
								}
							}
						});
					}
				})
			},
			// 处理标签点击事件
			handleTagsClick(type, index) {
				if (type == 1) {
					this.imageCategoryUid = this.categoryList[index].uid
					// 清除所有已选中的标签
					for (var i = 0; i < this.categoryList.length; i++) {
						this.categoryList[i].select = false
					}
					this.categoryList[index].select = !this.categoryList[index].select
					return
				}
				if (type == 2) {
					this.imageSeriesUid = this.seriesList[index].uid
					// 清除已选中的所有标签
					for (var i = 0; i < this.seriesList.length; i++) {
						this.seriesList[i].select = false
					}
					this.seriesList[index].select = !this.seriesList[index].select
				}
			},
			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				})
			},
			// 图片专辑名称
			inputImageTitle(e) {
				this.imageText = e.detail.value
			},
			inputImageDesc(e) {
				this.imageDesc = e.detail.value
			},
			// 图片积分
			inputImageScore(e) {
				this.imageScore = e.detail.value
			},
			// 提交表单
			submit() {
				if (this.isUpdate > 0) {
					let files = [];
					let fileList = this.$refs.imageUpload.lists
					for (let i = 0; i < fileList.length; i++) {
						files[i] = fileList[i].data.response.data.url
					}
					if (files.length < 1) {
						this.$func.showToast("图片不能为空")
						return
					}
					if (this.imageText == "" || this.imageText.length < 6 || this.imageText.length > 20) {
						this.$func.showToast("名称6-20个字符")
						return
					}
					if (this.imageCategoryUid == "") {
						this.$func.showToast("选择一个壁纸系列吧")
						return
					}
					if (this.imageSeriesUid == "") {
						this.$func.showToast("选择一个壁纸标签吧")
						return
					}
					if (this.imageDesc == "") {
						this.$func.showToast("写点描述吧")
						return
					}
					let postParams = {
						image_title: this.imageText,
						image_list: JSON.stringify(files),
						image_device: this.imageDevie,
						image_score: this.imageScore,
						image_desc: this.imageDesc,
						image_series_uid: this.imageSeriesUid,
						image_category_uid: this.imageCategoryUid,
					}
					uni.showLoading({
						title: '提交中',
						mask: true
					})
					publishWallPaper(postParams).then(res => {
						if (res.code == 0) {
							this.$refs.imageUpload.clear(),
								uni.hideLoading()
							this.$func.showToast(res.msg)
							this.$func.msgSubscribe("LAw9ieqnjjvKhTA8q8_kuL-stSYtTSA6qA_JW5YDFf4")
						} else {
							this.$func.showToast(res.msg)
						}
					})
				} else {
					this.checkAuthorAvatar()
				}
			},
			// 图片拖拽重新排序
			onSortList(list) {
				console.log(list);
			},
		}
	}
</script>

<style lang="scss" scoped>
	// 发布须知开始
	.author-setting {
		position: fixed;
		right: 20rpx;
		bottom: 300rpx;
		text-align: center;
	}

	// 发布须知结束
	.template-edit {}

	/* 胶囊*/
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

	/* 底部悬浮按钮 start*/
	.tn-tabbar-height {
		min-height: 180rpx;
		height: calc(220rpx + env(safe-area-inset-bottom) / 2);
		height: calc(220rpx + constant(safe-area-inset-bottom));
	}

	.tn-footerfixed {
		position: fixed;
		width: 100%;
		bottom: calc(30rpx + env(safe-area-inset-bottom));
		z-index: 1024;
		box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0);

	}

	/* 底部悬浮按钮 end*/

	/* 标签内容 start*/
	.tn-tag-content {
		&__item {
			display: inline-block;
			line-height: 45rpx;
			padding: 10rpx 30rpx;
			margin: 20rpx 20rpx 5rpx 0rpx;

			&--prefix {
				padding-right: 10rpx;
			}
		}
	}

	/* 标签内容 end*/
</style>