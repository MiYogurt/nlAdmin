<template>
<div class="background">
  <a-form @submit="handleSubmit" :autoFormCreate="(form)=> { this.form = form }">
    <a-form-item
      label='姓名'
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
      fieldDecoratorId="name"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入用户名!' }]}"
    >
      <a-input>
          <a-icon slot="prefix" type='user' :style="{ color: 'rgba(0,0,0,.25)' }" />
      </a-input>
    </a-form-item>
    <a-form-item
      label='邮箱'
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
      fieldDecoratorId="email"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入用户名!' }, {
              type: 'email', message: '无效的邮件格式!',
      }]}"
    >
      <a-input>
          <a-icon slot="prefix" type='mail' :style="{ color: 'rgba(0,0,0,.25)' }" />
      </a-input>
    </a-form-item>
    <a-form-item
      label='性别'
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
      hasFeedback
      fieldDecoratorId="gender"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择性别!' }]}"
    >
      <a-select
        placeholder='选择性别'
        @change="this.handleSelectChange"
      >
        <a-select-option value='male'>男性</a-select-option>
        <a-select-option value='female'>女性</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
        label='某个时间段'
        :labelCol="{
            xs: { span: 24 },
            sm: { span: 5 },
        }"
        :wrapperCol="{
            xs: { span: 24 },
            sm: { span: 12 },
        }"
    >
        <a-col :span="11">
            <a-form-item validateStatus='error' help='请选择时间' fieldDecoratorId="time1">
                <a-date-picker style="width: 100%"/>
            </a-form-item>
        </a-col>
        <a-col :span="2">
            <span :style="{ display: 'inline-block', width: '100%', textAlign: 'center' }">
            -
            </span>
        </a-col>
        <a-col :span="11">
            <a-form-item fieldDecoratorId="time2">
                <a-date-picker style="width: 100%"/>
            </a-form-item>
        </a-col>
    </a-form-item>
     <a-form-item 
        :wrapperCol="{ span: 12, offset: 5 }" 
        fieldDecoratorId="agreen" 
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请先阅读条款!' }]}"
    >
        <a-checkbox>我已阅读 <a href=''>同意条款</a></a-checkbox>
     </a-form-item>
    <a-form-item
      :wrapperCol="{ span: 12, offset: 5 }"
    >
      <a-button type='primary' htmlType='submit'>
        提交
      </a-button>
    </a-form-item>
  </a-form>
</div>
</template>

<script>
export default {
  name: 'user-create-view',
  data () {
    return {
      formLayout: 'horizontal',
    }
  },
  activated(){
      console.log('trigger user-create-view keep alive hook');
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$message.success("创建成功");
        }
      })
    },
    handleSelectChange (value) {
      console.log(value)
      this.form.setFieldsValue({
        name: `${value === 'male' ? 'man' : 'lady'}!`,
      })
    },
  },
}
</script>

<style>
.background {
    background: #fff;
    padding: 15px 5px;
}
</style>
