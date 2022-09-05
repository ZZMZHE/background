<template>
    <div class="f-aside">
        <!-- <el-menu
            :router="true"
            :default-active="activeRoute"
            @open="handleOpen"
            @close="handleClose"
            background-color="#07111B"
            text-color="#ffffff"
            active-text-color="#ffffff">
            <el-menu-item v-for="(item, i) in menuList" :index="'/background/'+item.route" :key="i">
                <i :class="item.icon ? item.icon : 'el-icon-menu'"></i>
                <span slot="title">{{item.title}}</span>
            </el-menu-item>
        </el-menu> -->

        <!-- unique-opened 打开一个子菜单 -->
        <el-menu
            :router="true"
            :default-active="activeRoute"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#07111B"
            text-color="#ffffff"
            active-text-color="#ffffff"
            @select="handleSelect">
            <el-submenu v-for="(item, i) in menuList" :index="i+''" :key="i" style="width:220px">
                <span slot="title">{{item.name}}</span>
                <el-menu-item v-for="(cItem, cIndex) in item.child" :key="cIndex" :index="'/background/'+cItem.uri" style="width: 220px;">
                    <span slot="title">{{cItem.name}}</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
// import { adminInfo } from 'api/index.js'
export default {
    name: 'f-aside',
    data() {
        return {
            activeRoute: '', // 当前激活的路由显示
            menuList: []
            // menuList: [{
            //     title: '首页',
            //     route: 'home',
            //     child: [
            //         {
            //             cTitle: '统计模块',
            //             router: 'home/view_count'
            //         }, {
            //             cTitle: '消息提示',
            //             router: 'home/view_tip'
            //         }
            //     ]
            // }, {
            //     title: '用户管理',
            //     route: 'user',
            //     child: [
            //         {
            //             cTitle: '用户列表',
            //             router: 'user/view_user'
            //         },
            //          {
            //             cTitle: '线下学员',
            //             router: 'user/view_student'
            //         }
            //     ]
            // }, {
            //     title: '老师管理',
            //     route: 'teacher',
            //     child: [
            //         {
            //             cTitle: '老师列表',
            //             router: 'teacher/view_teacher'
            //         }, {
            //             cTitle: '助教列表',
            //             router: 'teacher/view_teacherHelp'
            //         }
            //     ]
            // }, {
            //     title: '课程管理',
            //     route: 'course',
            //     child: [
            //         {
            //             cTitle: '课程列表',
            //             router: 'course/view_course'
            //         }
            //         // , {
            //         //     cTitle: '专题课程',
            //         //     router: 'course/view_subjectCourse'
            //         // }
            //     ]
            // }, {
            //     title: '商城管理',
            //     route: 'shop',
            //     child: [
            //         {
            //             cTitle: '商品列表',
            //             router: 'shop/view_shop'
            //         }
            //     ]
            // }, {
            //     title: '订单管理',
            //     route: 'order',
            //     child: [
            //         {
            //             cTitle: '订单列表',
            //             router: 'order/view_order'
            //         }
            //     ]
            // }, {
            //     title: '优惠券管理',
            //     route: 'coupon',
            //     child: [
            //         {
            //             cTitle: '优惠券列表',
            //             router: 'coupon/view_coupon'
            //         }
            //     ]
            // },
            //  {
            //     title: '广告位设置',
            //     route: 'adv',
            //     child: [
            //         {
            //             cTitle: '注册页背景',
            //             router: 'adv/view_regUpload'
            //         }
            //     ]
            // },
            // {
            //     title: '运营设置',
            //     route: 'banner',
            //     child: [
            //         {
            //             cTitle: '引导图设置',
            //             router: 'banner/view_banner'
            //         }, {
            //             cTitle: '首页banner设置',
            //             router: 'banner/view_bannerIndex'
            //         }, {
            //             cTitle: '首页下方banner设置',
            //             router: 'banner/view_IndexBottom'
            //         }, {
            //             cTitle: '发现banner设置',
            //             router: 'banner/view_findBanner'
            //         }, {
            //             cTitle: '在线教育banner设置',
            //             router: 'banner/view_educationBanner'
            //         }, {
            //             cTitle: '在线教育下方banner设置',
            //             router: 'banner/view_educationBottomBanner'
            //         }, {
            //             cTitle: '商城banner',
            //             router: 'banner/view_shopBanner'
            //         }, {
            //             cTitle: '精品课程素材设置',
            //             router: 'banner/view_material'
            //         }, {
            //             cTitle: '教育页中部banner',
            //             router: 'banner/view_educationBannerMid'
            //         }, {
            //             cTitle: '商城分类页banner',
            //             router: 'banner/view_shopCategoryBanner'
            //         }
            //     ]
            // }, {
            //     title: '搜索推荐',
            //     route: 'search',
            //     child: [
            //         {
            //             cTitle: '主页搜索',
            //             router: 'search/view_indexSearch'
            //         }, {
            //             cTitle: '发现搜索',
            //             router: 'search/view_findSearch'
            //         }, {
            //             cTitle: '课程搜索',
            //             router: 'search/view_courseSearch'
            //         }, {
            //             cTitle: '商品搜索',
            //             router: 'search/view_goodsSearch'
            //         }
            //     ]
            // }, {
            //     title: '类目维护',
            //     route: 'category',
            //     child: [
            //         {
            //             cTitle: '课程分类',
            //             router: 'category/view_courseCate'
            //         }, {
            //             cTitle: '商品分类',
            //             router: 'category/view_shopCate'
            //         }, {
            //             cTitle: '资讯分类',
            //             router: 'category/view_msgCate'
            //         }
            //     ]
            // }, {
            //     title: '客服设置',
            //     route: 'serve',
            //     child: [
            //         {
            //             cTitle: '在线客服',
            //             router: 'serve/view_onlineServe'
            //         }, {
            //             cTitle: '常见问题',
            //             router: 'serve/view_faq'
            //         }, {
            //             cTitle: '用户反馈',
            //             router: 'serve/view_feedback'
            //         }, {
            //             cTitle: '用户反馈',
            //             router: 'serve/view_onlineServeList'
            //         }
            //     ]
            // }, {
            //     title: '权限分配',
            //     route: 'permission',
            //     child: [
            //         {
            //             cTitle: '角色列表',
            //             router: 'permission/view_permission'
            //         }, {
            //             cTitle: '账号列表',
            //             router: 'permission/view_accountList'
            //         }
            //     ]
            // }, {
            //     title: '资讯管理',
            //     route: 'information',
            //     child: [
            //         {
            //             cTitle: '资讯列表',
            //             router: 'information/view_information'
            //         }
            //     ]
            // }, {
            //     title: '内容管理',
            //     route: 'content',
            //     child: [
            //         {
            //             cTitle: '内容列表',
            //             router: 'content/view_content'
            //         }
            //     ]
            // }, {
            //     title: '审核中心',
            //     route: 'audit',
            //     child: [
            //         {
            //             cTitle: '名师审核',
            //             router: 'audit/view_auditTeacher'
            //         },
            //         {
            //             cTitle: '推手审核',
            //             router: 'audit/view_auditPush'
            //         },
            //         {
            //             cTitle: '提现审核',
            //             router: 'audit/view_auditWithdraw'
            //         }
            //     ]
            // }, {
            //     title: '战略合作',
            //     route: 'strategic',
            //     child: [
            //         {
            //             cTitle: '企业列表',
            //             router: 'strategic/view_strategic'
            //         },
            //         {
            //             cTitle: '资讯列表',
            //             router: 'strategic/view_info'
            //         },
            //         {
            //             cTitle: '线下学院',
            //             router: 'strategic/view_schoolVideo'
            //         }
            //     ]
            // }, {
            //     title: '推荐内容',
            //     route: 'recommend',
            //     child: [
            //         {
            //             cTitle: '课程推荐',
            //             router: 'recommend/view_courseRecommend'
            //         },
            //         {
            //             cTitle: '名师推荐',
            //             router: 'recommend/view_teacherRecommend'
            //         },
            //         {
            //             cTitle: '商品推荐',
            //             router: 'recommend/view_goodsRecommend'
            //         }
            //     ]
            // }, {
            //     title: '会员管理',
            //     route: 'vip',
            //     child: [
            //         {
            //             cTitle: '会员设置',
            //             router: 'vip/view_vip'
            //         },
            //         {
            //             cTitle: '会员列表',
            //             router: 'vip/view_vipList'
            //         }
            //     ]
            // }, {
            //     title: '消息中心',
            //     route: 'msg',
            //     child: [
            //         {
            //             cTitle: '系统消息推送',
            //             router: 'msg/view_system'
            //         },
            //         {
            //             cTitle: '订单消息推送',
            //             router: 'msg/view_orderMessage'
            //         }
            //     ]
            // }, {
            //     title: '财务统计',
            //     route: 'finance',
            //     child: [
            //         {
            //             cTitle: '财务统计',
            //             router: 'finance/view_finance'
            //         }
            //     ]
            // }, {
            //     title: '评论管理',
            //     route: 'comment',
            //     child: [
            //         {
            //             cTitle: '课程评论',
            //             router: 'comment/view_commentCourse'
            //         },
            //         {
            //             cTitle: '商城评论',
            //             router: 'comment/view_commentShop'
            //         },
            //         {
            //             cTitle: '资讯评论',
            //             router: 'comment/view_commentInfo'
            //         }
            //     ]
            // },
            // }, {
            //     title: '发现管理',
            //     route: 'find',
            //     child: [
            //         {
            //             cTitle: '动态列表',
            //             router: 'find/view_active'
            //         }, {
            //             cTitle: '话题列表',
            //             router: 'find/view_topic'
            //         },
            //         {
            //             cTitle: '广告位设置',
            //             router: 'find/view_advertising'
            //         }
            //     ]
            // }]
        }
    },
    created() {
        this.menuList = JSON.parse(localStorage.getItem('menuList'))
        this.handleSelect(this.$route.fullPath.split('/').splice(0, 4).join('/'))
        console.log('数据',this.menuList);
    },
    watch: {
        '$route' () {
            this.handleSelect(this.activeRoute)
        }
    },
    methods: {
        handleSelect (index) {
            this.activeRoute = this.$route.fullPath.split('/').splice(0, 4).join('/')
            // console.log(this.$route.fullPath)
        },
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        }
    }
}
</script>

<style lang="stylus" scoped>
    // .el-submenu >>> .el-submenu__title
    //     padding-left 30px !important
    .f-aside
        color: $color-white
        .el-menu
            border: none
            .el-menu-item
                border: none
                min-width 0
                &.is-active
                    color #E6A23C !important
                &:hover
                    color #E6A23C !important
                    background rgba(255,255,255,.3) !important
</style>
