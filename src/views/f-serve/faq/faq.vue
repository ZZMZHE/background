<template>
    <div class="faq">
        <div class="conn">
            <div class="tableBox">
                <el-table
                    :data="tableData"
                    border
                    tooltip-effect="dark"
                    :header-cell-style="{background:'#f5f5f5'}"
                    style="width: 100%"
                    >
                    <el-table-column
                        prop="issue"
                        align="center"
                        show-overflow-tooltip
                        label="主题">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="200px"
                        align="center">
                        <template slot-scope="scope">
                            <span class="color" @click="goDetails({ id: scope.row.id })">编辑</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>

import { cmsHelpList } from 'api/index.js'

export default {
    name: 'faq',
    components: {},
    data() {
        return {
            pageNum: 1,
            pageSize: 10,
            tableData: []
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取数据
        getData() {
            cmsHelpList(``, {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                if (res.status === 200) {
                    this.tableData = res.data.rows
                }
            })
        },
        goDetails(val) {
            this.$router.push({ name: 'faqDetails', query: val })
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
        color #7F0319
        cursor pointer
    .faq
        .conn
            background #ffffff
            margin 20px 14px
            .tableBox
                padding 20px 80px
</style>
