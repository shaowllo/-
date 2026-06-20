import type { ClassicalText } from '../types/classical';

export const shanhaijing: ClassicalText = {
  id: 'shanhaijing',
  title: '山海经',
  traditionalTitle: '山海經',
  author: '佚名',
  dynasty: '先秦',
  description: '《山海经》是中国先秦重要古籍，也是一部富于神话传说的最古老的奇书。该书作者不详，现代学者均认为成书并非一时，作者亦非一人。',
  coverImage: '/images/shanhaijing-cover.jpg',
  chapters: [
    {
      id: 'nanshanjing',
      title: '南山经',
      traditionalTitle: '南山經',
      pageNumber: 1,
      content: `南山经之首曰鹊山。其首曰招摇之山，临于西海之上，多桂，多金玉。有草焉，其状如韭而青华，其名曰祝余，食之不饥。有木焉，其状如榖而黑理，其华四照，其名曰迷榖，佩之不迷。有兽焉，其状如禺而白耳，伏行人走，其名曰狌狌，食之善走。丽麂之水出焉，而西流注于海，其中多育沛，佩之无瘕疾。

又东三百里曰堂庭之山，多棪木，多白猿，多水玉，多黄金。

又东三百八十里曰猨翼之山，其中多怪兽，水多怪鱼，多白玉，多蝮虫，多怪蛇，多怪木，不可以上。

又东三百七十里曰杻阳之山，其阳多赤金，其阴多白金。有兽焉，其状如马而白首，其文如虎而赤尾，其音如谣，其名曰鹿蜀，佩之宜子孙。怪水出焉，而东流注于宪翼之水。其中多玄鱼，其状如龟而鸟首虺尾，其名曰旋龟，其音如判木，佩之不聋，可以为底。`,
      traditionalContent: `南山經之首曰鵲山。其首曰招搖之山，臨於西海之上，多桂，多金玉。有草焉，其狀如韭而青華，其名曰祝餘，食之不饑。有木焉，其狀如榖而黑理，其華四照，其名曰迷榖，佩之不迷。有獸焉，其狀如禺而白耳，伏行人走，其名曰狌狌，食之善走。麗麂之水出焉，而西流注於海，其中多育沛，佩之無瘕疾。

又東三百里曰堂庭之山，多棪木，多白猿，多水玉，多黃金。

又東三百八十里曰猨翼之山，其中多怪獸，水多怪魚，多白玉，多蝮蟲，多怪蛇，多怪木，不可以上。

又東三百七十里曰杻陽之山，其陽多赤金，其陰多白金。有獸焉，其狀如馬而白首，其文如虎而赤尾，其音如謠，其名曰鹿蜀，佩之宜子孫。怪水出焉，而東流注於憲翼之水。其中多玄魚，其狀如龜而鳥首虺尾，其名曰旋龜，其音如判木，佩之不聾，可以為底。`,
      annotations: [
        { id: '1', word: '招摇', pinyin: 'zhāo yáo', explanation: '山名，传说中的仙山。', position: 12 },
        { id: '2', word: '祝余', pinyin: 'zhù yú', explanation: '传说中的仙草，食之不饥。', position: 45 },
        { id: '3', word: '迷榖', pinyin: 'mí gǔ', explanation: '传说中的神木，佩之不迷失方向。', position: 78 },
        { id: '4', word: '狌狌', pinyin: 'xīng xīng', explanation: '传说中的兽类，形似猿猴，食之善走。', position: 112 },
        { id: '5', word: '鹿蜀', pinyin: 'lù shǔ', explanation: '传说中的神兽，马身虎纹，佩之宜子孙。', position: 245 },
        { id: '6', word: '旋龟', pinyin: 'xuán guī', explanation: '传说中的神龟，鸟首虺尾，佩之不聋。', position: 298 },
      ],
    },
    {
      id: 'xishanjing',
      title: '西山经',
      traditionalTitle: '西山經',
      pageNumber: 2,
      content: `西山经华山之首曰钱来之山，其上多松，其下多洗石。有兽焉，其状如羊而马尾，名曰羬羊，其脂可以已腊。

西四十五里曰松果之山。濩水出焉，北流注于渭，其中多铜。有鸟焉，其名曰䳋渠，其状如山鸡，黑身赤足，可以已𦢊。

又西六十里曰太华之山，削成而四方，其高五千仞，其广十里，鸟兽莫居。有蛇焉，名曰肥遗，六足四翼，见则天下大旱。`,
      traditionalContent: `西山經華山之首曰錢來之山，其上多松，其下多洗石。有獸焉，其狀如羊而馬尾，名曰羬羊，其脂可以已臘。

西四十五里曰松果之山。濩水出焉，北流注於渭，其中多銅。有鳥焉，其名曰䳋渠，其狀如山雞，黑身赤足，可以已𦢊。

又西六十里曰太華之山，削成而四方，其高五千仞，其廣十里，鳥獸莫居。有蛇焉，名曰肥遺，六足四翼，見則天下大旱。`,
      annotations: [
        { id: '7', word: '羬羊', pinyin: 'qián yáng', explanation: '传说中的神兽，羊身马尾，其脂可治皮肤干裂。', position: 45 },
        { id: '8', word: '肥遗', pinyin: 'féi yí', explanation: '传说中的怪蛇，六足四翼，出现则天下大旱。', position: 156 },
      ],
    },
    {
      id: 'beishanjing',
      title: '北山经',
      traditionalTitle: '北山經',
      pageNumber: 3,
      content: `北山经之首曰单狐之山，多机木，其上多华草。漨水出焉，而西流注于泑水，其中多芘石文石。

又北二百五十里曰求如之山，其上多铜，其下多玉，无草木。滑水出焉，而西流注于诸毗之水。其中多滑鱼，其状如鱓，赤背，其音如梧，食之已疣。`,
      traditionalContent: `北山經之首曰單狐之山，多機木，其上多華草。漨水出焉，而西流注於泑水，其中多芘石文石。

又北二百五十里曰求如之山，其上多銅，其下多玉，無草木。滑水出焉，而西流注於諸毗之水。其中多滑魚，其狀如鱓，赤背，其音如梧，食之已疣。`,
      annotations: [
        { id: '9', word: '机木', pinyin: 'jī mù', explanation: '即桤木，落叶乔木。', position: 15 },
        { id: '10', word: '滑鱼', pinyin: 'huá yú', explanation: '传说中的怪鱼，形似鳝鱼，赤背，食之可治疣病。', position: 98 },
      ],
    },
    {
      id: 'dongshanjing',
      title: '东山经',
      traditionalTitle: '東山經',
      pageNumber: 4,
      content: `东山经之首曰樕蛛之山，北临乾昧，食水出焉，而东北流注于海。其中多鳙鳙之鱼，其状如犁牛，其音如彘鸣。

又南三百里曰藟山，其上有玉，其下有金。湖水出焉，东流注于食水，其中多活师。

又南三百里曰栒状之山，其上多金玉，其下多青碧石。有兽焉，其状如犬，六足，其名曰从从，其鸣自詨。有鸟焉，其状如鸡而鼠毛，其名曰䖪鼠，见则其邑大旱。`,
      traditionalContent: `東山經之首曰樕蛛之山，北臨乾昧，食水出焉，而東北流注于海。其中多鱅鱅之魚，其狀如犁牛，其音如彘鳴。

又南三百里曰藟山，其上有玉，其下有金。湖水出焉，東流注于食水，其中多活師。

又南三百里曰栒狀之山，其上多金玉，其下多青碧石。有獸焉，其狀如犬，六足，其名曰從從，其鳴自詨。有鳥焉，其狀如雞而鼠毛，其名曰䖪鼠，見則其邑大旱。`,
      annotations: [
        { id: '11', word: '鳙鳙', pinyin: 'yōng yōng', explanation: '传说中的鱼，形如犁牛，声如猪鸣。', position: 45 },
        { id: '12', word: '从从', pinyin: 'cōng cōng', explanation: '六足之兽，其鸣声自呼其名。', position: 148 },
        { id: '13', word: '䖪鼠', pinyin: 'zī shǔ', explanation: '形如鸡而有鼠毛之鸟，见则大旱。', position: 168 },
      ],
    },
    {
      id: 'zhongshanjing',
      title: '中山经',
      traditionalTitle: '中山經',
      pageNumber: 5,
      content: `中山经薄山之首曰甘枣之山。共水出焉，而西流注于河。其上多杻木，其下有草焉，葵本而杏叶，黄华而荚实，其名曰箨，可以已瞢。有兽焉，其状如虎而白尾，其名曰马腹，食之不畏雷。

又东二十里曰历儿之山，其上多橿，多枥木。是木也，方茎而员叶，黄华而毛，其实如拣，服之不忘。

又东十五里曰渠猪之山，其上多竹。渠猪之水出焉，而南流注于河。其中是多豪鱼，状如鲔，赤喙尾赤羽，可以已白癣。`,
      traditionalContent: `中山經薄山之首曰甘棗之山。共水出焉，而西流注于河。其上多杻木，其下有草焉，葵本而杏葉，黃華而莢實，其名曰籜，可以已瞢。有獸焉，其狀如虎而白尾，其名曰馬腹，食之不畏雷。

又東二十里曰歷兒之山，其上多橿，多櫪木。是木也，方莖而員葉，黃華而毛，其實如揀，服之不忘。

又東十五里曰渠豬之山，其上多竹。渠豬之水出焉，而南流注于河。其中是多豪魚，狀如鮪，赤喙尾赤羽，可以已白癬。`,
      annotations: [
        { id: '14', word: '箨', pinyin: 'tuò', explanation: '传说草名，葵本杏叶黄华，可治眼疾。', position: 56 },
        { id: '15', word: '马腹', pinyin: 'mǎ fù', explanation: '虎身白尾之兽，食之不畏雷。', position: 82 },
        { id: '16', word: '豪鱼', pinyin: 'háo yú', explanation: '形如鲔鱼，赤喙尾赤羽，可治白癣。', position: 178 },
      ],
    },
    {
      id: 'haiwainan',
      title: '海外南经',
      traditionalTitle: '海外南經',
      pageNumber: 6,
      content: `海外南经：地之所载，六合之间，四海之内，照之以日月，经之以星辰，纪之以四时，要之以太岁。神灵所生，其物异形，或夭或寿，唯圣人能通其道。

海外自西南陬至东南陬者。结匈国在其西南，其为人结匈。南山在其东南，自此山来，虫为蛇，蛇号为鱼。一曰南山在结匈东南。比翼鸟在其东，其为鸟青赤，两鸟比翼。一曰在南山东。`,
      traditionalContent: `海外南經：地之所載，六合之間，四海之內，照之以日月，經之以星辰，紀之以四時，要之以太歲。神靈所生，其物異形，或夭或壽，唯聖人能通其道。

海外自西南陬至東南陬者。結匈國在其西南，其為人結匈。南山在其東南，自此山來，蟲為蛇，蛇號為魚。一曰南山在結匈東南。比翼鳥在其東，其為鳥青赤，兩鳥比翼。一曰在南山東。`,
      annotations: [
        { id: '17', word: '结匈国', pinyin: 'jié xiōng guó', explanation: '传说之国，其民胸部向前突出。', position: 62 },
        { id: '18', word: '比翼鸟', pinyin: 'bǐ yì niǎo', explanation: '传说中的神鸟，青赤两色，两鸟并飞。', position: 112 },
      ],
    },
    {
      id: 'haiwaixi',
      title: '海外西经',
      traditionalTitle: '海外西經',
      pageNumber: 7,
      content: `海外西南陬至西北陬者。灭蒙鸟在结匈国北，为鸟青，赤尾。大运山高三百仞，在灭蒙鸟北。大乐之野，夏后启于此舞九代，乘两龙，云盖三层。左手操翳，右手操环，佩玉璜。在大运山北，一曰大遗之野。

三身国在夏后启北，一首而三身。一臂国在其北，一臂一目一鼻孔。有黄马虎文，一目而一手。`,
      traditionalContent: `海外西南陬至西北陬者。滅蒙鳥在結匈國北，為鳥青，赤尾。大運山高三百仞，在滅蒙鳥北。大樂之野，夏后啟於此舞九代，乘兩龍，雲蓋三層。左手操翳，右手操環，佩玉璜。在大運山北，一曰大遺之野。

三身國在夏后啟北，一首而三身。一臂國在其北，一臂一目一鼻孔。有黃馬虎文，一目而一手。`,
      annotations: [
        { id: '19', word: '夏后启', pinyin: 'xià hòu qǐ', explanation: '夏朝君主，大禹之子，于大乐之野舞九代。', position: 68 },
        { id: '20', word: '三身国', pinyin: 'sān shēn guó', explanation: '传说之国，一首而有三个身体。', position: 108 },
      ],
    },
    {
      id: 'haiwabei',
      title: '海外北经',
      traditionalTitle: '海外北經',
      pageNumber: 8,
      content: `海外自东北陬至西北陬者。无启国在长股东，为人无启。钟山之神名曰烛阴，视为昼，瞑为夜，吹为冬，呼为夏。不饮不食不息，息为风。身长千里。在无启之东。其为物，人面蛇身，赤色，居钟山下。

一目国在其东，一目中其面而居。柔利国在一目东，为人一手一足，反膝曲足居上。一云留利之国。`,
      traditionalContent: `海外自東北陬至西北陬者。無啟國在長股東，為人無启。鍾山之神名曰燭陰，視為晝，瞑為夜，吹為冬，呼為夏。不飲不食不息，息為風。身長千里。在無啟之東。其為物，人面蛇身，赤色，居鍾山下。

一目國在其東，一目中其面而居。柔利國在一目東，為人一手一足，反膝曲足居上。一云留利之國。`,
      annotations: [
        { id: '21', word: '烛阴', pinyin: 'zhú yīn', explanation: '钟山之神，人面蛇身赤色，睁眼为昼闭眼为夜。', position: 32 },
        { id: '22', word: '一目国', pinyin: 'yī mù guó', explanation: '传说之国，人面上只有一只眼睛居中。', position: 86 },
      ],
    },
  ],
  externalLinks: [
    {
      id: 'shidianguji',
      name: '识典古籍',
      url: 'https://www.shidianguji.com/',
      description: '北京大学与字节跳动合作建设的古籍数字化平台，提供海量古籍检索与阅读。',
      icon: 'BookOpen',
    },
    {
      id: 'nlc',
      name: '国家图书馆',
      url: 'https://www.nlc.cn/',
      description: '中国国家图书馆数字资源平台，收录珍贵古籍善本。',
      icon: 'Library',
    },
    {
      id: 'ctext',
      name: '中国哲学书电子化计划',
      url: 'https://ctext.org/',
      description: '线上开放电子图书馆，提供大量中文古籍原文及翻译。',
      icon: 'Globe',
    },
    {
      id: 'guoxue',
      name: '国学网',
      url: 'http://www.guoxue.com/',
      description: '综合性国学研究网站，提供古籍文献与研究资料。',
      icon: 'Scroll',
    },
  ],
};

export const classicalTexts: ClassicalText[] = [shanhaijing];

export function getTextById(id: string): ClassicalText | undefined {
  return classicalTexts.find((text) => text.id === id);
}

export function getChapterById(textId: string, chapterId: string) {
  const text = getTextById(textId);
  return text?.chapters.find((ch) => ch.id === chapterId);
}
