const express = require("express")
const bodyParser = require("body-parser")

const db = require("./db")

const app = express()

app.use(bodyParser.json())
//DB list 테이블에 있는 모든 데이터 보내주기
app.get("/api/values", (req, res) => {
    //데이터베이스에서 모든 정보 가져오기
    db.pool.query("SELECT * from lists;", (err, results, fileds) => {
        if (err) return res.status(500).send(err)
        else return res.json({ success: true, value: results })
    })
})

app.post("/api/value", (req, res, next) => {
    db.pool.query(
        `insert into lists (value) VALUES("${req.body.value}");`,
        (err, results, fileds) => {
            if (err) return res.status(500).send(err)
            else return res.json({ success: true, value: req.body.value })
        }
    )
})

// //테이블 생성
// db.pool.query(`create table lists (
//     id integer auto_increment,
//     value text,
//     primary key (id)
// )`,
// (err,results, fileds)=>{
//     if(err)
//         return res.status(500).send(err)
//     else
//         return res.json({success:true, value:req.body.value})
// })

app.listen(5000, () => {
    console.log("5000 실행")
})
