<template>
  <transition name="box">
    <div id="pop-ups" v-show="$store.state.heatmapPopups">
      <div id="pop-ups-content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Popups",
};
</script>

<style>
#pop-ups {
  position: fixed;
  bottom: 0;
  right: 0.9%;

  /* 设置固定长宽比 */
  /* 包裹内容用 absolute 设置 */
  width: 32%;
  height: 0;
  padding-top: 20%;

  background-color: white;
  border: 1px solid gray;

  z-index: 9999;
}

#pop-ups-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.box-enter-active,
.box-leave-active {
  transition: opacity 1s;
}
.box-enter, .box-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>