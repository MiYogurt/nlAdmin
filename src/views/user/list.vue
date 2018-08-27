<template>
    <div class="user-list">
        <a-table 
            :rowKey="record => record.login.uuid"
            :dataSource="data"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
        >

        <!-- 自定义表头 -->
        <a-table-column
            title="姓名"
            dataIndex="login.username"
            :sorter="true"

            :filterDropdownVisible="filterDropdownVisible"
            @filterDropdownVisibleChange="onFilterDropdownVisibleChange"
        >
            <div slot="filterDropdown" class="custom-filter-dropdown">
                <a-input
                    ref="searchInput"
                    placeholder="寻找用户"
                    :value="searchText"
                    @change="onInputChange"
                    @pressEnter="onSearch"
                />
                <a-button type="primary" @click="onSearch">查找</a-button>
            </div>
            <a-icon slot="filterIcon" type="smile-o" :style="{ color: this.filtered ? '#108ee9' : '#aaa' }" />
            <template slot-scope="text, record, index">
                <a-input
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                @change="e => handleChange(e.target.value, record.login.uuid, 'name')"
                />
                <span v-else>
                    {{ text }}
                </span>
            </template>
        </a-table-column>

        <a-table-column
            title="性别"
            dataIndex="gender"
            :filters="genderFilters"
        >
            <template slot-scope="text, record, index">
                <a-input
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                @change="e => handleChange(e.target.value, record.login.uuid, 'gender')"
                />
                <span v-else>
                    {{ text == "male" ? "男性" : "女性" }}
                </span>
            </template>
        </a-table-column>

        <a-table-column
            title="邮件地址"
            dataIndex="email"
        >
            <template slot-scope="text, record, index">
                    <a-input
                    v-if="record.editable"
                    style="margin: -5px 0"
                    :value="text"
                    @change="e => handleChange(e.target.value, record.login.uuid, 'email')"
                    />
                    <span v-else>
                        {{ text }}
                    </span>
            </template>
        </a-table-column>

        <a-table-column
            title="操作"
            key="operation"
        >
            <template slot-scope="text, record, index">
                <div class='editable-row-operations'>
                    <span v-if="record.editable">
                        <a @click="() => save(record.login.uuid)">保存</a>
                        <a-popconfirm title='是否要取消修改?' @confirm="() => cancel(record.login.uuid)">
                            <a>取消</a>
                        </a-popconfirm>
                    </span>
                    <span v-else>
                    <a-button type="primary" size="small" @click="() => edit(record.login.uuid)" ghost>修改</a-button>
                    <a-popconfirm
                        v-if="data.length"
                        title="你要删除该数据吗?"
                        @confirm="() => onDelete(record.login.uuid)">
                        <a-button type="danger" size="small" ghost>删除</a-button>
                    </a-popconfirm>
                    </span>
                </div>
            </template>
        </a-table-column>
        </a-table>
    </div>
</template>
<script>
export default {
  name: 'user-list-view',
  mounted() {
    this.fetch();
  },
  activated(){
      console.log('trigger user-list-view keep alive hook');
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      genderFilters: [
        { text: "男性", value: "male" },
        { text: "女性", value: "female" }
      ],
      filterDropdownVisible: false,
      searchText: "",
      filtered: false
    };
  },
  methods: {
    onFilterDropdownVisibleChange(visible) {
      this.filterDropdownVisible = visible;
      this.$nextTick(() => {
        this.$refs.searchInput && this.$refs.searchInput.focus();
      });
    },
    onInputChange(e) {
      this.searchText = e.target.value;
    },
    onSearch() {
      const { searchText } = this;
      if (!searchText) {
          this.filtered = false
          this.data = this.cacheData
          return;
      }
      const reg = new RegExp(searchText, "gi");
      Object.assign(this, {
        filterDropdownVisible: false,
        filtered: !!searchText,
        data: this.data
          .map(record => {
            const match = record.login.username.match(reg);
            if (!match) {
                return null;
            }
            return {
                ...record,
                login: {...record.login, username: (
                <span>
                    {record.login.username.split(reg).map((text, i) => (
                    i > 0 ? [<span class="highlight">{match[0]}</span>, text] : text
                    ))}
                </span>
                )},
            };
         }).filter(Boolean)
      });
    },
    handleChange(value, key, col) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.login.uuid)[0];
      if (target) {
        target.editable = true;
        if (col == "name") {
          target.login.username = value
          this.data = newData;
          return;
        } else if (col == "gender") {
          if (["F", "female", "女", "f"].includes(value)) {
            target[col] = "female";
          } else {
            target[col] = "male";
          }
          this.data = newData;
          return;
        }
        target[col] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.login.uuid)[0];
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.login.uuid)[0];
      if (target) {
        delete target.editable;
        this.data = newData;
        this.cacheData = newData.map(item => ({ ...item }));
      }
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.login.uuid)[0];
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter(item => key === item.login.uuid)[0]
        );
        delete target.editable;
        this.data = newData;
      }
    },
    onDelete(key) {
      const newData = [...this.data];
      this.data = newData.filter(item => item.login.uuid !== key);
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    },
    fetch(params = {}) {
      console.log("params:", params);
      this.loading = true;
      this.axios({
        url: "https://randomuser.me/api",
        method: "get",
        params: {
          results: 10,
          ...params
        },
        responseType: "json"
      }).then(({ data }) => {
        const pagination = { ...this.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = 200;
        this.loading = false;
        this.data = data.results;
        this.pagination = pagination;
        this.cacheData = data.results.map(item => ({ ...item }));
      });
    }
  }
};
</script>

<style>
.user-list {
  background: #fff;
}
.user-list .ant-table-pagination.ant-pagination {
  margin-right: 20px;
}
.editable-row-operations a {
  margin-right: 8px;
}
.user-list .ant-btn {
  margin-right: 8px;
}

.custom-filter-dropdown {
  padding: 8px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
}

.custom-filter-dropdown input {
  width: 130px;
  margin-right: 8px;
}

.highlight {
  color: #f50;
}
</style>
