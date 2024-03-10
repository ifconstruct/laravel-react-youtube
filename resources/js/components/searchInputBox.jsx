import TextField from '@mui/material/TextField';
function SearchInputBox({ onKeyPress, ...props }) {
  return (
    <div>
        <span style={{ margin: "5px" }}>
          <strong>#</strong>
        </span>
        <TextField onKeyDown={onKeyPress}

          id="search"
          placeholder="Your Seacrh"
          style={{
            width: "50vw"
          }}
                   label="Search please by #"
                   variant="standard"

        />
    </div>
  );
}

export default SearchInputBox;
