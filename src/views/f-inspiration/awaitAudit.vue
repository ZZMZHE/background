<template>
  <div class="awaitAudit">
    <div class="conn">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="medium"
        label-size="20px"
      >
        <el-form-item label="昵称" class="item">
          <el-input
            class="search"
            v-model="formInline.nickname"
            placeholder="请输入昵称"
            style="width: 180px"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员类型" prop="status">
          <el-select
            v-model="formInline.status"
            placeholder="请选择"
            style="width: 150px"
          >
            <!-- //1 免费 2 收费 为空全部 -->
            <el-option label="xxx会员" value="0"></el-option>
            <el-option label="xxx会员" value="1"></el-option>
            <el-option label="xxx会员" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="searchBtn" @click="search">搜索</el-button>
          <el-button class="restBtn" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 头部 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待审核" name="first">待审核</el-tab-pane
        ><!-- tab切换 -->
        <el-tab-pane label="审核成功" name="second">审核成功</el-tab-pane>
        <!-- tab切换 -->
        <el-tab-pane label="审核失败" name="third">审核失败</el-tab-pane>
        <!-- tab切换 -->
      </el-tabs>
      <div class="tableBox">
        <el-table
          :data="tableData"
          border
          :header-cell-style="{ background: '#f5f5f5' }"
          style="width: 100%"
        >
          <el-table-column prop="sort" align="center" width="100" label="序号">
            <template slot-scope="scope">
              <el-image
                style="width: 40px; height: 40px"
                :src="scope.row.faceUrl"
                fit="cover"
              >
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="nickname" align="center" label="用户头像">
          </el-table-column>
          <el-table-column prop="addTime" align="center" label="用户昵称">
          </el-table-column>
          <el-table-column prop="mobile" align="center" label="会员类型">
          </el-table-column>
          <el-table-column
            prop="countMoney"
            align="center"
            width="180"
            label="发布时间"
          >
            <template slot-scope="scope">
              <span>{{ "￥" + scope.row.rechargeNum }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="240" label="操作">
            <template slot-scope="scope">
              <span class="color" @click="godeta({ id: scope.row.id })"
                >查看浏览轨迹</span
              >
              <!-- <span class="color margin" style="color: #FE093C" @click="godeta({ id: scope.row.id })">禁言</span> -->
              <span
                v-if="scope.row.status == 0"
                class="color margin"
                style="color: #fe093c"
                @click="stopLogin(scope.row.id, 1)"
                >禁止登录</span
              >
              <span
                v-if="scope.row.status == 1"
                class="color margin"
                style="color: #1890ff"
                @click="stopLogin(scope.row.id, 0)"
                >启用登录</span
              >
              <span
                class="color margin"
                style="color: #fe093c"
                @click="openDia(scope.row.id, scope.row.remark)"
                >备注</span
              >
            </template>
          </el-table-column>
        </el-table>
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
export default {
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
      activeName: "first",
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
    //Tabs切换
    handleClick(tab, event) {
      if (tab.name == "second") {
        this.$router.push("./succeedAudit");
      } else if (tab.name == "third") {
        this.$router.push("./failAudit");
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
  },
  computed: {},
  components: {},
  watch: {},
};
</script>
<style lang="stylus" scope>
.awaitAudit{
.conn{
   background #ffffff
   margin 20px 20px 0 20px
}
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

.userData {
  width: 100%;

  .searchBox {
    height: 140px;
    background: #ffffff;
    padding-left: 80px;

    // text-align center
    .demo-form-inline {
      padding-top: 54px;
      .search {
        width: 346px;
      }
      .searchBtn {
        background: #222222;
        color: #fff;
      }
    }
  }

  .tableBox {
    padding: 0 80px;
    background: #ffffff;
  }
}
}
</style>
