export const discountedPrice = (item) => {
    return Math.round(item.price*(1-item.discountPercentage/100),2)
}