import { YTlogo } from "./logo";
import React, {useState} from "react";
import { useQuery } from "react-query";
import { client } from "../components/utils";
import { MyLoader } from "../components/logo";
import { Draggable, DragDropContext } from "react-beautiful-dnd";
import { CardContainer, DisplayCard } from "./cards";

function Results({ query, makeCard, results, setResults }) {
  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["youtube", { query }],
    queryFn: () => client(query)
  });

  React.useEffect(() => {
    if (isSuccess) {
      setResults(data.items);
    }
  }, [data, isSuccess, setResults]);

  let ls = [
    <li key="a">
      <MyLoader />
    </li>,
    <li key="b">
      <MyLoader />
    </li>,
    <li key="c">
      <MyLoader />
    </li>
  ];

  return isError ? (
    <div css={{ color: "red" }}>
      <p>There was an error:</p>
      <pre>{error.message}</pre>
    </div>
  ) : (
    <CardContainer fallback={<YTlogo />} id="results">
      {isLoading
        ? ls
        : isSuccess
        ? results.map((item, index) => makeCard(item, index))
        : null}
    </CardContainer>
  );
}

function Favourites({ favourite, makeCard }) {
  const fallback = <p>Favourites</p>;

  return (
    <CardContainer fallback={fallback} id="favourite">
      {favourite.map((item, index) => makeCard(item, index))}
    </CardContainer>
  );
}

function MainContainer({ query, togglePlayer }) {
  const [results, setResults] = React.useState([]);
  const [favourite, setFavourite] = React.useState([]);

  function makeCard(item, index) {
    return (
      <Draggable key={item.etag} draggableId={item.etag} index={index}>
        {(provided) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <DisplayCard
              data={item.snippet}
              onClick={() =>
                togglePlayer(
                  `https://www.youtube.com/watch?v=${item.id.videoId}`
                )
              }
            />
          </li>
        )}
      </Draggable>
    );
  }

  function reOrder(list, sourceIndex, destinationIndex) {
    const items = Array.from(list);
    const [reorderedItem] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, reorderedItem);
    return items;
  }

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);

    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    return [sourceClone, destClone];
  };

  function handleOnDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;
    console.log(result);

    if (source.droppableId === destination.droppableId) {
      const stateSet =
        source.droppableId === "results"
          ? [results, setResults]
          : [favourite, setFavourite];
      const items = reOrder(stateSet[0], source.index, destination.index);
      stateSet[1](items);
    } else {
      const [srcStateSet, destStateSet] =
        source.droppableId === "results"
          ? [
              [results, setResults],
              [favourite, setFavourite]
            ]
          : [
              [favourite, setFavourite],
              [results, setResults]
            ];
      const [srcState, destState] = move(
        srcStateSet[0],
        destStateSet[0],
        source,
        destination
      );
      srcStateSet[1](srcState);
      destStateSet[1](destState);
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Results
          query={query}
          makeCard={makeCard}
          results={results}
          setResults={setResults}
        />
        <Favourites favourite={favourite} makeCard={makeCard} />
      </DragDropContext>
    </div>
  );
}
export { Results, Favourites, MainContainer };
