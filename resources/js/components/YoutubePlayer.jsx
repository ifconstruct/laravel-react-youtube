import React, {useState} from "react";
import { createRoot } from 'react-dom/client';
import YouTube from 'react-youtube';
import eventBus from "./eventBus";
import * as bootstrap from 'bootstrap'
class YoutubePlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoId: "",
            playlist : "",
            current : 0,
            target : null
        };
        this._onEnd = this._onEnd.bind(this);
    }

    componentWillUnmount() {
        eventBus.remove("videoId");
        eventBus.remove("getItems");
        eventBus.remove("setStop");
    }

    // setState inside this will cause infinite loop
    componentDidUpdate(prevProps, prevState, snapshot) {
     //   console.log("componentDidUpdate youtube: ", prevProps, prevState, snapshot);
        console.log("componentDidUpdate youtube");
        eventBus.on("videoId", (data) => this.setState({videoId: data.message}));
        eventBus.on("getItems", (data) => this.setState({ playlist : data.message}));
        eventBus.on("setStop", (data) => {
            var frame = document.getElementById("playerId");
            frame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        });
        console.log(this.state);
    }

    componentDidMount()  {
        console.log("didMount youtube");
        eventBus.on("videoId", (data) => {
            this.setState({videoId: data.message});
            let myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
               myModal.show();
            }
        );
        eventBus.on("getItems", (data) => this.setState({ playlist : data.message}));
        eventBus.on("setStop", (data) => {
            var frame = document.getElementById("playerId");
            frame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        });
        console.log(this.state);
    }

    render() {
        const opts = {
            height: '600',
            width: "800",
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                rel: 0,
                showinfo: 1,
                fs: 0,
            },
        };
        return (
          <YouTube videoId={this.state.videoId} id="playerId" opts={opts} onReady={this._onReady} onEnd={this._onEnd}  />
        );
    }

    _onEnd(event){
        event.target.seekTo(0, true);
        event.target.playVideo();
    }
    _onReady(event) {
        // access to player in all event handlers via event.target
       event.target.pauseVideo();
    }
}



export default YoutubePlayer;
