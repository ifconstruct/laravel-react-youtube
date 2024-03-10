import React, {useState} from "react";
import {createRoot} from "react-dom/client";
import eventBus from "../components/eventBus";
import SearchInputBox from "../components/searchInputBox";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import YoutubePlayer from "../components/YoutubePlayer";
import DnDList from "../components/DnDList";
import DnDList2 from "../components/DnDList2.jsx";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddModeButton from "../components/add_mode_button";
import AddGitButton from "../components/add_git_button";
//import { Modal } from "@material-ui/core";
'use strict';

let loadedItem = [];
const Child = ({data}) => (
    <div>
        {data.map((x, i) => (<div key={i}> {x[0]} / {x[1]} / {x[2]} / <img src={x[3]}></img></div>))}
        <br></br>
    </div>
);

class App extends React.Component {

   constructor(props) {
        super(props);
        this.state = {
            mode: "prod",
            data : [],
            query : "react",
            api: "AIzaSyBmBwtfkZ_8QxzHRul4RA3RoPfZtiKRiXk"
            //api : "AIzaSyCUZeZHwvymKt6976j6u4xyWs0duX-1sNo"
        }

        console.log("constructor");
    }
    async componentDidMount() {
        await this.loadAll(this.state.query);
        console.log("did mount - " + this.state.query);
    }

    handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            await this.loadAll(e.target.value);
        }
    }

    makeid = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    async loadAll(query){
        try {
            if(this.state.mode === "prod") {
                const response = await fetch(
                    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=20&q=%23$" + query + "&type=video&key="+this.state.api
                );
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                const res = await response.json();
                loadedItem = [];
                const rand = this.makeid(5);
                for (const key in res.items) {
                    //console.log(res.items[key].snippet.channelId);
                    // console.log(res.items[key].snippet.channelTitle);
                    loadedItem.push({"key" :key+rand,"id" : res.items[key].id.videoId, "url": res.items[key].snippet.thumbnails.medium.url,"title": res.items[key].snippet.title, "description" : res.items[key].snippet.description});
                }
                this.setState({data : loadedItem});
                eventBus.dispatch("items", { message: loadedItem });
                eventBus.dispatch("getItems", { message: loadedItem });
                console.log("changed prod - "+query);
            }else{
                const array = [];
                const rand = this.makeid(5);
                array.push({"key":1+rand,"id" :"YQHsXMglC9A" ,"url":"https://i.ytimg.com/vi/YQHsXMglC9A/mqdefault.jpg",'title' : "title","description" : "desc"});
                array.push({"key":2+rand,"id" :"mHONNcZbwDY" ,"url":"https://i.ytimg.com/vi/mHONNcZbwDY/mqdefault.jpg",'title' : "title","description" : "desc"});
                array.push({"key":3+rand,"id" :"tVlcKp3bWH8" ,"url":"https://i.ytimg.com/vi/tVlcKp3bWH8/mqdefault.jpg",'title' : "title","description" : "desc"});
                this.setState({data : array});
                eventBus.dispatch("items", { message: array });
                eventBus.dispatch("getItems", { message: array });
                console.log("changed dev - "+query);
            }
          //  this.setState({query : query});
        } catch (error) {
            console.error(`Could not get products: ${error}`);
        }
    }

    render() {
        return(
            <ThemeProvider theme={theme}>
                    <ToastContainer />
                    <div className="App">
                        <Box sx={{ my: 4 }}>
                        <h1> PRTFL0/Ep.01 </h1>
                            <Typography variant="h4" component="h1" sx={{ mb: 2 }}  >
                                Youtube# search
                            </Typography>
                        </Box>
                            <div className="modal fade center-screen" id="staticBackdrop" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog " role="document">
                                    <div className="modal-content">
                                        <div className="ratio ratio-16x9 center-screen">
                                            <YoutubePlayer />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <Box sx={{ my: 4 }}>
                            <Typography variant="h4" component="h1" sx={{ mb: 2 }}  >
                                Laravel/DB/React/DnD/Youtube|v3/Css/Material UI
                            </Typography>
                        </Box>
                        <div>
                            <SearchInputBox onKeyPress={this.handleKeyPress} />
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <AddGitButton/>
                                </div>

                                <div className="col">
                                    <AddModeButton/>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row row-cols-2" >
                                    <DnDList2 />
                            </div>
                        </div>
                        <br/>
                    </div>
            </ThemeProvider>
        );
    }
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
