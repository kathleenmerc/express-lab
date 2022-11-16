const express = require("express")
const app = express()
const PORT = 3000
const fs = require("fs")
const { homedir } = require("os")

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "purple"]

app.set("view engine", "rainbow")
app.engine('rainbow', (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(err)
        const rendered = content.toString()
            .replace('#title#', '<title>' + options.title + '</title>')
            .replace('#message#', '<h1>' + options.message + '</h1>')
            .replace('#content#','<div>'+ options.content + '</div>' )
            .replace('#hexcode#','<div>'+ options.hexcode + '</div>' )
          return callback(null, rendered)
    })
})

app.get("/home/", (req, res) => {
    res.render("templateOne", { title: "Home", message: "Pick a color", content: `<a href="/colors/0">red</a> ~ <a href="/colors/1">orange</a> ~ <a href="/colors/2">yellow</a> ~ <a href="/colors/3">green</a> ~ <a href="/colors/4">blue</a> ~ <a href="/colors/5">indigo</a> ~ <a href="/colors/6">purple</a> ~ <a href="/rainbow">rainbow</a>` })
})

app.get("/colors/:indexOfColors", (req, res) => {
    res.render("templateOne", { title: colors[req.params.indexOfColors], message: colors[req.params.indexOfColors], content: `Is <a href="/${colors[req.params.indexOfColors]}">${colors[req.params.indexOfColors]}</a> is your favorite color?` })
})

app.get("/red", (req, res) => {
    res.render("templateTwo", { title: "Red", message: "Go ahead with RED", hexcode: "The hex code for red is #FF0000" })
})

app.get("/orange", (req, res) => {
    res.render("templateTwo", { title: "Orange", message: "ORANGE you glad you picked orange", hexcode: "The hex code for orange is #FFA500" })
})

app.get("/yellow", (req, res) => {
    res.render("templateTwo", { title: "Yellow", message: "YELLOW is mellow", hexcode: "The hex code for yellow is #FFFF00" })
})

app.get("/green", (req, res) => {
    res.render("templateTwo", { title: "Green", message: "GREEN is clean", hexcode: "The hex code for green is #00FF00" })
})

app.get("/blue", (req, res) => {
    res.render("templateTwo", { title: "Blue", message: "Woohoo, you picked BLUE", hexcode: "The hex code for blue is #0000FF" })
})

app.get("/indigo", (req, res) => {
    res.render("templateTwo", { title: "Indigo", message: "Go go go with INDIGO", hexcode: "The hex code for indigo is #4B0082" })
})

app.get("/purple", (req, res) => {
    res.render("templateTwo", { title: "Purple", message: "Nothing rhymes with PURPLE", hexcode: "The hex code for purple is #A020F0" })
})

app.get("/rainbow", (req, res) => {
    res.render("templateOne", { title: "Rainbow", message: "All about the RAINBOW show", content: "ROY G. BIV are the colors of the rainbow!"})
})

app.listen(PORT, (req, res) => {
    console.log(`Listening on ${PORT}`)
})