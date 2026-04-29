"use strict";
const detailMap = {
  1: {
    id: 1,
    title: "街头机能穿搭",
    author: "Aiko",
    avatar: "/static/images/cover-1.jpg",
    time: "刚刚",
    tags: ["机能风", "城市", "穿搭"],
    desc: "冷感线条与层次叠穿，强调功能性与舒适度。",
    cover: "/static/images/cover-1.jpg",
    body: {
      intro: [
        "机能风的魅力在于结构感与实用性兼具，从剪裁到材质都强调层次与秩序。",
        "在灰黑主调中加入一点材质变化，能让整体更有力度，也更耐看。"
      ],
      images: ["/static/images/cover-2.jpg", "/static/images/cover-3.jpg"],
      paragraphs: [
        "搭配时可用紧身内搭打底，再用廓形外套形成对比，视觉更有张力。",
        "配饰尽量选择功能化细节，例如拉链、扣带与大容量口袋。",
        "色彩可以克制，但质感要突出，才能形成“冷感结构”的风格基调。"
      ],
      quote: "机能风不是单纯的黑灰堆砌，而是材质、结构与功能的综合平衡。",
      highlight: "留白与层次并存，是提升高级感的关键。"
    },
    timeline: [
      { id: 1, title: "确定主色", desc: "以黑灰为基底，搭配少量冷色做点缀。" },
      { id: 2, title: "选择材质", desc: "硬挺面料与光泽感面料形成对比。" },
      { id: 3, title: "叠穿结构", desc: "内短外长、局部露出，层次清晰。" },
      { id: 4, title: "功能细节", desc: "拉链、扣具、口袋提升机能感。" },
      { id: 5, title: "整体校准", desc: "控制配饰数量，保持干净利落。" }
    ],
    related: [
      { id: 2, title: "霓虹城市夜景", cover: "/static/images/cover-2.jpg" },
      { id: 3, title: "胶片感日常", cover: "/static/images/cover-3.jpg" },
      { id: 4, title: "极简家居", cover: "/static/images/cover-4.jpg" },
      { id: 5, title: "雨夜街角", cover: "/static/images/cover-5.jpg" },
      { id: 6, title: "现代建筑构图", cover: "/static/images/cover-6.jpg" },
      { id: 7, title: "风格色彩搭配", cover: "/static/images/cover-7.jpg" },
      { id: 8, title: "城市秩序感", cover: "/static/images/cover-8.jpg" },
      { id: 9, title: "层次质感", cover: "/static/images/cover-9.jpg" }
    ]
  },
  2: {
    id: 2,
    title: "霓虹城市夜景",
    author: "Ken",
    avatar: "/static/images/cover-2.jpg",
    time: "5 分钟前",
    tags: ["夜色", "城市", "光影"],
    desc: "霓虹灯与潮湿街道的反光，让城市夜色更具张力。",
    cover: "/static/images/cover-2.jpg",
    body: {
      intro: [
        "夜景的层次来自光线对比，亮部与暗部相互衬托才更有张力。",
        "在潮湿的街面上，反射会让色彩更饱和、更统一。"
      ],
      images: ["/static/images/cover-5.jpg", "/static/images/cover-6.jpg"],
      paragraphs: [
        "拍摄时保持低角度，能让霓虹在画面中形成纵深。",
        "适当增加曝光，让背景层次更丰富，但注意保留高光细节。",
        "构图上突出道路与建筑的引导线，能增强城市感。"
      ],
      quote: "夜色不是黑暗，而是由光点构成的秩序。",
      highlight: "控制对比度，才是夜景质感的关键。"
    },
    timeline: [
      { id: 1, title: "确定机位", desc: "选择低机位，突出路面反光。" },
      { id: 2, title: "控制曝光", desc: "稍微压高光，保留细节。" },
      { id: 3, title: "丰富色彩", desc: "让暖色霓虹成为视觉焦点。" },
      { id: 4, title: "留白节奏", desc: "保持画面节奏，避免拥挤。" },
      { id: 5, title: "统一氛围", desc: "后期统一色调，形成完整感。" }
    ],
    related: [
      { id: 1, title: "街头机能穿搭", cover: "/static/images/cover-1.jpg" },
      { id: 3, title: "胶片感日常", cover: "/static/images/cover-3.jpg" },
      { id: 4, title: "极简家居", cover: "/static/images/cover-4.jpg" },
      { id: 6, title: "现代建筑构图", cover: "/static/images/cover-6.jpg" },
      { id: 7, title: "风格色彩搭配", cover: "/static/images/cover-7.jpg" },
      { id: 8, title: "城市秩序感", cover: "/static/images/cover-8.jpg" },
      { id: 9, title: "层次质感", cover: "/static/images/cover-9.jpg" },
      { id: 10, title: "夜色构图", cover: "/static/images/cover-10.jpg" }
    ]
  },
  3: {
    id: 3,
    title: "胶片感日常",
    author: "Mio",
    avatar: "/static/images/cover-3.jpg",
    time: "15 分钟前",
    tags: ["生活", "胶片", "温柔"],
    desc: "颗粒与柔光的组合，带来温柔又真实的生活气息。",
    cover: "/static/images/cover-3.jpg",
    body: {
      intro: [
        "胶片感来自细腻的颗粒与柔和的色彩，重点在于氛围而非清晰度。",
        "用自然光拍摄，可以获得更真实的肤色与影调。"
      ],
      images: ["/static/images/cover-1.jpg", "/static/images/cover-4.jpg"],
      paragraphs: [
        "在画面中加入轻微失焦区域，可以让主体更突出。",
        "拍摄日常场景时，选择安静的背景更能突出情绪。",
        "后期适当降低对比度，使画面更柔和。"
      ],
      quote: "温柔来自细节的克制，而不是过度修饰。",
      highlight: "颗粒感是情绪的载体，不是噪点。"
    },
    timeline: [
      { id: 1, title: "选择时间", desc: "清晨或傍晚的自然光最柔和。" },
      { id: 2, title: "控制对比", desc: "让高光略微柔化。" },
      { id: 3, title: "构图留白", desc: "给情绪留出呼吸感。" },
      { id: 4, title: "加入颗粒", desc: "颗粒让画面更有记忆感。" },
      { id: 5, title: "色调统一", desc: "保持整体一致性。" }
    ],
    related: [
      { id: 1, title: "街头机能穿搭", cover: "/static/images/cover-1.jpg" },
      { id: 2, title: "霓虹城市夜景", cover: "/static/images/cover-2.jpg" },
      { id: 4, title: "极简家居", cover: "/static/images/cover-4.jpg" },
      { id: 5, title: "雨夜街角", cover: "/static/images/cover-5.jpg" },
      { id: 6, title: "现代建筑构图", cover: "/static/images/cover-6.jpg" },
      { id: 7, title: "风格色彩搭配", cover: "/static/images/cover-7.jpg" },
      { id: 8, title: "城市秩序感", cover: "/static/images/cover-8.jpg" },
      { id: 9, title: "层次质感", cover: "/static/images/cover-9.jpg" }
    ]
  },
  4: {
    id: 4,
    title: "极简家居",
    author: "Lynn",
    avatar: "/static/images/cover-4.jpg",
    time: "30 分钟前",
    tags: ["家居", "秩序", "简洁"],
    desc: "去繁就简的空间线条，让日常回归秩序与宁静。",
    cover: "/static/images/cover-4.jpg",
    body: {
      intro: [
        "极简强调秩序与空间感，选择合适的留白能提升舒适度。",
        "材质质感比数量更重要，少即是多。"
      ],
      images: ["/static/images/cover-7.jpg", "/static/images/cover-8.jpg"],
      paragraphs: [
        "家具线条保持统一，可以让空间更有整体感。",
        "光线选择偏暖色系，会让空间更舒适。",
        "装饰可以少，但要有质感。"
      ],
      quote: "减少不必要的元素，才能让空间真正呼吸。",
      highlight: "留白是高级感的核心。"
    },
    timeline: [
      { id: 1, title: "整理空间", desc: "去除杂乱物品。" },
      { id: 2, title: "统一材质", desc: "选择统一色调与材质。" },
      { id: 3, title: "控制家具", desc: "家具数量适度，突出功能性。" },
      { id: 4, title: "光线规划", desc: "用柔光提升舒适度。" },
      { id: 5, title: "最终校准", desc: "保持干净与秩序感。" }
    ],
    related: [
      { id: 1, title: "街头机能穿搭", cover: "/static/images/cover-1.jpg" },
      { id: 2, title: "霓虹城市夜景", cover: "/static/images/cover-2.jpg" },
      { id: 3, title: "胶片感日常", cover: "/static/images/cover-3.jpg" },
      { id: 5, title: "雨夜街角", cover: "/static/images/cover-5.jpg" },
      { id: 6, title: "现代建筑构图", cover: "/static/images/cover-6.jpg" },
      { id: 7, title: "风格色彩搭配", cover: "/static/images/cover-7.jpg" },
      { id: 8, title: "城市秩序感", cover: "/static/images/cover-8.jpg" },
      { id: 9, title: "层次质感", cover: "/static/images/cover-9.jpg" }
    ]
  }
};
exports.detailMap = detailMap;
//# sourceMappingURL=../../.sourcemap/mp-weixin/data/detail.js.map
