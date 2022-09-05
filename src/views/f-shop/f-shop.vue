<template>
    <div class="f-shop">
        <div class="content">
            <transition name="route-fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    name: 'f-shop',
    components: {

    },
    data() {
        return {}
    },
    created() {},
    // beforeRouteEnter (to, from, next) {
    //     let permission = JSON.parse(sessionStorage.getItem('permissionList'))
    //     let tabsList = [{
    //         id: 17,
    //         tab: '商品管理',
    //         routePath: '/background/shop/goods?idp=17'
    //     }, {
    //         id: 18,
    //         tab: '奖品订单管理',
    //         routePath: '/background/shop/order?idp=18'
    //     }, {
    //         id: 19,
    //         tab: '退款退货订单',
    //         routePath: '/background/shop/refund?idp=19'
    //     }]
    //     let power = []
    //     tabsList.forEach(ele => {
    //         permission.forEach(eles => {
    //             if (ele.tab === eles.permission) {
    //                 power.push(ele)
    //             }
    //         })
    //     })
    //     let idp = to.query.idp
    //     let res = permission.some(elem => {
    //         return parseInt(elem.id) === parseInt(idp)
    //     })
    //     if (res) {
    //         next()
    //     } else {
    //         next({ path: power[0].routePath })
    //     }
    // },
    methods: {

    },
    computed: {

    },
    watch: {

    }
}
</script>

<style lang="stylus" scoped>
    .route-fade-enter, .route-fade-leave-to
        opacity: 0
    .route-fade-enter-active, .route-fade-leave-active
        transition: all 0.3s
</style>
