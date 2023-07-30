const User = require("../models/User");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    console.log(req.body);
    await User.findOne({ username: req.body.username })
        .then((user) => {
            if (user != null){
                return res.status(409).json({ error: "Username was registed" });
            }
            // return console.log("next");
            return next();
        })
        .catch(() => {
            
        })
        
    // Email
    // await User.findOne({email: req.body.email})
    //     .then((err, user) => {
    //         if (err) {
    //             res.status(500).send({ message: err });
    //             return;
    //         }

    //         if (user) {
    //         res.status(400).send({ message: "Failed! Email is already in use!" });
    //         return;
    //         }

    //         next();
    //     })

}
// checkRolesExisted = (req, res, next) => {
    //   if (req.body.roles) {
    //     for (let i = 0; i < req.body.roles.length; i++) {
    //       if (!ROLES.includes(req.body.roles[i])) {
    //         res.status(400).send({
    //           message: `Failed! Role ${req.body.roles[i]} does not exist!`
    //         });
    //         return;
    //       }
    //     }
    //   }
    
    //   next();
    // };

module.exports = checkDuplicateUsernameOrEmail;