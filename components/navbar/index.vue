<template>
	<view class="tab-wrapper">
	  <view class="head" :style="{ paddingTop:statusBarHeight + 'px'}">
	    <view class="navbar flex flex-align-center" :style="{ height: height + 'px'}">
	      <view class="nav-title">{{navbarData.title}}</view>
	      <view class="nav-btn flex flex-justify-around flex-direction">
	        <view class="nav-capsule flex flex-align-center flex-justify-between" v-if="navbarData.showCapsule != 0 && !share">
	          <navigator class="flex flex-align-center" open-type="navigateBack" :delta="1" hover-class="none">
	            <image src="/static/img/back-pre.png" mode="aspectFill" class="back-pre"></image>
	          </navigator>
	          <view class="navbar-v-line"></view>
	          <navigator class="flex flex-align-center" open-type="reLaunch" url="/pages/map/index" hover-class="none">
	            <image src="/static/img/back-home.png" mode="aspectFill" class="back-home"></image>
	          </navigator>
	        </view>
	      </view>
	    </view>
	    <!-- 展示搜索，选择日期功能 -->
	    <block v-if="navbarData.search">
	      <view class="flex flex-align-center flex-justify-between" :class="{picker:!show}">
	        <view v-show="show" style="flex: 1;">
				<uni-search-bar @confirm="search" :focus="true" v-model="condition" @input="input"
								@clear="clear" radius="50" :placeholder="'请输入'+navbarData.search.label" cancelButton="none" :cancelText="navbarData.search.oper">
				</uni-search-bar>
	        </view>
	        <view @click="showCalendar" class="flex flex-align-center choose" v-show="!show">
	          <view class="choose-time">选择日期：{{end?start+' 至 '+end:'请选择时间区间'}}</view>
	          <image src="/static/img/down.png" class="down"></image>
	        </view>
	        <view class="change" v-if="navbarData.search.type==0" @click="change">
	          {{navbarData.search.oper}}
	        </view>
	        <view v-else @click="onClick">
				<uni-icons type="plusempty" size="22" color="#ffffff"></uni-icons>
	        </view>
	      </view>
		  <uni-calendar 
		  	ref="calendar"
		  	:insert="false"
		  	@confirm="confirm"
		  	 />
		  
	    </block>
	    <slot></slot>
	  </view>
	</view>
</template>

<script>
	export default {
		options: { styleIsolation: 'shared' },
		data() {
			return {
				end: "",//截止如期 
			    start: "",//开始日期
			    height: 0,//高度
			    show: true,//显示搜索框或者日历
			    share: false,//是否为分享进入页面
			    condition: "",//搜索条件
			    showPick: false,//显示隐藏日历
			    statusBarHeight: 0,//顶部距离
			    maxDate: new Date().getTime(),//截止日期
				minDate: new Date(2022, 0, 1).getTime(),//起始日期
			}
		},
		props:{
			navbarData: {
			    type: Object,
			    default: ()=>{
					return {
						title: "Mini过磅机",//标题
						showCapsule: 1,//1显示顶部左侧按钮 0隐藏
						search: {
							label: "搜索条件",//搜索按钮标题 
							type: 0, //0显示右侧文字按钮 1显示图标按钮
							oper: "切换"//文字按钮内容
						}
					}
        	    }
			}
		},
		created() {
			this.share = getApp().globalData.share;
			this.height = getApp().globalData.navigationBarHeight;
			this.statusBarHeight = getApp().globalData.statusBarHeight;
		},
		methods:{
			search(res) {
				console.log("搜索事件",res.value)
			},
			input(res) {
				this.condition = res.value;
			},
			clear(res) {
				this.condition = "";
			},
			change(){ this.onChange()},
			onClick(){},
			showCalendar(){
				this.$refs.calendar.open();
			},
			onChange() {
			    this.onClear();
		        this.show = !this.show;
			},
			onClear() {
				this.end = "";
		        this.start = "";
				this.condition = "";
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-wrapper{
		position: sticky;
	}
	.head{
		width: 100%;
		background-image: $bg-linear-color;
	}
	.navbar{
		position: relative;
		
		.nav-title {
		  width: 100%;
		  color: #fff;
		  font-size: 34rpx;
		  font-weight: 500;
		  overflow: hidden;
		  text-align: center;
		  white-space: nowrap;
		  text-overflow: ellipsis;
		}
		.nav-btn {
		  position: absolute;
		}
		.nav-capsule {
		  width: 140rpx;
		  margin-left: 30rpx;
		}
		.navbar-v-line {
		  width: 1px;
		  height: 32rpx;
		  background-color: #e5e5e5;
		}
	}
	.back-pre, .back-home {
	  width: 32rpx;
	  height: 36rpx;
	  padding: 0 10rpx;
	}
	.nav-capsule .back-home {
	  width: 36rpx;
	  height: 40rpx;
	}
	.choose {
	  height: 68rpx;
	  font-size: 30rpx;
	}
	.down {
	  width: 30rpx;
	  height: 30rpx;
	  margin-left: 16rpx;
	}
	.choose-time {
	  font-size: 28rpx;
	}
	.change {
	  color: #fff;
	  font-size: 30rpx;
	}
	.picker {
	  color: #fff;
	  padding: 20rpx 24rpx;
	}
</style>