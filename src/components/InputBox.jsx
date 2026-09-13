import {useRef} from "react";

export default function ({text, setText, setFile, handleKey, handleEnterBtn}) {

    const fileInputRef = useRef(null)

    const clearInputRef = () =>{
        if (fileInputRef.current) fileInputRef.current.value = "";
    }
    const onEnter = async () => {
        await handleEnterBtn();
        clearInputRef()
    };
    const onKeyUp = async (e) => {
        await handleKey(e)
        clearInputRef()
    }




    return (<div className="flex bottom-0 justify-center">
        <div className={"border-blue-400 border-3 rounded-lg"}>
        <input
            onKeyUp={onKeyUp}
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
                ref={fileInputRef}
                onChange={(e) => setFile(e.target.files[0])}
                className="file-input file-input-bordered ml-2"
            />
            <button
                onClick={()=>onEnter()}
                className="btn border-gray-300 rounded-[7px] outline-none"
            >
                Enter
            </button>
        </div>
    </div>)
}