<template>
	<view class="modal-box">
	  <view class="modal-wrapper">
	    <view class="modal-title">
	      <view class="titleWrapper"><text class="title-text">请录入车牌号</text></view>
	      <view class="iconWrapper">
	        <image class="close-icon" src="/static/carKey/close.png" @click="onCancel"/>
	      </view>
	    </view>
	    <view class="modal-content">
	      <view class="modal-input">
	          <view class="input" :class="[selectInputIndex===index?'activeInput':'']" v-for="(item,index) in carNumArr" :key="index"
	            @click='inputCarNum(index)' >
	            <text>{{item}}</text>
	          </view>
	        <view class="line"></view>
	      </view>
	    </view>
	    <view class="model-btn-group">
	      <button @click="onOk" class="btn confirm" :disabled="btnDisabled">确认</button>
	    </view>
	  </view>
	  <!-- 车牌 -->
	  <view class='keyboard'>
	    <!-- 省键盘 -->
	    <view class="provinces" v-show='!hiddenPro'>
	      <view class="pro-li fl" v-for="item in provinceArr" :key="item" @click='proTap(item)'>
	        {{item}}</view>
	    </view>
	    <!-- 号码键盘	 -->
	    <view class="keyNums" v-show='!hiddenStr'>
	      <view v-if="selectInputIndex===1" class="row numRow">
	        <view class="pro-li  disabled" v-for="item in numArr" :key="item" >{{item}}</view>
	      </view>
	      <view v-else class="row numRow">
	        <view class="pro-li " v-for="item in numArr" :key="item" @click='strTap(item)' >{{item}}</view>
	      </view>
	      <view class="strOne row">
	        <view class="pro-li " v-for="item in strArrOne" :key="item" @click='strTap(item)'>{{item}}
	        </view>
	      </view>
	      <view class="strTwo row">
	        <view class="pro-li " v-for="item in strArrTwo" :key="item" @click='strTap(item)' >{{item}}
	        </view>
	      </view>
	      <view class="strThree row">
	        <view class="pro-li " v-for="item in strArrThree" :key="item" @click='strTap(item)'>{{item}}
	        </view>
	        <view class='kb-icon pro-li' @click='backSpace'>
	          <image class='delete-icon' src="/static/carKey/delete.png" />
	        </view>
	      </view>
	    </view>
	  </view>
	  <view class="modal-cover"></view>
	</view>
</template>

<script>
	const INPUT_NUM = 8;//车牌号输入框个数
	const EmptyArray = new Array(INPUT_NUM).fill('');
	// 车牌输入框的下标
	const INPUT_INDEX = {
	  FIRST: 0,
	  SECOND: 1
	};
	export default{
		data(){
			return{
				// 键
				provinceArr: ['京', '沪', '津', '苏', '粤', '冀', '晋', '蒙', '辽', '吉', '黑', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘',
				'桂', '琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁', '新', '港', '澳', '台'],
				strArrOne: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P'],
				strArrTwo: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
			    strArrThree: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
			    numArr: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
			    hiddenPro: false, // 隐藏省份键盘
			    hiddenStr: true, // 隐藏数字字母键盘				    
				carNumArr: EmptyArray,
				selectInputIndex: 0,
			    btnDisabled: true
			}
		},
		methods:{
			proTap(province) { //点击省份
			    const { carNumArr, selectInputIndex } = this._data;
			    this.hiddenPro = true;
			    this.hiddenStr = false;
			    carNumArr[selectInputIndex] = province;
			    // 选择车牌号时触发
			    this.carNumArr = carNumArr;
				console.log(this.carNumArr)
			    // 选中一个后，下一个输入框聚焦
			    this.selectInputIndex = selectInputIndex !== carNumArr.length - 1 ? selectInputIndex + 1 : selectInputIndex;
			    this.btnDisabled = this.isBtnDisabled();
			},
			strTap(str) { //点击字母数字
			    const { carNumArr, selectInputIndex } = this._data;
			    carNumArr[selectInputIndex] = str;
			    this.carNumArr = carNumArr;
			    // 选中一个后，下一个输入框聚焦
			    this.selectInputIndex = selectInputIndex !== carNumArr.length - 1 ? selectInputIndex + 1 : selectInputIndex;
			    this.btnDisabled = this.isBtnDisabled();
			},
			inputCarNum(index) {
			    this.showCarKeyboard = true;
			    this.selectInputIndex = index;
			    if (index === INPUT_INDEX.FIRST) {
			        // 第一个输入框展示省份键盘，第二个展示字母数字输入框(数字不可点),以后就是数字字母输入框(都可点)
			        this.hiddenPro = false;
			        this.hiddenStr = true;
			    } else if (index === INPUT_INDEX.SECOND) {
			        this.hiddenPro = true;
			        this.hiddenStr = false;
			    } else {
			        this.hiddenPro = true;
			        this.hiddenStr = false;
			    };
			},
			backSpace() {
			    const { carNumArr, selectInputIndex } = this._data;
			    carNumArr[selectInputIndex] = '';
			    this.carNumArr = carNumArr;
				this.selectInputIndex = selectInputIndex !== INPUT_INDEX.FIRST ? selectInputIndex - 1 : selectInputIndex;
			    this.btnDisabled = this.isBtnDisabled();
			    if (this.selectInputIndex === INPUT_INDEX.FIRST && this.carNumArr[this.selectInputIndex] === '') {
			        this.hiddenPro = false;
			        this.hiddenStr = true;
			    };
			},
			// 只有输入内容的车牌号位数合法时，展示确认按钮
			isBtnDisabled() {
			    const carNumArr = this.carNumArr;
			    const disabled = carNumArr.some((item, index) => {
			        if (index !== carNumArr.length - 1) {
			          return !item;
			        }
			        return false;
			    });
			    return disabled;
			},
			onCancel() {
			    this.carNumArr = EmptyArray;
			    // this.triggerEvent('onCancel');
			},
			onOk() {
			    const carNum = this.carNumArr.join('');
			    // this.triggerEvent('onOk', carNum);
			}
		}
	}
