<template>
  <div class="succeedAudit">
    <div class="conn">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="small"
      >
        <el-form-item label="用户昵称">
          <el-input
            class="search"
            v-model="formInline.nickname"
            placeholder="请输入用户昵称"
            style="width: 180px"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员类型" prop="status">
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
        </el-form-item>
      </el-form>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待审核" name="first"></el-tab-pane>
        <el-tab-pane label="审核成功" name="second"></el-tab-pane>
        <el-tab-pane label="审核失败" name="third"></el-tab-pane>
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
      <!-- 临时测试 -->
      <button @click="tiaozhuan">查看</button>
      <el-button type="text" @click="dialogVisible = true"
        >点击打开 Dialog</el-button
      >

      <el-dialog
        title="审核"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="选择">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="通过" value="shanghai"></el-option>
              <el-option label="不通过" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { userList, userUpdateStatus, userUpdateRemark } from "api/index.js";
export default {
  name: "awaitAudit",
  data() {
    return {
      formInline: {
        nickname: undefined,
        tel: undefined,
        dateValue: [],
        status: undefined,
        remark: undefined,
      },
      dialogVisible:false,
      activeName: "first",
      tableData: [],
      pageSize: 10,
      pageNum: 1,
      total: 10,
      dialogFormVisible: false,
      form: {
        remark: "",
      },
      formLabelWidth: "80px",
      id: "",
    };
  },
  methods: {
    //Tabs切换
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name == "third") {
        this.$router.push({ name: "InsFailAudit" });
      } else if (tab.name == "second") {
        this.$router.push({ name: "InsSucceedAudit" });
      }
    },
    //弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
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
    tiaozhuan() {
      // 临时测试
      console.log("啊啊啊");
      this.$router.push({ name: "InsParticulars" });
    },
  },
  computed: {},
  watch: {},
};
</script>
<style lang="stylus" scoped>
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

.succeedAudit {
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
