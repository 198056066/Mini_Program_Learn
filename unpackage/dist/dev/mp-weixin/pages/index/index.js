"use strict";
const common_vendor = require("../../common/vendor.js");
const data_cards = require("../../data/cards.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const themeColor = common_vendor.ref("#6366f1");
    common_vendor.onShow(() => {
      const savedColor = common_vendor.index.getStorageSync("themeColor");
      if (savedColor)
        themeColor.value = savedColor;
    });
    const goDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(data_cards.cards), (item, k0, i0) => {
          return {
            a: item.cover,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.author),
            d: item.id,
            e: common_vendor.o(($event) => goDetail(item.id), item.id)
          };
        }),
        b: themeColor.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
