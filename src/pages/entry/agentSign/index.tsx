import * as React from 'react'
import LoginFormTab from './form'
import style from './index.scss'
import PaiXinYunApi from 'src/service/index'

interface URLInfoProps {
    match?: any,
}

interface AgentInfoProps {
    phone: string,
    clientName: string,
    avatar: string,
}


class AgentSign extends React.Component<URLInfoProps, AgentInfoProps> {
    constructor(props: any) {
        super(props)

        this.state = {
            phone: "",
            clientName: "",
            avatar: ""
        }
    }
    public componentWillMount() {
        this.getAgentInfo();
    }
    public async getAgentInfo() {
        const res = await PaiXinYunApi.getAgentApi().getAgentInfo({ client_id: this.props.match.params.agentId })
        this.setState({
            phone: res.data.phone,
            clientName: res.data.client_name,
            avatar: res.data.avatar
        })
    }
    public render() {
        return (

            <div className={style.signinPage} style={{
                background: `url(${require('../img/agentloginBg.png')})`,
                height: innerHeight
            }}>
                <div className={style.topHeader}>
                    <div className={style.topHeaderLogo} style={{
                        backgroundImage: `url(${this.state.avatar})`
                    }} />
                    <span className={style.topHeaderName}>{this.state.clientName}</span>
                    <span className={style.topHeaderPhone}>{this.state.phone}</span>
                    <span className={style.topHeaderTip}>联系电话：</span>
                </div>
                <div className={style.signinContainer}>
                    <div className={style.carousel}>
                        <div className={style.views}>
                            <span className={style.welcome}>Welcome!</span>
                        </div>
                    </div>
                    <div className={style.dividingLine} />
                    <div className={style.signin}>
                        {/* <h2 className={style.title}>登录</h2> */}
                        <LoginFormTab />
                    </div>
                </div>
            </div>
        )
    }
}
export default AgentSign