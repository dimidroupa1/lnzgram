import React from 'react';
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth"

function MiniProfile() {

    const [user] = useAuthState(auth);

    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => console.log(error.message))
    }

    return (
        <Container>
            {
                user ? (
                    <>
                        <img
                            src={user.photoURL}
                            alt=""
                        />
                        <div>
                            <h2>{user.displayName}</h2>
                            <h3>Welcome to lnzgram</h3>
                        </div>
                        <button onClick={() => auth.signOut()}>Sign Out</button>
                    </>
                ) : (
                    <>
                        <img
                            src="/user.svg"
                            alt=""
                        />
                        <div>
                            <h2>Sign In</h2>
                            <h3>Welcome to lnzgram</h3>
                        </div>
                        <button onClick={signIn}>Sign In</button>
                    </>
                )
            }

        </Container>
    )
}

export default MiniProfile;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    > img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 2px solid #2a8f16;
        padding: 2px;
    }
    > div {
        flex: 1 1 0%;
        margin-left: 16px;
        margin-right: 16px;
        > h2 {
            font-size: 16px;
            margin-bottom: -15px;
        }
        > h3 {
            font-size: 14px;
            color: gray;
            font-weight: 400;
        }
    }
    > button {
        background: transparent;
        border: none;
        font-weight: bold;
        color: #2b8f13;
        cursor: pointer;
    }
`;