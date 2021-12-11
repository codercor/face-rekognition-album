<template>
  <v-container>
    <v-card class="elevation-0">
      <v-row>
        <v-col v-for="image in results" :key="image" cols="3">
          <v-img heigth="100px" :src="'https://face-album-bucket.s3.amazonaws.com/'+image"></v-img>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
export default {
  async beforeMount() {
    await this.getResults();
  },
  computed: {
    ...mapGetters("event",[
      "results"
    ]),
  },
  mounted() {
    console.log(this.results);
  },
  methods: {
    ...mapActions("event",[
      "getResults"
    ])
  },
};
</script>

<style>
</style>