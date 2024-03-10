import React, {useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import YoutubePlayer from "../components/YoutubePlayer";
import eventBus from "../components/eventBus";

class MaxWidthDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setOpen: false,
            open : false
        };

    }

    componentWillUnmount() {
        eventBus.remove("setOpen");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        eventBus.on("setOpen", (data) => {
            this.setState({playlist: data.message});
            this.setState({open : data.message });
            });

    };

    handleClickOpen = () => {
        this.setState({setOpen : true });
        this.setState({open : true });
    };

    handleClose = () => {
        this.setState({setOpen :false});
        this.setState({open : false });
    };



    render() {
        return   <React.Fragment>

            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
            >
                <DialogTitle>Optional sizes</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can set my maximum width and whether to adapt or not.
                    </DialogContentText>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    >

                        <YoutubePlayer  />
                        <FormControlLabel
                            sx={{ mt: 1 }}
                            control={
                                <Switch checked="100%" />
                            }
                            label="Full width"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    };

}

export default MaxWidthDialog;
