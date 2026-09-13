import {useEffect, useState} from "react";
import {v4 as uuid} from "uuid";
import axios from "axios";
import {BASE_URL} from "../../utility/Constants.js";
import LogoBar from "./LogoBar.jsx";
import OutputChat from "./OutputChat.jsx";
import InputChat from "./InputChat.jsx";
import InputBox from "./InputBox.jsx";
import {useParams} from "react-router-dom";
import Content from "./Content.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";

export default function () {
    const [text, setText] = useState("")
    const [output, setOutput] = useState(" ")
    const [userId, setUserId] = useState("")
    const [file, setFile] = useState(null)
    const [chats, setChats] = useState([])
    const [historyLinks, setHistoryLinks] = useState([])
    const [routeTitleMap, setRouteTitleMap] = useState({})
    const [showLoader, setShowLoader] = useState(false)

    const {chatid} = useParams()

    const handleKey = async (e) => {
        if (e.key != "Enter") return
        else {
            await sendRequest()
            if(file) {
                // inputFileRef.current.value = ""
                setFile(null)
            }
        }
    }

    const handleEnterBtn = async (inputFileRef) => {
        await sendRequest()
        if(file) {
            inputFileRef.current.value = ""
            setFile(null)
        }

    }

    const sendRequest = async () => {
        if (text.trim() === "" && !file) return

        setShowLoader(true)

        setOutput("")

        const inputObj = {}
        // if(file) setText(text+"\n\n" + file.name)
        inputObj.message = text
        inputObj.id = uuid()
        inputObj.position = "right"
        // const arr2 = [...chats, inputObj]
        // setChats(arr2)

        const formData = new FormData()
        formData.append("userPrompt", JSON.stringify(inputObj))
        formData.append("userId", userId)
        formData.append("currentChatId", chatid)


        if (file) {
            formData.append("file", file)
        }

        const response = await axios.post(`${BASE_URL}/chat/${chatid}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        setShowLoader(false)
        setText("")

        setOutput(response.data?.message)
        const obj = {}
        obj.message = response.data?.message
        obj.id = response.data?.id
        obj.position = "left"
        const arr= [...chats, inputObj, obj]
        setChats(arr)
    }

    useEffect(() => {
        if (!chatid) return;

        let id = userId
        const localStorage_user_id = localStorage.getItem("chatAssis_user_id")
        if(localStorage_user_id) {
            id=localStorage_user_id
            setUserId(id)
        }

        if (!id) {
            id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
            setUserId(id)
            localStorage.setItem("chatAssis_user_id", id)
        }



        async function run() {
            const formData = new FormData()
            const userPrompt = {message: ""}
            formData.append("userPrompt", JSON.stringify(userPrompt))
            formData.append("isHistory", true)
            formData.append("userId", id)
            formData.append("currentChatId", chatid)

            console.log("Sending:", [...formData.entries()]);

            console.log("fetch request run")
            const response = await axios.post(`${BASE_URL}/chat/${chatid}`, formData,
                // {
                // headers: {
                //     "Content-Type": "multipart/form-data",
                // },
            // }
            )
            setChats(response.data?.chatArr)
            setHistoryLinks(response.data?.historyLinks ? response.data?.historyLinks : [])
            console.log(response.data?.routeTitleMap)
            setRouteTitleMap(response.data?.routeTitleMap)
            console.log("fetch request run")

        }

        run()



    }, [chatid])

    return (
        <>
            <div className="">
                <div className="">
                    {showLoader && <LoadingSpinner/>}
                    <div className={"grid h-screen grid-rows-[auto_minmax(0,1fr)_auto]"}>
                        <LogoBar history={historyLinks} setHistory={setHistoryLinks}/>

                        {/*<div className={"absolute"}></div>*/}
                        <Content historyLinks={historyLinks} routeTitleMap={routeTitleMap} chats={chats} setChats={setChats} userId={userId}/>

                        {/*Input Area*/}
                        <InputBox handleEnterBtn={handleEnterBtn} handleKey={handleKey} setText={setText} text={text} setFile={setFile} />
                    </div>
                </div>
            </div>
        </>
    )
}