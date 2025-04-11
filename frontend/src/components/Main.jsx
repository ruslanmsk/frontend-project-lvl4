import { useGetChannelsQuery, useGetMessagesQuery, useAddMessageMutation } from '../services/chat.js';
import { addChannel, addChannels, selectors as channelsSelectors, editChannel, removeChannel } from '../slices/channelsSlice.jsx';
import { addMessages, addMessage, selectors as messagesSelectors } from '../slices/messagesSlice.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { clean } from '../utils/moderation.js';



import { AddChannel } from './AddChannel.jsx';
import { Channel } from './Channel.jsx';
import { useTranslation } from 'react-i18next';



// const socket = io('http://localhost:5002');
const socket = io(window.location.origin);


export const MainPage = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [newMessage, setNewMessage] = useState('');
    const [currentChannelId, setChannelId] = useState('');
    const [sendMessageToServer, {isLoading}] = useAddMessageMutation();

    // Достаём username из стейта
    const username = useSelector((state) => state.auth.username);

    const {data: channelsData = [], error: channelQueryError} = useGetChannelsQuery();
    const {data: messagesData = [], error: messageQueryError} = useGetMessagesQuery();

    if (channelQueryError || messageQueryError) {   
        if (channelQueryError?.status === 'FETCH_ERROR' || messageQueryError?.status === 'FETCH_ERROR') {
            toast.error(t('toasts.networkError'));
        } else {
            toast.error(t('toasts.loadingError'));
        }
    }

    console.log('channelsData', channelsData);
    console.log('messagesData', messagesData);

    useEffect(() => {
        if (channelsData.length > 0 && !currentChannelId) {
            setChannelId(channelsData[0].id); // Устанавливаем первый канал из списка
        }
    }, [channelsData, currentChannelId]);

    useEffect(() => {
        socket.on('newMessage', (message) => {
            dispatch(addMessage(message));
        });

        socket.on('newChannel', (message) => {
            dispatch(addChannel(message));
        });

        socket.on('renameChannel', (payload) => {
            dispatch(editChannel({id: payload.id, changes: {name: payload.name}}));
        });
        socket.on('removeChannel', (payload) => {
            dispatch(removeChannel(payload.id));
            // TODO: не работает, currentChannelId почему то ""
            if (currentChannelId === payload.id) {
                setChannelId(channelsData[0].id);
            }
        });
    }, []);


    useEffect(() => {
        dispatch(addChannels(channelsData));
        dispatch(addMessages(messagesData));
    }, [dispatch, channelsData]); // Запускается только при изменении данных

    useEffect(() => {
        console.log("Обновленные каналы:", channelsData);
    }, [channelsData]); // channels — твой массив каналов из useSelector

    const channels = useSelector(channelsSelectors.selectAll);
    const messages = useSelector(messagesSelectors.selectAll);

    const suitableMessages = messages.filter((message) => message.channelId === currentChannelId);

    const sendMessage = async (event) => {
        event.preventDefault();
        if (newMessage.trim()) {
            await sendMessageToServer({body: clean(newMessage), username, channelId: currentChannelId});
            setNewMessage(""); // Очищаем поле ввода
        }
    };

    const onChannelCreated = (id) => {
        setChannelId(id);
    }

    return (
        <>
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
                <div className="row h-100 bg-white flex-md-row">
                    <div className="col-4 border-end px-0 bg-light flex-column h-100 d-flex">
                        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                            <b>{t('channel.mainTitle')}</b>
                            <AddChannel channelCreated={onChannelCreated} />
                        </div>
                        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                            {channels.map((channel) => (
                                <li key={channel.id} className="nav-item w-100">
                                    <Channel
                                        channel={channel}
                                        active={channel.id === currentChannelId}
                                        onClick={() => setChannelId(channel.id)}
                                    />
                                </li>
                            ))}
                            
                        </ul>
                    </div>
                    <div className="col p-0 h-100">
                        <div className="d-flex flex-column h-100">
                            <div className="bg-light mb-4 p-3 shadow-sm small">
                            <p className="m-0"><b># general</b></p>
                            <span className="text-muted">{t('channel.messagesCount', {count: 32})}</span>
                            </div>
                            <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                                {suitableMessages.map((message) => (
                                    <div key={message.id} className="text-break mb-2">
                                        <b>{message.username}</b>: {message.body}
                                    </div>
                                ))}
                                {/* <div className="text-break mb-2"><b>admin</b>: w</div>
                                <div className="text-break mb-2"><b>admin</b>: w</div> */}
                            </div>
                            <div className="mt-auto px-5 py-3">
                            <form onSubmit={sendMessage} noValidate="" className="py-1 border rounded-2">
                                <div className="input-group has-validation">
                                    <input 
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        name="body"
                                        placeholder={t('channel.placeholder')}
                                        className="border-0 p-0 ps-2 form-control"
                                    />
                                    <button type="submit" disabled="" className="btn btn-group-vertical">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
                                        </svg>
                                        <span className="visually-hidden">{t('channel.submit')}</span>
                                    </button>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}