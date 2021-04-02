import styled from 'styled-components';
import { Avatar, Button, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from '../components/Chat';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Sidebar(){

  const [user] = useAuthState(auth);

  const userChatRef = db.collection('chats')
  .where('users','array-contains',user.email);

  const [chatSnapshot] = useCollection(userChatRef);

  const createNewChat = () => {
    const input = prompt("Merci de renseigner une addresse e-mail");
   
    if (!input) return null;
   
    if(EmailValidator.validate(input) &&
       !chatAlreadyExists(input) && 
       input !== user.email ){
      // We need to add the chat into the db 'chats' colllection after checking
      db.collection("chats").add({
        users: [user.email,input]
      })
    }
  }

  const chatAlreadyExists = (recipientEmail) => 
    !!chatSnapshot?.docs.find(
      (chat) => 
        chat.data().users.find(
          (user) => 
            user === recipientEmail)?.length > 0
    );


    return (
        <Container>
          <Header>

            <UserAvatar src={user.photoURL} />

            <IconContainer>
              
              <IconButton>
                <ChatIcon />
              </IconButton>
              
              <IconButton>
                <MoreVertIcon />
              </IconButton>

              <IconButton>
                <ExitToAppIcon onClick={()=> auth.signOut()} />
              </IconButton>
              
            </IconContainer>

          </Header>
          
          <Search>
            <SearchIcon />
            <SearchInput placeholder="Rechercher dans discussions" />
          </Search>

          <NewChatButton onClick={createNewChat}>
               Démarrer une nouvelle discussion
          </NewChatButton>


          {/* Les chats */}
          {chatSnapshot?.docs.map(
            chat => (
              <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            )
          )}
          
        </Container>

    );
}

export default Sidebar;

const Container = styled.div`
  flex:1;
  border-right:1px solid whitesmoke;
  height:100vh;
  overflow-y:scroll;
  
  ::-webkit-scrollbar{
       display:none;
   }

   --ms-overflow-style:none;
   scrollbar-width:none;
`;

const NewChatButton = styled(Button)`
  width:100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
    
  }
`;

const Search = styled.div`
 display: flex;
 align-items: center;
 padding:20px;
 border-radius:5px;
 
`;

const SearchInput = styled.input`
  border:none;
  outline-width:0;
  flex:1;
  padding-left:10px;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top:0;
  background-color:white;
  z-index:1;
  justify-content: space-between;
  align-items: center;
  padding:15px;
  height:50px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const IconContainer = styled.div``; 