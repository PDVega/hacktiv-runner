// function doRegister(event) {
//       event.preventDefault()
//       axios.post('http://localhost:3000/signup', {
//         name: $('#inputName').val(),
//         email: $('#inputEmail').val(),
//         username: $('#inputUsername').val(),
//         password: $('#inp utPassword').val()
//       })
//       .then((response) => {
//         if(response.data) {
//           console.log('=== masuk login ===');
//           localStorage.setItem('token', response.data.token)
//           localStorage.setItem('id', response.data.id)
//           localStorage.setItem('username', response.data.username)
//           $('#inputName').val(''),
//           $('#inputEmail').val(''),
//           $('#inputUsername').val(''),
//           $('#inputPassword').val('')
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         alert('Register Fail')
//       })
//     }

$('#signupform').submit(event => {
  event.preventDefault();
  let name = $('#name').val();
  let email = $('#email').val();
  let username = $('#username').val();
  let password = $('#password').val();
  axios.post('http://localhost:3000/signup', {
    name: name,
    email: email,
    username: username,
    password: password
  })
  .then(res => {
    console.log(res);
    $('#name').val(''),
    $('#email').val(''),
    $('#username').val(''),
    $('#password').val('')
    window.location.href = 'index.html'
  })
  .catch(err => {
    console.log(err);
  })
})
