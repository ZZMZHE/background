<template>
    <div class="f-header">
        <div class="l-header">
            <el-avatar size="large" :src="require('../../assets/images/logo.png')">logo</el-avatar>
            <span class="title">德艺时尚商家后台</span>
        </div>
        <div class="r-header">
            <el-avatar size="medium" icon="el-icon-user-solid"></el-avatar>
            <span class="user-name">admin</span>
            <!-- <i class="icon el-icon-time" title="日志" @click="$router.push('/background/log')">日志</i> -->
            <!-- <i class="icon el-icon-s-comment" title="反馈消息" @click="$router.push('/background/feedback')">反馈消息</i> -->
            <!-- <i class="icon el-icon-setting" title="设置" @click="$router.push('/background/set')">设置</i> -->
            <i class="icon el-icon-switch-button" title="退出" @click="logout"></i>
        </div>
    </div>
</template>

<script>
import { loginOut } from 'api/index.js'

export default {
    name: 'fHeader',
    data() {
        return {
            userName: 'admin'
        }
    },
    created() {
        this.userName = localStorage.getItem('userName')
    },
    methods: {
        logout() {
            loginOut().then(res => {
                if (res.status === 200) {
                    localStorage.removeItem('menuList')
                    this.$store.commit('logout')
                    this.$router.push('/login')
                    this.$message.success('退出成功')
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    .f-header
        height: 100%
        color: $color-white
        display: flex
        flex: 1 0 auto
        justify-content: space-between
        align-items: center
        padding: 0 100px 0 20px
        box-sizing: border-box
        .l-header
            display flex
            align-items center
            .title
                margin-left: 20px
        .r-header
            display flex
            align-items center
            width: 120px
            justify-content: space-around
            i.icon
                font-size: 16px
                cursor: pointer
                &:hover
                    opacity: 0.6
            & >>> .el-dropdown-link
                color: $color-white
</style>
