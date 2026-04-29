"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/welcome/welcome.js";
  "./pages/index/index.js";
  "./pages/category/category.js";
  "./pages/detail/detail.js";
  "./pages/collect/collect.js";
  "./pages/mine/mine.js";
  "./pages/setting/setting.js";
}
const _sfc_main = {
  onLaunch() {
    const theme = common_vendor.index.getStorageSync("themeColor");
    if (theme) {
      common_vendor.index.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: theme
      });
    }
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
