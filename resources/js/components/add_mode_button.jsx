import React, {createElement} from "react";
import { createRoot } from 'react-dom/client';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import {Refresh} from "@mui/icons-material";
import {Save} from "@mui/icons-material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eventBus from "./eventBus";

'use strict';

const e = React.createElement;

class AddModeButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: true,
            selected: []
        };
        this.ajaxPostAdd = this.ajaxPostAdd.bind(this);
        this.ajaxPostReload = this.ajaxPostReload.bind(this);
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

    componentWillUnmount() {
        eventBus.remove("getSelected");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        eventBus.on("getSelected", (data) => {
            this.setState({ selected : data.message});
            console.log("hereeeeeeee");
            console.log(data.message);
        });
    }

    ajaxPostReload() {

        let token = document.querySelector("meta[name='csrf-token']").getAttribute("content");

        axios({
            method: 'GET',
            url: '/load',
            headers: {
                'X-CSRF-TOKEN': token
            },
        })
            .then(function (res) {
                let items = JSON.parse(res.data[0].items);
                console.log(items);
                let  loadedItem = [];

                for (const key in items) {
                    loadedItem.push({"key" :items[key].key,"id" : items[key].id, "url": items[key].url,"title": items[key].title, "description" : items[key].description});
                }
                eventBus.dispatch("selected", { message: loadedItem });
                toast("Data reloaded!");
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    ajaxPostAdd() {

        let token = document.querySelector("meta[name='csrf-token']").getAttribute("content");

        axios({
            method: 'POST',
            url: '/store',
            data: {items : JSON.stringify(this.state.selected),playlist:1},
            headers: {
                'X-CSRF-TOKEN': token
            },
        })
            .then(function (response) {
                console.log(response.data);
                toast("Data saved!");
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    render() {
            return (
                <Box sx={{ my: 3 }} display="flex" justifyContent="flex-end">
                <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={this.ajaxPostAdd} startIcon={<Save />}>Save</Button>
                <Button variant="outlined" onClick={this.ajaxPostReload} startIcon={<Refresh />}>Reload</Button>
                </Stack>
                </Box>
                )
		}
}
export default AddModeButton;
