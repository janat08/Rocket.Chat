import './body.html';
import {openRoom} from '/app/ui-utils'

Template.App_body.helpers({
    chats () {
        const dms = Session.get('DMS')
        if (!dms){
            return []
        }
        return dms.map(x=>({_id: x}))
    },
    roomData() {
        return {
            _id: "8yWLMxQNXLkrqkT638yWLMxQNXLkrqkT63"
        }
    }
})

Template.App_body.onCreated(()=>{
    SubsCache.subscribe('users.all')
})

Template.App_body.onRendered(function() {
	$('#initial-page-loading').remove();
});