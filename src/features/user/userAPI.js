// export function fetchLoggedInUserOrders() {
//   return new Promise(async(resolve) =>{  
//     const response = await fetch(`http://localhost:8080/order/own`)
//     const data = response.json()
//     resolve({data})    
//   }
//   )
// }

export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/order/own`)
      const data = await response.json(); 
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}


export function fetchLoggedInUser() {
  return new Promise(async(resolve) =>{  
    const response = await fetch(`http://localhost:8080/users/own`)
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
    const data = response.json()
    resolve({ data })
  }
  )
}

