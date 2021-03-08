router.get(
    '/',
    passport.authenticate('google', {failureRedirect: '/auth/login'}),
    function (req, res) {
        res.render('profile')

    }
);
