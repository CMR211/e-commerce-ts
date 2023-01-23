interface QueryMessage {
    message: string
    icon: "loading" | "error"
}

export  function QueryMessage({ message, icon }: QueryMessage) {
    return (
        <div>
            ({icon}) {message}
        </div>
    )
}
