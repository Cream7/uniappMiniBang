<template>
	<view class="container">
	  <navbar :navbarData="navbarData"></navbar>
	  <map style="width: 100vw; height: 100vh;" :latitude="position.latitude" :longitude="position.longitude" show-location="true" :markers="marker" @callouttap='getSiteInfo' @markertap='getSiteInfo' @tap="setSiteInfo">
	   <cover-view class="nav">
	      <navigator :url="getUrl()" hover-class="none">
	        <cover-view>
	          <cover-view class="flex flex-justify-content">
	            <cover-image src="/static/img/nearby.png" class="imgs"></cover-image>
	          </cover-view>
	          <cover-view>地磅列表</cover-view>
	        </cover-view>
	      </navigator>
	      <cover-view class="nav-right hairline-top" @click="scanCode">
	        <cover-view class="flex flex-justify-content">
	          <cover-image src="/static/img/scanning.png" class="imgs"></cover-image>
	        </cover-view>
	        <cover-view>扫码过磅</cover-view>
	      </cover-view>
	      <cover-view class="nav-right hairline-top" @click="checkSting">
	        <cover-view class="flex flex-justify-content">
	          <cover-image src="/static/img/location_fixed.png" class="imgs"></cover-image>
	        </cover-view>
	        <cover-view>我的位置</cover-view>
	      </cover-view>
	    </cover-view>
	    <cover-view class="site-info">
	      <cover-view class="site-info-count flex flex-justify-between" :class="{hideSiteInfo:showSiteInfo}" >
	        <cover-view class="show-info">
	          <cover-view class="site-no">磅点名称：{{siteInfo.companyName}}</cover-view>
	          <cover-view class="address">{{siteInfo.companyAddress}}</cover-view>
	          <cover-view class="flex title">
	            磅点距离
	            <cover-view class="hairline-left distance">
	              {{utils.getDistance(position.latitude,position.longitude,siteInfo.lat,siteInfo.lng)}}
	            </cover-view>
	          </cover-view>
	        </cover-view>
	        <cover-view class="nav-position flex flex-align-center flex-justify-content" @click="toNavigation">
	          <cover-view>
	            <cover-view class="flex flex-align-center flex-justify-content">
	              <cover-image class="nav-img" src="/static/img/navigation.png"></cover-image>
	            </cover-view>
	            <cover-view>导航</cover-view>
	          </cover-view>
	        </cover-view>
	      </cover-view>
	    </cover-view>
	  </map>
	  <view class="user-info" @click="toPerson">
	      <image class="avatar" src="/static/img/avatar_frame.gif"></image>
	      <image class="head-img" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" mode="cover"></image>
	      <image class="head-img" v-else src="/static/img/head_d.png"></image>
	  </view>
	</view>
