/* eslint-disable */
import { get, post } from './helper.js'


export const adminInfo = post('/admin/info') // 导航栏

// 登录
export const login = post('/admin/login')
export const loginOut = post('/admin/logout')


// 文件上传
// /file/upload/{type}
// export const upload = post('/file/upload') // 文件上传 /file/uploadSignature
export const uploadSignature = post('/file/uploadSignature') // 文件上传
export const vodUploadSignature = post('/file/vodUploadSignature') // 文件上传
// export const activeCount = get('/user/findActiveCount') // 活跃用户数

// 首页

export const eduOrderCount = post('/eduOrder/count') // 首页统计 课程
export const mallOrderCount = post('/mallOrder/count') // 首页统计 商城
export const userCount = post('/user/count') // 首页统计


// 搜索推荐
export const cmsKeywordHomeList = post('/cmsKeywordHome/list') //  首页关键字推荐
export const cmsKeywordHomeAdd = post('/cmsKeywordHome/add') // 首页关键字添加
export const cmsKeywordHomeDel = post('/cmsKeywordHome/delete') // 首页关键字删除

export const cmsKeywordDiscoverList = post('/cmsKeywordDiscover/list') //  发现页关键字推荐
export const cmsKeywordDiscoverAdd = post('/cmsKeywordDiscover/add') // 发现页关键字添加
export const cmsKeywordDiscoverDel = post('/cmsKeywordDiscover/delete') // 发现页关键字删除

export const cmsKeywordGoodsList = post('/cmsKeywordGoods/list') //  商品页关键字推荐
export const cmsKeywordGoodsAdd = post('/cmsKeywordGoods/add') // 商品页关键字添加
export const cmsKeywordGoodsDel = post('/cmsKeywordGoods/delete') // 商品页关键字删除

export const cmsKeywordCourseList = post('/cmsKeywordCourse/list') //  商品页关键字推荐
export const cmsKeywordCourseAdd = post('/cmsKeywordCourse/add') // 商品页关键字添加
export const cmsKeywordCourseDel = post('/cmsKeywordCourse/delete') // 商品页关键字删除

// banner设置

// export const cmsBannerList = post('/cmsBanner/list') // banner列表
export const cmsBannerHomeHeadList = post('/cmsBannerHomeHead/list') // 首页头部列表
export const cmsBannerHomeHeadDel = post('/cmsBannerHomeHead/delete') // 首页头部删除
export const cmsBannerHomeHeadAdd = post('/cmsBannerHomeHead/add') // 首页头部添加
export const cmsBannerHomeHeadInfo = post('/cmsBannerHomeHead/info') // 首页头部详情

export const cmsBannerHomeCentreList = post('/cmsBannerHomeCentre/list') // 首页中部列表
export const cmsBannerHomeCentreAdd = post('/cmsBannerHomeCentre/add') // 首页中部添加
export const cmsBannerHomeCentreDel = post('/cmsBannerHomeCentre/delete') // 首页中部删除
export const cmsBannerHomeCentreInfo = post('/cmsBannerHomeCentre/info') // 首页中部详情

export const cmsBannerHomeCentreList2 = post('/cmsBannerHomeCentre2/list') // 首页底部列表
export const cmsBannerHomeCentreAdd2 = post('/cmsBannerHomeCentre2/add') // 首页底部添加
export const cmsBannerHomeCentreDel2 = post('/cmsBannerHomeCentre2/delete') // 首页底部删除
export const cmsBannerHomeCentreInfo2 = post('/cmsBannerHomeCentre2/info') // 首页底部详情

export const cmsBannerEduHeadAdd = post('/cmsBannerEduHead/add') // 教育页头部 添加
export const cmsBannerEduHeadDel = post('/cmsBannerEduHead/delete') // 教育页头部 删除
export const cmsBannerEduHeadInfo = post('/cmsBannerEduHead/info') // 教育页头部详情
export const cmsBannerEduHeadList = post('/cmsBannerEduHead/list') // 教育页头部列表

export const cmsBannerEduCentreAdd = post('/cmsBannerEduCentre/add') // 教育页中部 添加
export const cmsBannerEduCentreDel = post('/cmsBannerEduCentre/delete') // 教育页中部 删除
export const cmsBannerEduCentreInfo = post('/cmsBannerEduCentre/info') // 教育页中部详情
export const cmsBannerEduCentreList = post('/cmsBannerEduCentre/list') // 教育页中部列表

