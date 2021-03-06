import {Component} from "react";
import CreateForumDialog from "./CreateForumThreadDialog"
import * as ForumActions from "../../actions/ForumThread/CreateForumThreadActions";
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



class ForumThreadPage extends Component{


    componentDidMount() {
       this.props.getAllForums(this.props.accessToken)
    }

    render() {
        return(
            <main className={"container page-content p-3"} style={{ color: '#333333'}}>
                <div className={"container d-inline-flex gap-2"}>
                    <h1>Forums</h1>
                    <CreateForumDialog/>
                </div>

                <div className={"pt-2"}> <ForumThreadList id={"ForumThreadList"} className={"card-columns"} forums={this.props.forums} /> </div>

            </main>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumThreadPage)