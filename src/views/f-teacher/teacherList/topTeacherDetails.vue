<template>
    <div class="topTeacherDetails">
        <div class="conn">
            <div class="head">
                <div class="txt">名师详情：</div>
                <div class="back" @click="goback({ id: id, type: type })">返回上页</div>
            </div>
            <div class="body">
                <div class="box">
                    <div class="center">
                        <div class="imgBox">
                            <img :src="form.faceUrl" alt="头像">
                        </div>
                        <div class="name">{{form.nickname}}</div>
                        <div class="zhiye">{{form.qualification}}</div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="formBox">
                    <div class="title">基本资料</div>
                    <el-form ref="form" :model="form" label-width="85px" label-position="left">
                        <el-form-item label="职位：">
                            <span class="txt">{{form.position}}</span>
                        </el-form-item>
                        <el-form-item label="性别：">
                            <span class="txt">{{form.gender}}</span>
                        </el-form-item>
                        <el-form-item label="毕业院校：">
                            <span class="txt">{{form.graduateSchool}}</span>
                        </el-form-item>
                        <el-form-item label="个人主页：">
                            <span class="txt">{{form.homepage}}</span>
                        </el-form-item>
                        <el-form-item label="标语：">
                            <span class="txt">{{form.slogan}}</span>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="jieshao">
                    <div class="title">讲师介绍</div>
                    <div class="txt" v-html="form.introduce"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { teacherInfo } from 'api/index.js'
export default {
    name: 'topTeacherDetails',
    components: {},
    data() {
        return {
            form: {},
            id: undefined,
            type: undefined
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取详情
        getData() {
            teacherInfo(``, {
                id: this.id
            }).then(res => {
                if (res.status === 200) {
                    this.form = res.data
                }
            })
        },
        // 返回上一页
        goback(val) {
            this.$router.push({ name: 'teacherAboutCourse', query: val })
        }
    },
    created() {
        this.id = this.$route.query.id
        this.type = this.$route.query.type
        this.getData()
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    .topTeacherDetails
        width 100%
        .conn
            margin 20px 20px 0 20px
            .head
                height 120px
                background #ffffff
                .txt
                    color #333333
                    font-size 20px
                    margin 50px 0 0 40px
                    float left
                .back
                    width 146px
                    height 38px
                    border 1px solid #C0C0C0
                    line-height 40px
                    text-align center
                    color #5A5A5A
                    font-size 18px
                    margin 40px 80px 0 0
                    float right
                    cursor pointer
            .body
                height 206px
                background #ffffff
                .box
                    margin 0 80px
                    border-top 1px solid #F2F2F2
                    .center
                        text-align center
                        width 25%
                        .imgBox
                            text-align center
                            height 60px
                            margin-top 40px
                            img
                                width 60px
                                height 60px
                                border-radius 50%
                                overflow hidden
                        .name
                            color #222222
                            font-size 20px
                            margin-top 20px
                        .zhiye
                            color #666666
                            font-size 16px
                            margin-top 10px
            .bottom
                background #ffffff
                .formBox
                    margin 0 80px
                    border-top 1px solid #F2F2F2
                    border-bottom 1px solid #F2F2F2
                    padding 40px 0
                    .title
                        color #222222
                        font-size 20px
            .jieshao
                background #ffffff
                padding 20px 0
                margin 0 80px
                .title
                    color #222222
                    font-size 20px
                    margin-bottom 20px
                .txt
                    width 40%
                    color #666666
                    line-height 28px
</style>
