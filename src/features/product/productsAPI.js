export function fetchAllProducts() {
  return new Promise(async(resolve,reject) =>{  
    const response = await fetch('http://localhost:8080/products')
    const data = response.json()
    console.log('Promise data',data)
  
    resolve({data})    
  }
  )
}

export function fetchAllProductsbyFilterAPI(filter) {  
  let queryString = ''
  // filter ={category : "laptop"}
  for (let key in filter){
    queryString+= `${key}=${filter[key]}&`;
  }
  return new Promise(async(resolve) =>{  
    const response = await fetch('http://localhost:8080/products?'+queryString)
    const data = response.json()  
    resolve({data})
  }
  )
}


export function fetchProductDetailAPI(id) {
  return new Promise(async(resolve,reject) =>{    
    const response = await fetch(`http://localhost:8080/products/${id}`)
    const data = response.json()    
    resolve({data})    
  }
  )
}


export function addNewProductAsync(prodInfo) {
  return new Promise(async(resolve,reject) =>{  
    const response = await fetch('http://localhost:8080/products' ,{
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
