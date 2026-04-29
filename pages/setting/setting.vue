<template>
  <view class="page">
    <view class="nav">
      <view class="title">主题设置</view>
    </view>
    <view class="section">
      <view class="label">主题色</view>
      <view class="palette">
        <view class="color" data-color="#6366f1" @tap="setColor" style="background:#6366f1"></view>
        <view class="color" data-color="#ec4899" @tap="setColor" style="background:#ec4899"></view>
        <view class="color" data-color="#22c55e" @tap="setColor" style="background:#22c55e"></view>
        <view class="color" data-color="#f97316" @tap="setColor" style="background:#f97316"></view>
      </view>
    </view>
    <view class="section">
      <view class="label">动画强度</view>
      <slider min="0" max="100" :value="motion" @change="onMotionChange" />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const motion = ref(60)

const setColor = (e) => {
  const color = e.currentTarget.dataset.color
  uni.setStorageSync('themeColor', color)
}

const onMotionChange = (e) => {
  motion.value = e.detail.value
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

.nav {
  background: #fff;
  padding: 20rpx 24rpx;
  border-radius: 16rpx;
}

.title {
  font-size: 32rpx;
  font-weight: 700;
}

.section {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.label {
  font-weight: 600;
}

.palette {
  display: flex;
  gap: 16rpx;
}

.color {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
}
</style>
