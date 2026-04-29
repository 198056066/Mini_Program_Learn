<template>
  <view class="page">
    <view class="nav">
      <view class="back" @tap="goBack">返回</view>
      <view class="title">内容详情</view>
    </view>
    <scroll-view scroll-y class="content">
      <image class="hero" :src="detail.cover" mode="aspectFill" />
      <view class="card info">
        <view class="name">{{ detail.title }}</view>
        <view class="meta">{{ detail.author }} · {{ detail.time }}</view>
        <view class="desc">{{ detail.desc }}</view>
      </view>
      <view class="actions">
        <button class="btn" @tap="toggleCollect">{{ detail.collected ? '已收藏' : '收藏' }}</button>
        <button class="btn ghost">分享</button>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onLoad } from 'vue'
import { detailMap } from '@/data/detail'

const detail = ref({
  title: '',
  author: '',
  time: '',
  desc: '',
  cover: '',
  collected: false
})

const goBack = () => {
  uni.navigateBack()
}

const toggleCollect = () => {
  detail.value.collected = !detail.value.collected
}

onLoad((query) => {
  const id = query?.id || 1
  detail.value = {
    ...detailMap[id],
    collected: false
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
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.back {
  color: var(--main-color);
}

.title {
  font-size: 32rpx;
  font-weight: 600;
}

.content {
  flex: 1;
}

.hero {
  width: 100%;
  height: 420rpx;
}

.info {
  margin: 24rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.name {
  font-size: 32rpx;
  font-weight: 700;
}

.meta {
  color: var(--text-light);
  font-size: 24rpx;
}

.desc {
  color: var(--text-color);
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 24rpx;
  padding: 0 24rpx 40rpx;
}

.btn {
  flex: 1;
  height: 84rpx;
  border-radius: 16rpx;
  background: var(--main-color);
  color: #fff;
  font-size: 28rpx;
}

.btn.ghost {
  background: #fff;
  color: var(--main-color);
  border: 2rpx solid rgba(99, 102, 241, 0.3);
}
</style>
