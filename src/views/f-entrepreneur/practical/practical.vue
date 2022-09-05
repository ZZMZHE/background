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
                        <el-button
                            type=""
                            class="btn bg"
                            @click="search"
                            size="small"
                            >搜索</el-button
                        >
                        <el-button type="" class="btn" @click="reset"
                            >重置</el-button
                        >
                        <el-button
                            type=""
                            @click="start"
                            class="btn bg"
                            size="small"
                            >新增课程</el-button
                        >
                        <!-- <el-button class="btn" size='small' @click="soldOut({ type: '2' })">批量下架</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                   <el-tab-pane label="实训课程" name="first"></el-tab-pane>
                   <el-tab-pane label="推荐课程" name="second"></el-tab-pane>
            </el-tabs>
               <div class="tableBox">
                <el-table
                    ref="multipleTable"
                    border
                    :data="tableData"
                    :header-cell-style="{ background: '#f5f5f5' }"
                    tooltip-effect="dark"
                    style="width: 100%"
                >
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
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <span
                                class="color"
                                style="color: #ff0000"
                                @click="delData(scope.row.id)"
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
                        :total="total"
                    >
                    </el-pagination>
                </div>
            </div>  
        </div>
    </div>
</template>

<script>
import {
    boutiqueDelEduCourseType,
    boutiqueGetEduCourseTypePage
} from "api/index.js";
export default {
    name: "boutique",
    components: {},
    data() {
        return {
            tableData: [], //列表
            recommendList: [], //列表
            formInline: {
                name: ""
            },
            pageNum: 1,
            pageSize: 10,
            total: null,
            activeName: 'first',
            type:2
        };
    },
    computed: {},
    watch: {},
    methods: {
        handleClick() {
            if(this.activeName==='second'){
                this.type=4
            }else{
              this.type=2  
            }
         this.formInline.name=''
         this.pageNum=1
         this.All()

      },
        All() {
            let { pageNum, pageSize, formInline ,type} = this;
            boutiqueGetEduCourseTypePage("", {
                name: formInline.name,
                pageNum,
                pageSize,
                type
            }).then(res => {
                console.log(res);
                this.tableData = res.data.list;
                this.total = res.data.total;
            });
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.All();
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.All();
        },
        search() {
            this.All();
        },
        reset() {
            this.formInline.name = "";
            this.All();
        },
        start() {
            this.$router.push({ name: "practicalist" ,query:this.type});
        },
        delData(id) {
            this.$confirm(`此操作将移除该课程, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    boutiqueDelEduCourseType("", {
                        id,
                        type:this.type
                    }).then(res => {
                        if (res.status == 200) {
                            this.$message.success("操作成功");
                            this.All();
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
        }
    },
    created() {
        this.All();
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
