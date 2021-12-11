<template>
  <v-app>
    <v-sheet height="100%" class="overflow-hidden" style="position: relative">
      <v-app-bar color="white">
        <v-app-bar-nav-icon to="/" class="ml-4">
          <v-img height="50px" contain :src="require('@/assets/logo.svg')" />
        </v-app-bar-nav-icon>
        <v-app-bar-title to="/" > FaceAlbum </v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-key</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main class="fill-height main pa-5">
        <!-- Centered card  -->
        <router-view></router-view>
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
  animation: recog-animation 3s infinite alternate ease-in-out;
}
@keyframes recog-animation {
  0% {
    top: 0%;
  }
  100% {
    top: 98%;
  }
}
</style>