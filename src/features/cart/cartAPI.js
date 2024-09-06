export function CartAPI(CartData) {
  return new Promise(async (resolve) => {
    const response = await fetch('/cart', {
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




export function fetchUserCartItemsAPI() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/cart/own`); 
      const data = await response.json(); 
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}


export function updateCart(prod) {
  return new Promise(async (resolve) => {    
    const response = await fetch(`/cart/${prod.id}`, {
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
    const response = await fetch(`/cart/${ProdId}`, {method: 'DELETE'})
    const data = response.json()
    resolve({ data:{id:ProdId} })
  }
  )
}


