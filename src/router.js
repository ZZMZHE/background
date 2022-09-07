import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/login",
            component: () => import("views/f-login/f-login.vue")
        },
        {
            path: "/background",
            component: () => import("views/f-background/f-background.vue"),
            children: [
                {
                    path: "",
                    redirect: "home"
                },
                {
                    path: "home",
                    component: () => import("views/f-home/f-home.vue"),
                    children: [
                        {
                            path: "",
                            redirect: "view_count"
                        },
                        {
                            path: "view_count",
                            component: () =>
                                import("views/f-home/statistics/view_count.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "statistics" }
                                },
                                {
                                    name: "statistics",
                                    path: "statistics",
                                    component: () =>
                                        import("views/f-home/statistics/statistics.vue")
                                }
                            ]
                        },
                        {
                            path: "view_tip",
                            component: () =>
                                import("views/f-home/messageTip/view_tip.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "messageTip" }
                                },
                                {
                                    name: "messageTip",
                                    path: "messageTip",
                                    component: () =>
                                        import("views/f-home/messageTip/messageTip.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 用户管理
                    path: "user",
                    component: () => import("views/f-user/f-user.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'user' }
                        // },
                        {
                            path: "view_user",
                            component: () =>
                                import("views/f-user/userData/view_user.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "userData" }
                                },
                                {
                                    name: "userData",
                                    path: "userData",
                                    component: () =>
                                        import("views/f-user/userData/userData.vue")
                                },
                                {
                                    name: "userDetails",
                                    path: "userDetails",
                                    component: () =>
                                        import("views/f-user/userData/userDetails.vue")
                                }
                            ]
                        },
                        {
                            path: "view_student",
                            component: () =>
                                import("views/f-user/lineStudent/view_student.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "lineStudent" }
                                },
                                {
                                    name: "lineStudent",
                                    path: "lineStudent",
                                    component: () =>
                                        import("views/f-user/lineStudent/lineStudent.vue")
                                },
                                {
                                    name: "lineCourse",
                                    path: "lineCourse",
                                    component: () =>
                                        import("views/f-user/lineStudent/lineCourse.vue")
                                },
                                {
                                    name: "lineUserList",
                                    path: "lineUserList",
                                    component: () =>
                                        import("views/f-user/lineStudent/lineUserList.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 老师管理
                    path: "teacher",
                    component: () => import("views/f-teacher/f-teacher.vue"),
                    children: [
                        {
                            path: "",
                            redirect: { name: "teacherList" }
                        },
                        {
                            path: "view_teacher",
                            component: () =>
                                import("views/f-teacher/teacherList/view_teacher.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "teacherList" }
                                },
                                {
                                    name: "teacherList",
                                    path: "teacherList",
                                    component: () =>
                                        import("views/f-teacher/teacherList/teacherList.vue")
                                },
                                {
                                    name: "teacherAboutCourse",
                                    path: "teacherAboutCourse",
                                    component: () =>
                                        import("views/f-teacher/teacherList/teacherAboutCourse.vue")
                                },
                                {
                                    name: "topTeacherDetails",
                                    path: "topTeacherDetails",
                                    component: () =>
                                        import("views/f-teacher/teacherList/topTeacherDetails.vue")
                                },
                                {
                                    name: "addTeacher",
                                    path: "addTeacher",
                                    component: () =>
                                        import("views/f-teacher/teacherList/addTeacher.vue")
                                }
                            ]
                        },
                        {
                            path: "view_teacherHelp",
                            component: () =>
                                import("views/f-teacher/teacherHelp/view_teacherHelp.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "teacherHelp" }
                                },
                                {
                                    name: "teacherHelp",
                                    path: "teacherHelp",
                                    component: () =>
                                        import("views/f-teacher/teacherHelp/teacherHelp.vue")
                                },
                                {
                                    name: "teacherHelpAdd",
                                    path: "teacherHelpAdd",
                                    component: () =>
                                        import("views/f-teacher/teacherHelp/teacherHelpAdd.vue")
                                },
                                {
                                    name: "aboutTeacherHelp",
                                    path: "aboutTeacherHelp",
                                    component: () =>
                                        import("views/f-teacher/teacherHelp/aboutTeacherHelp.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 灵感库管理
                    path: "awaitAudit",
                    component: () =>
                        import("views/f-inspiration/awaitAudit.vue")
                },
                {
                    // 灵感库管理
                    path: "failAudit",
                    component: () => import("views/f-inspiration/failAudit.vue")
                },
                {
                    // 灵感库管理
                    path: "succeedAudit",
                    component: () =>
                        import("views/f-inspiration/succeedAudit.vue")
                },
                {
                    // 人才对接管理
                    //企业申请
                    path: "entApplication",
                    component: () =>
                        import("views/f-talents/entApplication.vue")
                },
                {
                    path: "particulars",
                    name:'particulars',
                    component: () =>
                        import("views/f-talents/particulars.vue")
                },
                {
                    name: "failAudit",
                    path: "failAudit",
                    component: () =>
                        import("views/f-talents/Enterprise/failAudit.vue")
                },
                {
                    name: "succeedAudit",
                    path: "succeedAudit",
                    component: () =>
                        import("views/f-talents/Enterprise/succeedAudit.vue")
                },
                {
                    // 广告位设置
                    path: "adv",
                    component: () =>
                        import("views/f-advertising/f-advertising.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'adv' }
                        // },
                        {
                            path: "view_regUpload",
                            component: () =>
                                import("views/f-advertising/regUpload/view_regUpload.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "regUpload" }
                                },
                                {
                                    name: "regUpload",
                                    path: "regUpload",
                                    component: () =>
                                        import("views/f-advertising/regUpload/regUpload.vue")
                                },
                                {
                                    name: "regUploadDetails",
                                    path: "regUploadDetails",
                                    component: () =>
                                        import("views/f-advertising/regUpload/regUploadDetails.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 广告管理
                    path: "banner",
                    component: () => import("views/f-banner/f-banner.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'banner' }
                        // },
                        {
                            // 引导图
                            path: "view_banner",
                            component: () =>
                                import("views/f-banner/bannerData/view_banner.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "bannerData" }
                                },
                                {
                                    name: "bannerData",
                                    path: "bannerData",
                                    component: () =>
                                        import("views/f-banner/bannerData/bannerData.vue")
                                },
                                {
                                    name: "bannerDateDetails",
                                    path: "bannerDateDetails",
                                    component: () =>
                                        import("views/f-banner/bannerData/bannerDateDetails.vue")
                                }
                            ]
                        },
                        {
                            // 首页banner
                            path: "view_bannerIndex",
                            component: () =>
                                import("views/f-banner/bannerIndex/view_bannerIndex.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "bannerIndex" }
                                },
                                {
                                    name: "bannerIndex",
                                    path: "bannerIndex",
                                    component: () =>
                                        import("views/f-banner/bannerIndex/bannerIndex.vue")
                                },
                                {
                                    name: "bannerIndexDetails",
                                    path: "bannerIndexDetails",
                                    component: () =>
                                        import("views/f-banner/bannerIndex/bannerIndexDetails.vue")
                                }
                            ]
                        },
                        {
                            // 首页下方banner
                            path: "view_IndexBottom",
                            component: () =>
                                import("views/f-banner/bannerIndexBottom/view_IndexBottom.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "bannerIndexBottom" }
                                },
                                {
                                    name: "bannerIndexBottom",
                                    path: "bannerIndexBottom",
                                    component: () =>
                                        import("views/f-banner/bannerIndexBottom/bannerIndexBottom.vue")
                                },
                                {
                                    name: "bannerIndexBottomDetails",
                                    path: "bannerIndexBottomDetails",
                                    component: () =>
                                        import("views/f-banner/bannerIndexBottom/bannerIndexBottomDetails.vue")
                                }
                            ]
                        },
                        {
                            // 首页下方banner
                            path: "view_IndexMid",
                            component: () =>
                                import("views/f-banner/bannerIndexMid/view_IndexMid.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "bannerIndexMid" }
                                },
                                {
                                    name: "bannerIndexMid",
                                    path: "bannerIndexMid",
                                    component: () =>
                                        import("views/f-banner/bannerIndexMid/bannerIndexMid.vue")
                                },
                                {
                                    name: "bannerIndexMidDetails",
                                    path: "bannerIndexMidDetails",
                                    component: () =>
                                        import("views/f-banner/bannerIndexMid/bannerIndexMidDetails.vue")
                                }
                            ]
                        },
                        {
                            // 发现banner
                            path: "view_findBanner",
                            component: () =>
                                import("views/f-banner/findBanner/view_findBanner.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "findBanner" }
                                },
                                {
                                    name: "findBanner",
                                    path: "findBanner",
                                    component: () =>
                                        import("views/f-banner/findBanner/findBanner.vue")
                                },
                                {
                                    name: "findBannerDetails",
                                    path: "findBannerDetails",
                                    component: () =>
                                        import("views/f-banner/findBanner/findBannerDetails.vue")
                                }
                            ]
                        },
                        {
                            // 线上教育banner
                            path: "view_educationBanner",
                            component: () =>
                                import("views/f-banner/educationBanner/view_educationBanner.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "educationBanner" }
                                },
                                {
                                    name: "educationBanner",
                                    path: "educationBanner",
                                    component: () =>
                                        import("views/f-banner/educationBanner/educationBanner.vue")
                                },
                                {
                                    name: "educationBannerDetails",
                                    path: "educationBannerDetails",
                                    component: () =>
                                        import("views/f-banner/educationBanner/educationBannerDetails.vue")
                                }
                            ]
                        },
                        {
                            // 线上教育banner
                            path: "view_educationBannerMid",
                            component: () =>
                                import("views/f-banner/educationBannerMid/view_educationBannerMid.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "educationBannerMid" }
                                },
                                {
                                    name: "educationBannerMid",
                                    path: "educationBannerMid",
                                    component: () =>
                                        import("views/f-banner/educationBannerMid/educationBannerMid.vue")
                                },
                                {
                                    name: "educationBannerMidDetails",
                                    path: "educationBannerMidDetails",
                                    component: () =>
                                        import("views/f-banner/educationBannerMid/educationBannerMidDetails.vue")
                                }
                            ]
                        },
                        {
                            // 在线教育下方banner
                            path: "view_educationBottomBanner",
                            component: () =>
                                import("views/f-banner/educationBottomBanner/view_educationBottomBanner.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "educationBottomBanner" }
                                },
                                {
                                    name: "educationBottomBanner",
                                    path: "educationBottomBanner",
                                    component: () =>
                                        import("views/f-banner/educationBottomBanner/educationBottomBanner.vue")
                                },
                                {
                                    name: "educationBottomBannerDetails",
                                    path: "educationBottomBannerDetails",
                                    component: () =>
                                        import("views/f-banner/educationBottomBanner/educationBottomBannerDetails.vue")
                                }
                            ]
                        },
                        {
                            // 商城banner
                            path: "view_shopBanner",
                            component: () =>
                                import("views/f-banner/shopBanner/view_shopBanner.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "shopBanner" }
                                },
                                {
                                    name: "shopBanner",
                                    path: "shopBanner",
                                    component: () =>
                                        import("views/f-banner/shopBanner/shopBanner.vue")
                                },
                                {
                                    name: "shopBannerDetails",
                                    path: "shopBannerDetails",
                                    component: () =>
                                        import("views/f-banner/shopBanner/shopBannerDetails.vue")
                                }
                            ]
                        },
                        {
                            // 商城分类页banner
                            path: "view_shopCategoryBanner",
                            component: () =>
                                import("views/f-banner/shopCategoryBanner/view_shopCategoryBanner.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "shopCategoryBanner" }
                                },
                                {
                                    name: "shopCategoryBanner",
                                    path: "shopCategoryBanner",
                                    component: () =>
                                        import("views/f-banner/shopCategoryBanner/shopCategoryBanner.vue")
                                },
                                {
                                    name: "shopCategoryBannerDetails",
                                    path: "shopCategoryBannerDetails",
                                    component: () =>
                                        import("views/f-banner/shopCategoryBanner/shopCategoryBannerDetails.vue")
                                }
                            ]
                        },
                        {
                            // 素材
                            path: "view_material",
                            component: () =>
                                import("views/f-banner/material/view_material.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "material" }
                                },
                                {
                                    name: "material",
                                    path: "material",
                                    component: () =>
                                        import("views/f-banner/material/material.vue")
                                }
                            ]
                        },
                        {
                            // 大咖banner
                            path: "view_masterBanner",
                            component: () =>
                                import("views/f-banner/masterBanner/view_masterBanner.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "masterBanner" }
                                },
                                {
                                    name: "masterBanner",
                                    path: "masterBanner",
                                    component: () =>
                                        import("views/f-banner/masterBanner/masterBanner.vue")
                                },
                                {
                                    name: "masterBannerUpData",
                                    path: "masterBannerUpData",
                                    component: () =>
                                        import("views/f-banner/masterBanner/masterBannerUpData.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 搜索推荐
                    path: "search",
                    component: () => import("views/f-search/f-search.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'search' }
                        // },
                        {
                            path: "view_indexSearch",
                            component: () =>
                                import("views/f-search/indexSearch/view_indexSearch.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "indexSearch" }
                                },
                                {
                                    name: "indexSearch",
                                    path: "indexSearch",
                                    component: () =>
                                        import("views/f-search/indexSearch/indexSearch.vue")
                                }
                            ]
                        },
                        {
                            path: "view_findSearch",
                            component: () =>
                                import("views/f-search/findSearch/view_findSearch.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "findSearch" }
                                },
                                {
                                    name: "findSearch",
                                    path: "findSearch",
                                    component: () =>
                                        import("views/f-search/findSearch/findSearch.vue")
                                }
                            ]
                        },
                        {
                            path: "view_courseSearch",
                            component: () =>
                                import("views/f-search/courseSearch/view_courseSearch.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "courseSearch" }
                                },
                                {
                                    name: "courseSearch",
                                    path: "courseSearch",
                                    component: () =>
                                        import("views/f-search/courseSearch/courseSearch.vue")
                                }
                            ]
                        },
                        {
                            path: "view_goodsSearch",
                            component: () =>
                                import("views/f-search/goodsSearch/view_goodsSearch.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "goodsSearch" }
                                },
                                {
                                    name: "goodsSearch",
                                    path: "goodsSearch",
                                    component: () =>
                                        import("views/f-search/goodsSearch/goodsSearch.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 类目设置
                    path: "category",
                    component: () => import("views/f-category/f-category.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'courseCate' }
                        // },
                        {
                            path: "view_courseCate",
                            component: () =>
                                import("views/f-category/courseCate/view_courseCate.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "courseCate" }
                                },
                                {
                                    name: "courseCate",
                                    path: "courseCate",
                                    component: () =>
                                        import("views/f-category/courseCate/courseCate.vue")
                                },
                                {
                                    name: "courseCateDetails",
                                    path: "courseCateDetails",
                                    component: () =>
                                        import("views/f-category/courseCate/courseCateDetails.vue")
                                },
                                {
                                    name: "courseCateDetails2",
                                    path: "courseCateDetails2",
                                    component: () =>
                                        import("views/f-category/courseCate/courseCateDetails2.vue")
                                }
                            ]
                        },
                        {
                            path: "view_shopCate",
                            component: () =>
                                import("views/f-category/shopCate/view_shopCate.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "shopCate" }
                                },
                                {
                                    name: "shopCate",
                                    path: "shopCate",
                                    component: () =>
                                        import("views/f-category/shopCate/shopCate.vue")
                                },
                                {
                                    name: "shopCateDetails",
                                    path: "shopCateDetails",
                                    component: () =>
                                        import("views/f-category/shopCate/shopCateDetails.vue")
                                }
                            ]
                        },
                        {
                            path: "view_msgCate",
                            component: () =>
                                import("views/f-category/msgCate/view_msgCate.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "msgCate" }
                                },
                                {
                                    name: "msgCate",
                                    path: "msgCate",
                                    component: () =>
                                        import("views/f-category/msgCate/msgCate.vue")
                                }
                                // ,
                                // {
                                //     name: 'msgCateDetails',
                                //     path: 'msgCateDetails',
                                //     component: () => import('views/f-category/msgCate/msgCateDetails.vue')
                                // }
                            ]
                        }
                    ]
                },
                {
                    // 客服设置
                    path: "serve",
                    component: () => import("views/f-serve/f-serve.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'serve' }
                        // },
                        {
                            path: "view_faq",
                            component: () =>
                                import("views/f-serve/faq/view_faq.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "faq" }
                                },
                                {
                                    name: "faq",
                                    path: "faq",
                                    component: () =>
                                        import("views/f-serve/faq/faq.vue")
                                },
                                {
                                    name: "faqDetails",
                                    path: "faqDetails",
                                    component: () =>
                                        import("views/f-serve/faq/faqDetails.vue")
                                }
                            ]
                        },
                        {
                            path: "view_feedback",
                            component: () =>
                                import("views/f-serve/feedback/view_feedback.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "feedback" }
                                },
                                {
                                    name: "feedback",
                                    path: "feedback",
                                    component: () =>
                                        import("views/f-serve/feedback/feedback.vue")
                                },
                                {
                                    name: "feedbackDetails",
                                    path: "feedbackDetails",
                                    component: () =>
                                        import("views/f-serve/feedback/feedbackDetails.vue")
                                }
                            ]
                        },
                        {
                            path: "view_onlineServe",
                            component: () =>
                                import("views/f-serve/onlineServe/view_onlineServe.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "onlineServe" }
                                },
                                {
                                    name: "onlineServe",
                                    path: "onlineServe",
                                    component: () =>
                                        import("views/f-serve/onlineServe/onlineServe.vue")
                                }
                            ]
                        },
                        {
                            path: "view_serveList",
                            component: () =>
                                import("views/f-serve/serveList/view_serveList.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "serveList" }
                                },
                                {
                                    name: "serveList",
                                    path: "serveList",
                                    component: () =>
                                        import("views/f-serve/serveList/serveList.vue")
                                }
                            ]
                        },
                        {
                            path: "view_onlineServeList",
                            component: () =>
                                import("views/f-serve/onlineServeList/view_onlineServeList.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "onlineServeList" }
                                },
                                {
                                    name: "onlineServeList",
                                    path: "onlineServeList",
                                    component: () =>
                                        import("views/f-serve/onlineServeList/onlineServeList.vue")
                                },
                                {
                                    name: "onlineServeListDetail",
                                    path: "onlineServeListDetail",
                                    component: () =>
                                        import("views/f-serve/onlineServeList/onlineServe.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 权限分配
                    path: "permission",
                    component: () =>
                        import("views/f-permission/f-permission.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'adv' }
                        // },
                        {
                            path: "view_permission",
                            component: () =>
                                import("views/f-permission/permission/view_permission.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "roleList" }
                                },
                                {
                                    name: "roleList",
                                    path: "roleList",
                                    component: () =>
                                        import("views/f-permission/permission/roleList.vue")
                                }
                            ]
                        },
                        {
                            path: "view_accountList",
                            component: () =>
                                import("views/f-permission/accountList/view_accountList.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "accountList" }
                                },
                                {
                                    name: "accountList",
                                    path: "accountList",
                                    component: () =>
                                        import("views/f-permission/accountList/accountList.vue")
                                },
                                {
                                    name: "addAccount",
                                    path: "addAccount",
                                    component: () =>
                                        import("views/f-permission/accountList/addAccount.vue")
                                },
                                {
                                    name: "updateAccount",
                                    path: "updateAccount",
                                    component: () =>
                                        import("views/f-permission/accountList/updateAccount.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 商城管理
                    path: "shop",
                    component: () => import("views/f-shop/f-shop.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'goods', query: { idp: 17 } }
                        // },
                        {
                            path: "view_shop",
                            component: () =>
                                import("views/f-shop/goods/view_shop.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "goods" }
                                },
                                {
                                    name: "goods",
                                    path: "goods",
                                    component: () =>
                                        import("views/f-shop/goods/goods.vue")
                                },
                                {
                                    name: "uploadGoods",
                                    path: "uploadGoods",
                                    component: () =>
                                        import("views/f-shop/goods/uploadGoods.vue")
                                },
                                {
                                    name: "upDateGoods",
                                    path: "upDateGoods",
                                    component: () =>
                                        import("views/f-shop/goods/upDateGoods.vue")
                                },
                                {
                                    name: "goodsTalk",
                                    path: "goodsTalk",
                                    component: () =>
                                        import("views/f-shop/goods/goodsTalk.vue")
                                },
                                {
                                    name: "talkDetails",
                                    path: "talkDetails",
                                    component: () =>
                                        import("views/f-shop/goods/talkDetails.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 订单管理
                    path: "order",
                    component: () => import("views/f-order/f-order.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'adv' }
                        // },
                        {
                            path: "view_order",
                            component: () =>
                                import("views/f-order/order/view_order.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "order" }
                                },
                                {
                                    name: "order",
                                    path: "order",
                                    component: () =>
                                        import("views/f-order/order/order.vue")
                                },
                                {
                                    name: "orderDetails",
                                    path: "orderDetails",
                                    component: () =>
                                        import("views/f-order/order/orderDetails.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 优惠券管理
                    path: "coupon",
                    component: () => import("views/f-coupon/f-coupon.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'adv' }
                        // },
                        {
                            path: "view_coupon",
                            component: () =>
                                import("views/f-coupon/coupon/view_coupon.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "coupon" }
                                },
                                {
                                    name: "coupon",
                                    path: "coupon",
                                    component: () =>
                                        import("views/f-coupon/coupon/coupon.vue")
                                },
                                {
                                    name: "couponDetails",
                                    path: "couponDetails",
                                    component: () =>
                                        import("views/f-coupon/coupon/couponDetails.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 精品课程
                    path: "boutique",
                    component: () => import("views/f_boutique/f-boutique.vue"),
                    children: [
                        {
                            path: "view_boutique",
                            component: () =>
                                import("views/f_boutique/boutique/view_boutique.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "boutique" }
                                },
                                {
                                    path: "boutique",
                                    name: "boutique",
                                    component: () =>
                                        import("views/f_boutique/boutique/boutique.vue")
                                },
                                {
                                    path: "boutiqueAdd",
                                    name: "boutiqueAdd",
                                    component: () =>
                                        import("views/f_boutique/boutique/boutiqueAdd.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 课程管理
                    path: "course",
                    component: () => import("views/f-course/f-course.vue"),
                    children: [
                        {
                            path: "view_course",
                            component: () =>
                                import("views/f-course/course/view_course.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "course" }
                                },
                                {
                                    name: "course",
                                    path: "course",
                                    component: () =>
                                        import("views/f-course/course/course.vue")
                                },
                                {
                                    name: "courseTalk",
                                    path: "courseTalk",
                                    component: () =>
                                        import("views/f-course/course/courseTalk.vue")
                                },
                                {
                                    name: "courseTalkDetails",
                                    path: "courseTalkDetails",
                                    component: () =>
                                        import("views/f-course/course/talkDetails.vue")
                                },
                                {
                                    name: "courseDetails",
                                    path: "courseDetails",
                                    component: () =>
                                        import("views/f-course/course/courseDetails.vue")
                                },
                                {
                                    name: "addCourse",
                                    path: "addCourse",
                                    component: () =>
                                        import("views/f-course/course/addCourse.vue")
                                },
                                {
                                    name: "student",
                                    path: "student",
                                    component: () =>
                                        import("views/f-course/course/student.vue")
                                }
                            ]
                        },
                        {
                            path: "view_subjectCourse",
                            component: () =>
                                import("views/f-course/subjectCourse/view_subjectCourse.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "subjectCourse" }
                                },
                                {
                                    name: "subjectCourse",
                                    path: "subjectCourse",
                                    component: () =>
                                        import("views/f-course/subjectCourse/subjectCourse.vue")
                                },
                                {
                                    name: "subjectDetails",
                                    path: "subjectDetails",
                                    component: () =>
                                        import("views/f-course/subjectCourse/subjectDetails.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 资讯管理
                    path: "information",
                    component: () =>
                        import("views/f-information/f-information.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'adv' }
                        // },
                        {
                            path: "view_information",
                            component: () =>
                                import("views/f-information/information/view_information.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "information" }
                                },
                                {
                                    name: "information",
                                    path: "information",
                                    component: () =>
                                        import("views/f-information/information/information.vue")
                                },
                                {
                                    name: "informationDetails",
                                    path: "informationDetails",
                                    component: () =>
                                        import("views/f-information/information/informationDetails.vue")
                                },
                                {
                                    name: "talkList",
                                    path: "talkList",
                                    component: () =>
                                        import("views/f-information/information/talkList.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 内容管理
                    path: "content",
                    component: () => import("views/f-content/f-content.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'adv' }
                        // },
                        {
                            path: "view_content",
                            component: () =>
                                import("views/f-content/contentList/view_content.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "contentList" }
                                },
                                {
                                    name: "contentList",
                                    path: "contentList",
                                    component: () =>
                                        import("views/f-content/contentList/contentList.vue")
                                },
                                {
                                    name: "contentDetails",
                                    path: "contentDetails",
                                    component: () =>
                                        import("views/f-content/contentList/contentDetails.vue")
                                },
                                {
                                    name: "addContent",
                                    path: "addContent",
                                    component: () =>
                                        import("views/f-content/contentList/addContent.vue")
                                }
                            ]
                        }
                        // {
                        //     path: 'view_active',
                        //     component: () => import('views/f-content/active/view_active.vue'),
                        //     children: [
                        //         {
                        //             path: '',
                        //             redirect: { name: 'active' }
                        //         },
                        //         {
                        //             name: 'active',
                        //             path: 'active',
                        //             component: () => import('views/f-content/active/active.vue')
                        //         },
                        //         {
                        //             name: 'activeDetails',
                        //             path: 'activeDetails',
                        //             component: () => import('views/f-content/active/activeDetails.vue')
                        //         }
                        //     ]
                        // },
                        // {
                        //     path: 'view_topic',
                        //     component: () => import('views/f-content/topic/view_topic.vue'),
                        //     children: [
                        //         {
                        //             path: '',
                        //             redirect: { name: 'topic' }
                        //         },
                        //         {
                        //             name: 'topic',
                        //             path: 'topic',
                        //             component: () => import('views/f-content/topic/topic.vue')
                        //         }
                        //     ]
                        // }
                    ]
                },
                {
                    // 审核管理
                    path: "audit",
                    component: () => import("views/f-audit/f-audit.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'adv' }
                        // },
                        {
                            path: "view_auditTeacher",
                            component: () =>
                                import("views/f-audit/auditTeacher/view_auditTeacher.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "auditTeacher" }
                                },
                                {
                                    name: "auditTeacher",
                                    path: "auditTeacher",
                                    component: () =>
                                        import("views/f-audit/auditTeacher/auditTeacher.vue")
                                },
                                {
                                    name: "auditDetails",
                                    path: "auditDetails",
                                    component: () =>
                                        import("views/f-audit/auditTeacher/auditDetails.vue")
                                }
                            ]
                        },
                        {
                            path: "view_auditPush",
                            component: () =>
                                import("views/f-audit/auditPush/view_auditPush.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "auditPush" }
                                },
                                {
                                    name: "auditPush",
                                    path: "auditPush",
                                    component: () =>
                                        import("views/f-audit/auditPush/auditPush.vue")
                                },
                                {
                                    name: "pushAuditDetails",
                                    path: "pushAuditDetails",
                                    component: () =>
                                        import("views/f-audit/auditTeacher/auditDetails.vue")
                                }
                            ]
                        },
                        {
                            path: "view_auditWithdraw",
                            component: () =>
                                import("views/f-audit/auditWithdraw/view_auditWithdraw.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "auditWithdraw" }
                                },
                                {
                                    name: "auditWithdraw",
                                    path: "auditWithdraw",
                                    component: () =>
                                        import("views/f-audit/auditWithdraw/auditWithdraw.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 战略合作
                    path: "strategic",
                    component: () =>
                        import("views/f-strategic/f-strategic.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'adv' }
                        // },
                        {
                            path: "view_strategic",
                            component: () =>
                                import("views/f-strategic/strategic/view_strategic.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "strategic" }
                                },
                                {
                                    name: "strategic",
                                    path: "strategic",
                                    component: () =>
                                        import("views/f-strategic/strategic/strategic.vue")
                                },
                                {
                                    name: "updateStrategic",
                                    path: "updateStrategic",
                                    component: () =>
                                        import("views/f-strategic/strategic/updateStrategic.vue")
                                }
                            ]
                        },
                        {
                            path: "view_info",
                            component: () =>
                                import("views/f-strategic/info/view_info.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "info" }
                                },
                                {
                                    name: "info",
                                    path: "info",
                                    component: () =>
                                        import("views/f-strategic/info/info.vue")
                                },
                                {
                                    name: "updateInfo",
                                    path: "updateInfo",
                                    component: () =>
                                        import("views/f-strategic/info/updateInfo.vue")
                                }
                            ]
                        },
                        {
                            path: "view_schoolVideo",
                            component: () =>
                                import("views/f-strategic/schoolVideo/view_schoolVideo.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "schoolVideo" }
                                },
                                {
                                    name: "schoolVideo",
                                    path: "schoolVideo",
                                    component: () =>
                                        import("views/f-strategic/schoolVideo/schoolVideo.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 推荐内容
                    path: "recommend",
                    component: () =>
                        import("views/f-recommend/f-recommend.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'adv' }
                        // },
                        {
                            path: "view_courseRecommend",
                            component: () =>
                                import("views/f-recommend/courseRecommend/view_courseRecommend.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "courseRecommend" }
                                },
                                {
                                    name: "courseRecommend",
                                    path: "courseRecommend",
                                    component: () =>
                                        import("views/f-recommend/courseRecommend/courseRecommend.vue")
                                }
                            ]
                        },
                        {
                            path: "view_teacherRecommend",
                            component: () =>
                                import("views/f-recommend/teacherRecommend/view_teacherRecommend.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "teacherRecommend" }
                                },
                                {
                                    name: "teacherRecommend",
                                    path: "teacherRecommend",
                                    component: () =>
                                        import("views/f-recommend/teacherRecommend/teacherRecommend.vue")
                                }
                            ]
                        },
                        {
                            path: "view_goodsRecommend",
                            component: () =>
                                import("views/f-recommend/goodsRecommend/view_goodsRecommend.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "categoryRecommend" }
                                },
                                {
                                    name: "categoryRecommend",
                                    path: "categoryRecommend",
                                    component: () =>
                                        import("views/f-recommend/goodsRecommend/categoryRecommend.vue")
                                },
                                {
                                    name: "goodsRecommend",
                                    path: "goodsRecommend",
                                    component: () =>
                                        import("views/f-recommend/goodsRecommend/goodsRecommend.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // vip管理
                    path: "vip",
                    component: () => import("views/f-vip/f-vip.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'adv' }
                        // },
                        {
                            path: "view_vip",
                            component: () =>
                                import("views/f-vip/vip/view_vip.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "vip" }
                                },
                                {
                                    name: "vip",
                                    path: "vip",
                                    component: () =>
                                        import("views/f-vip/vip/vip.vue")
                                },
                                {
                                    name: "edipVip",
                                    path: "edipVip",
                                    component: () =>
                                        import("views/f-vip/vip/edipVip.vue")
                                },
                                // {
                                //     name: 'updateVip',
                                //     path: 'updateVip',
                                //     component: () => import('views/f-vip/vip/updateVip.vue')
                                // },
                                {
                                    name: "vipCourseList",
                                    path: "vipCourseList",
                                    component: () =>
                                        import("views/f-vip/vip/vipCourseList.vue")
                                }
                            ]
                        },
                        {
                            path: "view_vipList",
                            component: () =>
                                import("views/f-vip/vipList/view_vipList.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "vipList" }
                                },
                                {
                                    name: "vipList",
                                    path: "vipList",
                                    component: () =>
                                        import("views/f-vip/vipList/vipList.vue")
                                }
                            ]
                        },
                        {
                            path: "view_topup",
                            component: () =>
                                import("views/f-vip/topup/view_topup.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "topup" }
                                },
                                {
                                    name: "topup",
                                    path: "topup",
                                    component: () =>
                                        import("views/f-vip/topup/topup.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 消息中心
                    path: "msg",
                    component: () => import("views/f-message/f-message.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'adv' }
                        // },
                        {
                            path: "view_system",
                            component: () =>
                                import("views/f-message/system/view_system.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "systemList" }
                                },
                                {
                                    name: "systemList",
                                    path: "systemList",
                                    component: () =>
                                        import("views/f-message/system/systemList.vue")
                                },
                                {
                                    name: "systemMessage",
                                    path: "systemMessage",
                                    component: () =>
                                        import("views/f-message/system/system.vue")
                                }
                            ]
                        },
                        {
                            path: "view_orderMessage",
                            component: () =>
                                import("views/f-message/orderMessage/view_orderMessage.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "orderMessage" }
                                },
                                {
                                    name: "orderMessage",
                                    path: "orderMessage",
                                    component: () =>
                                        import("views/f-message/orderMessage/orderMessage.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 财务统计
                    path: "finance",
                    component: () => import("views/f-finance/f-finance.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'adv' }
                        // },
                        {
                            path: "view_finance",
                            component: () =>
                                import("views/f-finance/finance/view_finance.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "finance" }
                                },
                                {
                                    name: "finance",
                                    path: "finance",
                                    component: () =>
                                        import("views/f-finance/finance/finance.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 评价管理
                    path: "comment",
                    component: () => import("views/f-talk/f-talk.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'adv' }
                        // },
                        {
                            path: "view_commentCourse",
                            component: () =>
                                import("views/f-talk/courseTalk/view_courseTalk.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "courseComment" }
                                },
                                {
                                    name: "courseComment",
                                    path: "courseComment",
                                    component: () =>
                                        import("views/f-talk/courseTalk/courseTalk.vue")
                                },
                                {
                                    name: "courseCommentDetails",
                                    path: "courseCommentDetails",
                                    component: () =>
                                        import("views/f-talk/courseTalk/talkDetails.vue")
                                }
                            ]
                        },
                        {
                            path: "view_commentShop",
                            component: () =>
                                import("views/f-talk/shopTalk/view_shopTalk.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "shopComment" }
                                },
                                {
                                    name: "shopComment",
                                    path: "shopComment",
                                    component: () =>
                                        import("views/f-talk/shopTalk/shopTalk.vue")
                                },
                                {
                                    name: "shopCommentDetails",
                                    path: "shopCommentDetails",
                                    component: () =>
                                        import("views/f-talk/shopTalk/talkDetails.vue")
                                }
                            ]
                        },
                        {
                            path: "view_commentInfo",
                            component: () =>
                                import("views/f-talk/infoTalk/view_infoTalk.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "infoComment" }
                                },
                                {
                                    name: "infoComment",
                                    path: "infoComment",
                                    component: () =>
                                        import("views/f-talk/infoTalk/infoTalk.vue")
                                },
                                {
                                    name: "infoCommentDetails",
                                    path: "infoCommentDetails",
                                    component: () =>
                                        import("views/f-talk/infoTalk/talkDetails.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 大咖访谈管理
                    path: "masterVideo",
                    component: () =>
                        import("views/f-masterVideo/f-masterVideo.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'adv' }
                        // },
                        {
                            path: "view_masterVideo",
                            component: () =>
                                import("views/f-masterVideo/masterVideo/view_masterVideo.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "masterVideo" }
                                },
                                {
                                    name: "masterVideo",
                                    path: "masterVideo",
                                    component: () =>
                                        import("views/f-masterVideo/masterVideo/masterVideo.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 企业服务管理
                    path: "entrepreneur",
                    component: () =>
                        import("views/f-entrepreneur/f-entrepreneur.vue"),
                    children: [
                        {
                            path: "view_entrepreneur",
                            component: () =>
                                import("views/f-entrepreneur/entrepreneur/view_entrepreneur.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "entrepreneur" }
                                },
                                {
                                    name: "entrepreneur",
                                    path: "entrepreneur",
                                    component: () =>
                                        import("views/f-entrepreneur/entrepreneur/entrepreneur.vue")
                                }
                            ]
                        },
                        {
                            path: "view_practical",
                            component: () =>
                                import("views/f-entrepreneur/practical/view_practical.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "practical" }
                                },
                                {
                                    name: "practical",
                                    path: "practical",
                                    component: () =>
                                        import("views/f-entrepreneur/practical/practical.vue")
                                },
                                {
                                    name: "practicalist",
                                    path: "practicalist",
                                    component: () =>
                                        import("views/f-entrepreneur/practical/practicalist.vue")
                                }
                            ]
                        },
                        {
                            path: "view_training",
                            component: () =>
                                import("views/f-entrepreneur/training/view_training.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "training" }
                                },
                                {
                                    name: "training",
                                    path: "training",
                                    component: () =>
                                        import("views/f-entrepreneur/training/training.vue")
                                }
                            ]
                        },
                        {
                            path: "view_apply",
                            component: () =>
                                import("views/f-entrepreneur/apply/view_apply.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "apply" }
                                },
                                {
                                    name: "apply",
                                    path: "apply",
                                    component: () =>
                                        import("views/f-entrepreneur/apply/apply.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 大学生实训管理
                    path: "undergraduate",
                    component: () =>
                        import("views/f-undergraduate/f-undergraduate.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'adv' }
                        // },
                        {
                            path: "view_undergraduater",
                            component: () =>
                                import("views/f-undergraduate/undergraduate/view_undergraduate.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "undergraduate" }
                                },
                                {
                                    name: "undergraduate",
                                    path: "undergraduate",
                                    component: () =>
                                        import("views/f-undergraduate/undergraduate/undergraduate.vue")
                                }
                            ]
                        },
                        {
                            path: "view_uapply",
                            component: () =>
                                import("views/f-undergraduate/uapply/view_uapply.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "uapply" }
                                },
                                {
                                    name: "uapply",
                                    path: "uapply",
                                    component: () =>
                                        import("views/f-undergraduate/uapply/uapply.vue")
                                }
                            ]
                        },
                        {
                            path: "view_upractical",
                            component: () =>
                                import("views/f-undergraduate/upractical/view_upractical.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "upractical" }
                                },
                                {
                                    name: "upractical",
                                    path: "upractical",
                                    component: () =>
                                        import("views/f-undergraduate/upractical/upractical.vue")
                                },
                                {
                                    name: "upracticalist",
                                    path: "upracticalist",
                                    component: () =>
                                        import("views/f-undergraduate/upractical/upracticalist.vue")
                                }
                            ]
                        }
                    ]
                },
                {
                    // 发现管理
                    path: "find",
                    component: () => import("views/f-find/f-find.vue"),
                    children: [
                        // {
                        //     path: '',
                        //     redirect: { name: 'adv' }
                        // },
                        {
                            path: "view_active",
                            component: () =>
                                import("views/f-find/active/view_active.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "active" }
                                },
                                {
                                    name: "active",
                                    path: "active",
                                    component: () =>
                                        import("views/f-find/active/active.vue")
                                },
                                {
                                    name: "activeDetails",
                                    path: "activeDetails",
                                    component: () =>
                                        import("views/f-find/active/activeDetails.vue")
                                }
                            ]
                        },
                        {
                            path: "view_topic",
                            component: () =>
                                import("views/f-find/topic/view_topic.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "topic" }
                                },
                                {
                                    name: "topic",
                                    path: "topic",
                                    component: () =>
                                        import("views/f-find/topic/topic.vue")
                                }
                            ]
                        },
                        {
                            path: "view_advertising",
                            component: () =>
                                import("views/f-find/advertising/view_advertising.vue"),
                            children: [
                                {
                                    path: "",
                                    redirect: { name: "advertising" }
                                },
                                {
                                    name: "advertising",
                                    path: "advertising",
                                    component: () =>
                                        import("views/f-find/advertising/advertising.vue")
                                },
                                {
                                    name: "advertisingDetails",
                                    path: "advertisingDetails",
                                    component: () =>
                                        import("views/f-find/advertising/advertisingDetails.vue")
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
