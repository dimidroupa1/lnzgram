import React from 'react';
import styled from "styled-components";
import {useState, useEffect} from "react";
import {auth, db} from "../firebase";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';

function Suggestions() {

    const [user] = useAuthState(auth);

    const [users, setUsers] = useState([])

    const [userEmail, setUserEmail] = useState("");

    useEffect(
        () =>
            onSnapshot(query(collection(db, "users"), orderBy("timestamp", "desc")),
                (snapshot) => {
                    setUsers(snapshot.docs);
                }
            ),
        [db]
    );

    // const addChat = (email) => {
    //     db.collection("chats").add({
    //         user: [user.email, email]
    //     })
    // }

    return (
        <Container>
            <AllUsers>
                <h3>Suggestions for you</h3>
                <button>See All</button>
            </AllUsers>
            {
                users.map((user) => (
                    <User key={user.id}>
                        <img src={user.data().photoURL} alt="" />
                        <div>
                            <h2>{user.data().name}</h2>
                            {/* {
                                addChat(user.data().email)
                            } */}
                        </div>
                        <button>Follow</button>
                    </User>
                ))
            }
        </Container>
    )
}

export default Suggestions;

const Container = styled.div`
    margin-top: 16px;
`;

const AllUsers = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 20px;
    margin-top: -20px;
    > h3 {
        font-size: 14px;
        line-height: 20px;
        font-weight: bold;
        color: rgba(0, 0, 0, .4);
    }
    > button {
        background: transparent;
        border: none;
        color: rgba(0, 0, 0, .6);
        cursor: pointer;
        font-weight: bold;
        font-size: 14px;
    }
`;

const User = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    > img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid #2a8f16;
        padding: 2px;
    }
    > div {
        flex: 1 1 0%;
        margin-left: 16px;
        > h2 {
            font-weight: 600;
            font-size: 14px;
            color: rgba(0, 0, 0, .6);
        }
    }
    > button {
        color: #2b8f13;
        font-size: 14px;
        font-weight: 600;
        background: transparent;
        border: none;
        cursor: pointer;
    }
`;