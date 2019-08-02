
import React, { Component } from 'react'
import { Breadcrumb } from 'antd'
import {withRouter,Link} from 'umi'

function generateItem(items, location){
  const pathname = location.pathname
  const nodes = []

  for (let i = 0; i < items.length; i++) {
    if (items[i].path === undefined) {
      nodes.push(items[i])
    } else{
      if(pathname.indexOf(items[i].path) > -1){
        nodes.push(items[i])
      }
    }
  }

  return nodes.map((item, index) => {
    const title = item.formatter ? item.formatter(location) : item.name

    return (
      <Breadcrumb.Item key={item.name}>
        {item.path && index < nodes.length - 1 ? (
          <Link to={item.path}>{title}</Link>
        ) : (
          <span>{title}</span>
        )}
      </Breadcrumb.Item>
    )
  })
}

class BreadcrumbContainer extends Component {
  render() {
    return (
      <Breadcrumb>
        {generateItem(this.props.items, this.props.location)}
      </Breadcrumb>
    )
  }
}

export default withRouter(BreadcrumbContainer)
