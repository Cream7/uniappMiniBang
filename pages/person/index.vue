<template>
	<view class="container">
		<navbar :navbarData="navbarData">
	    <view class="wrapper">
	      <view class="info flex flex-align-center">
	        <block v-if="userInfo.nickName">
	          <image class="head-img" :src="userInfo.avatarUrl" />
	          <view class="user-info" v-if="userInfo">
	            <view>{{userInfo.nickName}}</view>
	            <!-- <view class="user-tel" v-if="phone">{{phone}}</view>
				<button class="user-tel user-tel-btn" v-else open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">
					绑定手机号
				</button> -->
	          </view>
	        </block>
	        <block v-else>
	          <image class="head-img" src="/static/img/head_d.png" />
	          <view class="user-info">
	            <button class="user-tel user-tel-btn">
	              微信授权登录
	            </button>
	          </view>
	        </block>
	      </view>
	      <image class="gif-bottom" mode="scaleToFill" src="/static/img/wave.gif"></image>
	    </view>
	  </navbar>
	  <view class="body">
	    <view class="flex flex-wrap flex-justify-between">
	      <navigator class="tab-list" url="../index/index" hover-class="none">
	        <image class="icon-tab" src="/static/img/history.png" />
	        <view class="title">历史磅单</view>
	      </navigator>
	      <navigator class="tab-list" url="../order/index?type=2" hover-class="none">
	        <image class="icon-tab" src="/static/img/to_pay.png" />
	        <view class="title">支付记录</view>
	      </navigator>
	      <navigator class="tab-list" url="../common_set/index" hover-class="none">
	        <image class="icon-tab" src="/static/img/common.png" />
	        <view class="title">常用信息</view>
	      </navigator>
	    </view>
	    <button class="show-list feed flex flex-align-center" hover-class="btn-hover" open-type="feedback">
	      <image class="icon-tab" src="/static/img/feedback.png" />
	      <view class="flex flex-justify-between tabs">
	        <view>意见反馈</view>
			<uni-icons type="forward"></uni-icons>
	      </view>
	    </button>
	  </view>
	  <navigator url="../procedure/index" hover-class="none">
	    <view class="bottom">
	      <image src="/static/img/bottom.png" />
	    </view>
	  </navigator>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				navbarData: {
				  title: "个人中心"
				},
				userInfo:{}
			}
		}
	}
</script>
<style lang="scss">
	page{
		background-color: #E1E6EC;
	    background-image: 
	        linear-gradient(-180deg, #E1E6EC 2%, #F0F4F7 96%),
	        radial-gradient(at 50% 100%, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.5) 200%);
	    background-blend-mode: normal, color-burn;
	}
	/deep/ .head {
	  border-radius: 0 0 32rpx 32rpx;
	}
	.wrapper {
	  overflow: hidden;
	  position: relative;
	  border-radius: 0 0 32rpx 32rpx;
	  
	  .info {
	    z-index: 999;
	    padding: 20rpx 32rpx 32rpx 32rpx;
		
		.head-img{
			width: 160rpx;
			height: 160rpx;
		}
	  }
	}
	.user-info {
	  color: #fff;
	  margin-left: 32rpx;
	}
	
	.user-tel {
	  color: #fff;
	  font-size: 30rpx;
	  margin-top: 24rpx;
	}
	
	.user-tel-btn {
	  margin-top: 12rpx !important;
	  padding-left: 0rpx !important;
	  background-color: transparent !important;
	}
	.gif-bottom {
	  position: absolute;
	  bottom: 0;
	  left: 0;
	  z-index: 99;
	  height: 100rpx;
	  width: 100%;
	  mix-blend-mode: screen;
	}
	.body {
	  padding: 10rpx 32rpx 24rpx 32rpx;
	  
	  .tab-list {
	    width: 30%;
	    margin: 16rpx 0;
	    padding: 48rpx 0;
	    text-align: center;
	    border-radius: 12rpx;
	    background-color: #fff;
	    box-shadow: $box-shadow;
	  }
	}
	
	.icon-tab{
		width: 66rpx;
		height: 66rpx;
	}
	.title {
	  font-size: 24rpx;
	  margin-top: 12rpx;
	  letter-spacing: 2rpx;
	}
	button::after {
	  border: none;
	}
	.show-list {
	  margin-top: 20rpx;
	  padding: 20rpx 24rpx;
	  border-radius: 12rpx;
	  background-color: #fff;
	  box-shadow: $boc-shadow;
	  
	  .feed .icon-tab {
	    display: block;
	  }
	  .tabs {
	    flex: 1;
	    font-size: 26rpx;
	    margin-left: 20rpx;
	  }
	}
	
	.bottom{
	  width: 100%;
	  position: fixed;
	  bottom: 40rpx;
	  left: 0;
	  text-align: center;
	}
	.bottom image{
	  width: 88%;
	  height: 160rpx;
	}
</style>