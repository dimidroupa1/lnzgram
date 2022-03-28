import React from 'react';
import { auth, provider } from '../firebase';
import styled from "styled-components";
import Head from 'next/head';
import Header from "./Header";
import Feed from "./Feed";

function Login() {

    return (
        <Container>
            <Head>
                <title>
                    Login
                </title>
                <link rel="icon" href="https://naukova-zmina.org.ua/wp-content/themes/ABVV_LNZ/img/logo.png" />
            </Head>
            <LoginContainer>
                {/* <h2>
                    Welcome to 
                </h2>
                <p>
                    <img src="https://firebasestorage.googleapis.com/v0/b/instagram-clone-48830.appspot.com/o/images%2Fphoto_2022-02-08_14-50-19.jpg?alt=media&token=c1e06548-ee76-490b-a7c1-6987684612e1" alt="" />
                </p>
                <SignIn onClick={signIn}>
                    Sign in with Google
                </SignIn> */}
                <HeaderLogin>
                    <Header />
                </HeaderLogin>

                <FeedLogin>
                    <Feed />
                </FeedLogin>
            </LoginContainer>

        </Container>
    )
}

export default Login;

const Container = styled.div`
    /* display: grid;
    place-items: center;
    height: 100vh; */
    overflow-x: hidden;
`;

const LoginContainer = styled.div`
    /* display: flex;
    flex-direction: column;
    padding: 100px;
    align-items: center;
    border-radius: 5px;
    > p {
        > img {
            width: 250px;
        }
    } */
`;

const HeaderLogin = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
`;

const FeedLogin = styled.div`
    margin-top: 70px;
`;
