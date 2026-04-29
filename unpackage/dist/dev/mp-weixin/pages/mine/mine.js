"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const themeColor = common_vendor.ref("#6366f1");
    const themeColorRgb = common_vendor.ref("99, 102, 241");
    const hexToRgb = (hex) => {
      const value = hex.replace("#", "");
      const r = parseInt(value.slice(0, 2), 16);
      const g = parseInt(value.slice(2, 4), 16);
      const b = parseInt(value.slice(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    };
    common_vendor.onShow(() => {
      const savedColor = common_vendor.index.getStorageSync("themeColor");
      if (savedColor) {
        themeColor.value = savedColor;
        themeColorRgb.value = hexToRgb(savedColor);
      }
    });
    const goCollect = () => {
      common_vendor.index.switchTab({
        url: "/pages/collect/collect"
      });
    };
    const goSetting = () => {
      common_vendor.index.navigateTo({
        url: "/pages/setting/setting"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goCollect, "0a"),
        b: common_vendor.o(goSetting, "34"),
        c: themeColor.value,
        d: themeColorRgb.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c2ebfa5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
