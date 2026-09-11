import {useNavigate } from "react-router-dom"
import {v4 as uuid} from 'uuid'

export default function ({history, setHistory}) {
    const navigate = useNavigate()
    async function handleNewChat() {
        const chat_id = uuid()
        navigate(`/chat/${chat_id}`)
        setHistory([...history, chat_id])

        console.log(history)
    }

    return (<div className={"m-0 p-0"}>
        <div className={"absolute rounded-full bg-blue-300 p-4 h-10 w-10 flex justify-center items-center"}><button onClick={handleNewChat} >+</button></div>
        <h1 className="text-5xl font-bold text-center">Ask GPT in Chats</h1>
    </div>)
}