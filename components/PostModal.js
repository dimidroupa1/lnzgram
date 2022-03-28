import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from "styled-components";
import { auth, db, storage } from '../firebase';
import { useState } from "react";
import { uploadPost } from './actions';
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";

function PostModal(props) {

    const [user] = useAuthState(auth);

    const [editorText, setEditorText] = useState("");
    const [shareImage, setShareImage] = useState("");
    const [videoLink, setVideoLink] = useState("");

    const handleChange = (e) => {
        const image = e.target.files[0];

        if (image === "" || image === undefined) {
            alert(`not an image< the file is a ${typeof image}`);
            return;
        }

        setShareImage(image);
    }


    const postArticle = (e) => {
        console.log("Cool")
        e.preventDefault();

        if (e.target !== e.currentTarget) {
            console.log('1')
            return;
        }

        const payload = {
            image: shareImage,
            video: videoLink,
            user: user.uid,
            description: editorText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }

        uploadPost(payload, user, storage, db);

        reset(e)
    }

    const reset = (e) => {
        setEditorText("");
        setShareImage("");
        setVideoLink("");
        props.handleClick(e);
    }

    return (
        <>
            {
                props.showModal === "open" && (

                    <Container>
                        <Content>
                            <Header>
                                <button onClick={(event) => reset(event)}>
                                    <img src="/close-icon.svg" alt="" />
                                </button>
                            </Header>
                            <SharedContent>
                                <Editor>
                                    
                                    <UploadImage>
                                        <input
                                            type="file"
                                            accept="image/gif, image/jpeg, image/png"
                                            name="image"
                                            id="file"
                                            style={{ display: "none" }}
                                            onChange={handleChange}
                                        />
                                        <p>
                                            <label htmlFor="file">Select an image to share</label>
                                        </p>
                                        {
                                            shareImage &&
                                            <img src={URL.createObjectURL(shareImage)} alt="" />
                                        }
                                        
                                    </UploadImage>
                                    <textarea
                                        value={editorText}
                                        placeholder="What do you want to talk about?"
                                        onChange={(e) => setEditorText(e.target.value)}
                                        autoFocus={true}
                                    />
                                </Editor>
                            </SharedContent>
                            <SharedCreation>
                                <PostButton
                                    disabled={!editorText ? true : false}
                                    onClick={(event) => postArticle(event)}
                                >
                                    Post
                                </PostButton>
                            </SharedCreation>
                        </Content>
                    </Container>
                )
            }
        </>
    )
}

export default PostModal;

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    color: #000;
    background-color: rgba(0, 0, 0, .65);
    animation: fadeIn 0.2s;
    display: flex;
    align-items: center;
`;

const Content = styled.div`
    width: 100%;
    max-width: 314px;
    background-color: #fff; 
    max-height: 90%;
    margin: auto;
    position: relative;
    overflow: initial;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding-bottom: 12px;
`;

const Header = styled.div`
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 0, 0, .6);
    font-weight: 400;
    text-align: right;
    > button {
        height: 40px;
        width: 40px;
        min-width: auto;
        color: rgba(0, 0, 0, .15);
        background: transparent;
        border: none;
        cursor: pointer;

        svg, img {
        pointer-events: none;
        }
    }
`;

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
`;


const Editor = styled.div`
    padding-left: 24px;
    padding-right: 24px;

    > textarea {
    width: 100%;
    min-height: 15px;
    resize: none;
    border: none;
    outline: 0;
    }

    > input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
    }
`;

const SharedCreation = styled.div`
    display: flex;
    justify-content: center;
`;

const AssetButton = styled.button`
    display: flex;
    align-items: center;
    height: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, .5);
    background: transparent;
    border: none;
`;

const PostButton = styled.button`
    width: 76%;
    background-color: ${(props) => (props.disabled ? "rgba(0, 0, 0, .1)" : "#2a8f16")};
    border: ${(props) => props.disabled ? "1px solid rgba(0, 0, 0, .6)" : "0px solid rgb(0, 102, 199)"};
    color: ${(props) => props.disabled ? "rgba(0, 0, 0, .6)" : "#fff"};
    border-radius: 5px;
    padding-top: 6px;
    padding-bottom: 6px;
`;

const UploadImage = styled.div`
    text-align: center;
    > img {
        width: 100%;
        border-radius: 5px;
    }
        
    > p {
        > label {
            cursor: pointer;
            padding: 5px;
            background-color: #2a8f16;
            color: #fff;
            border-radius: 5px;
            padding: 6px 12px;
        }
    }
`;
