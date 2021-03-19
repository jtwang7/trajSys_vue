<template>
  <div id="traj-visual-box" v-show="$store.state.trajBoxShow.fulfilled">
    <InfoBoxRow>
      <template v-slot:left>
        <div class="text">轨迹索引：</div>
      </template>
      <template v-slot:right>
        <InputNumber
          :min="0"
          v-model="tid"
          @on-change="requestData(tid, $store.state.curUserid)"
        ></InputNumber>
      </template>
    </InfoBoxRow>
    <InfoBoxRow>
      <template v-slot:left>
        <Button
          type="primary"
          @click="showTraj($store.state.curUserid)"
          size="small"
          >轨迹展示</Button
        >
      </template>
      <template v-slot:right>
        <Button type="primary" @click="hiddenTraj" size="small"
          >轨迹隐藏</Button
        >
      </template>
    </InfoBoxRow>
  </div>
</template>

<script>
import InfoBoxRow from "@/components/common/InfoBoxRow";
import {
  getTraj,
  clearTraj,
  setZoom,
} from "@//components/content/map/echartsScatter";

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
    // 触发请求
    requestData(tid, userid) {
      this.$store.dispatch("reqTraj", {
        userid,
        tid,
      });
    },
    // 轨迹展示
    async showTraj(userid) {
      await getTraj(
        this.$mychart,
        this.$store.state.user[userid].data.org,
        this.$store.state.user[userid].data.dest,
        this.$store.state.user[userid].data.traj
      );
      setZoom(
        [
          this.$store.state.user[userid].data.org,
          this.$store.state.user[userid].data.dest,
        ],
        this.$gaode
      );
    },
    // 清除轨迹
    hiddenTraj() {
      clearTraj(this.$mychart);
    },
  },
};
</script>

<style>
</style>