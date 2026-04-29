"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "category",
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
    const menuList = common_vendor.ref([
      { id: 1, title: "推荐" },
      { id: 2, title: "摄影" },
      { id: 3, title: "设计" },
      { id: 4, title: "美食" },
      { id: 5, title: "旅行" },
      { id: 6, title: "学习" },
      { id: 7, title: "穿搭" },
      { id: 8, title: "动漫" }
    ]);
    const categories = common_vendor.ref([
      {
        id: 1,
        title: "推荐",
        modules: [
          {
            id: 11,
            title: "精选主题",
            collapsed: false,
            items: [
              { id: "r-1", title: "热门", icon: "🔥" },
              { id: "r-2", title: "趋势", icon: "✨" },
              { id: "r-3", title: "灵感", icon: "💡" },
              { id: "r-4", title: "精选", icon: "⭐" },
              { id: "r-5", title: "风格", icon: "🎯" },
              { id: "r-6", title: "色彩", icon: "🎨" },
              { id: "r-7", title: "搭配", icon: "🧵" },
              { id: "r-8", title: "空间", icon: "🏠" }
            ]
          },
          {
            id: 12,
            title: "本周热榜",
            collapsed: false,
            items: [
              { id: "r-9", title: "夜景", icon: "🌃" },
              { id: "r-10", title: "城市", icon: "🏙️" },
              { id: "r-11", title: "胶片", icon: "🎞️" },
              { id: "r-12", title: "建筑", icon: "🏛️" }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "摄影",
        modules: [
          {
            id: 21,
            title: "摄影题材",
            collapsed: false,
            items: [
              { id: "p-1", title: "人像", icon: "📸" },
              { id: "p-2", title: "风景", icon: "⛰️" },
              { id: "p-3", title: "街拍", icon: "🧭" },
              { id: "p-4", title: "静物", icon: "🍃" },
              { id: "p-5", title: "黑白", icon: "🖤" },
              { id: "p-6", title: "夜景", icon: "🌙" },
              { id: "p-7", title: "建筑", icon: "🏗️" },
              { id: "p-8", title: "航拍", icon: "🚁" }
            ]
          }
        ]
      },
      {
        id: 3,
        title: "设计",
        modules: [
          {
            id: 31,
            title: "视觉设计",
            collapsed: false,
            items: [
              { id: "d-1", title: "排版", icon: "🔤" },
              { id: "d-2", title: "海报", icon: "🪧" },
              { id: "d-3", title: "图形", icon: "🟪" },
              { id: "d-4", title: "配色", icon: "🧩" },
              { id: "d-5", title: "插画", icon: "🖍️" },
              { id: "d-6", title: "品牌", icon: "🏷️" },
              { id: "d-7", title: "UI", icon: "📱" },
              { id: "d-8", title: "动效", icon: "🎬" }
            ]
          }
        ]
      },
      {
        id: 4,
        title: "美食",
        modules: [
          {
            id: 41,
            title: "口味灵感",
            collapsed: false,
            items: [
              { id: "f-1", title: "甜品", icon: "🍰" },
              { id: "f-2", title: "咖啡", icon: "☕" },
              { id: "f-3", title: "轻食", icon: "🥗" },
              { id: "f-4", title: "中式", icon: "🥟" },
              { id: "f-5", title: "日式", icon: "🍣" },
              { id: "f-6", title: "烘焙", icon: "🥐" }
            ]
          }
        ]
      },
      {
        id: 5,
        title: "旅行",
        modules: [
          {
            id: 51,
            title: "目的地",
            collapsed: false,
            items: [
              { id: "t-1", title: "海岛", icon: "🏝️" },
              { id: "t-2", title: "山野", icon: "🏔️" },
              { id: "t-3", title: "城市", icon: "🚇" },
              { id: "t-4", title: "露营", icon: "⛺" }
            ]
          }
        ]
      },
      {
        id: 6,
        title: "学习",
        modules: [
          {
            id: 61,
            title: "学习方向",
            collapsed: false,
            items: [
              { id: "s-1", title: "编程", icon: "💻" },
              { id: "s-2", title: "摄影", icon: "📷" },
              { id: "s-3", title: "绘画", icon: "🖌️" },
              { id: "s-4", title: "语言", icon: "🗣️" },
              { id: "s-5", title: "运动", icon: "🏃" },
              { id: "s-6", title: "乐器", icon: "🎸" }
            ]
          }
        ]
      },
      {
        id: 7,
        title: "穿搭",
        modules: [
          {
            id: 71,
            title: "风格分类",
            collapsed: false,
            items: [
              { id: "o-1", title: "机能", icon: "🧥" },
              { id: "o-2", title: "街头", icon: "👟" },
              { id: "o-3", title: "极简", icon: "⚪" },
              { id: "o-4", title: "复古", icon: "🕰️" }
            ]
          }
        ]
      },
      {
        id: 8,
        title: "动漫",
        modules: [
          {
            id: 81,
            title: "风格标签",
            collapsed: false,
            items: [
              { id: "a-1", title: "热血", icon: "⚡" },
              { id: "a-2", title: "治愈", icon: "🌈" },
              { id: "a-3", title: "悬疑", icon: "🕵️" },
              { id: "a-4", title: "科幻", icon: "🛰️" }
            ]
          }
        ]
      }
    ]);
    const selectedIndex = common_vendor.ref(0);
    const currentCategory = common_vendor.computed(() => categories.value[selectedIndex.value] || categories.value[0]);
    const leftCollapsed = common_vendor.ref(false);
    const selectMenu = (idx) => {
      selectedIndex.value = idx;
    };
    const toggleLeft = () => {
      leftCollapsed.value = !leftCollapsed.value;
    };
    const toggleModule = (module) => {
      module.collapsed = !module.collapsed;
    };
    return (_ctx, _cache) => {
      return {
        a: leftCollapsed.value ? 1 : "",
        b: common_vendor.o(toggleLeft, "79"),
        c: common_vendor.f(menuList.value, (item, idx, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.id,
            c: idx === selectedIndex.value ? 1 : "",
            d: common_vendor.o(($event) => selectMenu(idx), item.id)
          };
        }),
        d: leftCollapsed.value ? 1 : "",
        e: common_vendor.t(currentCategory.value.title),
        f: common_vendor.t(currentCategory.value.modules.length),
        g: common_vendor.f(currentCategory.value.modules, (module, mIndex, i0) => {
          return {
            a: common_vendor.t(module.title),
            b: module.collapsed ? 1 : "",
            c: common_vendor.o(($event) => toggleModule(module), module.id),
            d: common_vendor.f(module.items, (item, k1, i1) => {
              return {
                a: common_vendor.t(item.icon),
                b: common_vendor.t(item.title),
                c: item.id
              };
            }),
            e: module.collapsed ? 1 : "",
            f: module.id,
            g: `${mIndex * 0.06}s`
          };
        }),
        h: themeColor.value,
        i: themeColorRgb.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8145b772"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/category/category.js.map
