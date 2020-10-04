import { Menu, MenuItem } from "@material-ui/core";
import React from "react";
import image from "../assets/raidthree.png";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Image = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [charsLeft, setCharsLeft] = React.useState(props.data);
  const [clicked, setClicked] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const openMenu = (event) => {
    // Create selection div
    const selectionDiv = document.createElement("div");
    selectionDiv.setAttribute("id", "selection-div");
    selectionDiv.style.position = "absolute";
    selectionDiv.style.left = event.pageX - 50 + "px";
    selectionDiv.style.top = event.pageY - 50 + "px";
    selectionDiv.style.width = "100px";
    selectionDiv.style.height = "100px";
    selectionDiv.style.border = "3px dashed #000";
    selectionDiv.style.borderRadius = "50%";
    document.body.append(selectionDiv);
    setAnchorEl(selectionDiv);

    if (event.target.id) {
      setClicked(event.target.id);
    }
  };

  const closeMenu = (event) => {
    if (event.target.dataset.id === clicked) {
      // Update App state
      props.markFound(event.target.dataset.id);
      setCharsLeft(
        charsLeft.filter((char) => char.id !== event.target.dataset.id)
      );
      // Update Sidebar state
      props.setMenuItems(
        props.menuItems.map((item) => {
          if (item.id === event.target.dataset.id) {
            item.found = true;
            props.setRecent(item.name);
          }
          return item;
        })
      );
      props.openNotification(true);
      const status = charsLeft.map((chars) => chars.found);
      const allFound = status.every((val, i, arr) => val === arr[0]);
      if (allFound) {
        props.stopTimer();
        setOpenDialog(true);
      }
    }

    // Delete selection div
    const selectionDiv = document.getElementById("selection-div");
    selectionDiv.parentNode.removeChild(selectionDiv);
    setAnchorEl(null);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <img
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={openMenu}
        src={image}
        alt="Raid Three"
        useMap="#image-map"
      />
      <map name="image-map">
        <area
          id="alpha-5"
          onClick={openMenu}
          alt="Alpha 5"
          title="Alpha 5"
          coords="968,862,849,941"
          shape="rect"
        />
        <area
          id="astro-boy"
          onClick={openMenu}
          alt="Astro Boy"
          title="Astro Boy"
          coords="297,1332,278,1295"
          shape="rect"
        />
        <area
          id="baby-yoda"
          onClick={openMenu}
          alt="Baby Yoda"
          title="Baby Yoda"
          coords="118,881,69,906"
          shape="rect"
        />
        <area
          id="bill-and-ted"
          onClick={openMenu}
          alt="Bill &amp; Ted"
          title="Bill &amp; Ted"
          coords="260,1369,98,1471"
          shape="rect"
        />
        <area
          id="owl"
          onClick={openMenu}
          alt="Owl"
          title="Owl"
          coords="30,106,62,182"
          shape="rect"
        />
      </map>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        getContentAnchorEl={null}
      >
        {charsLeft.map((char) => (
          <MenuItem data-id={char.id} key={char.id} onClick={closeMenu}>
            {char.name}
          </MenuItem>
        ))}
      </Menu>
      <Dialog
        open={openDialog}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Congratulations!</DialogTitle>
        <DialogContent style={{ minWidth: 550 }}>
          <DialogContentText>
            {"You found all targets in "}
            <strong>{props.time}</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => document.location.reload()} color="primary">
            Play Again
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Image;
