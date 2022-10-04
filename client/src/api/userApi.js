import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query getUsers {
        getUsers {
            id
            name
        }
    }
`

export const UPLOAD_FILE = gql`
    mutation singlUpload($file: Upload!) {
        singleUpload(file: $file) {
            filename
            mimetype
            encoding
        }
    }
`

export const ADD_USER = gql`
    mutation addUser($input: UserInput!) {
        addUser(input: $input) {
            id
            name
        }
    }
`

