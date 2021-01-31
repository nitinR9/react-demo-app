import { combineReducers } from 'redux' ;

// tab reducer

const tabArray = [
    {
        id: 'tab0',
        name: 'script.js',
        code: 'function name (param) {return param;}'
    }
] ;

const FullTabInfo = {
    liveTabs: 1,
    tabNumCount: 1,
    currentTab: {
        id: 'tab0',
        index: 0
    },
    tabs: tabArray
}

const tabReducer = (state = FullTabInfo, actions) => {
    const tabCopy = Object.assign({}, state) ;
    
    switch(actions.type){
        case 'ADD': {
            tabCopy.liveTabs +=1 ;
            tabCopy.tabNumCount += 1 ;
            tabCopy.tabs.push(actions.payload) ;
            return tabCopy ;
        }
        case 'REMOVE': {
            if (tabCopy.tabs.length > 1){
                // changing current tab values
                const { liveTabs, tabs } = tabCopy ;
                
                // getcurrent index of tab to be deleted
                const deleteIndex = tabs.findIndex( val => val.id === actions.payload.id) ;
                
                // if index is in between tabs array
                if ( deleteIndex !== (liveTabs - 1) ){
                    tabCopy.currentTab.index = deleteIndex ;
                    tabCopy.currentTab.id = tabs[deleteIndex + 1].id ;
                }
                // if index is last tab in array
                else{
                    tabCopy.currentTab.index = deleteIndex - 1 ;
                    tabCopy.currentTab.id = tabs[deleteIndex - 1].id ;
                }
                
                // decreasing livetab count
                tabCopy.liveTabs -= 1 ;
                
                // removing tab from array 
                tabCopy.tabs = tabCopy.tabs.filter((val) => val.id !== actions.payload.id ) ;
                return tabCopy ;
            }
            else{
                return tabCopy ;
            }
        }
        case 'CHANGE': {
            tabCopy.currentTab.id = actions.payload.id ;
            tabCopy.currentTab.index = tabCopy.tabs.findIndex( val => val.id === actions.payload.id ) ; 
            return tabCopy ;
        }
        case 'MODIFY': {
            const modifiedCode = tabCopy.tabs.map( val => {
                if (actions.payload.id === val.id){
                    val.code = actions.payload.code ;
                }
                return val ;
            }) ;
            
            tabCopy.tabs = modifiedCode ;
            
            return tabCopy ;
        }
        default: return tabCopy ;
    }
}


// chat reducer

const chatReducer = (state = [], actions) => {
    const chatCopy = Array.from(state) ;

    switch(actions.type){
        case 'PERSON': {
            chatCopy.push(actions.payload) ;
            return chatCopy ;
        }
        case 'BOT': {
            const modifiedChat = chatCopy.map( val => {
                if ( val.bot.id === actions.payload.id ){
                    val.bot.isLoading = false ;
                    val.bot.message = actions.payload.msg ;
                }

                return val ;
            }) ;

            return modifiedChat ;
        }
        default: return chatCopy ;
    }

}

const allReducers = combineReducers({
    tabState: tabReducer,
    chatState: chatReducer
}) ;

export default allReducers ;

