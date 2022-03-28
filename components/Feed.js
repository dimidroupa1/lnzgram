import React from 'react';
import styled from 'styled-components';
import MiniProfile from './MiniProfile';
import Posts from './Posts';
import Suggestions from './Suggestions';

function Feed() {
  return (
    <Container>
        <Posts>
            <PostsUsers />
        </Posts>
        <Profiles>
            <div>
                <MiniProfile />
                <Suggestions />
            </div>
        </Profiles>
    </Container>
  )
}

export default Feed;

const Container = styled.div`
    display: grid;
    grid-template-areas: 'Main ProfilesMeAndUsers';
    grid-template-columns: minmax(300px, 514px) minmax(80px, 314px);
    justify-content: center;
    @media (max-width: 900px) {
        display: block;
    }
`;

const PostsUsers = styled.section`
    grid-column: span 4 / span 4;
`;

const Profiles = styled.section`
    > div {
        grid-area: ProfilesMeAndUsers;
        position: fixed;
        top: 115px;
        margin-left: 40px;
    }
    @media (max-width: 900px) {
        > div {
            display: none;
        }
    }
`;