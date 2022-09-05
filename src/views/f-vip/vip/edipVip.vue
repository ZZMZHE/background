<template>
  <div class="edipVip">
    <div class="conn">
      <h1 class="headText">会员套餐编辑</h1>
      <hr />
      <h2 class="message">基本信息</h2>
      <div class="searchBox">
        <el-form class="demo-form-inline" size="small">
          <el-form-item label="会员套餐名称">
            <el-input
              class="search"
              placeholder="请输入昵称"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="划线价">
            <el-input
              class="search"
              placeholder="请输入手机号"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input
              class="search"
              placeholder="请输入备注"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="背景颜色">
            <el-input
              class="search"
              placeholder="请输入备注"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="编辑文字"
            prop="desc"
            placeholder="可享受xxx,xxx等六项"
          >
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <hr />
      <div class="vipRights">
        会员权益
        <!-- 课程免费 -->
        <div class="courseBox">
          <div class="d-Head">
         <el-form :inline="true" class="demo-form-inline" size="small">
         <el-checkbox-group v-model="form.type" >
            <el-checkbox label="课程免费" name="type" :checked="form.checked"></el-checkbox>
         </el-checkbox-group>
         </el-form>
         <el-row>
         <el-button type="primary">新增课程</el-button>
         </el-row>
         </div>
           
          <el-table tooltip-effect="dark" border style="width: 90%">
            <el-table-column prop="sort" align="center" label="课程ID">
            </el-table-column>
            <el-table-column prop="name" align="center" label="课程名称">
            </el-table-column>
            <el-table-column prop="price" align="center" label="价格">
            </el-table-column>
            <el-table-column prop="type" align="center" label="课程分类">
              <template slot-scope="scope">
                <span v-if="scope.row.type == 1">单节视频课程</span>
                <span v-if="scope.row.type == 2">单节直播课程</span>
                <span v-if="scope.row.type == 3">系列视频课程</span>
                <span v-if="scope.row.type == 4">系列直播课程</span>
              </template>
            </el-table-column>
            <el-table-column prop="addTime" align="center" label="操作">
            </el-table-column>

            
          </el-table>
      
        </div>

        <!-- 简历免费 -->
        <div class="resumeBox">
         <div class="d-Head">
          <el-form class="demo-form-inline" size="small">

            <el-checkbox-group v-model="form.type">
            <el-checkbox label="简历免费" name="type" :checked="form.checked"></el-checkbox>
         </el-checkbox-group>
          </el-form>
         </div>
           
           <div class="text111">
          <el-form  class="demo-form-inline" size="small">
            <el-form-item label="每天可以免费查看"  >
              <el-input
                class="search"
                placeholder="请输入内容"
                style="width: 180px"
              ></el-input
              >份
            </el-form-item>
            <el-form-item label="每天可以免费查看职位">
              <el-input
                class="search"
                placeholder="请输入内容"
                style="width: 180px"
              ></el-input
              >份
            </el-form-item>
          </el-form>
          </div>
        </div>

        <!-- 商品折扣 -->
        <div class="discountsBox">
      <div class="d-Head">
         <el-form :inline="true" class="demo-form-inline" size="small">
         <el-checkbox-group v-model="form.type">
            <el-checkbox label="商品折扣" name="type" :checked="form.checked"></el-checkbox>
         </el-checkbox-group>
         </el-form>
         <el-row>
         <el-button type="primary">新增商品</el-button>
         </el-row>
         </div>
          <el-table tooltip-effect="dark" border style="width: 90%">
            <el-table-column prop="sort" align="center" label="课程ID">
            </el-table-column>
            <el-table-column prop="ID" align="center" label="食品ID">
            </el-table-column>
            <el-table-column prop="name" align="center" label="食品名称">
            </el-table-column>
            <el-table-column prop="price" align="center" label="价格">
            </el-table-column>
            <el-table-column prop="type" align="center" label="食品分类">
            </el-table-column>
            <el-table-column prop="type" align="center" label="折扣">
            </el-table-column>
            <el-table-column prop="addTime" align="center" label="操作">
            </el-table-column>
          </el-table>
        </div>

        <!-- 优惠券 -->
        <div class="couponBox">
          <div class="d-Head">
         <el-form :inline="true" class="demo-form-inline" size="small" >
         <el-checkbox-group v-model="form.type" >
            <el-checkbox label="优惠卷" name="type" :checked="form.checked"></el-checkbox>
         </el-checkbox-group>
         </el-form>
         <el-row>
         <el-button type="primary">新增优惠券</el-button>
         </el-row>
         </div>

          <el-table tooltip-effect="dark" border style="width: 80%">
            <el-table-column prop="name" align="center" label="优惠券名称">
            </el-table-column>
            <el-table-column prop="addTime" align="center" label="操作">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--会员权益 -->
      <div class="btns">
        <el-row>
          <el-button type="primary">确认</el-button>
          <el-button type="primary">取消</el-button>
        </el-row>
      </div>
    </div>
    <!--box -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      
      form: {
        checked:true,
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    //页数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    // 页码
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getData();
    },
  },
  computed: {},
  watch: {},
};
</script>
<style lang='stylus' scoped>
// @import url(); 引入公共css类
.edipVip{
 .conn{
   background #ffffff;
   margin 20px 20px 0 20px;
 }
.headText {
  color: red;
  font-weight: bold;
  font-size: 28px;
  padding: 20px 0;
}

.message {
  color: black;
  font-weight: bold;
  font-size: 20px;
  padding: 19px 13px;
}


.d-Head{
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 20px 0 
}

.text111{
   color: red
}
.btns {
  display: flex;
  justify-content: center;
}
}
</style>
