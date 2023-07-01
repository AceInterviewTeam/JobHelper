import type { ActionButtonProps } from '@@types/form';
import spinner from '@assets/Main/spinner.svg'
import useForm from '@hooks/useForm';
import { useFormSelector } from '@store/formContext';
import useSpeechRecognition from './useSpeechRecognition';
import useGetQuestion from './useGetQuestion';

type FormButtonConfig = ActionButtonProps & {
  shouldRender: boolean;
};

const useFormButtonConfig = () => {
  const { formValues: { transcript }, isValid, isEditing, isLoading, isRetry } = useFormSelector();
  const { handleValidateForm, handleSubmitForm, handleEditMode, handleSaveEdit, handleCancelEdit } = useForm();
  const { isRecording, isBrowserUnsupported, mediaDeviceErr, setMediaDeviceErr, startSpeechRecognition, stopSpeechRecognition }= useSpeechRecognition();
  const { handleGetQuestion } = useGetQuestion(!isRetry && isValid);
  
  const isFormReadyToSubmit = Boolean(transcript) && !isRecording;

  const startInterviewButton = {
    id: 1,
    onClickHandler: handleValidateForm,
    variant: 'primary',
    label: '开始面试',
    shouldRender: !isValid,
  };

  const submitButton = {
    id: 2,
    onClickHandler: handleSubmitForm,
    variant: 'primary',
    label: isLoading ? <img src={spinner} alt='loading' className='mx-8'/> : '提交答案',
    disabled: isLoading || isEditing || !isFormReadyToSubmit,
    shouldRender: isValid && isFormReadyToSubmit,
  };

  const recordButton = {
    id: 3,
    onClickHandler: isRecording ? stopSpeechRecognition : startSpeechRecognition,
    variant: 'primary',
    label: isRecording ? '停止录音' : '开始录制答案',
    tooltipContent: mediaDeviceErr,
    setTooltipContent: setMediaDeviceErr,
    className: isRecording ? 'animate-fade-in-out' : '',
    disabled: isEditing || isFormReadyToSubmit || isBrowserUnsupported,
    shouldRender: isValid && !isFormReadyToSubmit,
  };

  const editButton = {
    id: 4,
    onClickHandler: isEditing ? handleSaveEdit : handleEditMode,
    variant: 'secondary',
    label: isEditing ? '保存' : '编辑',
    disabled: isRecording || isLoading,
    shouldRender: isValid,
  };

  const cancelEditButton = {
    id: 5,
    onClickHandler: handleCancelEdit,
    variant: 'secondary',
    label: '取消',
    shouldRender: isValid && isEditing,
  };

  const changeQuestionButton = {
    id: 6,
    onClickHandler: handleGetQuestion,
    variant: 'secondary',
    label: '更换问题',
    className: 'absolute right-0 md:static',
    disabled: isRecording || isEditing || isLoading,
    shouldRender: isValid,
  };

  const formButtonsConfig: FormButtonConfig[] = [
    startInterviewButton,
    submitButton,
    recordButton,
    editButton,
    cancelEditButton,
    changeQuestionButton,
  ];

  return { formButtonsConfig };
};

export default useFormButtonConfig;
