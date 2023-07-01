import { options } from '@components/Main/constants/InterviewOptions';
import { optionsErrMap } from '../error/error';

export const validateRequestOptions = (searchParams: URLSearchParams) => {
  const errors: string[] = [];

  Object.keys(options).forEach(key => {
    const value = searchParams.get(key);

    if (!value || !Object.keys(options[key as keyof typeof options]).includes(value)) {
      errors.push(optionsErrMap[key as keyof typeof optionsErrMap]);
    }
  });
  
  if (errors.length > 0) {
    const errorMessage = `开始面试前请提供以下信息: ${errors.join(
      ', '
    )}`;
    throw new Error(errorMessage);
  }
};
