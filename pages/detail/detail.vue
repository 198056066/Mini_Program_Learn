<template>
  <view class="page" :style="{ '--main-color': themeColor, '--main-color-rgb': themeColorRgb }">
    <view class="nav" :style="navStyle">
      <view class="nav-btn" :style="navIconStyle" @tap="goBack">←</view>
      <view class="nav-title">内容详情</view>
      <view class="nav-placeholder"></view>
    </view>

    <scroll-view
      scroll-y
      class="content"
      :scroll-top="scrollTop"
      @scroll="handleScroll"
    >
      <view class="hero-wrap" :style="heroStyle" @tap="previewHero">
        <image class="hero" :src="detail.cover" mode="aspectFill" />
      </view>

      <view class="card info">
        <view class="name">{{ detail.title }}</view>
        <view class="author">
          <image class="avatar" :src="detail.avatar" mode="aspectFill" />
          <view class="author-meta">
            <view class="author-name">{{ detail.author }}</view>
            <view class="author-time">{{ detail.time }}</view>
          </view>
        </view>
        <view class="tags">
          <view v-for="tag in detail.tags" :key="tag" class="tag">{{ tag }}</view>
        </view>
        <view class="desc">{{ detail.desc }}</view>
      </view>

      <view class="article">
        <view class="paragraph" v-for="(p, idx) in detail.body.intro" :key="`intro-${idx}`">{{ p }}</view>
        <image
          v-for="(img, idx) in detail.body.images"
          :key="`img-${idx}`"
          class="article-image"
          :src="img"
          mode="aspectFill"
          @tap="previewImage(img)"
        />
        <view
          class="article-body"
          :class="{ collapsed: !bodyExpanded }"
        >
          <view class="paragraph" v-for="(p, idx) in detail.body.paragraphs" :key="`p-${idx}`">{{ p }}</view>
          <view class="quote">{{ detail.body.quote }}</view>
          <view class="highlight">{{ detail.body.highlight }}</view>
        </view>
        <view class="toggle" @tap="toggleBody">
          {{ bodyExpanded ? '收起全文' : '展开全文' }}
        </view>
      </view>

      <view class="timeline">
        <view class="section-title">步骤时间线</view>
        <view
          class="timeline-item"
          v-for="(step, idx) in detail.timeline"
          :key="step.id"
          :class="{ active: timelineVisible }"
          :style="{ animationDelay: `${idx * 0.08}s` }"
        >
          <view class="timeline-index">{{ idx + 1 }}</view>
          <view class="timeline-dot"></view>
          <view class="timeline-line"></view>
          <view class="timeline-card">
            <view class="timeline-title">{{ step.title }}</view>
            <view class="timeline-desc">{{ step.desc }}</view>
          </view>
        </view>
      </view>

      <view class="related">
        <view class="section-title">相关推荐</view>
        <scroll-view scroll-x class="related-scroll" :show-scrollbar="false">
          <view class="related-list">
            <view
              class="related-card"
              v-for="item in detail.related"
              :key="item.id"
              @tap="goDetail(item.id)"
            >
              <image class="related-image" :src="item.cover" mode="aspectFill" />
              <view class="related-title">{{ item.title }}</view>
            </view>
          </view>
        </scroll-view>
      </view>
    </scroll-view>

    <view class="action-bar">
      <view class="action-btn" :class="{ active: liked }" @tap="toggleLike">
        <view class="action-icon">♥</view>
        <view class="action-text">点赞</view>
      </view>
      <view class="action-btn" :class="{ active: collected }" @tap="toggleCollect">
        <view class="action-icon">★</view>
        <view class="action-text">收藏</view>
      </view>
      <view class="action-btn" @tap="share">
        <view class="action-icon">⇪</view>
        <view class="action-text">分享</view>
      </view>
    </view>

    <view class="to-top" :class="{ show: showToTop }" @tap="backToTop">↑</view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { detailMap } from '@/data/detail'

const themeColor = ref('#6366f1')
const themeColorRgb = ref('99, 102, 241')
const detail = ref({
  ...detailMap[1]
})

const hexToRgb = (hex) => {
  const value = hex.replace('#', '')
  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)
  return `${r}, ${g}, ${b}`
}

onLoad((query) => {
  const id = Number(query?.id || 1)
  detail.value = {
    ...(detailMap[id] || detailMap[1])
  }
})

onShow(() => {
  const savedColor = uni.getStorageSync('themeColor')
  if (savedColor) {
    themeColor.value = savedColor
    themeColorRgb.value = hexToRgb(savedColor)
  }
})

const scrollTop = ref(0)
const navOpacity = ref(0)
const showToTop = ref(false)
const timelineVisible = ref(true)

const handleScroll = (e) => {
  const top = e.detail.scrollTop
  scrollTop.value = top
  navOpacity.value = Math.min(1, top / 200)
  showToTop.value = top > 400
  if (top > 900) timelineVisible.value = true
}

const navStyle = computed(() => {
  const alpha = navOpacity.value
  const color = alpha > 0.6 ? '#333' : '#fff'
  return {
    background: `rgba(255,255,255,${alpha})`,
    color
  }
})

const navIconStyle = computed(() => {
  const alpha = navOpacity.value
  return {
    background: alpha > 0.6 ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.2)',
    borderColor: alpha > 0.6 ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.2)',
    color: alpha > 0.6 ? '#333' : '#fff'
  }
})

const heroStyle = computed(() => {
  const scale = 1.05 + Math.min(scrollTop.value / 1200, 0.05)
  return {
    transform: `scale(${scale})`,
    transformOrigin: 'center top'
  }
})

const bodyExpanded = ref(false)
const toggleBody = () => {
  bodyExpanded.value = !bodyExpanded.value
}

