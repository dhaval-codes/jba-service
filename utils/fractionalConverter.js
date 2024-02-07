export const convertToFractionalValue = (arr, length) => {
    let sum = 0
    for(let i=0; i<arr.length; i++){
        sum = sum + arr[i]+1
    }
    const Avg = sum/arr.length
    if(length === 4){
        return Avg*(5/4)
    } else if (length === 5){
        return Avg
    }
}