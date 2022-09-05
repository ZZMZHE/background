<template>
    <div class="activeDetails">
        <div class="conn">
            <div class="head">
                <div class="title">动态详情：</div>
                <el-button plain size="small" class="back" @click="goBack">返回上一页</el-button>
            </div>
            <div class="activeBox">
                <div class="actHead">
                    <div class="faceImg">
                        <img :src="activeData.faceUrl" alt="">
                    </div>
                    <div class="infoBox">
                        <p class="name">{{activeData.nickname}}</p>
                        <p class="date">{{activeData.addTime}}</p>
                    </div>
                </div>
                <div class="actCon">{{activeData.content}}</div>
                <div class="actImg" v-if="activeData.type == 2">
                    <div class="imgBox" v-for="(item, index) in activeData.imgUrls" :key="index" @click="openDia(item)">
                        <img :src="item" alt="">
                    </div>
                </div>
                <div class="actVideo" v-if="activeData.type == 3">
                    <video width="400" height="300" :src="activeData.videoUrl" controls>
                        您的浏览器不支持Video标签。
                    </video>
                </div>
                <div class="talkList">
                    <div class="talkBox" v-for="(item, i) in coilTalkCommentVos" :key="i">
                        <div class="faceImg">
                            <img :src="item.fromFaceUrl" alt="">
                        </div>
                        <div class="infoBox">
                            <p class="name">{{item.fromNickname}}</p>
                            <p class="date">{{item.addTime}}</p>
                            <div class="con">{{item.content}}</div>
                        </div>
                        <div class="del" @click="del(item.id, item.talkId, item.fromUserId)">删除</div>
                    </div>
                </div>
                <div class="paging" v-if="total > 1">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        background
                        :page-size="5"
                        layout="prev, pager, next"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import { coilTalkInfo, coilTalkCommentDel, coilTalkCommentList } from 'api/index.js'
export default {
    name: 'activeDetails',
    components: {},
    data() {
        return {
            activeData: {},
            dialogImageUrl: '',
            dialogVisible: false,
            videoUrl: '',
            id: '',
            type: '',
            pageSize: 5,
            pageNum: 1,
            total: 10,
            coilTalkCommentVos: []
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取详情数据
        getData() {
            coilTalkInfo(``, {
                id: this.id
            }).then(res => {
                console.log(res)
                if (res.status === 200) {
                    this.activeData = res.data
                    if (res.data.type === 2) {
                        this.activeData.imgUrls = JSON.parse(this.activeData.imgUrls)
                    }
                }
            })
        },
        // 获取动态评论列表
        getTalkList() {
            coilTalkCommentList(``, {
                id: this.id,
                pageSize: this.pageSize,
                pageNum: this.pageNum
            }).then(res => {
                if (res.status === 200) {
                    this.coilTalkCommentVos = res.data.rows
                    this.total = res.data.total
                    if (this.pageNum > 1 && this.coilTalkCommentVos.length < 1) {
                        this.pageNum = this.pageNum - 1
                        this.getTalkList()
                    }
                }
            })
        },
        // 删除
        del(cId, tId, uId) {
            this.$confirm('此操作将删除该评论, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                coilTalkCommentDel(``, {
                    commentId: cId,
                    talkId: tId,
                    userId: uId
                }).then(res => {
                    if (res.status === 200) {
                        this.$message.success('操作成功！')
                        this.getTalkList()
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        },
        // 图片预览
        openDia(url) {
            this.dialogImageUrl = url
            this.dialogVisible = true
        },
        // 每页几条
        handleSizeChange(val) {
            this.pageSize = val
            this.getTalkList()
        },
        // 前往第几页
        handleCurrentChange(val) {
            this.pageNum = val
            this.getTalkList()
        },
        // 返回上一层
        goBack() {
            this.$router.push({ name: 'active' })
        }
    },
    created() {
        this.id = this.$route.query.id
        this.type = this.$route.query.type
        this.getData()
        this.getTalkList()
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    .faceImg
        width 60px
        height 60px
        border-radius 50%
        overflow hidden
        img
            width 100%
            height 100%
    .paging
        padding 20px 0
        text-align center
    .activeDetails
        .conn
            margin 20px 20px 0 20px
            .head
                height 90px
                line-height 90px
                margin 0 35px
                border-bottom 1px solid #F2F2F2
                .title
                    float left
                    font-size 18px
                    color #333333
                .back
                    float right
                    margin-top 30px
            .activeBox
                width 50%
                margin-top 30px
                .actHead
                    margin-left 60px
                    overflow hidden
                    .faceImg
                        float left
                    .infoBox
                        float left
                        margin-left 20px
                        .name
                            font-size 16px
                            margin-top 7px
                            color #333333
                        .date
                            margin-top 10px
                            font-size 16px
                            color #C0C0C0
                .actCon
                    font-size 16px
                    color #666666
                    margin-left 140px
                    width 400px
                    line-height 32px
                .actImg
                    margin-left 140px
                    margin-top 20px
                    width 400px
                    overflow hidden
                    .imgBox
                        width 100px
                        height 100px
                        margin-top 10px
                        margin-right 25px
                        float left
                        cursor pointer
                        img
                            width 100%
                            height 100%
                .actVideo
                    margin-left 140px
                    margin-top 20px
                    width 400px
                    overflow hidden
                .talkList
                    margin-left 140px
                    margin-top 20px
                    width 400px
                    overflow hidden
                    .talkBox
                        position relative
                        overflow hidden
                        height 100px
                        .faceImg
                            width 50px
                            height 50px
                            float left
                        .infoBox
                            float left
                            margin-left 20px
                            .name
                                font-size 16px
                                margin-top 7px
                                color #333333
                            .date
                                margin-top 10px
                                font-size 16px
                                color #C0C0C0
                            .con
                                font-size 16px
                                margin-top 2px
                                color #333333
                        .del
                            color #7F0319
                            font-size 16px
                            cursor pointer
                            position absolute
                            right 10px
                            bottom 10px
</style>
