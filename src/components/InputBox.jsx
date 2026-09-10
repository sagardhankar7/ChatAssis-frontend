export default function ({text, setText, setFile, handleKey, handleEnterBtn}) {
    return (<div className="flex bottom-0 justify-center">
        <div className={"border-blue-400 border-3 rounded-lg"}>
        <input
            onKeyUp={handleKey}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask Anything"
            className="input w-[calc(570px)] outline-none border-none"
        />
        </div>
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
    </div>)
}