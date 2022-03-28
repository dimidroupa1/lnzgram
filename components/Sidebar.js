import { Button } from '@material-ui/core';
import { Chat, MoreVert, Search } from '@material-ui/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import * as EmailValidator from "email-validator"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useCollection } from "react-firebase-hooks/firestore";
import Chats from './Chats';
import { useRouter } from 'next/router';

function Sidebar({handleClickChat}) {

    const [user] = useAuthState(auth);

    const userChatRef = db.collection("chats").where("users", "array-contains", user.email);

    const [chatsSnapshot] = useCollection(userChatRef);

    const [input, setInput] = useState("");

    const router = useRouter();

    const [chatId, steChatId] = useState("");

    const createChat = () => {

        const addChat = prompt("Please enter an email address for the user you wish to chat with");

        if (!addChat) {
            return null;
        }
        if (EmailValidator.validate(addChat)
            && !chatAlreadyExists(addChat)
            && addChat !== user.email) {
            db.collection("chats").add({
                users: [user.email, addChat]
            })
        }

    };

    const chatAlreadyExists = (recipientEmail) =>
        !!chatsSnapshot?.docs.find(
            (chat) => chat.data().users.find(
                user => user === recipientEmail)?.length > 0
        );

    
    return (
        <Container>
            <SearchContainer>
                <SearchContainerInput>
                    <SearchIcon />
                    <SearchInput
                        placeholder='Please enter an email address for the user you wish to chat with'
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                </SearchContainerInput>

            </SearchContainer>
            <SidebarButton onClick={createChat}>New Chat</SidebarButton>
            {chatsSnapshot?.docs.map((chat) => (
                <Chats key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </Container>
    );
}

export default Sidebar;

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid rgba(0, 0, 0, .15); 
    border-left: 1px solid rgba(0, 0, 0, .15); 
    height: 100vh;
    max-width: 400px;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    background-color: #fff;
    color: rgba(0, 0, 0, .6);
    > img {
        position: absolute;
    }
    @media (max-width: 768px) {
        max-width: 130px;
    }
`;


const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    
`;

const SearchContainerInput = styled.div`
    border-radius: 10px;
    background-color: rgba(0, 0, 0, .07);
    width: 100%;
    align-items: center;
    
`;

const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;
    padding: 10px;
    width: 90%;
    color: gray;
    background-color: transparent;
     
`;

const SidebarButton = styled(Button)`
    width: 100%;
    background-color: rgba(0, 0, 0, .1) !important;
    color: gray !important;
    &&&{
        border-top: 1px solid rgba(0, 0, 0, .15);
        border-bottom: 1px solid rgba(0, 0, 0, .15);
    }
    border-radius: 0 !important;
`;

const SearchIcon = styled(Search)`
    color: gray;
    /* margin-top: 10px; */
    position: relative;
    top: 5px;
    left: 5px;
`;