<template>
  <!-- 启动页整体容器：全屏渐变 + 入场动画 -->
  <view
  class="page"
  :class="{ 'is-enter': isEnter }"
  :style="{ '--main-color': themeColor, '--main-color-rgb': themeColorRgb }"
>
    <!-- 内容区：垂直/水平居中 -->
    <view class="content">
      <!-- 顶部标题区 -->
      <view class="header">
        <view class="title">
          <!-- 逐字动画：每个字符单独控制延迟 -->
          <text
            v-for="(char, index) in titleChars"
            :key="index"
            class="title-char"
            :style="{ animationDelay: `${index * 0.08}s` }"
          >
            {{ char }}
          </text>
        </view>
        <view class="subtitle">解锁布局与动效的灵感画报</view>
      </view>

      <!-- 中间图标区：轻微上下浮动 -->
      <view class="icon-wrap">
        <view class="icon"></view>
      </view>
    </view>

    <!-- 底部按钮区：固定到底部（使用 margin-top: auto） -->
    <view class="footer">
      <button class="start-btn" @tap="goIndex">开始探索</button>
      <button class="ghost-btn" @tap="goSetting">主题设置</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 页面入场开关：onShow 置为 true 触发淡入
      isEnter: false,
      // 标题拆分为字符数组，便于逐字动画
      titleChars: '欢迎来到灵感画报'.split(''),
      // 主题色与 RGB 变量
      themeColor: '#6366f1',
      themeColorRgb: '99, 102, 241'
    }
  },
  onShow() {
    // 页面显示时触发入场动画
    this.isEnter = true
    const savedColor = uni.getStorageSync('themeColor')
    if (savedColor) {
      this.themeColor = savedColor
      this.themeColorRgb = this.hexToRgb(savedColor)
    }
  },
  methods: {
    // 点击跳转首页
    goIndex() {
      uni.navigateTo({
        url: '/pages/index/index'
      })
    },
    // 点击跳转设置页
    goSetting() {
      uni.navigateTo({
        url: '/pages/setting/setting'
      })
    },
    // 将 #RRGGBB 转成 "r, g, b" 字符串，用于 rgba
    hexToRgb(hex) {
      const value = hex.replace('#', '')
      const r = parseInt(value.slice(0, 2), 16)
      const g = parseInt(value.slice(2, 4), 16)
      const b = parseInt(value.slice(4, 6), 16)
      return `${r}, ${g}, ${b}`
    }
  }
}
</script>

<style scoped>
/* 整体容器：全屏渐变 + 初始透明，用于入场动画 */
.page {
  min-height: 100vh;
  padding: 80rpx 40rpx 60rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    180deg,
    var(--main-color) 0%,
    rgba(var(--main-color-rgb), 0.45) 45%,
    #f5f6ff 100%
  );
  opacity: 0;
  transform: translateY(20rpx);
}

/* 入场动画触发类 */
.page.is-enter {
  animation: page-enter 0.6s ease forwards;
}

/* 内容区：垂直/水平居中 */
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 48rpx;
}

/* 标题区：居中对齐 */
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  text-align: center;
}

/* 主标题：逐字动画承载容器 */
.title {
  display: flex;
  gap: 6rpx;
  flex-wrap: wrap;
  justify-content: center;
}

/* 单个字符：淡入上移 */
.title-char {
  font-size: 52rpx;
  font-weight: 700;
  color: #ffffff;
  opacity: 0;
  animation: title-fade 0.6s ease forwards;
}

/* 副标题 */
.subtitle {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.8);
}

/* 图标容器 */
.icon-wrap {
  width: 220rpx;
  height: 220rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 图标本体：浮动动画 */
.icon {
  width: 180rpx;
  height: 180rpx;
  border-radius: 40rpx;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 12rpx 40rpx rgba(0, 0, 0, 0.15);
  animation: icon-float 3s ease-in-out infinite;
}

/* 底部按钮区：贴近底部 */
.footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

/* 主按钮：呼吸动画 + 按压缩放 */
.start-btn {
  height: 96rpx;
  border-radius: 20rpx;
  font-size: 30rpx;
  font-weight: 600;
  color: #ffffff;
  background: var(--main-color);
  box-shadow: 0 10rpx 30rpx rgba(var(--main-color-rgb), 0.35);
  animation: btn-breathe 1.8s ease-in-out infinite;
  transition: transform 0.15s ease;
}

/* 按下缩小反馈 */
.start-btn:active {
  transform: scale(0.96);
}

/* 次按钮：轻量样式 */
.ghost-btn {
  height: 88rpx;
  border-radius: 20rpx;
  font-size: 28rpx;
  color: var(--main-color);
  background: rgba(255, 255, 255, 0.9);
  border: 2rpx solid rgba(var(--main-color-rgb), 0.25);
  transition: transform 0.15s ease;
}

/* 次按钮按压反馈 */
.ghost-btn:active {
  transform: scale(0.96);
}

/* 页面入场动画：淡入 + 上移 */
@keyframes page-enter {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 标题逐字动画 */
@keyframes title-fade {
  from {
    opacity: 0;
    transform: translateY(10rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 图标浮动动画 */
@keyframes icon-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10rpx);
  }
}

/* 按钮呼吸动画 */
@keyframes btn-breathe {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 10rpx 30rpx rgba(var(--main-color-rgb), 0.35);
  }
  50% {
    transform: scale(1.03);
    box-shadow: 0 14rpx 40rpx rgba(var(--main-color-rgb), 0.45);
  }
}
</style>
