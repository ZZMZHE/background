<template>
    <div class="f-home">
        <!-- <child-head :breadList="breadList"></child-head> -->
        <!-- <child-tabs :tabsList="tabsList"></child-tabs> -->
        <div class="content">
            <transition name="route-fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    name: 'f-home',
    components: {
        // childHead: () => import('components/child-head/child-head.vue'),
        // childTabs: () => import('components/child-tabs/child-tabs.vue')
    },
    data() {
        return {
            tabsList: [{
                id: 1,
                tab: '统计模块',
                routePath: '/background/home/statistics?idp=1'
            }, {
                id: 2,
                tab: '消息提示板块',
                routePath: '/background/home/messageTip?idp=2'
            }]
        }
    },
    created() {
        // this.initParams()
        // let permission = JSON.parse(sessionStorage.getItem('permissionList'))
        // let prower = []
        // if (this.$store.state.account.length !== 0) {
        //     this.tabsList.forEach(ele => {
        //         // console.log(ele)
        //         this.$store.state.account.forEach(eles => {
        //             if (ele.tab === eles.permission) {
        //                 prower.push(ele)
        //             }
        //         })
        //     })
        // } else {
        //     this.tabsList.forEach(ele => {
        //         permission.forEach(eles => {
        //             if (ele.tab === eles.permission) {
        //                 prower.push(ele)
        //             }
        //         })
        //     })
        // }
        // this.tabsList = prower
    },
    // beforeRouteEnter (to, from, next) {
    //     let permission = JSON.parse(sessionStorage.getItem('permissionList'))
    //     let tabsList = [{
    //         id: 1,
    //         tab: '用户增长',
    //         routePath: '/background/home/homeData?idp=1'
    //     }, {
    //         id: 2,
    //         tab: '用户管理',
    //         routePath: '/background/home/userData?idp=2'
    //     }, {
    //         id: 3,
    //         tab: '训练汇总',
    //         routePath: '/background/home/drill?idp=3'
    //     }]
    //     let power = []
    //     if (permission) {
    //         tabsList.forEach(ele => {
    //             permission.forEach(eles => {
    //                 if (ele.tab === eles.permission) {
    //                     power.push(ele)
    //                 }
    //             })
    //         })
    //         let idp = to.query.idp
    //         let res = permission.some(elem => {
    //             return parseInt(elem.id) === parseInt(idp)
    //         })
    //         if (res) {
    //             next()
    //         } else {
    //             next({ path: power[0].routePath })
    //         }
    //     }
    // },
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
