import React, {Component} from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import MyAppBar from "./components/MyAppBar";
import CheckinGrid from "./components/CheckinGrid/CheckinGrid";

class App extends Component {

    render() {
        return (
            <div className="App">
                <MyAppBar/>
                <CheckinGrid/>
            </div>
        );
    }
}

export default App;