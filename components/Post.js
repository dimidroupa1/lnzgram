import React from 'react';
import styled from 'styled-components';
import {
    ArrowNarrowUpIcon,
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon,
    TrashIcon,
} from "@heroicons/react/outline";
import { HeartIconFilles } from '@heroicons/react/solid';
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, setDoc, doc, deleteDoc, getDoc } from "@firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";

function Post({ id, username, userImg, img, caption, userId }) {

    const [user] = useAuthState(auth);

    const [comment, setComment] = useState("");

    const [comments, setComments] = useState([]);

    const [likes, setLikes] = useState([]);

    const [hasLiked, setHasLiked] = useState(false);

    const [hasLikedComment, setHasLikedComment] = useState(false);

    const [userPost, setUserPost] = useState("");

    const [userComment, setUserComment] = useState("");

    const [commentId, setCommentId] = useState("");

    const [userIdPost, setUserIdPost] = useState("");

    useEffect(
        () =>
            onSnapshot(query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")),
                (snapshot) => {
                    setComments(snapshot.docs);
                }
            ),
        [db, id]
    );

    useEffect(
        () =>
            onSnapshot(query(collection(db, "posts", id, "likes"), orderBy('username', 'desc')),
                (snapshot) => setLikes(snapshot.docs)
            ),
        [db, id]
    );

    useEffect(
        () =>
            setHasLiked(
                likes.findIndex((like) => (like.id === user?.uid)) !== -1
            )
    )

    useEffect(
        () =>
            setHasLikedComment(
                likes.findIndex((like) => (like.id === user?.uid)) !== -1
            )
    )

    useEffect(
        () => 
            db.collection("posts").doc(id).get(setUserIdPost(userId)),
        []
    )

    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, "posts", id, "likes", user.uid))
        } else {
            await setDoc(doc(db, "posts", id, "likes", user.uid), {
                username: user.displayName,
            });
        }
    }

    const sendComment = async (e) => {
        e.preventDefault();

        const commentToSend = comment;

        setComment("");

        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToSend,
            username: user.displayName,
            profileImg: user.photoURL,
            userId: user.uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
    }

    const deletePost = async (e) => {
        e.preventDefault();

        db.collection("posts").doc(id).get(setUserPost(userId));

        if (user.uid == userPost || user.uid == "26p5B9Z7wZeWzwtny4kEDYkbyrG2" || user.uid == "ty9DDTuRwPedDfD158eto9y7Nww1") {
            await deleteDoc(doc(db, "posts", id));
        }
    }


    return (
        <Container>
            <User>
                <img src={userImg} alt="" />
                <p>{username}</p>
                <DotsHorizontalIcon className='userIcon' />
            </User>

            <img src={img} alt="" className='sharedImg' />
            {
                user ? (
                    <Widgets>
                        <div className='space-x-4'>
                            {
                                hasLiked ? (
                                    <HeartIconFilled className='icons activeButton' onClick={likePost} />
                                ) : (
                                    <HeartIcon className='icons' onClick={likePost} />
                                )
                            }

                            <ChatIcon className='icons' />
                            <PaperAirplaneIcon className='icons' />
                        </div>
                        {
                            (user.uid == userIdPost || user.uid == "26p5B9Z7wZeWzwtny4kEDYkbyrG2" || user.uid == "ty9DDTuRwPedDfD158eto9y7Nww1") && (
                                <TrashIcon className='icons' onClick={deletePost} />
                            )
                        }
                        
                    </Widgets>
                ) : (
                    <Widgets>
                        <div className='space-x-4'>
                            {
                                hasLiked ? (
                                    <HeartIconFilled className='icons activeButton' />
                                ) : (
                                    <HeartIcon className='icons' />
                                )
                            }

                            <ChatIcon className='icons' />
                            <PaperAirplaneIcon className='icons' />
                        </div>
                        <TrashIcon className='icons' />
                    </Widgets>
                )
            }
            <Likes>
                likes: {likes.length}
            </Likes>

            <p>
                <span>{username}</span>
                {caption}
            </p>

            {
                comments.length > 0 && (
                    <Comment>
                        {
                            comments.map(comment => (
                                <CommentsOwner key={comment.id}>
                                    <img src={comment.data().profileImg} alt="" />
                                    <p>
                                        <span>{comment.data().username}</span>
                                        {comment.data().comment}
                                    </p>
                                    <div>

                                    </div>
                                </CommentsOwner>
                            ))
                        }
                    </Comment>
                )
            }
            {
                user ? (
                    <form>
                        <EmojiHappyIcon className='formIcon' />
                        <input
                            type="text"
                            placeholder='Add a comment...'
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                        <button
                            type="submit"
                            onClick={sendComment}
                            disabled={!comment ? true : false}
                        >
                            Post
                        </button>
                    </form>
                ) : (
                    <form>
                        <EmojiHappyIcon className='formIcon' />
                        <input
                            type="text"
                            placeholder='Add a comment...'
                        />
                        <button
                            type="submit"
                        >
                            Post
                        </button>
                    </form>
                )
            }

        </Container>
    )
}

export default Post;

const Container = styled.div`
    background-color: white;
    margin-top: 28px;
    margin-bottom: 28px;
    border-width: 1px;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, .07);
    > .sharedImg {
        object-fit: cover;
        width: 100%;
    }
    > p {
        padding: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        > span {
            font-weight: bold;
            margin-right: 4px;
        }
    }
    > form {
        display: flex;
        align-items: center;
        padding: 16px;
        > .formIcon {
            height: 28px;
        }
        > input {
            border: none;
            flex: 1 1 0%;
            outline: 0;
            margin-left: 4px;
            padding: 5px;
            transition-duration: .3s;
            :focus {
                border-bottom: 1px solid rgba(0, 0, 0, .15);
                transition: .3s;
            }
        }
        > button {
            font-weight: 600;
            color: #2b8f13;
            border: none;
            background: transparent;
            cursor: pointer;
        }
    }
`;

const User = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    > img {
        border-radius: 50%;
        height: 48px;
        width: 48px;
        object-fit: contain;
        border-width: 1px;
        padding: 2px;
        margin-right: 12px;
        border: 2px solid #2a8f16;
    }
    > p {
        flex: 1 1 0%;
        font-weight: bold;
    }
    > .userIcon {
        height: 20px;
    }
`;

const Widgets = styled.div`
    display: flex;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
    > div {
        display: flex;
    }
    .space-x-4 > :not([hidden]) ~ :not([hidden]) {
        --tw-space-x-reverse: 0;
        margin-right: calc(1rem * var(--tw-space-x-reverse));
        margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
    }
    .icons {
        width: 24px;
        cursor: pointer;
    }
    .activeButton {
        color: #2a8f16;
    }
`;

const Comment = styled.div`
    margin-left: 40px;
    height: 120px;
    overflow-y: scroll;
    
`;

const CommentsOwner = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    margin-top: auto;
    margin-bottom: auto;
    vertical-align: middle;
    width: 100%;
    > img {
        height: 28px;
        border-radius: 50%;
    }
    > p {
        margin-left: 8px;
        max-width: 400px;
        overflow-wrap: break-word;
        > span {
            font-weight: 700;
            font-size: 14px;
            margin-right: 8px;
        }
        @media (max-width: 768px) {
            max-width: 300px;
        }
    }
    > div {
        margin-left: auto;
        margin-right: 5px;
        display: flex;
        flex-direction: column;
        text-align: center;
        > .delComment {
            width: 15px;
            color: rgba(0, 0, 0, .6);
        }
    }
    
`;

const Likes = styled.div`
    margin-left: 20px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: -25px;
`;