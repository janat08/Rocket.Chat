import './body.html';


Template.App_body.helpers({
    userId () {
        return Meteor.userId()
    }
})

Template.App_body.onCreated(()=>{
    Meteor.subscribe('users.all')
})

Template.App_body.onRendered(function() {
	$('#initial-page-loading').remove();
});