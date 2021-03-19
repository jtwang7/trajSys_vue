<template>
  <div id="feature-bar">
      <slot name="left"></slot>
      <slot name="center"></slot>
      <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name:'FeatureBar'
}
</script>

<style>
#feature-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;

    height: 50px;
    width: 98%;
    margin: 3px 0;

    background-color: beige;
    border-color: 1px solid bisque;
    box-shadow: 1px 2px #b6b3b3;
}
</style>