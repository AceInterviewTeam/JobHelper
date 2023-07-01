import { AxiosError } from 'axios';

// interview options
export const optionsErrMap = {
  field: '专业领域',
  experience: '工作经验',
  lang: '语言',
};

// speech recognition
export const speechRecognitionErrMap = {
  userMedia: {
    NotAllowedError:
      '请在浏览器设置中启用麦克风访问权限或输入您的答案继续',
    NotFoundError:
      '没有麦克风？ 尝试点击“编辑”提交您的答案',
    NotReadableError: `您的音频设备当前未产生可用信号并且当前不可用。 请检查您的设备或尝试通过单击“编辑”提交您的答案。`,
  },
  unsupported:
    '此浏览器不支持语音识别。 尝试通过单击“编辑”提交您的答案。',
  connection:
    '没有麦克风？ 尝试通过单击“编辑”提交您的答案。',
};

// axios
type HttpStatus = 401 | 404 | 429 | 500 | 503;

const httpStatusErrMap: Record<HttpStatus, string> = {
  401: `Your API key is not valid. Make sure you've provided a correct API key with enough tokens. If you dont have an API key, generate a new one at https://platform.openai.com/account/api-keys.`,
  404: 'The requested resource could not be found.',
  429: `We're experiencing high traffic or you have exceeded your current quota. Please check your plan and billing details at https://platform.openai.com/account/billing/limits.`,
  500: 'The server had an error while processing your request. Retry submitting your answer after a brief wait.',
  503: 'The server is currently unavailable. Retry submitting your answer after a brief wait.',
};

export const getAxiosError = (err: AxiosError) => {
  const httpStatus = err.response?.status ?? 0;

  if (!err.response) {
    return `请检查你的网络连接 : ${err.message}.`;
  }
  if (httpStatus in httpStatusErrMap) {
    return httpStatusErrMap[httpStatus as HttpStatus];
  } else {
    return `[${err.message}]: 请等待后重试提交您的答案。`;
  }
};
