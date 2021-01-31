import React, { useEffect } from 'react' ;
import { useDispatch, useSelector } from 'react-redux';
import { botConversation, chatCoversation } from '../../actions/actions' ;
import { PersonCircle } from 'react-bootstrap-icons' ;
import nextId from 'react-id-generator' ;
import axios from 'axios' ;
import { LoadingComponent } from './Loading';
import logo from '../../images/logo192.png' ;

function ChatboxComponent(){
    const chat = useSelector(state => state.chatState) ;
    const { tabs } = useSelector(state => state.tabState) ;
    const dispatch = useDispatch() ;
    const divRef = React.createRef() ;

    const getMessage = (code) => {
        return axios.post('https://shrouded-oasis-94153.herokuapp.com/', {
            code: code
        })
    }

    const botResponse = (code, message, botID) => {
        const startIndex = code.indexOf('function') ;
        const lastIndex = code.lastIndexOf('}') + 1 ;
        const finalcode = `(${code.slice(startIndex, lastIndex)})('${message}')` ;
        getMessage(finalcode).then(value => {
            dispatch(botConversation({
                id: botID,
                msg: value.data
            })) ;
        }).catch(err => {
            console.log(err);
        }) ;
    }

    useEffect(() => {
        if ( divRef.current ){
            divRef.current.scrollIntoView({
                behavior: 'smooth'
            }) ;
        }
    }, [divRef]) ;

    const enterKeyDown = (event) => {
        const msg = event.currentTarget.value ;
        const message = event.currentTarget.value ;
        const chatID = nextId('chatbot-id-') ;

        if (event.key === 'Enter'){
            dispatch(chatCoversation({
                human: {
                    message: msg
                },
                bot: {
                    id: chatID,
                    isLoading: true,
                    message: ''
                }
            })) ;
            event.currentTarget.value = '' ;
            botResponse(tabs[0].code, message, chatID) ;
        }
    }

    return (
        <div className="w-100 h-100 Chatbox">
            <div className="Chatbox-container">
                <div className="Chatbox-chat-container">
                    <ul id="Chatbox-chat-list" className="p-3 mb-0">
                        {
                            chat.map( (val, index) => {
                                return (
                                    <li className="mt-3" key={`chat-list-${index}`}>
                                        <div className="d-flex justify-content-start align-content-center">
                                            <img src={logo} alt="Avatar" className="human-chat-avatar align-self-center" />
                                            <div className="msgbox ml-2 Text-Style-2">
                                                { val.human.message }
                                            </div>
                                        </div>
                                        
                                        <div className="mt-3 d-flex justify-content-end align-content-center">
                                            <div className="msgbox mr-2 Text-Style-2">
                                                {
                                                    val.bot.isLoading ? 
                                                    <LoadingComponent />
                                                    : val.bot.message
                                                }
                                            </div>

                                            <div className="align-self-center">
                                                <PersonCircle size={25} />
                                            </div>
                                        </div>

                                        <div ref={divRef}></div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="Chatbox-input-container">
                    <input className="px-3 py-3" type="text" placeholder="Type message here..." onKeyDown={enterKeyDown} />
                </div>
            </div>
        </div>
    ) ;
}

export default ChatboxComponent ;