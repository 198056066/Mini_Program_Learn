<template>
  <view class="page" :style="{ '--main-color': themeColor, '--main-color-rgb': themeColorRgb }">
    <view class="nav">
      <view class="title">我的收藏</view>
    </view>
    <scroll-view scroll-y class="list">
      <view class="card item" v-for="item in list" :key="item.id">
        <image class="thumb" :src="item.cover" mode="aspectFill" />
        <view class="info">
          <view class="name">{{ item.title }}</view>
          <view class="meta">{{ item.author }}</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { collectList } from '@/data/collect'

const list = collectList
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
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav {
  padding: 80rpx 32rpx 20rpx;
  background: #fff;
}

.title {
  font-size: 34rpx;
  font-weight: 700;
}

.list {
  flex: 1;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.item {
  display: flex;
  gap: 16rpx;
  padding: 16rpx;
}

.thumb {
  width: 160rpx;
  height: 160rpx;
  border-radius: 16rpx;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8rpx;
}

.name {
  font-weight: 600;
}

.meta {
  color: var(--text-light);
  font-size: 24rpx;
}
</style>
