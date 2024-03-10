import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import EditButton from "../components/edit_mode_button";
import AddModeButton from "../components/add_mode_button";
import {toast} from "react-toastify";
import eventBus from "../components/eventBus";
import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ?  'rgba(250,250,250,0.93)' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'rgba(250,250,250,0.93)' : 'white',
    padding: grid,
    width: 500
});

class DnDList2 extends Component {
    state = {
        items: [],
        selected: []
    };

    Click(item){
        eventBus.dispatch("videoId", { message: item.id })
        eventBus.dispatch("setOpen", { message: true });
    }

    componentWillUnmount() {
        eventBus.remove("mode");
        eventBus.remove("items");
        eventBus.remove("selected");
    }

    componentDidMount() {
        eventBus.on("mode", (data) => this.setState({mode: data.message}));
        eventBus.on("items", (data) => this.setState({items: data.message}));
        eventBus.on("selected", (data) => this.setState({selected: data.message}));

        let myModal = document.getElementById('staticBackdrop');
        myModal.addEventListener('hidden.bs.modal', function (event) {
            eventBus.dispatch("setStop", { message: myModal })
            // do something...
        })

        // new SimpleBar(el);
    }
    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    getList = id => this.state[this.id2List[id]];


    onDragEnd = result => {
        const { source, destination } = result;


        // dropped outside the list
        if (!destination) {

            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );
            let state = { items };
            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }
            this.setState(state);
            eventBus.dispatch("getSelected", {message: items});

        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });

            let res = document.getElementById("placeHolderRes");
            res.style.display = 'none';
            if(result.droppable.length === 0){
                res.style.display = 'block';
                toast("Result is Empty!");
            }

            let sel = document.getElementById("placeHolderSel");
            sel.style.display = 'none';
            if(result.droppable2.length === 0){
                sel.style.display = 'block';
                toast("Drag and Drop your result items !");
            }

            eventBus.dispatch("getSelected", {message: result.droppable2});
            console.log(result.droppable2);
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (

            <DragDropContext onDragEnd={this.onDragEnd}>
                        <div className="col">
                                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <SimpleBar style={{ maxHeight: 700 }}>
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {this.state.items.length > 0 &&
                                this.state.items.map((item, index) => (
                                    <Draggable
                                        key={item.key}
                                        draggableId={item.key}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div>
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps
                                                            .style
                                                    )}
                                                    onClick={() => {this.Click(item)}}
                                                >
                                                    <Card sx={{ maxWidth: 500 }} >
                                                        <CardMedia
                                                            component="img"
                                                            height="150"
                                                            image={item.url}
                                                            alt={item.title}
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
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            <div id="placeHolderRes" >Empty</div>
                            {provided.placeholder}
                        </div>
                        </SimpleBar>
                    )}
                        </Droppable>
                    <br/><br/></div>
                        <div className="col">
                            <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                        <SimpleBar style={{ maxHeight: 700 }}>
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {this.state.selected.map((item, index) => (
                                <Draggable
                                    key={item.key}
                                    draggableId={item.key}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps
                                                    .style
                                            )}
                                            onClick={() => {this.Click(item)}}
                                        >
                                            <Card sx={{ maxWidth: 500 }} >
                                                <CardMedia
                                                    component="img"
                                                    height="150"
                                                    image={item.url}
                                                    alt={item.title}
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
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            <div id="placeHolderSel" >Drop to favorites</div>
                            {provided.placeholder}
                        </div>
                        </SimpleBar>
                    )}
                        </Droppable>
                        </div>
            </DragDropContext>
        );
    }
}
export default DnDList2;
