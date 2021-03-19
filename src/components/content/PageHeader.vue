<template>
  <Header :imgUrl="imgUrl" text="私家车出行目的地预测系统">
    <template v-slot:header-tabs>
      <RadioGroup v-model="curSelect" type="button" button-style="solid">
        <Radio label="model1"></Radio>
        <Radio label="model2"></Radio>
        <Radio label="model3"></Radio>
      </RadioGroup>
    </template>
    <template v-slot:header-dropdown>
      <Dropdown @on-click="select">
        <Button type="primary">
          Style
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="0">侧边栏样式</DropdownItem>
          <DropdownItem name="1" divided>高德地图</DropdownItem>
          <DropdownItem name="2">MapBox</DropdownItem>
          <DropdownItem name="3" divided>444</DropdownItem>
          <DropdownItem name="4">555</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </template>
  </Header>
</template>

<script>
import Header from "@/components/common/Header";
const imgUrl = require("@/assets/gps.png");

export default {
  name: "PageHeader",
  data() {
    return {
      imgUrl,
      curSelect: "model1",
    };
  },
  components: {
    Header,
  },
  methods: {
      select(id) {
          this.$store.commit('select',id);
      }
  },
};
</script>

<style>
#header .ivu-dropdown {
  padding-right: 20px;
}
</style>