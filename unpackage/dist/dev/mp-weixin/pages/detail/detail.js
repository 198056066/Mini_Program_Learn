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
      { offset: 12, width: 16, height: 120, radius: 24, delay: 0, duration: 760, angle: -18, skew: -8, peakX: 120, peakY: 380, fallX: 60, fallY: 160, color: "#f43f5e" },
      { offset: 32, width: 22, height: 160, radius: 12, delay: 40, duration: 820, angle: -8, skew: 6, peakX: 140, peakY: 420, fallX: 80, fallY: 140, color: "#f97316" },
      { offset: 54, width: 12, height: 110, radius: 30, delay: 80, duration: 780, angle: -22, skew: -4, peakX: 110, peakY: 360, fallX: 70, fallY: 180, color: "#f59e0b" },
      { offset: 74, width: 20, height: 190, radius: 8, delay: 20, duration: 860, angle: -12, skew: 10, peakX: 150, peakY: 460, fallX: 90, fallY: 120, color: "#22c55e" }
    ];
    const collectRibbonsRight = [
      { offset: 12, width: 18, height: 140, radius: 18, delay: 20, duration: 780, angle: 16, skew: 6, peakX: -120, peakY: 380, fallX: -60, fallY: 160, color: "#3b82f6" },
      { offset: 34, width: 12, height: 120, radius: 28, delay: 70, duration: 820, angle: 24, skew: -6, peakX: -150, peakY: 420, fallX: -90, fallY: 140, color: "#6366f1" },
      { offset: 56, width: 22, height: 170, radius: 10, delay: 10, duration: 800, angle: 10, skew: 8, peakX: -130, peakY: 400, fallX: -70, fallY: 150, color: "#8b5cf6" },
      { offset: 76, width: 14, height: 200, radius: 6, delay: 60, duration: 880, angle: 18, skew: -10, peakX: -160, peakY: 460, fallX: -100, fallY: 120, color: "#ec4899" }
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
            b: common_vendor.s(ribbonStyle(ribbon))
          };
        }),
        B: common_vendor.f(collectRibbonsRight, (ribbon, idx, i0) => {
          return {
            a: `right-${idx}`,
            b: common_vendor.s(ribbonStyle(ribbon))
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
        G: common_vendor.o(toggleLike, "ce"),
        H: collected.value ? 1 : "",
        I: common_vendor.o(toggleCollect, "86"),
        J: common_vendor.o(share, "6f"),
        K: showToTop.value ? 1 : "",
        L: common_vendor.o(backToTop, "24"),
        M: themeColor.value,
        N: themeColorRgb.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/detail/detail.js.map
