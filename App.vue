<script>
	export default {
		globalData: {  
			unit:0,//称重单位
		    brand:null,//手机型号
		    share: false,//是否为分享进入
		    statusBarHeight: 0,//顶部高度
		    navigationBarHeight: 0//tab高度
        },
		onLaunch: function(options) {
			const { brand, platform, statusBarHeight } = uni.getSystemInfoSync();
			let top = 0;
			// #ifdef  MP-WEIXIN
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			const height = menuButtonInfo.height;
			top = menuButtonInfo.top;
			// #endif
			const navigationBarHeight = top == 0 ? (platform === "android" ? 48 : 40) : ((top - statusBarHeight) * 2 + (height ? height : 32));
			this.globalData.brand = brand;
			this.globalData.statusBarHeight = statusBarHeight;
			this.globalData.navigationBarHeight = navigationBarHeight;
			if (options?.scene == 1007 || options?.scene == 1008) {
		      this.globalData.share = true;
			} else {
		      this.globalData.share = false;
		    };
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	@import 'uni.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		// background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
