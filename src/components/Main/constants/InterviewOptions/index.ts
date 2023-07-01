export type Options = {
  field: {
    [key: string]: string;
  };
  experience: {
    [key: string]: string;
  };
  lang: {
    [key: string]: string;
  };
};

export const options: Options = {
  field: {
    fe: '前端',
    be: '后端',
    fullstack: '全栈',
    pm:'产品',
    al:'算法',

  },
  experience: {
    starter: '校招/实习',
    junior: '初级',
    senior: '高级',
  },
  lang: {
    'en-US': 'English',
    'ru-RU': 'Russian',
    'cmn-Hans-CN': '中文',
    'hi-IN': 'Hindi',
    'de-DE': 'Deutsch',
    'fr-FR': 'Français',
    'es-AR': 'Español',
    'pt-BR': 'Português(Brasil)',
    'pt-PT': 'Português(Portugal)',
    'ko-KR': '한국어',
    'ja-JP': '日本語',
  },
};

export const INTERVIEW_OPTIONS = [
  {
    id: 1,
    label: '专业领域',
    name: 'field',
    type: 'dropdown',
    options: options.field,
    tooltipContent:
      '方便面将询问与您的专业领域相关的问题',
  },
  {
    id: 2,
    label: '工作经验',
    name: 'experience',
    type: 'dropdown',
    options: options.experience,
    tooltipContent:
      '方便面将根据您的工作经验提供反馈并跟进问题',
  },
  {
    id: 3,
    label: '语言',
    name: 'lang',
    type: 'dropdown',
    options: options.lang,
    tooltipContent:
      '方便面将根据你选择的语言进行问答',
  },
  {
    id: 4,
    label: 'OpenAI API Key',
    name: 'apiKey',
    type: 'input',
    tooltipContent:
      '输入OpenAI API Key',
  },
];
