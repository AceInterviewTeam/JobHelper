import type { Session as SessionType } from '@@types/interviewSession';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@components/common/Layout/Main';
import DialogueInput from '@components/common/DialogueInput';
import ActionButton from '@components/common/Button';
import user from '@assets/Main/user.svg';
import chatGPT from '@assets/Main/icon.jpg';
import useForm from '@hooks/useForm';
import useSession from '@hooks/useSession';

const Session = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const navgiateToMainWithSearchParams = () => navigate(`/${(session as SessionType).search}`);

  const { handleRetryQuestion } = useForm(navgiateToMainWithSearchParams);

  const { session } = useSession(false, id);

  return (
    <MainLayout tag='main'>
      <div className="flex flex-col items-center w-full mb-6">
        <DialogueInput src={user} transcript={session?.transcript as string} />
        <ActionButton
          onClickHandler={session ? handleRetryQuestion : () => navigate('/')}
          variant="primary"
          label={session ? '重新开始' : '开始新的面试'}
        />
      </div>
      <DialogueInput
        src={chatGPT}
        transcript={
          session
            ? `Question: \n\n ${session.question} \n\n Response: \n\n ${session.response}`
            : `找不到你的面试记录,请重新开始面试.`
        }
      />
    </MainLayout>
  );
};

export default Session;
