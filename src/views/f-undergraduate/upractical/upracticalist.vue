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
                            @click="getDateList()"
                            >一键添加</el-button
                        >
                        <el-button type="" @click="foil" class="btn"
                            >返回</el-button
                        >
                        <!-- <el-button class="btn" size='small' @click="soldOut({ type: '2' })">批量下架</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableBox">
                <el-table
                    @selection-change="handleSelectionChange"
                    ref="multipleTable"
                    border
                    :data="tableData"
                    :header-cell-style="{ background: '#f5f5f5' }"
                    tooltip-effect="dark"
                    style="width: 100%"
                >
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column label="课程ID" align="center">
                        <template slot-scope="scope">{{
                            scope.row.id
                        }}</template>
                    </el-table-column>
                    <el-table-column align="center" label="课程图片">
                        <template slot-scope="scope">
                            <el-image
                                style="width: 40px; height: 40px"
                                :src="scope.row.coverUrl"
                                fit="cover"
                            ></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="课程名称"
                        show-overflow-tooltip
                        align="center"
                    >
                        <template slot-scope="scope">{{
                            scope.row.name
                        }}</template>
                    </el-table-column>
                    <el-table-column prop="price" align="center" label="价格">
                        <template slot-scope="scope">
                            <span
                                style="color: #A4503D"
                                v-if="scope.row.price > 0"
                                >￥{{ scope.row.price }}</span
                            >
                            <span style="color: #1890ff" v-else>免费</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="课程类型" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type == 1">单节视频课程</span>
                            <span v-if="scope.row.type == 2">单节直播课程</span>
                            <span v-if="scope.row.type == 3">系列视频课程</span>
                            <span v-if="scope.row.type == 4">系列直播课程</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="addTime"
                        align="center"
                        label="发布时间"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="startTime"
                        align="center"
                        label="开课时间"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="count"
                        label="学习人数"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <span
                                class="color"
                                style="color: #1890ff"
                                @click="getdataAdd([scope.row.id])"
                                >添加</span
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
                        :total="total"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { courseList, boutiqueAddEduCourseType } from "api/index.js";
export default {
    name: "course",
    components: {},
    data() {
        return {
            formInline: {
                name: undefined,
                categoryId1: undefined,
                categoryId2: undefined,
                type: undefined
            },
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            dataList: [],
            type:''
        };
    },
    computed: {},
    watch: {},
    methods: {
        // 获取数据
        getData() {
            let name = this.formInline.name;
            let categoryId1 = this.formInline.categoryId1;
            let categoryId2 = this.formInline.categoryId2;
            let type = this.formInline.type;
            // let startTime = this.formInline.dateValue[0]
            // let endTime = this.formInline.dateValue[1]
            courseList(``, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                name,
                categoryId1,
                categoryId2,
                type
            }).then(res => {
                if (res) {
                    this.total = res.data.total;
                    this.tableData = res.data.rows;
                    if (this.pageNum > 1 && this.tableData.length < 1) {
                        this.pageNum = this.pageNum - 1;
                        this.getData();
                    }
                }
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
        // 多选
        // handleSelectionChange(val) {
        //     this.multipleSelection = val
        // },

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
        //  获取商品
        getDateList() {
            let idList = [];
            this.dataList.forEach(res => {
                idList.push(res.id)
            });
            if (idList.length != 0) {
                this.$confirm(`此操作将添加该课程, 是否继续?`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                        boutiqueAddEduCourseType("", {
                            idList,
                            type: this.type
                        }).then(res => {
                            if (res.status == 200) {
                                this.$message.success("操作成功");
                            } else {
                                this.$message({
                                    type: "info",
                                    message: "操作失败"
                                });
                            }
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消"
                        });
                    });
            } else {
                this.$message({
                    type: "info",
                    message: "添加数据不能为空"
                });
            }
        },
        goTalk(val) {
            this.$router.push({ name: "courseTalk", query: val });
        },
        getdataAdd(idList) {
            boutiqueAddEduCourseType("", {
                idList,
                type: this.type
            }).then(res => {
                if (res.status == 200) {
                    this.$message.success("操作成功");
                } else {
                    this.$message({
                        type: "info",
                        message: "操作失败"
                    });
                }
            });
        },
        foil() {
            this.$router.push({ name: "upractical" });
        },
        handleSelectionChange(val) {
            this.dataList = val;
        }
    },
    created() {
        this.type=this.$route.query
        console.log(this.type)
        this.getData({ pageNum: this.pageNum, pageSize: this.pageSize });
    }
};
</script>
<style lang="stylus" scoped>
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
</style>
