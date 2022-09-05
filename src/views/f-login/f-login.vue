<template>
    <div class="f-login">
        <div class="login-wrapper">
            <!-- <img src="" alt=""> -->
            <h1 class="title">德艺时尚商家后台</h1>
            <el-form :model="form" status-icon :rules="rules" ref="ruleForm">
                <el-form-item prop="username">
                    <el-input
                        v-model="form.username"
                        placeholder="请输入用户名"
                        prefix-icon="el-icon-user"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="form.password"
                        placeholder="请输入登录密码"
                        prefix-icon="el-icon-lock"
                        type="password"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="onLogin" @click="handleLogin('ruleForm')"
                        >登录</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { login, adminInfo } from "api/index.js";
export default {
    name: "f-login",
    data() {
        let validateUser = (rule, value, callback) => {
            // 验证用户名
            if (value === "") {
                callback(new Error("请输入用户名"));
            } else {
                callback();
            }
        };
        let validatePass = (rule, value, callback) => {
            // 验证密码
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                callback();
            }
        };
        return {
            form: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    {
                        validator: validateUser,
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        validator: validatePass,
                        trigger: "blur"
                    }
                ]
            }
            // data: [ // 所有权限
            //     {
            //         id: 1,
            //         module: '数据总览',
            //         permission: '用户增长'
            //     }, {
            //         id: 2,
            //         module: '数据总览',
            //         permission: '用户管理'
            //     }, {
            //         id: 3,
            //         module: '数据总览',
            //         permission: '训练汇总'
            //     }, {
            //         id: 4,
            //         module: '广告管理',
            //         permission: 'banner管理'
            //     }, {
            //         id: 5,
            //         module: '广告管理',
            //         permission: '启动页广告设置'
            //     }, {
            //         id: 6,
            //         module: '广告管理',
            //         permission: '首页广告设置'
            //     }, {
            //         id: 7,
            //         module: '通知管理',
            //         permission: '通知设置'
            //     }, {
            //         id: 8,
            //         module: '通知管理',
            //         permission: '小将头条设置'
            //     }, {
            //         id: 9,
            //         module: '训练管理',
            //         permission: '评语管理'
            //     }, {
            //         id: 10,
            //         module: '训练管理',
            //         permission: '行情管理'
            //     }, {
            //         id: 11,
            //         module: '活动管理',
            //         permission: '抽奖设置'
            //     }, {
            //         id: 12,
            //         module: '活动管理',
            //         permission: '签到设置'
            //     }, {
            //         id: 13,
            //         module: '活动管理',
            //         permission: '比赛设置'
            //     }, {
            //         id: 14,
            //         module: '活动管理',
            //         permission: '邀请设置'
            //     }, {
            //         id: 15,
            //         module: 'APP管理',
            //         permission: '客服设置'
            //     }, {
            //         id: 16,
            //         module: 'APP管理',
            //         permission: '充值设置'
            //     }, {
            //         id: 17,
            //         module: '订单管理',
            //         permission: '商品管理'
            //     }, {
            //         id: 18,
            //         module: '订单管理',
            //         permission: '奖品订单管理'
            //     }, {
            //         id: 19,
            //         module: '订单管理',
            //         permission: '退款退货订单'
            //     }, {
            //         id: 20,
            //         module: '平台管理',
            //         permission: '权限设置'
            //     }, {
            //         id: 21,
            //         module: '平台管理',
            //         permission: '财务统计'
            //     }, {
            //         id: 22,
            //         module: '平台管理',
            //         permission: '充值记录'
            //     }, {
            //         id: 23,
            //         module: '平台管理',
            //         permission: '短信模板'
            //     }, {
            //         id: 24,
            //         module: '竞赛榜单管理',
            //         permission: '奖品设置'
            //     }, {
            //         id: 25,
            //         module: '竞赛榜单管理',
            //         permission: '竞赛广告设置'
            //     }, {
            //         id: 26,
            //         module: '活动管理',
            //         permission: '自动发布'
            //     }
            // ],
            // permissionList: [] // 当前权限
        }
    },
    methods: {
        getNavData() {
            adminInfo(``, {}).then(res => {
                console.log(res);
                if (res.status === 200) {
                    if (res.data.length > 0) {
                        res.data.push({
                            child: [
                                {
                                    id: 125,
                                    name: "课程列表",
                                    pid: 81,
                                    sort: 50,
                                    uri: "boutique/view_boutique"
                                }
                            ],
                            id: 81,
                            name: "精品课程管理",
                            pid: 0,
                            sort: 21,
                            uri: "boutique"
                        })
                        res.data.push({
                            child: [
                                {
                                    id: 125,
                                    name: "视频列表",
                                    pid: 81,
                                    sort: 50,
                                    uri: "masterVideo/view_masterVideo"
                                }
                            ],
                            id: 81,
                            name: "大咖访谈管理",
                            pid: 0,
                            sort: 21,
                            uri: "masterVideo"
                        })
                        res.data.push({
                            child: [
                                {
                                    id: 125,
                                    name: "项目介绍管理",
                                    pid: 81,
                                    sort: 50,
                                    uri: "entrepreneur/view_entrepreneur"
                                },
                                {
                                    id: 125,
                                    name: "实训课程管理",
                                    pid: 81,
                                    sort: 50,
                                    uri: "entrepreneur/view_practical"
                                },
                                {
                                    id: 125,
                                    name: "企业内训管理",
                                    pid: 81,
                                    sort: 50,
                                    uri: "entrepreneur/view_training"
                                },
                                {
                                    id: 125,
                                    name: "报名表单管理",
                                    pid: 81,
                                    sort: 50,
                                    uri: "entrepreneur/view_apply"
                                }
                            ],
                            id: 81,
                            name: "企业服务管理",
                            pid: 0,
                            sort: 21,
                            uri: "entrepreneur"
                        },
                        {
                            child: [
                                {
                                    id: 125,
                                    name: "项目介绍管理",
                                    pid: 81,
                                    sort: 50,
                                    uri: "undergraduate/view_undergraduater"
                                },
                                {
                                    id: 125,
                                    name: "报名表单管理",
                                    pid: 81,
                                    sort: 50,
                                    uri: "undergraduate/view_uapply"
                                },
                                {
                                    id: 125,
                                    name: "实训课程管理",
                                    pid: 81,
                                    sort: 50,
                                    uri: "undergraduate/view_upractical"
                                }
                            ],
                            id: 81,
                            name: "大学生实训管理",
                            pid: 0,
                            sort: 21,
                            uri: "undergraduate"
                        })
                        // res.data.push()
                        res.data[8].child.push({
                            id: 111,
                            name: "大咖访谈banner",
                            pid: 0,
                            sort: 9,
                            uri: "banner/view_masterBanner"
                        })
                        console.log(res.data);
                        localStorage.setItem(
                            "menuList",
                            JSON.stringify(res.data)
                        );
                        this.$router.push(
                            `/background/${res.data[0].child[0].uri}`
                        );
                    } else {
                        this.$message.error(
                            "该账号暂无任何操作权限，请联系管理员添加权限"
                        );
                    }
                }
            });
        },
        handleLogin(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // this.$store.commit('sign')
                    // this.$router.push('/background/home/view_count')
                    login("", this.form).then(res => {
                        console.log(res)
                        if (res) {
                            this.getNavData()
                            // this.$store.commit('permissionList', arr)
                            // localStorage.setItem("userId", res.data.id)
                            // localStorage.setItem('userName', res.data.username)
                            this.$store.commit("sign");
                        }
                    });
                } else {
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="stylus" scoped>
@import '~assets/style/css/mixin.styl'
    .f-login
        position fixed
        width: 100%
        height: 100%
        background: #fafafa
        .login-wrapper
            background: #fff
            position absolute
            display flex
            flex-direction: column
            align-items center
            padding: 80px 50px 80px 50px
            left: 50%
            transform: translateX(-50%)
            top: 25vh
            light-shadow()
            border-radius: 10px
            .title
                font-weight: 600
                font-size: 32px
                color: #222222
                margin-bottom: 40px
            .el-form
                display flex
                flex-direction: column
                .el-form-item
                    margin-bottom: 25px
                    .el-input
                        width: 300px
                    .el-button
                        width: 100%
                        background: #222222
                        color #fff
                    &:last-child
                        margin: 0
</style>
