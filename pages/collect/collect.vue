<template>
  <view class="page" :style="{ '--main-color': themeColor, '--main-color-rgb': themeColorRgb }">
    <view class="nav">
      <view class="title">我的收藏</view>
      <view class="layout-toggle" :class="{ grid: isGrid }" @tap="toggleLayout">
        <text class="layout-icon" :class="{ active: !isGrid }">≡</text>
        <text class="layout-icon" :class="{ active: isGrid }">▦</text>
      </view>
    </view>

    <view v-if="list.length === 0" class="empty">
      <view class="empty-icon">☆</view>
      <view class="empty-text">暂无收藏内容</view>
      <view class="empty-btn" @tap="goHome">去逛逛</view>
    </view>

    <scroll-view v-else :scroll-y="!isSwiping" class="list" :class="{ grid: isGrid }" refresher-enabled @refresherrefresh="onRefresh">
      <view v-if="!isGrid" class="list-layout">
        <view
          v-for="(item, idx) in list"
          :key="item.id"
          class="swipe-item"
          :class="{ deleting: item.deleting }"
        >
          <view
            class="swipe-content card"
            :style="{
              transform: `translateX(${item.swipeX}rpx)`,
              animationDelay: `${idx * 0.06}s`,
              transition: item.dragging ? 'none' : 'all 0.3s'
            }"
            @touchstart.stop="onTouchStart($event, item)"
            @touchmove.stop.prevent="onTouchMove($event, item)"
            @touchend.stop="onTouchEnd($event, item)"
            @touchcancel.stop="onTouchCancel(item)"
            @tap="goDetail(item.id)"
            @longpress="onLongPress(item)"
          >
            <image class="thumb" :src="item.cover" mode="aspectFill" />
            <view class="info">
              <view class="name">{{ item.title }}</view>
              <view class="desc">{{ item.desc }}</view>
              <view class="meta">{{ item.time }}</view>
            </view>
          </view>
          <view class="swipe-delete" @tap="confirmDelete(item)">删除</view>
        </view>
      </view>

      <view v-else class="grid-layout">
        <view
          v-for="(item, idx) in list"
          :key="item.id"
          class="grid-card card"
          :style="{ animationDelay: `${idx * 0.06}s` }"
          @tap="goDetail(item.id)"
          @longpress="onLongPress(item)"
        >
          <image class="grid-thumb" :src="item.cover" mode="aspectFill" :style="{ height: `${item.coverHeight}rpx` }" />
          <view class="grid-info">
            <view class="name">{{ item.title }}</view>
            <view class="meta">{{ item.time }}</view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { collectList } from '@/data/collect'

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

const buildList = () =>
  collectList.map((item) => ({
    ...item,
    swipeX: 0,
    deleting: false,
    dragging: false
  }))

const list = ref(buildList())
const isGrid = ref(false)
const isSwiping = ref(false)

const toggleLayout = () => {
  isGrid.value = !isGrid.value
}

const onRefresh = () => {
  list.value = buildList()
  setTimeout(() => {
    uni.stopPullDownRefresh()
  }, 800)
}

const touchState = ref({ startX: 0, current: null })

const closeOtherSwipes = (currentId) => {
  list.value.forEach((item) => {
    if (item.id !== currentId && item.swipeX !== 0) {
      item.swipeX = 0
    }
  })
}

const onTouchStart = (e, item) => {
  if (isGrid.value) return
  touchState.value.startX = e.touches[0].clientX
  touchState.value.current = item
  item.dragging = true
  isSwiping.value = true
  closeOtherSwipes(item.id)
}

const onTouchMove = (e, item) => {
  if (isGrid.value) return
  const deltaX = e.touches[0].clientX - touchState.value.startX
  if (deltaX < 0) {
    item.swipeX = Math.max(deltaX, -120)
  } else if (deltaX > 0) {
    item.swipeX = Math.min(deltaX, 0)
  }
}

const onTouchEnd = (e, item) => {
  if (isGrid.value) return
  item.dragging = false
  if (item.swipeX <= -60) {
    item.swipeX = -120
  } else {
    item.swipeX = 0
  }
  touchState.value.current = null
  isSwiping.value = false
}

