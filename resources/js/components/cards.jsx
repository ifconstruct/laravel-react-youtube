import { Droppable } from "react-beautiful-dnd";
import moment from "moment";
//import {YTlogo} from "@/components/logo.jsx";
//import { YTlogo } from "./logo";

function DisplayCard({ data, onClick, ...props }) {
  const date = new Date(data.publishedAt).getTime();
  return (
    <div className="card" onClick={onClick}>
      <img
        className="thumbnail"
        alt="thumbnail"
        src={data.thumbnails.high.url}
      />
      <div className="info">

        <div className="textInfo">
          <div className="name">{data.title}</div>
          <div className="channelName">{data.channelTitle}</div>
          <span className="details">{moment(date).fromNow()}</span>
        </div>
      </div>
    </div>
  );
}

function CardContainer({ children, fallback, id, ...props }) {
  return (
    <div
      style={{
        boxShadow: "1px 1px 2px lightgrey, -1px -1px 2px lightgrey",
        borderRadius: "5px",
        width: "30vw",
        height: "75vh",
        margin: "5vh auto",
        overflow: "scroll"
      }}
    >
      {children && children.length > 0 ? null : fallback}
      <Droppable droppableId={id}>
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              listStyleType: "none",
              padding: "0",
              margin: "0",
              height: children && children.length > 0 ? "auto" : "67vh",
              border: "1px solid blue"
            }}
          >
            {children}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}

export { CardContainer, DisplayCard };
