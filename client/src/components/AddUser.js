import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_USERS, UPLOAD_FILE, ADD_USER} from "../api/userApi";

const AddUser = ({users}) => {
    const [name, setName] = useState("");
    const [ addUser ] = useMutation(ADD_USER, {
        refetchQueries: [
            {query: GET_USERS},
            "getUsers"
        ]
    })

    const handleSend = () => {
        addUser({ variables: {
            input: {
                id: users.length + 1,
                name
            }
        }})
    }

    // const [uploadFile] = useMutation(UPLOAD_FILE)

    // const handleSend = (e) => {
    //     const file = e.target.files[0]
    //     uploadFile({ variables: {
    //         file
    //     }})
    // }

    

    return (
        <>
            {/* <input
                type="file"
                onChange={e => handleSend(e)}
            /> */}
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <button onClick={handleSend}>Push</button>
        </>
    )
}
export default AddUser;