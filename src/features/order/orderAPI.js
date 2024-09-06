export function OrderAPI(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('/order', {
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
    const response = await fetch('/order/allOrders')
    const data = await response.json()
    resolve({ data })
  }
  )
}

export function updateOrderAPI(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/order/${order.id}`, {
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
