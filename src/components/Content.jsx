import OutputChat from "./OutputChat.jsx";
import InputChat from "./InputChat.jsx";
import {Link} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../../utility/Constants.js";

export default function ({ historyLinks,routeTitleMap, chats, setChats, userId}) {

    async function handleHistoryClick(chatid) {
        const formData = new FormData()
        // formData.append("userPrompt", JSON.stringify({message: ''}))
        formData.append("isHistory", true)
        formData.append("userId", userId)
        formData.append("history", historyLinks)


        const response = await axios.post(`${BASE_URL}/chat/${chatid}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })

        setChats(response.data?.chatArr)
    }


    return (<div className="overflow-y-auto whitespace-pre-line  rounded-lg p-2 my-3 border-gray-800">
        <div className={"absolute z-10 h-[50px] bg-blue-500"}></div>
        {/*Todo*/}
        <div className={"flex h-full"}>
            <div className={"max-h-full w-[100px] border p-4 m-1 min-w-[150px] rounded-[22px]"}>
                {historyLinks.map(link=>(<div key={link}><p className={"text-ellipsis whitespace-nowrap overflow-hidden transition-all duration-200 hover:w-max min-w-full hover:bg-gray-100 px-1 my-2 rounded-full border-gray-400"}><Link title={routeTitleMap[link] || ""} onClick={()=>handleHistoryClick(link)} to={`/chat/${link}`}>{routeTitleMap[link] ? routeTitleMap[link] : "New Chat"}</Link></p><hr className={"border-gray-400"}/></div>))}
            </div>
            <div className={"w-456"}>
                {chats.map((chat)=> {
                    if(chat.position=="left") {
                        return (<OutputChat key={chat.id} chat={chat}/>)
                    }
                    else if(chat.position=="no") return null
                    else if(chat.position=="right") {
                        return (<InputChat key={chat.id} chat={chat}/>)
                    }
                    else return null
                })}
            </div>
        </div>

    </div>)
}