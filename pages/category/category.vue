<template>
  <view class="page" :style="{ '--main-color': themeColor, '--main-color-rgb': themeColorRgb }">
    <view class="nav">
      <view class="title">分类</view>
    </view>

    <view class="content">
      <scroll-view scroll-y class="left">
        <view class="left-header" @tap="toggleLeft">
          <view class="left-title">分类目录</view>
          <view class="left-arrow" :class="{ rotate: leftCollapsed }">⌃</view>
        </view>
        <view class="left-list" :class="{ collapsed: leftCollapsed }">
          <view
            v-for="(item, idx) in menuList"
            :key="item.id"
            class="left-item"
            :class="{ active: idx === selectedIndex }"
            @tap="selectMenu(idx)"
          >
            <view class="active-bar"></view>
            <view class="left-text">{{ item.title }}</view>
          </view>
        </view>
      </scroll-view>

      <scroll-view scroll-y class="right">
        <view class="right-header">
          <view class="right-title">{{ currentCategory.title }}</view>
          <view class="right-sub">共 {{ currentCategory.modules.length }} 个模块</view>
        </view>

        <view
          v-for="(module, mIndex) in currentCategory.modules"
          :key="module.id"
          class="module"
          :style="{ animationDelay: `${mIndex * 0.06}s` }"
        >
          <view class="module-header" @tap="toggleModule(module)">
            <view class="module-title">{{ module.title }}</view>
            <view class="module-arrow" :class="{ rotate: module.collapsed }">⌃</view>
          </view>
          <view class="module-body" :class="{ collapsed: module.collapsed }">
            <view class="grid">
              <view
                v-for="item in module.items"
                :key="item.id"
                class="grid-item"
              >
                <view class="grid-icon">{{ item.icon }}</view>
                <view class="grid-text">{{ item.title }}</view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
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

const menuList = ref([
  { id: 1, title: '推荐' },
  { id: 2, title: '摄影' },
  { id: 3, title: '设计' },
  { id: 4, title: '美食' },
  { id: 5, title: '旅行' },
  { id: 6, title: '学习' },
  { id: 7, title: '穿搭' },
  { id: 8, title: '动漫' }
])