export const cmsBannerDiscoverHeadAdd = post('/cmsBannerDiscoverHead/add') // 发现页 添加
export const cmsBannerDiscoverHeadDel = post('/cmsBannerDiscoverHead/delete') // 发现页 删除
export const cmsBannerDiscoverHeadInfo = post('/cmsBannerDiscoverHead/info') // 发现页详情
export const cmsBannerDiscoverHeadList = post('/cmsBannerDiscoverHead/list') // 发现页列表

export const cmsBannerHomeStartAdd = post('/cmsBannerHomeStart/add') // 引导页 添加
export const cmsBannerHomeStartDel = post('/cmsBannerHomeStart/delete') // 引导页 删除
export const cmsBannerHomeStartInfo = post('/cmsBannerHomeStart/info') // 引导页详情
export const cmsBannerHomeStartList = post('/cmsBannerHomeStart/list') // 引导页列表

export const cmsBannerMallHeadAdd = post('/cmsBannerMallHead/add') // 商城头部 添加
export const cmsBannerMallHeadDel = post('/cmsBannerMallHead/delete') // 商城头部 删除
export const cmsBannerMallHeadInfo = post('/cmsBannerMallHead/info') // 商城头部详情
export const cmsBannerMallHeadList = post('/cmsBannerMallHead/list') // 商城头部列表

export const cmsAdAdd = post('/cmsAd/add') // banner 新增/编辑
export const cmsAdDetails = post('/cmsAd/info') // banner 详情
export const cmsAdDel = post('/cmsAd/delete') // banner 删除
export const cmsAdList = post('/cmsAd/list') // banner启动页添加
export const cmsLoginImgInfo = post('/cmsLoginImg/info') // 登录页图片配置详情
export const cmsLoginImgUpdate = post('/cmsLoginImg/update') // 登录页图片配置

export const cmsNavigationSkipList = post('/cmsNavigationSkip/list') // 精品课程素材设置列表
export const cmsNavigationSkipAdd = post('/cmsNavigationSkip/add') // 精品课程素材设置列表 编辑

export const cmsBannerEduCategoryAdd = post('/cmsBannerEduCategory/add') // 教育页中部 添加
export const cmsBannerEduCategoryDel = post('/cmsBannerEduCategory/delete') // 教育页中部 删除
export const cmsBannerEduCategoryInfo = post('/cmsBannerEduCategory/info') // 教育页中部 详情
export const cmsBannerEduCategoryList = post('/cmsBannerEduCategory/list') // 教育页中部 列表

export const cmsBannerMallCategoryAdd = post('/cmsBannerMallCategory/add') // 商城分页 添加
export const cmsBannerMallCategoryDel = post('/cmsBannerMallCategory/delete') // 商城分页 删除
export const cmsBannerMallCategoryInfo = post('/cmsBannerMallCategory/info') // 商城分页 详情
export const cmsBannerMallCategoryList = post('/cmsBannerMallCategory/list') // 商城分页 列表

// 分类设置


export const eduCourseCategoryList = post('/eduCourseCategory/list') // 课程分类列表
export const eduCourseCategoryAdd = post('/eduCourseCategory/add') // 课程分类添加/修改
export const eduCourseCategoryDel = post('/eduCourseCategory/delete') // 课程分类删除
export const eduCourseCategorySonAdd = post('/eduCourseCategory/categoryAdd') // 子分类添加
export const eduCourseCategoryUpdateStatus = post('/eduCourseCategory/updateStatus') // 是否展示

export const mallGoodsCategoryList = post('/mallGoodsCategory/list') // 商品分类列表
export const mallGoodsCategoryAdd = post('/mallGoodsCategory/add') // 商品分类添加/修改
export const mallGoodsCategoryDel = post('/mallGoodsCategory/delete') // 商品分类删除
export const mallGoodsCategorySonAdd = post('/mallGoodsCategory/categoryAdd') // 子分类添加


export const newsCourseCategoryList = post('/newsCourseCategory/list') // 资讯分类列表
export const newsCourseCategoryAdd = post('/newsCourseCategory/add') // 资讯分类添加/修改
export const newsCourseCategoryDel = post('/newsCourseCategory/delete') // 资讯分类删除
export const newsCourseCategorySonAdd = post('/newsCourseCategory/categoryAdd') // 子分类添加



// 客服

