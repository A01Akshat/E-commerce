const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    jwt.sign({ result }, jwtkey, (err, token) => {
        if (err) {
            resp.send({ result: "No user found" })
        }
        resp.send({result, auth: token })
    })
})

app.post("/login", async (req, resp) => {
    console.log("Password" + req.body.password)
    console.log("Email" + req.body.email)
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        console.log(user);
        if (user) {
            jwt.sign({ user }, jwtkey, (err, token) => {
                if (err) {
                    resp.send({ result: "No user found" })
                }
                resp.send({user, auth: token })
            })
        }
        else {
            resp.send(({ error: "Bad request" }))
        }
    }
    else {
        resp.send(({ error: "Bad request : Invalid" }))
    }

})

app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})

app.get("/products", async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    }
    else {
        resp.send({ result: "No products found" });
    }
})

app.delete("/product/:id", async (req, resp) => {

    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
});

app.get("/product/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    }
    else {
        resp.send({ result: "No products found" });
    }

})

app.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne(

        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(result);
})


app.get("/search/:key", verifyToken,  async (req, resp) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
        ]
    });
    resp.send(result);
})

// app.get("/",(req,res)=>{
//     res.send("Work ing");
// })

function verifyToken(req,resp,next)
{
    let token=req.headers['authorization'];
    if(token)
    {
        token=token.split(' ')[1];
        jwt.verify(token,jwtkey,(err,valid)=>{
            if(err)
            {
                
            }
            else
            {

            }
        })
    }
    else{
        resp.send({result:"Add token with header"})
    }
    console.log("MIDDLEWARE CALLED");
    next();
}



app.listen(8000);