import { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../slices/channelsSlice.jsx';
import {useAddChannelMutation} from '../services/chat.js';
import { useTranslation } from 'react-i18next';


export const AddChannel = ({channelCreated}) => {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [createChannel, {isChannelCreating}] = useAddChannelMutation();


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
          ),
      });

    const formik = useFormik({
        initialValues: {
          channelName: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const createdChannel = await createChannel({name: values.channelName});
            resetForm(); // Очищаем поле после отправки
            handleClose(); // Закрываем попап
            channelCreated(createdChannel.data.id);
        },
    });


    return (
        <>
            <button onClick={handleShow} type="button" className="p-0 text-primary btn btn-group-vertical">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                </svg>
                <span className="visually-hidden">+</span>
            </button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('channel.addModal.title')}</Modal.Title>
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
                        <Button variant="secondary" onClick={handleClose}>
                            {t('channel.addModal.cancel')}
                        </Button>
                        <Button disabled={isChannelCreating} variant="primary" type="submit">
                            {t('channel.addModal.submit')}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}