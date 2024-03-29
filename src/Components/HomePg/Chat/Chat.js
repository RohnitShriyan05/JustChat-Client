import {useContext, useState} from 'react';
import {userContext} from '../../../App';
import "./Chat.css";
import ChatInput from "../Chat/ChatInput/ChatInput";
import Message from './ShowMessage/Message';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PeopleIcon from '@mui/icons-material/People';
import MenuIcon from '@mui/icons-material/Menu';
import Axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Div100vh from 'react-div-100vh';

export default function Chat(){
    const context = useContext(userContext);


    const changeChannelName = ()=>{
        if(context.currentChannel==="General")alert("Cannot edit General");
        else {
            const updatedname = prompt("edit channel name:");
            if(updatedname!=="" && updatedname){
                Axios.post(`https://juschat.onrender.com/update/channel?id=${context.currentChannelId}`,{channelname:updatedname}).catch((err)=>console.log(err));
             }
            context.setCurrentChannel(updatedname);
        }
    }
    const sidebarToggleHandle = ()=>{
        context.setSidebarToggle(!context.sidebarToggle);
        setMenuVisited(true);
    }
    const deleteChannel= ()=>{
        const deletedChannel= prompt("THIS WILL DELELTE ALL THE DATA IN THE CHANNEL TO CONTINUE ENTER THE CURRENT CHANNEL NAME");
        if(deletedChannel==="General"){
            alert("Cannot delete channel:General");
        }
        else if(deletedChannel===context.currentChannel){
            Axios.post("https://juschat.onrender.com/delete/channel", {id:context.currentChannelId}).catch((err)=>console.log(err)).then(()=>window.location.reload());
        }
        else{
            alert("Entered wrong name");
        }
    }
    const [menuVisited, setMenuVisited]=useState(false);
    return(
        <Div100vh className="message__wrapper h-screen md:w-3/4 w-screen bg-chatbg flex flex-col text-white">
            <div className="chat__header border-b-2 border-sidebarunder flex items-center">
                <button onClick={sidebarToggleHandle} className={menuVisited===false? "md:hidden flex animate-pulse":"md:hidden flex"}>{context.sidebarToggle? <MenuIcon className='text-neutral-300 hover:text-white svgicon'/>: null}</button>
                <h1 className='flex-1'>{context.currentChannel}</h1>
                <button onClick={changeChannelName}><ModeEditIcon className='text-neutral-300 hover:text-white ' fontSize='inherit'/></button>
                <button><PeopleIcon className=' text-neutral-300 hover:text-white' fontSize='inherit'/></button>
                <button onClick={deleteChannel}><DeleteIcon className='text-neutral-300 hover:text-white' fontSize='inherit'/></button>
             </div>
            <Message className='flex-1' id={context.currentChannelId} user={context.user.name}/>
            <ChatInput className='bg-white' user={context.user} id={context.currentChannelId} channelName={context.currentChannel} username={context.name}/>
        </Div100vh>
    );
}
