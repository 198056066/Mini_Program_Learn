"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "setting",
  setup(__props) {
    const selectedColor = common_vendor.ref("#6366f1");
    const themeColor = common_vendor.computed(() => selectedColor.value);
    const themeColorRgb = common_vendor.ref("99, 102, 241");
    const allowMobilePlay = common_vendor.ref(false);
    const showDrawer = common_vendor.ref(false);
    const fontSize = common_vendor.ref(28);
    const fontSizes = [
      { label: "小号", value: 24 },
      { label: "标准", value: 28 },
      { label: "偏大", value: 32 },
      { label: "超大", value: 36 }
    ];
    const hexToRgb = (hex) => {
      const value = hex.replace("#", "");
      const r = parseInt(value.slice(0, 2), 16);
      const g = parseInt(value.slice(2, 4), 16);
      const b = parseInt(value.slice(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    };
    common_vendor.onLoad(() => {
      const savedColor = common_vendor.index.getStorageSync("themeColor");
      const savedFontSize = common_vendor.index.getStorageSync("fontSize");
      const savedMobilePlay = common_vendor.index.getStorageSync("allowMobilePlay");
      if (savedColor) {
        selectedColor.value = savedColor;
        themeColorRgb.value = hexToRgb(savedColor);
      }
      if (typeof savedFontSize === "number")
        fontSize.value = savedFontSize;
      if (typeof savedMobilePlay === "boolean")
        allowMobilePlay.value = savedMobilePlay;
    });
    common_vendor.onShow(() => {
      const savedColor = common_vendor.index.getStorageSync("themeColor");
      if (savedColor) {
        selectedColor.value = savedColor;
        themeColorRgb.value = hexToRgb(savedColor);
      }
    });
    const setColor = (e) => {
      const color = e.currentTarget.dataset.color;
      selectedColor.value = color;
      themeColorRgb.value = hexToRgb(color);
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const onConfirm = () => {
      common_vendor.index.setStorageSync("themeColor", selectedColor.value);
      common_vendor.index.setStorageSync("fontSize", fontSize.value);
      common_vendor.index.setStorageSync("allowMobilePlay", allowMobilePlay.value);
      common_vendor.index.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: selectedColor.value
      });
      common_vendor.index.showToast({ title: "已保存", icon: "success" });
      common_vendor.index.navigateBack();
    };
    const openDrawer = () => {
      showDrawer.value = true;
    };
    const closeDrawer = () => {
      showDrawer.value = false;
    };
    const setFontSize = (value) => {
      fontSize.value = value;
      showDrawer.value = false;
    };
    const clearCache = () => {
      common_vendor.index.showToast({ title: "缓存已清理", icon: "success" });
    };
    const checkUpdate = () => {
      common_vendor.index.showToast({ title: "已是最新版本", icon: "success" });
    };
    const toggleMobilePlay = (e) => {
      allowMobilePlay.value = e.detail.value;
    };
    const goWallpaper = () => {
      common_vendor.index.showToast({ title: "功能开发中", icon: "none" });
    };
    const aboutProject = () => {
      common_vendor.index.showToast({ title: "灵感研究所 v1.0", icon: "none" });
    };
    const openAgreement = () => {
      common_vendor.index.showToast({ title: "用户协议加载中", icon: "none" });
    };
    const logout = () => {
      common_vendor.index.showModal({
        title: "确认退出登录？",
        content: "退出后需要重新登录。",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({ title: "已退出", icon: "success" });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goBack, "ab"),
        b: common_vendor.o(onConfirm, "a3"),
        c: selectedColor.value === "#6366f1" ? 1 : "",
        d: common_vendor.o(setColor, "dc"),
        e: selectedColor.value === "#ec4899" ? 1 : "",
        f: common_vendor.o(setColor, "d1"),
        g: selectedColor.value === "#22c55e" ? 1 : "",
        h: common_vendor.o(setColor, "66"),
        i: common_vendor.o(openDrawer, "99"),
        j: common_vendor.o(goWallpaper, "27"),
        k: common_vendor.o(clearCache, "fe"),
        l: common_vendor.o(checkUpdate, "3c"),
        m: allowMobilePlay.value,
        n: common_vendor.o(toggleMobilePlay, "62"),
        o: common_vendor.o(aboutProject, "94"),
        p: common_vendor.o(openAgreement, "6e"),
        q: common_vendor.o(logout, "17"),
        r: showDrawer.value ? 1 : "",
        s: common_vendor.o(closeDrawer, "7d"),
        t: common_vendor.o(closeDrawer, "2f"),
        v: common_vendor.f(fontSizes, (size, k0, i0) => {
          return {
            a: common_vendor.t(size.label),
            b: `${size.value}rpx`,
            c: size.value,
            d: fontSize.value === size.value ? 1 : "",
            e: common_vendor.o(($event) => setFontSize(size.value), size.value)
          };
        }),
        w: showDrawer.value ? 1 : "",
        x: themeColor.value,
        y: themeColorRgb.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-018cdf56"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/setting/setting.js.map