export const cmsHelpList = post('/cmsHelp/list') // 常见问题
export const cmsHelpInfo = post('/cmsHelp/info') // 常见问题详情
export const cmsHelpAdd = post('/cmsHelp/add') // 常见问题编辑
export const cmsFeedbackList = post('/cmsFeedback/list') // 用户反馈列表
export const cmsFeedbackInfo = post('/cmsFeedback/info') // 用户反馈详情
export const cmsFeedbackUpdate = post('/cmsFeedback/update') // 用户反馈处理
export const adminIMGetKeFu = post('/im/getKeFu') // 客服签名
export const cmsHandleList = post('/cmsHandle/list') // 客服列表
export const cmsHandleAdd = post('/cmsHandle/add') // 客服添加修改

// 权限分配

export const adminList = post('/admin/list') // 账号列表
export const adminAdd = post('/admin/add') // 账号添加
export const adminDel = post('/admin/delete') // 账号删除
export const adminDetail = post('/admin/detail') // 账号详情
export const roleFind = post('/role/find') // 角色列表 不带分页
export const roleList = post('/role/list') // 角色列表 带分页
export const roleAdd = post('/role/add') // 角色列表添加、修改
export const roleInfo = post('/role/info') // 角色权限列表
export const roleDel = post('/role/delete') // 角色删除
export const roleUpdatePermission = post('/role/updatePermission') // 角色修改权限

// 商城管理

export const goodsList = post('/goods/list') // 商品列表
export const categoryGoodList = post('/category/goodList') // 分类商品列表
export const goodsDel = post('/goods/delete') // 商品下架 /goods/updateSale
export const goodsupdateSale = post('/goods/updateSale') // 商品下架
export const goodsAdd = post('/goods/add') // 商品添加修改
export const goodsInfo = post('/goods/info') // 商品详情
export const goodsCommentList = post('/goods/commentList') // 商品评论列表
export const goodsCommentUpdate = post('/goods/commentUpdate') // 商品评论顶置
export const goodsCommentDelete = post('/goods/commentUpdateStatus') // 商品评论删除
export const goodsCommentInfo = post('/goods/commentInfo') // 商品评论详情

// 订单管理

export const orderList = post('/mallOrder/list') // 订单列表
export const orderInfo = post('/mallOrder/info') // 订单详情
export const orderLogistics = post('/mallOrder/logistics') // 发货
export const expressList = post('/express/list') // 物流快递
export const eduOrderList = post('/eduOrder/list') // 课程订单
export const eduOrderInfo = post('/eduOrder/info') // 课程详情

// 优惠券管理

export const couponList = post('/coupon/list') // 优惠券列表
export const couponAdd = post('/coupon/add') // 优惠券添加
export const couponInfo = post('/coupon/info') // 优惠券详情 /user/list

// 用户管理

export const userList = post('/user/list') // 用户列表
export const userBrowseList = post('/user/browseList') // 用户浏览详情
export const userUpdateStatus = post('/user/updateStatus') // 禁止登录
export const userUpdateRemark = post('/user/updateRemark') // 添加备注
export const userInteriorList = post('/userInterior/list') // 学员列表
export const userInteriorUserList = post('/userInterior/userList') // 学员列表用户列表
export const userInteriorBrowseList = post('/userInterior/browseList') // 学员浏览记录
export const userInteriorFindCourseList = post('/userInterior/findCourseList') // 学员查询课程列表
export const userInteriorCourseList = post('/userInterior/courseList') // 学员添加课程列表
export const userInteriorAddCourse = post('/userInterior/addCourse') // 学员添加课程
export const userInteriorDelCourse = post('/userInterior/deleteCourse') // 学员删除课程
export const userInteriorUpdateInterior = post('/userInterior/updateInterior') // 编辑学员

// 课程管理

export const courseList = post('/course/list') // 课程列表
export const categoryCourseList = post('/category/courseList') // 课程类型列表
export const courseInfo = post('/course/info') // 课程详情
export const courseInfoUnit = post('/course/infoUnit') // 系列课程详情
export const courseAdd = post('/course/add') // 课程添加
export const courseDel = post('/course/delete') // 课程删除
export const courseCommentList = post('/course/commentList') // 课程评论
export const courseCommentUpdate = post('/course/commentUpdate') // 课程评论排序
export const courseCommentDelete = post('/course/commentDelete') // 课程评论删除
export const courseCommentInfo = post('/course/commentInfo') // 课程评论详情
export const courseUserList = post('/course/userList') // 购买课程的学员
export const courseGetEduCourseTypePage=post('/eduCourseType/getEduCourseTypePage')//精品课程
// export const courseInfo = post('/course/info') // 课程详情


