export function fetchAllProducts() {
  return new Promise(async(resolve) =>{  
    const response = await fetch('http://localhost:8080/products')
    const data = response.json()
    console.log('Promise data',data)
  
    resolve({data})
  }
  )
}
