import '../../message-read-receipt/server';
import '../../personal-access-tokens/server';
import '../../users-presence/server';
import './register-api.js';
import './user.js'
import './fixtures.js';
import { Accounts } from '/imports/api/cols.js'
if (!Accounts.findOne({ userId: 'escrow' })) {
    Meteor.call('accounts.create', { userId: 'escrow' })
}
