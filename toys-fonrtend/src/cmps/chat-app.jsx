import React from 'react';
import { socketService } from '../services/socket.service';


export class ChatApp extends React.Component {
    state = {
        msg: '',
        chatText: [],
        typing: '',
        isTyping: false
    }
    componentDidMount() {
        const { toyId } = this.props
        socketService.setup()
        socketService.emit('chat topic', toyId)
        socketService.on('user typing', this.userTyping)
        socketService.on('chat addMsg', this.addMsg)

    }

    componentWillUnmount() {
        socketService.off('user typing')
        socketService.off('chat addMsg')
        socketService.terminate()
    }
    userTyping = (msg) => {
        console.log("🚀 ~ USERT TYPING ~ msg", msg)
        this.setState({ typing: msg })

    }

    handleChange = (ev) => {
        var timeout
        if (!this.state.isTyping) {
            clearTimeout(timeout)
            const { user } = this.props
            const msg = ev.target.value
            this.setState({ msg, isTyping: true })
            socketService.emit('chat typing', `${user.fullname}: typing..`)
            timeout = setTimeout(() => {
                socketService.emit('chat typing', '')
                this.setState({ isTyping: false })

            }, 2000);
        } else {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                socketService.emit('chat typing', '')
                this.setState({ isTyping: false })

            }, 2000);
        }
    }
  
    addMsg = (msg) => {
        let { chatText } = this.state
        this.setState({ chatText: [...chatText, msg], typing: '' })

    }

    onSend = (ev = null) => {
        if (ev) ev.preventDefault()
        let { msg, chatText } = this.state
        if (!msg) return
        const { user } = this.props

        msg = `${user ? user.fullname : 'Me'}: ${msg}`
        socketService.emit('chat newMsg', msg)
        this.setState({ msg: '' })
        // this.setState({ chatText: [...chatText, msg] }, () => {

    }

    render() {
        const { msg, chatText, typing } = this.state
        const { user } = this.props
        return <div className="chat-app flex column">
            <section className="chat-msgs flex column">
                {typing}
                {true && chatText.map((txt, idx) => {
                    const className = txt.split(':')[0] === user.fullname ? 'self' : ''
                    return (
                        <span key={idx} className={className}  >{txt}</span>
                    )
                })}

            </section>
            <form onSubmit={this.onSend} className="chat-form flex">
                < input
                    name='msg'
                    id='msg'
                    type='text'
                    placeholder='enter message'
                    value={msg}
                    onChange={this.handleChange}
                    autoComplete='off'
                />
                <button className="send-btn">►</button>
            </form>
        </div >
    }
}

