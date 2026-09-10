export default function ({chat}) {
    return (
        <div className={"flex justify-end mb-2 mt-10 "}>
            <div className={"bg-[#e8f3fe] rounded-[22px] px-4 py-2.5"}>{chat.message}</div>
        </div>
    )
}