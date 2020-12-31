import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

import { auth } from "../services/firebase";
import { db } from "../services/firebase"

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));


export default function Orders() {
  const classes = useStyles();

    let [musicData, setMusicData] = useState({});
    let [error, setError] = useState(null);

    let handleChange = (event) => {
    }
 
    let handleSubmit = async (event) => {
    }

        // try {
        //     await db.ref("music").push({
        //         bandName: "Green Day",
        //         date: "5/9/2011",
        //         venue: "Madison Square Garden",
        //         source: "MP3",
        //         notes: "This was a great show!"
        //         timestamp: Date.now(),
        //         uid: auth().currentUser.uid
        //     });
        //     this.setState({ content: '' });
        // } catch (error) {
        //     console.log("ERROR");
        //     console.log(error);
        //     this.setState({ writeError: error.message });
        // }

    useEffect(() => {
        try {
            db.ref("music").on("value", snapshot => {
                let musicData = {};
                snapshot.forEach((snap) => {
                    musicData[snap.key] = snap.val();
                });
                setMusicData(musicData);
            });
        } catch (error) {
            this.setState({ readError: error.message });
        }
    }, []);

  return (
    <React.Fragment>
      <Title>Shows</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Band Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Venue</TableCell>
            <TableCell>Source</TableCell>
            <TableCell align="right">Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(musicData).map((key, index) => (
            <TableRow key={key}>
              <TableCell>{musicData[key].bandName}</TableCell>
              <TableCell>{musicData[key].date}</TableCell>
              <TableCell>{musicData[key].venue}</TableCell>
              <TableCell>{musicData[key].source}</TableCell>
              <TableCell align="right">{musicData[key].notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
