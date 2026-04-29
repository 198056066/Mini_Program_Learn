"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  methods: {
    goIndex() {
      common_vendor.index.navigateTo({
        url: "/pages/index/index"
      });
    },
    goSetting() {
      common_vendor.index.navigateTo({
        url: "/pages/setting/setting"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goIndex && $options.goIndex(...args), "f3"),
    b: common_vendor.o((...args) => $options.goSetting && $options.goSetting(...args), "6b")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-085f0530"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/welcome/welcome.js.map
