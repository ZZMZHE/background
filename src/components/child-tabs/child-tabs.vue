<template>
    <div class="child-tabs">
        <div class="wrapper">
            <router-link
                class="tab-item"
                :class="{active: item.routePath.split('?')[0] === activeRoutePath}"
                v-for="(item, index) in tabsList"
                :key="index"
                :to="item.routePath"
                @click.native="onChildTab(item.tab)">{{item.tab}}
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'child-tabs',
    props: {
        tabsList: {
            type: Array,
            default() {
                return [{ // 例子
                    tab: '标签名', // 标签名
                    routePath: '/background/home/data' // 路由
                }]
            }
        }
    },
    data() {
        return {
            activeRoutePath: ''
        }
    },
    created() {
        this.initParams()
    },
    methods: {
        initParams() {
            this.activeRoutePath = this.$route.matched[2].path
        },
        onChildTab(currentTab) {
            this.$emit('tabChange', currentTab)
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
    .child-tabs
        position: fixed
        top: 60px
        left: 180px
        height: calc(100% - 80px)
        width: 125px
        border-right: 2px solid #E5E5E5
        border-bottom: 2px solid #E5E5E5
        background-color: #F2F2F2
        box-sizing: border-box
        z-index: 999
        overflow: auto
        .wrapper
            display: flex
            flex-direction: column
            .tab-item
                height: 60px
                line-height: 60px
                text-align: center
                color: $color-medium-black
                cursor pointer
                transition: all 0.3s
                &.active
                    background: #fff
                    color: $color-blue
                &:hover
                    background: #fff
</style>
