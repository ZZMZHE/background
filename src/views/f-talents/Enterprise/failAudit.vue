<template>
  <div class="EntFailAudit">
    <div class="conn">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="medium"
        label-size="20px"
      >
        <el-form-item label="用户昵称" class="item">
          <el-input
            class="search"
            v-model="formInline.nickname"
            placeholder="请输入视频名称"
            style="width: 180px"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="formInline.status"
            placeholder="全部"
            style="width: 150px"
          >
            <!-- //1 免费 2 收费 为空全部 -->
            <el-option label="普通用户" value="0"></el-option>
            <el-option label="会员" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="searchBtn" @click="search">搜索</el-button>
          <el-button class="restBtn" @click="reset">重置</el-button>
          <el-button class="restBtn" @click="reset">新增视频</el-button>
        </el-form-item>
      </el-form>
      <!-- 头部 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待审核" name="first"></el-tab-pane
        ><!-- tab切换 -->
        <el-tab-pane label="审核成功" name="second"></el-tab-pane>
        <!-- tab切换 -->
        <el-tab-pane label="审核失败" name="third"></el-tab-pane>
        <!-- tab切换 -->
      </el-tabs>
      <div class="tableBox">
        <el-table
          :data="tableData"
          border
          :header-cell-style="{ background: '#f5f5f5' }"
          style="width: 100%"
        >
          <el-table-column
            prop="sort"
            align="center"
            width="100"
            label="用户昵称"
          >
            <template slot-scope="scope">
              <el-image
                style="width: 40px; height: 40px"
                :src="scope.row.faceUrl"
                fit="cover"
              >
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="nickname" align="center" label="账号">
          </el-table-column>
          <el-table-column prop="addTime" align="center" label="联系人">
          </el-table-column>
          <el-table-column prop="mobile" align="center" label="联系方式">
          </el-table-column>
          <el-table-column
            prop="countMoney"
            align="center"
            width="180"
            label="企业名称"
          >
            <template slot-scope="scope">
              <span>{{ "￥" + scope.row.rechargeNum }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mobile" align="center" label="企业地址">
          </el-table-column>
          <el-table-column prop="mobile" align="center" label="申请时间">
          </el-table-column>
          <el-table-column prop="mobile" align="center" label="备注">
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <span
                class="color"
                style="color: #7f0319"
                @click="goDetails({ id: scope.row.id, type: 2 })"
                >编辑</span
              >
              <span
                class="color margin"
                style="color: #7f0319"
                @click="goTalk({ id: scope.row.id, type: '2' })"
                >查看评论</span
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 临时测试 -->
        <button @click="tiaozhuan">查看</button>
    

        <div class="paging">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :page-size="pageSize"
            :page-sizes="[10, 20, 30, 50, 100]"
            layout="prev, pager, next, sizes, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { userList, userUpdateStatus, userUpdateRemark } from "api/index.js";
import { Alert } from "element-ui";
// import { log } from "console";
export default {
  name: "entApplication",
  data() {
    return {
      formInline: {
        nickname: undefined,
        tel: undefined,
        dateValue: [],
        status: undefined,
        remark: undefined,
      },
      form: {
        remark: "",
      },
      dialogVisible: false,
      activeName: "third",
      tableData: [],
      pageSize: 10,
      pageNum: 1,
      total: 10,
      dialogFormVisible: false,
      formLabelWidth: "80px",
      id: "",
    };
  },
  methods: {
    //临时测试
    tiaozhuan() {
      console.log("测试测试");
      this.$router.push({ name: "EntParticulars" });
    }, 
   //Tabs切换
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name == "second") {
        this.$router.push({ name: "EntSucceedAudit" });
      } else if (tab.name == "first") {
        this.$router.push({ name: "entApplication" });
      }
    },
    // 搜索
    search() {
      this.pageNum = 1;
      this.getData();
    },
    reset() {
      this.formInline.nickname = undefined;
      this.formInline.tel = undefined;
      this.formInline.dateValue = [];
      this.formInline.status = undefined;
      this.formInline.remark = undefined;
      this.pageSize = 10;
      this.pageNum = 1;
      this.getData();
    },
    // 页数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    // 页码
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getData();
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  computed: {},
  components: {},
  watch: {},
};
</script>
<style lang="stylus" scope>
// @import url(); 引入公共css类
.paging {
  text-align: center;
  padding: 20px 0;
  background: #ffffff;
}

.color {
  color: #7F0319;
  cursor: pointer;
}

.margin {
  margin-left: 10px;
}

.EntFailAudit {
  width: 100%;

  .tableBox {
    background: #ffffff;
  }

  .conn {
    height: 140px;
    background: #ffffff;
    padding-left: 10px;

    // text-align center
    .demo-form-inline {
      padding-top: 30px;

      .search {
        width: 346px;
      }

      .searchBtn {
        background: #222222;
        color: #fff;
      }
    }
  }
}
</style>
