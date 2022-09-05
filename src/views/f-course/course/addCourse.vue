<template>
    <div class="orderDetails">
        <div class="conn">
            <div class="head">
                <div class="title" v-if="type == 1">新增课程：</div>
                <div class="title" v-if="type == 2">编辑课程：</div>
                <div class="btnList">
                    <el-button v-if="type == 1" plain size="small" class="back bg" @click="grant">发布课程</el-button>
                    <el-button v-if="type == 2" plain size="small" class="back bg" @click="grant">保存编辑</el-button>
                    <el-button plain size="small" class="back" @click="goBack">返回上一页</el-button>
                </div>
            </div>
            <div class="formBox">
                <el-form ref="form" :model="courseData" label-width="160px" label-position="right" class="form" size="small">
                    <el-form-item label="课程种类：" :required="true">
                        <el-select v-model="courseData.type" placeholder="请选择" :disabled="type == 2" @change="changeType">
                            <el-option label="单节视频课程" value="1"></el-option>
                            <el-option label="单节直播课程" value="2"></el-option>
                            <el-option label="系列视频课程" value="3"></el-option>
                            <el-option label="系列直播课程" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="课程名称：" :required="true">
                        <el-input class="couName" v-model="courseData.name" show-word-limit maxlength="15" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="主讲人：" :required="true">
                        <el-input class="couName" v-model="courseData.teacherName" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="logo：" prop="name" :required="true">
                        <el-upload
                            class="avatar-uploader"
                            :with-credentials="true"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="handleSuccess">
                            <img v-if="courseData.coverUrl" :src="courseData.coverUrl" class="avatar3">
                            <i v-else class="el-icon-plus avatar-uploader-icon3"></i>
                        </el-upload>
                        <span style="color: red">建议上传305*207尺寸大小的图片,比例3:2</span>
                    </el-form-item>
                    <el-form-item label="详情图：" prop="name" :required="true">
                        <el-upload
                            class="avatar-uploader"
                            :with-credentials="true"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="handleSuccess1">
                            <img v-if="courseData.unitCoverUrl" :src="courseData.unitCoverUrl" class="avatar3">
                            <i v-else class="el-icon-plus avatar-uploader-icon3"></i>
                        </el-upload>
                        <span style="color: red">建议上传750*489尺寸大小的图片</span>
                    </el-form-item>
                    <el-form-item label="所属类目：" :required="true">
                        <el-select v-model="courseData.categoryId1" placeholder="请选择" @change="selectChange">
                            <el-option
                                v-for="(item, index) in categoryCourseList"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <span style="padding: 0 10px">--</span>
                        <el-select v-model="courseData.categoryId2" placeholder="请选择" @change="selectChange2">
                            <el-option
                                v-for="(item, index) in categoryCourseList2"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <span style="padding: 0 10px">--</span>
                       <el-select v-model="courseData.categoryId3" placeholder="请选择">
                            <el-option
                                v-for="(item, index) in categoryCourseList3"
                                :key="index"
                                :label="item.englishName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!--maxlength="200" <el-form-item label="课程简介：" class="richTxt">
                        <wangedEdit :catchData="catchData" ref="text" class="wanged"></wangedEdit>
                    </el-form-item> -->
                    <el-form-item label="课程简介：" :required="true">
                         <el-input
                            style="width: 25%"
                            type="textarea"
                            placeholder="请输入"
                            v-model="courseData.description"
                            rows="4"
                            show-word-limit
                            >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="价格：" :required="true">
                        <el-input-number placeholder="请输入" v-model="courseData.price" controls-position="right" :min="0"></el-input-number>
                    </el-form-item>

                    <el-form-item label="助教老师：" v-if="courseData.type == 3 || courseData.type == 4" :required="true">
                        <div class="box">
                            <div class="taecherBox" v-for="(item, index) in selectTeacherListHelp" :key="index">
                                <i class="el-icon-error" @click="delTeacherHelp(index)"></i>
                                <div class="imgBox">
                                    <img :src="item.faceUrl" alt="">
                                </div>
                                <div class="name">{{item.nickname}}</div>
                            </div>
                            <div class="btnBox">
                                <div v-if="selectTeacherListHelp.length > 0" class="listAdd list" @click="teacherListAddHelp">列表添加</div>
                                <div v-else class="listAdd list" style="margin-top: 0px" @click="teacherListAddHelp">列表添加</div>
                                <!-- <div class="listAdd oneself">自定义添加</div> -->
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="开课时间：" :required="true">
                        <el-date-picker
                            v-model="courseData.startTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm:SS" >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="预计学习时间：" :required="true">
                        <el-input-number placeholder="请输入" v-model="courseData.predictStudyTime" controls-position="right" :min="1" :max="100"></el-input-number> 周
                    </el-form-item>
                    <el-form-item label="课程详情：" style="width: 900px" :required="true">
                       <wangedEdit :catchData="catchData" ref="text" class="wanged"></wangedEdit>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" class="back bg" @click="addCatalog(1, 1)">新增目录</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableBox">
                <el-table
                    :data="courseData.eduCourseDirectoryParams"
                    :header-cell-style="{background:'#f5f5f5'}"
                    style="width: 100%">
                    <el-table-column type="expand">
                        <!-- slot-scope="props" -->
                        <template slot-scope="scope">
                            <el-table
                                border
                                :header-cell-style="{background:'#f5f5f5'}"
                                :data="scope.row.eduCourseUnitParams"
                                style="width: 100%">
                                <!-- <el-table-column
                                    align="center"
                                    label="课程图片">
                                    <template slot-scope="scope">
                                        <el-image
                                        style="width: 40px; height: 40px"
                                        :src="scope.row.coverUrl"
                                        fit="cover"></el-image>
                                    </template>
                                </el-table-column> -->
                                <el-table-column
                                    label="课程名称"
                                    show-overflow-tooltip
                                    align="center">
                                    <template slot-scope="scope">{{ scope.row.name }}</template>
                                </el-table-column>
                                <el-table-column
                                    prop="freePreview"
                                    align="center"
                                    label="是否免费预览">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.freePreview == 1">是</span>
                                        <span v-if="scope.row.freePreview == 0">否</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="课程类型"
                                    align="center">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.contentType == 1">视频</span>
                                        <span v-if="scope.row.contentType == 6">直播</span>
                                        <span v-if="scope.row.contentType == 7">录播</span>
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column
                                    prop="categoryName1"
                                    align="center"
                                    label="所属类目">
                                </el-table-column> -->
                                <el-table-column
                                    v-if="courseData.type == 4 || courseData.type == 2"
                                    prop="startTime"
                                    align="center"
                                    label="开始时间">
                                </el-table-column>
                                <el-table-column
                                    v-if="courseData.type == 4 || courseData.type == 2"
                                    prop="endTime"
                                    align="center"
                                    label="结束时间">
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                label="操作">
                                <!-- slot-scope="props" -->
                                    <template slot-scope="props">
                                        <span v-if="type == 1">
                                            <span class="color margin" @click="openAddCouserDia(scope.$index, 2, props.row, props.$index)">编辑</span>
                                            <span class="color margin" @click="delCourse(props.$index, scope.$index)">删除</span>
                                        </span>
                                        <span v-if="type == 2">
                                            <span v-if="props.row.contentType == 6 && props.row.liveStatus == 0">
                                                <span class="color margin" @click="openAddCouserDia(scope.$index, 2, props.row, props.$index)">编辑</span>
                                            </span>
                                            <span v-if="props.row.contentType == 1">
                                                <span class="color margin" @click="openAddCouserDia(scope.$index, 2, props.row, props.$index)">编辑</span>
                                            </span>
                                            <!-- <span v-if="!props.row.id" class="color margin" @click="openAddCouserDia(scope.$index, 2, props.row, props.$index)">编辑</span> v-if="!props.row.id"-->
                                            <span  class="color margin" @click="delCourse(props.$index, scope.$index)">删除</span>
                                        </span>
                                    </template>
                                 </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="目录名称"
                        show-overflow-tooltip
                        prop="name">
                    </el-table-column>
                    <el-table-column
                        label="目录序位"
                        prop="sortOrder">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <!-- slot-scope="props" -->
                        <template slot-scope="scope">
                            <span class="color margin" @click="openAddCouserDia(scope.$index, 1, scope.row)">新增</span>
                            <span class="color margin" @click="addCatalog(scope.$index, 2, scope.row)">编辑</span>
                            <span v-if="!scope.row.id" class="color margin" @click="delCatalog(scope.$index)">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="dialogBox">
            <el-dialog :title="courseTit" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                <el-form :model="courseForm" label-width="95px">
                    <el-form-item label="课程标题：" :required="true">
                        <el-input class="couName" v-model="courseForm.name" maxlength="25" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间：" v-if="courseData.type == 2 || courseData.type == 4" :required="true">
                        <el-date-picker
                            v-model="courseForm.startTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm:SS" >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间：" v-if="courseData.type == 2 || courseData.type == 4" :required="true">
                        <el-date-picker
                            v-model="courseForm.endTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm:SS" >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="免费预览：" v-if="courseData.type == 3 || courseData.type == 4" :required="true">
                        <el-select v-model="courseForm.freePreview" placeholder="请选择">
                            <el-option label="否" value="0"></el-option>
                            <el-option label="是" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内容类型：" :required="true">
                        <el-select v-model="courseForm.contentType" placeholder="请选择">
                            <el-option v-if="courseData.type == 3 || courseData.type == 1" label="视频" value="1"></el-option>
                            <el-option v-if="courseData.type == 4 || courseData.type == 2" label="直播" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="序位：" :required="true">
                        <el-input-number placeholder="请输入" v-model="courseForm.sortOrder" controls-position="right" :min="1"></el-input-number>
                    </el-form-item>
                    <el-form-item label="添加老师：" :required="true">
                        <div class="box">
                            <div class="taecherBox" v-for="(item, index) in selectTeacherList" :key="index">
                                <i class="el-icon-error" @click="delTeacher(index)"></i>
                                <div class="imgBox">
                                    <img :src="item.faceUrl" alt="">
                                </div>
                                <div class="name">{{item.nickname}}</div>
                            </div>
                            <div class="btnBox">
                                <div v-if="selectTeacherList.length > 0" class="listAdd list" @click="teacherListAdd">列表添加</div>
                                <div v-else class="listAdd list" style="margin-top: 0px" @click="teacherListAdd">列表添加</div>
                                <!-- <div class="listAdd oneself">自定义添加</div> -->
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="上传视频：" v-if="courseForm.contentType != 6" :required="true">
                        <!--
                            data=""
                         -->
                        <el-upload
                            ref="videoUpload"
                            class="upload-demo"
                            :data="uploadData"
                            :action="uploadVideoUrl"
                            :on-change="handleChange"
                            :before-upload="beforeUpload"
                            :on-success="handleSuccessmp4"
                            :on-remove="handleRemove"
                            :on-exceed="handleMore"
                            :limit="1"
                             accept="video/mp4"
                            :multiple="false"
                            :auto-upload="false"
                            :file-list="fileList">
                            <el-button v-if="courseData.fileUrl == undefined" size="small">上传视频</el-button>
                            <el-button v-else size="small">替换视频</el-button>
                            <div slot="tip" style="color: red" v-if="uploadFlag">视频上传失败，请重新上传</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="上传进度：" v-if="progressFlag" :required="true">
                        <el-progress style="margin-top: 12px" :percentage="progress" :format="format"></el-progress>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="onQuXiao">取 消</el-button>
                    <el-button type="primary" @click="quedingAddCouser">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog :title="catelogTit" :visible.sync="dialogFormVisible1" width="30%" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                <el-form :model="catalogForm" label-width="95px">
                    <el-form-item label="目录名称：" :required="true">
                        <el-input style="max-width: 300px" class="couName" maxlength="30" v-model="catalogForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="目录序位：" :required="true">
                        <el-input-number placeholder="请输入" v-model="catalogForm.sortOrder" controls-position="right" :min="1"></el-input-number>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="quedingAddCatalog">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="添加老师" :visible.sync="dialogFormVisible2" width="60%" key="1" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                <el-form>
                    <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small">
                        <el-form-item label="名称" prop="nickname">
                            <el-input v-model="formInline.nickname" placeholder="请输入" class="phoneId"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="mobile">
                            <el-input v-model="formInline.mobile" placeholder="请输入" class="phoneId"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="" @click="onSubmit" class="btn bg">搜索</el-button>
                            <el-button type="" @click="onReset('formInline')" class="btn">重置</el-button>
                            <!-- <el-button type="" class="btn bg" size='small' @click="goGrant({ type: 1 })">发放优惠券</el-button> -->
                            <!-- <el-button class="btn" size='small' @click="soldOut({ type: '2' })">批量下架</el-button> -->
                        </el-form-item>
                    </el-form>
                    <el-table
                        ref="multipleTable"
                        :data="teacherTableList"
                        :header-cell-style="{background:'#f5f5f5'}"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        >
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="头像">
                            <template slot-scope="scope">
                                <el-image
                                style="width: 40px; height: 40px"
                                :src="scope.row.faceUrl"
                                fit="cover"></el-image>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="名称"
                            show-overflow-tooltip
                            align="center">
                            <template slot-scope="scope">{{ scope.row.nickname }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            align="center"
                            label="手机号">
                            <template slot-scope="scope">
                                <span style="color: #A4503D">{{ scope.row.mobile }}</span>
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
                            :total="total">
                        </el-pagination>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="quxiaoAddTeacher">取 消</el-button>
                    <el-button type="primary" @click="quedingAddTeacher">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="添加助教老师" :visible.sync="dialogFormVisible3" width="60%" key="2" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
                <el-form>
                    <el-form :inline="true" :model="formInlineHelp" ref="formInlineHelp" class="demo-form-inline" size="small">
                        <el-form-item label="名称" prop="nickname">
                            <el-input v-model="formInlineHelp.nickname" placeholder="请输入" class="phoneId"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="mobile">
                            <el-input v-model="formInlineHelp.mobile" placeholder="请输入" class="phoneId"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="" @click="onSubmitHelp" class="btn bg">搜索</el-button>
                            <el-button type="" @click="onResetHelp('formInline')" class="btn">重置</el-button>
                            <!-- <el-button type="" class="btn bg" size='small' @click="goGrant({ type: 1 })">发放优惠券</el-button> -->
                            <!-- <el-button class="btn" size='small' @click="soldOut({ type: '2' })">批量下架</el-button> -->
                        </el-form-item>
                    </el-form>
                    <el-table
                        ref="multipleTableHelp"
                        :data="teacherTableListHelp"
                        :header-cell-style="{background:'#f5f5f5'}"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChangeHelp"
                        >
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="头像">
                            <template slot-scope="scope">
                                <el-image
                                style="width: 40px; height: 40px"
                                :src="scope.row.faceUrl"
                                fit="cover"></el-image>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="名称"
                            show-overflow-tooltip
                            align="center">
                            <template slot-scope="scope">{{ scope.row.nickname }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            align="center"
                            label="手机号">
                            <template slot-scope="scope">
                                <span style="color: #A4503D">{{ scope.row.mobile }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 hide-on-single-page-->
                    <div class="paging">
                        <el-pagination
                            @size-change="handleSizeChangeHelp"
                            @current-change="handleCurrentChangeHelp"
                            background
                            layout="total, prev, pager, next, sizes, jumper"
                            :total="totalHelp">
                        </el-pagination>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="quxiaoAddTeacherHelp">取 消</el-button>
                    <el-button type="primary" @click="quedingAddTeacherHelp">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
// uploadSignature,
import { courseAdd, categoryCourseList, teacherList, courseInfo, eduTeacherAssistList, vodUploadSignature } from 'api/index.js'
import TcVod from 'vod-js-sdk-v6'
import { cmsLoginImgInfo } from '../../../api'

export default {
    name: 'orderDetails',
    components: {
        wangedEdit: () => import('components/wanged-edit/wanged-edit')
    },
    data() {
        return {
            courseData: {
                detail: undefined, // 课程详情
                eduCourseDirectoryParams: [], // 目录
                // teacherIds: [], // 老师
                teacherName: undefined,
                assistantIds: [], // 助教老师
                categoryId1: undefined,
                categoryId2: undefined,
                categoryId3: undefined,
                id: undefined,
                type: undefined,
                name: undefined,
                coverUrl: undefined,
                unitCoverUrl: undefined,
                startTime: undefined,
                price: undefined,
                description: undefined,
                predictStudyTime: undefined
            },
            catalogForm: { // 课程目录
                name: '',
                sortOrder: '',
                eduCourseUnitParams: [] // 课程
            },
            catelogTit: '新增目录',
            courseTit: '新增课程',
            courseForm: {
                teacherId: undefined, // 老师
                teacherName: undefined,
                faceUrl: undefined,
                contentType: undefined,
                name: undefined,
                freePreview: undefined,
                fileUrl: undefined,
                fileId: undefined,
                durationSeconds: undefined,
                sortOrder: undefined,
                startTime: undefined,
                endTime: undefined
            },
            formInline: { // 添加老师搜索form
                nickname: undefined,
                mobile: undefined
            },
            multipleSelection: [], // 表格多选
            teacherTableList: [],
            selectTeacherList: [], // 选中的老师
            formInlineHelp: { // 添加老师搜索form
                nickname: undefined,
                mobile: undefined
            },
            multipleSelectionHelp: [], // 表格多选
            teacherTableListHelp: [],
            selectTeacherListHelp: [], // 选中的老师
            categoryCourseList: [],
            categoryCourseList2: [],
            categoryCourseList3: [],
            fileList: [],
            dialogFormVisible: false, // 课程
            dialogFormVisible1: false, // 目录
            dialogFormVisible2: false, // 老师
            dialogFormVisible3: false, // 助教老师
            id: '',
            type: '',
            pageNum: 1,
            pageSize: 10,
            total: 10,
            pageNumHelp: 1,
            pageSizeHelp: 10,
            totalHelp: 10,
            tableIndex: '', // 表格点击的下标
            updateCatelogIndex: '',
            updateCatelogType: '',
            updateCouserType: '',
            sonIndex: '',
            isUpdateCourse: true,
            time: Date.parse(new Date()),
            uploadData: {},
            uploadVideoUrl: '',
            eduTeacherVo: [],
            uploader: undefined,
            keys: 1,
            progress: 0,
            progressFlag: false,
            flag: false, // 是否调用上传
            mFlag: false, // 目录点击
            cFlag: false,
            uploadFlag: false
        }
    },
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + '34'
        }
    },
    watch: {},
    methods: {
        // 富文本内容
        catchData(val) {
            this.courseData.detail = val
        },
        // 类型选择切换
        changeType() {
            if (this.type.toString() === '1') {
                this.courseData.eduCourseDirectoryParams = []
            }
        },
        // 总数据
        format(percentage) {
            return percentage + '%'
        },
        // web 上传
        getUpload(file, sign) {
            // 通过 import 引入的话，new TcVod(opts) 即可
            // new TcVod.default(opts) 是 script 引入 的用法
            const that = this
            const tcVod = new TcVod({
                getSignature: function () {
                    return sign
                    // return '123245'
                } // 前文中所述的获取上传签名的函数
            })
            that.uploader = tcVod.upload({
                mediaFile: file // 媒体文件（视频或音频或图片），类型为 File
            })
            that.uploader.on('media_progress', function(info) {
                // console.log(info.percent) // 进度
                that.progress = (info.percent * 100).toFixed(2)
                that.progress = parseFloat(that.progress)
                if (that.progress > 0.00 && that.progress < 100.00) {
                    that.progressFlag = true
                } else if (that.progress === 100.00) {
                    setTimeout(() => {
                        that.progressFlag = false
                    }, 500)
                }
            })
            that.uploader.on('media_upload', function(info) {
                // uploaderInfo.isVideoUploadSuccess = true
                // console.log(info)
            })
            // 回调结果说明
            // type doneResult = {
            //   fileId: string,
            //   video: {
            //     url: string
            //   },
            //   cover: {
            //     url: string
            //   }
            // }
            that.uploader.done().then(function (doneResult) {
                // deal with doneResult
                console.log(doneResult)
                if (doneResult.video.url === '' || doneResult.video.url === undefined || doneResult.video.url === null) {
                    // that.$message.error('视频上传失败，请重新上传')
                    that.uploadFlag = true
                } else {
                    that.courseForm.fileUrl = doneResult.video.url
                    that.courseForm.fileId = doneResult.fileId
                    localStorage.setItem('fileUrl', doneResult.video.url)
                    localStorage.setItem('fileId', doneResult.fileId)
                    that.flag = false
                    that.uploadFlag = false
                }
            }).catch(function (err) {
                that.$message.error('视频上传失败，请重新上传' + err)
                that.uploadFlag = true
                // alert('视频上传失败，请重新上传')
                that.flag = false
            })
        },
        // 获取课程类目列表
        getCourseCateList() {
            categoryCourseList(``, { id: 0 }).then(res => {
                if (res.status === 200) {
                    this.categoryCourseList = res.data
                }
            })
        },
        // 获取详情数据
        getData() {
            courseInfo(``, {
                id: this.id
            }).then(res => {
                if (res.status === 200) {
                    this.courseData = res.data
                    this.courseData.type = res.data.type.toString()
                    this.courseData.categoryId1 = res.data.categoryId1
                    this.selectChange()
                    this.courseData.categoryId2 = res.data.categoryId2
                    if (res.data.detail) {
                        setTimeout(() => { this.$refs.text.getData(res.data.detail) }, 300)
                    }
                    this.courseData.eduCourseDirectoryParams.forEach(ele => {
                        ele.eduCourseUnitParams.forEach(item => {
                            item.freePreview = item.freePreview.toString()
                            item.contentType = item.contentType.toString()
                            item['startTime'] = item.liveStartTime
                            item['endTime'] = item.liveEndTime
                            item['teacherId'] = item.eduTeacherVo.id
                        })
                    })
                    // this.courseData.teacherIds.forEach(ele => {
                    //     this.selectTeacherList.push(ele)
                    // })
                    this.courseData.assistantIds.forEach(ele => {
                        this.selectTeacherListHelp.push(ele)
                    })
                    // this.courseData.teacherIds = []
                    // this.selectTeacherList.forEach(ele => {
                    //     this.courseData.teacherIds.push(ele.id)
                    // })
                    this.courseData.assistantIds = []
                    this.selectTeacherListHelp.forEach(ele => {
                        this.courseData.assistantIds.push(ele.id)
                    })
                    this.isUpdateCourse = this.getTime(res.data.startTime)
                    this.courseForm.fileUrl = res.data.fileUrl
                }
            })
        },
        // 选择一级类目获取二级类目
        selectChange() {
            console.log(this.courseData.categoryId1)
            categoryCourseList(``, { id: this.courseData.categoryId1 }).then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    this.courseData.categoryId2=undefined
                    this.categoryCourseList2 = res.data
                }
            })
        },
        selectChange2() {
            console.log(this.courseData.categoryId2)
            categoryCourseList(``, { id: this.courseData.categoryId2 }).then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    this.courseData.categoryId3=undefined
                    this.categoryCourseList3 = res.data
                }
            })
        },
        // 时间转换比较
        getTime(dateTime) {
            let date = new Date(this.time)
            let y = date.getFullYear()
            let MM = date.getMonth() + 1
            MM = MM < 10 ? ('0' + MM) : MM
            let d = date.getDate()
            d = d < 10 ? ('0' + d) : d
            let h = date.getHours()
            h = h < 10 ? ('0' + h) : h
            let m = date.getMinutes()
            m = m < 10 ? ('0' + m) : m
            let s = date.getSeconds()
            s = s < 10 ? ('0' + s) : s
            let nowtime = y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
            // console.log(this.nowtime > dateTime)
            return dateTime > nowtime
        },
        // 获取老师列表
        getTeacherList() {
            let mobile = this.formInline.mobile
            let nickname = this.formInline.nickname
            teacherList(``, {
                pageSize: this.pageSize,
                pageNum: this.pageNum,
                mobile,
                nickname,
                type: 1
            }).then(res => {
                if (res.status === 200) {
                    this.teacherTableList = res.data.rows
                    this.total = res.data.total
                }
            })
        },
        // 获取助教老师列表
        getTeacherListHelp() {
            let mobile = this.formInlineHelp.mobile
            let name = this.formInlineHelp.nickname
            eduTeacherAssistList(``, {
                pageSize: this.pageSizeHelp,
                pageNum: this.pageNumHelp,
                mobile,
                name
            }).then(res => {
                if (res.status === 200) {
                    this.teacherTableListHelp = res.data.rows
                    this.totalHelp = res.data.total
                }
            })
        },
        // logo上传
        handleSuccess(file) {
            this.courseData.coverUrl = file.data
        },
        // logo上传
        handleSuccess1(file) {
            this.courseData.unitCoverUrl = file.data
        },
        // // 富文本内容
        // catchData(val) {
        //     this.courseData.description = val
        // },
        // 返回上一层
        goBack() {
            this.$router.push({ name: 'course' })
        },

        // 目录相关

        // 添加目录弹框
        addCatalog(i, t, d) {
            this.updateCatelogIndex = i
            this.updateCatelogType = t
            if (t === 1) {
                if (!this.courseData.type) {
                    console.log(this.$message)
                    return this.$message.error('请选择课程种类！')
                }
                if (this.courseData.type.toString() === '1' || this.courseData.type.toString() === '2') {
                    if (this.courseData.eduCourseDirectoryParams.length > 0) {
                        return this.$message.error('单节课程只能有一个目录！')
                    }
                }
                this.dialogFormVisible1 = true
                this.catalogForm.name = ''
                this.catalogForm.sortOrder = ''
            } else if (t === 2) {
                this.catelogTit = '编辑目录'
                this.dialogFormVisible1 = true
                this.catalogForm.name = d.name
                this.catalogForm.sortOrder = d.sortOrder
            }
        },
        // 确定添加目录
        quedingAddCatalog() {
            if (this.catalogForm.name === '' || this.catalogForm.name === undefined) {
                return this.$message.error('目录名称不能为空！')
            } else if (this.catalogForm.sortOrder === '' || this.catalogForm.sortOrder === undefined) {
                return this.$message.error('目录排序不能为空！')
            }

            if (!this.mFlag) {
                this.mFlag = true
                if (this.updateCatelogType === 1) {
                    let catalogFormData = {
                        name: undefined,
                        sortOrder: undefined,
                        eduCourseUnitParams: [] // 课程
                    }
                    if (this.type.toString() === '2') {
                        catalogFormData['courseId'] = this.id
                    }
                    catalogFormData.name = this.catalogForm.name
                    catalogFormData.sortOrder = this.catalogForm.sortOrder
                    // catalogFormData.eduCourseUnitParams = this.catalogForm.eduCourseUnitParams
                    this.courseData.eduCourseDirectoryParams.push(catalogFormData)
                    this.$message.success('操作成功')
                    this.dialogFormVisible1 = false
                } else if (this.updateCatelogType === 2) {
                    this.courseData.eduCourseDirectoryParams[this.updateCatelogIndex].name = this.catalogForm.name
                    this.courseData.eduCourseDirectoryParams[this.updateCatelogIndex].sortOrder = this.catalogForm.sortOrder
                    // catalogFormData.eduCourseUnitParams = this.catalogForm.eduCourseUnitParams
                    this.$message.success('操作成功')
                    this.dialogFormVisible1 = false
                }
                setTimeout(() => {
                    this.mFlag = false
                }, 2000)
            }
            // else {
            //     return this.$message.error('点击太快了')
            // }
        },
        // 删除目录
        delCatalog(i) {
            this.$confirm('此操作将删除该目录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.courseData.eduCourseDirectoryParams.splice(i, 1)
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
        // 课程相关

        // 打开添加课程弹窗
        openAddCouserDia(i, t, d, s) {
            this.updateCouserType = t
            this.uploadFlag = false
            if (t === 1) {
                if (this.courseData.eduCourseDirectoryParams[i].eduCourseUnitParams.length > 0 && (this.courseData.type.toString() === '1' || this.courseData.type.toString() === '2')) {
                    return this.$message.error('单节课程只能添加一个小节哦！')
                }
                if (this.courseData.type.toString() === '1' || this.courseData.type.toString() === '2') {
                    this.courseForm.freePreview = 1
                } else {
                    this.courseForm.freePreview = undefined
                }
                this.tableIndex = i
                this.courseForm.contentType = undefined
                this.courseForm.name = undefined
                // this.courseForm.freePreview = undefined
                this.courseForm.durationSeconds = undefined
                this.courseForm.sortOrder = undefined
                this.courseForm.startTime = undefined
                this.courseForm.endTime = undefined
                this.courseForm.teacherId = undefined
                this.courseForm.teacherName = undefined
                this.courseForm.faceUrl = undefined
                this.courseForm.fileUrl = undefined
                this.courseForm.fileId = undefined
                this.selectTeacherList = []
                this.fileList = []
                this.dialogFormVisible = true
            } else if (t === 2) {
                this.courseTit = '编辑'
                this.tableIndex = i
                this.sonIndex = s
                this.courseForm.contentType = d.contentType
                this.courseForm.name = d.name
                this.courseForm.freePreview = d.freePreview
                this.courseForm.fileUrl = d.fileUrl
                this.courseForm.fileId = d.fileId
                this.courseForm.durationSeconds = d.durationSeconds
                this.courseForm.sortOrder = d.sortOrder
                if (d.liveStartTime) {
                    this.courseForm.startTime = d.liveStartTime
                    this.courseForm.endTime = d.liveEndTime
                } else {
                    this.courseForm.startTime = d.startTime
                    this.courseForm.endTime = d.endTime
                }
                this.courseForm.teacherName = d.nickname
                this.courseForm.faceUrl = d.faceUrl

                if (d.eduTeacherVo) {
                    this.selectTeacherList = []
                    this.courseForm.teacherId = d.eduTeacherVo.id
                    this.courseForm.teacherName = d.eduTeacherVo.nickname
                    this.courseForm.faceUrl = d.eduTeacherVo.faceUrl
                    this.selectTeacherList.push(d.eduTeacherVo)
                }
                // else {
                //     this.selectTeacherList = []
                //     this.courseForm.teacherId = this.eduTeacherVo.id
                //     this.courseForm.teacherName = this.eduTeacherVo.nickname
                //     this.courseForm.faceUrl = this.eduTeacherVo.faceUrl
                //     this.selectTeacherList.push(this.eduTeacherVo)
                // }
                this.dialogFormVisible = true
                this.fileList = []
                let obj = {
                    name: d.fileUrl,
                    url: d.fileUrl
                }
                this.fileList.push(obj)
            }
        },
        // 确定添加课程
        quedingAddCouser() {
            if (this.courseForm.name === '' || this.courseForm.name === undefined) {
                return this.$message.error('课程名称不能为空！')
            } else if (this.courseForm.contentType === '' || this.courseForm.contentType === undefined) {
                return this.$message.error('内容类型不能为空！')
            } else if (this.courseForm.freePreview === '' || this.courseForm.freePreview === undefined) {
                return this.$message.error('请选择是否免费观看！')
            } else if (this.courseForm.sortOrder === '' || this.courseForm.sortOrder === undefined) {
                return this.$message.error('课程排序不能为空！')
            } else if ((this.courseForm.startTime === '' || this.courseForm.startTime === undefined) && this.courseForm.contentType.toString() === '6') {
                return this.$message.error('课程开始时间不能为空！')
            } else if ((this.courseForm.endTime === '' || this.courseForm.endTime === undefined) && this.courseForm.contentType.toString() === '6') {
                return this.$message.error('课程结束时间不能为空！')
            } else if (this.courseForm.teacherId === '' || this.courseForm.teacherId === undefined) {
                return this.$message.error('请添加老师！')
            }
            if (!this.flag) {
                if ((this.courseForm.fileUrl === '' || this.courseForm.fileUrl === undefined) && this.courseForm.contentType.toString() !== '6') {
                    return this.$message.error('请上传视频！')
                }
            } else if (this.progress < 100) {
                return this.$message.error(`视频还未上传完成，当前进度${this.progress}%`)
            }
            if (!this.cFlag) {
                this.cFlag = true
                if (this.updateCouserType === 1) {
                    let obj = {
                        contentType: undefined,
                        name: undefined,
                        freePreview: undefined,
                        fileUrl: undefined,
                        fileId: undefined,
                        durationSeconds: undefined,
                        sortOrder: undefined,
                        startTime: undefined,
                        endTime: undefined,
                        teacherId: undefined,
                        teacherName: undefined,
                        faceUrl: undefined,
                        eduTeacherVo: undefined
                    }
                    // if (this.courseData.type === 1 || this.courseData.type === 3) {
                    //     this.courseForm.contentType = 1
                    // } else if (this.courseData.type === 2 || this.courseData.type === 4) {
                    //     this.courseForm.contentType = 6
                    // }
                    if (this.type.toString() === '2') {
                        obj['courseId'] = this.id
                    }
                    obj.contentType = this.courseForm.contentType
                    console.log('视频地址', this.courseForm.fileUrl)
                    obj.name = this.courseForm.name
                    obj.freePreview = this.courseForm.freePreview
                    if (this.uploadFlag) {
                        return this.$message.error(`视频上传失败，请重新上传！`)
                    }
                    obj.fileUrl = this.courseForm.fileUrl || localStorage.getItem('fileUrl')
                    obj.fileId = this.courseForm.fileId || localStorage.getItem('fileId')
                    obj.durationSeconds = this.courseForm.durationSeconds
                    obj.sortOrder = this.courseForm.sortOrder
                    obj.startTime = this.courseForm.startTime
                    obj.endTime = this.courseForm.endTime
                    obj.teacherId = this.courseForm.teacherId
                    obj.teacherName = this.courseForm.teacherName
                    obj.faceUrl = this.courseForm.faceUrl
                    this.courseData.eduCourseDirectoryParams[this.tableIndex].eduCourseUnitParams.push(obj)
                    console.log('小节内容', this.courseData.eduCourseDirectoryParams[this.tableIndex].eduCourseUnitParams)
                    // this.catalogForm.eduCourseUnitParams.push(obj)
                    if (obj.contentType === 1) {
                        this.$refs.videoUpload.clearFiles()
                    }
                    localStorage.removeItem('fileUrl')
                    localStorage.removeItem('fileId')
                    this.$message.success('操作成功')
                    this.dialogFormVisible = false
                } else if (this.updateCouserType === 2) {
                    this.courseData.eduCourseDirectoryParams[this.tableIndex].eduCourseUnitParams[this.sonIndex].contentType = this.courseForm.contentType
                    this.courseData.eduCourseDirectoryParams[this.tableIndex].eduCourseUnitParams[this.sonIndex].name = this.courseForm.name
                    this.courseData.eduCourseDirectoryParams[this.tableIndex].eduCourseUnitParams[this.sonIndex].freePreview = this.courseForm.freePreview
                    this.courseData.eduCourseDirectoryParams[this.tableIndex].eduCourseUnitParams[this.sonIndex].fileUrl = this.courseForm.fileUrl
                    this.courseData.eduCourseDirectoryParams[this.tableIndex].eduCourseUnitParams[this.sonIndex].fileId = this.courseForm.fileId
                    this.courseData.eduCourseDirectoryParams[this.tableIndex].eduCourseUnitParams[this.sonIndex].durationSeconds = this.courseForm.durationSeconds
                    this.courseData.eduCourseDirectoryParams[this.tableIndex].eduCourseUnitParams[this.sonIndex].sortOrder = this.courseForm.sortOrder
                    this.courseData.eduCourseDirectoryParams[this.tableIndex].eduCourseUnitParams[this.sonIndex].startTime = this.courseForm.startTime
                    this.courseData.eduCourseDirectoryParams[this.tableIndex].eduCourseUnitParams[this.sonIndex].endTime = this.courseForm.endTime
                    this.courseData.eduCourseDirectoryParams[this.tableIndex].eduCourseUnitParams[this.sonIndex].teacherId = this.courseForm.teacherId
                    this.courseData.eduCourseDirectoryParams[this.tableIndex].eduCourseUnitParams[this.sonIndex].teacherName = this.courseForm.teacherName
                    this.courseData.eduCourseDirectoryParams[this.tableIndex].eduCourseUnitParams[this.sonIndex].faceUrl = this.courseForm.faceUrl
                    // this.courseData.eduCourseDirectoryParams[this.tableIndex].eduCourseUnitParams.push(obj)
                    // this.catalogForm.eduCourseUnitParams.push(obj)
                    // console.log(this.courseForm)
                    if (this.eduTeacherVo) {
                        this.courseData.eduCourseDirectoryParams[this.tableIndex].eduCourseUnitParams[this.sonIndex].eduTeacherVo = this.eduTeacherVo
                        this.eduTeacherVo = {}
                    }
                    if (this.courseForm.contentType === 1) {
                        this.$refs.videoUpload.clearFiles()
                    }
                    this.$message.success('操作成功')
                    this.dialogFormVisible = false
                }
                setTimeout(() => {
                    this.cFlag = false
                }, 2000)
            }
        },
        compare(property) {
            return function(a, b) {
                var value1 = a[property]
                var value2 = b[property]
                return value1 - value2
            }
        },
        // 删除课程
        delCourse(i, s) {
            // console.log(i, s)
            this.$confirm('此操作将删除该课程, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.courseData.eduCourseDirectoryParams[s].eduCourseUnitParams.splice(i, 1)
                this.courseData.eduCourseDirectoryParams[s].eduCourseUnitParams.sort(this.compare('sortOrder'))
                this.courseData.eduCourseDirectoryParams[s].eduCourseUnitParams.forEach((ele, index) => {
                    ele.sortOrder = index + 1
                })
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
        // 上传之前的文件校验
        beforeUpload(file) {
            var FileExt = file.name.replace(/.+\./, '')
            if (['mp4'].indexOf(FileExt.toLowerCase()) === -1) {
                this.$message({
                    type: 'warning',
                    message: '请上传后缀名为mp4的视频文件！'
                })
                return false
            }
        },
        // 文件改变
        handleChange(file) {
            var FileExt = file.name.replace(/.+\./, '')
            // if (['wmv', 'mpg', 'mov', 'ram', 'rm', 'swf', 'flv', 'mp4', 'rmvb', 'mpeg'].indexOf(FileExt.toLowerCase()) === -1) {
            //     this.$message({
            //         type: 'error',
            //         message: '请上传后缀名为wmv,mpg,mov,ram,rm,swf,flv,mp4,rmvb或mpeg的视频文件！'
            //     })
            //     return false
            // }
            if (['mp4'].indexOf(FileExt.toLowerCase()) === -1) {
                this.$message({
                    type: 'error',
                    message: '请上传后缀名为mp4的视频文件！'
                })
                this.fileList = []
                return false
            }
            if (file.status === 'ready') {
                vodUploadSignature().then(res => {
                    if (res.status === 200) {
                        this.flag = true
                        this.uploadFlag = false
                        this.getUpload(file.raw, res.data)
                    }
                })
                // uploadSignature(``, {
                //     fileName: file.name,
                //     type: 30
                // }).then(res => {
                //     if (res.status === 200) {
                //         let obj = {
                //             OSSAccessKeyId: res.data.OSSAccessKeyId,
                //             callback: res.data.callback,
                //             expire: res.data.expire,
                //             key: res.data.fileNameKey,
                //             host: res.data.host,
                //             policy: res.data.policy,
                //             signature: res.data.signature,
                //             'x-oss-object-acl': 'public-read',
                //             'Content-Disposition': file.name
                //         }
                //         this.uploadData = obj
                //         this.uploadVideoUrl = res.data.host
                //         setTimeout(ele => {
                //             this.submitUpload()
                //         }, 1000)
                //     } else {
                //         return false
                //     }
                // })
            }
        },
        // 取消添加小节
        onQuXiao() {
            this.courseForm.fileUrl = undefined
            this.dialogFormVisible = false
            this.progress = 0
            this.progressFlag = false
            if (this.courseData.type.toString() === '1' || this.courseData.type.toString() === '3') {
                this.uploader.cancel()
            }
        },
        // 手动提交
        submitUpload() {
            this.$refs.videoUpload.submit()
        },
        // 上传视频成功
        handleSuccessmp4(file) {
            console.log(file)
            // this.courseForm.fileUrl = file.data
            // console.log(file.data)
            // let url = file.data
            // let audioElement = new Audio(url)
            // let duration
            // const that = this
            // audioElement.addEventListener('loadedmetadata', function(_event) {
            //     duration = audioElement.duration // 时长为秒，小数，182.36
            //     that.courseForm.durationSeconds = parseInt(duration)
            // })
        },
        // 文件超出
        handleMore() {
            return this.$message.error('请先删除下方列表中的文件！')
        },
        // 删除上传视频
        handleRemove(file, fileList) {
            this.progress = 0
            this.progressFlag = false
            this.uploadFlag = false
            this.uploader.cancel()
            this.courseForm.fileUrl = undefined
        },

        // 老师相关

        // 打开添加老师弹窗
        teacherListAdd() {
            if (this.selectTeacherList.length > 0) {
                return this.$message.error('只能选择一位老师哦！')
            }
            this.getTeacherList()
            this.dialogFormVisible2 = true
        },
        // 打开添加助教老师弹窗
        teacherListAddHelp() {
            this.getTeacherListHelp()
            this.dialogFormVisible3 = true
        },
        // 确定添加老师
        quedingAddTeacher() {
            if (this.multipleSelection.length < 1) {
                return this.$message.error('请至少选择一个老师')
            } else if (this.multipleSelection.length > 1) {
                return this.$message.error('只能选择一个老师')
            }
            this.courseForm.teacherId = this.multipleSelection[0].id
            this.courseForm.teacherName = this.multipleSelection[0].nickname
            this.courseForm.faceUrl = this.multipleSelection[0].faceUrl
            this.multipleSelection.forEach(ele => {
                // this.courseData.teacherIds.push(ele.id)
                this.selectTeacherList.push(ele)
            })
            // this.courseData.teacherIds = [...new Set(this.courseData.teacherIds)]
            for (var i = 0; i < this.selectTeacherList.length; i++) {
                for (var j = i + 1; j < this.selectTeacherList.length; j++) {
                    if (this.selectTeacherList[i].id === this.selectTeacherList[j].id) { // 第一个等同于第二个，splice方法删除第二个
                        this.selectTeacherList.splice(j, 1)
                        j--
                    }
                }
            }
            // let hash = {}
            // this.selectTeacherList = this.selectTeacherList.reduce((preVal, curVal) => {
            //     hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal)
            //     return preVal
            // }, [])
            this.eduTeacherVo = {}
            this.eduTeacherVo = this.selectTeacherList[0]
            this.dialogFormVisible2 = false
            this.$refs.multipleTable.clearSelection()
        },
        // 删除老师
        delTeacher(i) {
            // this.courseData.teacherIds.splice(i, 1)
            this.courseForm.teacherId = undefined
            this.selectTeacherList.splice(i, 1)
        },
        // 取消老师添加
        quxiaoAddTeacher() {
            this.dialogFormVisible2 = false
            this.$refs.multipleTable.clearSelection()
        },
        // 多选
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        // 重置
        onReset() {
            this.$refs.formInline.resetFields()
            this.pageNum = 1
            this.pageSize = 10
            this.getTeacherList()
        },
        // 搜索
        onSubmit() {
            this.pageNum = 1
            this.getTeacherList()
        },
        // 每页几条
        handleSizeChange(val) {
            this.pageSize = val
            this.getTeacherList()
        },
        // 前往第几页
        handleCurrentChange(val) {
            this.pageNum = val
            this.getTeacherList()
        },
        // 确定添加助教老师
        quedingAddTeacherHelp() {
            if (this.multipleSelectionHelp.length < 1) {
                return this.$message.error('请至少选择一个助教老师')
            }
            this.multipleSelectionHelp.forEach(ele => {
                this.courseData.assistantIds.push(ele.id)
                this.selectTeacherListHelp.push(ele)
                // this.selectTeacherListHelp = [...new Set(this.selectTeacherListHelp)]
            })
            this.courseData.assistantIds = [...new Set(this.courseData.assistantIds)]
            for (var i = 0; i < this.selectTeacherListHelp.length; i++) {
                for (var j = i + 1; j < this.selectTeacherListHelp.length; j++) {
                    if (this.selectTeacherListHelp[i].id === this.selectTeacherListHelp[j].id) { // 第一个等同于第二个，splice方法删除第二个
                        this.selectTeacherListHelp.splice(j, 1)
                        j--
                    }
                }
            }
            this.dialogFormVisible3 = false
            this.$refs.multipleTableHelp.clearSelection()
        },
        // 删除助教老师
        delTeacherHelp(i) {
            this.courseData.assistantIds.splice(i, 1)
            this.selectTeacherListHelp.splice(i, 1)
        },
        // 取消助教老师添加
        quxiaoAddTeacherHelp() {
            this.dialogFormVisible3 = false
            this.$refs.multipleTableHelp.clearSelection()
        },
        // 多选助教
        handleSelectionChangeHelp(val) {
            this.multipleSelectionHelp = val
        },
        // 重置助教
        onResetHelp() {
            this.$refs.formInlineHelp.resetFields()
            this.pageNumHelp = 1
            this.pageSizeHelp = 10
            this.getTeacherListHelp()
        },
        // 搜索助教
        onSubmitHelp() {
            this.pageNumHelp = 1
            this.getTeacherListHelp()
        },
        // 每页几条助教
        handleSizeChangeHelp(val) {
            this.pageSizeHelp = val
            this.getTeacherListHelp()
        },
        // 前往第几页助教
        handleCurrentChangeHelp(val) {
            this.pageNumHelp = val
            this.getTeacherListHelp()
        },
        // 确认发布
        grant() {
            // if (!this.isUpdateCourse) {
            //     return this.$message.error('已经开始的课程不能编辑了哦！')
            // }
            // if (this.type.toString() === '2' && this.courseData.eduCourseDirectoryParams[0].eduCourseUnitParams[0].contentType.toString() === '6' && this.courseData.eduCourseDirectoryParams[0].eduCourseUnitParams[0].liveStatus.toString() !== '0') {
            //     return this.$message.error('课程已经开始或者已经结束')
            // }
            if (this.courseData.type === undefined || this.courseData.type === '') {
                return this.$message.error('请选择课程类型')
            }
            if (this.courseData.name === undefined || this.courseData.name === '') {
                return this.$message.error('请添加课程名称')
            }
            if (this.courseData.teacherName === undefined || this.courseData.teacherName === '') {
                return this.$message.error('请添加主讲人')
            }
            if (this.courseData.coverUrl === undefined || this.courseData.coverUrl === '') {
                return this.$message.error('请上传logo')
            }
            if (this.courseData.unitCoverUrl === undefined || this.courseData.unitCoverUrl === '') {
                return this.$message.error('请上传详情图')
            }
            if (this.courseData.categoryId1 === undefined || this.courseData.categoryId1 === '') {
                return this.$message.error('请选择一级类目')
            }
            if (this.courseData.categoryId2 === undefined || this.courseData.categoryId2 === '') {
                return this.$message.error('请选择二级类目')
            }
            if (this.courseData.categoryId3 === undefined || this.courseData.categoryId3 === '') {
                return this.$message.error('请选择三级类目')
            }
            if (this.courseData.description === undefined || this.courseData.description === '') {
                return this.$message.error('请添加课程简介')
            }
            if (this.courseData.price === undefined || this.courseData.price === '') {
                return this.$message.error('请输入价格')
            }
            if (this.courseData.assistantIds === undefined) {
                this.courseData.assistantIds = []
            }
            if (this.courseData.assistantIds.length < 1 && (this.courseData.type.toString() === '3' || this.courseData.type.toString() === '4')) {
                return this.$message.error('请添加助教老师')
            } else if (this.courseData.type.toString() === '1' || this.courseData.type.toString() === '2') {
                this.courseData.assistantIds = undefined
            }
            if (this.courseData.startTime === undefined || this.courseData.startTime === '') {
                return this.$message.error('请输入开课时间')
            }
            if (this.courseData.predictStudyTime === undefined || this.courseData.predictStudyTime === '') {
                return this.$message.error('请输入预计学习时间')
            }
            if (this.courseData.detail === undefined || this.courseData.detail === '') {
                return this.$message.error('请输入课程详情')
            }
            if (this.courseData.eduCourseDirectoryParams < 1) {
                return this.$message.error('请添加目录')
            }
            if (this.keys === 1) {
                this.keys = 2
                courseAdd(``,
                    this.courseData
                ).then(res => {
                    setTimeout(ele => {
                        this.keys = 1
                    }, 5000)
                    if (res.status === 200) {
                        this.$message.success('发布成功！')
                        this.goBack()
                    }
                })
            }
        }
    },
    created() {
        this.id = this.$route.query.id
        this.type = this.$route.query.type
        this.getCourseCateList()
        if (this.type.toString() === '2') {
            this.getData()
        }
    }
}
</script>
<style lang='stylus' scoped>
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
