export function CartAPI(CartData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart', {
      method: 'POST',
      body: JSON.stringify(CartData),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    })
    const data = response.json()
    resolve({ data })
  }
  )
}


export function fetchUserCartItemsAPI(userId) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:8080/cart?user=${userId}`)    
    const data = response.json()
    resolve({ data })
  })
}


export function updateCart(prod) {
  return new Promise(async (resolve) => {    
    const response = await fetch(`http://localhost:8080/cart/${prod.id}`, {
      method: 'PATCH',
      body: JSON.stringify(prod),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    })
    const data = response.json()
    resolve({ data })
  }
  )
}


export function RemoveProductAPI(ProdId) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:8080/cart/${ProdId}`, {method: 'DELETE'})
    const data = response.json()
    resolve({ data:{id:ProdId} })
  }
  )
}


