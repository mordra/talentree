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

//https://gist.github.com/takien/4077195
Util.YouTubeGetID = function (url) {
    var ID = '';
    url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        return ID[0];
    }
};

Util.VimeoGetId = function (url) {
    vimeo_Reg = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
    var match = url.match(vimeo_Reg);
    if (match) {
        return match[3];
    }
};