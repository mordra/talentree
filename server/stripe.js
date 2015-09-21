Stripe = StripeSync("sk_test_uxKnGkKVKRMTBrrOfWEvsIMk");

StripeChargeCard = function (token) {
    charge = Stripe.charges.create({
        amount: 1000, //cents
        currency: "AUD",
        source: token
    });

    return charge.id;
};