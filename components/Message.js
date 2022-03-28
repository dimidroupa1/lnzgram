import moment from 'moment';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from "styled-components";
import { auth } from '../firebase';

function Message({ user, message }) {

    const [userLoggedIn] = useAuthState(auth);

    const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

    return (
        <Container>
            <TypeOfMessage>
                {message.message}
                <Timestamp>
                    {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
                </Timestamp>
            </TypeOfMessage>
        </Container>
    );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
    width: fit-content;
    padding: 15px;
    border-radius: 10px;
    margin: 10px;
    min-width: 60px;
    padding-bottom: 26px;
    position: relative;
    text-align: right;
    max-width: 500px;
    overflow-wrap: break-word;
    @media(max-width: 768px){
        max-width: 300px;
    }
`;

const Sender = styled(MessageElement)`
    margin-left: auto;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, .15);
    color: rgba(0, 0, 0, .6);
`;

const Reciever = styled(MessageElement)`
    background-color: rgba(0, 0, 0, .07);
    text-align: left;
    color: rgba(0, 0, 0, .6);
`;

const Timestamp = styled.span`
    color: gray;
    padding: 10px;
    font-size: 9px;
    position: absolute;
    bottom: 0;
    text-align: right;
    right: 0;
`;