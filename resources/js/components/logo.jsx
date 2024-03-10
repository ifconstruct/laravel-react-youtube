import ContentLoader from "react-content-loader";

function YTlogo() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        margin: "auto"
      }}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/4f/YouTube_social_white_squircle.svg"
        width="50%"
        alt="Youtube Results"
      />
    </div>
  );
}

const MyLoader = () => (
  <div className="loader">
    <ContentLoader viewBox="0 0 160 120">
      <rect x="4" y="4" rx="5" ry="5" width="152" height="90" />
      <rect x="24" y="98" rx="4" ry="4" width="120" height="8" />
      <rect x="24" y="108" rx="3" ry="3" width="40" height="5" />
      <circle cx="12" cy="105" r="8" />
    </ContentLoader>
  </div>
);

export { YTlogo, MyLoader };
