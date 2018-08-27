<template>
  <a-locale-provider :locale="locale">
  <a-layout id="app" style="min-height: 100vh">
    <a-layout-sider
      collapsible
      v-model="collapsed"
    >
      <nl-menu></nl-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 16px" >
        <a-tag v-for="tag in openTags" closable @click="backUrl(tag.path)" @close="closeTag(tag.path, $event)" :key="tag.path">{{ tag.text }}</a-tag>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item v-for="breadcrumb in breadcrumbs" :key="breadcrumb.name"> 
            <template v-if="breadcrumb.no_breadcrumb_link">
              {{ breadcrumb.text }}
            </template>
            <template v-else>
              <router-link :to="{name: breadcrumb.name}">{{ breadcrumb.text }}</router-link>
            </template>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <!-- 子路由里面的 router-view 管不着 -->
        <keep-alive :exclude="['user-list-view']">
          <router-view></router-view>
        </keep-alive>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        power by nodelover.me
      </a-layout-footer>
    </a-layout>
  </a-layout>
  </a-locale-provider>
</template>
<script>
import NlMenu from "@/components/NlMenu.vue";
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { mapState } from "vuex";

export default {
  data() {
    return {
      collapsed: false,
      breadcrumbs: [],
      locale: zhCN,
    }
  },
  computed: mapState(['openTags']),
  components: {
    NlMenu
  },
  methods: {
    closeTag(path, e){
      e.preventDefault()
      this.$store.commit('removeTag', path);
    },
    backUrl(path){
      this.$router.push(path);
    }
  },
  watch: {
    '$route': function(newValue){
      this.breadcrumbs = newValue.matched.map(route => ({name: route.name, ...route.meta}))
    }
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
