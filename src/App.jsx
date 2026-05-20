import { useEffect, useState } from "react"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { BASE_URL } from "../utility/Constants"
import { Shimmer } from "../utility/Shimmer"
import "./App.css"

function App() {
  const [text, setText] = useState("")
  const [output, setOutput] = useState(" ")
  const [userId, setUserId] = useState("")
  const [file, setFile] = useState(null)

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
            <h1 className="text-5xl font-bold text-center">Chat Assist</h1>
            <div className="py-6 h-120 overflow-y-auto whitespace-pre-line border rounded p-2 my-3 border-gray-200">
              {output == "" ? (
                <Shimmer />
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    table: ({ node, ...props }) => (
                      <table className="markdown-table" {...props} />
                    ),
                  }}
                >
                  {/* {output} */}
                  {typeof output === "string" ? output : JSON.stringify(output)}
                </ReactMarkdown>
              )}
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
              <div className="flex justify-center ml-1">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="file-input file-input-bordered ml-2"
                />
                <button
                  onClick={handleEnterBtn}
                  className="btn border-gray-300 rounded-[7px] outline-none"
                >
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
