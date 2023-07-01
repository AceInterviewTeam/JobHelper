import type { FormValues } from '@@types/form';
import instance from '@api';
import { mapSearchParamToValue, generatePrompt } from './completion.utils';

interface CompletionApiProps extends Omit<FormValues, 'editedTranscript'> {
  searchParams: URLSearchParams;
}

const fetchOpenAICompletion = async ({
  searchParams,
  apiKey,
  // question,
  transcript,
}: CompletionApiProps) => {
  const { field, experience, lang } = mapSearchParamToValue(searchParams);

  const prompt = generatePrompt(field, experience, lang, transcript);
  const options = {
    model: 'gpt-3.5-turbo-0613',
    messages: [{ role: "user", content: prompt }],
    temperature: 0, 
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };
  // async function sendChatRequest(prompt: string): Promise<any> {
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${apiKey}`,
    //   },
    //   body: JSON.stringify({
    //     options,
    //     prompt
    //   }),
    // });
  
  //   const reader = response.body!.getReader();
  //   const decoder = new TextDecoder('utf-8');
  //   let str = '';
  //   while (true) {
  //     const { done, value } = await reader.read();
  //     if (done) {
  //       break;
  //     }
  //     str += decoder.decode(value);
  //     const result: {
  //       choices: {
  //         text: string;
  //       }[];
  //     } = JSON.parse(str);
  
  //     const { text } = result.choices[0];
  //     console.log(text); //将解析后的内容输出到控制台上
  //   }
  // }
  
  // sendChatRequest('Hello, how are you doing today?');


  const { data } = await instance.post('v1/chat/completions', options, config);
  // const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${apiKey}`,
  //   },
  //   body: JSON.stringify(options),
  // });

  

  // console.log("---------data------",response)
  // const response = data.choices[0].message.content.trim();
  // const json = JSON.parse(response);
  // const text = json.choices[0].delta?.content || "";
  // const reader = response.body!.getReader();
  // const decoder = new TextDecoder('utf-8');
  // let str = '';
  // while (true) {
  //   const { done, value } = await reader.read();
  //   if (done) {
  //     break;
  //   }
    

  //   str += decoder.decode(value);

  const response = data.choices[0].message.content.trim();
  console.log('**********response*******', data)
  return {
    id: data.id,
    response,
  };
};

export default fetchOpenAICompletion;
