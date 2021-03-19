<template>
  <div id="sider">
    <Menu
      :theme="theme"
      :open-names="['1']"
      accordion
      width="200px"
      @on-select="menuSelect"
    >
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-paper" />
          地图服务
        </template>
        <MenuItem name="1-1">用户信息</MenuItem>
        <MenuItem name="1-2">轨迹展示</MenuItem>
        <MenuItem name="1-3">全局轨迹展示</MenuItem>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-people" />
          用户管理
        </template>
        <MenuItem name="2-1">新增用户</MenuItem>
        <MenuItem name="2-2">活跃用户</MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-stats" />
          统计分析
        </template>
        <MenuGroup title="使用">
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="留存">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
export default {
  name: "PageSider",
  props: {
    theme: {
      type: String,
      default: "light",
    },
  },
  methods: {
    menuSelect(name) {
      this.$store.commit("menuSelect", name);
    },
  },
};
</script>

<style>
#sider {
  position: fixed;
  left: 0;

  padding-top: 70px;
  height: 100vh;
  z-index: 900;

  background-color: #515a6e;
}
</style>