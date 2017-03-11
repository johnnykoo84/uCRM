const Bookshelf = require('./bookshelf');

require('./space');
require('./payment');

const BillingPlan = Bookshelf.Model.extend({
  tableName: 'billingplan',

  space: function() {
    return this.belongsTo('Space');
  },
  payment: function() {
    return this.hasMany('Payment');
  },
});

module.exports = Bookshelf.model('BillingPlan', BillingPlan);
