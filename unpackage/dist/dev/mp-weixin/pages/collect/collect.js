"use strict";
const common_vendor = require("../../common/vendor.js");
const data_collect = require("../../data/collect.js");
const _sfc_main = {
  __name: "collect",
  setup(__props) {
    const list = data_collect.collectList;
    const themeColor = common_vendor.ref("#6366f1");
    common_vendor.onShow(() => {
      const savedColor = common_vendor.index.getStorageSync("themeColor");
      if (savedColor)
        themeColor.value = savedColor;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(list), (item, k0, i0) => {
          return {
            a: item.cover,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.author),
            d: item.id
          };
        }),
        b: themeColor.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b24c290b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/collect/collect.js.map
