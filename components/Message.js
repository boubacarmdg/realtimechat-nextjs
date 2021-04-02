import styled from 'styled-components';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment';

function Message({user,message}) {

    const [userLoggedIn] = useAuthState(auth);

    const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;
    
    return (
        <Container>
            <TypeOfMessage>
                {message.message}
                <Timestamp>
                {message.timestamp ? moment(message.timestamp).format('LT') : '...'}             
                </Timestamp>
            </TypeOfMessage>
        </Container>
    )
}

export default Message

const Container = styled.div`
   /* flex: 1;
   overflow: scroll;
   height:100vh;

   ::-webkit-scrollbar{
       display:none;
   }

   --ms-overflow-style:none;
   scrollbar-width:none; */
`;

const MessageElement = styled.p`
 width:fit-content;
padding:15px;
 border-radius:8px;
 min-width:60px;
 padding-bottom:26px;
 position:relative;
 text-align:right;
`;

const Sender = styled(MessageElement)`
    margin-left:auto;
    background-color:#dcf8c6;
`;

const Receiver = styled(MessageElement)`
    text-align:left;
    background-color:whitesmoke;
`;

const Timestamp = styled.span`
    color:grey;
    padding:10px;
    font-size:9px;
    margin-top:20px;
    position:absolute;
    bottom:0;
    text-align:right;
    right:0;
`;