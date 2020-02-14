import { Meteor } from 'meteor/meteor';
import './project.html';
import { Projects, Users } from '/imports/api/cols.js'
import { FlowRouter } from 'meteor/kadira:flow-router';
import '../milestones/milestones.js'

Template.project.onCreated(function() {
  SubsCache.subscribe('projects.all');
  SubsCache.subscribe('users.all')
  console.log(Projects, 'projects')
});

Template.project.helpers({
  project() {
    if (SubsCache.allReady.get()) {
      console.log(SubsCache, SubsCache.ready())
      let res = Projects.findOne(FlowRouter.getParam('id'))
      if (res.boss == Meteor.userId()) {
        res.isViewedByBoss = true
      }
      Users.find({_id: {$in: res.bids.map(x=>x.userId)}}).fetch()
      console.log(res.bids.map(x=>x.userId), Users.find({_id: {$in: res.bids.map(x=>x.userId)}}).fetch())
      res.bids.map(x => {
        x.acceptable = x.userId == Meteor.userId() && x.invited && !x.won
        const user = Users.findOne(x.userId)
        x.username = user && user.username
        console.log('username', Users.find(x.userId).fetch(), x.userId, Meteor.users.findOne("AJyesKPaDRjQwYBqH"))
        return x
      })
      return res
    }

  },
  yourBid() {
    let res = Projects.findOne(FlowRouter.getParam('id'))
    const filtered = res.bids.filter(x => x.userId == Meteor.userId())
    if (filtered.length == 0) {
      return []
    }
    return filtered.map(x => {
      x.acceptable = x.userId == Meteor.userId() && x.invited && !x.won
      x.username = Users.findOne({ _id: x.userId }).username
      return x
    })
    return res
  }
});

Template.project.events({
  'click .chatJs' (e) {
    //username can't be determined
    Meteor.call('createDirectMessage', this.userId)
  },
  'submit .bidJs' (event) {
    event.preventDefault()
    const { description: { value: description }, price: { value: price } } = event.target
    Meteor.call('projects.bid', { description, price, _id: FlowRouter.getParam('id') })
  },
  'click .inviteJs' (event) {
    Meteor.call('projects.invite', { _id: FlowRouter.getParam('id'), userId: this.userId })
  },
  'click .acceptJs' (event) {
    Meteor.call('projects.accept', { _id: FlowRouter.getParam('id'), userId: this.userId })
  },
});
