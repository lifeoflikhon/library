const express = require('express')
const router = express.Router()
const Authors = require('../models/author')

// All Authors Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Authors.find(searchOptions)
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// New Authors Route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Authors() })
})

// Create Authors Route
router.post('/', async (req, res) => {
    const author = new Authors({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Authors'
        })
    }
})

module.exports = router
