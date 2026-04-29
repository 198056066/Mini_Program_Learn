<template>
  <view class="page" :style="{ '--main-color': themeColor, '--main-color-rgb': themeColorRgb }">
    <view class="header">
      <view class="avatar"></view>
      <view class="name">鹿野</view>
      <view class="tag">灵感收藏家</view>
    </view>
    <view class="stats">
      <view class="card item">
        <view class="num">128</view>
        <view class="label">关注</view>
      </view>
      <view class="card item">
        <view class="num">356</view>
        <view class="label">收藏</view>
      </view>
      <view class="card item">
        <view class="num">89</view>
        <view class="label">灵感</view>
      </view>
    </view>
    <view class="menu">
      <view class="row" @tap="goCollect">我的收藏</view>
      <view class="row" @tap="goSetting">主题设置</view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'

const themeColor = ref('#6366f1')
const themeColorRgb = ref('99, 102, 241')

const hexToRgb = (hex) => {
  const value = hex.replace('#', '')
  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)
  return `${r}, ${g}, ${b}`
}

onShow(() => {
  const savedColor = uni.getStorageSync('themeColor')
  if (savedColor) {
    themeColor.value = savedColor
    themeColorRgb.value = hexToRgb(savedColor)
  }
})

const goCollect = () => {
  uni.navigateTo({
    url: '/pages/collect/collect'
  })
}

const goSetting = () => {
  uni.navigateTo({
    url: '/pages/setting/setting'
  })
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 80rpx 32rpx 40rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
}

.avatar {
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--main-color),
    rgba(var(--main-color-rgb), 0.65)
  );
}

.name {
  font-size: 32rpx;
  font-weight: 700;
}

.tag {
  color: var(--text-light);
  font-size: 24rpx;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rpx;
}

.item {
  padding: 20rpx;
  text-align: center;
}

.num {
  font-size: 32rpx;
  font-weight: 700;
}

.label {
  color: var(--text-light);
  font-size: 24rpx;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.row {
  padding: 24rpx;
  background: #fff;
  border-radius: 16rpx;
}
</style>
