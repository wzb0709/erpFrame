// @flow
import React, { Component } from 'react'
import { Upload, Icon, Modal, Button } from 'antd'
// import * as commonServer from '@/server/common'
import axios from 'axios'
import X2JS from 'x2js'
import uuid from 'uuid/v1'


export default class FormUpload extends Component{
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    uploadData: {}
  }

  static getDerivedStateFromProps(props, state) {
    const newFiles = []
    let value

    if (props.value !== undefined && props.value.length > 0) {
      if (typeof props.value === 'string') {
        value = [props.value]
      } else if (Array.isArray(props.value)) {
        value = props.value
      } else {
        throw new TypeError('value type should be string or array<string>')
      }

      let fileList = state.fileList.filter(
        file => value.indexOf(file.url) >= 0
      )
      value.forEach((item, index) => {
        const exist = state.fileList.findIndex(file => file.url === item)
        if (exist < 0) {
          newFiles.push({
            name: item,
            uid: -index,
            url: item,
            status: 'done'
          })
        }
      })

      if (newFiles.length > 0) {
        fileList = fileList.concat(newFiles)
      }
      return { fileList }
    } else {
      return {
        fileList: state.fileList
      }
    }
  }

  constructor(props) {
    super(props)

    // commonServer.getUploadData().then(res=>{
    //   this.setState({
    //     uploadData:{
    //       /* eslint-disable */
    //       key: uuid().replace(/-/g, '') + '${filename}',
    //       policy: res.policy,
    //       OSSAccessKeyId: res.ossAccessKeyId,
    //       Signature: res.signature,
    //       success_action_status: 201
    //     }
    //   })
    // })
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    const name = file.name
    const reg = new RegExp('pdf','g')
    if(reg.test(name)){
      window.open(file.url)
    }else{
      this.setState({
        previewImage: file.url,
        previewVisible: true
      })
    }
  }

  handleChange = ({ file, fileList, event }) => {
    if (file.status === 'done' || file.status === 'removed') {
      if (file.status === 'done') {
        for (let item of fileList) {
          if (file.uid === item.uid) {
            const url = new X2JS().xml2js(file.response).PostResponse.Location
            item.url = encodeURI(url)
            break
          }
        }
      }

      if (this.props.onChange) {
        //$FlowFixMe
        this.props.onChange(fileList.map(item => item.url))
      }
    }

    this.setState({ fileList })
  }
  render() {
    const { uploadData, previewVisible, previewImage, fileList } = this.state
    const { value, onChange, ...restProps } = this.props
    return (
      <div>
        <Upload
          {...restProps}
          data={uploadData}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          <Button>
            <Icon type="upload" /> 点击上传
          </Button>
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
