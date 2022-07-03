import {connect} from "react-redux";

export const GET_ALL_FORUMS = "GET_ALL_FORUMS"

const mapStateToProps = state =>{
    return state
}

export function getAllForumsAction(forums){
    console.log("getAllForumsACTION")
    return{
        type: GET_ALL_FORUMS,
        payload: forums,
    }
}

export function getAllForums(){
    console.log("I am in getAllForums")
    return dispatch =>{
        // build request to rest api for showing all users
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // send request
        fetch("https://localhost/forumThreads", requestOptions)
            .then(response => response.json())
            .then(forums => {
                dispatch(getAllForumsAction(forums))
            })
    }

}

export default connect(mapStateToProps)