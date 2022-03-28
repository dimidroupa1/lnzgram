import Head from 'next/head';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import ChatScreen from '../../components/ChatScreen';
import Sidebar from '../../components/Sidebar';
import { auth, db } from '../../firebase';
import getRecipientEmail from '../../utils/getRecipientEmail';

function Chating({ chat, messages }) {

    const [user] = useAuthState(auth);

    return (
        <Container>
            <Head>
                <title>
                    Chat with {getRecipientEmail(chat.users, user)}
                </title>
            </Head>
            <Sidebar />
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages} />
            </ChatContainer>
        </Container>
    );
}

export default Chating;

export async function getServerSideProps(context){

    const ref = db.collection("chats").doc(context.query.id);

    const messagesRes = await ref
        .collection("messages")
        .orderBy("timestamp", "asc")
        .get();

    const messages = messagesRes.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }));

    const chatRes = await ref.get();

    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    };

    return{
        props: {
            message: JSON.stringify(messages),
            chat: chat
        }
    }
    
}

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const ChatContainer = styled.div`
    flex: 0.45;
    overflow-y: scroll;
    height: 100vh;
    width: 1200px;
    ::-webkit-scrollbar{
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    @media (max-width: 768px) {
        flex: 1;
    }
`;