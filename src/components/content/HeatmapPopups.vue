<template>
  <Popups>
    <div id="main-popups"></div>
  </Popups>
</template>

<script>
import * as echarts from "echarts";
import Popups from "@/components/common/Popups";
import Vue from 'vue'

export default {
  name: "HeatmapPopups",
  components: {
    Popups,
  },
  methods: {
    initPopups() {
      let myChart = echarts.init(document.getElementById("main-popups"));
      Vue.prototype.$heatmap = myChart;

      // myChart.setOption({
      //   title: {
      //     text: "",
      //     left: "1%",
      //   },
      //   tooltip: {
      //     trigger: "axis",
      //   },
      //   grid: {
      //     left: "10%",
      //     right: "30%",
      //     bottom: "13%",
      //   },
      //   xAxis: {
      //     data: [],
      //   },
      //   yAxis: {},
      //   toolbox: {
      //     right: 10,
      //     feature: {
      //       dataZoom: {
      //         yAxisIndex: "none",
      //       },
      //       restore: {},
      //       saveAsImage: {},
      //     },
      //   },
      //   visualMap: {
      //     top: 50,
      //     right: 10,
      //     pieces: [
      //       {
      //         gt: 0,
      //         lte: 50,
      //         color: "#93CE07",
      //       },
      //       {
      //         gt: 50,
      //         lte: 100,
      //         color: "#FBDB0F",
      //       },
      //       {
      //         gt: 100,
      //         lte: 150,
      //         color: "#FC7D02",
      //       },
      //       {
      //         gt: 150,
      //         lte: 200,
      //         color: "#FD0100",
      //       },
      //       {
      //         gt: 200,
      //         lte: 300,
      //         color: "#AA069F",
      //       },
      //       {
      //         gt: 300,
      //         color: "#AC3B2A",
      //       },
      //     ],
      //     outOfRange: {
      //       color: "#999",
      //     },
      //   },
      //   series: {
      //     type: "line",
      //     data: [],
      //     markLine: {
      //       silent: true,
      //       lineStyle: {
      //         color: "#333",
      //       },
      //       data: [
      //         {
      //           yAxis: 50,
      //         },
      //         {
      //           yAxis: 100,
      //         },
      //         {
      //           yAxis: 150,
      //         },
      //         {
      //           yAxis: 200,
      //         },
      //         {
      //           yAxis: 300,
      //         },
      //       ],
      //     },
      //   },
      // });
    },
  },
  mounted() {
    this.initPopups();
  },
};
</script>

<style>
#main-popups {
  width: 100%;
  height: 100%;
}
</style>