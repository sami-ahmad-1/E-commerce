export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(userData)
    })
    const data = response.json()
    resolve({ data })
  }
  )
}



export function checkUser(LoginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = LoginInfo.email
    const password = LoginInfo.password    
    console.log('email:',email  )
    console.log('password:',password)
    const response = await fetch('http://localhost:8080/users?email=' + email)
    const data = await response.json()
    console.log('Data From API', data)

    if (data.length) {
      if (data[0].password===password) {
        resolve({ data : data[0]})
        localStorage.setItem('token', email)
        window.localStorage.setItem('isLoggedIn', 'true')
      } else {
        reject({message:'Password is incorrect'})
      }
    } else {
      reject({message:'User Not Found'})      
    }
  }
  )
}


// export function userAddressAPI(user) {  
//   return new Promise(async (resolve) => {    
//     const response = await fetch(`http://localhost:8080/users/${user.id}`, {
//       method: 'PATCH',
//       body: JSON.stringify(user),
//       headers: {
//         'Content-Type': 'application/json; charset=utf-8'
//       },
//     })
//     const data = response.json()
//     resolve({ data })
//   }
//   )
// }


export function userAddressAPI(user) {  
  return new Promise(async (resolve, reject) => {    
    try {
      const response = await fetch(`http://localhost:8080/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function DeleteUserAddress(userId) {  
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/users/${userId}`, {method: 'DELETE'})
    const dataResponse = response.json()
    resolve({ dataResponse })
  }
  )
} 



export function SignOut(userId) {  
  return new Promise(async (resolve) => {
    resolve({ data : "User Logged Out" })
  }
  )
} 
