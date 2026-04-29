"use strict";
const common_vendor = require("../../common/vendor.js");
const data_category = require("../../data/category.js");
const _sfc_main = {
  __name: "category",
  setup(__props) {
    const list = data_category.categoryList;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(list), (item, k0, i0) => {
          return {
            a: item.cover,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.desc),
            d: item.id
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8145b772"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/category/category.js.map
