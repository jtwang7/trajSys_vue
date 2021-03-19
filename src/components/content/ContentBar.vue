<template>
  <FeatureBar>
    <template v-slot:left>
      <div id="heatmap-controller">
        <div class="front-title-style">热力图展示</div>
        <RadioGroup v-model="type">
          <Radio
            label="按月统计"
            :disabled="!$store.state.isSelectUser"
          ></Radio>
          <Radio
            label="按周统计"
            :disabled="!$store.state.isSelectUser"
          ></Radio>
        </RadioGroup>
        <i-switch
          class="last-style"
          @on-change="btnclick"
          :disabled="btnForbid"
          :loading="btnLoading"
        >
          <Icon type="md-checkmark" slot="open"></Icon>
          <Icon type="md-close" slot="close"></Icon>
        </i-switch>
      </div>
    </template>
  </FeatureBar>
</template>

<script>
import FeatureBar from "@/components/common/FeatureBar";
import {
  funcHMbymonth,
  funcHMbyday,
  clearHeatmap,
  dymRenderMonth,
  dymRenderDay,
} from "@/components/content/map/heatmap";

import { reqMonthDayData } from "@/network/request";

export default {
  name: "ContentBar",
  data() {
    return {
      type: "按月统计",
      timer: Object, //可随意初始化类型，因为js没有严格类型
      heatmapTimer: Object,
      monthTexts: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      weekTexts: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],

      btnForbid: false,
      btnLoading: false,
      month: [],
      day: [],
      lastUserid: "",
    };
  },
  components: {
    FeatureBar,
  },
  //   getters: {
  //     isclose() {
  //       // 无法在组件配置内监听和响应 store 内状态变化
  //       // 直接在 template 使用 store 内变量，可以实现响应式
  //       if (this.$store.state.isSelectUser) {
  //         this.isclose = false;
  //       } else {
  //         this.isclose = true;
  //       }
  //     },
  //   },
  methods: {
    // 请求热力图数据
    reqHeatmapData() {
      // 开关禁用，显示加载
      this.btnForbid = true;
      this.btnLoading = true;
      const res = reqMonthDayData(this.$store.state.curUserid);
      return res;
    },
    async btnclick(curBool) {
      if (curBool) {
        // 若历史缓存用户ID与当前选择ID不匹配，则清空历史缓存，并更新ID
        if (this.lastUserid !== this.$store.state.curUserid) {
          this.month = [];
          this.day = [];
          this.lastUserid = this.$store.state.curUserid;
        }
        // 若未缓存，则请求
        if (!this.month.length) {
          // 异步请求，等待...
          const [month, day] = await this.reqHeatmapData();
          this.month = month;
          this.day = day;
        }
        // 若缓存则直接展示
        const staInfoMonth = this.month.map((val) => {
          return val.length;
        });
        const staInfoDay = this.day.map((val) => {
          return val.length;
        });
        this.$Message.info("heatmap数据请求成功！服务开启");
        // 请求完成，开关开放
        this.btnForbid = false;
        this.btnLoading = false;
        // 展示数据
        if (this.type === "按月统计") {
          this.timer = funcHMbymonth(this.$mychart, this.month);
          this.heatmapTimer = dymRenderMonth(
            this.$heatmap,
            staInfoMonth,
            this.monthTexts
          );
        } else {
          this.timer = funcHMbyday(this.$mychart, this.day);
          this.heatmapTimer = dymRenderDay(
            this.$heatmap,
            staInfoDay,
            this.weekTexts
          );
        }
        this.$store.commit("showHeatmapPopups");
      } else {
        // 关闭展示，清除定时器
        // 切换用户或取消用户选择时清除缓存
        if (this.timer) {
          clearInterval(this.timer);
          clearHeatmap(this.$mychart);
        }
        if (this.heatmapTimer) {
          clearInterval(this.heatmapTimer);
        }
        this.$store.commit("hidHeatmapPopups");
      }
    },
  },
};
</script>

<style>
.front-title-style {
  margin-right: 10px;
  font-weight: bolder;
  font-size: 1.2em;
}

.last-style {
  margin-left: 10px;
}

#heatmap-controller {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>