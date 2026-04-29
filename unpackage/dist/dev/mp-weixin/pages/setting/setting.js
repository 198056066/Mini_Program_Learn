"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "setting",
  setup(__props) {
    const selectedColor = common_vendor.ref("#6366f1");
    const motion = common_vendor.ref(60);
    common_vendor.onLoad(() => {
      const savedColor = common_vendor.index.getStorageSync("themeColor");
      const savedMotion = common_vendor.index.getStorageSync("motionStrength");
      if (savedColor)
        selectedColor.value = savedColor;
      if (typeof savedMotion === "number")
        motion.value = savedMotion;
    });
    const setColor = (e) => {
      const color = e.currentTarget.dataset.color;
      selectedColor.value = color;
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
        a: common_vendor.o(goBack, "9e"),
        b: common_vendor.o(onConfirm, "7f"),
        c: selectedColor.value === "#6366f1" ? 1 : "",
        d: common_vendor.o(setColor, "ad"),
        e: selectedColor.value === "#ec4899" ? 1 : "",
        f: common_vendor.o(setColor, "c0"),
        g: selectedColor.value === "#22c55e" ? 1 : "",
        h: common_vendor.o(setColor, "5f"),
        i: selectedColor.value === "#f97316" ? 1 : "",
        j: common_vendor.o(setColor, "10"),
        k: motion.value,
        l: common_vendor.o(onMotionChange, "82")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-018cdf56"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/setting/setting.js.map
