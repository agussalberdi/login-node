module.exports = (app, passport) => {

	// index routes
	app.get('/', (req, res) => {
		res.render('index');
    });
    
    app.get('/login', (req,res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    app.get('/signup', (req,res) =>{
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });

    //para logear usuario
    app.post('/login', passport.authenticate('local-login',{
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    //registrarse
    app.post('/signup', passport.authenticate('local-signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    //perfil
    app.get('/profile', isLoggedIn, (req,res) =>{
        res.render('profile',{
            user: req.user
        });
    });

    app.get('/logout', (req, res) =>{
        req.logout();
        return res.redirect('/');
    });

    function isLoggedIn(req, res, next){
        if (req.isAuthenticated()){
            return next();
        }
        return res.redirect('/');
    }
    
}