<template>
    <div class="head">
        <div class="bread-crumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item
                    v-for="(item, index) in breadList"
                    :key="index"
                    :to="item.toRoute?item.toRoute:''">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- <div class="city-select">
            <span class="attr">当前城市：</span>
            <el-select v-model="city" filterable placeholder="请选择">
                <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div> -->
    </div>
</template>

<script>
// import { getCities } from 'api/index.js'
export default {
    name: 'child-head',
    props: {
        breadList: {
            type: Array,
            default() {
                return [{
                    name: '首页',
                    toRoute: ''
                }]
            }
        }
    },
    data() {
        return {
            cities: [{
                value: '',
                label: ''
            }]
        }
    },
    created() {
        // this._getCities()
    },
    methods: {
        // _getCities() {
        //     getCities('?page=1&size=10000', {
        //         status: 1
        //     }).then(res => {
        //         if (res) {
        //             let cities = res.data.records
        //             this.cities = cities.map(elem => {
        //                 return {
        //                     value: elem.id,
        //                     label: elem.name
        //                 }
        //             })
        //         }
        //     })
        // }
    },
    computed: {
        city: {
            get() {
                return this.$store.state.city.label
            },
            set(val) {
                let city = this.cities.filter(elem => {
                    return elem.value === val
                })
                this.$store.commit('changeCity', city[0])
                window.localStorage.setItem('city', JSON.stringify(city[0]))
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .head
        position: fixed
        z-index: 999
        top: 60px
        left: 160px
        right: 0px
        min-width: 800px
        display: flex
        align-items center
        justify-content space-between
        height: 60px
        padding: 0 30px
        box-sizing: border-box
        background-color: #F2F2F2
        .city-select
            font-size: 14px
            .attr
                margin-right: 10px
            .el-select
                width: 150px
</style>
