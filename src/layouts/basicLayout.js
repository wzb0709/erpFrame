import { Layout, Menu, Icon ,Tabs,Dropdown,Button,LocaleProvider,message} from 'antd'
import React from 'react'
import menuList from '@/utils/menuList'
import Link from 'umi/link';
import router from 'umi/router';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import styles from './index.css';
import axios from 'axios'

moment.locale('zh-cn')

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu


class BasicLayout extends React.Component {
  state = {
    collapsed: false,
    activeKey: '',
    tabs:[],
    selected:[],
    refresh:true,
  }

  onCollapse = collapsed => {
    this.setState({ collapsed })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const path = nextProps.children.props.location.pathname;
    const query = nextProps.children.props.location.query
    const tabs = [...prevState.tabs];
    const pathList = path.split('/')
    let tempPath = path
    let count = 0
    for(let i in query){
      if(count === 0){
        tempPath += `?${i}=${query[i]}`
      }else{
        tempPath += `&${i}=${query[i]}`
      }
      count++
    }
    let tempTitle = ''
    let tempKey = Date.now().toString()
    let tab
    let activeKey
    let selected = []
    let flag = false

    menuList.forEach(item=>{
      if(item.path === pathList[1]){
        item.children.forEach(item1 => {
          if(item1.path === pathList[2]){
            tempTitle = item1.title
            tempKey = item1.id.toString()
            selected.push(item1.id.toString())
            flag = true
            // if(JSON.parse(localStorage.getItem('authList')).indexOf(item.auth) === -1){
            //   router.replace('/login')
            //   message.error('无权访问该页面！')
            // }
          }
        })
      }
    })
    if(flag){
      tab = {path:tempPath,title:tempTitle,key:tempKey}
      let flag = false
      tabs.forEach(item=>{
        if(item.title === tempTitle){
          flag = true
          tempKey = item.key.toString()
          activeKey = tempKey
          item.path = tempPath
        }
      })
      if(!flag && tab.path !== '/'){
        tabs.push(tab)
        activeKey = tempKey
      }
    }
    return{
      tabs,
      activeKey,
      selected
    }
  }

  handleTabEdit = (key,action) => {
    if(action === 'remove'){
      let {activeKey,tabs} = this.state
      tabs.forEach((item,index)=>{
        if(item.key === key){
          tabs.splice(index,1)
          if(tabs.length === 0){
            router.push('/product/list')
          }else{
            if(activeKey === key){
              activeKey = tabs[tabs.length -1].key
              router.push(tabs[tabs.length -1].path)
            }
          }
        }
      })
      this.setState({activeKey,tabs})
    }
  }

  handleTabClick = (key) => {
    const {tabs} = this.state
    tabs.forEach(item=>{
      if(item.key === key){
        router.push(item.path)
      }
    })
  }

  handleTabOptionClick = ({key}) => {
    if(key === '0') {
      this.setState({refresh:false},()=>{
        this.setState({refresh:true})
      })
    }
    if(key === '1'){
      let {activeKey,tabs} = this.state
      let arr = []
      tabs.forEach(item=>{
        if(item.id === activeKey)
          arr.push(item)
      })
      this.setState({tabs:arr})
    }
  }

  /**
  *@funcDesc:退出登录
  *@author:WangZiBin
  *@time:2019/7/25 9:56
  */
  handleLogout = () => {
    router.replace('/login')
    localStorage.setItem('token','')
    localStorage.setItem('name','')
    localStorage.setItem('company','')
    axios.defaults.headers.common['Authorization'] = ''
  }

  render() {
    // const authList = JSON.parse(localStorage.getItem('authList')) 授权相关
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className={styles.logo}>
            <h1
              style={{
                color: '#fff',
                lineHeight: '64px',
                height:'100%',
                fontSize:27,
              }}>
              捷径旅服
            </h1>
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={['2']}
            defaultOpenKeys={['1']}
            selectedKeys={this.state.selected}
            mode="inline"
          >
            {menuList.map((item) => {
              if (item.children.length > 0) {
                return (
                  <SubMenu
                    key={item.id}
                    title={
                      <span>
                        <Icon type={item.icon}/>
                        <span>{item.title}</span>
                      </span>
                    }
                  >
                    {item.children.map(item1=>{
                      return(
                        <Menu.Item key={item1.id}>
                          <Link to={`/${item.path}/${item1.path}`}>{item1.title}</Link>
                        </Menu.Item>
                      )
                    })}
                  </SubMenu>
                )
              } else {
                return  (
                  <Menu.Item key={item.id}>
                    <Icon type={item.icon}/>
                    <span>{item.title}</span>
                  </Menu.Item>
                )
              }
            })}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <div style={{float: 'right'}}>
              <Dropdown
                trigger={['click']}
                overlay={
                  <Menu>
                    <Menu.Item key="logout">
                      <div onClick={this.handleLogout}>
                        <Icon type="logout"/>退出登录
                      </div>
                    </Menu.Item>
                  </Menu>
                }
              >
                <div style={{
                  marginRight:40,
                  padding: '0 12px',
                  transition: 'background-color .3s',
                  cursor: 'pointer'
                }}
                  className={styles.toolbar}
                >
                  <span>{localStorage.getItem('name')}</span>
                  <span>{localStorage.getItem('company')}</span>
                </div>
              </Dropdown>
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Tabs
              hideAdd={true}
              activeKey={this.state.activeKey}
              type="editable-card"
              onEdit={this.handleTabEdit}
              onTabClick={this.handleTabClick}
              style={{paddingTop:17}}
              tabBarExtraContent={
                <div className="tab-option">
                  <Dropdown
                    trigger={['click']}
                    overlay={
                      <Menu onClick={this.handleTabOptionClick}>
                        <Menu.Item key="0">重新加载</Menu.Item>
                        <Menu.Item key="1">关闭其他</Menu.Item>
                      </Menu>
                    }
                  >
                    <Button type="primary" size="small">
                      标签选项 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </div>
              }
            >
              {this.state.tabs.map(tab => (
                <Tabs.TabPane tab={tab.title} key={tab.key} style={{marginRight:10}} />
              ))}
            </Tabs>
            {this.state.refresh &&<LocaleProvider locale={zh_CN}>
              {this.props.children}
            </LocaleProvider>}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default BasicLayout
