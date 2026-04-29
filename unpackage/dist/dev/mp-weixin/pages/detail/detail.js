"use strict";
const common_vendor = require("../../common/vendor.js");
const data_detail = require("../../data/detail.js");
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const themeColor = common_vendor.ref("#6366f1");
    const detail = common_vendor.ref({
      ...data_detail.detailMap[1],
      collected: false
    });
    common_vendor.onLoad((query) => {
      const id = Number((query == null ? void 0 : query.id) || 1);
      const savedColor = common_vendor.index.getStorageSync("themeColor");
      if (savedColor)
        themeColor.value = savedColor;
      detail.value = {
        ...data_detail.detailMap[id] || data_detail.detailMap[1],
        collected: detail.value.collected || false
      };
    });
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const toggleCollect = () => {
      detail.value.collected = !detail.value.collected;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goBack, "f6"),
        b: detail.value.cover,
        c: common_vendor.t(detail.value.title),
        d: common_vendor.t(detail.value.author),
        e: common_vendor.t(detail.value.time),
        f: common_vendor.t(detail.value.desc),
        g: common_vendor.t(detail.value.collected ? "已收藏" : "收藏"),
        h: common_vendor.o(toggleCollect, "7c"),
        i: themeColor.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/detail/detail.js.map
