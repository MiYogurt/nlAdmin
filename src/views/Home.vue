<template>
  <div>
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
  },
}
</script>
