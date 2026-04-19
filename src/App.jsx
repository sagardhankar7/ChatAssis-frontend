import { useState } from "react"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

function App() {
  const [text, setText] = useState("")
  const [output, setOutput] = useState("")

  const handleKey = async (e) => {
    if (e.key != "Enter") return
    else {
      if (text.trim() == "") return
      setOutput("")
      const response = await axios.post(
        "https://chatassis-backend.onrender.com/chat",
        {
          userPrompt: text,
        },
      )
      setOutput(response.data?.message)
      //   console.log(response.data?.message)
    }
  }

  const handleEnterBtn = async () => {
    if (text.trim() == "") return
    setOutput("")
    const response = await axios.post(
      "https://chatassis-backend.onrender.com/chat",
      {
        userPrompt: text,
      },
    )
    setOutput(response.data?.message)
  }

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="w-456">
            <h1 className="text-5xl font-bold">Chat Assist</h1>
            <div className="py-6 h-120 overflow-y-auto whitespace-pre-line border rounded p-2 my-3 border-gray-200">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {output}
              </ReactMarkdown>
            </div>
            <div className="flex justify-center">
              <input
                onKeyUp={handleKey}
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ask Anything"
                className="input w-[calc(570px)] outline-none border-none"
              />
              <div className="flex flex-col justify-center ml-1">
                <button
                  onClick={handleEnterBtn}
                  className="btn border-gray-300 rounded-[7px] outline-none"
                >
                  {" "}
                  Enter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
