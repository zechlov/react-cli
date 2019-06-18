import 'braft-editor/dist/index.css'
import { debounce } from 'lodash'
import * as React from 'react'
import BraftEditor, { ExtendControlType } from 'braft-editor'
import { BuiltInControlType } from 'braft-editor/index'
import Upload from 'src/components/upload/index'
import { Icon, Popconfirm } from 'antd';

interface TextProps {
  value?: any
  callback: (content: any) => void
  width?: number
}
interface TextState {
  html: any
  height: number
}

export default class CustomDemo extends React.Component<TextProps, TextState> {
  constructor(props: TextProps) {
    super(props)

    this.state = {
      height: 300,
      html: null
    }
  }

  public componentWillReceiveProps(nextprops: any) {
    this.setState({
      html: BraftEditor.createEditorState(nextprops.value)
    })
  }

  public componentDidMount() {

    const node = document.getElementsByClassName('braft-editor-class')[0]

    this.setState({ height: node.clientHeight - 60 })

    window.onresize = debounce(() => {
      this.setState({ height: node.clientHeight - 60 })
    }, 300)
  }

  public handleChange(content: any) {
    let value = ``
    if (!content.isEmpty()) {
      value = content.toHTML()
    }
    this.props.callback(value)
  }

  public render() {
    const controls = [
      {
        key: 'bold' as BuiltInControlType,
        text: <b>加粗</b>
      },
      'italic' as BuiltInControlType,
      'underline' as BuiltInControlType,
      'separator' as BuiltInControlType,
      'text-align' as BuiltInControlType,
    ]
    const extendControls: ExtendControlType[] = [
      {
        key: 'clear' as BuiltInControlType,
        type: 'button',
        text: (
          <Popconfirm title="确定要清空内容吗？"
            okText="确定"
            onConfirm={() => this.clear()}
            cancelText="取消">
            <Icon type="delete" />
          </Popconfirm>
        )
      },
      {
        key: 'antd-uploader' as BuiltInControlType,
        type: "button",
        text: (
          <Upload imgUrl={(url) => this.handleSubmit(url)}>
            <div>插入图片</div>
          </Upload>
        )
      }
    ]

    return (
      <BraftEditor
        className="braft-editor-class"
        controls={controls}
        extendControls={extendControls}
        controlBarStyle={{
          boxShadow: 'none'
        }}
        value={this.state.html}
        onBlur={(content: any) => this.handleChange(content)}
        onChange={(content: any) => this.saveChange(content)}
        contentStyle={{
          height: this.state.height,
          width: this.props.width || 400,
          background: '#ffffff',
          borderRadius: '6px',
          border: '1px solid rgba(224,224,224,1)',
          padding: 0
        }}
      />
    )
  }

  private clear() {
    this.props.callback('')
  }

  private handleSubmit(url: string) {
    let text = ``
    if (this.state.html.toHTML() !== '<p></p>') {
      text = this.state.html.toHTML()
    }
    text = `${text}<div class="media-wrap image-wrap"><img src=${url}></div><br/>`
    this.setState({
      html: BraftEditor.createEditorState(text)
    })
    this.props.callback(text)
  }

  private saveChange(content: any) {
    this.setState({
      html: content
    })
  }
}