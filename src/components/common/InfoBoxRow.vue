<template>
  <div class="infobox-row">
    <slot name="left"></slot>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.infobox-row {
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-bottom: 10px;
  height: 32px;
  line-height: 32px; /* line-height==height：文字垂直居中 */
}
</style>