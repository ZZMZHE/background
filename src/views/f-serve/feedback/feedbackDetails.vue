<template>
    <div class="feedbackDetails">
        <div class="conn">
            <div class="header">
                <div class="title">反馈详情：</div>
                <div class="btnList">
                    <el-button v-if="form.status == 0" type="primary" size="small" @click="openFinshed">处理</el-button>
                    <el-button size="small" plain @click="goBack">返回上页</el-button>
                </div>
            </div>
            <div class="formBox">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="头像">
                        <div class="imgBox">
                            <img :src="form.faceUrl" alt="">
                        </div>
                    </el-form-item>
                    <el-form-item label="用户昵称">
                        <span class="txt">{{form.nickname}}</span>
                    </el-form-item>
                     <el-form-item label="反馈时间">
                        <span class="txt">{{form.addtime}}</span>
                    </el-form-item>
                     <el-form-item label="联系方式">
                        <span class="txt">{{form.tel}}</span>
                    </el-form-item>
                    <el-form-item label="内容">
                        <span class="txt">{{form.content}}</span>
                    </el-form-item>
                    <el-form-item label="反馈图片">
                        <div class="imgList" v-for="(item, index) in imgList" :key="index" @click="openImgDia(item)">
                            <img :src="item" alt="">
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-dialog :visible.sync="dialogVisible" width="30%">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>

import { cmsFeedbackInfo, cmsFeedbackUpdate } from 'api/index.js'

export default {
    name: 'feedbackDetails',
    components: {},
    data() {
        return {
            form: {
                addtime: '',
                nickname: '',
                content: '',
                tel: '',
                faceUrl: '',
                status: ''
            },
            imgList: [],
            id: '',
            type: '',
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + '30'
        }
    },
    watch: {},
    methods: {
        getData() {
            cmsFeedbackInfo(``, {
                id: this.id
            }).then(res => {
                if (res.status === 200) {
                    this.form.addtime = res.data.addTime
                    this.form.nickname = res.data.nickname
                    this.form.content = res.data.content
                    this.form.tel = res.data.tel
                    this.form.faceUrl = res.data.faceUrl
                    this.form.status = res.data.status
                    this.imgList = JSON.parse(res.data.imgUrlJson)
                }
            })
        },
        openFinshed() {
            this.$confirm('此操作前您是否已知悉此反馈内容并处理完成?', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                cmsFeedbackUpdate(``, {
                    id: this.id,
                    status: 1
                }).then(res => {
                    if (res.status === 200) {
                        this.$message.success('操作成功')
                        this.goBack()
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        },
        // 点击图片查看大图
        openImgDia(url) {
            this.dialogVisible = true
            this.dialogImageUrl = url
        },
        // 返回上一页
        goBack() {
            this.$router.push({ name: 'feedback' })
        }
    },
    created() {
        this.id = this.$route.query.id
        this.getData()
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
   @import '../../../assets/css/upload3.css';
    .feedbackDetails
        .imgList
            width 100px
            height 100px
            overflow hidden
            float left
            margin-left 10px
            cursor pointer
            img
                width 100%
                height 100%
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
                width 50%
                margin-top 20px
                padding-bottom 20px
                padding-left 90px
                .imgBox
                    width 40px
                    height 40px
                    border-radius 50%
                    overflow hidden
                    margin-left 20px
                    img
                        width 100%
                        height 100%
                .txt
                    color #9E9DA4
                    padding-left 20px
</style>
