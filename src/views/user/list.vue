<template>
    <div class="user-list">
        <a-table :columns="columns"
            :rowKey="record => record.login.uuid"
            :dataSource="data"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
        >
            <template slot="name" slot-scope="name">
                {{name.first}} {{name.last}}
            </template>
            <template slot="gender" slot-scope="gender">
                {{ gender == 'male' ? "男性": "女性"}}
            </template>
        </a-table>
    </div>
</template>
<script>
const columns = [{
  title: '姓名',
  dataIndex: 'name',
  sorter: true,
  width: '20%',
  scopedSlots: { customRender: 'name' },
}, {
  title: '性别',
  dataIndex: 'gender',
  filters: [
    { text: '男性', value: 'male' },
    { text: '女性', value: 'female' },
  ],
  scopedSlots: { customRender: 'gender' },
  width: '20%',
}, {
  title: '邮件',
  dataIndex: 'email',
}];

export default {
  mounted() {
    this.fetch();
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns,
    }
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    },
    fetch (params = {}) {
      console.log('params:', params);
      this.loading = true
      this.axios({
        url: 'https://randomuser.me/api',
        method: 'get',
        params: {
          results: 10,
          ...params,
        },
        responseType: 'json',
      }).then(({data}) => {
        const pagination = { ...this.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = 200;
        this.loading = false;
        this.data = data.results;
        this.pagination = pagination;
      });
    }
  },
}
</script>

<style>
.user-list{
    background: #fff;
}
.user-list .ant-table-pagination.ant-pagination{
    margin-right: 20px;
}
</style>
