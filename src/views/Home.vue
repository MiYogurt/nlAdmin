<template>
  <div>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>User</a-breadcrumb-item>
      <a-breadcrumb-item>Bill</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="home" :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
      <div>
        Bill is a cat.
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
