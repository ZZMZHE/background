<template>
    <div class="uploadGoods">
        <div class="conn">
            <div class="title">基本信息</div>
            <el-divider></el-divider>
            <div class="formBox">
                <el-form :model="formInline" ref="formInline" label-width="110px" class="demo-form-inline" size="small">
                    <el-form-item label="商品标题：" prop="name" :required="true">
                        <el-input v-model="formInline.name" placeholder="请输入" show-word-limit maxlength="50" class="phoneId"></el-input>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="商品分类：" :required="true">
                        <el-select v-model="formInline.categoryId1" placeholder="请选择" @change="selectChange">
                            <el-option
                                v-for="(item, index) in categoryF"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <span style="padding: 0 10px">--</span>
                        <el-select v-model="formInline.categoryId2" placeholder="请选择">
                            <el-option
                                v-for="(item, index) in categoryS"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="商品封面：" prop="name" :required="true">
                        <el-upload
                            class="avatar-uploader"
                            :with-credentials="true"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="handleSuccess1">
                            <img v-if="formInline.smallCoverUrl" :src="formInline.smallCoverUrl" class="avatar3">
                            <i v-else class="el-icon-plus avatar-uploader-icon3"></i>
                        </el-upload>
                        <span style="color: red">建议上传300*400尺寸大小的图片</span>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="商品主图：" prop="name" :required="true">
                        <el-upload
                            :action="uploadUrl"
                            :with-credentials="true"
                            list-type="picture-card"
                            :limit="5"
                            :on-exceed="morePic"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                        <span style="color: red">750*750尺寸大小的图片</span>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="商品详情：" prop="name" class="richTxt" :required="true">
                        <wangedEdit :catchData="catchData" ref="text" class="wanged"></wangedEdit>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="商品信息设置:" prop="name" :required="true">
                        <div class="awardList">
                            <div class="awardBox" v-for="(item, index) in formInline.goodsProductParams" :key="index">
                                <div class="awardTop">
                                    <div class="awardLeft">
                                        <el-image
                                            style="width: 80px; height: 80px"
                                            :src="item.picUrl"
                                            fit="cover"></el-image>
                                    </div>
                                    <div class="awardRight">
                                        <!-- <p class="title">{{item.title}}</p> -->
                                        <p class="txt elp">规格：<span style="color: #108DE9;">{{item.specification}}</span></p>
                                        <p class="txt">售价：<span style="color: #108DE9;">{{item.price}}</span></p>
                                        <p class="txt">库存：<span style="color: #108DE9;">{{item.number}}</span></p>
                                    </div>
                                </div>
                                <div class="awardBottom">
                                    <div class="btnList">
                                        <div class="update" @click="updateSpecification({ index: index, type: '2' })">编辑</div>
                                        <div class="del" @click="remove({ index: index })">删除</div>
                                    </div>
                                </div>
                            </div>
                            <div class="addAward" v-if="formInline.goodsProductParams.length > 0">
                                <el-button type="primary" plain @click="openDiaAdd({ type: '1' })">添加商品规格信息</el-button>
                            </div>
                            <div v-else>
                                <el-button type="primary" plain @click="openDiaAdd({ type: '1' })">添加商品规格信息</el-button>
                            </div>
                        </div>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="商品参数设置:" prop="name" :required="true">
                        <div class="parameterList">
                            <div class="parameterBox" v-for="(item, index) in formInline.goodsAttributeParams" :key="index">
                                <div class="parameterTop">
                                    <div class="parameterRight">
                                        <!-- <p class="title">{{item.title}}</p> -->
                                        <p class="txt ele">参数名：<span style="color: #108DE9;">{{item.attribute}}</span></p>
                                        <p class="txt ele">参数值：<span style="color: #108DE9;">{{item.value}}</span></p>
                                    </div>
                                </div>
                                <div class="parameterBottom">
                                    <div class="btnList">
                                        <div class="update" @click="updateParams({ index: index, key: '2' })">编辑</div>
                                        <div class="del" @click="removeParams({ index: index })">删除</div>
                                    </div>
                                </div>
                            </div>
                            <div class="addparameter" v-if="formInline.goodsAttributeParams.length > 0">
                                <el-button type="primary" plain @click="openParamsDiaAdd({ key: '1' })">添加商品参数信息</el-button>
                            </div>
                            <div v-else>
                                <el-button type="primary" plain @click="openParamsDiaAdd({ key: '1' })">添加商品参数信息</el-button>
                            </div>
                        </div>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="商品简介：" prop="brief" :required="true">
                        <el-input
                            style="width: 25%"
                            type="textarea"
                            placeholder="请输入"
                            v-model="formInline.brief"
                            maxlength="200"
                            rows="4"
                            show-word-limit
                            >
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <!-- <el-divider></el-divider>
            <div class="addGoodsMessage">
                <el-button type="primary" plain size="small" @click="openDiaAdd">+ 添加商品信息</el-button>
            </div> -->
            <el-divider></el-divider>
            <div class="btnList">
                <el-button type="primary" size="small" @click="fabu">立即发布商品</el-button>
                <el-button size="small" @click="goBack">返回</el-button>
            </div>
        </div>
        <div class="dialogBox">
            <el-dialog :title="title" :visible.sync="dialogFormVisible" width="25%">
                <el-form :model="guigeData">
                    <el-form-item label="规格：" prop="specification" label-width="110px" :required="true">
                        <el-input v-model="guigeData.specification" placeholder="请输入" maxlength="25" class="phoneId"></el-input>
                    </el-form-item>
                    <el-form-item label="售价：" prop="price" label-width="110px" :required="true">
                        <el-input-number v-model="guigeData.price" controls-position="right" :min="0" ></el-input-number>
                    </el-form-item>
                    <el-form-item label="库存：" prop="number" label-width="110px" :required="true">
                        <el-input-number v-model="guigeData.number" controls-position="right" :min="1" :max="10000" ></el-input-number>
                    </el-form-item>
                    <el-form-item label="商品图片：" prop="picUrl" label-width="110px" :required="true">
                        <el-upload
                            class="avatar-uploader"
                            :with-credentials="true"
                            :action="uploadUrl1"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess">
                            <img v-if="guigeData.picUrl" :src="guigeData.picUrl" class="avatar3">
                            <i v-else class="el-icon-plus avatar-uploader-icon3"></i>
                        </el-upload>
                        <span style="color: red">建议上传230*203尺寸大小的图片</span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addGoodsMessage">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog :title="titleParams" :visible.sync="dialogFormVisibleParams" width="25%">
                <el-form :model="guigeDataParams">
                    <el-form-item label="参数名：" prop="attribute" label-width="110px" :required="true">
                        <el-input v-model="guigeDataParams.attribute" maxlength="25" placeholder="请输入" class="phoneId"></el-input>
                    </el-form-item>
                    <el-form-item label="参数值：" prop="value" label-width="110px" :required="true">
                        <el-input v-model="guigeDataParams.value" maxlength="25" placeholder="请输入" class="phoneId"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibleParams = false">取 消</el-button>
                    <el-button type="primary" @click="addGoodsParams">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>

