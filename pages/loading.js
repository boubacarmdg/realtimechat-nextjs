import styled from 'styled-components';
import {Circle} from "better-react-spinkit";

function Loading() {
    return (
        <Container>
            <LoadingContainer>

          <Logo src="https://png2.cleanpng.com/sh/7afa2d7e32df26ade54a18e83251e134/L0KzQYm3VcE5N5l9jpH0aYP2gLBuTflxcJDzfZ8CLXnwdcT6gfdmNZ5qiAVqZ3X2PcXsmQQudZZ4i9NwaX7qPYbohvY4QGE9fatvMXG1PoW9V8cyOGE3Sac7Nka8QYm7WMk2QGQziNDw/kisspng-iphone-7-imessage-messages-text-messaging-5aff7808e9f1a2.4677100215266918489583.png" alt="" />
           <Circle style={{marginTop:50}} color="gray" size={60}/>

            </LoadingContainer>
                
        </Container>
    )
}

export default Loading;

const Container = styled.div`
    display:grid;
    place-items:center;
    height:100vh;
    background-color:whitesmoke;
`;
const LoadingContainer = styled.div`
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
