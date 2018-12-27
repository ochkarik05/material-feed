import React, {Component} from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Articles from '../Articles';

export default class extends Component {

    render() {
        return <>
            <Header/>

            <Articles/>

            <Footer/>
        </>;
    }

}
