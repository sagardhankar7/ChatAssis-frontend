import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"


export default function ({chat}) {
    return (
        <div className={"border border-gray-400 bg-gray-100 px-4 py-4 rounded-lg mb-4 flex justify-start"}><ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                table: ({ node, ...props }) => (
                    <table className="markdown-table" {...props} />
                ),
            }}
        >
            {/* {output} */}
            {typeof chat.message === "string" ? chat.message : JSON.stringify(chat.message)}
        </ReactMarkdown></div>)
}