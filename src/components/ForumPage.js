import {Component} from "react";
import * as ForumActions from "../actions/ForumActions";
import ForumThreadList from "./ForumThreadList"
import {connect} from "react-redux";

const mapStateToProps = state => {
    return{
        forums: state.forums,
        accessToken: state.accessToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllForums: (token) => {
            dispatch(
                ForumActions.getAllForums(token)
            )
        },
    }
}

class ForumPage extends Component{

    componentDidMount() {
       this.props.getAllForums(this.props.accessToken)
    }



    render() {
        console.log(this.props.forums)
        return(
            <main className={"page-content p-3"} style={{ background: 'white'}}>
                <div className={"d-inline-flex gap-2"} align={"left"}>
                    <h1>Forums</h1>
                    {/*<CreateForumThread/>*/}
                </div>

                <div className={"pt-2"}> <ForumThreadList forums={this.props.forums} /> </div>

            </main>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumPage)