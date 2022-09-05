<template>
    <div class="bannerIndexDetails">
        <div class="conn">
            <div class="header">
                <div v-if="type == 1" class="title">新增</div>
                <div v-if="type == 2" class="title">编辑</div>
                <div class="btnList">
                    <el-button
                        v-if="type == 1"
                        size="small"
                        type="primary" 
                        @click="add"
                        >发布</el-button
                    >
                    <el-button
                        v-if="type == 2"
                        size="small"
                        type="primary" 
                        @click="update"
                        >确定</el-button
                    >
                    <el-button size="small" plain @click="goBack"
                        >返回上页</el-button
                    >
                </div>
            </div>
            <div class="formBox">
                <el-form ref="form" :model="form" label-width="90px">
                    <el-form-item label="标题" :required="true">
                        <el-input
                            v-model="form.title"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="排序" :required="true">
                        <el-input-number
                            v-model="form.sort"
                            controls-position="right"
                            :min="1"
                        ></el-input-number>
                    </el-form-item>
                    <el-form-item label="详情类别" prop="type" :required="true">
                        <el-select v-model="form.type" placeholder="请选择">
                            <el-option label="富文本" value="2"></el-option>
                            <el-option label="链接" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="banner图" :required="true">
                        <el-upload
                            :with-credentials="true"
                            :key="1"
                            ref="clear"
                            class="avatar-uploader"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                        >
                            <img
                                v-if="form.imgUrl"
                                :src="form.imgUrl"
                                class="avatar1"
                            />
                            <i
                                v-else
                                class="el-icon-camera-solid avatar-uploader-icon1"
                            ></i>
                            <i class="tihuan1">点击上传图片</i>
                        </el-upload>
                        <span style="color: red"
                            >建议上传690*281尺寸大小的图片</span
                        >
                    </el-form-item>
                    <!-- <el-form-item label="轮播时间">
                        <el-input-number v-model="form.time" controls-position="right" :min="0"></el-input-number> s
                    </el-form-item> -->
                    <el-form-item
                        label="跳转链接"
                        v-if="form.type == 1"
                        :required="true"
                    >
                        <el-input
                            v-model="form.content"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="" v-if="form.type == 2">
                        <wangedEdit
                            :catchData="catchData"
                            ref="text"
                            class="wanged"
                        ></wangedEdit>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {  masteAddCmsBannerBigCoffee } from "api/index.js";
export default {
    name: "bannerIndexDetails",
    components: {
        wangedEdit: () => import("components/wanged-edit/wanged-edit")
    },
    data() {
        return {
            form: {
                imgUrl: "",
                time: "",
                sort: "",
                type: "1",
                content: "",
                htmlContent: "",
                txt: "",
                title: ""
            },
            type: "",
            id: "",
            flag: false
        };
    },
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + "60";
        }
    },
    watch: {},
    methods: {
        // 添加
        add() {
            if (this.form.type.toString() === "1") {
                this.form.htmlContent = undefined;
            } else if (this.form.type.toString() === "2") {
                this.form.content = undefined;
            }
            if (this.form.title === "") {
                return this.$message.error("请输入标题");
            } else if (this.form.imgUrl === "") {
                return this.$message.error("请上传图片");
            }
            if (
                this.form.type.toString() === "1" &&
                (this.form.content === "" || this.form.content === undefined)
            ) {
                return this.$message.error("请输入跳转链接");
            }
            if (
                this.form.type.toString() === "2" &&
                (this.form.htmlContent === "" ||
                    this.form.htmlContent === undefined)
            ) {
                return this.$message.error("请输入详情");
            }
            if (!this.flag) {
                this.flag = true;
                masteAddCmsBannerBigCoffee(``, {
                    sort: this.form.sort,
                    imgUrl: this.form.imgUrl,
                    content: this.form.content,
                    htmlContent: this.form.htmlContent,
                    type: this.form.type,
                    status: 0,
                    title: this.form.title
                }).then(res => {
                    if (res.status === 200) {
                        this.$message.success("添加成功！");
                        this.goBack();
                    }
                });
                setTimeout(() => {
                    this.flag = false;
                }, 2000);
            }
        },
        // 编辑
        update() {
            if (this.form.type.toString() === "1") {
                this.form.htmlContent = undefined;
            } else if (this.form.type.toString() === "2") {
                this.form.content = undefined;
            }
            if (this.form.title === "") {
                return this.$message.error("请输入标题");
            } else if (this.form.imgUrl === "") {
                return this.$message.error("请上传图片");
            }
            if (
                this.form.type.toString() === "1" &&
                (this.form.content === "" || this.form.content === undefined)
            ) {
                return this.$message.error("请输入跳转链接");
            }
            if (
                this.form.type.toString() === "2" &&
                (this.form.htmlContent === "" ||
                    this.form.htmlContent === undefined)
            ) {
                return this.$message.error("请输入详情");
            }
            masteAddUpdateCmsBannerBigCoffee(``, {
                id: this.id,
                sort: this.form.sort,
                imgUrl: this.form.imgUrl,
                content: this.form.content,
                htmlContent: this.form.htmlContent,
                type: this.form.type,
                status: 0,
                title: this.form.title
            }).then(res => {
                if (res.status === 200) {
                    this.$message.success("修改成功！");
                    this.goBack()
                }
            })
        },
        // 图片上传
        handleAvatarSuccess(res, file) {
            this.form.imgUrl = res.data;
        },
        // 富文本内容
        catchData(val) {
            this.form.htmlContent = val;
        },
        // 返回上一页
        goBack() {
            this.$router.push({ name: "masterBanner" });
        }
    },
    created() {
        this.id = this.$route.query.id
        this.type = this.$route.query.type
        if (this.type.toString() === "2") {
            let res = this.$route.query.data[0]
            console.log(res)
            this.form.imgUrl = res.imgUrl
            this.form.title = res.title
            this.form.sort = res.sort
            this.form.type = res.type.toString()
            if (res.type.toString() === "1") {
                this.form.content = res.htmlContent
            } else if (res.type.toString() === "2") {
                this.form.htmlContent = res.htmlContent
                setTimeout(() => {
                    this.$refs.text.getData(res.htmlContent)
                }, 300)
            }
        }
    }
};
</script>
<style lang="stylus" scoped>
//@import url(); 引入公共css类
    @import '../../../assets/css/upload1.css'; // 引入公共css类
    .wanged >>> .w-e-text-container
        height: 300px !important
    .el-form-item >>> .el-form-item__label
        color #000 !important
    .bannerIndexDetails
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
</style>
