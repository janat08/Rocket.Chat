import './body.html';


Template.App_body.helpers({
    chats () {
        console.log(Session.get('DMS'))
        return Session.get('DMS').map(x=>({_id: x}))
    },
    roomData() {
        return {
            _id: "8yWLMxQNXLkrqkT638yWLMxQNXLkrqkT63"
        }
    }
})

Template.App_body.onCreated(()=>{
    Meteor.subscribe('users.all')
})

Template.App_body.onRendered(function() {
	$('#initial-page-loading').remove();
});