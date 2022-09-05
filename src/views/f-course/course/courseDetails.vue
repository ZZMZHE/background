<template>
    <div class="courseDetails">
        <div class="conn">
            <div class="head" v-if="false">
                <div class="title">名师详情：</div>
                <el-button plain size="small" class="back" @click="goBack">返回上一页</el-button>
            </div>
            <div class="head" v-if="true">
                <div class="title">
                    <el-button plain size="small" class="btn" :class="tabIndex == 0 ? 'active' : ''" @click="changeIndex({ index: 0 })">普通课程</el-button>
                    <el-button plain size="small" class="btn" :class="tabIndex == 1 ? 'active' : ''" @click="changeIndex({ index: 1 })">系列课程</el-button>
                </div>
                <el-button plain size="small" class="back" @click="goBack">返回上一页</el-button>
            </div>
            <div class="formBox" v-if="tabIndex == 0">
                <el-form ref="form" :model="courseData" label-width="85px" label-position="right" class="form" key="1">
                    <el-form-item label="课程主图：">
                        <div class="imgBox">
                            <img :src="courseData.coverUrl" alt="">
                        </div>
                    </el-form-item>
                    <el-form-item label="课程名称：">
                        <span class="txt">{{courseData.name}}</span>
                    </el-form-item>

                    <el-form-item label="课程简介：" class="richTxt">
                        <!-- <div class="bg"></div> -->
                        <wangedEdit :catchData="catchData" ref="text" class="wanged"></wangedEdit>
                    </el-form-item>
                    <el-form-item label="开课时间：">
                        <span class="txt">{{courseData.startTime}}</span>
                    </el-form-item>
                    <!-- <el-form-item label="授课老师：">
                        <span class="txt" v-if="courseData.orderStatus == 101">待付款</span>
                    </el-form-item> -->
                    <!-- <el-form-item label="开播时间/上传视频：">
                        <span class="txt">{{courseData.addTime}}</span>
                    </el-form-item> -->
                    <el-form-item label="课程价格：">
                        <span class="txt" style="color: #A4503D">￥{{courseData.price}}</span>
                    </el-form-item>
                    <el-form-item label="课程类型：">
                        <span class="txt">{{courseData.categoryName2}}</span>
                    </el-form-item>
                    <!-- <el-form-item label="所属类目：">
                        <span class="txt">{{courseData.payType}}</span>
                    </el-form-item> -->
                </el-form>
            </div>
            <div class="formBox" v-if="tabIndex == 1">
                <el-form ref="form" :model="seriesCourseData" label-width="85px" label-position="right" class="form" key="2">
                    <el-form-item label="课程主图：">
                        <div class="imgBox">
                            <img :src="seriesCourseData.coverUrl" alt="">
                        </div>
                    </el-form-item>
                    <el-form-item label="课程名称：">
                        <span class="txt">{{seriesCourseData.name}}</span>
                    </el-form-item>

                    <el-form-item label="课程简介：" class="richTxt">
                        <!-- <div class="bg"></div> -->
                        <wangedEdit :catchData="catchData" ref="text" class="wanged"></wangedEdit>
                    </el-form-item>
                    <el-form-item label="开课时间：">
                        <span class="txt">{{seriesCourseData.startTime}}</span>
                    </el-form-item>
                    <!-- <el-form-item label="授课老师：">
                        <span class="txt" v-if="seriesCourseData.orderStatus == 101">待付款</span>
                    </el-form-item> -->
                    <!-- <el-form-item label="助教老师：">
                        <span class="txt" v-if="seriesCourseData.orderStatus == 101">待付款</span>
                    </el-form-item> -->
                    <!-- <el-form-item label="课程目录：">
                        <span class="txt">{{seriesCourseData.eduCourseDirectoryVo[0].name}}</span>
                    </el-form-item> -->
                    <el-form-item label="课程价格：">
                        <span class="txt" style="color: #A4503D">￥{{seriesCourseData.price}}</span>
                    </el-form-item>
                    <el-form-item label="课程类型：">
                        <span class="txt">{{seriesCourseData.categoryName2}}</span>
                    </el-form-item>
                    <!-- <el-form-item label="所属类目：">
                        <span class="txt">{{seriesCourseData.payType}}</span>
                    </el-form-item> -->
                    <!-- <el-form-item label="评论：">
                        <span class="txt">{{seriesCourseData.type}}</span>
                    </el-form-item> -->
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { courseInfo, courseInfoUnit } from 'api/index.js'

export default {
    name: 'courseDetails',
    components: {
        wangedEdit: () => import('components/wanged-edit/wanged-edit')
    },
    data() {
        return {
            tabIndex: 0,
            courseData: {},
            seriesCourseData: {},
            id: '',
            type: ''
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取详情数据
        getData() {
            if (this.tabIndex === 0) {
                courseInfo(``, {
                    id: this.id
                }).then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        this.courseData = res.data
                        setTimeout(() => { this.$refs.text.getData(res.data.description) }, 300)
                    }
                })
            } else if (this.tabIndex === 1) {
                courseInfoUnit(``, {
                    id: this.id
                }).then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        this.seriesCourseData = res.data
                        setTimeout(() => { this.$refs.text.getData(res.data.description) }, 300)
                    }
                })
            }
        },
        // tab切换
        changeIndex(val) {
            this.tabIndex = val.index
            this.getData()
        },
        // 富文本内容
        catchData(val) {
            // this.courseData.detail = val
        },
        // 返回上一层
        goBack() {
            this.$router.push({ name: 'order' })
        }
    },
    created() {
        this.id = this.$route.query.id
        this.type = this.$route.query.type
        // this.tabIndex = parseInt(this.$route.query.isCollection)
        if (parseInt(this.$route.query.isCollection) === 1 || parseInt(this.$route.query.isCollection) === 2) {
            this.tabIndex = 0
        } else if (parseInt(this.$route.query.isCollection) === 3 || parseInt(this.$route.query.isCollection) === 4) {
            this.tabIndex = 1
        }
        this.getData()
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    .wanged >>> .w-e-text-container
        height: 250px !important
    .el-form-item >>> .el-form-item__label
        color #000 !important
    .courseDetails
        .conn
            margin 20px 20px 0 20px
            .head
                height 90px
                line-height 90px
                margin 0 35px
                border-bottom 1px solid #F2F2F2
                .title
                    float left
                    color #333333
                    .btn
                        color #9E9DA4
                        background #C3C3C3
                    .active
                        color #ffffff
                        background #222222
                .back
                    float right
                    margin-top 30px
            .formBox
                margin 0 80px
                border-top 1px solid #F2F2F2
                .form
                    padding-top 20px
                    .el-form-item
                        margin-bottom 0px
                    .richTxt
                        width 600px
                        position relative
                        .bg
                            background rgba(0, 0, 0, 0)
                            width 600px
                            height 300px
                            position absolute
                            z-index 1000
                    .imgBox
                        width 60px
                        height 60px
                        overflow hidden
                        cursor pointer
                        img
                            width 100%
                            height 100%
                    .txt
                        color #9E9DA4
                    .btn
                        background #222222
                        color #ffffff
</style>
