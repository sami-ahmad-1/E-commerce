export function fetchAllProducts() {
  return new Promise(async(resolve) =>{  
    const response = await fetch('http://localhost:8080/products')
    const data = response.json()
    // console.log('Promise data',data)
  
    resolve({data})
  }
  )
}

export function fetchAllProductsbyFilterAPI(filter) {
  let queryString = ''
  // filter ={category : "laptop"}
  for (let key in filter){
    queryString+= `${key}=${filter[key]}&`;
    console.log(queryString)
  }
  return new Promise(async(resolve) =>{  
    const response = await fetch('http://localhost:8080/products?'+queryString)
    const data = response.json()  
    resolve({data})
  }
  )
}
