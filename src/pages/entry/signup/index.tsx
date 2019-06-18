import { Carousel } from 'antd'
import * as React from 'react'
import LoginFormTab from './form'
import style from './index.scss'

class Signup extends React.Component {
    public render() {
        const innerHeight = window.innerHeight
        // const types = ['验证码登录', '密码登录']
        return (
            <div className={style.signinPage} style={{
                background: `url(${require('../img/loginBg.svg')})`,
                height: innerHeight
            }} 
            >
                <div className={style.signinContainer}
                    onClick={(event) => this.stop(event)}>
                    <div className={style.carousel}>
                        <div className={style.views}>
                        <Carousel autoplay={true}>
                            <div className={style.view}>
                                <img src={require('../img/a.svg')}/>
                                <div className={style.text}>
                                    <span>拍信助力企业运营</span><br/><br/>
                                    使用拍信旗下的产品获<br/>取版权知产内容，将会给你的企业<br/>带来更高的工作效率
                                </div>
                            </div>
                            <div className={style.view}>
                                <img src={require('../img/b.svg')}/>
                                <div className={style.text}>
                                    <span>拍信助力企业运营</span><br/><br/>
                                    使用拍信旗下的产品获<br/>取版权知产内容，将会给你的企业<br/>带来更高的工作效率
                                </div>
                            </div>
                        </Carousel>
                        </div>
                    </div>
                    <div className={style.dividingLine}/>
                    <div className={style.signin}>
                        <h2 className={style.title}>注册 PAIXIN</h2>
                        <LoginFormTab/>
                    </div>
                </div>
            </div>
        )
    }

    private stop (e:any){
        e.stopPropagation()
    }
}

export default Signup