
// Question-1


const mysql = require("mysql2") 
const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.urlencoded({extended:true}));
app.use(cors());


const connection = mysql.createConnection({
    host:"localhost",
    user: "mydbuser2",
    password: "mydbuser2",
    database: "mydb",
    port: 3306
});




connection.connect(
    (err)=>{
    if(err)console.log("error:",err);
    else console.log("date base connected");
    })
// // // Question -2


app.get("/install",(req, res) =>{ 

    let Products = `
    CREATE TABLE IF NOT EXISTS products (
        product_id INT AUTO_INCREMENT PRIMARY KEY,
        product_url VARCHAR(255),
        product_name VARCHAR(100) NOT NULL
    )`
    let Price = `
    CREATE TABLE IF NOT EXISTS price (
        price_id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT,
        starting_price DECIMAL(10, 2),
        price_range VARCHAR(100),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    )`
    let Users = `
    CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(50),
        user_password VARCHAR(255)
    )`
    let Description = `
    CREATE TABLE IF NOT EXISTS product_descriptions (
        description_id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT,
        production_brief_description VARCHAR(500),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    )`
    let Orders = `CREATE TABLE orders (
        order_ID INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT, 
        user_id INT
       
    )`
    


    connection.query(Products, (err) =>{
        if(err) {console.log("error: productsTable");return}
        else console.log("product table is crated");
    })
    
    connection.query(Users, (err) =>{
        if(err) {console.log("error: users table",err);return}
        else console.log("user table is crated");
    })
    
    connection.query(Price, (err) =>{
        if(err){ console.log("error: priceTable",err);return}
        else console.log("price table is crated");
    })
    
    connection.query(Description, (err) =>{
        if(err) {console.log("error: description table",err);return}
        else console.log("productionDescrptionTable table is crated");
    })
    
    connection.query(Orders, (err) =>{
        if(err) {console.log("error: order table",err.message);return}
        else console.log("order table is crated");
    })
    
    res.end("All tables crated peacfully");
})

 
    // Question -3



        app.post("/add-product",(req,res)=>{
        
    
           
             let {
                product_url,
                product_name,
                briefDiscription,
                fullDiscrption,
                startPrice,
                priceRange,
                prodcutLink,
                imagePath
              } = req.body;
        
            
        
            const insertQuery=`
            INSERT INTO products (product_url,product_name) VALUES(?,?)
            `;
        
        
            connection.query(insertQuery,
                [product_url, product_name],
                (err,result)=>{
                if (err){
                    console.log("error inserting product:" , err.message);
                }
                else {
                    console.log("product added successfully!");
                    let product_id =result.insertId;
                    const insertDescription = `
                    INSERT INTO product_descriptions (product_id, production_brief_description) values (?,?)`
        
                    connection.query(insertDescription,
                        [product_id,briefDiscription
                             ], (err, result)=>{
                                if(err) console.log(err)
                                else console.log("description table inserted");
                             }
                    )
                    const insertPrice = `
                    INSERT INTO price (product_id,starting_price,	price_range	) VALUES (?,?,?)`
        
                    connection.query(insertPrice, 
                        [product_id, startPrice,
                            priceRange],
                            (err, result)=>{
                                if(err ) console.log(err);
                                else console.log("price inserted");
                            }
                    )
        
        
                }
            });
        res.send("date inserted")
            })
            app.listen(3000,(err)=>{
                if(err){
                    console.log(err.message);
                }
                else{
                    console.log("server is runing")
                }
                
            });
        
