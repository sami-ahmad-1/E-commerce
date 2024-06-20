export function fetchLoggedInUserOrders(userId) {
  return new Promise(async(resolve) =>{  
    const response = await fetch(`http://localhost:8080/orders?user.id=${userId}`)
    const data = response.json()
    resolve({data})    
  }
  )
}

export function fetchLoggedInUser(userId) {
  return new Promise(async(resolve) =>{  
    const response = await fetch(`http://localhost:8080/users?id=${userId}`)
    const data = response.json()
    resolve({data})    
  }
  )
}

export function updateUserInfoAPI(userInfo) {  
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/users/${userInfo.id}`, {
      method: 'PATCH',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    })
    const dataResponse = response.json()
    resolve({ dataResponse })
  }
  )
}