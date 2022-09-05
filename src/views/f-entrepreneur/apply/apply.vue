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
                    <el-form-item label="姓名" prop="name">
                        <el-input
                            v-model="formInline.name"
                            placeholder="请输入"
                            class="phoneId"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input
                            v-model="formInline.phone"
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
                        <!-- <el-button class="btn" size='small' @click="soldOut({ type: '2' })">批量下架</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane
                    :label="`待处理(${total1})`"
                    name="first"
                ></el-tab-pane>
                <el-tab-pane
                    :label="`已处理(${total2})`"
                    name="second"
                ></el-tab-pane>
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
                    <el-table-column label="序号" align="center" width="80px" type="index" :index="indexMethod">
                    </el-table-column>
                    <el-table-column prop="userName" align="center" label="姓名">
                    </el-table-column>
                    <el-table-column
                        label="电话"
                        prop="phone" 
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column prop="enterpriseName" align="center" show-overflow-tooltip label="企业">
                    </el-table-column>
                    <el-table-column prop="email" align="center" label="邮箱">
                    </el-table-column>
                    <el-table-column prop="remark" align="center" label="备注">
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <span
                                v-if="activeName == 'first'"
                                class="color"
                                style="color: #ff0000"
                                @click="delData(scope.row.id)"
                                >处理</span
                            >
                            <span v-else class="color" style="color: #0169ab"
                                >已处理</span
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
                        :total="activeName === 'first' ? total1 : total2"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    updateCmsEnterpriseRegistrationFormStatus,
    getCmsEnterpriseRegistrationFormPage
} from "api/index.js";
export default {
    name: "boutique",
    components: {},
    data() {
        return {
            tableData: [], //列表
            tableData1: [], //未处理列表
            tableData2: [], //已处理列表
            formInline: {
                name: "",
                phone: ""
            },
            pageNum: 1,
            pageSize: 10,
            total1: 0,
            total2: 0,
            activeName: "first"
        };
    },
    computed: {},
    watch: {},
    methods: {
        indexMethod(index) {
            return index+1;
        },
        handleClick() {
            if (this.activeName === "first") {
                this.tableData = this.tableData1;
            } else {
                this.tableData = this.tableData2;
            }
            this.formInline.name = "";
            this.formInline.phone = "";
            this.pageNum = 1;
        },
        All() {
            let { pageNum, pageSize, formInline } = this;
            getCmsEnterpriseRegistrationFormPage("", {
                userName: formInline.name,
                pageNum,
                pageSize,
                phone: formInline.phone
            }).then(res => {
                if (res.status == 200) {
                    this.tableData1=[]
                    this.tableData2=[]
                    this.total2=0
                    this.total1=0
                    res.data.records.forEach(item => {
                        if (item.status === 0) {
                            this.tableData1.push(item)
                            this.total1 += 1
                        } else {
                            this.tableData2.push(item)
                            this.total2 += 1
                        }
                    })
                    if (this.activeName === "first") {
                        this.tableData = this.tableData1
                    } else {
                        this.tableData = this.tableData2
                    }
                }
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
            this.formInline.phone = "";
            this.All();
        },
        delData(id) {
            this.$confirm(`此操作将添加到已处理表单, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    updateCmsEnterpriseRegistrationFormStatus("", {
                        id
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
