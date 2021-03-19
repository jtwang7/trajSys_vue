<template>
  <div id="traj-visual-box" v-show="$store.state.glbTrajBoxShow.fulfilled">
    <InfoBoxRow>
      <template v-slot:left>
        <Button type="primary" @click="showGLBTraj" size="small"
          >全局展示</Button
        >
      </template>
      <template v-slot:right>
        <Button type="primary" @click="hiddenGLBTraj" size="small"
          >全局隐藏</Button
        >
      </template>
    </InfoBoxRow>
  </div>
</template>

<script>
import InfoBoxRow from "@/components/common/InfoBoxRow";

export default {
  name: "TrajVisualBox",
  components: {
    InfoBoxRow,
  },
  data() {
    return {
      tid: 0,
    };
  },
  methods: {
    // 轨迹展示
    showGLBTraj() {
      const chart = this.$mychart;
      let option = chart.getOption();
      option.series[2].data = this.$store.state.globalTrajList;
      option.series[3].data = this.$store.state.globalTrajList;
      chart.setOption(option);
    },
    // 清除轨迹
    hiddenGLBTraj() {
      const chart = this.$mychart;
      let option = chart.getOption();
      option.series[2].data = [];
      option.series[3].data = [];
      chart.setOption(option);
    },
  },
};
</script>

<style>
</style>