// 老师管理

export const teacherList = post('/teacher/list') // 老师列表
export const teacherAdd = post('/teacher/add') // 老师添加
export const teacherCourseList = post('/teacher/courseList') // 老师关联课程列表
export const teacherInfo = post('/teacher/info') // 老师详情
export const eduTeacherAssistList = post('/eduTeacherAssist/list') // 助教列表
export const eduTeacherAssistAdd = post('/eduTeacherAssist/add') // 助教添加
export const eduTeacherAssistInfo = post('/eduTeacherAssist/info') // 助教编辑
export const eduTeacherAssistDel = post('/eduTeacherAssist/delete') // 助教删除
export const eduTeacherAssistCourseList = post('/eduTeacherAssist/courseList') // 助教关联课程

// 内容管理

export const coilDiscussList = post('/coilDiscuss/list') // 话题列表
export const coilDiscussAdd = post('/coilDiscuss/add') // 话题添加
export const coilDiscussDel = post('/coilDiscuss/delete') // 话题删除
export const coilTalkList = post('/coilTalk/list') // 动态列表
export const coilTalkInfo = post('/coilTalk/info') // 动态详情
export const coilTalkDel = post('/coilTalk/delete') // 动态删除
export const coilTalkCommentList = post('/coilTalk/commentList') // 动态评论列表
export const coilTalkCommentDel = post('/coilTalk/commentDelete') // 动态评论详情删除
export const cmsCompanyNeedBuyList = post('/cmsCompanyNeedBuy/list') // 求购信息列表
export const cmsCompanyRecruitList = post('/cmsCompanyRecruit/list') // 招聘信息列表
export const cmsCompanyRecruitAdd = post('/cmsCompanyRecruit/add') // 招聘信息添加
export const cmsCompanyRecruitInfo = post('/cmsCompanyRecruit/info') // 招聘信息详情
export const cmsCompanyRecruitDel = post('/cmsCompanyRecruit/delete') // 招聘信息删除
export const cmsCompanyNeedBuyAdd = post('/cmsCompanyNeedBuy/add') // 求购信息添加
export const cmsCompanyNeedBuyInfo = post('/cmsCompanyNeedBuy/info') // 求购信息详情
export const cmsCompanyNeedBuyDel = post('/cmsCompanyNeedBuy/delete') // 求购信息删除


// 资讯管理

export const categoryNewsList = post('/category/newsList') // 资讯分类列表
export const newsInformationList = post('/newsInformation/list') // 资讯列表
export const newsInformationAdd = post('/newsInformation/add') // 资讯添加
export const newsInformationInfo = post('/newsInformation/info') // 资讯详情
export const newsInformationDel = post('/newsInformation/delete') // 资讯删除
export const newsInformationCommentList = post('/newsInformation/commentList') // 资讯评论列表
export const newsInformationCommentDel = post('/newsInformation/commentDelete') // 资讯评论列表 删除

// 推荐管理

export const eduCourseRecommendList = post('/eduCourseRecommend/list') // 课程推荐列表
export const eduCourseRecommendCourseList = post('/eduCourseRecommend/courseList') // 课程列表
export const eduCourseRecommendAdd = post('/eduCourseRecommend/add') // 课程推荐添加
export const eduCourseRecommendDel = post('/eduCourseRecommend/delete') // 课程推荐删除
export const eduCourseRecommendSortUpdate = post('/eduCourseRecommend/sortUpdate') // 课程推荐排序
export const eduTeacherRecommendList = post('/eduTeacherRecommend/list') // 老师推荐列表
export const eduTeacherRecommendTeacherList = post('/eduTeacherRecommend/teacherList') // 老师列表
export const eduTeacherRecommendAdd = post('/eduTeacherRecommend/add') // 老师推荐添加
export const eduTeacherRecommendDel = post('/eduTeacherRecommend/delete') // 老师推荐删除
export const eduTeacherRecommendSortUpdate = post('/eduTeacherRecommend/sortUpdate') // 老师推荐排序
export const mallGoodsRecommendFindDetail = post('/mallGoodsRecommend/findDetail') // 商品推荐列表
export const eduCourseRecommendCategoryList = post('/eduCourseRecommend/categoryList') // 商品推荐列表

