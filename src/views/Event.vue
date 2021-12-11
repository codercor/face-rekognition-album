<template>
  <v-container>
    <v-card class="elevation-0">
      <v-card-text class="text-xs-center">
        <div class="d-flex flex-column"></div>
        <p class="subheading grey--text">
          Yüzünün resmini çek ve etkinlikte çekilen fotoğraflarını gör
        </p>
      </v-card-text>
      <div style="text-align: center; position: relative">
        <video style="width: 300px" autoplay ref="cameraVideo"></video>
        <v-btn
          v-if="!taked"
          @click="takePhoto"
          style="
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 99;
          "
          icon
        >
          <v-icon color="white">mdi-camera</v-icon>
        </v-btn>
        <div class="electricity electricity-for-camera"></div>
        <canvas
          ref="photoCanvas"
          style="
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
            top: 48%;
            height: 100%;
            width: 300px;
          "
        ></canvas>
        <v-btn
          v-if="taked"
          @click="cancelPhoto"
          style="
            position: absolute;
            top: 5%;
            left: 80%;
            transform: translate(-50%, -50%);
            z-index: 99;
          "
          icon
        >
          <v-icon color="white"> mdi-close </v-icon>
        </v-btn>
      </div>
      <v-container>
        <v-row>
          <v-col md="6" offset-md="3" offset-sm="3" sm="6">
            <v-btn
              @click="findMyFace"
              outlined
              color="purple white--text"
              width="100%"
            >
              <v-icon>mdi-face-recognition</v-icon> <span> Yüzümü Bul </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  beforeMount() {
    this.getEventData();
  },
  mounted() {
    this.openCamera();
  },
  data() {
    return {
      eventCode: "",
      taked: false,
      imageBase64: null,
      results: [],
    };
  },
  methods: {
    ...mapActions("event",['setImageBase64']),
    getEventCode() {
      this.eventCode = this.$route.params.eventCode;
    },
    getEventData() {
      this.getEventCode();
      //TODO : get event data from API
    },
    openCamera() {
      const video = this.$refs.cameraVideo;
      const constraints = {
        audio: false,
        video: {
          width: 380,
          height: 400,
        },
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          video.srcObject = stream;
          video.src = stream;
          video.play();
        })
        .catch(function (err) {
          console.log(err.name + ": " + err.message);
        });
    },
    takePhoto() {
      const video = this.$refs.cameraVideo;
      const canvas = this.$refs.photoCanvas;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      let data = canvas.toDataURL("image/png");
      this.taked = true;
      this.imageBase64 = data;
    },
    cancelPhoto() {
      this.taked = false;
      const video = this.$refs.cameraVideo;
      const canvas = this.$refs.photoCanvas;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      video.play();
    },
    findMyFace() {
      this.imageBase64 = this.imageBase64.replace(
        /^data:image\/(png|jpg);base64,/,
        ""
      );
      this.setImageBase64(this.imageBase64);
      this.$router.push("/results");
    }
    
  },
  watch: {
    $route() {
      this.getEventData();
    },
  },
};
</script>
<style>
.electricity-for-camera {
  width: 270px;
}
</style>