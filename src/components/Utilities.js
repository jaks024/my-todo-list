export function GenerateRandomIdNoDup(coll, min, max){
    let num = min;
    while(coll.includes(num)){
        num = Math.floor(Math.random() * (max - min) + min);
    };
    return num;
}   