<template>
  <div id="header">
    <div class="header-title">
      <img :src="imgUrl" alt="" />
      <span class="header-title-text">{{ text }}</span>
    </div>
    <div class="header-slot">
      <slot name="header-dropdown"></slot>
      <slot name="header-tabs"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    imgUrl: String,
    text: {
      type: String,
      default: "轨迹目的地预测系统",
    },
  },
};
</script>

<style>
#header {
  display: flex;
  justify-content: space-between;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;

  width: 100vw;
  height: 70px;
  padding: 10px 40px;

  background-color: rgb(60, 85, 95);
  text-align: center;
}

#header .header-title-text {
  color: #f2f2f2;
  font-weight: bold;
  font-size: 1.5em;
  margin-left: 10px;
}

#header .header-title img {
  height: 60%;
}

.header-title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 50px;
}

#header .header-slot {
  display: flex;
  align-items: center;
}
</style>