const categories = ref([
  {
    id: 1,
    title: '推荐',
    modules: [
      {
        id: 11,
        title: '精选主题',
        collapsed: false,
        items: [
          { id: 'r-1', title: '热门', icon: '🔥' },
          { id: 'r-2', title: '趋势', icon: '✨' },
          { id: 'r-3', title: '灵感', icon: '💡' },
          { id: 'r-4', title: '精选', icon: '⭐' },
          { id: 'r-5', title: '风格', icon: '🎯' },
          { id: 'r-6', title: '色彩', icon: '🎨' },
          { id: 'r-7', title: '搭配', icon: '🧵' },
          { id: 'r-8', title: '空间', icon: '🏠' }
        ]
      },
      {
        id: 12,
        title: '本周热榜',
        collapsed: false,
        items: [
          { id: 'r-9', title: '夜景', icon: '🌃' },
          { id: 'r-10', title: '城市', icon: '🏙️' },
          { id: 'r-11', title: '胶片', icon: '🎞️' },
          { id: 'r-12', title: '建筑', icon: '🏛️' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: '摄影',
    modules: [
      {
        id: 21,
        title: '摄影题材',
        collapsed: false,
        items: [
          { id: 'p-1', title: '人像', icon: '📸' },
          { id: 'p-2', title: '风景', icon: '⛰️' },
          { id: 'p-3', title: '街拍', icon: '🧭' },
          { id: 'p-4', title: '静物', icon: '🍃' },
          { id: 'p-5', title: '黑白', icon: '🖤' },
          { id: 'p-6', title: '夜景', icon: '🌙' },
          { id: 'p-7', title: '建筑', icon: '🏗️' },
          { id: 'p-8', title: '航拍', icon: '🚁' }
        ]
      }
    ]
  },
  {
    id: 3,
    title: '设计',
    modules: [
      {
        id: 31,
        title: '视觉设计',
        collapsed: false,
        items: [
          { id: 'd-1', title: '排版', icon: '🔤' },
          { id: 'd-2', title: '海报', icon: '🪧' },
          { id: 'd-3', title: '图形', icon: '🟪' },
          { id: 'd-4', title: '配色', icon: '🧩' },
          { id: 'd-5', title: '插画', icon: '🖍️' },
          { id: 'd-6', title: '品牌', icon: '🏷️' },
          { id: 'd-7', title: 'UI', icon: '📱' },
          { id: 'd-8', title: '动效', icon: '🎬' }
        ]
      }
    ]
  },
  {
    id: 4,
    title: '美食',
    modules: [
      {
        id: 41,
        title: '口味灵感',
        collapsed: false,
        items: [
          { id: 'f-1', title: '甜品', icon: '🍰' },
          { id: 'f-2', title: '咖啡', icon: '☕' },
          { id: 'f-3', title: '轻食', icon: '🥗' },
          { id: 'f-4', title: '中式', icon: '🥟' },
          { id: 'f-5', title: '日式', icon: '🍣' },
          { id: 'f-6', title: '烘焙', icon: '🥐' }
        ]
      }
    ]
  },
  {
    id: 5,
    title: '旅行',
    modules: [
      {
        id: 51,
        title: '目的地',
        collapsed: false,
        items: [
          { id: 't-1', title: '海岛', icon: '🏝️' },
          { id: 't-2', title: '山野', icon: '🏔️' },
          { id: 't-3', title: '城市', icon: '🚇' },
          { id: 't-4', title: '露营', icon: '⛺' }
        ]
      }
    ]
  },
  {
    id: 6,
    title: '学习',
    modules: [
      {
        id: 61,
        title: '学习方向',
        collapsed: false,
        items: [
          { id: 's-1', title: '编程', icon: '💻' },
          { id: 's-2', title: '摄影', icon: '📷' },
          { id: 's-3', title: '绘画', icon: '🖌️' },
          { id: 's-4', title: '语言', icon: '🗣️' },
          { id: 's-5', title: '运动', icon: '🏃' },
          { id: 's-6', title: '乐器', icon: '🎸' }
        ]
      }
    ]
  },
  {
    id: 7,
    title: '穿搭',
    modules: [
      {
        id: 71,
        title: '风格分类',
        collapsed: false,
        items: [
          { id: 'o-1', title: '机能', icon: '🧥' },
          { id: 'o-2', title: '街头', icon: '👟' },
          { id: 'o-3', title: '极简', icon: '⚪' },
          { id: 'o-4', title: '复古', icon: '🕰️' }
        ]
      }
    ]
  },
  {
    id: 8,
    title: '动漫',
    modules: [
      {
        id: 81,
        title: '风格标签',
        collapsed: false,
        items: [
          { id: 'a-1', title: '热血', icon: '⚡' },
          { id: 'a-2', title: '治愈', icon: '🌈' },
          { id: 'a-3', title: '悬疑', icon: '🕵️' },
          { id: 'a-4', title: '科幻', icon: '🛰️' }
        ]
      }
    ]
  }
])

const selectedIndex = ref(0)
const currentCategory = computed(() => categories.value[selectedIndex.value] || categories.value[0])
const leftCollapsed = ref(false)

const selectMenu = (idx) => {
  selectedIndex.value = idx
}

const toggleLeft = () => {
  leftCollapsed.value = !leftCollapsed.value
}

const toggleModule = (module) => {
  module.collapsed = !module.collapsed
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f7f8fa;
}

.nav {
  padding: 80rpx 32rpx 20rpx;
  background: #fff;
  box-shadow: 0 6rpx 24rpx rgba(0, 0, 0, 0.06);
  border-radius: 0 0 24rpx 24rpx;
}

.title {
  font-size: 34rpx;
  font-weight: 700;
}

.content {
  flex: 1;
  display: flex;
  min-height: 0;
}

.left {
  width: 200rpx;
  background: #f7f8fa;
  padding: 20rpx 0;
  box-shadow: inset -1rpx 0 0 rgba(0, 0, 0, 0.05);
}

.left-header {
  padding: 0 20rpx 16rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left-title {
  font-size: 26rpx;
  color: #333;
  font-weight: 600;
}

.left-arrow {
  font-size: 24rpx;
  transition: transform 0.3s ease;
}

.left-arrow.rotate {
  transform: rotate(180deg);
}

.left-list {
  transition: max-height 0.4s ease-in-out, opacity 0.4s ease-in-out;
  max-height: 1000rpx;
  opacity: 1;
}

.left-list.collapsed {
  max-height: 0;
  opacity: 0;
}

.left-item {
  height: 88rpx;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  gap: 12rpx;
  color: #666;
  position: relative;
  transition: all 0.3s ease;
}

.active-bar {
  width: 6rpx;
  height: 32rpx;
  border-radius: 999rpx;
  background: transparent;
  transition: all 0.3s ease;
}

.left-item.active {
  color: var(--main-color);
  background: rgba(var(--main-color-rgb), 0.08);
}

.left-item.active .active-bar {
  background: var(--main-color);
}

.left-text {
  flex: 1;
  font-size: 26rpx;
}

.right {
  flex: 1;
  background: #fff;
  padding: 24rpx;
}

.right-header {
  margin-bottom: 20rpx;
}

.right-title {
  font-size: 30rpx;
  font-weight: 700;
}

.right-sub {
  margin-top: 8rpx;
  color: #999;
  font-size: 22rpx;
}

.module {
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.06);
  padding: 16rpx;
  margin-bottom: 20rpx;
  opacity: 0;
  transform: translateY(16rpx);
  animation: module-enter 0.6s ease forwards;
}

.module-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.module-title {
  font-size: 28rpx;
  font-weight: 600;
}

.module-arrow {
  transition: transform 0.3s ease;
}

.module-arrow.rotate {
  transform: rotate(180deg);
}

.module-body {
  margin-top: 16rpx;
  transition: max-height 0.4s ease-in-out, opacity 0.4s ease-in-out;
  max-height: 1000rpx;
  opacity: 1;
  overflow: hidden;
}

.module-body.collapsed {
  max-height: 0;
  opacity: 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16rpx;
}

.grid-item {
  background: #f7f8fa;
  border-radius: 16rpx;
  padding: 16rpx 8rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.grid-item:active {
  transform: scale(0.95);
  box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.08);
}

.grid-icon {
  font-size: 40rpx;
}

.grid-text {
  font-size: 24rpx;
  color: #333;
}

@keyframes module-enter {
  from {
    opacity: 0;
    transform: translateY(16rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
