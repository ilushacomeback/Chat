import filter from 'leo-profanity';
import { useFormik } from 'formik';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectors } from '../../slices';
import { useAddMessageMutation } from '../../services/messagesApi';

const FormSendMessage = () => {
  const { t } = useTranslation();
  const [addMessage] = useAddMessageMutation();
  const channelId = useSelector(selectors.channelSelectors.selectActiveId);
  const username = useSelector(selectors.authSelectors.selectUsername);
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }, { resetForm }) => {
      const filterBody = filter.clean(body);
      if (filterBody !== body) {
        toast.error('Не ругайся!', { containerId: 'Parent' });
      }
      const data = { body: filterBody, channelId, username };
      addMessage(data);
      resetForm();
    },
  });

  return (
    <Form
      noValidate
      className="py-1 border rounded-2"
      onSubmit={formik.handleSubmit}
    >
      <InputGroup className="has-validation">
        <Form.Control
          name="body"
          aria-label="Новое сообщение"
          placeholder={t('chatPage.enterMessage')}
          className="border-0 p-0 ps-2 form-control"
          onChange={formik.handleChange}
          value={formik.values.body}
        />
        <Button
          type="submit"
          variant="group-vertical"
          disabled={formik.values.body.length < 1}
        >
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">{t('send')}</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default FormSendMessage;
