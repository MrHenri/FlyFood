/*
4 5
0 0 0 0 D
0 A 0 0 0
0 0 0 0 C
R 0 B 0 0
*/

// ------------------------------Mapping------------------------------
// let input = prompt().split("\n") // Input by prompt
let input = "4 5\n0 0 0 0 D\n0 A 0 0 0\n0 0 0 0 C\nR 0 B 0 0".split("\n") //Problem Input
// let input = "5 5\nR 0 D C 0\nA 0 G 0 0\n0 0 0 I H\n0 0 E 0 0\n0 B 0 J F".split("\n")

// var start = window.performance.now()/1000;


let mapCity = input[0].split(" ")
input.shift()

// Lenght of mapCity
let lineStartPoint = Number(mapCity[0])
let columnStartPoint = Number(mapCity[1])

//Initiate the matrix
let matrix = Array(lineStartPoint).fill(null).map(()=> Array(columnStartPoint).fill(0))

// coordinates for each establish
let establishments = []
let coordinates = {}
let startPoint = []

//Populate matrix
for(let i = 0; i < lineStartPoint; i++){
    var line = input[i].split(" ")
    for(let j = 0; j < columnStartPoint; j++){
        var establishment = line[j]
        isEstablish(establishment, i, j)
    }
}

function isEstablish(establish, x, y){
    if(establish != "0" && establish != "R"){
        coordinates[establish] = [x,y]
        establishments.push(establish)
    } else if (establish == "R"){
        startPoint = [x,y]
    }
    matrix[x][y] = establish
}

// ------------------------------Permutation------------------------------

function permutations(arrayElement){

    var len = arrayElement.length, 
        perms = [],
        rest,
        picked,
        restPerms,
        next;
 
     //for one or less item there is only one permutation 
     if (len <= 1)
         return arrayElement;
 
     for (var i=0; i<len; i++)
     {
         //copy original array to avoid changing it while picking elements
         rest = Object.create(arrayElement);
 
         //splice removed element change array original array(copied array)
         //["A", "B", "C"].splice(2,1) will return ["C"] and remaining array = ["A","B"]
         picked = rest.splice(i, 1);
 
         //get the permutation of the rest of the elements
         restPerms = permutations(rest);
 
        // Now concat like ["A"] + permute(["B","C"]) for each
        for (var j=0; j<restPerms.length; j++)
        {
            next = picked.concat(restPerms[j]);
            perms.push(next);
        }
     }
 
    return perms;
 }

// ------------------------------Route Distance Calculation------------------------------

 function distance(originPoint, endPoint) {
    return Math.abs(originPoint[0] - endPoint[0]) + Math.abs(originPoint[1] - endPoint[1])
 }

let permutationResult = permutations(establishments)
let shortestWay = Infinity
let temporaryResult = 0
let result = ""
 
for (let i = 0; i < permutationResult.length; i++){
    var firstPoint = permutationResult[i][0]
    temporaryResult = distance(startPoint, coordinates[firstPoint])
    for (let j = 0; j < establishments.length - 1 ; j++){
        var pointX = coordinates[permutationResult[i][j]]
        var pointY = coordinates[permutationResult[i][j+1]]
        temporaryResult += distance(pointX, pointY)
    }
    
    temporaryResult += distance(pointY, startPoint)

    if(temporaryResult < shortestWay){
        shortestWay = temporaryResult
        result = permutationResult[i]
    }
}

// ------------------------------Results------------------------------
console.table(matrix) //MapCity
console.table(permutations(establishments)) //All the permutations
console.log(shortestWay) // Shortest distance
console.log(result) //Shortest Path
// var end = window.performance.now()/1000;
// console.log(end - start)

