export const discountedPrice = (item) => {          
    return Math.round(item.product.price*(1-item.product.discountPercentage/100),2)    
}


export const discountedPriceAdmin = (item) => {          
    return Math.round(item.price*(1-item.discountPercentage/100),2)    
}


export const ProductListDiscountedPrice = (item) => {              
    return Math.round(item.price*(1-item.discountPercentage/100),2)
}