const express = require('express')
const axios = require('axios')

const { v4: uuid } = require('uuid')

const _ = require('lodash')
const moment = require('moment')
const chalk = require('chalk')
const { log, timeStamp } = require('console')


const app = express()
const users = [];
app.listen(3000, () => { console.log("app corriendo en puerto 3000") })




app.get("/crear", (req, res) => {
    console,log("ruta crear")
    axios.get('https://randomuser.me/api/?results=1')
        .then(({ data }) => {
            const userAPI = data.results[0]
            console.log(userAPI.gender)

            const { gender:gender,
                    name:name
                
            } = userAPI
            users.push({ gender:gender, first:name.first, last:name.last , id:uuid().slice(0,6), timestamp: moment().format("MMMM Do YYYY, h:mm:ss a") });


            var result = _.chain(users)
            .groupBy("gender")
            .value();

            let Masculino = result['male'] || [];
            let Femenino = result['female'] || [];
           
            let listaFemenino = ''
            let listaMasculino = ''
            if(Femenino.length >=1){
                Femenino.forEach(persona => {
                    listaFemenino += `<li>${persona.gender} - ${persona.name} - ${persona.last} - ${persona.id} - ${persona.timestamp} </li>`
                })
            }
            if(Masculino.length >=1){
                Masculino.forEach(persona => {
                    listaMasculino += `<li>${persona.gender} - ${persona.name} - ${persona.last} - ${persona.id} - ${persona.timestamp} </li>`
                })
            }

            let respuestaFemenino =`<h2>Mujeres:</h2>
            <ol>
                ${listaFemenino}

            </ol>`
            let respuestaMasculino = `<h2>Hombres:</h2>
            <ol>
                ${listaMasculino}

            </ol>`

            console.log(chalk.blue.bgWhite(respuestaFemenino + "\n" + respuestaMasculino))
            res.send(respuestaFemenino + respuestaMasculino)
        })



})