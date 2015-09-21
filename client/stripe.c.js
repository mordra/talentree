function StripeCreateToken(cc, cb) {
    Stripe.card.createToken({
        number: cc.cardnumber,
        cvc: cc.cvc,
        exp_month: cc.month,
        exp_year: cc.year
    }, cb);
}

//function cb(status, response) {
//        stripeToken = response.id;
//        insertMessageCall(stripeToken);
//}
