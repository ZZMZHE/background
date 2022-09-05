<template>
    <div>
        <transition name="route-fade" mode="out-in">
                <router-view></router-view>
            </transition>
    </div>
</template>
<script>

</script>

<style scoped lang="stylus" >
  .route-fade-enter, .route-fade-leave-to
        opacity: 0
    .route-fade-enter-active, .route-fade-leave-active
        transition: all 0.3s
</style>