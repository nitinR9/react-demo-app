// actions for editor tabs

export function addTab(newTab){
    return {
        type: 'ADD',
        payload: newTab
    }
}

export function removeTab(id){
    return {
        type: 'REMOVE',
        payload: {
            id
        }
    }
}

export function changeTab(id){
    return {
        type: 'CHANGE',
        payload: {
            id
        }
    }
}

export function modifyTab(tab){
    return {
        type: 'MODIFY',
        payload: tab
    }
}

// actions for chatbox

export function chatCoversation(chatObject){
    return {
        type: 'PERSON',
        payload: chatObject
    }
}

export function botConversation(botObject){
    return {
        type: 'BOT',
        payload: botObject
    }
}
