<template>
    <div>
        <h1>user create</h1>
        <button @click="addRoute">add route</button>
    </div>
</template>

<script>
export default {
    methods: {
        addRoute(){
            const route = {
                icon: 'user',
                show: true,
                text: '测试',
                route: {name:'test', path: '/test', components: {}}
            }
            this.$store.commit('addRoute', route)
            this.$router.addRoutes([route.route])
        
        }
    }
}
</script>

