import React from 'react';
import styled from "styled-components";
import Sidebar from './Sidebar';

function PostModalChat(props) {

    return (
        <>
        
            {
                props.showModalChat === "open" && (
                    <Container>
                    
                        <Content>   
                            <Sidebar />
                        </Content>
                    </Container>
                )
            }
        </>
    )
}

export default PostModalChat;

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
    background-color: #fff; 
    height: 100%;
    margin: auto;
    position: relative;
    overflow: initial;
    display: flex;  
    flex-direction: column;
    padding-bottom: 12px;
    padding-left: 17%;
    > img {
        width: 24px;
        z-index: 999;
    }
`;


