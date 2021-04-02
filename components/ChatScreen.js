import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from '../firebase';
import { useRouter } from 'next/router';
import { Avatar,IconButton,Button } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AttachFile,Mic } from '@material-ui/icons';
import { useCollection } from 'react-firebase-hooks/firestore';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Message from './Message';
import { useState } from 'react';
import firebase from "firebase";
import getRecipientEmail from '../utils/getRecipientEmail';
import TimeAgo from "timeago-react";

function ChatScreen({chat,messages}) {

    const [user] = useAuthState(auth);
    const router = useRouter();
    const [input, setInput] = useState("");
    const [messagesSnapshot] = useCollection(
        db.collection('chats')
        .doc(router.query.id)
        .collection('messages')
        .orderBy('timestamp', 'asc')
    );

    const showMessages = () => {
        if(messagesSnapshot){
            return messagesSnapshot.docs.map(
                (message) => (
                    <Message
                    key={message.id}
                    user={message.data().user}
                    message = {
                        {
                            ...message.data(),
                            timestamp: message.data().timestamp?.toDate().getTime(),
                        }
                    }
                    />
                )

            );
        } else {
            return JSON.parse(messages).map(message => {
                <Message
                key={message.id}
                user={message.user}
                message = {message}
                />
            });
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        // Update the lastSeen
        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        },{merge:true});

        db.collection("chats").doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL
        });

        setInput('');

    }
    const [recipientSnapshot] = useCollection(
        db.collection('users').where('email','==',getRecipientEmail(chat.users,user))
    );

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(chat.users,user);

    return (
        <Container>
           <Header>
               {recipient ? 
               ( <Avatar src={recipient?.photoURL} />
                   ) : ( <Avatar src={recipientEmail[0]} /> )} 
            
                <HeaderInformations>
                    <h3>{recipientEmail}</h3>

                    {recipientSnapshot ? (
                     <p>Vue récemment: {' '} 
                    {recipient?.lastSeen?.toDate() ? (
                        <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                    ) : (
                        "Inconnu"
                        )}
                   </p>
                    ) : (<p>Chargement...</p>)  } 
            
                    
                </HeaderInformations>
                <HeaderIcons>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </HeaderIcons>
           </Header>

           <MessageContainer>
              {showMessages()}
               
               <EndOfMessage />
           </MessageContainer>

           <InputContainer>    
               
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>

                <Input placeholder="Taper votre message" value={input} onChange={e => setInput(e.target.value)} />
                <button  hidden disable={!input} type="submit" onClick={sendMessage}>Envoyer le messsage</button>
                <IconButton>
                    <Mic />
                </IconButton>
           </InputContainer>
        </Container>
    )
}

export default ChatScreen;

const Container = styled.div`

`;

const Input = styled.input`
    flex: 1;
  outline:0;
  border:none;
  border-radius:10px;
    bottom:0;
    background-color:whitesmoke;
    padding:20px;
    margin-left:15px;
    margin-right:15px;
`;

const InputContainer = styled.form`
display:flex;
align-items:center;
padding:10px;
position:sticky;
bottom:0;
background-color:white;
z-index:100;
`;

const Header = styled.div`
    display: flex;
    position: sticky;
    background-color:white;
    z-index:100;
    top: 0;
    padding:11px;
    height:80px;
    align-items:center;
    border-bottom: 1px solid whitesmoke;
`;

const HeaderIcons = styled.div``;

const HeaderInformations = styled.div`
    margin-left:15px;
    flex: 1;
    margin-bottom:10px;

    > h3 {
        margin-bottom:-10px;
    }

    > p {
        font-size:13px;
        color:gray;
        
    }
`;

const MessageContainer = styled.div`
    padding:30px;
    background-color:#e5ded8;
    min-height:90vh;
`;

const EndOfMessage = styled.div``;
