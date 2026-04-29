<template>
  <view class="page">
    <!-- 顶部导航：返回 + 标题 + 确认 -->
    <view class="nav">
      <button class="nav-btn" @tap="goBack">返回</button>
      <view class="title">主题设置</view>
      <button class="nav-btn primary" @tap="onConfirm">确认</button>
    </view>

    <view class="section">
      <view class="label">主题色</view>
      <view class="palette">
        <view
          class="color"
          :class="{ active: selectedColor === '#6366f1' }"
          data-color="#6366f1"
          @tap="setColor"
          style="background:#6366f1"
        ></view>
        <view
          class="color"
          :class="{ active: selectedColor === '#ec4899' }"
          data-color="#ec4899"
          @tap="setColor"
          style="background:#ec4899"
        ></view>
        <view
          class="color"
          :class="{ active: selectedColor === '#22c55e' }"
          data-color="#22c55e"
          @tap="setColor"
          style="background:#22c55e"
        ></view>
        <view
          class="color"
          :class="{ active: selectedColor === '#f97316' }"
          data-color="#f97316"
          @tap="setColor"
          style="background:#f97316"
        ></view>
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
import { onLoad } from '@dcloudio/uni-app'

// 当前选中的主题色
const selectedColor = ref('#6366f1')
// 动画强度
const motion = ref(60)

// 读取本地保存的设置
onLoad(() => {
  const savedColor = uni.getStorageSync('themeColor')
  const savedMotion = uni.getStorageSync('motionStrength')
  if (savedColor) selectedColor.value = savedColor
  if (typeof savedMotion === 'number') motion.value = savedMotion
})

// 选择主题色（仅更新状态，不立即保存）
const setColor = (e) => {
  const color = e.currentTarget.dataset.color
  selectedColor.value = color
}

// 改变动画强度
const onMotionChange = (e) => {
  motion.value = e.detail.value
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 确认保存
const onConfirm = () => {
  uni.setStorageSync('themeColor', selectedColor.value)
  uni.setStorageSync('motionStrength', motion.value)
  uni.setNavigationBarColor({
    frontColor: '#ffffff',
    backgroundColor: selectedColor.value
  })
  uni.showToast({ title: '已保存', icon: 'success' })
  uni.navigateBack()
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
}

.nav-btn {
  height: 60rpx;
  line-height: 60rpx;
  padding: 0 24rpx;
  border-radius: 999rpx;
  background: #f2f3f5;
  color: #333;
  font-size: 24rpx;
}

.nav-btn.primary {
  background: var(--main-color);
  color: #fff;
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
  position: relative;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

/* 选中态：外圈高亮 + 轻微放大 */
.color.active {
  transform: scale(1.08);
  box-shadow: 0 0 0 6rpx rgba(99, 102, 241, 0.25);
}
</style>
