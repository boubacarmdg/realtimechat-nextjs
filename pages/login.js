import Head from 'next/head';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { auth,provider } from '../firebase';


function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }
    return (
       <Container> 
            <Head>
             <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo src="https://png2.cleanpng.com/sh/7afa2d7e32df26ade54a18e83251e134/L0KzQYm3VcE5N5l9jpH0aYP2gLBuTflxcJDzfZ8CLXnwdcT6gfdmNZ5qiAVqZ3X2PcXsmQQudZZ4i9NwaX7qPYbohvY4QGE9fatvMXG1PoW9V8cyOGE3Sac7Nka8QYm7WMk2QGQziNDw/kisspng-iphone-7-imessage-messages-text-messaging-5aff7808e9f1a2.4677100215266918489583.png" />
                <Btn onClick={signIn}>Se connecter avec Google</Btn>
            </LoginContainer>
       </Container>
    )
}

export default Login;

const Container = styled.div`
    display:grid;
    place-items:center;
    height:100vh;
    background-color:whitesmoke;
`;

const Btn = styled(Button)`
    margin-top:50px;
`;

const LoginContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:white;
    padding:70px;
    border-radius:5px;
    box-shadow: 0 4px 14px -3px gray;
`;

const Logo = styled.img`
    width:300px;
    height:300px;
`;