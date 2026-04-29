<template>
  <view class="page" :style="{ '--main-color': themeColor, '--main-color-rgb': themeColorRgb }">
    <view class="hero">
      <view class="hero-bg"></view>
      <view class="glass-card">
        <view class="avatar"></view>
        <view class="name">鹿野</view>
        <view class="tag">灵感收藏家</view>
        <view class="stats">
          <view class="stat" @tap="noop">
            <view class="num">128</view>
            <view class="label">作品</view>
          </view>
          <view class="stat" @tap="noop">
            <view class="num">356</view>
            <view class="label">收藏</view>
          </view>
          <view class="stat" @tap="noop">
            <view class="num">89</view>
            <view class="label">关注</view>
          </view>
        </view>
      </view>
    </view>

    <view class="menu">
      <view class="group" :style="{ animationDelay: '0.05s' }">
        <view class="row" @tap="goCollect">
          <view class="row-left">
            <view class="icon">🎨</view>
            <view class="title">我的作品</view>
          </view>
          <view class="arrow">›</view>
        </view>
      </view>
      <view class="group" :style="{ animationDelay: '0.12s' }">
        <view class="row" @tap="goCollect">
          <view class="row-left">
            <view class="icon">⭐</view>
            <view class="title">收藏</view>
          </view>
          <view class="arrow">›</view>
        </view>
        <view class="row" @tap="goCollect">
          <view class="row-left">
            <view class="icon">❤️</view>
            <view class="title">点赞</view>
          </view>
          <view class="arrow">›</view>
        </view>
      </view>
      <view class="group" :style="{ animationDelay: '0.19s' }">
        <view class="row" @tap="goSetting">
          <view class="row-left">
            <view class="icon">⚙️</view>
            <view class="title">设置</view>
          </view>
          <view class="arrow">›</view>
        </view>
        <view class="row" @tap="goSetting">
          <view class="row-left">
            <view class="icon">ℹ️</view>
            <view class="title">关于</view>
          </view>
          <view class="arrow">›</view>
        </view>
      </view>
    </view>

    <view class="fab" @tap="noop">
      <view class="fab-icon">＋</view>
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
    uni.setTabBarStyle({
      selectedColor: savedColor
    })
  }
})

const goCollect = () => {
  uni.switchTab({
    url: '/pages/collect/collect'
  })
}

const goSetting = () => {
  uni.navigateTo({
    url: '/pages/setting/setting'
  })
}

const noop = () => {}
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  position: relative;
  overflow-x: hidden;
}

.hero {
  position: relative;
  padding: 120rpx 0 120rpx;
  display: flex;
  justify-content: center;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    var(--main-color),
    rgba(var(--main-color-rgb), 0.7)
  );
}

.glass-card {
  width: 88%;
  padding: 90rpx 32rpx 36rpx;
  box-sizing: border-box;
  border-radius: 28rpx;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 16rpx 40rpx rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
  color: #fff;
  position: relative;
  z-index: 2;
  animation: card-enter 0.6s ease forwards;
}

.avatar {
  position: absolute;
  top: -60rpx;
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 6rpx solid #fff;
  background: linear-gradient(135deg, #fff, rgba(255, 255, 255, 0.6));
  box-shadow: 0 10rpx 24rpx rgba(0, 0, 0, 0.2);
}

.name {
  margin-top: 16rpx;
  font-size: 34rpx;
  font-weight: 700;
}

.tag {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
}

.stats {
  width: 100%;
  margin-top: 24rpx;
  display: flex;
  justify-content: space-around;
  gap: 12rpx;
}

.stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rpx;
  transition: transform 0.2s ease;
  animation: stat-pop 0.6s ease forwards;
}

.stat:active {
  transform: scale(0.96);
}

.num {
  font-size: 34rpx;
  font-weight: 700;
}

.label {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.8);
}

.menu {
  padding: 24rpx 30rpx 120rpx;
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  margin-top: -40rpx;
}

.group {
  background: #fff;
  border-radius: 20rpx;
  box-shadow: 0 10rpx 24rpx rgba(0, 0, 0, 0.08);
  overflow: hidden;
  opacity: 0;
  transform: translateY(16rpx);
  animation: group-fade 0.5s ease forwards;
}

.row {
  height: 88rpx;
  padding: 0 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1rpx solid #f0f0f0;
  transition: transform 0.2s ease;
}

.row:last-child {
  border-bottom: none;
}

.row:active {
  transform: scale(0.97);
}

.row-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.icon {
  font-size: 40rpx;
}

.title {
  font-size: 28rpx;
  color: #333;
}

.arrow {
  color: #bbb;
  font-size: 32rpx;
}

.fab {
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--main-color),
    rgba(var(--main-color-rgb), 0.7)
  );
  box-shadow: 0 12rpx 28rpx rgba(var(--main-color-rgb), 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
  animation: fab-pop 0.6s ease forwards, fab-breath 2.4s ease-in-out infinite,
    fab-rotate 8s linear infinite;
  transition: transform 0.2s ease;
}

.fab:active {
  transform: scale(0.92);
}

.fab-icon {
  font-size: 40rpx;
  color: #fff;
}

@keyframes card-enter {
  from {
    opacity: 0;
    transform: translateY(-20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes stat-pop {
  from {
    opacity: 0;
    transform: translateY(10rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes group-fade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fab-breath {
  50% {
    transform: scale(1.06);
  }
}

@keyframes fab-rotate {
  to {
    transform: rotate(360deg);
  }
}

@keyframes fab-pop {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
