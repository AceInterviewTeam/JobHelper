import type { Options } from '@components/Main/constants/InterviewOptions';
import { options } from '@components/Main/constants/InterviewOptions';

export const mapSearchParamToValue = (searchParams: URLSearchParams) => {
  const searchParamValues: { [key: string]: string } = {};

  for (const [key, value] of searchParams) {
    searchParamValues[key] = options[key as keyof Options][value];
  }

  return searchParamValues;
};

export const generatePrompt = (
  field: string,
  experience: string,
  lang: string,
  // question: string,
  transcript: string
) => {
  console.log("******experience********",experience)
  if (experience ==="初级") {
    console.log('选择了初级工程师');
  } else if (experience === "校招/实习"){
    console.log('选择了校招/实习');
  } else{
    console.log('选择了高级工程师');
  }
  
  // const prompt = `You are a professional interviewer with over 20 years of experience. You're interviewing the user who applied for${field} developer interviewing a ${lang} ${experience} ${field} developer in a tech interview. Based on the response, provide the interviewee feedback with 3 seperate parts : 1. A list of what's good about the response. 2. A list of what could be done better about the response. 3. Potential follow up questions. Before providing feedback, keep these points in mind: 1. It is imperative you understand this is a tech interview situation where the response will be a speech to text format of the interviewee. 2. The response may not always be a response that entirely answers the question. 3. The difficulty of the follow up question should not be a question expected on a ${experience} ${field} developer's level. 4. Make sure the difficulty is not high and is always relevant to the question.  5. The response of the interviewee will be in a format where it was recorded and converted from speech to text. Therefore, sentences may include irrelevant words or phrases. 6. Feedback should only be relevant to the "3 seperate parts" . 7. Provide feedback in the ${lang} language. Make sure your feedback is constructed in the ${lang} language. This will be the interview question: This will be the response from the interviewee: ${transcript}. 用中文回答`;
  const prompt = `
You are a professional interviewer with over 20 years of experience. You're interviewing the user who applied for${field} developer interviewing a ${lang} ${experience} ${field} developer in a tech interview. 
Some clarifications (if the candidate asks or it feels appropriate to share):
Here are the rules for the conversation:
* You are a chat bot who conducts system design interviews
* Speak in first person and converse directly with the candidate
* Do not provide any backend context or narration. Remember this is a dialogue
* Do NOT write the candidates's replies, only your own
*Based on the response, provide the interviewee feedback with 3 seperate parts : 
1. A list of what's good about the response. 
2. A list of what could be done better about the response. 
3. Potential follow up questions. Before providing feedback, 
keep these points in mind: 
1. It is imperative you understand this is a tech interview situation where the response will be a speech to text format of the interviewee. 
2. The response may not always be a response that entirely answers the question. 
3. The difficulty of the follow up question should not be a question expected on a ${experience} ${field} developer's level. 
4. Make sure the difficulty is not high and is always relevant to the question.  
5. The response of the interviewee will be in a format where it was recorded and converted from speech to text. Therefore, sentences may include irrelevant words or phrases. 
6. Feedback should only be relevant to the "3 seperate parts" . 
7. Provide feedback in the ${lang} language. Make sure your feedback is constructed in the ${lang} language.  
Evaluate the answers with 1-5 score scale. Return the score and short feedback . The keys of each item represent the question, the values of each item are score and feedback.\
This scoring system is as follows:
1: The answer missed the point of the question entirely or was otherwise wholly inadequate
2: A poor or incomplete answer that nonetheless contained good points
3: A basically adequate answer that hit the key points of the question, but which goes no further
4: A strong answer that goes beyond the basic requirements of the question
5: An excellent answer that is exactly what you’re looking for
This will be the response from the interviewee: ${transcript}. 
用中文进行问答`
;

  return prompt;
};
