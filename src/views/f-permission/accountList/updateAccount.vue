<template>
    <div class="updateAccount">
        <div class="conn">
            <div class="header">
                <div class="title">编辑账号</div>
                <div class="btnList">
                    <el-button size="small" type="primary" @click="dialogFormVisible = true">修改密码</el-button>
                    <el-button size="small" type="" @click="add({ type: 1 })">完成</el-button>
                    <el-button size="small" plain @click="goBack">返回上页</el-button>
                </div>
            </div>
            <div class="formBox">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="角色">
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
                </el-form>
            </div>
        </div>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="diaForm"  label-width="110px">
                <el-form-item label="账号" :required="true">
                    <el-input disabled v-model="diaForm.userName" placeholder="请输入"></el-input>
                </el-form-item>
                <!-- <el-form-item label="输入密码">
                    <el-input v-model="diaForm.oldPassword" placeholder="请输入"></el-input>
                </el-form-item> -->
                <el-form-item label="输入新密码" :required="true">
                    <el-input v-model="diaForm.password" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" :required="true">
                    <el-input v-model="diaForm.aginPassword" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add({ type: 2 })">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import { roleFind, adminAdd, adminDetail } from 'api/index.js'

export default {
    name: 'updateAccount',
    components: {
    },
    data() {
        return {
            form: {
                role: []
            },
            diaForm: {
                userName: '',
                oldPassword: '',
                password: '',
                aginPassword: ''
            },
            dialogFormVisible: false,
            roleList: [],
            accountData: {},
            id: '',
            type: '',
            roles: []
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
        // 获取账户详情
        getData() {
            adminDetail(``, {
                id: this.id
            }).then(res => {
                if (res.status === 200) {
                    this.accountData = res.data
                    this.diaForm.userName = this.accountData.username
                    this.form.role = []
                    this.roles = []
                    res.data.roles.forEach(ele => {
                        this.form.role.push(ele.id)
                        this.roles.push(ele.id)
                    })
                }
            })
        },
        // 添加
        add(val) {
            if (val.type === 2) {
                var reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
                if (this.diaForm.password === '') {
                    return this.$message.error('新密码不能为空！')
                } else {
                    if (reg.test(this.diaForm.password)) {
                        return this.$message.error('新密码里不能有汉字！')
                    }
                }
                if (this.diaForm.aginPassword === '') {
                    return this.$message.error('确认新密码不能为空！')
                } else {
                    if (reg.test(this.diaForm.aginPassword)) {
                        return this.$message.error('确认新密码里不能有汉字！')
                    }
                }
                if (this.diaForm.aginPassword !== this.diaForm.password) {
                    return this.$message.error('确认新密码与新密码不一致！')
                }
                this.$confirm('此操作将修改该账号的密码，请谨慎操作, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    adminAdd(``, {
                        id: this.id,
                        name: this.accountData.name,
                        username: this.accountData.username,
                        mobile: this.accountData.mobile,
                        password: this.diaForm.aginPassword,
                        roleIds: this.roles
                    }).then(res => {
                        if (res.status === 200) {
                            this.$message.success('修改成功！')
                            this.goBack()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            } else if (val.type === 1) {
                if (this.form.role.length <= 0) {
                    return this.$message.error('角色不能为空！')
                }
                adminAdd(``, {
                    id: this.id,
                    name: this.accountData.name,
                    username: this.accountData.username,
                    mobile: this.accountData.mobile,
                    roleIds: this.form.role
                }).then(res => {
                    if (res.status === 200) {
                        this.$message.success('编辑成功！')
                        this.goBack()
                    }
                })
            }
        },
        // 返回上一页
        goBack() {
            this.$router.push({ name: 'accountList' })
        }
    },
    created() {
        this.id = this.$route.query.id
        this.getRoleList()
        this.getData()
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    .updateAccount
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