const liked = ref(false)
const collected = ref(false)

const toggleLike = () => {
  liked.value = !liked.value
}

const toggleCollect = () => {
  collected.value = !collected.value
}

const share = () => {
  uni.showToast({ title: '已分享', icon: 'success' })
}

const previewHero = () => {
  previewImage(detail.value.cover)
}

const previewImage = (url) => {
  uni.previewImage({
    urls: [url],
    current: url
  })
}

const backToTop = () => {
  scrollTop.value = 0
}

const goBack = () => {
  uni.navigateBack()
}

const goDetail = (id) => {
  uni.navigateTo({
    url: `/pages/detail/detail?id=${id}`
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

.nav-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  font-size: 28rpx;
}

.nav-title {
  font-size: 32rpx;
  font-weight: 700;
}

.nav-placeholder {
  width: 64rpx;
  height: 64rpx;
}

.content {
  flex: 1;
  padding-top: 0;
  padding-bottom: 140rpx;
}

.hero-wrap {
  width: 100%;
  height: 480rpx;
  overflow: hidden;
}

.info {
  margin: -80rpx 24rpx 24rpx;
  position: relative;
  z-index: 2;
}

.hero {
  width: 100%;
  height: 480rpx;
}

.card {
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.08);
}

.info {
  margin: -40rpx 24rpx 24rpx;
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.name {
  font-size: 44rpx;
  font-weight: 700;
  line-height: 1.3;
}

.author {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.avatar {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
}

.author-name {
  font-weight: 600;
}

.author-time {
  font-size: 24rpx;
  color: #999;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
}

.tag {
  padding: 6rpx 14rpx;
  font-size: 20rpx;
  border-radius: 8rpx;
  background: rgba(var(--main-color-rgb), 0.12);
  color: var(--main-color);
}

.desc {
  font-size: 30rpx;
  line-height: 1.6;
  color: #333;
}

.article {
  margin: 0 24rpx 24rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx 30rpx 32rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.06);
}

.paragraph {
  font-size: 30rpx;
  line-height: 1.6;
  color: #333;
  margin-bottom: 24rpx;
  letter-spacing: 1rpx;
}

.article-image {
  width: 100%;
  height: 360rpx;
  border-radius: 16rpx;
  margin: 8rpx 0 24rpx;
}

.article-body {
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
  max-height: 1000rpx;
}

.article-body.collapsed {
  max-height: 360rpx;
}

.quote {
  padding: 16rpx 20rpx;
  background: #f7f7f7;
  border-left: 6rpx solid var(--main-color);
  margin-bottom: 24rpx;
  color: #555;
  border-radius: 12rpx;
}

.highlight {
  padding: 16rpx 20rpx;
  background: rgba(var(--main-color-rgb), 0.1);
  color: var(--main-color);
  border-radius: 12rpx;
  font-weight: 600;
  margin-bottom: 24rpx;
}

.toggle {
  text-align: center;
  color: var(--main-color);
  font-weight: 600;
}

.timeline {
  margin: 0 24rpx 24rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.06);
}

.section-title {
  font-size: 30rpx;
  font-weight: 700;
  margin-bottom: 16rpx;
}

.timeline-item {
  position: relative;
  padding-left: 56rpx;
  margin-bottom: 24rpx;
  opacity: 1;
  transform: translateX(0);
}

.timeline-index {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 20rpx;
  color: #999;
}

.timeline-item.active {
  animation-play-state: running;
}

.timeline-dot {
  position: absolute;
  left: 0;
  top: 6rpx;
  width: 18rpx;
  height: 18rpx;
  background: var(--main-color);
  border-radius: 50%;
  border: 4rpx solid #fff;
  box-shadow: 0 0 0 4rpx rgba(var(--main-color-rgb), 0.15);
}

.timeline-line {
  position: absolute;
  left: 8rpx;
  top: 28rpx;
  width: 2rpx;
  height: calc(100% - 8rpx);
  background: #e0e0e0;
}

.timeline-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 16rpx;
  box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.06);
}

.timeline-title {
  font-weight: 600;
  margin-bottom: 8rpx;
}

.timeline-desc {
  color: #666;
  font-size: 24rpx;
  line-height: 1.5;
}

.related {
  margin: 0 0 24rpx;
}

.related-scroll {
  padding-left: 24rpx;
}

.related-list {
  display: flex;
  gap: 16rpx;
  padding-right: 24rpx;
}

.related-card {
  width: 240rpx;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.related-card:active {
  transform: scale(0.96);
}

.related-image {
  width: 100%;
  height: 160rpx;
}

.related-title {
  padding: 12rpx;
  font-size: 24rpx;
}

.action-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100rpx;
  background: #fff;
  box-shadow: 0 -8rpx 20rpx rgba(0, 0, 0, 0.06);
  display: flex;
}

.action-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6rpx;
  transition: transform 0.2s ease;
}

.action-btn:active {
  transform: scale(0.9);
}

.action-icon {
  font-size: 28rpx;
}

.action-btn.active .action-icon {
  color: #ef4444;
  animation: pulse 0.3s ease;
}

.action-btn.active .action-text {
  color: var(--main-color);
}

.action-text {
  font-size: 22rpx;
  color: #333;
}

.to-top {
  position: fixed;
  right: 24rpx;
  bottom: 140rpx;
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 10rpx 24rpx rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--main-color);
  opacity: 0;
  transform: translateY(10rpx);
  transition: all 0.3s ease;
}

.to-top.show {
  opacity: 1;
  transform: translateY(0);
}

@keyframes timeline-enter {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  50% {
    transform: scale(1.15);
  }
}
</style>
