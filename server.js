var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res) {

    url = 'https://origin-web-scraping.herokuapp.com/';

    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var jsonBooks = [];

            // var name, imgUrl, author, price;
            // var json = { name: "", imgUrl: "", author: "", price: "" };

            $('.panel').each(function() {

                var data = $(this);
                var name = data.children().first().text().trim();
                var imageUrl = data.children().eq(1).children().first().attr('src');
                var author = data.children().eq(1).children().eq(1).text();
                var price = data.children().eq(1).children().eq(2).text();

                var json = { name: name, imageUrl: imageUrl, author: author, price: price };
                jsonBooks.push(json);
            })

            // $('.img-responsive').filter(function() {
            //     var data = $(this);
            //     imgUrl = data.children().first().text();

            //     json.imgUrl = imgUrl;
            // })
            // $('.p').filter(function() {
            //     var data = $(this);
            //     author = data.children().first().text();

            //     json.author = author;
            // })

            // $('.green').filter(function() {
            //     var data = $(this);
            //     price = data.children().first().text();

            // json.price = price;
        }

        fs.writeFile('books.json', JSON.stringify(jsonBooks, null, 4), function(err) {
            console.log("JSON made");
        })

        res.send('Verify console');

    })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
