import React, {Component} from 'react'
import {Form,Divider,Input,Icon,Button} from 'antd'
import axios from 'axios'
import styles from '@/layouts/index.css';
import {router} from 'umi'

const FormItem = Form.Item

class Login extends Component{


  handleSubmit = () => {

  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className={styles['login-form']}>
        <b>
          <Icon type="login" style={{ marginRight: 8 }} />
          用户登陆
        </b>
        <Divider />
        <FormItem>
          {getFieldDecorator('account', {
            rules: [
              {
                required: true,
                message: '请输入你的用户名'
              }
            ]
          })(
            <Input
              name="username"
              prefix={
                <Icon
                  type="user"
                  style={{ color: '#666', fontWeight: 'bold' }}
                />
              }
              placeholder="用户名"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('pwd', {
            rules: [
              {
                required: true,
                message: '请输入你的密码'
              }
            ]
          })(
            <Input
              name="password"
              type="password"
              prefix={
                <Icon
                  type="lock"
                  style={{ color: '#666', fontWeight: 'bold' }}
                />
              }
              placeholder="密码"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
            onClick={this.handleSubmit}
          >
            登录
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(Login)
