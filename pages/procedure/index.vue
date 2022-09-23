<template>
	<view class="container">
	  <navbar :navbarData="navbarData"></navbar>
	  <view class="body">
	    <view class="show">
	      <view class="info">司机上磅</view>
	      <view class="arrow">
	        <image class="show-img" src="/static/img/arrow.png" />
	      </view>
	      <view class="info">司机停稳，扫二维码登录小程序</view>
	      <view class="arrow">
	        <image class="show-img" src="/static/img/arrow.png" />
	      </view>
	      <view class="info show-info" @longpress="showImg(1)">小程序上提交车号，货名，收发货单位，规格，过磅次数等其它信息
	        <text>*长按显示图片</text>
	      </view>
	      <view class="arrow">
	        <image class="show-img" src="/static/img/arrow.png" />
	      </view>
	      <view class="info show-info" @longpress="showImg(2)">小程序页面显示重量尾数，待重量稳定，"立即支付"按钮由暗变亮，司机微信支付
	        <text>*长按显示图片</text>
	      </view>
	      <view class="arrow">
	        <image class="show-img" src="/static/img/arrow.png" />
	      </view>
	      <view class="info show-info" @longpress="showImg(3)">支付完成后，点击完成返回小程序，小程序显示称重结果，司机选择是否打印纸质磅单
	        <text>*长按显示图片</text>
	      </view>
	      <view class="arrow">
	        <image class="show-img" src="/static/img/arrow.png" />
	      </view>
	      <view class="info">司机开车下磅</view>
	      <view class="arrow">
	        <image class="show-img" src="/static/img/arrow.png" />
	      </view>
	      <view class="info">司机查看历史支付记录</view>
	      <view class="arrow">
	        <image class="show-img" src="/static/img/arrow.png" />
	      </view>
	      <view class="info end">结束</view>
	    </view>
	  </view>
	  <uni-popup ref="popup" background-color="#fff">
	  	<view class="wrapper">
	  		<image :src="src" class="page-img"></image>
	  	</view>
	  </uni-popup>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				src:"",
				navbarData: {
			      title: "过磅流程指南"
				}
			}
		},
		methods:{
			showImg(index) {
			    this.src = `/static/img/show_img${index}.png`;
				this.$refs.popup.open('center');
			}
		}
	}
</script>

<style lang="scss">
	.container {
	  padding-bottom: 40rpx;
	  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
	}
	.body {
	  padding-top: 40rpx;
	}
	.active {
	  border: 1rpx solid $theme-color !important;
	  box-shadow: 6rpx 6rpx 8rpx rgba(48, 199, 236, 0.4);
	}
	.show {
	  flex: 1;
	  margin: 20rpx 16% 0 16%;
	}
	.show-info {
	  background-color: #fff;
	}
	.show-info text{
	  color: red;
	  display: block;
	  font-size: 22rpx;
	  margin-top: 14rpx;
	}
	.arrow {
	  padding: 0 24rpx;
	  text-align: center;
	}
	.show-img{
		width: 48rpx;
		height: 128rpx;
	}
	.info {
	  font-size: 26rpx;
	  text-align: center;
	  border-radius: 10rpx;
	  padding: 24rpx 24rpx;
	  border: 1rpx solid rgba(153, 153, 153, 0.4);
	}
	.end {
	  border-radius: 50rpx;
	}
	button::after {
	  border: none;
	}
	
	.page-img {
	  width: 100%;
	  height: 100%;
	}
	
	.wrapper {
	  width: 70vw;
	  height: 70vh;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}

</style>