<template>
  <view class="tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#FFFFFF">
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left-arrow'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center ">
        <text class="tn-text-bold tn-text-xl tn-color-black">积分明细</text>
      </view>
    </tn-nav-bar>
    
    
    <view class="" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-padding-bottom-lg">
        <view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding" v-for="(item,index) in scoreHistory" :key="index" >
          <view class="justify-content-item">
            <view class="tn-color-gray--dark tn-text-lg">
             {{item.title}}
            </view>
            <view class="tn-color-gray tn-padding-top-xs">
              {{item.in_time}}
            </view>
          </view>
          <view class="justify-content-item tn-text-xl tn-padding-top">
            <view class="tn-color-orange" v-if="item.type == 2"> {{`-` + item.score}} </view>
            <view class="tn-color-blue" v-if="item.type == 1"> {{`+` + item.score}} </view>
          </view>
        </view>
      
      </view>
    </view>
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	import { userScoreHistoryList } from "@/utils/api/user.js"
  export default {
    name: 'TemplateIntegral',
    mixins: [template_page_mixin],
    data(){
      return {
        scoreHistory: [],
				searchWhere: {
					page: 1,
					size: 20,
				},
      }
    },
		onLoad() {
		},
		onShow() {
			this.getScoreHistory()
		},
    methods: {
      getScoreHistory() {
				userScoreHistoryList(this.searchWhere).then(res => {
					if (res.items.length > 0) {
						this.scoreHistory.push(...res.items)
					} else {
						this.$func.showToast("无更多积分记录")
					}
					this.searchWhere.page = res.page + 1
				})
			}
    },
		onReachBottom() {
			this.getScoreHistory()
		}
  }
</script>

<style lang="scss" scoped>
  /* 胶囊*/
  .tn-custom-nav-bar__back {
    width: 60%;
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
    
  }
  
  /* 间隔线 start*/
  .tn-strip-bottom-min {
    width: 100%;
    border-bottom: 1rpx solid #F8F9FB;
  }
  
  .tn-strip-bottom {
   width: 100%;
   border-bottom: 20rpx solid rgba(241, 241, 241, 0.8);
  }
   /* 间隔线 end*/
</style>
