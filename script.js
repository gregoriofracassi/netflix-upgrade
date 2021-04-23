const endpoint = 'https://striveschool-api.herokuapp.com/api/movies/'
const rowContainer = document.querySelector('.row-container')


const getCategories = async () => {
try {
    const response = await fetch(endpoint, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMTQ4Y2IxZjBmYjAwMTVkOTE3NWYiLCJpYXQiOjE2MTkwMDc1MjQsImV4cCI6MTYyMDIxNzEyNH0.81RRvTd2IqaPZsKsv6VfBMJBnL17zGR0wW-6hEZVefU"
        }
    })
    if (!response.ok) {
        throw new Error('couldnt get movie categories')
    }
    const body = await response.json()  
    return body
    } catch (error) {
    console.log(error.message)
    }
}

const getMoviesFromCategory = async (category) => {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/movies/${category}`, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMTQ4Y2IxZjBmYjAwMTVkOTE3NWYiLCJpYXQiOjE2MTkwMDc1MjQsImV4cCI6MTYyMDIxNzEyNH0.81RRvTd2IqaPZsKsv6VfBMJBnL17zGR0wW-6hEZVefU"
            }
        })
        if (!response.ok) {
            throw new Error(`couldnt get movies from ${category}`)
        }
        const body = await response.json()
        return body
    } catch (error) {
        console.log(error.message);  
    }
}

const createRows = async () => {
    const categories = await getCategories()
    console.log(categories)
    categories.forEach ( cat => {
        contDiv = document.createElement('div')
        contDiv.classList.add('row')
        contDiv.innerHTML = `
        <div class="movie-gallery m-2 col-12">
          <h5 class="text-light mt-2 mb-2">${cat}</h5>
          <div id="trending-now" class="carousel slide w-100" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="movie-row">
                  <div class="row movies-row col-12">
                  </div>
                </div>
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#trending-now"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#trending-now"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </div>`
        rowContainer.appendChild(contDiv)
    })
    const moviesRows = document.querySelectorAll('.movies-row')
    let i = 0
    while (i < categories.length) {
        const movies = await getMoviesFromCategory(categories[i])
        const last6Movies = movies.length > 6 ? movies.slice(-6) : movies
        moviesRows[i].innerHTML = last6Movies.map( mov => {
            return`
            <a href="backoffice.html?id=${mov._id}" class="col-2">
            <div>
              <img class="movie-cover" src="${mov.imageUrl}" />
            </div>
            </a>`
        }).join('')
        i++
    }
        // row.innerHTML = `
        // <div class="col-md-2">
        //     <img class="movie-cover" src="media0.webp" />
        // </div>`
}

`
<div class="col-md-2">
    <img class="movie-cover" src="media0.webp" />
</div>
`

window.onload = createRows