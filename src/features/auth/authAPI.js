export function createUser(userData) {
  return new Promise(async (resolve) => {
    // const response = await fetch('/users', {
    const response = await fetch('/auth/signup', {
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
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(LoginInfo)
      });
      if(response.ok){
        const data = await response.json();
        resolve({ data });
      }else{
        const err = await response.json();
        reject( err );
      }
    } catch (err) {
      reject(err);
    }
  });
}


export function userAddressAPI(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/users/${user.id}`, {
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
    const response = await fetch(`/users/${userId}`, { method: 'DELETE' })
    const dataResponse = response.json()
    resolve({ dataResponse })
  }
  )
}



export function SignOut(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: "User Logged Out" })
  }
  )
} 
