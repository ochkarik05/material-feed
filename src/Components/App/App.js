import React, {Component} from 'react';
import Header from '../Header';
import Articles from '../Articles';
import withAuthentication from '../Session/withAuthentication';
import SignIn from './../SignIn'

class App extends Component {

    state = {
        modalOpen: false,
    };

    handleOpen = () => this.setState({
            modalOpen: true,
        });

    handleClose = () => this.setState({
            modalOpen: false,
        });

    handleSignOut = () => {
        this.props.firebase.signOut();
    };

    render() {

        return <>

            <Header
                onSignInClick={this.handleOpen}
                onSignOutClick={this.handleSignOut}
            />

            <Articles/>

            <SignIn open={this.state.modalOpen} onClose={this.handleClose}/>

        </>
    }

}

export default withAuthentication(App)
