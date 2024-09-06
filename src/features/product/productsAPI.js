export function fetchAllProducts() {
  return new Promise(async(resolve,reject) =>{  
    const response = await fetch('/products')
    const data = response.json()
    resolve({data})    
  }
  )
}

export function fetchAllProductsbyFilterAPI(filter) {  
  let queryString = ''
  for (let key in filter){
    queryString+= `${key}=${filter[key]}&`;
  }
  return new Promise(async(resolve) =>{  
    const response = await fetch('/products?'+queryString)
    const data = response.json()  
    resolve({data})
  }
  )
}


export function fetchProductDetailAPI(id) {
  return new Promise(async(resolve,reject) =>{    
    const response = await fetch(`/products/${id}`)
    const data = response.json()    
    resolve({data})    
  }
  )
}


export function addNewProductAsync(prodInfo) {
  return new Promise(async(resolve,reject) =>{  
    const response = await fetch('/products' ,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(prodInfo)
    })
    const data = response.json()
    console.log('Promise data',data)
  
    resolve({data})    
  }
  )
}



export function updateExixtingProductAPI(prod) {  
  return new Promise(async (resolve) => {        
    const response = await fetch(`/products/${prod.id}`, {
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



export function RemoveProductFromListAsyncAPI(ProdId) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`/products/${ProdId}`, {method: 'DELETE'})
    const data = response.json()
    resolve({ data:{id:ProdId} })
  }
  )
}


