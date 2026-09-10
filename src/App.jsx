import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../utility/Constants"
import { Shimmer } from "../utility/Shimmer"
import "./App.css"
import { v4 as uuid } from 'uuid';
import OutputChat from "./components/OutputChat.jsx";
import InputChat from "./components/InputChat.jsx";
import InputBox from "./components/InputBox.jsx";
import LogoBar from "./components/LogoBar.jsx";


function App() {
  const [text, setText] = useState("")
  const [output, setOutput] = useState(" ")
  const [userId, setUserId] = useState("")
  const [file, setFile] = useState(null)
  const [chats, setChats] = useState([])

  const handleKey = async (e) => {
    if (e.key != "Enter") return
    else {
      await sendRequest()
    }
  }

  const handleEnterBtn = async () => {
    await sendRequest()
  }

  const sendRequest = async () => {
    if (text.trim() === "" && !file) return

    setOutput("")

    const inputObj = {}
    inputObj.message = text
    inputObj.id = uuid()
    inputObj.position = "right"
    // const arr2 = [...chats, inputObj]
    // setChats(arr2)

    const formData = new FormData()
    formData.append("userPrompt", text)
    formData.append("userId", userId)

    if (file) {
      formData.append("file", file)
    }

    const response = await axios.post(`${BASE_URL}/chat`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    setOutput(response.data?.message)
    const obj = {}
    obj.message = response.data?.message
    obj.id = uuid()
    obj.position = "left"
    const arr= [...chats, inputObj, obj]
    setChats(arr)
  }

  useEffect(() => {
    let id = userId

    if (!id) {
      id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
      setUserId(id)
    }
  }, [])

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content">
          <div className="w-456">
            <LogoBar/>
            <div className="overflow-y-auto whitespace-pre-line  rounded-lg p-2 my-3 border-gray-800">
              {chats.map((chat)=> {
                if(chat.position=="left") {
                  return (<OutputChat key={chat.id} chat={chat}/>)
                }
                else {
                  return (<InputChat key={chat.id} chat={chat}/>)
                }
              })}
            </div>
            {/*Input Area*/}
            <InputBox handleEnterBtn={handleEnterBtn} handleKey={handleKey} setText={setText} text={text} setFile={setFile} />
          </div>
        </div>
      </div>
    </>
  )
}

// <ReactMarkdown
//                   remarkPlugins={[remarkGfm]}
//                   components={{
//                     table: ({ node, ...props }) => (
//                       <table className="markdown-table" {...props} />
//                     ),
//                   }}
//                 >
//                   {/* {output} */}
//                   {typeof output === "string" ? output : JSON.stringify(output)}
//                 </ReactMarkdown>

export default App
