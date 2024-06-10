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


export function fetchProductDetailAPI(userId) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:8080/cart?userId=${userId}`)
    const data = response.json()
    resolve({ data })
  })
}