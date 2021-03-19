<template>
  <div id="mapbox"></div>
</template>

<script>
import Vue from "vue";

export default {
  name: "Mapbox",
  methods: {
    initMap() {
      let mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

      mapboxgl.accessToken =
        "pk.eyJ1Ijoid2p0IiwiYSI6ImNrbTVsZDVuejBmZ3gyd3FzMTVtYXRsamQifQ.2sg9YodVp8Aj7BpXV2KKiA";
      let map = new mapboxgl.Map({
        container: "mapbox",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [116.397428, 39.90923],
        zoom: 11,
      });
      Vue.prototype.$mapbox = { map, mapboxgl };
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style>
#mapbox {
  height: 98%;
  width: 98%;

  border: 3px solid #f2f2f2;
}
</style>