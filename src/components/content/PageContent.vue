<template>
  <div id="content">
    <slot name="content-bar"></slot>
    <slot name="content-map"></slot>
  </div>
</template>

<script>
export default {
  name: "PageContent",
};
</script>

<style>
#content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  position: fixed;
  right: 0;
  bottom: 0;

  padding-top: 70px;
  padding-left: 200px;
  width: 100vw;
  height: 100vh;

  background-color: rgb(226, 226, 226);
}
</style>