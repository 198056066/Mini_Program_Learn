"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    const tabRects = common_vendor.ref([]);
    const tabsInnerLeft = common_vendor.ref(0);
    const tabScrollLeft = common_vendor.ref(0);
    const measureTabs = () => {
      const query = common_vendor.index.createSelectorQuery().in(instance);
      query.select(".tabs-inner").boundingClientRect();
      query.select(".tabs").scrollOffset();
      query.selectAll(".tab").boundingClientRect();
      query.exec((res) => {
        const inner = res[0];
        const scroll = res[1];
        const tabs = res[2] || [];
        if (!inner || !tabs.length)
          return;
        tabsInnerLeft.value = inner.left;
        tabScrollLeft.value = (scroll == null ? void 0 : scroll.scrollLeft) || 0;
        tabRects.value = tabs;
      });
    };
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
    common_vendor.onReady(() => {
      common_vendor.nextTick$1(() => {
        measureTabs();
      });
    });
    const tabUnderlineStyle = common_vendor.computed(() => {
      const rect = tabRects.value[selectedTab.value];
      if (!rect)
        return {};
      const width = rect.width;
      const left = rect.left - tabsInnerLeft.value + tabScrollLeft.value;
      return {
        width: `${width}px`,
        transform: `translateX(${left}px)`
      };
    });
    const onTabsScroll = (e) => {
      tabScrollLeft.value = e.detail.scrollLeft;
    };
    const syncTabs = () => {
      common_vendor.nextTick$1(() => {
        measureTabs();
      });
    };
    const selectTab = (idx) => {
      selectedTab.value = idx;
      syncTabs();
    };
    const handleScroll = (e) => {
      const top = e.detail.scrollTop;
      scrollTop.value = top;
      navOpacity.value = Math.min(1, top / 120);
    };
    const bannerList = common_vendor.ref([
      "/static/images/cover-1.jpg",
      "/static/images/cover-2.jpg",
      "/static/images/cover-3.jpg",
      "/static/images/cover-4.jpg",
      "/static/images/cover-5.jpg"
    ]);
    const tabList = common_vendor.ref([
      { id: 1, title: "推荐" },
      { id: 2, title: "热榜" },
      { id: 3, title: "风格" },
      { id: 4, title: "建筑" },
      { id: 5, title: "摄影" },
      { id: 6, title: "生活" },
      { id: 7, title: "治愈" }
    ]);
    const allCards = common_vendor.ref([
      {
        id: 1,
        title: "街头机能穿搭",
        desc: "冷感结构与层次堆叠，让日常也有强烈态度。",
        cover: "/static/images/cover-1.jpg",
        coverHeight: 300,
        span: 28,
        tag: "机能风",
        views: "12.4k",
        group: 1
      },
      {
        id: 2,
        title: "霓虹城市夜景",
        desc: "灯光色块碰撞，打造高饱和都市氛围。",
        cover: "/static/images/cover-2.jpg",
        coverHeight: 260,
        span: 24,
        tag: "热榜",
        views: "9.1k",
        group: 2
      },
      {
        id: 3,
        title: "胶片感日常",
        desc: "柔和颗粒感的光影，让瞬间更有温度。",
        cover: "/static/images/cover-3.jpg",
        coverHeight: 340,
        span: 32,
        tag: "摄影",
        views: "7.8k",
        group: 5
      },
      {
        id: 4,
        title: "极简家居",
        desc: "留白与秩序感，让空间呼吸。",
        cover: "/static/images/cover-4.jpg",
        coverHeight: 280,
        span: 26,
        tag: "生活",
        views: "5.3k",
        group: 6
      },
      {
        id: 5,
        title: "雨夜街角",
        desc: "低饱和冷调，城市角落也能浪漫。",
        cover: "/static/images/cover-5.jpg",
        coverHeight: 320,
        span: 30,
        tag: "治愈",
        views: "6.7k",
        group: 7
      },
      {
        id: 6,
        title: "现代建筑构图",
        desc: "几何线条与光影的秩序美学。",
        cover: "/static/images/cover-6.jpg",
        coverHeight: 260,
        span: 24,
        tag: "建筑",
        views: "4.6k",
        group: 4
      }
    ]);
    const selectedTab = common_vendor.ref(0);
    const filteredCards = common_vendor.computed(() => {
      var _a;
      if (selectedTab.value === 0)
        return allCards.value;
      const group = (_a = tabList.value[selectedTab.value]) == null ? void 0 : _a.id;
      return allCards.value.filter((item) => item.group === group);
    });
    const scrollTop = common_vendor.ref(0);
    const navOpacity = common_vendor.ref(0);
    const navStyle = common_vendor.computed(() => {
      const alpha = navOpacity.value;
      const color = alpha > 0.6 ? "#333" : "#fff";
      return {
        background: `rgba(255,255,255,${alpha})`,
        color
      };
    });
    const isRefreshing = common_vendor.ref(false);
    const isLoading = common_vendor.ref(false);
    const noMore = common_vendor.ref(false);
    let page = 1;
    const onPullRefresh = () => {
      if (isRefreshing.value)
        return;
      isRefreshing.value = true;
      noMore.value = false;
      page = 1;
      setTimeout(() => {
        isRefreshing.value = false;
      }, 2e3);
    };
    const onReachBottom = () => {
      if (isLoading.value || noMore.value)
        return;
      isLoading.value = true;
      setTimeout(() => {
        if (page >= 3) {
          noMore.value = true;
        } else {
          allCards.value = allCards.value.concat(
            allCards.value.map((item) => ({
              ...item,
              id: Math.random().toString(36).slice(2)
            }))
          );
          page += 1;
        }
        isLoading.value = false;
      }, 1e3);
    };
    const goDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      });
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const goSetting = () => {
      common_vendor.index.navigateTo({
        url: "/pages/setting/setting"
      });
    };
    const goCategory = () => {
      common_vendor.index.navigateTo({
        url: "/pages/category/category"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(goBack, "d2"),
        b: common_vendor.o(goSetting, "1c"),
        c: common_vendor.s(navStyle.value),
        d: common_vendor.f(bannerList.value, (item, idx, i0) => {
          return {
            a: item,
            b: idx
          };
        }),
        e: common_vendor.o(goCategory, "d8"),
        f: common_vendor.f(tabList.value, (item, idx, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.id,
            c: idx === selectedTab.value ? 1 : "",
            d: common_vendor.o(($event) => selectTab(idx), item.id)
          };
        }),
        g: common_vendor.s(tabUnderlineStyle.value),
        h: common_vendor.o(onTabsScroll, "55"),
        i: common_vendor.f(filteredCards.value, (item, idx, i0) => {
          return {
            a: item.cover,
            b: `${item.coverHeight}rpx`,
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.desc),
            e: common_vendor.t(item.tag),
            f: common_vendor.t(item.views),
            g: item.id,
            h: `${idx * 0.06}s`,
            i: common_vendor.o(($event) => goDetail(item.id), item.id)
          };
        }),
        j: isLoading.value
      }, isLoading.value ? {} : noMore.value ? {} : {}, {
        k: noMore.value,
        l: scrollTop.value,
        m: common_vendor.o(handleScroll, "b6"),
        n: isRefreshing.value,
        o: common_vendor.o(onPullRefresh, "b7"),
        p: common_vendor.o(onReachBottom, "82"),
        q: themeColor.value,
        r: themeColorRgb.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
