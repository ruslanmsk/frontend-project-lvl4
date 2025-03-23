import classNames from "classnames";
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../slices/channelsSlice.jsx';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import {useEditChannelMutation, useRemoveChannelMutation} from '../services/chat.js'

export const Channel = ({channel, active, onClick}) => {
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
          .min(3, 'Название должно быть от 3 до 20 символов')
          .max(20, 'Название должно быть от 3 до 20 символов')
          .test(
            'unique',
            'Канал с таким названием уже существует',
            (value) => value && !channelNames.includes(value.toLowerCase())
          ),
      });

    const formik = useFormik({
        initialValues: {
          channelName: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const editChannel = await editChannelName({id: channel.id, name: values.channelName});
            resetForm(); // Очищаем поле после отправки
            handleCloseEditModal(); // Закрываем попап
            // channelCreated(createdChannel.data.id);
        },
    });

    const onDeleteChannel = async (event) => {
        event.preventDefault();
        await removeChannel({id: channel.id});
        handleCloseDeleteModal();
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
                            <span className="visually-hidden">Управление каналом</span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a onClick={handleShowDeleteModal} className="dropdown-item" href="#">Удалить</a></li>
                            <li><a onClick={handleShowEditModal} className="dropdown-item" href="#">Переименовать</a></li>    
                        </ul>
                    </>
                )}
            </div>

            <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Переименовать канал</Modal.Title>
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
                            Отменить
                        </Button>
                        <Button disabled={isChannelEditing} variant="primary" type="submit">
                            Отправить
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить канал</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onDeleteChannel}>
                    <Modal.Body>
                        Уверены?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                            Отменить
                        </Button>
                        <Button disabled={isChannelDeleting} variant="danger" type="submit">
                            Удалить
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>

    )
}