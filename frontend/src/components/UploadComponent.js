import { Button, Grid } from "@mui/material"
import React, { useContext, useState } from "react"
import { Context } from "../contexts/StoreContext"

export default function UploadComponent() {
  const [state, setState] = useContext(Context)
  const [files, setFiles] = useState("")
  const [filename, setFilename] = useState("")

  // *********** FILE HANDLING ********* //
  function UploadJSON() {
    const handleChange = e => {
      const fileReader = new FileReader()
      setFilename(e.target.files[0].name)
      fileReader.readAsText(e.target.files[0], "UTF-8")
      fileReader.onload = e => {
        // console.log("e.target.result", e.target.result);
        setFiles(e.target.result)
      }
    }

    return (
      <>
        <input type="file" onChange={handleChange} />
        <br />
      </>
    )
  }

  const handleYes = () => {
    if (files.length > 0) {
      setState({ ...state, inventory: JSON.parse(files) })

      setFiles("")
    }
  }
  const handleNo = () => {
    setFiles("")
  }

  return (
    <>
      <UploadJSON />
      {/* <p>{JSON.stringify(state.inventory)}</p> */}

      {files.length > 0 ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              Would you like to upload {filename}?
            </Grid>

            <Grid item xs={6}>
              <Button fullWidth variant="outlined" onClick={handleNo}>
                No
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth disabled={files.length === 0 ? true : false} variant="outlined" onClick={handleYes}>
                Yes
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <></>
      )}
    </>
  )
}
