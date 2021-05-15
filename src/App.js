import React, {Component} from 'react';
import './App.scss';
import MyAppBar from "./components/MyAppBar";
import Tiles from "./components/TileLayout/Tiles"

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