<template>
  <view class="page" :style="{ '--main-color': themeColor, '--main-color-rgb': themeColorRgb }">
    <view class="nav" :style="navStyle">
      <view class="nav-btn" @tap="goBack">
        <text class="icon">←</text>
      </view>
      <view class="nav-title">灵感画报</view>
      <view class="nav-btn" @tap="goSetting">
        <text class="icon">⚙</text>
      </view>
    </view>

    <scroll-view
      scroll-y
      class="feed"
      :scroll-top="scrollTop"
      @scroll="handleScroll"
      refresher-enabled
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onPullRefresh"
      @scrolltolower="onReachBottom"
    >
      <view class="banner">
        <swiper class="swiper" circular autoplay indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#ffffff">
          <swiper-item v-for="(item, idx) in bannerList" :key="idx">
            <image class="banner-img" :src="item" mode="aspectFill" />
          </swiper-item>
        </swiper>
      </view>

      <view class="quick-actions">
        <view class="quick-btn" @tap="goCategory">分类页</view>
      </view>

      <scroll-view scroll-x class="tabs" :show-scrollbar="false" @scroll="onTabsScroll">
        <view class="tabs-inner">
          <view
            v-for="(item, idx) in tabList"
            :key="item.id"
            class="tab tab-item"
            :class="{ active: idx === selectedTab }"
            @tap="selectTab(idx)"
          >
            {{ item.title }}
          </view>
          <view class="tab-underline" :style="tabUnderlineStyle"></view>
        </view>
      </scroll-view>

      <view class="grid">
        <view
          class="card trans card-item"
          v-for="(item, idx) in filteredCards"
          :key="item.id"
          :style="{ animationDelay: `${idx * 0.06}s` }"
          @tap="goDetail(item.id)"
        >
          <image class="cover" :src="item.cover" mode="aspectFill" :style="{ height: `${item.coverHeight}rpx` }" />
          <view class="meta">
            <view class="name">{{ item.title }}</view>
            <view class="desc">{{ item.desc }}</view>
            <view class="foot">
              <view class="tag">{{ item.tag }}</view>
              <view class="views">{{ item.views }} 浏览</view>
            </view>
          </view>
        </view>
      </view>

      <view class="load-state">
        <view v-if="isLoading">加载中...</view>
        <view v-else-if="noMore">没有更多内容</view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed, nextTick, getCurrentInstance } from 'vue'
import { onShow, onReady } from '@dcloudio/uni-app'

const instance = getCurrentInstance()
const tabRects = ref([])
const tabsInnerLeft = ref(0)
const tabScrollLeft = ref(0)
const measureTabs = () => {
  const query = uni.createSelectorQuery().in(instance)
  query.select('.tabs-inner').boundingClientRect()
  query.select('.tabs').scrollOffset()
  query.selectAll('.tab').boundingClientRect()
  query.exec((res) => {
    const inner = res[0]
    const scroll = res[1]
    const tabs = res[2] || []
    if (!inner || !tabs.length) return
    tabsInnerLeft.value = inner.left
    tabScrollLeft.value = scroll?.scrollLeft || 0
    tabRects.value = tabs
  })
}

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

onReady(() => {
  nextTick(() => {
    measureTabs()
  })
})

const tabUnderlineStyle = computed(() => {
  const rect = tabRects.value[selectedTab.value]
  if (!rect) return {}
  const width = rect.width
  const left = rect.left - tabsInnerLeft.value + tabScrollLeft.value
  return {
    width: `${width}px`,
    transform: `translateX(${left}px)`
  }
})

const onTabsScroll = (e) => {
  tabScrollLeft.value = e.detail.scrollLeft
}

const syncTabs = () => {
  nextTick(() => {
    measureTabs()
  })
}

const selectTab = (idx) => {
  selectedTab.value = idx
  syncTabs()
}

const handleScroll = (e) => {
  const top = e.detail.scrollTop
  scrollTop.value = top
  navOpacity.value = Math.min(1, top / 120)
}

const bannerList = ref([
  '/static/images/cover-1.jpg',
  '/static/images/cover-2.jpg',
  '/static/images/cover-3.jpg',
  '/static/images/cover-4.jpg',
  '/static/images/cover-5.jpg'
])

const tabList = ref([
  { id: 1, title: '推荐' },
  { id: 2, title: '热榜' },
  { id: 3, title: '风格' },
  { id: 4, title: '建筑' },
  { id: 5, title: '摄影' },
  { id: 6, title: '生活' },
  { id: 7, title: '治愈' }
])

