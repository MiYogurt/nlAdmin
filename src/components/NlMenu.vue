<template>
    <div>
      <div class="logo" />
      <a-menu theme="dark" :defaultSelectedKeys="['home']" v-model="selectKeys" mode="inline" @click="handleClick">
        <template v-for="item in menus">
          <a-sub-menu
            :key="item.route.name"
            v-if="item.route.children && item.show"
          >
            <span slot="title">
              <a-icon :type="item.icon" />
              <span v-text="item.text"></span>
            </span>
            <a-menu-item v-for="submenu in item.route.children" :key="submenu.name" v-if="submenu.show">{{ submenu.text }}</a-menu-item>
          </a-sub-menu>
          <a-menu-item 
            :key="item.route.name" 
            v-if="item.show && !item.route.children"
          >
            <a-icon :type="item.icon" />
            <span v-text="item.text"></span>
          </a-menu-item>
        </template>
      </a-menu>
    </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  data(){
    return {
      selectKeys: []
    };
  },
  computed: mapState(['menus']),
  mounted(){
    window.resetSelectKeys = () => {
      setTimeout(() => {
        this.selectKeys = []
      }, 1);
    }
  },
  methods: {
    handleClick(e) {
      console.log('click', e);
      this.$router.push({name: e.key});
    }
  },
}
</script>
