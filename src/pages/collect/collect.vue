<template>
  <view class="page">
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
import { collectList } from '@/data/collect'

const list = collectList
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