import { goodsAdd, categoryGoodList } from 'api/index.js'

export default {
    name: 'uploadGoods',
    components: {
        wangedEdit: () => import('components/wanged-edit/wanged-edit')
    },
    data() {
        return {
            formInline: {
                name: '',
                categoryId1: '',
                categoryId2: '',
                gallery: [],
                detail: '',
                brief: '',
                goodsProductParams: [],
                goodsAttributeParams: [],
                smallCoverUrl: ''
            },
            categoryF: [],
            categoryS: [],
            dialogImageUrl: '',
            dialogVisible: false,
            dialogFormVisibleParams: false,
            guigeData: {
                specification: '',
                price: '',
                picUrl: '',
                number: ''
            },
            guigeDataParams: {
                attribute: '',
                value: '',
                sortOrder: 1
            },
            form: {
                name: '',
                name1: ''
            },
            formLabelWidth: '100px',
            dialogFormVisible1: false,
            dialogFormVisible: false,
            index: '',
            type: '',
            key: '',
            title: '',
            titleParams: '',
            falg: false,
            f: false,
            f1: false
        }
    },
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + '30'
        },
        uploadUrl1() {
            return this.$store.state.uploadUrl + '30'
        }
    },
    watch: {},
    methods: {
        getCategory() {
            categoryGoodList(``, { id: 0 }).then(res => {
                if (res.status === 200) {
                    this.categoryF = res.data
                }
            })
        },
        selectChange() {
            categoryGoodList(``, { id: this.formInline.categoryId1 }).then(res => {
                if (res.status === 200) {
                    this.categoryS = res.data
                }
            })
        },
        // 打开添加参数弹窗
        openParamsDiaAdd(val) {
            this.titleParams = '添加参数信息'
            this.guigeDataParams = {
                attribute: '',
                value: '',
                sortOrder: 1
            }
            this.key = val.key
            this.dialogFormVisibleParams = true
        },
        // 编辑弹窗
        updateParams(val) {
            this.key = val.key
            this.title = '修改参数信息'
            this.index = val.index
            this.guigeDataParams = {
                attribute: this.formInline.goodsAttributeParams[val.index].attribute,
                value: this.formInline.goodsAttributeParams[val.index].value,
                sortOrder: 1
            }
            this.dialogFormVisibleParams = true
        },
        // 删除信息
        removeParams(val) {
            this.$confirm('此操作将删除该参数, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.formInline.goodsAttributeParams.splice(val.index, 1)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        // 添加参数
        addGoodsParams() {
            if (!this.f) {
                this.f = true
                setTimeout(() => {
                    this.f = false
                }, 2000)
                if (this.key === '1') {
                    if (this.guigeDataParams.attribute === '' || this.guigeDataParams.value === '') {
                        return this.$message.error('请将参数信息填写完整')
                    }
                    this.formInline.goodsAttributeParams.push(this.guigeDataParams)
                    this.dialogFormVisibleParams = false
                } else if (this.key === '2') {
                    if (this.guigeDataParams.attribute === '' || this.guigeDataParams.value === '') {
                        return this.$message.error('请将参数信息填写完整')
                    }
                    this.formInline.goodsAttributeParams[this.index].attribute = this.guigeDataParams.attribute
                    this.formInline.goodsAttributeParams[this.index].value = this.guigeDataParams.value
                    this.dialogFormVisibleParams = false
                }
            }
        },
        // 打开添加弹窗
        openDiaAdd(val) {
            this.title = '添加规格信息'
            this.guigeData = {
                specification: '',
                price: 0,
                picUrl: '',
                number: 0
            }
            this.type = val.type
            this.dialogFormVisible = true
        },
        // 编辑弹窗
        updateSpecification(val) {
            this.type = val.type
            this.title = '修改规格信息'
            this.index = val.index
            this.guigeData = {
                specification: this.formInline.goodsProductParams[val.index].specification,
                price: this.formInline.goodsProductParams[val.index].price,
                number: this.formInline.goodsProductParams[val.index].number,
                picUrl: this.formInline.goodsProductParams[val.index].picUrl
            }
            this.dialogFormVisible = true
        },
        handleSuccess1(file) {
            this.formInline.smallCoverUrl = file.data
        },
        handleSuccess(file) {
            this.formInline.gallery.push(file.data)
        },
        handleRemove(file, fileList) {
            this.formInline.gallery.splice(this.formInline.gallery.indexOf(file.url), 1)
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        morePic() {
            return this.$message.error('最多上传五张主图')
        },
        // 富文本内容
        catchData(val) {
            this.formInline.detail = val
        },
        handleAvatarSuccess(res, file) {
            this.guigeData.picUrl = res.data
        },
        // 添加信息
        addGoodsMessage() {
            if (!this.f1) {
                this.f1 = true
                setTimeout(() => {
                    this.f1 = false
                }, 2000)
                if (this.type === '1') {
                    if (this.guigeData.specification === '' || this.guigeData.price === '' || this.guigeData.picUrl === '' || this.guigeData.number === '') {
                        return this.$message.error('请将规格信息填写完整')
                    }
                    // if (this.guigeData.number > 10000) {
                    //     return this.$message.error('库存不能大于10000')
                    // }
                    // if (this.guigeData.number < 1) {
                    //     return this.$message.error('库存不能小于1')
                    // }
                    this.formInline.goodsProductParams.push(this.guigeData)
                    this.dialogFormVisible = false
                } else if (this.type === '2') {
                    if (this.guigeData.specification === '' || this.guigeData.price === '' || this.guigeData.picUrl === '' || this.guigeData.number === '') {
                        return this.$message.error('请将规格信息填写完整')
                    }
                    // if (this.guigeData.number > 10000) {
                    //     return this.$message.error('库存不能大于10000')
                    // }
                    // if (this.guigeData.number < 1) {
                    //     return this.$message.error('库存不能小于1')
                    // }
                    this.formInline.goodsProductParams[this.index].specification = this.guigeData.specification
                    this.formInline.goodsProductParams[this.index].price = this.guigeData.price
                    this.formInline.goodsProductParams[this.index].number = this.guigeData.number
                    this.formInline.goodsProductParams[this.index].picUrl = this.guigeData.picUrl
                    this.dialogFormVisible = false
                }
            }
        },
        // 删除信息
        remove(val) {
            this.$confirm('此操作将删除该规格, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.formInline.goodsProductParams.splice(val.index, 1)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        // 发布商品
        fabu() {
            if (this.formInline.name === '' || this.formInline.gallery.length <= 0 || this.formInline.goodsProductParams.length <= 0 || this.formInline.detail === '' || this.formInline.goodsAttributeParams.length <= 0 || this.formInline.brief === '') {
                return this.$message.error('请将商品信息填写完整！')
            }
            // this.formInline.gallery = JSON.stringify(this.formInline.gallery)
            // this.formInline.gallery = this.formInline.gallery
            // console.log(this.formInline.gallery)
            if (!this.flag) {
                this.flag = true
                goodsAdd(``, this.formInline).then(res => {
                    if (res) {
                        this.$message.success('发布成功！')
                        this.$router.go(-1)
                    }
                })
                setTimeout(() => {
                    this.flag = false
                }, 2000)
            }
        },
        goBack() {
            this.$router.go(-1)
        }
    },
    created() {
        this.getCategory()
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
@import '../../../assets/css/upload3.css'; // 引入公共css类
    .ele
        width 256px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
    .elp
        width 160px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
    .disabled
        position absolute
        width 178px
        height 178px
        background rgba(0, 0, 0, 0)
        z-index 100
        cursor not-allowed !important
    .wanged >>> .w-e-text-container
        height: 250px !important
    .el-form-item >>> .el-form-item__label
        color #000 !important
    .uploadGoods
        .conn
            padding 20px 14px
            .title
                font-size 20px
                padding-left 20px
            .formBox
                .phoneId
                    width 20%
                .richTxt
                    width 600px
            .awardList
                overflow hidden
                .addAward
                    margin-top 95px
                    float left
                    margin-left 20px
                .awardBox
                    border 1px solid #ccc
                    width: 278px
                    height 200px
                    float left
                    margin 10px 10px
                    .awardTop
                        overflow hidden
                        .awardLeft
                            float left
                            margin 25px 8px
                        .awardRight
                            float left
                            margin 35px 0 10px 15px
                            p
                                line-height 30px
                            .txt
                                font-size 16px
                                span
                                    color #1890FF
                    .awardBottom
                        background #f7f9fa
                        border-top 1px solid #ccc
                        .btnList
                            height 58px
                            cursor pointer
                            .update
                                width 49%
                                line-height 58px
                                border-right 1px solid #ccc
                                float left
                                text-align center
                                color #8d8f8f
                            .del
                                width 50%
                                line-height 58px
                                float left
                                text-align center
                                color #ff3333
                            .del:hover, .update:hover
                                color #1890FF
            .parameterList
                overflow hidden
                .addparameter
                    margin-top 77px
                    float left
                    margin-left 20px
                .parameterBox
                    border 1px solid #ccc
                    width: 278px
                    height 164px
                    float left
                    margin 10px 10px
                    .parameterTop
                        overflow hidden
                        .parameterLeft
                            float left
                            margin 25px 8px
                        .parameterRight
                            float left
                            height 85px
                            margin-left 15px
                            margin-top 20px
                            p
                                line-height 30px
                            .txt
                                font-size 16px
                                span
                                    color #1890FF
                    .parameterBottom
                        background #f7f9fa
                        border-top 1px solid #ccc
                        .btnList
                            height 58px
                            cursor pointer
                            .update
                                width 49%
                                line-height 58px
                                border-right 1px solid #ccc
                                float left
                                text-align center
                                color #8d8f8f
                            .del
                                width 50%
                                line-height 58px
                                float left
                                text-align center
                                color #ff3333
                            .del:hover, .update:hover
                                color #1890FF
            .addGoodsMessage
                text-align center
                .el-button
                    width 250px
            .btnList
                text-align center
</style>
