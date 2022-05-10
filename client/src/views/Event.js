import React, { useState, useEffect, useMemo } from "react";
import {
  Grid,
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Stack,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getEvent, reset } from "../features/eventSlice";
import TakeSelfie from "../components/Event/TakeSelfie";
import Loading from "../components/Event/Loading";
import Photos from "../components/Event/Photos";
import { baseURL } from "../services/axios";

import homeBg from "../assets/home-bg.svg";
import EventPopup from "../components/Event/EventPopup";
import { useNavigate } from "react-router-dom";

export default function Event() {
  const { event } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };

  const eventData = useSelector((state) => state.event);

  const EventNotFoundPopUp = (props) => (
    <EventPopup {...props}>
      <Typography variant="h5">{props.message}</Typography>
    </EventPopup>
  );

  useEffect(() => {
    console.log("eventData", eventData);
    if (eventData.error) {
      setOpen(true);
      let timer = setTimeout(() => {
        dispatch(reset());
      }, 3000);
      return () => {
        clearTimeout(timer);
        navigate(-1);
      };
    }
  }, [eventData.error]);

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
      dispatch(getEvent(event));
  }, [event]);

  useEffect(() => {}, [eventData]);

  return eventData.isLoading ? (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: `url(${homeBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {" "}
      <Loading />{" "}
    </Container>
  ) : (
    <Container
      maxWidth="md"
      sx={{
        background: `url('${baseURL}/public/backgrounds/${eventData.eventBackgroud}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {eventData.error ? (
        <EventNotFoundPopUp
          open={open}
          message={eventData.error}
          handleClose={handleClose}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            background: "rgba(0,0,0,0.5)",
            color: "white",
            width: {
              xs: "100vw",
              md: "50%",
            },
            height: {
              xs: "50vh",
              md: "60%",
            },
          }}
        >
          {eventData.isLoading ? (
            <Loading />
          ) : eventData.photos.length < 1 ? (
            <div
              style={{
                width: "300px",
                height: "300px",
                padding: "0",
                margin: "0",
              }}
            >
              <TakeSelfie eventName={eventData.eventName} />
            </div>
          ) : (
            <Stack
              sx={{
                width: "100vw",
                height: "100vh",
              }}
            >
              <Photos isPaid={eventData.isPaid} photos={eventData.photos} />
            </Stack>
          )}
        </Box>
      )}
    </Container>
  );
}
