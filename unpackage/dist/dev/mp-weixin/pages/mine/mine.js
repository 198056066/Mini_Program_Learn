"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const goCollect = () => {
      common_vendor.index.navigateTo({
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
        a: common_vendor.o(goCollect, "01"),
        b: common_vendor.o(goSetting, "4c")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c2ebfa5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
