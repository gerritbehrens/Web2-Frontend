import {Component} from "react";
import ForumActions from "../actions/ForumActions";
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

    //componentDidMount() {
    //    this.props.getAllForums(this.props.accessToken)
    //}


    render() {
        return(
            <div>
                <h1>ForumPage is here!</h1>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumPage)