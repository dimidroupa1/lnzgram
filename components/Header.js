import React from 'react';
import styled from "styled-components";
import {
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider } from '../firebase';
import PostModal from './PostModal';
import { useState } from "react";
import PostModalChat from './PostModalChat';

function Header() {

    const [user] = useAuthState(auth);

    const [showModal, setShowModal] = useState("close");

    const [showModalChat, setShowModalChat] = useState("close");

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }
        switch (showModal) {
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

    const handleClickChat = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }
        switch (showModalChat) {
            case "open":
                setShowModalChat("close");
                break;
            case "close":
                setShowModalChat("open");
                break;
            default:
                setShowModalChat("close");
                break;
        }
    }

    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => console.log(error.message))
    }

    return (
        <>
            <Container>
                <Content>
                    <LeftSide>
                        <img src="https://firebasestorage.googleapis.com/v0/b/instagram-clone-48830.appspot.com/o/images%2Fphoto_2022-02-08_14-50-19.jpg?alt=media&token=c1e06548-ee76-490b-a7c1-6987684612e1" alt="" />
                    </LeftSide>
                    <Middle>
                        <MiddleContent>
                            <div>
                                <SearchIcon className='search' />
                            </div>
                            <input placeholder='Search' type="text" />
                        </MiddleContent>
                    </Middle>
                    {
                        user ? (
                            <RightSide>
                                <HomeIcon className='icons' />
                                <PaperAirplaneIcon className='icons' onClick={handleClickChat}/>
                                <PlusCircleIcon className='icons' onClick={handleClick} />
                                <HeartIcon className='icons' />
                                <img
                                    src={user.photoURL}
                                    alt="profile pic"
                                    className="h-10 rounded-full"
                                    title="Sing Out"
                                    onClick={() => auth.signOut()}
                                />
                            </RightSide>
                        ) : (
                            <RightSide>
                                <HomeIcon className='icons' />
                                <SignIn onClick={signIn}>
                                    Sign In
                                </SignIn>
                            </RightSide>
                        )
                    }
                    
                </Content>
            </Container>
            <PostModal showModal={showModal} handleClick={handleClick} />
            <PostModalChat showModalChat={showModalChat} handleClickChat={handleClickChat} />
        </>
    )
}

export default Header;

const Container = styled.div`
    position: sticky;
    top: 0;
    padding: 8px;
    z-index: 50;
    border-bottom-width: 1px;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, .07);
    background-color: white;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-left: 1.25rem/* 20px */;
    margin-right: 1.25rem/* 20px */;
    @media (max-width: 1024px) {
        margin-left: auto;
        margin-right: auto;
    }
`;

const LeftSide = styled.div`
    position: relative;
    width: 112px;
    margin-top: auto;
    margin-bottom: auto;
    flex-shrink: 0;
    cursor: pointer;
    > img {
        object-fit: contain;
        width: 112px;
    } 
`;

const Middle = styled.div`
    max-width: 20rem;
`;

const MiddleContent = styled.div`
    position: relative;
    margin-top: 4px;
    padding: 4px;
    border-radius: 6px;
    > div {
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        pointer-events: none;
        margin-left: 12px;
        .search {
            height: 20px;
            width: 20px;
            --tw-text-opacity: 1;
            color: rgb(107 114 128 / var(--tw-text-opacity));
        }
    }
    > input {
        --tw-bg-opacity: 1;
        background-color: rgb(249 250 251 / var(--tw-bg-opacity));
        padding: 8px;
        display: block;
        width: 100%;
        padding-left: 40px;
        border: 1px solid gray;
        :focus {
            --tw-ring-opacity: 1;
            --tw-ring-color: rgb(0 0 0 / var(--tw-ring-opacity));
            border: 2px solid #000;
        }
        border-radius: 6px;
    }
    @media (max-width: 768px) {
        display: none;
        > input {
            font-size: 14px;
            line-height: 20px;
            
        }
    }
`;

const RightSide = styled.div`
    display: flex;
    margin-top: 0;
    align-items: center;
    justify-content: end;
    margin-right: 16px;
    .icons {
        width: 24px;
        cursor: pointer;
        transition: .3s;
        margin-right: 8px;
    }
    > img {
        width: 40px;
        border-radius: 50%;
        cursor: pointer;
    }
    @media (max-width: 768px) {
        .menu {
            width: 24px;
            margin-right: 8px;
        }
    }
`;

const SignIn = styled.button`
    background: transparent;
    border: none;
    font-weight: 600;
    margin-right: 8px;
    cursor: pointer;
`;

