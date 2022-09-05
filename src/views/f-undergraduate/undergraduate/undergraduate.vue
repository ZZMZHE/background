<template>
    <div class="orderDetails">
        <div class="conn" style="padding:20px">
            <el-form
                ref="form"
                :model="courseData"
                label-width="100px"
                label-position="right"
                class="form"
                size="small"
            >
                <el-form-item
                    label="课程详情："
                    style="width: 900px;"
                    :required="true"
                >
                    <wangedEdit
                        :catchData="catchData"
                        ref="text"
                        class="wanged"
                    ></wangedEdit>
                </el-form-item>
                <el-form-item label="封面图：" :required="true">
                    <el-upload
                        class="avatar-uploader"
                        :with-credentials="true"
                        :action="uploadUrl"
                        :show-file-list="false"
                        :on-success="handleSuccess"
                    >
                        <img
                            v-if="courseData.coverUrl"
                            :src="courseData.coverUrl"
                            class="avatar3"
                        />
                        <i
                            v-else
                            class="el-icon-plus avatar-uploader-icon"
                            style="width: 178px; height: 178px;line-height: 178px;"
                        ></i>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="sunmit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {
    getCmsStudentTrainingDetailVo,
    updateCmsStudentTraining
} from "api/index.js";

export default {
    name: "orderDetails",
    components: {
        wangedEdit: () => import("components/wanged-edit/wanged-edit")
    },
    data() {
        return {
            courseData: {
                detail: "",
                coverUrl: "",
                id:''
            }
        };
    },
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + "34";
        }
    },
    methods: {
        // 富文本内容
        catchData(val) {
            console.log(val)
            this.courseData.detail = val
        },
        // logo上传
        handleSuccess(file) {
            this.courseData.coverUrl = file.data;
        },
        All() {
            let then = this;
            getCmsStudentTrainingDetailVo("", {}).then(res => {
                if (res.status == 200) {
                    then.courseData.coverUrl = res.data.imgSrc;
                    then.courseData.id=res.data.id
                    then.courseData.detail=res.data.projectIntroduction
                    if (res.data.projectIntroduction) {
                        setTimeout(() => {
                            this.$refs.text.getData(
                                res.data.projectIntroduction
                            );
                        }, 300)
                    }
                }
            });
        },
        sunmit() {
            let { courseData } = this;
            this.$confirm("此操作将修改该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                    console.log(courseData);
                    updateCmsStudentTraining("", {
                        id:courseData.id,
                        imgSrc: courseData.coverUrl,
                        projectIntroduction: courseData.detail
                    }).then(res => {
                        if (res.status == 200) {
                            this.$message({
                                type: "success",
                                message: "修改成功!"
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消修改"
                    })
                })
        }
    },
    created() {
        this.All();
    }
};
</script>

<style lang="stylus" scoped>
/deep/.avatar-uploader{
    width: 178px !important;
    height: 178px !important;

}
//@import url(); 引入公共css类
@import '../../../assets/css/upload3.css'; // 引入公共css类
    .wanged >>> .w-e-text-container
        height 300px !important
    .el-form-item >>> .el-form-item__label
        color #000 !important
    .bg
        background #222222
        color: #ffffff
    .paging
        padding 20px 0
        text-align center
    .color
        color #1890FF
        cursor pointer
    .margin
        margin-left 10px
    .box
        position relative
        // height 90px
        overflow hidden
        .taecherBox
            height 80px
            width 140px
            border 1px solid #C0C0C0
            float left
            border-radius 8px
            margin-top 8px
            margin-right 10px
            position relative
            .imgBox
                width 40px
                height 40px
                border-radius 50%
                margin 6px auto 0 auto
                overflow hidden
                img
                    width 100%
                    height 100%
            .name
                text-align center
                color #C0C0C0
                width 140px
                white-space nowrap
                text-overflow ellipsis
                overflow hidden
                word-break break-all
            .el-icon-error
                font-size 20px
                position absolute
                color #C0C0C0
                right -8px
                top -8px
                cursor pointer
            .el-icon-error:hover
                color red
        .btnBox
            float left
            .listAdd
                float left
                margin-left 10px
                color #1890FF
                cursor pointer
                margin-top 60px
            .oneself:hover, .list:hover
                color red
    .orderDetails
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
                .btnList
                    float right
                // .back
                .bg
                    background #222222
                    color: #ffffff
            .formBox
                margin 0 80px
                border-top 1px solid #F2F2F2
                .form
                    padding-top 20px
                    // .el-form-item
                    //     margin-bottom 0px
                    .richTxt
                        width 600px
                    .couName
                        width 35%
                    .txt
                        color #9E9DA4
                    .btn
                        background #222222
                        color #ffffff
</style>
