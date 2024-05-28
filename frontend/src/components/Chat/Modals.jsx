import * as yup from 'yup';
import cn from 'classnames';
import filter from 'leo-profanity';
import { Modal, Button, Form } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { actions, selectors } from '../../slices/index';
import {
  useAddChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
} from '../../services/channelsApi';

const getValidateSchema = (channels, t) => yup
  .object().shape({
    name: yup
      .string()
      .required(t('errors.required'))
      .trim()
      .min(3, t('errors.minMax'))
      .max(20, t('errors.minMax'))
      .notOneOf(channels, t('errors.notUniqNamesChannels')),
  });

const ModalChannel = ({ toggleModalChannel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const input = useRef();
  const { setActive } = actions;
  const [addChannel] = useAddChannelMutation();
  const namesChannels = useSelector(selectors.channelSelectors.selectChannelsNames());

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getValidateSchema(namesChannels, t),
    validateOnChange: false,
    onSubmit: async ({ name }, { resetForm }) => {
      const filterName = filter.clean(name);
      const response = await addChannel({ name: filterName });
      dispatch(setActive(response.data.id));
      toast.success(t('toast.addedChannel'), { containerId: 'Parent' });
      dispatch(toggleModalChannel({ type: null }));
      resetForm();
    },
  });

  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
        <Button
          as="button"
          aria-label="Close"
          className="btn btn-close"
          onClick={() => dispatch(toggleModalChannel({ type: null }))}
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            as="input"
            id="name"
            className={cn('mb-2', {
              'is-invalid': formik.errors.name && formik.touched.name,
            })}
            value={formik.values.name}
            ref={input}
            onChange={formik.handleChange}
          />
          <Form.Label className="visually-hidden" htmlFor="name">
            {t('modals.nameChannel')}
          </Form.Label>
          <div className="invalid-feedback">
            {formik.touched.name && formik.errors.name}
          </div>
          <div className="d-flex justify-content-end">
            <Button
              as="button"
              className="me-2 btn btn-secondary"
              onClick={() => dispatch(toggleModalChannel({ type: null }))}
            >
              {t('modals.cancel')}
            </Button>
            <Button type="submit" className="btn btn-primary">
              {t('send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

const ModalRemoveChannel = ({ toggleModalChannel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [removeChannel] = useRemoveChannelMutation();
  const currentChannelId = useSelector(selectors.channelSelectors.selectCurrentId);

  const closeModal = () => {
    dispatch(toggleModalChannel({ type: null }));
  };

  const handleRemove = async () => {
    await removeChannel(currentChannelId);
    toast.success(t('toast.removedChannel'), { containerId: 'Parent' });
    closeModal();
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
        <Button
          as="button"
          aria-label="Close"
          className="btn btn-close"
          onClick={closeModal}
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button
            as="button"
            className="me-2 btn btn-secondary"
            onClick={closeModal}
          >
            {t('modals.cancel')}
          </Button>
          <Button
            type="submit"
            className="btn btn-danger"
            onClick={handleRemove}
          >
            {t('modals.delete')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

const ModalRenameChannel = ({ toggleModalChannel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const input = useRef();
  const [renameChannel] = useRenameChannelMutation();
  const currentChannel = useSelector(selectors.channelSelectors.selectCurrentChannel());
  const namesChannels = useSelector(selectors.channelSelectors.selectChannelsNames());

  const сloseModal = () => {
    dispatch(toggleModalChannel({ type: null }));
  };

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
      id: currentChannel.id,
    },
    validationSchema: getValidateSchema(namesChannels, t),
    validateOnChange: false,
    onSubmit: async ({ name, id }, { resetForm }) => {
      const filterName = filter.clean(name);
      await renameChannel({ name: filterName, id });
      toast.success(t('toast.renamedChannel'), { containerId: 'Parent' });
      сloseModal();
      resetForm();
    },
  });

  useEffect(() => {
    input.current.select();
  }, []);

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
        <Button
          as="button"
          aria-label="Close"
          className="btn btn-close"
          onClick={сloseModal}
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            as="input"
            id="name"
            className={cn('mb-2', {
              'is-invalid': formik.errors.name && formik.touched.name,
            })}
            value={formik.values.name}
            ref={input}
            onChange={formik.handleChange}
          />
          <Form.Label className="visually-hidden" htmlFor="name">
            {t('modals.nameChannel')}
          </Form.Label>
          <div className="invalid-feedback">
            {formik.errors.name && formik.touched.name
              ? formik.errors.name
              : null}
          </div>
          <div className="d-flex justify-content-end">
            <Button
              as="button"
              className="me-2 btn btn-secondary"
              onClick={сloseModal}
            >
              {t('modals.cancel')}
            </Button>
            <Button type="submit" className="btn btn-primary">
              {t('send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

const mappingModals = {
  modalChannel: ModalChannel,
  modalRemoveChannel: ModalRemoveChannel,
  modalRenameChannel: ModalRenameChannel,
};

const Modals = () => {
  const typeModal = useSelector(selectors.uiSelectors.selectTypeModal);
  const { toggleModalChannel } = actions;

  const CurrentModal = mappingModals[typeModal];

  return typeModal === null ? null : (
    <Modal show>
      <CurrentModal toggleModalChannel={toggleModalChannel} />
    </Modal>
  );
};

export default Modals;
