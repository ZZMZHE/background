<template>
    <div class="regUpload">
        <div class="conn">
            <div class="header">
                <!-- <el-button size="small" @click="goDetails({ type: 1 })" class="btn">新增</el-button> -->
                <!-- <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small">
                    <el-form-item label="所属范围：" prop="range">
                        <el-select v-model="formInline.range" placeholder="请选择" >
                            <el-option v-for="item in citys" :key="item.provinceId" :label="item.province" :value="item.provinceId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" class="btn">搜索</el-button>
                        <el-button type="" @click="onReset('formInline')" class="btn">重置</el-button>
                    </el-form-item>
                </el-form> -->
            </div>
            <div class="tableBox">
                <el-table
                    :data="tableData"
                    border
                    tooltip-effect="dark"
                    :header-cell-style="{background:'#f5f5f5'}"
                    style="width: 100%"
                    >
                    <el-table-column
                        prop="id"
                        align="center"
                        label="id">
                    </el-table-column>
                    <el-table-column
                        label="主图"
                        align="center">
                        <template slot-scope="scope">
                            <el-image
                                style="width: 40px; height: 90px"
                                :src="scope.row.coverUrl"
                                fit="cover">
                                </el-image>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                        prop="details"
                        label="图文详情"
                        align="center">
                        <template slot-scope="scope">
                            <span class="els" v-html="scope.row.details"></span>
                            <span style="color: #7F0319;cursor: pointer;">[查看详情]</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        label="操作"
                        align="center">
                        <template slot-scope="scope">
                            <span class="color" style="color: #7F0319" @click="goDetails({ id: scope.row.id, type: 2 })">编辑</span>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 hide-on-single-page-->
                <!-- <div class="paging">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        background
                        layout="total, prev, pager, next, sizes, jumper"
                        :total="total">
                    </el-pagination>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import { cmsLoginImgInfo } from 'api/index.js'
export default {
    name: 'regUpload',
    components: {},
    data() {
        return {
            // pageNum: '1',
            // pageSize: '10',
            // total: 10,
            tableData: []
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取数据
        getData(val) {
            cmsLoginImgInfo().then(res => {
                if (res.status === 200) {
                    let obj = {
                        id: res.data.id,
                        coverUrl: res.data.coverUrl
                    }
                    this.tableData.push(obj)
                }
            })
        },
        // 点击查看
        goDetails(val) {
            this.$router.push({ name: 'regUploadDetails', query: val })
        }
    },
    created() {
        this.getData()
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    .color
        color #1890FF
        cursor pointer
    .margin
        margin-left 10px
    .paging
        padding 20px 0
        text-align center
    .els
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        display inline-block
        width 100px
        vertical-align: middle
    .regUpload
        .conn
            padding 20px 14px
            .header
                background #ffffff
                .btn
                    background #C3C3C3
                    color #fff
                    margin 10px
</style>
