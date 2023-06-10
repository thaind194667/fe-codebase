import Header from "@/layouts/Header"

export default function HomeAdmin () {
    return (
        <>
            <Header></Header>
            <div>This is admin homepage</div>
            <div> &emsp; If you want to change role, <b>Inspect</b> then choose <b>Application</b>, then delete value in <b>local storage</b>. Then reaload the page</div>
            <div>Click <b>button in the header</b> to logout</div>
        </>
    )
}