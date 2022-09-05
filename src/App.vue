<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <div class="foot">
            <div class="help">
                <span style="margin: 0">帮助</span>
                <span>隐私</span>
                <span>条款</span>
            </div>
            <div class="copy">copyrigh©2020 杭州冉道网络出品</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    components: {

    }
}
</script>

<style lang="stylus">
    #app
        background #fff
    .foot
        margin-left 160px
        height 103px
        background #FAFAFA
        text-align center
        color #707070
        font-size 14px
        .help
            padding-top 30px
            span
                margin-left 40px
        .copy
            padding 15px 0 20px 0
    .fade-enter, .fade-leave-to
        opacity: 0
    .fade-enter-active, .fade-leave-active
        transition: all 0.3s
</style>
