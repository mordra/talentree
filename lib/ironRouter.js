Router.route('/', function () {
    this.render('landing');
});
Router.route('/project/new', function () {
    this.render('editProject');
});
Router.route('/about');
Router.route('/login');

Router.route('/ping', function() {
    this.response.end('pong');
}, {where: 'server'});

Router.configure({
    layoutTemplate: 'layout'
});

//Router.plugin('auth', {
//    except: ['', 'about', 'login']
//});