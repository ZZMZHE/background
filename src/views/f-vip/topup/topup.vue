<template>
    <div class="topup">
        <div class="conn">
            <div class="topupList">
                <div class="topupBox btnAdd" @click="openDia">
                    <div class="addTopup">
                        + 新增充值
                    </div>
                </div>
                <div class="topupBox" v-for="(item, index) in topupData" :key="index">
                    <i class="icon el-icon-delete" @click="del({ id: item.id })"></i>
                    <div class="topupLeft">
                        <!-- <el-image
                            style="width: 100px; height: 100px"
                            :src="require('../../../assets/images/dou.png')"
                            fit="fit"></el-image> -->
                    </div>
                    <div class="topupRight">
                        <!-- font-weight: 900 -->
                        <div class="txt">虚拟币：<span style="color: #000000;">{{item.asset.toFixed(0)}}</span></div>
                        <div class="txt">RMB：<span>{{item.actualPrice}}</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dialogBox">
            <el-dialog title="新增充值" :visible.sync="dialogFormVisible" width="25%">
                <el-form :model="form">
                    <el-form-item label="所需RMB：" :label-width="formLabelWidth" :required="true">
                        <el-input-number v-model="form.rmb" :step-strictly="true" :step="0.1" controls-position="right" @change="handleChangeCondition" :min="1" :max="10000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="到账虚拟币：" :label-width="formLabelWidth" :required="true">
                        <el-input-number v-model="form.fdou" :step-strictly="true" :step="1" controls-position="right" @change="handleChangeCondition" :min="1" :max="50000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="产品ID：" :label-width="formLabelWidth">
                        <el-input v-model="form.productId" style="width:180px" placeholder="请输入产品id"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submit">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { rechargeSettingList, rechargeSettingAdd, rechargeSettingDelete } from 'api/index.js'
export default {
    name: 'topup',
    components: {},
    data() {
        return {
            form: {
                rmb: '',
                fdou: '',
                productId: ''
            },
            topupData: [],
            formLabelWidth: '110px',
            dialogFormVisible: false,
            f: false
        }
    },
    filters: {
        getNum(num) {
            let numStr = String(num)
            if (numStr.length <= 4) {
                return numStr
            } else if (numStr > 4) {
                return parseFloat(num / 10000) + 'W'
            }
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 获取充值列表
        getData() {
            rechargeSettingList().then(res => {
                if (res) {
                    this.topupData = res.data
                }
            })
        },
        openDia() {
            this.form.fdou = 1
            this.form.rmb = 1
            this.form.productId = ''
            this.dialogFormVisible = true
        },
        // 添加确定
        submit() {
            let asset = this.form.fdou
            let actualPrice = this.form.rmb
            let productId = this.form.productId
            if (!this.f) {
                this.f = true
                rechargeSettingAdd(``, { asset, actualPrice, productId }).then(res => {
                    if (res) {
                        this.$message.success('添加成功！')
                        this.dialogFormVisible = false
                        this.form.fdou = 1
                        this.form.rmb = 1
                        this.getData()
                    }
                })
                setTimeout(() => {
                    this.f = false
                }, 2000)
            }
        },
        // 删除
        del(val) {
            this.$confirm('此操作将删除该充值, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                rechargeSettingDelete(``, { id: val.id }).then(res => {
                    if (res) {
                        this.$message.success('删除成功！')
                        this.getData()
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        handleChangeCondition() {}
    },
    created() {
        this.getData()
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    .topup
        .conn
            padding 20px 10px
            .topupList
                overflow hidden
                .btnAdd:hover
                    cursor pointer
                    .addTopup
                        color #0066FF
                .topupBox
                    position relative
                    overflow hidden
                    width 18%
                    height 150px
                    border 1px solid #e9e9e9
                    box-shadow 0px 0px 4px rgba(0, 0, 0, .15)
                    float left
                    margin 10px
                    text-align right
                    .icon
                        margin 10px 15px 0 0
                        font-size 20px
                    .icon:hover
                        cursor pointer
                        color red
                    .addTopup
                        position absolute
                        font-size 16px
                        color #929292
                        top 50%
                        left 50%
                        margin-left -44px
                        margin-top -8px
                    .topupLeft
                        position absolute
                        top 30px
                        left 10px
                    .topupRight
                        // position absolute
                        // top 30px
                        // left 125px
                        width 100%
                        height 100%
                        text-align center
                        .txt
                            font-size 16px
                            color #929292
                            margin-top 20px
                            span
                                color #0066FF

</style>
