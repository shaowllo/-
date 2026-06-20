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