const allCards = ref([
  {
    id: 1,
    title: '街头机能穿搭',
    desc: '冷感结构与层次堆叠，让日常也有强烈态度。',
    cover: '/static/images/cover-1.jpg',
    coverHeight: 300,
    span: 28,
    tag: '机能风',
    views: '12.4k',
    group: 1
  },
  {
    id: 2,
    title: '霓虹城市夜景',
    desc: '灯光色块碰撞，打造高饱和都市氛围。',
    cover: '/static/images/cover-2.jpg',
    coverHeight: 260,
    span: 24,
    tag: '热榜',
    views: '9.1k',
    group: 2
  },
  {
    id: 3,
    title: '胶片感日常',
    desc: '柔和颗粒感的光影，让瞬间更有温度。',
    cover: '/static/images/cover-3.jpg',
    coverHeight: 340,
    span: 32,
    tag: '摄影',
    views: '7.8k',
    group: 5
  },
  {
    id: 4,
    title: '极简家居',
    desc: '留白与秩序感，让空间呼吸。',
    cover: '/static/images/cover-4.jpg',
    coverHeight: 280,
    span: 26,
    tag: '生活',
    views: '5.3k',
    group: 6
  },
  {
    id: 5,
    title: '雨夜街角',
    desc: '低饱和冷调，城市角落也能浪漫。',
    cover: '/static/images/cover-5.jpg',
    coverHeight: 320,
    span: 30,
    tag: '治愈',
    views: '6.7k',
    group: 7
  },
  {
    id: 6,
    title: '现代建筑构图',
    desc: '几何线条与光影的秩序美学。',
    cover: '/static/images/cover-6.jpg',
    coverHeight: 260,
    span: 24,
    tag: '建筑',
    views: '4.6k',
    group: 4
  }
])

const selectedTab = ref(0)
const filteredCards = computed(() => {
  if (selectedTab.value === 0) return allCards.value
  const group = tabList.value[selectedTab.value]?.id
  return allCards.value.filter((item) => item.group === group)
})

const scrollTop = ref(0)
const navOpacity = ref(0)
const navStyle = computed(() => {
  const alpha = navOpacity.value
  const color = alpha > 0.6 ? '#333' : '#fff'
  return {
    background: `rgba(255,255,255,${alpha})`,
    color
  }
})

const isRefreshing = ref(false)
const isLoading = ref(false)
const noMore = ref(false)
let page = 1

const onPullRefresh = () => {
  if (isRefreshing.value) return
  isRefreshing.value = true
  noMore.value = false
  page = 1
  setTimeout(() => {
    isRefreshing.value = false
  }, 2000)
}

const onReachBottom = () => {
  if (isLoading.value || noMore.value) return
  isLoading.value = true
  setTimeout(() => {
    if (page >= 3) {
      noMore.value = true
    } else {
      allCards.value = allCards.value.concat(
        allCards.value.map((item) => ({
          ...item,
          id: Math.random().toString(36).slice(2)
        }))
      )
      page += 1
    }
    isLoading.value = false
  }, 1000)
}

const goDetail = (id) => {
  uni.navigateTo({
    url: `/pages/detail/detail?id=${id}`
  })
}

const goBack = () => {
  uni.navigateBack()
}

const goSetting = () => {
  uni.navigateTo({
    url: '/pages/setting/setting'
  })
}

const goCategory = () => {
  uni.navigateTo({
    url: '/pages/category/category'
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  height: 96rpx;
  padding: 0 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
}

.nav-title {
  font-size: 32rpx;
  font-weight: 700;
}

.nav-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.nav .icon {
  font-size: 32rpx;
}

.feed {
  flex: 1;
  padding-top: 96rpx;
}

.banner {
  padding: 0 24rpx;
  margin-top: 12rpx;
}

.swiper {
  width: 100%;
  height: 360rpx;
  border-radius: 24rpx;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: 100%;
}

.quick-actions {
  padding: 0 24rpx;
  margin-top: 16rpx;
}

.quick-btn {
  height: 72rpx;
  border-radius: 16rpx;
  background: #fff;
  color: var(--main-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.quick-btn:active {
  transform: scale(0.97);
  box-shadow: 0 10rpx 24rpx rgba(0, 0, 0, 0.12);
}

.tabs {
  margin: 24rpx 0 12rpx;
  padding-left: 24rpx;
}

.tabs-inner {
  position: relative;
  display: flex;
  align-items: center;
  gap: 32rpx;
  height: 80rpx;
  background: #fff;
  border-radius: 999rpx;
  padding: 0 24rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.06);
}

.tab {
  color: #999;
  font-size: 26rpx;
  line-height: 80rpx;
  padding: 0 8rpx;
  position: relative;
  transition: all 0.3s ease;
}

.tab.active {
  color: var(--main-color);
  font-weight: 600;
}

.tab-underline {
  position: absolute;
  bottom: 14rpx;
  left: 0;
  height: 6rpx;
  border-radius: 999rpx;
  background: var(--main-color);
  transition: transform 0.3s ease;
}

.tab-item {
  align-self: start;
}

.card-item {
  align-self: start;
}

.grid {
  padding: 24rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rpx;
}

.card-item {
  align-self: start;
}

.card-item {
  opacity: 0;
  transform: translateY(20rpx);
  animation: card-enter 0.6s ease forwards;
}

.card {
  width: 100%;
}

.card-item:active {
  transform: scale(0.97);
  box-shadow: 0 10rpx 26rpx rgba(0, 0, 0, 0.12);
}

.cover {
  width: 100%;
  border-radius: 16rpx 16rpx 0 0;
}

.meta {
  padding: 16rpx 16rpx 20rpx;
}

.name {
  font-weight: 600;
  font-size: 28rpx;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.desc {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #999;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.foot {
  margin-top: 12rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 22rpx;
  color: #999;
}

.tag {
  color: var(--main-color);
  background: rgba(var(--main-color-rgb), 0.12);
  padding: 4rpx 12rpx;
  border-radius: 999rpx;
}

.load-state {
  padding: 16rpx 0 40rpx;
  text-align: center;
  color: #999;
  font-size: 24rpx;
}

@keyframes card-enter {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
