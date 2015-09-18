/**
 * Given a template and object of states, set the template state
 * Requires: gwendall:template-states
 */
Util={};
Util.setTemplateState = function (t, states) {
    _.each(states, function (v, k, s) {
        t.state(k, v);
    })
};