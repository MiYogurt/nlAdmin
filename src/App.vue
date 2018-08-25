<template>
  <a-layout id="app" style="min-height: 100vh">
    <a-layout-sider
      collapsible
      v-model="collapsed"
    >
      <nl-menu></nl-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        power by nodelover.me
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import NlMenu from "@/components/NlMenu.vue";
export default {
  data() {
    return {
      collapsed: false,
    }
  },
  components: {
    NlMenu
  }
}
</script>

<style>
#app .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
</style>
