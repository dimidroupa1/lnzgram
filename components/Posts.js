import React from 'react';
import Post from "./Post";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from '../firebase';

function Posts() {

    const [posts, setPosts] = useState([]);

    useEffect(
        () =>
            onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")),
                (snapshot) => {
                    setPosts(snapshot.docs);
                }
            ),
        [db]
    );


    return (
        <Container>
            {
                posts.map((post) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        username={post.data().username}
                        userImg={post.data().profileImg}
                        img={post.data().sharedImg}
                        caption={post.data().caption}
                        userId={post.data().userId}
                    />
                ))
            }
        </Container>
    )
}

export default Posts;

const Container = styled.div`
    grid-area: Main;
`;