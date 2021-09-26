import { Button } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Context } from "../contexts/Store";

export default function UploadComponent() {
  const [state, setState] = useContext(Context);
  const [files, setFiles] = useState("");
  const [filename, setFilename] = useState("");

  // *********** FILE HANDLING ********* //
  function UploadJSON({ children }) {
    const handleChange = e => {
      const fileReader = new FileReader();
      setFilename(e.target.files[0].name);
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = e => {
        console.log("e.target.result", e.target.result);
        setFiles(e.target.result);
      };
    };

    return (
      <>
        <input type="file" onChange={handleChange} />
        <br />
      </>
    );
  }

  const handleYes = () => {
    if (files.length > 0) {
      setState({ inventory: JSON.parse(files) });
    }
  };

  return (
    <>
      <UploadJSON />
      {/* <p>{JSON.stringify(state.inventory)}</p> */}
      <p>
        Would you like to upload <strong>{filename}</strong>?
      </p>
      <Button
        disabled={files.length == 0 ? true : false}
        variant="outlined"
        onClick={handleYes}
      >
        Yes
      </Button>
    </>
  );
}
