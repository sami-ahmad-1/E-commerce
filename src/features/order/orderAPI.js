export function OrderAPI(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/orders', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    })
    const data = response.json()
    resolve({ data })
  }
  )
}


export function fetchAllOrder() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/orders')
    const data = response.json()
    resolve({ data })
  }
  )
}


export function updateOrderAPI(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders/${order.id}`, {
      method: 'PATCH',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    })
    const data = response.json()
    resolve({ data })
  }
  )
}
