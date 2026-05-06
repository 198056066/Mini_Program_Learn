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
    const likeBurst = common_vendor.ref(false);
    const likeBurstTimer = common_vendor.ref(null);
    const collectBurst = common_vendor.ref(false);
    const collectBurstTimer = common_vendor.ref(null);
    const collectRibbonsLeft = [
      { offset: 10, width: 18, height: 130, radius: 26, delay: 0, duration: 900, angle: -20, skew: -10, peakX: 150, peakY: 440, fallX: 90, fallY: 140, color: "#f43f5e", shape: "strip" },
      { offset: 30, width: 24, height: 170, radius: 14, delay: 50, duration: 980, angle: -10, skew: 8, peakX: 175, peakY: 480, fallX: 105, fallY: 150, color: "#f97316", shape: "diamond" },
      { offset: 52, width: 14, height: 120, radius: 34, delay: 100, duration: 920, angle: -24, skew: -6, peakX: 140, peakY: 420, fallX: 80, fallY: 130, color: "#f59e0b", shape: "circle" },
      { offset: 76, width: 22, height: 200, radius: 10, delay: 20, duration: 1040, angle: -14, skew: 12, peakX: 185, peakY: 520, fallX: 120, fallY: 160, color: "#22c55e", shape: "triangle" }
    ];
    const collectRibbonsRight = [
      { offset: 10, width: 20, height: 150, radius: 20, delay: 30, duration: 940, angle: 18, skew: 8, peakX: -150, peakY: 440, fallX: -90, fallY: 140, color: "#3b82f6", shape: "triangle" },
      { offset: 32, width: 14, height: 130, radius: 30, delay: 90, duration: 980, angle: 26, skew: -8, peakX: -180, peakY: 480, fallX: -110, fallY: 150, color: "#6366f1", shape: "circle" },
      { offset: 54, width: 24, height: 180, radius: 12, delay: 10, duration: 960, angle: 12, skew: 10, peakX: -165, peakY: 460, fallX: -95, fallY: 140, color: "#8b5cf6", shape: "diamond" },
      { offset: 78, width: 16, height: 210, radius: 8, delay: 70, duration: 1080, angle: 20, skew: -12, peakX: -195, peakY: 540, fallX: -125, fallY: 160, color: "#ec4899", shape: "strip" }
    ];
    const ribbonStyle = (ribbon) => ({
      "--ribbon-offset": `${ribbon.offset}rpx`,
      "--ribbon-width": `${ribbon.width}rpx`,
      "--ribbon-height": `${ribbon.height}rpx`,
      "--ribbon-radius": `${ribbon.radius}rpx`,
      "--ribbon-delay": `${ribbon.delay}ms`,
      "--ribbon-duration": `${ribbon.duration}ms`,
      "--ribbon-rotate": `${ribbon.angle}deg`,
      "--ribbon-skew": `${ribbon.skew}deg`,
      "--ribbon-peak-x": `${ribbon.peakX}rpx`,
      "--ribbon-peak-y": `${ribbon.peakY}rpx`,
      "--ribbon-fall-x": `${ribbon.fallX}rpx`,
      "--ribbon-fall-y": `${ribbon.fallY}rpx`,
      "--ribbon-color": ribbon.color
    });
    const likeSparks = [
      { angle: -80, distance: 44, size: 20, delay: 0 },
      { angle: -45, distance: 56, size: 16, delay: 40 },
      { angle: -10, distance: 48, size: 22, delay: 20 },
      { angle: 20, distance: 52, size: 18, delay: 60 },
      { angle: 55, distance: 46, size: 14, delay: 30 },
      { angle: 85, distance: 60, size: 20, delay: 10 },
      { angle: 120, distance: 50, size: 16, delay: 50 },
      { angle: 155, distance: 54, size: 18, delay: 70 }
    ];
    const sparkStyle = (spark) => {
      const rad = spark.angle * Math.PI / 180;
      const x = Math.cos(rad) * spark.distance;
      const y = Math.sin(rad) * spark.distance;
      return {
        "--spark-x": `${x}rpx`,
        "--spark-y": `${y}rpx`,
        "--spark-size": `${spark.size}rpx`,
        "--spark-delay": `${spark.delay}ms`
      };
    };
    const triggerLikeBurst = () => {
      likeBurst.value = false;
      if (likeBurstTimer.value) {
        clearTimeout(likeBurstTimer.value);
      }
      setTimeout(() => {
        likeBurst.value = true;
        likeBurstTimer.value = setTimeout(() => {
          likeBurst.value = false;
        }, 480);
      }, 0);
    };
    const triggerCollectBurst = () => {
      collectBurst.value = false;
      if (collectBurstTimer.value) {
        clearTimeout(collectBurstTimer.value);
      }
      setTimeout(() => {
        collectBurst.value = true;
        collectBurstTimer.value = setTimeout(() => {
          collectBurst.value = false;
        }, 720);
      }, 0);
    };
    const toggleLike = () => {
      liked.value = !liked.value;
      if (liked.value) {
        triggerLikeBurst();
      }
    };
    const toggleCollect = () => {
      collected.value = !collected.value;
      if (collected.value) {
        triggerCollectBurst();
      }
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
        A: common_vendor.f(collectRibbonsLeft, (ribbon, idx, i0) => {
          return {
            a: `left-${idx}`,
            b: common_vendor.n(`shape-${ribbon.shape || "strip"}`),
            c: common_vendor.s(ribbonStyle(ribbon))
          };
        }),
        B: common_vendor.f(collectRibbonsRight, (ribbon, idx, i0) => {
          return {
            a: `right-${idx}`,
            b: common_vendor.n(`shape-${ribbon.shape || "strip"}`),
            c: common_vendor.s(ribbonStyle(ribbon))
          };
        }),
        C: collectBurst.value ? 1 : "",
        D: common_vendor.f(likeSparks, (spark, idx, i0) => {
          return {
            a: idx,
            b: common_vendor.s(sparkStyle(spark))
          };
        }),
        E: likeBurst.value ? 1 : "",
        F: liked.value ? 1 : "",
        G: common_vendor.o(toggleLike, "8b"),
        H: collected.value ? 1 : "",
        I: common_vendor.o(toggleCollect, "4d"),
        J: common_vendor.o(share, "8a"),
        K: showToTop.value ? 1 : "",
        L: common_vendor.o(backToTop, "df"),
        M: themeColor.value,
        N: themeColorRgb.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/detail/detail.js.map
