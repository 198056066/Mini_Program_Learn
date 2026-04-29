"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "setting",
  setup(__props) {
    const motion = common_vendor.ref(60);
    const setColor = (e) => {
      const color = e.currentTarget.dataset.color;
      common_vendor.index.setStorageSync("themeColor", color);
    };
    const onMotionChange = (e) => {
      motion.value = e.detail.value;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(setColor, "b6"),
        b: common_vendor.o(setColor, "0f"),
        c: common_vendor.o(setColor, "6e"),
        d: common_vendor.o(setColor, "30"),
        e: motion.value,
        f: common_vendor.o(onMotionChange, "91")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-018cdf56"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/setting/setting.js.map
