<template>
    <div class="detail-edit">
        <div id="edit" ref="editorElem"></div>

    </div>
</template>

<script>
import WangEditor from 'wangeditor'
const ERR_OK = 200
let editor = new WangEditor('#edit')
export default {
    name: 'detail-edit',
    props: {
        htmlFragment: {
            type: String,
            default() {
                return '<p></p>'
            }
        },
        catchData: {}
    },
    data() {
        return {

        }
    },
    computed: {
        uploadUrl() {
            return this.$store.state.uploadUrl + '50'
        }
    },
    created() {

    },
    // props: ['catchData'],
    methods: {
        createEditor() {
            // editor.customConfig.uploadImgServer = 'https://www.bjy1314.com/api/file/upload/41'
            editor.customConfig.uploadImgServer = this.uploadUrl
            editor.customConfig.showLinkImg = false
            editor.customConfig.withCredentials = true
            editor.customConfig.uploadFileName = 'file'
            editor.customConfig.zIndex = 10
            editor.customConfig.uploadImgTimeout = 30000
            editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024
            editor.customConfig.uploadImgHooks = {
                customInsert: function (insertImg, result, editor) {
                    // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                    if (result.status === ERR_OK) {
                        let url = result.data
                        insertImg(url)
                    }
                }
            }
            editor.customConfig.menus = [
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                // 'backColor', // 背景颜色
                'link', // 插入链接
                // 'list', // 列表
                'justify', // 对齐方式
                // 'quote', // 引用
                // 'emoticon', // 表情
                'image', // 插入图片
                // 'table', // 表格
                // 'video', // 插入视频
                // 'code', // 插入代码
                'undo', // 撤销
                'redo' // 重复
            ]
            editor.customConfig.onchange = html => {
                this.editorContent = html
                this.catchData(this.editorContent) // 把这个html通过catchData的方法传入父组件
            }
            editor.create()
        },
        getData(val) {
            editor.txt.html(val)
        },
        clearTxt() {
            editor.txt.clear()
        },
        getHtmlFragment() {
            this.$emit('getHtmlFragment', editor.txt.html())
        }
    },
    mounted() {
        this.createEditor()
    },
    watch: {
        htmlFragment() {
            editor.txt.html(this.htmlFragment)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .detail-edit
        width: 100%
        height: 100%
</style>
