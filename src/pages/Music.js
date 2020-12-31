import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { mainListItems, secondaryListItems } from './listItems';
import Orders from './Orders';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { auth } from "../services/firebase";
import { db } from "../services/firebase"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        MusicStore
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Music() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [addShowOpen, setAddShowOpen] = React.useState(false);
  const [bandName, setBandName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [venue, setVenue] = React.useState("");
  const [source, setSource] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAddShowOpen = () => {
    setAddShowOpen(true);
  };

  const handleAddShowClose = () => {
    setAddShowOpen(false);
  };

  const handleAddShow = async (event) => {
      event.preventDefault();
        try {
            await db.ref("music").push({
                bandName: bandName,
                date: date,
                venue: venue,
                source: source,
                notes: notes,
                timestamp: Date.now(),
                uid: auth().currentUser.uid
            });
            setBandName("");
            setDate("");
            setVenue("");
            setSource("");
            setNotes("");
        } catch (error) {
            console.log("ERROR");
            console.log(error);
            this.setState({ writeError: error.message });
        }
        setAddShowOpen(false);
  };

    let handleChange = (event) => {
        console.log(event.target.id);
        if (event.target.id === "bandName") {
            setBandName(event.target.value);
        }
        if (event.target.id === "date") {
            setDate(event.target.value);
        }
        if (event.target.id === "venue") {
            setVenue(event.target.value);
        }
        if (event.target.id === "source") {
            setSource(event.target.value);
        }
        if (event.target.id === "notes") {
            setNotes(event.target.value);
        }
    }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            MusicStore
          </Typography>
          <IconButton color="inherit">
            <Badge color="secondary">
              <AccountCircle />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<AddCircleIcon />}
              onClick={handleAddShowOpen}
            >
              Add Show
            </Button>
            <Dialog open={addShowOpen} onClose={handleAddShowClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Show</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Add show details here!
                </DialogContentText>
                <TextField autoFocus id="bandName" label="Band Name" fullWidth onChange={handleChange}/>
                <TextField id="date" label="Date" fullWidth onChange={handleChange}/>
                <TextField id="venue" label="Venue" fullWidth onChange={handleChange}/>
                <TextField id="source" label="Source" fullWidth onChange={handleChange}/>
                <TextField id="notes" label="Notes" fullWidth onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleAddShowClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAddShow} color="primary">
                    Add Show
                </Button>
                </DialogActions>
            </Dialog>
          <Grid container spacing={3}>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
