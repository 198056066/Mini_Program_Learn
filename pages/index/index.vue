<template>
  <view class="page" :style="{ '--main-color': themeColor }">
    <view class="nav">
      <view class="title">灵感画报</view>
      <view class="tabs">
        <view class="tab active">推荐</view>
        <view class="tab">热榜</view>
        <view class="tab">关注</view>
      </view>
    </view>

    <scroll-view scroll-y class="feed">
      <view class="grid">
        <view class="card trans" v-for="item in cards" :key="item.id" @tap="goDetail(item.id)">
          <image class="cover" :src="item.cover" mode="aspectFill" />
          <view class="meta">
            <view class="name">{{ item.title }}</view>
            <view class="author">{{ item.author }}</view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { cards } from '@/data/cards'

const themeColor = ref('#6366f1')

onShow(() => {
  const savedColor = uni.getStorageSync('themeColor')
  if (savedColor) themeColor.value = savedColor
})

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
}

.nav {
  padding: 80rpx 32rpx 20rpx;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
}

.title {
  font-size: 36rpx;
  font-weight: 700;
  margin-bottom: 16rpx;
}

.tabs {
  display: flex;
  gap: 24rpx;
}

.tab {
  color: var(--text-light);
}

.tab.active {
  color: var(--text-color);
  font-weight: 600;
}

.feed {
  flex: 1;
}

.grid {
  padding: 24rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.cover {
  width: 100%;
  height: 260rpx;
  border-radius: 16rpx;
}

.meta {
  padding: 16rpx;
}

.name {
  font-weight: 600;
  margin-bottom: 6rpx;
}

.author {
  color: var(--text-light);
  font-size: 24rpx;
}
</style>
