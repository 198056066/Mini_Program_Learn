"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "setting",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "48a0885f": themeColor.value,
      "9d423024": themeColorRgb.value
    }));
    const selectedColor = common_vendor.ref("#6366f1");
    const themeColor = common_vendor.computed(() => selectedColor.value);
    const themeColorRgb = common_vendor.ref("99, 102, 241");
    const hexToRgb = (hex) => {
      const value = hex.replace("#", "");
      const r = parseInt(value.slice(0, 2), 16);
      const g = parseInt(value.slice(2, 4), 16);
      const b = parseInt(value.slice(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    };
    const motion = common_vendor.ref(60);
    common_vendor.onLoad(() => {
      const savedColor = common_vendor.index.getStorageSync("themeColor");
      const savedMotion = common_vendor.index.getStorageSync("motionStrength");
      if (savedColor) {
        selectedColor.value = savedColor;
        themeColorRgb.value = hexToRgb(savedColor);
      }
      if (typeof savedMotion === "number")
        motion.value = savedMotion;
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
    const onMotionChange = (e) => {
      motion.value = e.detail.value;
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const onConfirm = () => {
      common_vendor.index.setStorageSync("themeColor", selectedColor.value);
      common_vendor.index.setStorageSync("motionStrength", motion.value);
      common_vendor.index.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: selectedColor.value
      });
      common_vendor.index.showToast({ title: "已保存", icon: "success" });
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goBack, "c7"),
        b: common_vendor.o(onConfirm, "50"),
        c: selectedColor.value === "#6366f1" ? 1 : "",
        d: common_vendor.o(setColor, "57"),
        e: selectedColor.value === "#ec4899" ? 1 : "",
        f: common_vendor.o(setColor, "ab"),
        g: selectedColor.value === "#22c55e" ? 1 : "",
        h: common_vendor.o(setColor, "96"),
        i: selectedColor.value === "#f97316" ? 1 : "",
        j: common_vendor.o(setColor, "24"),
        k: motion.value,
        l: common_vendor.o(onMotionChange, "99"),
        m: common_vendor.s({
          "--main-color": themeColor.value,
          "--main-color-rgb": themeColorRgb.value
        }),
        n: common_vendor.s(_ctx.__cssVars())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-018cdf56"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/setting/setting.js.map
