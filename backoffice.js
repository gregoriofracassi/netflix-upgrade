const form = document.querySelector('.submit')
const urlParams = new URLSearchParams(window.location.search);
const movie_id = urlParams.get('id')
const endpoint = movie_id ? `https://striveschool-api.herokuapp.com/api/movies/${movie_id}` : 'https://striveschool-api.herokuapp.com/api/movies/'
const method = movie_id ? 'PUT' : 'POST'
let title = document.querySelector('.title')
const deleteBtn = document.querySelector('.delete')

window.onload = () => {
    if (movie_id) {title.innerHTML = `Update movie (id: ${movie_id})`}
}

const postPutMovies = async (e) => {
    e.preventDefault()

    const newMovie = {
        name: document.querySelector('#name').value,
        description: document.querySelector('#description').value,
        category: document.querySelector('#category').value,
        imageUrl: document.querySelector('#imageUrl').value,
    }

    try {
        const response = await fetch(endpoint, {
            method: method,
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMTQ4Y2IxZjBmYjAwMTVkOTE3NWYiLCJpYXQiOjE2MTkwMDc1MjQsImV4cCI6MTYyMDIxNzEyNH0.81RRvTd2IqaPZsKsv6VfBMJBnL17zGR0wW-6hEZVefU",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMovie)
        })       
        if (!response.ok) {
            if (method === 'POST') {
                throw new Error('problems posting on api')
            } else if (method === 'PUT') {
                throw new Error('problems putting on api')
            }
        }
        const postResp = await response.json()
        console.log('succesfully posted/put:', postResp)
        window.location = 'index.html'
    } catch (error) {
        console.log(error.message)
    }
}

const deleteMovie = async () => {
    try {
        const response = await fetch(endpoint, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMTQ4Y2IxZjBmYjAwMTVkOTE3NWYiLCJpYXQiOjE2MTkwMDc1MjQsImV4cCI6MTYyMDIxNzEyNH0.81RRvTd2IqaPZsKsv6VfBMJBnL17zGR0wW-6hEZVefU"
            }
        })       
        if (!response.ok) {
            throw new Error('problems deleting the movie')
        }
        const deleteResp = await response.json()
        console.log('succesfully deleted:', deleteResp)
        window.location = 'index.html'
    } catch (error) {
        console.log(error.message)
    }   
}

deleteBtn.onclick = deleteMovie
form.onsubmit = postPutMovies
