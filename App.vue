<script>
export default {
  onLaunch() {
    const theme = uni.getStorageSync('themeColor')
    if (theme) {
      uni.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: theme
      })
    }
  }
}
</script>

<style lang="scss">
@import "./uni.scss";
</style>
