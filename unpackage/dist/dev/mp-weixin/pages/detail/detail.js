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
      { offset: 10, width: 10, height: 10, radius: 20, delay: 0, duration: 1240, angle: -26, skew: -6, burstX: 32, apexX: 126, driftX: 78, apexY: 312, fallY: 82, spinMid: -186, spinEnd: -276, color: "#fb7185", shape: "circle" },
      { offset: 20, width: 14, height: 14, radius: 12, delay: 30, duration: 1320, angle: -18, skew: 8, burstX: 42, apexX: 148, driftX: 94, apexY: 348, fallY: 92, spinMid: -154, spinEnd: -238, color: "#f97316", shape: "diamond" },
      { offset: 34, width: 18, height: 18, radius: 10, delay: 62, duration: 1380, angle: -14, skew: 10, burstX: 50, apexX: 170, driftX: 112, apexY: 386, fallY: 106, spinMid: -132, spinEnd: -212, color: "#f59e0b", shape: "triangle" },
      { offset: 48, width: 22, height: 22, radius: 22, delay: 18, duration: 1420, angle: -22, skew: -8, burstX: 56, apexX: 184, driftX: 122, apexY: 414, fallY: 114, spinMid: -148, spinEnd: -230, color: "#84cc16", shape: "circle" },
      { offset: 60, width: 12, height: 12, radius: 10, delay: 86, duration: 1260, angle: -30, skew: -4, burstX: 30, apexX: 132, driftX: 84, apexY: 326, fallY: 86, spinMid: -190, spinEnd: -284, color: "#22c55e", shape: "diamond" },
      { offset: 72, width: 26, height: 26, radius: 14, delay: 48, duration: 1460, angle: -12, skew: 12, burstX: 58, apexX: 196, driftX: 128, apexY: 428, fallY: 122, spinMid: -124, spinEnd: -202, color: "#14b8a6", shape: "triangle" },
      { offset: 84, width: 16, height: 16, radius: 24, delay: 102, duration: 1340, angle: -24, skew: -10, burstX: 40, apexX: 154, driftX: 96, apexY: 362, fallY: 96, spinMid: -166, spinEnd: -248, color: "#0ea5e9", shape: "circle" }
    ];
    const collectRibbonsRight = [
      { offset: 10, width: 12, height: 12, radius: 20, delay: 20, duration: 1260, angle: 24, skew: 6, burstX: -34, apexX: -130, driftX: -82, apexY: 324, fallY: 84, spinMid: 182, spinEnd: 270, color: "#38bdf8", shape: "circle" },
      { offset: 24, width: 16, height: 16, radius: 12, delay: 52, duration: 1340, angle: 18, skew: -8, burstX: -46, apexX: -154, driftX: -98, apexY: 366, fallY: 96, spinMid: 152, spinEnd: 236, color: "#3b82f6", shape: "diamond" },
      { offset: 38, width: 20, height: 20, radius: 10, delay: 8, duration: 1420, angle: 12, skew: 10, burstX: -58, apexX: -182, driftX: -120, apexY: 416, fallY: 116, spinMid: 130, spinEnd: 208, color: "#6366f1", shape: "triangle" },
      { offset: 52, width: 24, height: 24, radius: 24, delay: 74, duration: 1380, angle: 26, skew: -10, burstX: -44, apexX: -172, driftX: -114, apexY: 398, fallY: 108, spinMid: 168, spinEnd: 252, color: "#8b5cf6", shape: "circle" },
      { offset: 64, width: 14, height: 14, radius: 10, delay: 36, duration: 1280, angle: 30, skew: -6, burstX: -36, apexX: -140, driftX: -90, apexY: 338, fallY: 88, spinMid: 190, spinEnd: 282, color: "#a855f7", shape: "diamond" },
      { offset: 76, width: 26, height: 26, radius: 14, delay: 96, duration: 1460, angle: 16, skew: 12, burstX: -62, apexX: -196, driftX: -130, apexY: 432, fallY: 124, spinMid: 144, spinEnd: 224, color: "#d946ef", shape: "triangle" },
      { offset: 88, width: 18, height: 18, radius: 22, delay: 58, duration: 1360, angle: 22, skew: -8, burstX: -48, apexX: -160, driftX: -104, apexY: 378, fallY: 100, spinMid: 162, spinEnd: 246, color: "#f472b6", shape: "circle" }
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
      "--ribbon-burst-x": `${ribbon.burstX}rpx`,
      "--ribbon-apex-x": `${ribbon.apexX}rpx`,
      "--ribbon-drift-x": `${ribbon.driftX}rpx`,
      "--ribbon-apex-y": `${ribbon.apexY}rpx`,
      "--ribbon-fall-y": `${ribbon.fallY}rpx`,
      "--ribbon-spin-mid": `${ribbon.spinMid}deg`,
      "--ribbon-spin-end": `${ribbon.spinEnd}deg`,
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
        }, 1220);
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