export const mallGoodsRecommendList = post('/mallGoodsRecommend/list') // 商品列表
export const mallGoodsRecommendAdd = post('/mallGoodsRecommend/add') // 商品列表
export const mallGoodsRecommendDel = post('/mallGoodsRecommend/delete') // 商品列表
export const mallGoodsRecommendGoodsList = post('/mallGoodsRecommend/goodsList') // 商品列表
export const mallGoodsRecommendAddDetail = post('/mallGoodsRecommend/addDetail') // 商品添加
export const mallGoodsRecommendDeleteDetail = post('/mallGoodsRecommend/deleteDetail') // 商品删除
export const mallGoodsRecommendSortUpdate = post('/mallGoodsRecommend/sortUpdate') // 商品推荐排序

// 战略合作

export const cmsCompanyList = post('/cmsCompany/list') // 企业列表
export const cmsCompanyDel = post('/cmsCompany/delete') // 企业删除 /cmsCompany/add
export const cmsCompanyAdd = post('/cmsCompany/add') // 企业添加
export const cmsCompanyInfo = post('/cmsCompany/info') // 企业详情
export const cmsCompanyInformationList = post('/cmsCompanyInformation/list') // 企业资讯列表
export const cmsCompanyInformationCompanyList = post('/cmsCompanyInformation/companyList') // 资讯企业下拉列表
export const cmsCompanyInformationAdd = post('/cmsCompanyInformation/add') // 企业资讯添加
export const cmsCompanyInformationInfo = post('/cmsCompanyInformation/info') // 企业资讯添加
export const cmsCompanyInformationDel = post('/cmsCompanyInformation/delete') // 企业资讯删除
export const cmsSchoolVideoInfo = post('/cmsSchoolVideo/info') // 获取线下学院视频
export const cmsSchoolVideoUpdate = post('/cmsSchoolVideo/update') // 获取线下学院视频 修改
// 审核中心

export const eduTeacherApplyList = post('/eduTeacherApply/list') // 名师审核列表
export const eduTeacherApplyInfo = post('/eduTeacherApply/info') // 名师审核详情
export const eduTeacherApplyUpdate = post('/eduTeacherApply/update') // 名师审核
export const cmsPushMarketList = post('/cmsPushMarket/list') // 推手审核列表
export const cmsPushMarketInfo = post('/cmsPushMarket/info') // 推手审核详情
export const cmsPushMarketUpdate = post('/cmsPushMarket/update') // 推手审核
export const eduTeacherWithdrawList = post('/eduTeacherWithdraw/list') // 教师提现审核列表
export const eduTeacherWithdrawUpdateStatus = post('/eduTeacherWithdraw/updateStatus') // 教师提现审核

// 财务统计

export const countCount = post('/count/count') // 金额统计
export const countCountCourse = post('/count/countCourse') // 课程列表 -- 统计
export const countCountGoods = post('/count/countGoods') // 商品列表 -- 统计
// export const countFile = get('/count/file') // 表格导出

// 消息中心

export const informInfo = post('/inform/info') // 系统消息推送
export const informList = post('/inform/list') // 系统消息列表
export const informAdd = post('/inform/add') // 系统消息添加

// 会员

export const eduVipList = post('/eduVip/list') // 会员列表
// export const eduVipInfo = post('/eduVip/info') // 会员详情
export const eduVipFindDetail = post('/eduVip/findDetail') // 会员添加关联课程列表
export const eduVipUpdate = post('/eduVip/update') // 会员编辑
export const eduVipCourseList = post('/eduVip/courseList') // 课程列表
export const eduVipCategoryList = post('/eduVip/categoryList') // 课程列表类目
export const eduVipAddDetail = post('/eduVip/addDetail') // 会员添加关联课程
export const eduVipDel = post('/eduVip/deleteDetail') // 会员添加关联课程
export const eduVipMemberList = post('/eduVipMember/list') // 会员成员列表
export const rechargeSettingList = post('/umsRechargeSetting/list') // 充值列表
export const rechargeSettingAdd = post('/umsRechargeSetting/add') // 充值列表添加
export const rechargeSettingDelete = post('/umsRechargeSetting/delete') // 充值列表添加

// 在线客服列表
export const cmsOnlineServiceList = post('/cmsOnlineService/list') // 在线客服列表
export const cmsOnlineServiceAdminList = post('/cmsOnlineService/adminList') // 在线客服账户列表
export const cmsOnlineServiceUpdate = post('/cmsOnlineService/update') // 在线客服编辑
export const cmsOnlineServiceGetKeFu = post('/cmsOnlineService/getKeFu') // 在线客服获取秘钥

