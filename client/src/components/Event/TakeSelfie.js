import React, { useEffect, useState, useRef } from "react";

import {
  Container,
  Stack,
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@mui/material";

import { Icon } from "@mdi/react";
import { mdiCamera, mdiCloseCircle, mdiHandOkay } from "@mdi/js";
import { searchFace } from "../../features/eventSlice";

import { useDispatch } from "react-redux";

export default function TakeSelfie(props) {
  const dispatch = useDispatch();

  const videoRef = useRef(null);
  const [photo, setPhoto] = useState("");
  const [filePhoto, setFilePhoto] = useState(null);
  useEffect(() => {
    //open camera
    const video = videoRef.current;
    const constraints = {
      audio: false,
      video: {
        width: { min: 300, ideal: 300, max: 300 },
        height: { min: 300, ideal: 300, max: 300 },
      },
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  }

  const handleTakePhoto = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const data = canvas.toDataURL("image/jpg");
    setPhoto(data);
    //convert data to blob
    const blob = dataURItoBlob(data);
    setFilePhoto(blob);
  };

  const handleConfirm = () => {
    let selfie = new File([filePhoto], "selfie.jpg", { type: "image/jpeg" });
    dispatch(
      searchFace({
        selfie,
        event: props.eventName,
      })
    );
  };

  return (
    <>
      {" "}
      <Typography variant="subtitle1" color="white">
        Sizi tanımamız için bize bir selfie çekin
      </Typography>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          backdropFilter: "grayscale(70%) blur(10px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "0px",
          border: "1px red solid",
        }}
      >
        <Grid container justifyContent="center" spacing={2}>
          <Grid
            item
            style={{
              position: "relative",
            }}
            xs={12}
          >
            <video ref={videoRef}></video>
            {photo && (
              <>
                <img style={{ position: "absolute", left: 18 }} src={photo} />

                <Icon
                  style={{
                    position: "absolute",
                    right: 0,
                    cursor: "pointer",
                  }}
                  path={mdiCloseCircle}
                  onClick={() => {
                    setPhoto("");
                  }}
                  color="white"
                  size={1.2}
                />
              </>
            )}
          </Grid>
        </Grid>
      </div>
      {photo != "" ? (
        <Button
          fullWidth
          onClick={handleConfirm}
          variant="contained"
          color="success"
        >
          OK ! <Icon path={mdiHandOkay} size={1} color="white" />
        </Button>
      ) : (
        <Button
          fullWidth
          onClick={handleTakePhoto}
          variant="contained"
          sx={{ backgroundColor: "purple" }}
        >
          Selfie <Icon path={mdiCamera} size={1} color="white" />
        </Button>
      )}
    </>
  );
}
