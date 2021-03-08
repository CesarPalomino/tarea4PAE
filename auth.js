router.get('/auth/login', function (req, res) {
    res.render('login')
})

router.get('/auth/logout', function (req, res) {
    req.logout()
    res.redirect('/auth/login')
})

router.get('/auth/google/login', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get(
    '/auth/google/redirect',
    passport.authenticate('google', {failureRedirect: '/auth/login'}),
    function (req, res) {
        console.log(req)

    }
);

