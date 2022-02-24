const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dca');
const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req,res,next)=> res.sendFile(path.join(__dirname,'index.html')));
app.use('/src', express.static(path.join(__dirname, 'src')));

const init = async() => {
    try {
        await sequelize.sync({force: true});
        await Terrace.create({name: "Ami"});
        await Terrace.create({name: "Yuudai"});
        await Terrace.create({name: "Mizuki"});
        await Terrace.create({name: "Taka"});
        await Terrace.create({name: "Tsubasa"});
        await Terrace.create({name: "Shion"});
        await Terrace.create({name: "Shohei"});
        await Terrace.create({name: "Seina"});
        await Terrace.create({name: "Mayu"});
        await Terrace.create({name: "Yui"});
        await Terrace.create({name: "Noah"});
        await Terrace.create({name: "Aya"});
        await Terrace.create({name: "Shunsuke"});
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`));

    }
    catch(ex){
        console.log(ex);
    }
};

init();


const Terrace = sequelize.define('terrace',{
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

app.get('/terrace', async (req, res, next)=> {
    try {
     res.send(await Terrace.findAll());
    }
    catch (ex) {
     next(ex)
    }
  })

 
app.delete('/terrace/:id', async(req, res, next) => {
    try {
        const terrace = await Terrace.findByPk(req.params.id)
        await terrace.destroy()
        res.sendStatus(204)
    } catch(err) {
        console.log(err)
    }
})