const onTouchCancel = (item) => {
  if (isGrid.value) return
  item.dragging = false
  if (item.swipeX <= -60) {
    item.swipeX = -120
  } else {
    item.swipeX = 0
  }
  touchState.value.current = null
  isSwiping.value = false
}

const confirmDelete = (item) => {
  uni.showModal({
    title: '提示',
    content: '确定删除该收藏吗？',
    success: (res) => {
      if (res.confirm) {
        item.deleting = true
        setTimeout(() => {
          list.value = list.value.filter((i) => i.id !== item.id)
        }, 300)
      } else {
        item.swipeX = 0
      }
    }
  })
}

const onLongPress = (item) => {
  uni.showToast({
    title: `长按：${item.title}`,
    icon: 'none'
  })
}

const goDetail = (id) => {
  uni.navigateTo({
    url: `/pages/detail/detail?id=${id}`
  })
}

const goHome = () => {
  uni.switchTab({
    url: '/pages/index/index'
  })
}

const goMine = () => {
  uni.switchTab({
    url: '/pages/mine/mine'
  })
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.nav {
  padding: 80rpx 32rpx 20rpx;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: 34rpx;
  font-weight: 700;
}

.layout-toggle {
  height: 56rpx;
  padding: 0 10rpx;
  border-radius: 999rpx;
  background: #f2f3f5;
  color: #999;
  display: flex;
  align-items: center;
  gap: 10rpx;
  font-size: 28rpx;
  transition: transform 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.layout-toggle:active {
  transform: scale(0.9);
}

.layout-icon {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  transition: color 0.2s ease, background 0.2s ease;
}

.layout-icon.active {
  color: var(--main-color);
  background: rgba(var(--main-color-rgb), 0.15);
}

.list {
  flex: 1;
  padding: 24rpx;
  transition: all 0.3s ease;
}

.list.grid {
  padding-top: 20rpx;
}

.list-layout {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  transition: all 0.3s ease;
}

.swipe-item {
  position: relative;
  overflow: hidden;
}

.swipe-content {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  gap: 16rpx;
  padding: 16rpx;
  animation: item-enter 0.6s ease forwards;
  opacity: 1;
}

.swipe-item:not(.deleting) .swipe-content {
  animation: none;
}

.swipe-content:active {
  transform: scale(0.97);
}

.swipe-delete {
  position: absolute;
  right: 0;
  top: 0;
  width: 120rpx;
  height: 100%;
  background: #ef4444;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  z-index: 1;
}

.swipe-item {
  position: relative;
  overflow: hidden;
  background: #f5f5f5;
  padding: 8rpx 0;
}

.swipe-item .swipe-delete {
  top: 8rpx;
  height: calc(100% - 16rpx);
  border-radius: 16rpx;
}

.swipe-item .swipe-content {
  position: relative;
  z-index: 2;
}

.swipe-item.deleting {
  animation: item-delete 0.3s ease forwards;
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
  font-size: 28rpx;
}

.desc {
  color: #666;
  font-size: 24rpx;
}

.meta {
  color: #999;
  font-size: 22rpx;
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  transition: all 0.3s ease;
}

.grid-card {
  overflow: hidden;
  animation: item-enter 0.6s ease forwards;
  opacity: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.grid-card:active {
  transform: scale(0.97);
}

.grid-thumb {
  width: 100%;
  border-radius: 16rpx 16rpx 0 0;
}

.grid-info {
  padding: 16rpx;
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20rpx;
  color: #999;
}

.empty-icon {
  font-size: 64rpx;
}

.empty-text {
  font-size: 26rpx;
}

.empty-btn {
  padding: 14rpx 32rpx;
  background: var(--main-color);
  color: #fff;
  border-radius: 999rpx;
  font-size: 26rpx;
}

.empty-btn:active {
  transform: scale(0.97);
}

.card {
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.08);
}

.grid-card.card {
  border-radius: 16rpx;
}

.swipe-content.card {
  border-radius: 16rpx;
}

.list.grid .list-layout,
.list.grid .grid-layout {
  animation: layout-fade 0.3s ease;
}

@keyframes layout-fade {
  from {
    opacity: 0.6;
  }
  to {
    opacity: 1;
  }
}

@keyframes item-enter {
  from {
    opacity: 0;
    transform: translateY(12rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes item-delete {
  to {
    opacity: 0;
    transform: scale(0.9);
  }
}
</style>
