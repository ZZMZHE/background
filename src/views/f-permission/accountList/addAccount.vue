<template>
    <div class="addAccount">
        <div class="conn">
            <div class="header">
                <div class="title">创建账号</div>
                <div class="btnList">
                    <el-button size="small" type="primary" @click="add">完成创建</el-button>
                    <el-button size="small" plain @click="goBack">返回上页</el-button>
                </div>
            </div>
            <div class="formBox">
                <el-form ref="form" :model="form" label-width="90px">
                    <el-form-item label="名称" :required="true">
                        <el-input v-model="form.name" placeholder="请输入"></el-input>
                    </el-form-item>
                     <el-form-item label="账号" :required="true">
                        <el-input v-model="form.userName" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" :required="true">
                        <el-input v-model="form.tel" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" :required="true">
                        <!-- <el-select v-model="form.role" placeholder="请选择">
                            <el-option v-for="(item,index) in roleList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select> -->
                        <el-select v-model="form.role" multiple placeholder="请选择">
                            <el-option
                                v-for="(item,index) in roleList"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="密码" :required="true">
                        <el-input v-model="form.password" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" :required="true">
                        <el-input v-model="form.aginPassword" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>

import { roleFind, adminAdd } from 'api/index.js'

export default {
    name: 'addAccount',
    components: {
    },
    data() {
        return {
            form: {
                name: '',
                userName: '',
                tel: '',
                role: [],
                password: '',
                aginPassword: ''
            },
            roleList: [],
            id: '',
            type: '',
            f: false
        }
    },
    computed: {

    },
    watch: {},
    methods: {
        // 查询角色列表
        getRoleList() {
            roleFind().then(res => {
                if (res.status === 200) {
                    this.roleList = res.data
                }
            })
        },
        // 添加
        add() {
            var reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
            if (this.form.name === '') {
                return this.$message.error('名称不能为空！')
            }
            if (this.form.userName === '') {
                return this.$message.error('账号不能为空！')
            } else {
                if (reg.test(this.form.userName)) {
                    return this.$message.error('账号里不能有汉字！')
                }
            }
            if (this.form.tel === '') {
                return this.$message.error('手机号不能为空！')
            }
            if (this.form.role.length <= 0) {
                return this.$message.error('角色不能为空！')
            }
            if (this.form.password === '') {
                return this.$message.error('密码不能为空！')
            } else {
                if (reg.test(this.form.password)) {
                    return this.$message.error('密码里不能有汉字！')
                }
            }
            if (this.form.aginPassword === '') {
                return this.$message.error('确认密码不能为空！')
            } else {
                if (reg.test(this.form.aginPassword)) {
                    return this.$message.error('确认密码里不能有汉字！')
                }
            }
            if (this.form.aginPassword !== this.form.password) {
                return this.$message.error('确认密码与密码不一致！')
            }
            if (!this.f) {
                this.f = true
                adminAdd(``, {
                    name: this.form.name,
                    username: this.form.userName,
                    mobile: this.form.tel,
                    password: this.form.aginPassword,
                    roleIds: this.form.role
                }).then(res => {
                    if (res.status === 200) {
                        this.$message.success('创建成功！')
                        this.goBack()
                    }
                })
                setTimeout(() => {
                    this.f = false
                }, 2000)
            }
        },
        // 返回上一页
        goBack() {
            this.$router.push({ name: 'accountList' })
        }
    },
    created() {
        this.getRoleList()
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    .addAccount
        .conn
            margin 20px 20px 0 20px
            background #ffffff
            .header
                height 80px
                border-bottom 1px solid #F2F2F2
                .title
                    line-height 81px
                    float left
                    margin-left 20px
                    color #333333
                    font-size 20px
                .btnList
                    float right
                    margin-right 244px
                    line-height 81px
            .formBox
                width 25%
                margin-top 20px
                margin-left 50px
                padding-bottom 20px
</style>
