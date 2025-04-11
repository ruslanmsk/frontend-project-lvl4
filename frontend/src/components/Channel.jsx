import classNames from "classnames";
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../slices/channelsSlice.jsx';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import {useEditChannelMutation, useRemoveChannelMutation} from '../services/chat.js';
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";
import {hasProfanity} from '../utils/moderation.js'

export const Channel = ({channel, active, onClick}) => {
    const { t } = useTranslation();
    const [showEditModal, setShowEditModal] = useState(false);
    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowEditModal = () => {
        formik.values.channelName = channel.name;
        setShowEditModal(true);
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const [editChannelName, {isChannelEditing}] = useEditChannelMutation();
    const [removeChannel, {isChannelDeleting}] = useRemoveChannelMutation();

    // Получаем список каналов из Redux
    const channels = useSelector(channelsSelectors.selectAll);
    // Приводим к нижнему регистру для точного сравнения
    const channelNames = channels.map((c) => c.name?.toLowerCase()).filter(Boolean);

    const validationSchema = yup.object().shape({
        channelName: yup.string()
          .min(3, t('channel.errors.channelNameInvalidLength'))
          .max(20, t('channel.errors.channelNameInvalidLength'))
          .test(
            'unique',
            t('channel.errors.channelExisted'),
            (value) => value && !channelNames.includes(value.toLowerCase())
          )
          .test(
            'moderation',
            t('channel.errors.channelNameModeration'),
            (value) => value && !hasProfanity(value),
          ),
      });

    const formik = useFormik({
        initialValues: {
          channelName: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const editChannel = await editChannelName({id: channel.id, name: values.channelName});
            if (!editChannel.error) {
                resetForm(); // Очищаем поле после отправки
                handleCloseEditModal(); // Закрываем попап
                toast.success(t('toasts.channelRenamed'));
                // channelCreated(createdChannel.data.id);
            } else {
                if (error.status === 'FETCH_ERROR') {
                    toast.error(t('toasts.networkError'));
                } else {
                    toast.error(t('toasts.loadingError'));
                }
            }
        },
    });

    const onDeleteChannel = async (event) => {
        event.preventDefault();
        const result = await removeChannel({id: channel.id});
        if (!result.error) {
            handleCloseDeleteModal();
            toast.success(t('toasts.channelRemoved'));
        } else {
            if (error.status === 'FETCH_ERROR') {
                toast.error(t('toasts.networkError'));
            } else {
                toast.error(t('toasts.loadingError'));
            }
        }
    }

    return (
        <>
            <div role="group" className="d-flex dropdown btn-group">
                <button
                    type="button"
                    onClick={onClick}
                    className={classNames("w-100 rounded-0 text-start text-truncate btn", {
                        "btn-secondary": active,
                    })}
                >
                    <span className="me-1">#</span>{channel.name}
                </button>
                {channel.removable && (
                    <>
                        <button
                            type="button"
                            aria-expanded="false"
                            data-bs-toggle="dropdown"
                            className={classNames("flex-grow-0 dropdown-toggle dropdown-toggle-split btn", {
                                "btn-secondary": active
                            })}
                        >
                            <span className="visually-hidden">{t('channel.channelManagmentTitle')}</span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a onClick={handleShowDeleteModal} className="dropdown-item" href="#">{t('channel.deleteChannel')}</a></li>
                            <li><a onClick={handleShowEditModal} className="dropdown-item" href="#">{t('channel.editChannelName')}</a></li>    
                        </ul>
                    </>
                )}
            </div>

            <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('channel.editModal.title')}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                onChange={formik.handleChange}
                                value={formik.values.channelName}
                                name="channelName"
                                type="text"
                                autoFocus
                                isInvalid={formik.touched.channelName && !!formik.errors.channelName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.channelName}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEditModal}>
                            {t('channel.editModal.cancel')}
                        </Button>
                        <Button disabled={isChannelEditing} variant="primary" type="submit">
                            {t('channel.editModal.submit')}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('channel.deleteModal.title')}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onDeleteChannel}>
                    <Modal.Body>
                        {t('channel.deleteModal.sure')}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                            {t('channel.deleteModal.cancel')}
                        </Button>
                        <Button disabled={isChannelDeleting} variant="danger" type="submit">
                            {t('channel.deleteModal.submit')}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>

    )
}