export interface SiteConfig {
  language: string
  siteTitle: string
  siteDescription: string
}

export interface NavigationLink {
  label: string
  href: string
}

export interface NavigationConfig {
  brandName: string
  links: NavigationLink[]
}

export interface HeroConfig {
  titleLines: string[]
  subtitle: string
}

export interface ManifestoConfig {
  headingText: string
  bodyText: string
  videoPath: string
}

export interface ExhibitionArticleSection {
  heading: string
  body: string
}

export interface ExhibitionItem {
  slug: string
  title: string
  image: string
  year: string
  eyebrow: string
  intro: string
  sections: ExhibitionArticleSection[]
}

export interface ExhibitionsConfig {
  sectionLabel: string
  countLabel: string
  detailBackText: string
  items: ExhibitionItem[]
}

export interface PavilionVideoItem {
  src: string
  caption: string
}

export interface PavilionsConfig {
  sectionLabel: string
  videos: PavilionVideoItem[]
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterConfig {
  visitLabel: string
  visitLines: string[]
  connectLabel: string
  connectLinks: FooterLink[]
  brandName: string
  rightsText: string
  coordinatesText: string
}

// ===== SITE CONFIG =====
export const siteConfig: SiteConfig = {
  language: "zh-CN",
  siteTitle: "山海经古籍数字档案馆",
  siteDescription: "沉浸式《山海经》古籍数字博览，探索上古地理志怪、神兽图鉴与远古疆域。",
}

// ===== NAVIGATION =====
export const navigationConfig: NavigationConfig = {
  brandName: "山海经",
  links: [
    { label: "卷宗", href: "#exhibitions" },
    { label: "古籍", href: "#reader" },
    { label: "资源", href: "#resources" },
    { label: "致古", href: "#manifesto" },
  ],
}

// ===== HERO =====
export const heroConfig: HeroConfig = {
  titleLines: ["山海经"],
  subtitle: "上古奇书 · 志怪地理之祖",
}

// ===== MANIFESTO =====
export const manifestoConfig: ManifestoConfig = {
  headingText: "致古",
  bodyText: "《山海经》成书于先秦，是一部载有怪奇之玩、地理之知的古代百科全书。其文辞简古，意象瑰奇，记录了五百五十余座山峦、三百余条水脉、四百多种异兽与数十个远古邦国。本馆以数字策展之法，将这部上古遗典以当代视觉语言重新呈现，使千年志怪重焕光彩，让远古疆域再度浮现。",
  videoPath: "/videos/manifesto.mp4",
}

// ===== EXHIBITIONS / 神兽档案 =====
export const exhibitionsConfig: ExhibitionsConfig = {
  sectionLabel: "神兽档案",
  countLabel: "共收录异兽四百二十七种",
  detailBackText: "返回卷宗",
  items: [
    {
      slug: "jiuwei-hu",
      title: "九尾狐",
      image: "/images/kitsune.jpg",
      year: "南山经",
      eyebrow: "青丘之山有兽",
      intro: "九尾狐栖息于青丘之山，其状如狐而九尾，其音如婴儿，能食人。食之不蛊，见则天下太平。作为《山海经》中最为人熟知的瑞兽之一，九尾狐在后世的文学与民间信仰中承载了从祥瑞到魅惑的复杂象征意涵。",
      sections: [
        {
          heading: "出处与记载",
          body: "《南山经》载：『青丘之山，有兽焉，其状如狐而九尾，其音如婴儿，能食人，食者不蛊。』郭璞注曰：『九尾狐，太平则出而为瑞。』其形象最早可追溯至先秦时期的图腾崇拜，九尾象征九子繁衍生息，是先民对家族兴旺的祈愿投射。",
        },
        {
          heading: "文化意涵",
          body: "九尾狐在中国文化史中经历了从祥瑞到妖魅的复杂演变。汉代以前，九尾狐被视为太平盛世的吉兆，大禹治水时遇涂山氏女，便有九尾白狐的祥瑞之兆。至唐宋以后，其形象逐渐与狐仙、妖魅等民间传说交融，成为文学想象中最富魅力的志怪形象之一。",
        },
      ],
    },
    {
      slug: "fenghuang",
      title: "凤凰",
      image: "/images/phoenix.jpg",
      year: "南山经",
      eyebrow: "丹穴之山有鸟",
      intro: "凤凰出于丹穴之山，其状如鸡，五采而文，名曰凤皇。首文曰德，翼文曰义，背文曰礼，膺文曰仁，腹文曰信，是鸟也，饮食自然，自歌自舞，见则天下安宁。",
      sections: [
        {
          heading: "出处与记载",
          body: "《南山经》载：『丹穴之山，有鸟焉，其状如鸡，五采而文，名曰凤皇。首文曰德，翼文曰义，背文曰礼，膺文曰仁，腹文曰信。』凤凰作为百鸟之王，其形象集合了多种禽鸟的特征，是中国古代最重要的祥瑞图腾之一。",
        },
        {
          heading: "五德象征",
          body: "凤凰身上的五色纹饰被赋予了儒家五德的象征意义——德、义、礼、仁、信。这种将自然形态与伦理道德相附会的诠释方式，典型地体现了中国古代『天人合一』的宇宙观。凤凰不仅是祥瑞之鸟，更成为儒家理想人格的物化象征。",
        },
      ],
    },
    {
      slug: "zhulong",
      title: "烛龙",
      image: "/images/zhulong.jpg",
      year: "海外经",
      eyebrow: "西北海之外有神",
      intro: "烛龙居于西北海之外，赤水之北，章尾山上。其为物人面蛇身而赤，直目正乘，其瞑乃晦，其视乃明，不食不寝不息，风雨是谒。是烛九阴，是谓烛龙。",
      sections: [
        {
          heading: "出处与记载",
          body: "《海外北经》载：『钟山之神，名曰烛阴，视为昼，瞑为夜，吹为冬，呼为夏。不饮，不食，不息，息为风。身长千里。在无启之东。其为物，人面，蛇身，赤色，居钟山下。』烛龙是《山海经》中最具神性的存在之一，其睁眼为昼、闭眼为夜的能力，使其成为上古先民对光明与黑暗最原始的神话想象。",
        },
        {
          heading: "创世神格",
          body: "烛龙在后世神话体系中逐渐被赋予创世神的地位。其『烛九阴』的能力——照亮九幽之底，使其成为超越自然规律的至上存在。有学者认为，烛龙的形象可能源自远古时期对火山或极光的观察与想象，是先民将自然现象人格化的典型例证。",
        },
      ],
    },
    {
      slug: "taotie",
      title: "饕餮",
      image: "/images/taotie.jpg",
      year: "北山经",
      eyebrow: "钩吾之山有兽",
      intro: "饕餮居于钩吾之山，其状如羊身人面，其目在腋下，虎齿人爪，其音如婴儿，名曰狍鸮，是食人。饕餮性好食，贪食无厌，后世以『饕餮』为贪婪之象征，常见于商周青铜器的装饰纹样。",
      sections: [
        {
          heading: "出处与记载",
          body: "《北山经》载：『钩吾之山，其上多玉，其下多铜。有兽焉，其状如羊身人面，其目在腋下，虎齿人爪，其音如婴儿，名曰狍鸮，是食人。』郭璞注曰：『为物贪惏，食人未尽，还害其身，像在夏鼎。』",
        },
        {
          heading: "青铜器纹",
          body: "饕餮纹是商周青铜器上最具代表性的装饰母题之一。其夸张的面目特征——巨大的双目、咧开的嘴、对称的角——构成了一种庄严而神秘的视觉力量。青铜器上的饕餮纹并非单纯的装饰，更承载着『铸鼎象物，使民知神奸』的礼制功能，是上古宗教信仰与艺术创造的结晶。",
        },
      ],
    },
    {
      slug: "qilin",
      title: "麒麟",
      image: "/images/qilin.jpg",
      year: "海外经",
      eyebrow: "仁兽之象征",
      intro: "麒麟为仁兽，麋身牛尾，一角，角端有肉，设武备而不为害，所以为仁也。不履生虫，不折生草，不食活物。麒麟出则圣人现，是中国古代最重要的祥瑞之兽之一。",
      sections: [
        {
          heading: "出处与记载",
          body: "《山海经》中多处记载与麒麟相关的神兽形象。麒麟在古籍中又称『麟』、『仁兽』，其形象融合了鹿、牛、马等多种动物的特征。许慎《说文解字》曰：『麒，仁兽也，麋身牛尾，一角。』麒麟的形象在后世的艺术表现中逐渐丰富，成为中国人最熟悉的祥瑞图腾之一。",
        },
        {
          heading: "祥瑞文化",
          body: "麒麟在中国传统文化中象征着仁德与太平。孔子出生前，有麒麟吐玉书于其家，这个故事使麒麟与圣人崇拜紧密相连。麒麟『不履生虫，不折生草』的品格，体现了儒家『仁民爱物』的伦理理想。直至今日，麒麟仍是中国人祈福纳祥最常用的文化符号。",
        },
      ],
    },
    {
      slug: "baize",
      title: "白泽",
      image: "/images/baize.jpg",
      year: "海内经",
      eyebrow: "通灵之兽",
      intro: "白泽是昆仑山上的通灵神兽，通体雪白，能言人语，通晓天下鬼神之事。传说黄帝巡游东海，遇白泽，白泽为黄帝言天下鬼神之事，凡一万一千五百二十种。黄帝命人图写其形，以昭示天下。",
      sections: [
        {
          heading: "出处与记载",
          body: "白泽最早见于《山海经》海内经的相关记载，但其最详细的记录保存在《云笈七签》等后世道藏文献中。据载，黄帝『巡游东海，登桓山，于海滨得白泽神兽，能言，达于万物之情。因问天下鬼神之事，自古及今，精气为物、游魂为变者，凡万一千五百二十种。白泽言之，帝令以图写之，以示天下。』",
        },
        {
          heading: "辟邪象征",
          body: "白泽图在古代被广泛用于辟邪厌胜。人们将白泽的形象绘制于门扇、旗帜之上，相信其能够驱鬼避邪。白泽『能言』的特性，使其成为沟通人神两界的媒介，是上古神话中知识传授者的原型。白泽的故事体现了先民对自然界未知力量的敬畏与求知欲望。",
        },
      ],
    },
  ],
}

// ===== PAVILIONS / 远古疆域 =====
export const pavilionsConfig: PavilionsConfig = {
  sectionLabel: "远古疆域",
  videos: [
    {
      src: "/videos/manifesto.mp4",
      caption: "古籍修复与数字化保护",
    },
  ],
}

// ===== FOOTER =====
export const footerConfig: FooterConfig = {
  visitLabel: "参观信息",
  visitLines: [
    "山海经古籍数字档案馆",
    "开放时间：全日无休",
    "地址：数字疆域 · 云端之上",
  ],
  connectLabel: "链接",
  connectLinks: [
    { label: "关于本站", href: "#manifesto" },
    { label: "神兽档案", href: "#exhibitions" },
    { label: "远古疆域", href: "#pavilions" },
  ],
  brandName: "山海经",
  rightsText: "本馆致力于中华古籍的数字化保护与文化传承",
  coordinatesText: "源自先秦 · 传承千年",
}
