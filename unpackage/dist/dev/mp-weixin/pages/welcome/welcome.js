"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 页面入场开关：onShow 置为 true 触发淡入
      isEnter: false,
      // 标题拆分为字符数组，便于逐字动画
      titleChars: "欢迎来到灵感画报".split("")
    };
  },
  onShow() {
    this.isEnter = true;
  },
  methods: {
    // 点击跳转首页
    goIndex() {
      common_vendor.index.navigateTo({
        url: "/pages/index/index"
      });
    },
    // 点击跳转设置页
    goSetting() {
      common_vendor.index.navigateTo({
        url: "/pages/setting/setting"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.titleChars, (char, index, i0) => {
      return {
        a: common_vendor.t(char),
        b: index,
        c: `${index * 0.08}s`
      };
    }),
    b: common_vendor.o((...args) => $options.goIndex && $options.goIndex(...args), "1d"),
    c: common_vendor.o((...args) => $options.goSetting && $options.goSetting(...args), "85"),
    d: $data.isEnter ? 1 : ""
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-085f0530"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/welcome/welcome.js.map