</script>

<style lang="scss">
	
	.keyboard {
	  width: 100%;
	  position: fixed;
	  bottom: 0;
	  left: 0;
	  z-index: 1000;
	  background-color: rgba(210, 213, 219, 90);
	}
	
	.fl {
	  float: left;
	}
	
	.provinces {
	  overflow: hidden;
	  padding-top: 20rpx;
	}
	
	.pro-li {
	  font-size: 32rpx;
	  color: #353535;
	  height: 76rpx;
	  width: 62rpx;
	  line-height: 76rpx;
	  text-align: center;
	  margin-left: 12rpx;
	  margin-bottom: 20rpx;
	  background-color: #fff;
	  box-shadow: 0px 1rpx 2rpx 0 #979797;
	  border-radius: 5px;
	  flex: 1;
	}
	
	.keyNums .disabled {
	  background-color: #f7f7f7;
	  color: #ccc;
	}
	
	.keyNums {
	  overflow: hidden;
	  padding-top: 20rpx;
	  display: flex;
	  flex-direction: column;
	}
	
	.keyNums .row {
	  display: flex;
	}
	
	.keyNums .numRow {
	  padding: 0 10rpx;
	}
	
	.keyNums .strOne {
	  padding: 0 10rpx;
	}
	
	.keyNums .strTwo {
	  padding: 0 40rpx;
	}
	
	.keyNums .strThree {
	  padding-left: 116rpx;
	  padding-right: 10rpx;
	}
	
	.keyNums .pro-li:nth-child(16) {
	  color: red;
	}
	
	.keyNums .strThree .kb-icon {
	  flex: 1.5;
	  background: #abb3bd;
	  margin-left: 40rpx;
	}
	
	.modal-box {
	  width: 100%;
	  position: absolute;
	  top: 0;
	  bottom: 0;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
	
	.modal-wrapper {
	  margin: 30% 30rpx;
	  height: 380rpx;
	  padding: 30rpx;
	  background-color: #fff;
	  border-radius: 10rpx;
	  z-index: 1000;
	  position: fixed;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  display: flex;
	  flex-direction: column;
	  align-content: space-between;
	  justify-content: space-between;
	  overflow: hidden;
	  text-align: left;
	}
	
	.modal-wrapper .model-btn-group {
	  display: flex;
	  box-sizing: border-box;
	  font-size: 32rpx;
	}
	
	.model-btn-group .btn {
	  flex: 1;
	  font-size: 18px;
	}
	
	.model-btn-group .confirm {
	  color: #fff;
	  background-color: $theme-color;
	}
	
	.modal-cover {
	  width: 100%;
	  background-color: #242424;
	  opacity: 0.5;
	  z-index: 999;
	  position: fixed;
	  top: 0;
	  left: 0;
	  bottom: 0;
	  right: 0;
	  margin: auto;
	  overflow: hidden;
	}
	
	.modal-input {
	  display: flex;
	}
	
	.modal-input .input {
	  border: 1px solid #979797;
	  margin-right: 6rpx;
	  border-radius: 3px;
	  flex: 1;
	  text-align: center;
	  padding: 8px;
	  height: 22px;
	}
	
	.modal-input .input:nth-child(1) {
	  border-right-width: 0;
	  margin-right: 0;
	  position: relative;
	  border-bottom-right-radius: 0;
	  border-top-right-radius: 0;
	}
	
	.modal-input .input:nth-child(1)::after {
	  content: "";
	  position: absolute;
	  right: -1px;
	  width: 1px;
	  height: 20px;
	  background-color: #979797;
	  z-index: -10;
	}
	
	.modal-input .input:nth-child(2) {
	  position: relative;
	  border-left-width: 0;
	  margin-right: 20rpx;
	  border-bottom-left-radius: 0;
	  border-top-left-radius: 0;
	}
	
	.modal-input .input:nth-child(2)::after {
	  content: "";
	  position: absolute;
	  right: -16rpx;
	  top: 45%;
	  width: 5px;
	  height: 5px;
	  border-radius: 50%;
	  background-color: #979797;
	}
	
	.modal-input .input:nth-child(8) {
	  border: 1px dashed #979797;
	}
	
	.modal-input .activeInput {
	  border-radius: 3px !important;
	  border: 1px solid $theme-color !important;
	}
	
	.modal-title {
	  display: flex;
	  font-size: 20px;
	  color: #333333;
	}
	
	.titleWrapper {
	  flex: 1;
	}
	
	.title-text {
	  font-size: 18px;
	  font-weight: bold;
	}
	
	.iconWrapper {
	  flex: 1;
	  text-align: right;
	}
	
	.close-icon {
	  width: 35rpx;
	  height: 35rpx;
	}
	
	.delete-icon {
	  width: 55rpx;
	  height: 40rpx;
	  margin-top: 18rpx;
	}
</style>