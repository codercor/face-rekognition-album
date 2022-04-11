import { Lock } from "@mui/icons-material";
import {
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React from "react";

import {fetchAvailableEvents,setSelectedEvent} from '../../features/uploaderSlice'
import { useDispatch,useSelector } from "react-redux";

export default function Home() {
  const [eventCodeTyped, setEventCodeTyped] = React.useState("");
  const handleEventCodeTyped = (event) => {
    setEventCodeTyped(event.target.value);
  };

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAvailableEvents())
  },[]);

  const availableEvents = useSelector(state => state.uploader.availableEvents.map(event => event.name));
  // availableEvents comes from the server for admin's events
  

  const [eventTips, setEventTips] = React.useState([]);

  React.useEffect(() => {
    if (!eventCodeTyped) setEventTips([]);
    else if (availableEvents.includes(eventCodeTyped)) setEventTips([]);
    else if (eventCodeTyped)
      setEventTips(
        availableEvents.filter((event) => event.startsWith(eventCodeTyped))
      );
  }, [eventCodeTyped]);

  const handleLockAndSelect = ()=>{
    dispatch(setSelectedEvent(eventCodeTyped))
  }

  const EventNameTip = ({ eventName }) => (
    <Box
      sx={{
        width: "100%",
        background: "rgba(255,255,255,1)",
        marginBottom: "2px",
        "&:hover": {
          background: "rgba(240,240,240,0.7)",
        },
        p: "5px",
      }}
      onClick={() => {
        setEventCodeTyped(eventName);
      }}
    >
      <Typography variant="caption"> {eventName} </Typography>
    </Box>
  );
  return (
          <Box
            sx={{
              width: "90%",
              height: "100px",
              background: "rgba(255,255,255,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              borderRadius: "4px",
              padding: "0px 16px",
            }}
          >
            <Typography variant="h5">Etkinlik kodunu girin</Typography>
            <div style={{ position: "relative" }}>
              <TextField
                value={eventCodeTyped}
                onChange={handleEventCodeTyped}
                placeholder="cenga-bulusma"
                autoComplete="off"
              />
              {eventTips.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    cursor: "pointer",
                    background: "rgba(255,255,255,0.7)",
                    width: "100%",
                    height: "auto",
                    overflow: "auto",
                  }}
                >
                  {eventTips.map((eventName) => (
                    <EventNameTip eventName={eventName} key={eventName} />
                  ))}
                </div>
              )}
            </div>
            <Button sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
            onClick={handleLockAndSelect}
             
             color="error" variant="contained"
             disabled={!availableEvents.includes(eventCodeTyped)}
            > 
                <Lock />
                <Typography variant="overline">Kilitle ve seç</Typography>
            </Button>
          </Box>
  );
}
