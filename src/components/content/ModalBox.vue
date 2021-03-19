<template>
  <Modal
    :value="$store.state.modalBox"
    title="警 告！"
    @on-ok="ok"
    @on-cancel="ok"
  >
    <p>您没有选择用户</p>
    <p>请按照以下步骤进行操作：</p>
    <p>地图服务 -> 用户信息 -> 选择用户ID -> 轨迹展示/全局轨迹展示</p>
  </Modal>
</template>

<script>
export default {
  name: "ModalBox",
  methods: {
    ok() {
      this.$Message.info("祝您使用愉快");
      this.$store.commit("modalClick");
    },
  },
};
</script>

<style>
</style>