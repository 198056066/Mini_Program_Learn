"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 页面入场开关：onShow 置为 true 触发淡入
      isEnter: false,
      // 标题拆分为字符数组，便于逐字动画
      titleChars: "欢迎来到灵感画报".split(""),
      // 主题色与 RGB 变量
      themeColor: "#6366f1",
      themeColorRgb: "99, 102, 241"
    };
  },
  onShow() {
    this.isEnter = true;
    const savedColor = common_vendor.index.getStorageSync("themeColor");
    if (savedColor) {
      this.themeColor = savedColor;
      this.themeColorRgb = this.hexToRgb(savedColor);
    }
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
    },
    // 将 #RRGGBB 转成 "r, g, b" 字符串，用于 rgba
    hexToRgb(hex) {
      const value = hex.replace("#", "");
      const r = parseInt(value.slice(0, 2), 16);
      const g = parseInt(value.slice(2, 4), 16);
      const b = parseInt(value.slice(4, 6), 16);
      return `${r}, ${g}, ${b}`;
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
    b: common_vendor.o((...args) => $options.goIndex && $options.goIndex(...args), "3b"),
    c: common_vendor.o((...args) => $options.goSetting && $options.goSetting(...args), "07"),
    d: $data.isEnter ? 1 : "",
    e: $data.themeColor,
    f: $data.themeColorRgb
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-085f0530"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/welcome/welcome.js.map
