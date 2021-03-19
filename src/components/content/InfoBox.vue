<template>
  <transition name="infoAnimation">
    <div id="infobox" v-show="$store.state.infoBoxShow">
      <InfoBoxRow>
        <template v-slot:left>
          <div class="text">用户ID：</div>
        </template>
        <template v-slot:right>
          <Select
            v-model="userid"
            clearable
            style="width: 100px"
            @on-change="selectUser"
            @on-clear="clearUser"
          >
            <Option v-for="item in userList" :value="item" :key="item">{{
              item
            }}</Option>
          </Select>
        </template>
      </InfoBoxRow>
      <InfoBoxRow v-if="userid">
        <template v-slot:left>
          <div class="text">总轨迹数：</div>
        </template>
        <template v-slot:right>
          <div class="text">
            {{ userid ? $store.state.user[userid].nums : 0 }}
          </div>
        </template>
      </InfoBoxRow>
      <TrajVisualBox ref="trajBox" />
      <GlobalTrajVisualBox ref="glbTrajBox" />
    </div>
  </transition>
</template>

<script>
import InfoBoxRow from "@/components/common/InfoBoxRow";
import TrajVisualBox from "@/components/content/TrajVisualBox";
import GlobalTrajVisualBox from "@/components/content/GlobalTrajVisualBox";

export default {
  name: "InfoBox",
  components: {
    InfoBoxRow,
    TrajVisualBox,
    GlobalTrajVisualBox,
  },
  data() {
    return {
      userid: "",
      userList: Object.keys(this.$store.state.user), //Array
    };
  },
  methods: {
    // 选择用户ID
    selectUser(userid) {
      const vm = this;
      this.$store.dispatch("reqTrajNum", userid);
      // 请求第一天轨迹
      this.requestData(this.$refs.trajBox.tid, userid);
      this.requestAllData(userid);
    },
    // 清空用户时触发
    clearUser() {
      this.$store.commit("clearUser");
      this.$refs.trajBox.hiddenTraj();
      this.$refs.glbTrajBox.hiddenGLBTraj();
      this.$store.commit("clearHeatmapData");
    },
    // 触发单条轨迹请求
    requestData(tid, userid) {
      this.$store.dispatch("reqTraj", {
        userid,
        tid,
      });
    },
    // 触发全局轨迹请求
    requestAllData(userid) {
      this.$store.dispatch("reqGlobalTraj", userid);
    },
    // 请求按月/周划分的数据(用于热力图展示)
    reqDataforHeatmap(userid, vm) {
      this.$store.dispatch("reqDataforHeatmap", { userid, vm });
    },
  },
  watch: {
    // 监听userid值
    userid: function (newValue) {
      this.$store.commit("watchUserid", newValue);
    },
  },
};
</script>

<style>
#infobox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: fixed;
  bottom: 20px;
  left: 15px;
  z-index: 999;

  color: white;
}

#infobox .infobox-row {
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-bottom: 10px;
  height: 32px;
  line-height: 32px; /* line-height==height：文字垂直居中 */
}

#infobox .infobox-row .ivu-input-number-default {
  width: 70px;
  font-weight: bolder;
}

#infobox .ivu-divider-with-text {
  margin-top: 0;
  color: #f2f2f2;
}

.infoAnimation-enter-active,
.infoAnimation-leave-active {
  transition: opacity 1s;
}
.infoAnimation-enter, .infoAnimation-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.text {
  background-color: #515a6e;
  border-radius: 4px;
  margin: 0 3px;
  padding: 0 4px;
}
</style>