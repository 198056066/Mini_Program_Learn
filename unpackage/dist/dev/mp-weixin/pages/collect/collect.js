"use strict";
const common_vendor = require("../../common/vendor.js");
const data_collect = require("../../data/collect.js");
const _sfc_main = {
  __name: "collect",
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
    const buildList = () => data_collect.collectList.map((item) => ({
      ...item,
      swipeX: 0,
      deleting: false,
      dragging: false
    }));
    const list = common_vendor.ref(buildList());
    const isGrid = common_vendor.ref(false);
    const isSwiping = common_vendor.ref(false);
    const toggleLayout = () => {
      isGrid.value = !isGrid.value;
    };
    const onRefresh = () => {
      list.value = buildList();
      setTimeout(() => {
        common_vendor.index.stopPullDownRefresh();
      }, 800);
    };
    const touchState = common_vendor.ref({ startX: 0, current: null });
    const closeOtherSwipes = (currentId) => {
      list.value.forEach((item) => {
        if (item.id !== currentId && item.swipeX !== 0) {
          item.swipeX = 0;
        }
      });
    };
    const onTouchStart = (e, item) => {
      if (isGrid.value)
        return;
      touchState.value.startX = e.touches[0].clientX;
      touchState.value.current = item;
      item.dragging = true;
      isSwiping.value = true;
      closeOtherSwipes(item.id);
    };
    const onTouchMove = (e, item) => {
      if (isGrid.value)
        return;
      const deltaX = e.touches[0].clientX - touchState.value.startX;
      if (deltaX < 0) {
        item.swipeX = Math.max(deltaX, -120);
      } else if (deltaX > 0) {
        item.swipeX = Math.min(deltaX, 0);
      }
    };
    const onTouchEnd = (e, item) => {
      if (isGrid.value)
        return;
      item.dragging = false;
      if (item.swipeX <= -60) {
        item.swipeX = -120;
      } else {
        item.swipeX = 0;
      }
      touchState.value.current = null;
      isSwiping.value = false;
    };
    const onTouchCancel = (item) => {
      if (isGrid.value)
        return;
      item.dragging = false;
      if (item.swipeX <= -60) {
        item.swipeX = -120;
      } else {
        item.swipeX = 0;
      }
      touchState.value.current = null;
      isSwiping.value = false;
    };
    const confirmDelete = (item) => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定删除该收藏吗？",
        success: (res) => {
          if (res.confirm) {
            item.deleting = true;
            setTimeout(() => {
              list.value = list.value.filter((i) => i.id !== item.id);
            }, 300);
          } else {
            item.swipeX = 0;
          }
        }
      });
    };
    const onLongPress = (item) => {
      common_vendor.index.showToast({
        title: `长按：${item.title}`,
        icon: "none"
      });
    };
    const goDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      });
    };
    const goHome = () => {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !isGrid.value ? 1 : "",
        b: isGrid.value ? 1 : "",
        c: isGrid.value ? 1 : "",
        d: common_vendor.o(toggleLayout, "cf"),
        e: list.value.length === 0
      }, list.value.length === 0 ? {
        f: common_vendor.o(goHome, "bd")
      } : common_vendor.e({
        g: !isGrid.value
      }, !isGrid.value ? {
        h: common_vendor.f(list.value, (item, idx, i0) => {
          return {
            a: item.cover,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.desc),
            d: common_vendor.t(item.time),
            e: `translateX(${item.swipeX}rpx)`,
            f: `${idx * 0.06}s`,
            g: item.dragging ? "none" : "all 0.3s",
            h: common_vendor.o(($event) => onTouchStart($event, item), item.id),
            i: common_vendor.o(($event) => onTouchMove($event, item), item.id),
            j: common_vendor.o(($event) => onTouchEnd($event, item), item.id),
            k: common_vendor.o(($event) => onTouchCancel(item), item.id),
            l: common_vendor.o(($event) => goDetail(item.id), item.id),
            m: common_vendor.o(($event) => onLongPress(item), item.id),
            n: common_vendor.o(($event) => confirmDelete(item), item.id),
            o: item.id,
            p: item.deleting ? 1 : ""
          };
        })
      } : {
        i: common_vendor.f(list.value, (item, idx, i0) => {
          return {
            a: item.cover,
            b: `${item.coverHeight}rpx`,
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.time),
            e: item.id,
            f: `${idx * 0.06}s`,
            g: common_vendor.o(($event) => goDetail(item.id), item.id),
            h: common_vendor.o(($event) => onLongPress(item), item.id)
          };
        })
      }, {
        j: !isSwiping.value,
        k: isGrid.value ? 1 : "",
        l: common_vendor.o(onRefresh, "9c")
      }), {
        m: themeColor.value,
        n: themeColorRgb.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b24c290b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/collect/collect.js.map
