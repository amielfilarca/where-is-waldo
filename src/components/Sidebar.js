import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import ScoreIcon from "@material-ui/icons/Score";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TimerIcon from "@material-ui/icons/Timer";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";
import Chip from "@material-ui/core/Chip";
import StarsIcon from "@material-ui/icons/Stars";

import Image from "./Image";
import Timer from "./Timer";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 550,
  },
}));

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Sidebar = (props) => {
  const classes = useStyles();
  const [menuItems, setMenuItems] = React.useState(props.data);

  const listItemClick = (link) => {
    window.open(link);
  };

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [recent, setRecent] = React.useState(null);

  const [openHighScores, setOpenHighScores] = React.useState(false);

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const closeHighScores = () => {
    setOpenHighScores(false);
  };

  const keyPress = (e) => {
    if (e.key === "Enter") {
      props.closeForm();
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            scit (/sīt/)
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem>
              <ListItemIcon>
                <TimerIcon />
              </ListItemIcon>
              <Timer
                timerIsRunning={props.timerIsRunning}
                setTime={props.setTime}
                saveData={props.saveData}
              />
            </ListItem>
            <ListItem button onClick={() => setOpenHighScores(true)}>
              <ListItemIcon>
                <ScoreIcon />
              </ListItemIcon>
              <ListItemText primary="High Scores" />
            </ListItem>
          </List>
          <Divider />
          <List
            subheader={
              <ListSubheader style={{ textAlign: "start" }}>Find</ListSubheader>
            }
          >
            {menuItems.map((item) =>
              item.found === true ? (
                <Tooltip
                  key={item.id}
                  title={`You already found ${item.name}!`}
                  placement="right"
                >
                  <ListItem disabled>
                    <ListItemText
                      style={{ textDecoration: "line-through" }}
                      primary={item.name}
                    />
                  </ListItem>
                </Tooltip>
              ) : (
                <HtmlTooltip
                  key={item.id}
                  title={
                    <React.Fragment>
                      <img width="100%" src={item.image} alt={item.name} />
                      <Typography color="inherit">{item.name}</Typography>
                    </React.Fragment>
                  }
                  placement="right"
                >
                  <ListItem
                    onClick={() => listItemClick(item.reference)}
                    button
                  >
                    <ListItemText primary={item.name} />
                    <ListItemSecondaryAction>
                      <OpenInNewIcon fontSize="small" />
                    </ListItemSecondaryAction>
                  </ListItem>
                </HtmlTooltip>
              )
            )}
          </List>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={closeSnackbar}
          message={`You found ${recent}!`}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={closeSnackbar}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Typography paragraph>
          {"The Raid 3: Scourge of the Machines - by Laurie Greasley"}
        </Typography>
        <Dialog
          open={props.form}
          onClose={props.closeForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Welcome!</DialogTitle>
          <DialogContent style={{ minWidth: 550 }}>
            <DialogContentText>
              To start playing, please enter your name here.
            </DialogContentText>
            <TextField
              onChange={props.validateTextField}
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              required
              autoComplete="off"
              helperText="Player name is required to save scores."
              onKeyUp={keyPress}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={props.closeForm}
              color="primary"
              disabled={props.playerName === null}
            >
              Play
            </Button>
          </DialogActions>
        </Dialog>
        <Image
          data={props.data}
          markFound={props.markFound}
          menuItems={menuItems}
          setMenuItems={setMenuItems}
          openNotification={setOpenSnackbar}
          setRecent={setRecent}
          stopTimer={props.stopTimer}
          time={props.time}
          playerName={props.playerName}
        />
        <Dialog
          onClose={closeHighScores}
          aria-labelledby="customized-dialog-title"
          open={openHighScores}
        >
          <DialogTitle id="customized-dialog-title" onClose={closeHighScores}>
            High Scores
          </DialogTitle>
          <DialogContent dividers>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.highScores.map((score, index) =>
                    index === 0 ? (
                      <TableRow key={index}>
                        <TableCell>
                          <Chip
                            label={index + 1}
                            style={{ backgroundColor: "#ffd700" }}
                            icon={<StarsIcon />}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {score.player}
                        </TableCell>
                        <TableCell>{score.time}</TableCell>
                      </TableRow>
                    ) : index === 1 ? (
                      <TableRow key={index}>
                        <TableCell>
                          <Chip
                            label={index + 1}
                            style={{ backgroundColor: "#c0c0c0" }}
                            icon={<StarsIcon />}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {score.player}
                        </TableCell>
                        <TableCell>{score.time}</TableCell>
                      </TableRow>
                    ) : index === 2 ? (
                      <TableRow key={index}>
                        <TableCell>
                          <Chip
                            label={index + 1}
                            style={{ backgroundColor: "#cd7f32" }}
                            icon={<StarsIcon />}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {score.player}
                        </TableCell>
                        <TableCell>{score.time}</TableCell>
                      </TableRow>
                    ) : (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell component="th" scope="row">
                          {score.player}
                        </TableCell>
                        <TableCell>{score.time}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={closeHighScores} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
};

export default Sidebar;
