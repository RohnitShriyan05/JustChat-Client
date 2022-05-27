import Chat from "./Chat/Chat";
import Sidebar from "./Sidebar/Sidebar";
import Div100vh from 'react-div-100vh';
export default function HomePg(){
    return(
        <Div100vh className="home__wrapper flex ">
            <Sidebar/>
            <Chat/>
        </Div100vh>
    );
}