</template>
<script module="utils" lang="wxs" src="../../common/wxs/index.wxs"></script>
<script>
	export default{
		data(){
			return {
				list: [], //磅点列表
				marker: [], //标记点
			    siteInfo: {}, //选中磅点信息
			    userInfo: {}, //用户信息
			    showInfo: true,//显示用头像
			    showSiteInfo: 0, //显示磅点信息
			    position: {
			      latitude: "31.076562", //纬度
			      longitude: "121.518135", //经度
			    }, //位置信息
			    navbarData: {
			      showCapsule: 0,
			      title: "迷你公磅"
			    }
			}
		},
		onLoad() {
			// #ifndef H5
			this.userInfo = uni.getStorageSync("userInfo") || {}
			// #endif
			this.init();
		},
		onShow() {
			// #ifdef H5
			this.getLocation();
			// #endif
			// #ifndef H5
			this.checkSting();
			// #endif
		},
		methods:{
			init(){
				this.$api.getCompanyInfoList().then((res) => {
					let list = res?.rows ?? [];
					if (list.length == 0) return;
					list = list.filter(item => {
						return item.lat != null && item.lng != null;
					});
					this.marker = list.length > 0 ? list.map((item, index) => {
					    return {
					        id: index,
					        latitude: item.lat,
					        longitude: item.lng,
					        iconPath: '/static/img/seat_default.png',
					        width: 32,
					        height: 32,
					        callout: {
					            content: item.companyName,
					            color: "#ffffff",
					            fontSize: 12,
					            borderRadius: 4,
					            bgColor: "#30c7ec",
					            padding: 5,
					            display: "ALWAYS",
					            textAlign: "center"
					        }
					    }
					}) : [];
					this.list = list;
				})
			},
			getUserProfile() {
			    uni.getUserProfile({
			      desc: '展示用户信息',
			      success: (res) => {
			        uni.setStorageSync('userInfo', res.userInfo);
			        this.userInfo = res.userInfo;
			        uni.navigateTo({
			          url: '../person/index',
			        });
			      }
			    })
			},
			toPerson() {
			    const userInfo = this.userInfo;
				// #ifdef H5
				uni.navigateTo({
				  url: '../person/index',
				});
				// #endif
				// #ifdef MP-WEIXIN
				Object.keys(userInfo).length > 1 ? uni.navigateTo({
				  url: '../person/index',
				}) : this.getUserProfile();
				// #endif
			},
			getUrl(){
				  return `../site_list/index?latitude=${this.position.latitude}&longitude=${this.position.longitude}`;
			},
			scanCode() {
				// #ifdef H5
				uni.showToast({
				  	icon:'none',
				  	title:"暂不支持扫码功能"
				});
				// #endif
				// #ifndef H5
				uni.scanCode({
				  	onlyFromCamera: true,
					success(res) {
						res?.path ? wx.navigateTo({
							url: `/${res.path}`,
						}) : uni.showToast({
							icon:'none',
							title:"二维码识别错误",
						});
				    },
				    fail(err) {
						uni.showToast({
							icon:'none',
							title:"二维码识别错误"
						});
			        }
				});
				// #endif
			},
			getSiteInfo(e) {
			    const markerId = e.detail.markerId;
			    const id = this.siteInfo?.id ?? Number;
			    if (id == markerId) return;
			    const index = this.list.findIndex((item, index) => {
			      return markerId == index;
			    });
				if(index > -1){
					this.showSiteInfo = 1;
					this.siteInfo = this.list[index];
				};
			},
			setSiteInfo(){
				this.showSiteInfo = 0;
			},
			checkSting() {
			    uni.getSetting({
					success: (res) => {
						if(res.authSetting["scope.userLocation"] == false){
							uni.showModal({
								title: '获取位置信息失败',
								content: '检测到您未开启地理位置授权，无法获取附近地磅信息，是否前往权限管理页面进行授权',
								success: function (res) {
									if (res.confirm) {
										uni.openSetting();
									} 
								}
							});
						}else{
							this.getLocation();
						};
					}
			    });
			},
			getLocation() {
				const that = this;
			    uni.getLocation({
			      type: "gcj02",
			      altitude: true,
			      success(res) {
			        that.position.latitude = res.latitude;
			        that.position.longitude = res.longitude;
			      },
			      fail(err) {
					uni.showModal({
						showCancel:false,
						title: '获取位置信息失败',
						content: '请检查手机是否开启定位权限，请开启定位权限后再次刷新页面',
					});
			      }
			    })
			},
			toNavigation() {
			    const siteInfo = this.siteInfo;
			    uni.openLocation({
			      latitude: parseFloat(siteInfo.lat),
			      longitude: parseFloat(siteInfo.lng),
			      name: siteInfo.companyName,
			      address: siteInfo.companyAddress,
			      scale: 18
			    });
			},
		}
	}
</script>

<style lang="scss">
	.nav {
	  position: fixed;
	  top: 180rpx;
	  right: 20rpx;
	  font-size: 22rpx;
	  padding: 20rpx 12rpx;
	  border-radius: 16rpx;
	  background-color: #fff;
	  color: $theme-color;
	}
	
	.hairline-top,.hairline-left {
		border-top: 1rpx solid #F0F0F0;
	}
	
	.nav-right {
	  margin-top: 16rpx;
	  padding-top: 16rpx;
	}
	
	.imgs {
	  width: 64rpx;
	  height: 64rpx;
	  margin-bottom: 12rpx;
	}
	
	.site-info {
	  width: 100%;
	  position: fixed;
	  left: 0;
	  bottom: 20rpx;
	}
	
	.site-info-count {
	  margin: 20rpx 20rpx;
	  padding: 20rpx 20rpx;
	  background-color: #fff;
	}
	.hideSiteInfo{
	  display: none;
	}
	
	.title {
	  font-size: 28rpx;
	  margin-top: 18rpx;
	}
	
	.distance {
	  margin-left: 12rpx;
	  padding-left: 12rpx;
	  color: $theme-color;
	}
	
	.address {
	  font-size: 25rpx;
	  overflow: hidden;
	  margin-top: 14rpx;
	  white-space: nowrap;
	  text-overflow: ellipsis;
	  color: $grey-color;
	}
	.show-info{
	  flex:1;
	}
	.site-no {
	  overflow: hidden;
	  font-weight: bold;
	  white-space: nowrap;
	  text-overflow: ellipsis;
	}
	
	.nav-position {
	  color: #fff;
	  width: 126rpx;
	  height: 126rpx;
	  font-size: 28rpx;
	  margin-left: 20rpx;
	  border-radius: 50%;
	  background-color: $theme-color;
	}
	
	.nav-img {
	  width: 36rpx;
	  height: 36rpx;
	}
	.user-info {
	  z-index: 99999;
	  position: fixed;
	  top: 160rpx;
	  left: 20rpx;
	  overflow: hidden;
	}
	
	.avatar{
	  width: 160rpx;
	  height: 160rpx;
	}
	.user-info .head-img {
	  width: 122rpx;
	  height: 122rpx;
	  position: absolute;
	  top:50%;
	  left:50%;
	  z-index: -1;
	  border-radius: 50%;
	  transform: translate(-50%, -50%);
	}
</style>