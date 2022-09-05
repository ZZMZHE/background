<template>
    <div class="onlineServe">
        <div class="conn">
            <div class="userListLeft">
                <div class="userBoxList">
                    <div class="userBox" :class="userBoxIndex == item.groupProfile.userID ? 'userActive' : ''" v-for="(item, i) in talkList" :key="i" @click="getTalkOneList(item.conversationID, item.type, item.groupProfile.userID, item.groupProfile.avatar, item.groupProfile.nick)">
                        <div class="unreadCount" v-if="item.unreadCount <= 99 && item.unreadCount > 0">{{item.unreadCount}}</div>
                        <div class="unreadCount" v-if="item.unreadCount > 99">99+</div>
                        <div class="faceImgbox">
                            <img :src="item.groupProfile.avatar || require('../../../assets/images/userFaceUrl.png')" alt="头像">
                        </div>
                        <div class="userBoxLeft">
                            <div class="nickname">{{item.groupProfile.name}}</div>
                            <div class="lastMsg">{{item.lastMessage.messageForShow}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="talkRoom">
                <div class="msgList" v-if="msgList.length > 0" ref="msgBox">
                    <div class="lookMore" @click="lookMore" v-if="!isCompleted">
                        <span>点击查看更多</span>
                    </div>
                    <div class="msgBox" :class="item.isMy == 1 ? 'myMsg' : ''" v-for="(item, index) in msgList" :key="index">
                        <div class="nickname">{{item.nick}}</div>
                        <div class="imgBox" v-if="item.isMy == 1">
                            <img :src="item.avatar || require('../../../assets/images/userFaceUrl.png')" alt="头像">
                        </div>
                        <!-- @click="openDia(item)" -->
                        <div class="imgBox" v-else>
                            <img :src="item.avatar || require('../../../assets/images/userFaceUrl.png')" alt="头像">
                        </div>
                        <div class="msgRight" v-if="item.type == 'TIMTextElem'">
                            <i></i>
                            <div class="txt">{{item.payload.text}}</div>
                        </div>
                        <div class="msgRight" v-if="item.type == 'TIMImageElem'">
                            <i></i>
                            <div class="picBox" @click="lookPic(item.payload.imageInfoArray[1].imageUrl)">
                                <img :src="item.payload.imageInfoArray[1].imageUrl" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sendBox">
                    <div class="toolList">
                        <div class="uploadPic">
                            <!-- 发送图片 -->
                            <el-upload
                                class="upload-demo"
                                :action="uploadUrl"
                                accept="image/*"
                                :before-upload="getPicFaile"
                                :show-file-list="false"
                                :on-change="choosePic">
                                <i class="el-icon-picture"></i>
                            </el-upload>
                        </div>
                    </div>
                    <!-- 发送内容 -->
                    <el-input
                        type="textarea"
                        class="ipt"
                        :autosize="{ minRows: 4, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="msg">
                    </el-input>
                    <div class="send" @click="handleSend">发送</div>
                </div>
            </div>
        </div>
        <!-- 禁言弹框 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="20%">
            <el-form :model="form">
                <el-form-item label="是否禁言" :label-width="formLabelWidth">
                 <el-radio-group v-model="form.resource">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="2">否</el-radio>
                </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="bannedTalk">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 聊天图片预览 -->
        <el-dialog :visible.sync="dialogVisible" width="30%">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import TIM from 'tim-js-sdk'
import COS from 'cos-js-sdk-v5' // 发送图片等其他内容的sdk
import { adminIMGetKeFu } from 'api/index.js' // 接口拿签名

export default {
    name: 'onlineServe',
    components: {},
    data() {
        return {
            dialogImageUrl: undefined,
            dialogVisible: false,
            msg: '',
            msgList: [],
            dialogFormVisible: false,
            formLabelWidth: '85px',
            title: '',
            form: {
                resource: '2'
            },
            userData: {},
            talkList: [],
            // im相关
            // SDKAppID: 1400372855,
            // 1400404236 39的 1400397964 正式的 sdkappid
            // tim: TIM.create({ SDKAppID: 1400397964 }),
            tim: TIM.create({ SDKAppID: 1400404236 }),
            talkId: '',
            nextReqMessageID: '',
            isCompleted: '',
            talkType: '',
            userId: '',
            sign: '',
            myId: '',
            myFaceUrl: '',
            myNick: '',
            userBoxIndex: '',
            userName: '',
            userImg: ''
        }
    },
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + '30'
        }
    },
    watch: {},
    methods: {
        getLogin() {
            // 获取签名信息
            adminIMGetKeFu().then(res => {
                if (res.status === 200) {
                    this.userID = res.data.userId
                    this.sign = res.data.sign
                    this.getInit()
                }
            })
        },
        // 初始化IM
        getInit() {
            // userId : 1
            // sign :eJyrVgrxCdZLrSjILEpVsjIzMLEwMNABi5WlFilZKRnpGShB*MUp2YkFBZkpSlaGJgYGxuZGFqamEJnMlNS8ksy0TLAGQ5jyzHQgz8lbX9-c16UwxSW5PKrEvMjEPbjSP9S7pCg81d1bPyzQ098xKNm9KtsiO90WqrEkMxfoEkNTSwMDIzNDC-NaAOnXLvU_
            // @TGS#a6QGC5OGL 群id
            // 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
            // let options = {
            //     SDKAppID: 1400372855 // 接入时需要将0替换为您的即时通信应用的 SDKAppID: 1400372855
            // }
            // let tim = TIM.create(options) // SDK 实例通常用 tim 表示
            // 设置 SDK 日志输出级别，详细分级请参考 setLogLevel 接口的说明
            this.tim.setLogLevel(1) // 普通级别，日志量较多，接入时建议使用 0 普通 1 高级 上线后用高级，调试用普通
            this.tim.registerPlugin({ 'cos-js-sdk': COS })
            this.tim.on(TIM.EVENT.SDK_READY, function (event) {
            // SDK ready 后接入侧才可以调用 sendMessage 等需要鉴权的接口，否则会提示失败！
            // event.name - TIM.EVENT.SDK_READY
            })
            const that = this
            this.tim.on(TIM.EVENT.MESSAGE_RECEIVED, function(event) {
                // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
                // event.name - TIM.EVENT.MESSAGE_RECEIVED
                // event.data - 存储 Message 对象的数组 - [Message]
                const length = event.data.length
                let message
                for (let i = 0; i < length; i++) {
                // Message 实例的详细数据结构请参考 Message
                // 其中 type 和 payload 属性需要重点关注
                // 从v2.6.0起，AVChatRoom 内的群聊消息，进群退群等群提示消息，增加了 nick（昵称） 和 avatar（头像URL） 属性，便于接入侧做体验更好的展示
                // 前提您需要先调用 updateMyProfile 设置自己的 nick（昵称） 和 avatar（头像 URL），请参考 updateMyProfile 接口的说明
                    message = event.data[i]
                    switch (message.type) {
                    case TIM.TYPES.MSG_TEXT:
                        // 收到了文本消息
                        that._handleTextMsg(message)
                        break
                    case TIM.TYPES.MSG_CUSTOM:
                        // 收到了自定义消息
                        that._handleCustomMsg(message)
                        break
                    case TIM.TYPES.MSG_GRP_TIP:
                        // 收到了群提示消息，如成员进群、群成员退群
                        that._handleGroupTip(message)
                        break
                    case TIM.TYPES.MSG_GRP_SYS_NOTICE:
                        // 收到了群系统通知，通过 REST API 在群组中发送的系统通知请参考 在群组中发送系统通知 API
                        that._handleGroupSystemNotice(message)
                        break
                    default:
                        break
                    }
                }
            })
            // 登录
            let promise = this.tim.login({ userID: this.userID, userSig: this.sign })
            promise.then(function(imResponse) {
                console.log('登录成功', imResponse.data) // 登录成功
            }).catch(function(imError) {
                console.warn('login error:', imError) // 登录失败的相关信息
            })
            // 加群
            // setTimeout(() => {
            //     let Group = this.tim.joinGroup({ groupID: '1' })
            //     Group.then(function(imResponse) {
            //         switch (imResponse.data.status) {
            //         case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // 等待管理员同意
            //             break
            //         case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
            //             console.log('加群成功', imResponse.data.group) // 加入的群组资料
            //             break
            //         case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
            //             console.log('已在群中')
            //             break
            //         default:
            //             break
            //         }
            //     }).catch(function(imError) {
            //         console.warn('joinGroup error:', imError) // 申请加群失败的相关信息
            //     })
            // }, 1000)
            // 从v2.6.0起，AVChatRoom 内的群聊消息，进群退群等群提示消息，增加了 nick（昵称） 和 avatar（头像URL） 属性，便于接入侧做体验更好的展示，前提您需要先调用 updateMyProfile 设置个人资料。
            // 修改个人标配资料
            setTimeout(() => {
                let promise = this.tim.getMyProfile()
                const that = this
                promise.then(function(imResponse) {
                    // console.log('个人资料', imResponse.data) // 个人资料 - Profile 实例
                    that.myId = imResponse.data.userID
                    that.myFaceUrl = imResponse.data.avatar
                    that.myNick = imResponse.data.nick
                }).catch(function(imError) {
                    console.warn('getMyProfile error:', imError) // 获取个人资料失败的相关信息
                })
            }, 1000)
            setTimeout(() => {
                this.getMessageList()
            }, 1000)
        },
        // 获取会话列表
        getMessageList() {
            const that = this
            let getTalkList = this.tim.getConversationList()
            getTalkList.then(function(imResponse) {
                var conversationList = imResponse.data.conversationList // 会话列表，用该列表覆盖原有的会话列表
                console.log('会话列表', conversationList)
                that.talkList = []
                conversationList.forEach(ele => {
                    if (ele.type === '@TIM#SYSTEM') {

                    } else if (ele.type === 'C2C') {
                        ele['groupProfile'] = ele.userProfile
                        ele.groupProfile.name = ele.userProfile.nick
                        that.talkList.push(ele)
                    } else if (ele.type === 'GROUP') {
                        ele.groupProfile['userID'] = ele.groupProfile.groupID
                        that.talkList.push(ele)
                    }
                })
                that.talkId = conversationList[0].groupProfile.groupID
                // 会话列表信息解析处理，请求后台接口获取对应聊天人信息
            }).catch(function(imError) {
                console.warn('getConversationList error:', imError) // 获取会话列表失败的相关信息
            })
        },
        // 消息已读
        getReadMessage(id) {
            // 将某会话下所有未读消息已读上报
            let promise = this.tim.setMessageRead({ conversationID: id })
            promise.then(function(imResponse) {
                // 已读上报成功
                // console.log('已读', imResponse)
            }).catch(function(imError) {
                // 已读上报失败
                console.warn('setMessageRead error:', imError)
            })
        },
        getPicFaile() {
            return false
        },
        // 发送图片
        choosePic(file) {
            if (file.status === 'ready') {
                const that = this
                // 1. 创建消息实例，接口返回的实例可以上屏
                let message = that.tim.createImageMessage({
                    to: that.userId + '',
                    conversationType: TIM.TYPES.CONV_C2C,
                    payload: {
                        file: file.raw
                    },
                    onProgress: function(event) { console.log('file uploading:', event) }
                })
                // 2. 发送消息
                let promise = that.tim.sendMessage(message)
                promise.then(function(imResponse) {
                    // 发送成功
                    // console.log('发送图片成功', imResponse.data.message)
                    imResponse.data.message.nick = that.myNick
                    imResponse.data.message.avatar = that.myFaceUrl
                    imResponse.data.message['isMy'] = 1
                    if (that.talkId.toString() === imResponse.data.message.conversationID.toString()) {
                        that.msgList.push(imResponse.data.message)
                    }
                    setTimeout(() => {
                        that.$refs.msgBox.scrollTop = that.$refs.msgBox.scrollHeight
                    }, 300)
                }).catch(function(imError) {
                    // 发送失败
                    console.warn('sendMessage error:', imError)
                })
            }
        },
        // 点击查看聊天中的图片
        lookPic(url) {
            this.dialogImageUrl = url
            this.dialogVisible = true
        },
        // 发送信息
        handleSend() {
            if (this.msg === '') {
                return this.$message.error('请输入要发送的内容')
            }
            // console.log(this.userId)
            // let options = {
            //     SDKAppID: 1400372855 // 接入时需要将0替换为您的即时通信应用的 SDKAppID: 1400372855
            // }
            // let tim = TIM.create(options) // SDK 实例通常用 tim 表示
            // 发送文本消息，Web 端与小程序端相同
            // 1. 创建消息实例，接口返回的实例可以上屏
            const that = this
            // 2. 发送消息
            // setTimeout(() => {
            let conversationType = TIM.TYPES.CONV_GROUP
            if (that.talkType === 'C2C') {
                conversationType = TIM.TYPES.CONV_C2C
            }
            let message = that.tim.createTextMessage({
                to: that.userId + '',
                conversationType: conversationType,
                // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考 消息优先级与频率控制
                // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
                priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
                payload: {
                    text: that.msg
                }
            })
            let promise = that.tim.sendMessage(message)
            promise.then(function(imResponse) {
                // 发送成功
                // console.log('发送成功', imResponse.data.message)
                imResponse.data.message.nick = that.myNick
                imResponse.data.message.avatar = that.myFaceUrl
                imResponse.data.message['isMy'] = 1
                if (that.talkId.toString() === imResponse.data.message.conversationID.toString()) {
                    that.msgList.push(imResponse.data.message)
                }
                that.msg = ''
                setTimeout(() => {
                    that.$refs.msgBox.scrollTop = that.$refs.msgBox.scrollHeight
                }, 300)
            }).catch(function(imError) {
                // 发送失败
                console.warn('sendMessage error:', imError)
            })
            // }, 1500)
        },

        _handleTextMsg(message) {
            // 详细数据结构请参考详细数据结构请参考 TextPayload 接口的说明
            // console.log('文本消息内容', message) // 文本消息内容
            message['isMy'] = 0
            if (message.avatar === '') {
                message.avatar = this.userImg
            }
            if (message.nick === '') {
                message.nick = this.userName
            }
            if (message.conversationID.toString() === this.talkId.toString()) {
                this.msgList.push(message)
                setTimeout(() => {
                    this.$refs.msgBox.scrollTop = this.$refs.msgBox.scrollHeight
                }, 300)
            }
            this.getMessageList()
        },

        _handleCustomMsg(message) {
            // 详细数据结构请参考 CustomPayload 接口的说明
            // console.log(message.payload)
        },

        _handleGroupTip(message) {
            // 详细数据结构请参考 GroupTipPayload 接口的说明
            switch (message.payload.operationType) {
            // case TIM.TYPES.GRP_TIP_MBR_JOIN: // 有成员加群
            //     break
            // case TIM.TYPES.GRP_TIP_MBR_QUIT: // 有群成员退群
            //     break
            // case TIM.TYPES.GRP_TIP_MBR_KICKED_OUT: // 有群成员被踢出群
            //     break
            // case TIM.TYPES.GRP_TIP_MBR_SET_ADMIN: // 有群成员被设为管理员
            //     break
            // case TIM.TYPES.GRP_TIP_MBR_CANCELED_ADMIN: // 有群成员被撤销管理员
            //     break
            // case TIM.TYPES.GRP_TIP_GRP_PROFILE_UPDATED: // 群组资料变更
            //     // 从v2.6.0起支持群组自定义字段变更内容
            //     // message.payload.newGroupProfile.groupCustomField
            //     break
            // case TIM.TYPES.GRP_TIP_MBR_PROFILE_UPDATED: // 群成员资料变更，例如群成员被禁言
            //     break
            // default:
            //     break
            case this.TIM.TYPES.GRP_TIP_MBR_JOIN:
                return `群成员：${message.payload.userIDList.join(',')}，加入群组`
            case this.TIM.TYPES.GRP_TIP_MBR_QUIT:
                return `群成员：${message.payload.userIDList.join(',')}，退出群组`
            case this.TIM.TYPES.GRP_TIP_MBR_KICKED_OUT:
                return `群成员：${message.payload.userIDList.join(',')}，被${message.payload.operatorID}踢出群组`
            case this.TIM.TYPES.GRP_TIP_MBR_SET_ADMIN:
                return `群成员：${message.payload.userIDList.join(',')}，成为管理员`
            case this.TIM.TYPES.GRP_TIP_MBR_CANCELED_ADMIN:
                return `群成员：${message.payload.userIDList.join(',')}，被撤销管理员`
            default:
                return '[群提示消息]'
            }
        },
        _handleGroupSystemNotice(message) {
            // 详细数据结构请参考  GroupSystemNoticePayload 接口的说明
            // console.log(message.payload.userDefinedField) // 用户自定义字段。使用 RESTAPI 发送群系统通知时，可在该属性值中拿到自定义通知的内容。
            // function parseGroupSystemNotice (payload) {
            // const groupName = message.payload.groupProfile.groupName || message.payload.groupProfile.groupID
            // switch (message.payload.operationType) {
            // case 1:
            //     return `${message.payload.operatorID} 申请加入群组：${groupName}`
            // case 2:
            //     return `成功加入群组：${groupName}`
            // case 3:
            //     return `申请加入群组：${groupName}被拒绝`
            // case 4:
            //     return `被管理员${message.payload.operatorID}踢出群组：${groupName}`
            // case 5:
            //     return `群：${groupName} 已被${message.payload.operatorID}解散`
            // case 6:
            //     return `${message.payload.operatorID}创建群：${groupName}`
            // case 7:
            //     return `${message.payload.operatorID}邀请你加群：${groupName}`
            // case 8:
            //     return `你退出群组：${groupName}`
            // case 9:
            //     return `你被${message.payload.operatorID}设置为群：${groupName}的管理员`
            // case 10:
            //     return `你被${message.payload.operatorID}撤销群：${groupName}的管理员身份`
            // case 255:
            //     return '自定义群系统通知'
            // }
            // }
        // 用 REST API 发送群系统通知请参考 在群组中发送系统通知 API
        },
        // 查看更多
        lookMore() {
            const that = this
            let promise = that.tim.getMessageList({ conversationID: that.talkId, nextReqMessageID: that.nextReqMessageID, count: 10 })
            promise.then(function(imResponse) {
                // console.log('加载更多', imResponse.data)
                imResponse.data.messageList.forEach(ele => {
                    if (ele.from === that.myId) {
                        ele['isMy'] = 1
                        ele.avatar = that.myFaceUrl
                        ele.nick = that.myNick
                    } else {
                        ele['isMy'] = 0
                        ele.avatar = that.userImg
                        ele.nick = that.userName
                    }
                    that.msgList.push(ele)
                    that.msgList.sort(function(a, b) {
                        return a.time - b.time
                    })
                })
                that.nextReqMessageID = imResponse.data.nextReqMessageID // 用于续拉，分页续拉时需传入该字段。
                that.isCompleted = imResponse.data.isCompleted // 表示是否已经拉完所有消息。
                setTimeout(() => {
                    that.$refs.msgBox.scrollTop = 0
                }, 300)
            })
        },
        // 会话详情
        getTalkOneList(id, t, uId, img, name) {
            // console.log('uid', id)
            this.userBoxIndex = uId
            this.userName = name
            this.userImg = img
            this.msgList = []
            // let options = {
            //     SDKAppID: 1400372855 // 接入时需要将0替换为您的即时通信应用的 SDKAppID: 1400372855
            // }
            // let tim = TIM.create(options) // SDK 实例通常用 tim 表示
            // let oneMsgDetails = tim.getConversationProfile('GROUP' + '1')
            const that = this
            // oneMsgDetails.then(function(imResponse) {
            //     // 获取成功
            //     console.log('会话资料', imResponse.data) // 会话资料
            //     let obj = {}
            //     imResponse.data.groupProfile['nick'] = imResponse.data.groupProfile.name
            //     // that.msgList.push(imResponse.data.groupProfile)
            // }).catch(function(imError) {
            //     console.warn('getConversationProfile error:', imError) // 获取会话资料失败的相关信息
            // })
            // GROUP+groupID
            // console.log('id', id)
            that.talkId = id
            that.talkType = t
            that.userId = uId
            var promise = that.tim.getMessageList({
                conversationID: id + '', // id为对应聊天人的userID
                count: 10 // 一次拉取的聊天条数
            })

            promise.then(function(imResponse) {
                console.log('啦啦啦啦啦啦啦啦啦啦啦', imResponse.data.messageList)
                imResponse.data.messageList.forEach(ele => {
                    if (ele.from === that.myId) {
                        ele['isMy'] = 1
                        if (t === 'C2C') {
                            ele.avatar = that.myFaceUrl
                            ele.nick = that.myNick
                        }
                    } else {
                        ele['isMy'] = 0
                        if (t === 'C2C') {
                            ele.avatar = img
                            ele.nick = name
                        }
                    }
                })
                that.msgList = imResponse.data.messageList
                // var list = []
                // var  messageList = imResponse.data.messageList // 消息列表。
                that.nextReqMessageID = imResponse.data.nextReqMessageID // 用于续拉，分页续拉时需传入该字段。
                that.isCompleted = imResponse.data.isCompleted // 表示是否已经拉完所有消息。

                // messageList.map(function(item) {
                //     //解析聊天消息
                // }
            })
            that.getReadMessage(id)
            setTimeout(() => {
                that.$refs.msgBox.scrollTop = that.$refs.msgBox.scrollHeight
            }, 300)
        },
        // 禁言弹框
        openDia(data) {
            console.log(data)
            this.userData = data
            // let options = {
            //     SDKAppID: 1400372855 // 接入时需要将0替换为您的即时通信应用的 SDKAppID: 1400372855
            // }
            // let tim = TIM.create(options) // SDK 实例通常用 tim 表示
            // let oneMsgDetails = tim.getConversationProfile('GROUP' + '1')
            const that = this
            let promise = that.tim.getGroupMemberList({ groupID: '1', count: 30, offset: 0 }) // 从0开始拉取30个群成员
            promise.then(function(imResponse) {
                // console.log(imResponse.data.memberList) // 群成员列表
                for (let groupMember of imResponse.data.memberList) {
                    if (data.from === groupMember.userID) {
                        if (groupMember.muteUntil * 1000 > Date.now()) {
                            // console.log(`${groupMember.userID} 禁言中`)
                            that.form.resource = '1'
                        } else {
                            // console.log(`${groupMember.userID} 未被禁言`)
                            that.form.resource = '2'
                        }
                    }
                }
            }).catch(function(imError) {
                console.warn('getGroupMemberProfile error:', imError)
            })
            this.title = '是否禁言' + data.nick
            this.dialogFormVisible = true
        },
        // 禁言
        bannedTalk() {
            // console.log(this.form.resource)
            // console.log(this.userData)
            // let options = {
            //     SDKAppID: 1400372855 // 接入时需要将0替换为您的即时通信应用的 SDKAppID: 1400372855
            // }
            // let tim = TIM.create(options) // SDK 实例通常用 tim 表示
            const that = this
            if (this.form.resource === '1') {
                let promise = that.tim.setGroupMemberMuteTime({
                    groupID: '1',
                    userID: this.userData.from + '',
                    muteTime: 3600
                })
                promise.then(function(res) {
                    // console.log('禁言', res)
                    that.dialogFormVisible = false
                }).catch(function(err) {
                    console.log(err)
                })
            } else {
                let promise = that.tim.setGroupMemberMuteTime({
                    groupID: '1',
                    userID: this.userData.from + '',
                    muteTime: 0
                })
                promise.then(function(res) {
                    // console.log('取消禁言', res)
                    that.dialogFormVisible = false
                }).catch(function(err) {
                    console.log(err)
                })
            }
        }
    },
    created() {
        this.getLogin()
    },
    beforeRouteLeave (to, from, next) { // 离开页面退出IM
        let promise = this.tim.logout()
        if (promise) {
            promise.then(function(imResponse) {
                console.log('登出', imResponse.data) // 登出成功
                next()
            })
        } else {
            next()
        }
    }
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
    .onlineServe
        .conn
            margin 20px
            // overflow hidden
            min-height 646px
            .userListLeft
                width 300px
                float left
                margin-right 20px
                background #ffffff
                min-height 640px
                overflow auto
                .userActive
                    background rgba(0, 0, 0, .15)
                .userBox
                    height 103px
                    cursor pointer
                    border-bottom 1px solid #F2F2F2
                    .unreadCount
                        font-size 12px
                        background red
                        color #ffffff
                        text-align center
                        float right
                        line-height 20px
                        width 20px
                        height 20px
                        padding 0 5px
                    .faceImgbox
                        width 40px
                        height 40px
                        border-radius 50%
                        overflow hidden
                        margin 30px 0 0 20px
                        float left
                        img
                            width 100%
                            height 100%
                    .userBoxLeft
                        float left
                        margin 30px 0 0 10px
                        .nickname
                            font-size 16px
                            color #333333
                            max-width 224px
                            white-space nowrap
                            text-overflow ellipsis
                            overflow hidden
                        .lastMsg
                            font-size 14px
                            color #9E9DA4
                            margin-top 14px
                            max-width 224px
                            white-space nowrap
                            text-overflow ellipsis
                            overflow hidden
            .talkRoom
                width 840px
                min-height 545px
                float left
                background #ffffff
                position relative
                .msgList
                    padding 20px 30px
                    overflow auto
                    height 500px
                    .lookMore
                        text-align center
                        font-size 12px
                        color #9e9da4
                        span:hover
                            color red
                            cursor pointer
                    .msgBox
                        margin-top 20px
                        overflow hidden
                        .nickname
                            padding 10px 0
                            font-size 14px
                        .imgBox
                            width 40px
                            height 40px
                            border-radius 50%
                            cursor pointer
                            overflow hidden
                            float left
                            img
                                width 100%
                                height 100%
                        .msgRight
                            margin-left 20px
                            max-width 680px
                            position relative
                            float left
                            .picBox
                                width 150px
                                height 150px
                                cursor pointer
                                overflow hidden
                                img
                                    width 100%
                                    height 100%
                            .txt
                                padding 11px 20px
                                font-size 14px
                                color #333333
                                line-height 28px
                                background #ffffff
                                border 1px solid #C0C0C0
                            i
                                display block
                                background url('../../../assets/images/left.png') no-repeat
                                background-size 100% 100%
                                width 6px
                                height 7px
                                // color #C0C0C0
                                position absolute
                                top 13px
                                left -5px
                    .myMsg
                        position relative
                        padding-top 30px
                        .nickname
                            padding 10px 0
                            font-size 14px
                            position absolute
                            right 12px
                            top 0px
                        .imgBox
                            width 40px
                            height 40px
                            border-radius 50%
                            overflow hidden
                            float right
                            img
                                width 100%
                                height 100%
                        .msgRight
                            margin-right 20px
                            max-width 680px
                            position relative
                            float right
                            .txt
                                padding 11px 20px
                                font-size 14px
                                color #333333
                                border none
                                line-height 28px
                                background #F2F2F2
                            i
                                display block
                                width 0px
                                height 0px
                                border-left 5px solid rgba(242,242,242,1)
                                border-top 5px solid rgba(0,0,0,0)
                                border-right 5px solid rgba(0,0,0,0)
                                border-bottom 5px solid rgba(0,0,0,0)
                                // color #C0C0C0
                                background none
                                position absolute
                                top 13px
                                right -10px
                                left auto
                .sendBox
                    width 100%
                    position absolute
                    top 545px
                    left 0px
                    .ipt >>> .el-textarea__inner
                        resize none
                        padding-right 93px
                    .send
                        position absolute
                        right 30px
                        bottom 10px
                        cursor pointer
                        color #333333
                        padding 5px 10px
                        border 1px solid #707070
                        font-size 14px
                    .toolList
                        position absolute
                        right 85px
                        bottom 7px
                        z-index 2
                        .uploadPic
                            .el-icon-picture
                                color #9e9da4
                                font-size 32px
                            .el-icon-picture:hover
                                color red
                    .send:hover
                        color red
                        border 1px solid red

</style>
