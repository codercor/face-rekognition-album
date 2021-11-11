<template>
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
                  <v-text-field v-model="eventCode" dense label="Etkinlik Kodu" placeholder="ayse-emre-dugun-210121"   hint="Etkinlik Kodu" />
                </v-col>
              </v-row>
                <v-row>
                <v-col md="6" offset-md="3" offset-sm="3" sm="6">
                  <v-btn :to="`/${eventCode}`" outlined color="purple white--text" width="100%" > <v-icon>mdi-face-recognition</v-icon>  <span>  Yüzümü Bul  </span> </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-container>
</template>
<script>
export default {
    data() {
        return {
            eventCode: '',
        }
    },
}
</script>