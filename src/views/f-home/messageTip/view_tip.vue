<template>
    <div class="view_tip">
        <div class="content">
            <transition name="route-fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    name: 'view_tip',
    components: {

    },
    data() {
        return {

        }
    },
    created() {

    },

    methods: {
        initParams() {

        }
    },
    computed: {
        breadList() {
            return this.$route.meta
        }
    },
    watch: {
        $route() {
            this.initParams()
        }
    }
}
</script>

<style lang="stylus" scoped>
    .route-fade-enter, .route-fade-leave-to
        opacity: 0
    .route-fade-enter-active, .route-fade-leave-active
        transition: all 0.3s
</style>
