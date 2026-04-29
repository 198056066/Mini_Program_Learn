<template>
  <view class="page">
    <view class="hero">
      <view class="badge">灵感画报</view>
      <view class="title">图文潮流社区</view>
      <view class="subtitle">10+ 布局 · 20+ 动画 · 30+ 高频交互</view>
    </view>
    <view class="panel card trans">
      <view class="panel-title">今日灵感</view>
      <view class="panel-desc">滑动体验布局与动画</view>
    </view>
    <view class="actions">
      <button class="btn primary" @tap="goIndex">进入社区</button>
      <button class="btn ghost" @tap="goSetting">主题设置</button>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    goIndex() {
      uni.navigateTo({
        url: '/pages/index/index'
      })
    },
    goSetting() {
      uni.navigateTo({
        url: '/pages/setting/setting'
      })
    }
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 80rpx 40rpx 60rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}

.hero {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.badge {
  width: fit-content;
  padding: 10rpx 20rpx;
  border-radius: 999rpx;
  background: rgba(99, 102, 241, 0.12);
  color: var(--main-color);
  font-size: 22rpx;
}

.title {
  font-size: 48rpx;
  font-weight: 700;
  color: var(--text-color);
}

.subtitle {
  color: var(--text-light);
  font-size: 26rpx;
}

.panel {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.panel-title {
  font-size: 30rpx;
  font-weight: 600;
}

.panel-desc {
  color: var(--text-light);
}

.actions {
  display: flex;
  gap: 24rpx;
}

.btn {
  flex: 1;
  height: 88rpx;
  border-radius: 16rpx;
  font-size: 28rpx;
}

.btn.primary {
  background: var(--main-color);
  color: #fff;
}

.btn.ghost {
  background: #fff;
  color: var(--main-color);
  border: 2rpx solid rgba(99, 102, 241, 0.3);
}
</style>
