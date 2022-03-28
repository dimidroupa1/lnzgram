import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, Search } from '@material-ui/icons';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import Message from "./Message";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import getRecipientEmail from '../utils/getRecipientEmail';
import TimeAgo from "timeago-react";
import PostModal from "./PostModal";

function ChatScreen({ chat, messages, handleClickChat }) {

    const [user] = useAuthState(auth);

    const [input, setInput] = useState("");

    const router = useRouter();

    const endOfMessagesRef = useRef(null)

    const [messagesSnapshot] = useCollection(db
        .collection("chats")
        .doc(router.query.id)
        .collection("messages")
        .orderBy("timestamp", "asc")
    );

    const [recipientSnapshot] = useCollection(
        db.collection("users")
            .where("email", "==", getRecipientEmail(chat.users, user))
    )

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime()
                    }}
                />
            ));
        }
    };

    const scrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    };

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("users").doc(user.uid).set(
            {
                lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
        );
        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL
        });



        setInput("");
        scrollToBottom();
    };

    const recipient = recipientSnapshot?.docs?.[0]?.data();

    const recipientEmail = getRecipientEmail(chat.users, user);

    const [showModal, setShowModal] = useState("close");

    const handleClick = (e) => {
        e.preventDefault();
        if(e.target !== e.currentTarget){
          return ;
        }
        switch(showModal){
          case "open":
            setShowModal("close");
            break;
          case "close":
            setShowModal("open");
            break;
          default:
            setShowModal("close");
            break;
        }
      }

      

    return (
        <Container>
            <Header>
                {recipient ? (
                    <Avatar src={recipient?.photoURL} />
                ) : (
                    <Avatar>{recipientEmail[0]}</Avatar>
                )}
                <HeaderInfo>
                    <h3>
                        {recipientEmail}
                    </h3>
                    {recipientSnapshot ? (
                        <p>
                            Last active: {' '}
                            {recipient?.lastSeen?.toDate() ? (
                                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                            ) : (
                                "Unavailable"
                            )}
                        </p>
                    ) : (
                        <p>
                            Loading last active...
                        </p>
                    )}

                </HeaderInfo>
                <HeaderIcons>
                    {/* <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton> */}
                </HeaderIcons>
            </Header>
            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMessagesRef} />
            </MessageContainer>
            <InputContainer>
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <IconButton>
                    
                    <AttachFileIcon onClick={handleClick}/>
                </IconButton>
                <Input value={input} onChange={e => setInput(e.target.value)} placeholder='Enter your message' />
                <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send</button>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </InputContainer>
            <PostModal showModal={showModal} handleClick={handleClick}/>
        </Container>
    );
}

export default ChatScreen;

const MicIcon = styled(Mic)`
    color: rgba(0, 0, 0, .6);
`;
const AttachFileIcon = styled(AttachFile)`
    color: rgba(0, 0, 0, .6);;
`;
const InsertEmoticonIcon = styled(InsertEmoticon)`
    color: rgba(0, 0, 0, .6);;
`;
const MoreVertIcon = styled(MoreVert)`
    color: rgba(0, 0, 0, .6);;
    
`;
const SearchIcon = styled(Search)`
    color: rgba(0, 0, 0, .6);
`;

const Container = styled.div`
    width: 800px;
    border-right: 1px solid rgba(0, 0, 0, .15);
`;

const Header = styled.div`
    position: sticky;
    background-color: #fff;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 78px;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, .15);
    @media (max-width: 768px) {
        overflow-x: scroll;
    }
`;

const HeaderInfo = styled.div`
    margin-left: 15px;
    flex: 1;
    > h3 {
        margin-bottom: -15px;
        color: rgba(0, 0, 0, .6);
    }
    > p {
        font-size: 14px;
        color: gray;
    }
    @media (max-width: 768px) {
        > h3 {
            font-size: 20px;
            overflow-wrap: break-word;
        }
    }
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
    padding: 30px;
    /* background-image: url("https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/Desktop.png");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-position: center; */
    min-height: 100vh;
`;

const EndOfMessage = styled.div`
    margin-bottom: 50px;
`;

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: #fff;
    z-index: 100;
    border-top: 1px solid rgba(0, 0, 0, .15);
`;

const Input = styled.input`
    flex: 1;
    outline: 0;
    border: none;
    border-radius: 10px;
    background-color: rgba(0, 0, 0 ,.07);
    padding: 20px;
    margin-left: 15px;
    margin-right: 15px;
    color: gray;
    overflow-wrap: break-word;
`;