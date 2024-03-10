import React, {createElement} from "react";
import { createRoot } from 'react-dom/client';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import {Refresh} from "@mui/icons-material";
import {GitHub} from "@mui/icons-material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eventBus from "./eventBus";

'use strict';

class AddGitButton extends React.Component {

    constructor(props) {
        super(props);
    }

    Click = () => {
        document.location.href="https://github.com/ifconstruct/laravel-react-youtube";
    }

    render() {
        return (
            <Box sx={{ my: 3 }} display="flex" justifyContent="flex-start">
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" onClick={this.Click} startIcon={<GitHub />}>Git</Button>
                </Stack>
            </Box>
        )
    }
}

export default AddGitButton;
