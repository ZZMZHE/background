<template>
    <div class="f-background">
        <div class="header">
            <f-header></f-header>
        </div>
        <div class="aside">
            <f-aside></f-aside>
        </div>
        <div class="container">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
  </div>
</template>

<script>
// import store from '@/store'
export default {
    name: 'f-background',
    components: {
        fHeader: () => import('components/f-header/f-header.vue'),
        fAside: () => import('components/f-aside/f-aside.vue')
    },
    data() {
        return {}
    },
    methods: {

    }
    // beforeRouteEnter(to, from, next) {
    //     let signStatus = store.state.signStatus || sessionStorage.getItem('signStatus')
    //     if (!signStatus) {
    //         next('/login')
    //     } else {
    //         next()
    //     }
    // },
    // beforeRouteUpdate(to, from, next) {
    //     let signStatus = this.$store.state.signStatus || sessionStorage.getItem('signStatus')
    //     if (!signStatus) {
    //         next('/login')
    //     } else {
    //         next()
    //     }
    // }
}
</script>
<style lang="stylus">
    .el-pagination.is-background .el-pager li:not(.disabled).active
        background-color #222222
        color #FFF
    // .el-pagination.is-background .el-pager li:hover
    //     color: #222222 !important
</style>
<style lang="stylus" scoped>
    .f-background
        .header
            position: fixed
            display: flex
            top: 0
            left: 0
            height: 60px
            background: $color-background
            width: 100%
            box-sizing: border-box
            z-index: 999
        .aside
            position: fixed
            left: 0
            top: 60px
            background: $color-background
            height: calc(100% - 80px)
            overflow auto
            width: 240px
            z-index: 999
        .container
            margin: 60px 0px 0px 240px
            max-width: 1680px
            overflow hidden
            box-sizing: border-box
            background #fafafa
            min-height 747px
            .fade-enter, .fade-leave-to
                opacity: 0
            .fade-enter-active, .fade-leave-active
                transition: all 0.3s
</style>
