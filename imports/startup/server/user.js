import { callbacks } from '/app/callbacks';


callbacks.add('beforeCreateUser', function(options, user) {
    user.accountId = Meteor.call('accounts.create', { userId: user._id })
    return user;
}, callbacks.priority.LOW, 'createWallet');
