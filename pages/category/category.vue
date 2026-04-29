<template>
  <view class="page">
    <view class="nav">
      <view class="title">分类</view>
    </view>
    <view class="content">
      <scroll-view scroll-y class="left">
        <view class="item active">潮流</view>
        <view class="item">摄影</view>
        <view class="item">插画</view>
        <view class="item">家居</view>
        <view class="item">艺术</view>
      </scroll-view>
      <scroll-view scroll-y class="right">
        <view class="card" v-for="item in list" :key="item.id">
          <image class="thumb" :src="item.cover" mode="aspectFill" />
          <view class="info">
            <view class="name">{{ item.title }}</view>
            <view class="desc">{{ item.desc }}</view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { categoryList } from '@/data/category'

const list = categoryList
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

.content {
  flex: 1;
  display: grid;
  grid-template-columns: 200rpx 1fr;
}

.left {
  background: #fff;
  padding: 24rpx 0;
}

.item {
  padding: 20rpx 24rpx;
  color: var(--text-light);
}

.item.active {
  color: var(--main-color);
  font-weight: 600;
}

.right {
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.card {
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

.desc {
  color: var(--text-light);
  font-size: 24rpx;
}
</style>