// 评价管理

export const commentCourseList = post('/courseComment/list') // 课程评论列表
export const commentCourseDel = post('/courseComment/delete') // 课程评论列表 删除
export const commentCourseUpdate = post('/courseComment/update') // 课程评论列表 修改排序
export const commentCourseInfo = post('/courseComment/info') // 课程评论详情
export const commentCourseUpdateIsHide = post('/courseComment/updateIsHide') // 课程评论隐藏开关
export const commentCourseUpdateStatus = post('/courseComment/updateStatus') // 课程评论状态改变

export const commentShopList = post('/goodsComment/list') // 商城评论列表
export const commentShopDel = post('/goodsComment/delete') // 商城评论列表 删除
export const commentShopUpdate = post('/goodsComment/update') // 商城评论 修改排序
export const commentShopInfo = post('/goodsComment/info') // 商城评论 详情
export const commentShopUpdateIsHide = post('/goodsComment/updateIsHide') // 商城评论 隐藏开关
export const commentShopUpdateStatus = post('/goodsComment/updateStatus') // 商城评论 状态改变

export const CommentNewsInformationList = post('/newsInformationComment/list') // 资讯评论列表
export const CommentNewsInformationDel = post('/newsInformationComment/delete') // 资讯评论列表 删除
export const CommentNewsInformationUpdate = post('/newsInformationComment/update') // 资讯评论 修改排序
export const CommentNewsInformationInfo = post('/newsInformationComment/info') // 资讯评论 详情
export const CommentNewsInformationUpdateIsHide = post('/newsInformationComment/updateIsHide') // 资讯评论 隐藏开关
export const CommentNewsInformationUpdateStatus = post('/newsInformationComment/updateStatus') // 资讯评论 状态改变

// 精品课程管理

export const boutiqueDelEduCourseType=post('/eduCourseType/delEduCourseType')//移除精品
export const boutiqueAddEduCourseType=post('/eduCourseType/addEduCourseType')//添加精品
export const boutiqueGetEduCourseTypePage=post('/eduCourseType/getEduCourseTypePage')//列表精品
//大咖访谈视频管理
export const masteGetCmsBigCoffeeVideoPageVo=post('/bigCoffeeVideo/getCmsBigCoffeeVideoPageVo')//访谈列表
export const masteAddCmsBigCoffeeVideo=post('/bigCoffeeVideo/addCmsBigCoffeeVideo')//访谈新增
export const masteDelCmsBigCoffeeVideo=post('/bigCoffeeVideo/delCmsBigCoffeeVideo')//访谈删除
export const masteGetCmsBigCoffeeVideoDetailVo=post('/bigCoffeeVideo/getCmsBigCoffeeVideoDetailVo')//访谈详情
export const masteUpdateCmsBigCoffeeVideo=post('/bigCoffeeVideo/updateCmsBigCoffeeVideo')//访谈修改
// 大咖访谈banner 
export const masteAddCmsBannerBigCoffee=post('/bannerBigCoffee/addCmsBannerBigCoffee')//访谈新增
export const masteAddDelCmsBannerBigCoffee=post('/bannerBigCoffee/delCmsBannerBigCoffee')//访谈删除
export const masteAddGetCmsBannerBigCoffeeList=post('/bannerBigCoffee/getCmsBannerBigCoffeeList')//访谈列表
//企业服务
export const getCmsEnterpriseServicesDetailVo=post('/enterpriseServices/getCmsEnterpriseServicesDetailVo')//企业服务详情
export const updateCmsEnterpriseServices=post('/enterpriseServices/updateCmsEnterpriseServices')//
export const getCmsEnterpriseRegistrationFormPage=post('/enterpriseServices/getCmsEnterpriseRegistrationFormPage')//企业服务列表
export const updateCmsEnterpriseRegistrationFormStatus=post('/enterpriseServices/updateCmsEnterpriseRegistrationFormStatus')//企业表单处理

// 大学生实训管理
export const getCmsStudentTrainingDetailVo=post('/studentTraining/getCmsStudentTrainingDetailVo')//大学生实训详情
export const updateCmsStudentTraining=post('/studentTraining/updateCmsStudentTraining')//大学生实训修改
export const getCmsStudentRegistrationFormPage=post('/studentTraining/getCmsStudentRegistrationFormPage')//大学生表单列表
export const updateCmsStudentRegistrationFormStatus=post('/studentTraining/updateCmsStudentRegistrationFormStatus')//大学生实训表单处理
