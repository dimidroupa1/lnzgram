import { Avatar } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import getRecipientEmail from '../utils/getRecipientEmail';

function Chats({ id, users }) {

    const router = useRouter();

    const [user] = useAuthState(auth);

    const [recipientsSnapshot] = useCollection(db.collection("users").
        where("email", "==", getRecipientEmail(users, user)));

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    const recipient = recipientsSnapshot?.docs?.[0]?.data();

    const recipientEmail = getRecipientEmail(users, user);

    const reset = (e) => {
        router.replace(`/chat/${id}`, '/')
    }

    return (
        <Container onClick={enterChat}>
            <>
                {recipient ? (
                    <UserAvatar src={recipient?.photoURL} />
                ) : (
                    <UserAvatar>{recipientEmail[0]}</UserAvatar>
                )}

                <p>{recipientEmail}</p>
            </>
            <button onClick={reset}>exit</button>
            
        </Container>
    );
}

export default Chats;

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-word;
    justify-content: space-between;
    :hover{
        background-color: rgba(0, 0, 0, .15);
        cursor: default;
    }
    > button {
        background: transparent;
        border: 0;
        align-items: center;
        font-size: 14px;
        color: rgba(0, 0, 0, .6);
        font-weight: 600;
        cursor: pointer;
    }
    @media (max-width: 768px) {
        > p {
            display: none;
        }
    }
`;

const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`;

const Close = styled.div``;