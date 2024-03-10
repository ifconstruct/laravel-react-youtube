import React , { useState } from "react";
import { createRoot } from 'react-dom/client';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import eventBus from "./eventBus";
import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import * as bootstrap from "bootstrap";
import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const getItems = (count) => Array.from({length: count}, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
    url : 'YQHsXMglC9A'
}));
// a little function to help us with reordering the result
const reorder =  (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (draggableStyle, isDragging) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'rgba(250,250,250,0.93)' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'rgba(250,250,250,0.93)' : 'white',
    padding: grid,
    width: 500
});

const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");

class DnDList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            mode : "default",
        }
        console.log(this.state.items);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    Click(item){
       eventBus.dispatch("videoId", { message: item.id })
       eventBus.dispatch("setOpen", { message: true });
    }

    componentWillUnmount() {
        eventBus.remove("mode");
        eventBus.remove("items");
    }

    componentDidMount() {
        eventBus.on("mode", (data) => this.setState({mode: data.message}));
        eventBus.on("items", (data) => this.setState({items: data.message}));

        let myModal = document.getElementById('staticBackdrop');
        myModal.addEventListener('hidden.bs.modal', function (event) {
                eventBus.dispatch("setStop", { message: myModal })
            // do something...
        })

        // new SimpleBar(el);
    }

     ItemView = (mode,item) => {
        if (mode === "edit") {
            return <div id={item.id} style={{cursor: "pointer"}} >Delete</div>;
        }else{
            return null;
        }
    };

    ItemEdit(item) {
        alert ("this is item"+item.id);
    }

    onDragEnd (result) {
        // dropped outside the list
        if(!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        console.log(result);

        this.setState({
            items
        });
    }

    // Normally you would want to split things out into separate components.
    // But in
    // this example everything is just done in one place for simplicity

    render() {
        return (

            <DragDropContext onDragEnd={this.onDragEnd}  >

                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <SimpleBar style={{ maxHeight: 700 }}>
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {this.state.items.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                style={getItemStyle(
                                                    provided.draggableProps.style,
                                                    snapshot.isDragging
                                                )}
                                                onClick={() => {this.Click(item)}}
                                            >
                                                <Card sx={{ maxWidth: 450 }} >
                                                        <CardMedia
                                                            component="img"
                                                            height="150"
                                                            image={item.url}
                                                            alt={item.description}
                                                        />
                                                        <CardContent>
                                                            <Typography gutterBottom variant="h5" component="div">
                                                                {item.title}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {item.description}
                                                            </Typography>
                                                        </CardContent>

                                                </Card>
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div></SimpleBar>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

export default DnDList;
