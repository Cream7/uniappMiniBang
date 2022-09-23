<template>
	<view class="container">
	  <navbar :navbarData="navbarData"></navbar>
	  <view class="body">
	    <block v-for="(item,index) in list" :key="item.companyCode">
	      <view class="flex flex-align-center flex-justify-between site-list">
	        <view class="flex flex-align-center site-show">
	          <view class="site-info">
	            <view class="site-name">{{item.companyName?item.companyName:'暂未设置名称'}}</view>
	            <view class="site-address">{{item.companyAddress?item.companyAddress:'暂未设置地址'}}</view>
	          </view>
	        </view>
	        <view class="info-show">
	          <view class="site-navigation" @click="toNavigation(index)">导航</view>
	          <view class="site-distance">
	            {{utils.getDistance(latitude,longitude,item.lat,item.lng)}}
	          </view>
	        </view>
	      </view>
	    </block>
	  </view>
	</view>
</template>
<script module="utils" lang="wxs" src="../../common/wxs/index.wxs"></script>

<script>
	export default {
		data() {
			return {
				list: [], //磅点列表
				latitude: "", //纬度
			    longitude: "", //经度
				companyName:"",
			    navbarData: {
			      title: "附近磅站",
			      showCapsule: 1,
			      search: {
			        type: 0,
			        label: "磅点名称"
			      }
				}
			}
		},
		onLoad(options){
			this.latitude = options.latitude;
			this.longitude = options.longitude;
			this.init();
		},
		onPullDownRefresh() {
		    this.companyName = '';
		    uni.showNavigationBarLoading();
		    this.init();
		    uni.stopPullDownRefresh();
		    uni.hideNavigationBarLoading();
		},
		methods: {
			init() {
				const params = { companyName : this.companyName };
				this.$api.getCompanyInfoList().then((res) => {
				    this.list = res.rows;
				});
			},
			toNavigation(index) {
			    const list = this.list;
			    if(list[index].lat && list[index].lng){
			      uni.openLocation({
			        latitude: parseFloat(list[index].lat),
			        longitude: parseFloat(list[index].lng),
			        name: list[index].companyName,
			        address: list[index].companyAddress,
			        scale: 18
			      });
			    }else{
					uni.showToast({
					  	icon:'none',
					  	title:"暂无该磅点位置信息"
					});
				};
			}
		},
	}
</script>

<style lang="scss">
	page {
	  background-color: #E1E6EC;
	  background-image:
	    linear-gradient(-180deg, #E1E6EC 2%, #F0F4F7 96%),
	    radial-gradient(at 50% 100%, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.5) 200%);
	  background-blend-mode: normal, color-burn;
	}
	
	.search {
	  padding-right: 0 !important;
	}
	
	.body {
	  padding: 10rpx 24rpx;
	}
	
	.site-list {
	  margin-top: 20rpx;
	  border-radius: 8rpx;
	  padding: 16rpx 18rpx;
	  background-color: #fff;
	}
	
	.site-list:nth-child(1) {
	  margin-top: 10rpx !important;
	}
	
	.site-show {
	  flex: 1;
	  overflow: hidden;
	  margin-right: 12rpx;
	}
	
	.site-info {
	  flex: 1;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	}
	
	.site-name {
	  font-size: 34rpx;
	  font-weight: bold;
	  overflow: hidden;
	  white-space: nowrap;
	  text-overflow: ellipsis;
	}
	
	.site-address {
	  font-size: 28rpx;
	  overflow: hidden;
	  margin-top: 20rpx;
	  white-space: nowrap;
	  text-overflow: ellipsis;
	  color: $grey-color;
	}
	
	.site-navigation {
	  color: #fff;
	  display: inline;
	  font-size: 26rpx;
	  padding: 8rpx 24rpx;
	  border-radius: 12rpx;
	  background-color: $theme-color;
	}
	.info-show{
	  text-align: right;
	}
	.site-distance {
	  font-size: 26rpx;
	  margin-top: 24rpx;
	  text-align: center;
	}
</style>