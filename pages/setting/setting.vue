<template>
  <view class="page" :style="{ '--main-color': themeColor, '--main-color-rgb': themeColorRgb }">
    <view class="nav">
      <button class="nav-btn" @tap="goBack">返回</button>
      <view class="title">设置</view>
      <button class="nav-btn primary" @tap="onConfirm">保存</button>
    </view>

    <view class="group">
      <view class="group-title">外观设置</view>
      <view class="card">
        <view class="row">
          <view class="row-left">
            <view class="icon">🌙</view>
            <view class="text">
              <view class="row-title">主题色</view>
              <view class="row-desc">切换当前主色</view>
            </view>
          </view>
          <view class="row-right">
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
            </view>
          </view>
        </view>
        <view class="row" @tap="openDrawer">
          <view class="row-left">
            <view class="icon">🔠</view>
            <view class="text">
              <view class="row-title">字体大小</view>
              <view class="row-desc">点击调整阅读字号</view>
            </view>
          </view>
          <view class="arrow">›</view>
        </view>
        <view class="row" @tap="goWallpaper">
          <view class="row-left">
            <view class="icon">🖼️</view>
            <view class="text">
              <view class="row-title">壁纸主题</view>
              <view class="row-desc">精选风格主题</view>
            </view>
          </view>
          <view class="arrow">›</view>
        </view>
      </view>
    </view>

    <view class="group">
      <view class="group-title">通用设置</view>
      <view class="card">
        <view class="row" @tap="clearCache">
          <view class="row-left">
            <view class="icon">🧹</view>
            <view class="text">
              <view class="row-title">清除缓存</view>
              <view class="row-desc">释放存储空间</view>
            </view>
          </view>
          <view class="arrow">›</view>
        </view>
        <view class="row" @tap="checkUpdate">
          <view class="row-left">
            <view class="icon">⬆️</view>
            <view class="text">
              <view class="row-title">检查更新</view>
              <view class="row-desc">保持最新版本</view>
            </view>
          </view>
          <view class="arrow">›</view>
        </view>
        <view class="row">
          <view class="row-left">
            <view class="icon">📶</view>
            <view class="text">
              <view class="row-title">流量播放</view>
              <view class="row-desc">允许移动网络播放</view>
            </view>
          </view>
          <switch :checked="allowMobilePlay" @change="toggleMobilePlay" />
        </view>
      </view>
    </view>

    <view class="group">
      <view class="group-title">其他功能</view>
      <view class="card">
        <view class="row" @tap="aboutProject">
          <view class="row-left">
            <view class="icon">ℹ️</view>
            <view class="text">
              <view class="row-title">关于项目</view>
              <view class="row-desc">查看项目信息</view>
            </view>
          </view>
          <view class="arrow">›</view>
        </view>
        <view class="row" @tap="openAgreement">
          <view class="row-left">
            <view class="icon">📄</view>
            <view class="text">
              <view class="row-title">用户协议</view>
              <view class="row-desc">服务条款说明</view>
            </view>
          </view>
          <view class="arrow">›</view>
        </view>
        <view class="row logout" @tap="logout">
          <view class="row-left">
            <view class="icon">🚪</view>
            <view class="text">
              <view class="row-title danger">退出登录</view>
              <view class="row-desc">将退出当前账号</view>
            </view>
          </view>
          <view class="arrow">›</view>
        </view>
      </view>
    </view>

    <view class="footer">© 2026 灵感研究所</view>

    <view class="mask" :class="{ show: showDrawer }" @tap="closeDrawer"></view>
    <view class="drawer" :class="{ show: showDrawer }">
      <view class="drawer-header">
        <view class="drawer-title">字体大小</view>
        <view class="drawer-close" @tap="closeDrawer">关闭</view>
      </view>
      <scroll-view scroll-y class="drawer-body">
        <view
          v-for="size in fontSizes"
          :key="size.value"
          class="drawer-item"
          :class="{ active: fontSize === size.value }"
          @tap="setFontSize(size.value)"
        >
          <view class="drawer-label">{{ size.label }}</view>
          <view class="drawer-preview" :style="{ fontSize: `${size.value}rpx` }">
            灵感随心
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

const selectedColor = ref('#6366f1')
const themeColor = computed(() => selectedColor.value)
const themeColorRgb = ref('99, 102, 241')
const allowMobilePlay = ref(false)
const showDrawer = ref(false)
const fontSize = ref(28)

const fontSizes = [
  { label: '小号', value: 24 },
  { label: '标准', value: 28 },
  { label: '偏大', value: 32 },
  { label: '超大', value: 36 }
]

const hexToRgb = (hex) => {
  const value = hex.replace('#', '')
  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)
  return `${r}, ${g}, ${b}`
}

onLoad(() => {
  const savedColor = uni.getStorageSync('themeColor')
  const savedFontSize = uni.getStorageSync('fontSize')
  const savedMobilePlay = uni.getStorageSync('allowMobilePlay')
  if (savedColor) {
    selectedColor.value = savedColor
    themeColorRgb.value = hexToRgb(savedColor)
  }
  if (typeof savedFontSize === 'number') fontSize.value = savedFontSize
  if (typeof savedMobilePlay === 'boolean') allowMobilePlay.value = savedMobilePlay
})

onShow(() => {
  const savedColor = uni.getStorageSync('themeColor')
  if (savedColor) {
    selectedColor.value = savedColor
    themeColorRgb.value = hexToRgb(savedColor)
  }
})

const setColor = (e) => {
  const color = e.currentTarget.dataset.color
  selectedColor.value = color
  themeColorRgb.value = hexToRgb(color)
}

const goBack = () => {
  uni.navigateBack()
}

const onConfirm = () => {
  uni.setStorageSync('themeColor', selectedColor.value)
  uni.setStorageSync('fontSize', fontSize.value)
  uni.setStorageSync('allowMobilePlay', allowMobilePlay.value)
  uni.setNavigationBarColor({
    frontColor: '#ffffff',
    backgroundColor: selectedColor.value
  })
  uni.showToast({ title: '已保存', icon: 'success' })
  uni.navigateBack()
}

const openDrawer = () => {
  showDrawer.value = true
}

const closeDrawer = () => {
  showDrawer.value = false
}

const setFontSize = (value) => {
  fontSize.value = value
  showDrawer.value = false
}

const clearCache = () => {
  uni.showToast({ title: '缓存已清理', icon: 'success' })
}

const checkUpdate = () => {
  uni.showToast({ title: '已是最新版本', icon: 'success' })
}

const toggleMobilePlay = (e) => {
  allowMobilePlay.value = e.detail.value
}

const goWallpaper = () => {
  uni.showToast({ title: '功能开发中', icon: 'none' })
}

const aboutProject = () => {
  uni.showToast({ title: '灵感研究所 v1.0', icon: 'none' })
}

const openAgreement = () => {
  uni.showToast({ title: '用户协议加载中', icon: 'none' })
}

const logout = () => {
  uni.showModal({
    title: '确认退出登录？',
    content: '退出后需要重新登录。',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({ title: '已退出', icon: 'success' })
      }
    }
  })
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 80rpx 30rpx 80rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  background: #f5f5f5;
}

.nav {
  background: #fff;
  padding: 20rpx 24rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.06);
}

.nav-btn {
  height: 60rpx;
  line-height: 60rpx;
  padding: 0 24rpx;
  border-radius: 999rpx;
  background: #f2f3f5;
  color: var(--main-color);
  font-size: 24rpx;
  border: 2rpx solid rgba(var(--main-color-rgb), 0.25);
  text-align: center;
}

.nav-btn.primary {
  background: var(--main-color);
  color: #fff;
  box-shadow: 0 8rpx 20rpx rgba(var(--main-color-rgb), 0.25);
}

.title {
  font-size: 32rpx;
  font-weight: 700;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.group-title {
  padding-left: 8rpx;
  font-size: 24rpx;
  color: #999;
}

.card {
  background: #fff;
  border-radius: 20rpx;
  box-shadow: 0 10rpx 24rpx rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.row {
  height: 88rpx;
  padding: 0 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1rpx solid #f1f1f1;
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
  font-size: 36rpx;
}

.text {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.row-title {
  font-size: 28rpx;
  color: #333;
}

.row-desc {
  font-size: 22rpx;
  color: #999;
}

.arrow {
  color: #bbb;
  font-size: 32rpx;
}

.palette {
  display: flex;
  gap: 12rpx;
}

.color {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.color.active {
  transform: scale(1.08);
  box-shadow: 0 0 0 4rpx rgba(var(--main-color-rgb), 0.25);
}

.logout .row-title {
  color: #ef4444;
}

.footer {
  text-align: center;
  color: #aaa;
  font-size: 22rpx;
  margin-top: 12rpx;
}

.mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.0);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 40;
}

.mask.show {
  opacity: 1;
  background: rgba(0, 0, 0, 0.6);
  pointer-events: auto;
}

.drawer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-radius: 24rpx 24rpx 0 0;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  z-index: 50;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
}

.drawer.show {
  transform: translateY(0);
}

.drawer-header {
  padding: 24rpx 30rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1rpx solid #f2f2f2;
}

.drawer-title {
  font-size: 30rpx;
  font-weight: 700;
}

.drawer-close {
  color: var(--main-color);
  font-weight: 600;
}

.drawer-body {
  padding: 20rpx 30rpx 40rpx;
  flex: 1;
}

.drawer-item {
  padding: 18rpx 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1rpx solid #f2f2f2;
}

.drawer-item:last-child {
  border-bottom: none;
}

.drawer-item.active .drawer-label {
  color: var(--main-color);
  font-weight: 600;
}

.drawer-label {
  font-size: 28rpx;
  color: #333;
}

.drawer-preview {
  color: #666;
}
</style>
