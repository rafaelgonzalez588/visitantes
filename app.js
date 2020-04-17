const express = require('express');
const app = express();
const mongoose = require("mongoose");

//conexion db
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error", function (error) {
    console.log("Error", errro);
});

//Esquema
const visitorSchema = mongoose.Schema({
    date: { type: Date },
    name: String,
});
const Visitor = mongoose.model("Visitors", visitorSchema);

let dateString = Date();
let exito = 'El visitante fue almacenado con éxito'
app.get('/', (req, res) => {
    var name = req.query.name;
    

    if (!name) {
        name = 'Anónimo';
    }

    const person = new Visitor({
        name,
        date: dateString,
    });

    person.save((error) => {
        if (error) {
            return res.send(`error`);
        }
        return res.send(`<h1> ${exito} </h1>`);
    });
});

app.listen('3000', () => console.log('Listening on port 3000!'))