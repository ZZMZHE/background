<template>
    <transition name="fade">
        <div v-if="multipleSelection.length" class="select-tips">
            <i class="icon el-icon-warning"></i>
            已选择 <em class="count">{{multipleSelection.length}}</em> 项
            <el-link type="primary" @click="clearSelection">清空选择</el-link>
        </div>
    </transition>
</template>

<script>
export default {
    name: '',
    props: {
        multipleSelection: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {}
    },
    methods: {
        clearSelection() {
            this.$emit('clearSelection')
        }
    }
}
</script>

<style lang="stylus" scoped>
    .select-tips
        margin-top: 20px
        height: 46px
        border: 1px solid rgba(140,187,230,1)
        background: #E9F5FF
        display flex
        align-items center
        color: $color-black
        font-size: $font-small
        padding-left: 20px
        letter-spacing 1px
        &.fade-enter, &.fade-leave-to
            opacity: 0
        &.fade-enter-active, &.fade-leave-active
            transition: all 0.4s
        .icon
            color: #1890FF
            font-size: 20px
            margin-right: 10px
        .count
            color: #1890FF
            font-size: 16px
            margin: 0 3px
        .el-link
            margin-left: 10px
</style>
