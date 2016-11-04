var signup = document.querySelector('#signup')
var signin = document.querySelector('#signin')

signup.addEventListener('click', signupHandler)
signin.addEventListener('click', signinHandler)

function signupHandler() {

  var username = document.querySelector('#username').value
  var password = document.querySelector('#password').value
  var name = document.querySelector('#name').value
  var photo = document.querySelector('#photo').value

  fetch('', {
    body: JSON.stringify({
      username: username,
      password: password,
      name: name,
      photo: photo
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(signedupHandler)

}

function signedupHandler(response) {
  if (typeof response.user != 'undefined') {
    sessionStorage.setItem('chirps', response.user.api_token)
    window.location.href = '/chirps.html'
  }
  else {
    response.forEach(function(error) {

      var errorDiv = document.createElement('div')
      errorDiv.classList.add('alert', 'alert-danger')
      errorDiv.innerHTML = error
      document.querySelector('#errors').appendChild(errorDiv)

    })
  }
}

function signinHandler() {

  var username = document.querySelector('#username').value
  var password = document.querySelector('#password').value

  fetch('', {
    body: JSON.stringify({
      username: username,
      password: password
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(signedinHandler)
}

function signedinHandler(response) {
  sessionStorage.setItem('chirps', response.user.api_token)
  window.location.href = '/chirps.html'
}
