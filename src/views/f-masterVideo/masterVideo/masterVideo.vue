<template>
    <div class="course">
        <div class="conn">
            <div class="header">
                <el-form
                    :inline="true"
                    :model="formInline"
                    ref="formInline"
                    class="demo-form-inline"
                    size="small"
                >
                    <el-form-item label="课程名称" prop="name">
                        <el-input
                            v-model="formInline.name"
                            placeholder="请输入"
                            class="phoneId"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="" @click="onSubmit" class="btn bg"
                            >搜索</el-button
                        >
                        <el-button
                            type=""
                            @click="onReset('formInline')"
                            class="btn"
                            >重置</el-button
                        >
                        <el-button
                            type=""
                            class="btn bg"
                            size="small"
                            @click="goDetails({ type: 2 })"
                            >新增课程</el-button
                        >
                        <!-- <el-button class="btn" size='small' @click="soldOut({ type: '2' })">批量下架</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableBox">
                <el-table
                    ref="multipleTable"
                    border
                    :data="tableData"
                    :header-cell-style="{ background: '#f5f5f5' }"
                    tooltip-effect="dark"
                    style="width: 100%"
                >
                    <el-table-column label="标题" align="center">
                        <template slot-scope="scope">{{
                            scope.row.title
                        }}</template>
                    </el-table-column>
                    <el-table-column align="center" label="封面图">
                        <template slot-scope="scope">
                            <el-image
                                style="width: 40px; height: 40px"
                                :src="scope.row.imgSrc"
                                fit="cover"
                            ></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="音频地址">
                        <template slot-scope="scope">
                            <div class="noWarp">{{ scope.row.url }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="发布时间"
                        show-overflow-tooltip
                        align="center"
                    >
                        <template slot-scope="scope">{{
                            scope.row.createTime
                        }}</template>
                    </el-table-column>
                    <el-table-column prop="sort" align="center" label="排序值">
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <span
                                class="color"
                                style="color: #7F0319"
                                @click="
                                    goDetails({ id: scope.row.id, type: 2 })
                                "
                                >编辑</span
                            >
                            <span
                                style="color: red"
                                class="color margin"
                                @click="soldOut({ id: scope.row.id })"
                                >移除</span
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 hide-on-single-page-->
                <div class="paging">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        background
                        layout="total, prev, pager, next, sizes, jumper"
                        :total="total" >
                    </el-pagination>
                </div>
            </div>
        </div>
        <el-dialog
            width="30%"
            :visible.sync="centerDialogVisible"
            :show-close="false"
            :title="title"
            :close-on-click-modal="false">
            <template>
                <el-form
                    :inline="true"
                    :model="form"
                    ref="form"
                    :rules="rules"
                    class="demo-form-inline"
                    size="small">
                    <el-form-item label="视频标题:" prop="title">
                        <el-input
                            v-model="form.title"
                            placeholder="请输入活动名称"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="封面图片:" prop="imgUrl">
                        <el-upload
                            :with-credentials="true"
                            :key="1"
                            ref="clear"
                            class="avatar-uploader"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                        >
                            <!-- <img
                                v-if="form.imgUrl"
                                :src="form.imgUrl"
                                class="image"
                            />
                            <i v-else  class="el-icon-plus avatar-uploader-icon"></i>
                            <br />
                            <i class="tihuan1">点击上传图片</i> -->
                            <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar1">
                            <i v-else class="el-icon-camera-solid avatar-uploader-icon1"></i>
                        </el-upload>
                    </el-form-item>
                    <br/>
                    <el-form-item label="排序" :required="true">
                        <el-input-number
                            v-model="form.sort"
                            controls-position="right"
                            :min="0"
                        ></el-input-number>
                    </el-form-item>
                    <br/>
                    <el-form-item
                        label="上传视频"
                        prop="fileUrl"
                        :required="true"
                    >
                        <el-upload
                            ref="videoUpload"
                            class="upload-demo"
                            :data="uploadData"
                            :action="uploadVideoUrl"
                            :on-success="handleSuccessmp4"
                            :on-change="onChange"
                            :before-upload="beforeUpload"
                            accept="video/mp4"
                            :multiple="false"
                            :limit="1"
                            :on-exceed="handleMore"
                            :on-remove="handleRemove"
                            :auto-upload="false"
                            :file-list="fileList">
                            <el-button
                                size="small"
                                v-if="form.fileUrl == undefined"
                                type="parmary">上传视频</el-button>
                            <el-button v-else size="small">替换视频</el-button>
                        </el-upload>
                    </el-form-item>
                    <br />
                    <el-form-item style="width: 100%;display: flex;justify-content: flex-end;">
                        <el-button @click="submitForm" type="primary"
                            >提交</el-button
                        >
                        <el-button @click="hiLoding">取消</el-button>
                    </el-form-item>
                </el-form>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import {
    masteGetCmsBigCoffeeVideoPageVo,
    masteDelCmsBigCoffeeVideo,
    vodUploadSignature,
    masteGetCmsBigCoffeeVideoDetailVo,
    masteUpdateCmsBigCoffeeVideo,
    masteAddCmsBigCoffeeVideo
} from "api/index.js";
import TcVod from "vod-js-sdk-v6";

export default {
    name: "course",
    components: {},
    data() {
        return {
            title:'',
            formInline: {
                name: undefined
            },
            form: {
                title: "",
                imgUrl: "",
                sort: 0,
                fileUrl: undefined,
                fileId: "",
                id: undefined
            },
            uploadVideoUrl: "",
            tableData: [],
            uploadData: {},
            fileList: [],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            centerDialogVisible: false,
            rules: {
                title: [
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur"
                    }
                ],
                imgUrl: [
                    {
                        required: true,
                        message: "请选择上传图片",
                        trigger: "blur"
                    }
                ],
                fileUrl: [
                    {
                        required: true,
                        message: "请选择上传视频",
                        trigger: "blur"
                    }
                ]
            },
            uploader: undefined,
            ischange: false
        };
    },
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + "60";
        }
    },
    watch: {},
    methods: {
        hiLoding() {
            this.centerDialogVisible = false;
            this.fileList = [];
            this.form.fileUrl = undefined;
            this.form.title = undefined;
            this.form.sort = 0;
            this.form.imgUrl = "";
            this.form.id = undefined;
            this.$message({
                type: "info",
                message: "已取消"
            });
        },
        // 获取数据
        getData() {
            let title = this.formInline.name;
            masteGetCmsBigCoffeeVideoPageVo(``, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                title
            }).then(res => {
                if (res.status == 200) {
                    console.log(res);
                    this.total = res.data.total;
                    this.tableData = res.data.list;
                }
            });
        },
        // 移除课程
        soldOut(val) {
            this.$confirm(`此操作将移除该课程, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    masteDelCmsBigCoffeeVideo(``, {
                        id: val.id
                    }).then(res => {
                        if (res.status === 200) {
                            this.$message.success("操作成功！");
                            this.getData();
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消"
                    });
                });
        },
        // 重置
        onReset() {
            this.$refs.formInline.resetFields();
            this.pageNum = 1;
            this.pageSize = 10;
            this.getData();
        },
        // 搜索
        onSubmit() {
            this.pageNum = 1;
            this.getData();
        },
        // 每页几条
        handleSizeChange(val) {
            this.pageSize = val;
            this.getData({ pageNum: this.pageNum, pageSize: this.pageSize });
        },
        // 前往第几页
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getData({ pageNum: this.pageNum, pageSize: this.pageSize });
        },
        // // 去编辑商品
        goUpdate(val) {
            this.$router.push({ name: "addCourse", query: val });
        },
        // 编辑/新增
        goDetails(val) {
            let then = this;
            then.centerDialogVisible = true;
            then.ischange = false;
            then.title='新增'
            if (!isNaN(val.id)) {
                then.ischange = true;
                masteGetCmsBigCoffeeVideoDetailVo("", {
                    id: val.id
                }).then(res => {
                    if (res.status === 200) {
                        then.title='编辑'
                        then.form.id = val.id
                        then.form.fileUrl = res.data.url
                        then.form.title = res.data.title
                        then.form.sort = res.data.sort
                        then.form.imgUrl = res.data.imgSrc
                        this.fileList.push({
                            name: res.data.url,
                            url: res.data.url
                        })
                    }
                });
            }
        },
        submitForm() {
            let then = this;
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (!isNaN(then.form.id)) {
                        masteUpdateCmsBigCoffeeVideo("", {
                            id: then.form.id,
                            imgSrc: then.form.imgUrl,
                            sort: then.form.sort,
                            title: then.form.title,
                            url: then.form.fileUrl
                        }).then(res => {
                            if (res.status == 200) {
                                this.$message.success("修改成功");
                                this.centerDialogVisible = false;
                                this.fileList = [];
                                this.form.fileUrl = undefined;
                                this.form.title = undefined;
                                this.form.sort = 0;
                                this.form.imgUrl = "";
                                this.form.id = undefined;
                                then.pageNum = 1;
                                then.getData();
                            }
                        }).catch(res=>{
                            this.$message({
                                    type: "info",
                                    message: "修改失败，请稍后再试"
                                });
                        })
                    } else {
                        console.log(then.form.imgUrl);
                        masteAddCmsBigCoffeeVideo("", {
                            imgSrc: then.form.imgUrl,
                            sort: then.form.sort,
                            title: then.form.title,
                            url: then.form.fileUrl
                        })
                            .then(res => {
                                if (res.status == 200) {
                                    this.$message.success("上传成功");
                                    this.centerDialogVisible = false;
                                    this.fileList = [];
                                    this.form.fileUrl = undefined;
                                    this.form.title = undefined;
                                    this.form.sort = 0;
                                    this.form.imgUrl = "";
                                    this.form.id = undefined;
                                    then.pageNum = 1;
                                    then.getData();
                                }
                            })
                            .catch(res => {
                                this.$message({
                                    type: "info",
                                    message: "上传失败，请稍后再试"
                                });
                            });
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        handleAvatarSuccess(res, file) {
            this.form.imgUrl = res.data;
        },
        handleSuccessmp4(val) {
            console.log(val);
        },
        // 文件超出
        handleMore() {
            return this.$message.error("请先删除下方列表中的文件！");
        },
        // 删除上传视频
        handleRemove(file, fileList) {
            this.uploader.cancel();
            this.form.fileUrl = undefined;
        },
        onChange(file) {
            // 文件改变
            var FileExt = file.name.replace(/.+\./, "");
            if (["mp4"].indexOf(FileExt.toLowerCase()) === -1) {
                this.$message({
                    type: "error",
                    message: "请上传后缀名为mp4的视频文件！"
                });
                this.fileList = [];
                return false;
            }
            if (file.status === "ready") {
                vodUploadSignature().then(res => {
                    if (res.status === 200) {
                        // this.flag = true;
                        // this.uploadFlag = false;
                        this.getUpload(file.raw, res.data);
                    }
                })
            }
        },
        // web 上传
        getUpload(file, sign) {
            // 通过 import 引入的话，new TcVod(opts) 即可
            // new TcVod.default(opts) 是 script 引入 的用法
            const that = this;
            const tcVod = new TcVod({
                getSignature: function() {
                    return sign
                    // return '123245'
                } // 前文中所述的获取上传签名的函数
            })
            that.uploader = tcVod.upload({
                mediaFile: file // 媒体文件（视频或音频或图片），类型为 File
            })
            that.uploader.on("media_upload", function(info) {
                // uploaderInfo.isVideoUploadSuccess = true
                // console.log(info)
            })
            that.uploader.on("media_progress", function(info) {})
            that.uploader.done().then(function(doneResult) {
                    // deal with doneResult
                    console.log(doneResult)
                    if (
                        doneResult.video.url === "" ||
                        doneResult.video.url === undefined ||
                        doneResult.video.url === null
                    ) {
                        // that.$message.error('视频上传失败，请重新上传')
                        // that.uploadFlag = true
                    } else {
                        that.form.fileUrl = doneResult.video.url;
                        that.form.fileId = doneResult.fileId;
                        localStorage.setItem("fileUrl", doneResult.video.url);
                        localStorage.setItem("fileId", doneResult.fileId);
                        // that.flag = false
                        // that.uploadFlag = false
                    }
                })
                .catch(function(err) {
                    console.log(err);
                    that.$message.error("视频上传失败，请重新上传" + err);
                    // that.uploadFlag = true
                    // alert('视频上传失败，请重新上传')
                    // that.flag = false
                });
        },
        // 上传之前的文件校验
        beforeUpload(file) {
            var FileExt = file.name.replace(/.+\./, "");
            if (["mp4"].indexOf(FileExt.toLowerCase()) === -1) {
                this.$message({
                    type: "warning",
                    message: "请上传后缀名为mp4的视频文件！"
                });
                return false;
            }
        }
    },
    created() {
        this.getData({ pageNum: this.pageNum, pageSize: this.pageSize });
    }
};
</script>
<style lang="stylus" scoped>
.image{
    width:100px;
    height:100px
}
/deep/.el-upload-list__item-name{
         width:200px !important
        }
.noWarp{
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

}
//@import url(); 引入公共css类
    .color
        color #1890FF
        cursor pointer
    .margin
        margin-left 10px
    .paging
        padding 20px 0
        text-align center
    .bg
        background #222222
        color #ffffff
    .course
        .conn
            padding 20px 14px
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
