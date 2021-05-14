import React, {Component} from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import MyAppBar from "./components/MyAppBar";
import Tiles from "./components/TileLayout/Tiles";

class App extends Component {

    render() {
        return (
            <div className="App">
                <MyAppBar/>
                <Tiles/>
            </div>
        );
    }
}

export default App;