"use strict";
const common_vendor = require("../../common/vendor.js");
const data_detail = require("../../data/detail.js");
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const themeColor = common_vendor.ref("#6366f1");
    const themeColorRgb = common_vendor.ref("99, 102, 241");
    const detail = common_vendor.ref({
      ...data_detail.detailMap[1]
    });
    const hexToRgb = (hex) => {
      const value = hex.replace("#", "");
      const r = parseInt(value.slice(0, 2), 16);
      const g = parseInt(value.slice(2, 4), 16);
      const b = parseInt(value.slice(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    };
    common_vendor.onLoad((query) => {
      const id = Number((query == null ? void 0 : query.id) || 1);
      detail.value = {
        ...data_detail.detailMap[id] || data_detail.detailMap[1]
      };
    });
    common_vendor.onShow(() => {
      const savedColor = common_vendor.index.getStorageSync("themeColor");
      if (savedColor) {
        themeColor.value = savedColor;
        themeColorRgb.value = hexToRgb(savedColor);
      }
    });
    const scrollTop = common_vendor.ref(0);
    const navOpacity = common_vendor.ref(0);
    const showToTop = common_vendor.ref(false);
    const timelineVisible = common_vendor.ref(true);
    const handleScroll = (e) => {
      const top = e.detail.scrollTop;
      scrollTop.value = top;
      navOpacity.value = Math.min(1, top / 200);
      showToTop.value = top > 400;
      if (top > 900)
        timelineVisible.value = true;
    };
    const navStyle = common_vendor.computed(() => {
      const alpha = navOpacity.value;
      const color = alpha > 0.6 ? "#333" : "#fff";
      return {
        background: `rgba(255,255,255,${alpha})`,
        color
      };
    });
    const navIconStyle = common_vendor.computed(() => {
      const alpha = navOpacity.value;
      return {
        background: alpha > 0.6 ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.2)",
        borderColor: alpha > 0.6 ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.2)",
        color: alpha > 0.6 ? "#333" : "#fff"
      };
    });
    const heroStyle = common_vendor.computed(() => {
      const scale = 1.05 + Math.min(scrollTop.value / 1200, 0.05);
      return {
        transform: `scale(${scale})`,
        transformOrigin: "center top"
      };
    });
    const bodyExpanded = common_vendor.ref(false);
    const toggleBody = () => {
      bodyExpanded.value = !bodyExpanded.value;
    };
    const liked = common_vendor.ref(false);
    const collected = common_vendor.ref(false);
    const toggleLike = () => {
      liked.value = !liked.value;
    };
    const toggleCollect = () => {
      collected.value = !collected.value;
    };
    const share = () => {
      common_vendor.index.showToast({ title: "已分享", icon: "success" });
    };
    const previewHero = () => {
      previewImage(detail.value.cover);
    };
    const previewImage = (url) => {
      common_vendor.index.previewImage({
        urls: [url],
        current: url
      });
    };
    const backToTop = () => {
      scrollTop.value = 0;
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const goDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s(navIconStyle.value),
        b: common_vendor.o(goBack, "77"),
        c: common_vendor.s(navStyle.value),
        d: detail.value.cover,
        e: common_vendor.s(heroStyle.value),
        f: common_vendor.o(previewHero, "8e"),
        g: common_vendor.t(detail.value.title),
        h: detail.value.avatar,
        i: common_vendor.t(detail.value.author),
        j: common_vendor.t(detail.value.time),
        k: common_vendor.f(detail.value.tags, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag),
            b: tag
          };
        }),
        l: common_vendor.t(detail.value.desc),
        m: common_vendor.f(detail.value.body.intro, (p, idx, i0) => {
          return {
            a: common_vendor.t(p),
            b: `intro-${idx}`
          };
        }),
        n: common_vendor.f(detail.value.body.images, (img, idx, i0) => {
          return {
            a: `img-${idx}`,
            b: img,
            c: common_vendor.o(($event) => previewImage(img), `img-${idx}`)
          };
        }),
        o: common_vendor.f(detail.value.body.paragraphs, (p, idx, i0) => {
          return {
            a: common_vendor.t(p),
            b: `p-${idx}`
          };
        }),
        p: common_vendor.t(detail.value.body.quote),
        q: common_vendor.t(detail.value.body.highlight),
        r: !bodyExpanded.value ? 1 : "",
        s: common_vendor.t(bodyExpanded.value ? "收起全文" : "展开全文"),
        t: common_vendor.o(toggleBody, "72"),
        v: common_vendor.f(detail.value.timeline, (step, idx, i0) => {
          return {
            a: common_vendor.t(idx + 1),
            b: common_vendor.t(step.title),
            c: common_vendor.t(step.desc),
            d: step.id,
            e: `${idx * 0.08}s`
          };
        }),
        w: timelineVisible.value ? 1 : "",
        x: common_vendor.f(detail.value.related, (item, k0, i0) => {
          return {
            a: item.cover,
            b: common_vendor.t(item.title),
            c: item.id,
            d: common_vendor.o(($event) => goDetail(item.id), item.id)
          };
        }),
        y: scrollTop.value,
        z: common_vendor.o(handleScroll, "d8"),
        A: liked.value ? 1 : "",
        B: common_vendor.o(toggleLike, "46"),
        C: collected.value ? 1 : "",
        D: common_vendor.o(toggleCollect, "47"),
        E: common_vendor.o(share, "5e"),
        F: showToTop.value ? 1 : "",
        G: common_vendor.o(backToTop, "7a"),
        H: themeColor.value,
        I: themeColorRgb.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/detail/detail.js.map
