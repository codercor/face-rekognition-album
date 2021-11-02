<template>
  <v-app>
    <v-sheet height="100%" class="overflow-hidden" style="position: relative">
      <v-app-bar color="white">
        <v-app-bar-nav-icon class="ml-4">
          <v-img height="50px" contain :src="require('@/assets/logo.svg')" />
        </v-app-bar-nav-icon>
        <v-app-bar-title> FaceAlbum </v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-key</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main class="fill-height main pa-5">
        <!-- Centered card  -->
        <v-container>
          <v-card class="elevation-0">
            <v-card-text class="text-xs-center">
              <div class="d-flex flex-column">
                <div class="electricity-container">
                  <div class="electricity"></div>
                  <v-img
                    class="elevation-0"
                    height="100px"
                    contain
                    :src="require('@/assets/logo.svg')"
                  />
                </div>
              </div>
              <h1 class="display-1 mb-3">FaceAlbum</h1>
              <p class="subheading grey--text">
                Basit ve kullanımı kolay bir yüz tanıma uygulamasıdır.
              </p>
            </v-card-text>

            <v-container>
              <v-row>
                <v-col md="6" offset-md="3" offset-sm="3" sm="6">
                  <h3 class="overline mb-3">
                    Etkinlik Kodunuzu Girin
                    <v-divider></v-divider>
                  </h3>
                </v-col>
              </v-row>
                <v-row>
                <v-col md="6" offset-md="3" offset-sm="3" sm="6">
                  <v-text-field dense label="Etkinlik Kodu" placeholder="ayse-emre-dugun-210121"   hint="Etkinlik Kodu" />
                </v-col>
              </v-row>
                <v-row>
                <v-col md="6" offset-md="3" offset-sm="3" sm="6">
                  <v-btn outlined color="purple white--text" width="100%" > <v-icon>mdi-face-recognition</v-icon>  <span>  Yüzümü Bul  </span> </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-container>
      </v-main>

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/79.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" },
      ],
    };
  },
};
</script>
<style>
main {
  background: url("./assets/bg.jpg") no-repeat center center fixed !important;
  background-size: cover !important;
}
.electricity-container {
  align-self: center;
  position: relative;
}
.electricity {
  position: absolute;
  border: 1px dotted red;
  background-color: red;
  width: 30%;
  box-shadow: 0px 0px 10px 2px red ;
  height: 0;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  animation: recog-animation 3s infinite alternate
    cubic-bezier(0.165, 0.84, 0.44, 1);
}
@keyframes recog-animation {
  0% {
    top: 0%;
  }
  100% {
    top: 100%;
  }
}
</style>