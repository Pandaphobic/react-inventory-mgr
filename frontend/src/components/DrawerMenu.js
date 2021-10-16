import React, { useContext } from "react"
import clsx from "clsx"
import { makeStyles } from "@mui/styles"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import { Modal } from "@mui/material"
import UploadJSON from "./UploadComponent"

import { Context } from "../contexts/StoreContext"

// ICONS
import { IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import ListItemIcon from "@mui/material/ListItemIcon"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import SettingsIcon from "@mui/icons-material/Settings"
import PublishIcon from "@mui/icons-material/Publish"
import CloudOffIcon from "@mui/icons-material/CloudOff"
import GetAppIcon from "@mui/icons-material/GetApp"

var FileSaver = require("file-saver")

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
})

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
}

// ******** DRAWER ******** //
export default function TemporaryDrawer() {
  const [inventoryState, setInventoryState] = useContext(Context)
  setInventoryState({ ...inventoryState })

  const [openModal, setOpenModal] = React.useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const handleExport = () => {
    // console.log(JSON.stringify(JSON.stringify(inventoryState["inventory"])));
    var blob = new Blob([`${JSON.stringify(inventoryState["inventory"])}`], {
      type: "text/plain;charset=utf-8"
    })
    FileSaver.saveAs(blob, "exported_JSON.json")
    // TextFile();
  }

  const classes = useStyles()
  const [drawerState, setDrawerState] = React.useState({
    left: false
  })

  const toggleDrawer = (anchor, open) => event => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }

    setDrawerState({ ...drawerState, [anchor]: open })
  }

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem onClick={handleOpenModal} button key={"import"}>
          <ListItemIcon>
            <GetAppIcon />
          </ListItemIcon>
          <ListItemText primary={"Import"} />
        </ListItem>

        <ListItem onClick={handleExport} button key={"export"}>
          <ListItemIcon>
            <PublishIcon />
          </ListItemIcon>
          <ListItemText primary={"Export"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="Settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button key="Logout">
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
        <ListItem button key="Offline Mode">
          <ListItemIcon>
            <CloudOffIcon />
          </ListItemIcon>
          <ListItemText primary="Offline Mode" />
        </ListItem>
        <Divider />
        <ListItem button key="Version Number">
          <ListItemText primary={`${inventoryState["version"]}`} />
        </ListItem>
      </List>
    </div>
  )

  return (
    <React.Fragment key="left">
      <IconButton onClick={toggleDrawer("left", true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor={"left"} open={drawerState["left"]} onClose={toggleDrawer("left", false)}>
        {list("left")}
      </Drawer>
      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload Json file
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <UploadJSON />
          </Typography>
        </Box>
      </Modal>
    </React.Fragment>
  )
}
