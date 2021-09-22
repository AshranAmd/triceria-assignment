const express = require('express');

// The I way understood the project -
// I need to create a api in node.js for 4 players 
// ( whose input for the choices of game has to generate via random generator )
// and response of the api should be a JSON containing the record for the 50
// matches (no. of iteration or the no. of matches , I used url parameter for the no. of matches)
// i.e. (url => game/start/20 or game/start/50)


// The thing I did in the project -
// for the result Json , I used an object of array . 
// for matches (no. of iteration or the no. of matches , I used url parameter for the no. of matches)
// i.e. (url => game/start/20 or game/start/50)
// for input choices => i used the Math.random function , then a function for the matches
// between for all probable situations in the game i.e. draw , loss and win for each two players
// and simultaneosly updating the json of the result . 

//my json of result looks like (i.e. for one player against the other players as given in assignment)

// taken  , ( player1 = pl1 , player2 = pl2 and so on ...) ,

//  score           |              against
//                  |   pl1     pl2     pl3     pl4
// player 1 (pl1)   |   -   ,   15  ,   25  ,   18

//my json =>

//   { pl1 : [  -  ,  15  ,  25  ,  18  ] }



const app = express();
const port = 6600;

app.set('json spaces' , 5)

app.get('/game/start', (req,res)=>{
    
    //declaring the variables and objects 
    
    // json result 

    var result = { p1 :['-', 0 , 0 , 0 ] ,p2 :[ 0 ,'-', 0 , 0 ] ,p3 :[ 0 , 0 ,'-', 0 ] ,p4 :[ 0 , 0 , 0 ,'-'] ,} ;
    
    // choices object

    var container = {};

    var string ;

    //getting the no. of iteration from the url

    var iteration = 50;

    var x = 0 ;

    //declaring choice array for rock , paper , scissors in their initials

    const choices = [ 'r' , 'p' , 's' ]

    // fucntion for input for the player's choice for rock, paper, scissors 
    function generators(){
     p1 = choices[Math.floor(3*Math.random())];
     p2 = choices[Math.floor(3*Math.random())];
     p3 = choices[Math.floor(3*Math.random())];
     p4 = choices[Math.floor(3*Math.random())];
}

    function input(){
        
    
    var input1 = p1 + p2;
    var input2 = p1 + p3;
    var input3 = p1 + p4;
    var input4 = p2 + p3;
    var input5 = p2 + p4;
    var input6 = p3 + p4;


    switch(x){
        case 0 :
        x++ ;
        return input1;
        break;
        case 1 :
        x++
        return input2;
        break;
        case 2 :
        x++
        return input3;
        break;
        case 3 :
        x++
        return input4;
        break;
        case 4 :
        x++
        return input5;
        break;
        case 5 :
        x = 0;
        return input6;
        break;

    }

    }
    
    var inputs = [];
    
    var inputout = {};
    
    function inputprocessing(){
        

        var inputstring = inputs.toString();
        var inputsplit = inputstring.split('');
        var inputsplice = inputsplit.splice(2,1);
        
        for(var i = 0 ; i<5 ; i++){
            if(inputsplit[i] == 'r'){
                inputout['p'+[i+1]]="rock";
            }
            else if (inputsplit[i] == 's'){
                inputout['p'+[i+1]]="scissor";
            }
            else if (inputsplit[i] == 'p'){
                inputout['p'+[i+1]]="paper";
                
            }
        }
        inputs = []
    }
    
    // according to the situation there will be 6 matches for each iteration of game 
    // i.e. (pl1,pl2) , (pl1,pl3) , (pl1,pl4) , (pl2,pl3) , (pl2,pl4) , (pl3,pl4) 
    // so , for each match , i created a fucntion which decides the result and updates the
    // json depending the two competitor and named each as compete1 , compete2  for (pl1,pl2)
    // and (pl1,pl3) .
    
    // for getting the code shorter i can concise this process , if needed
    
    
    function compete1(input){

        //p1 and p2

        inputs.push(input)
        
        if (input == 'pr'|| input == 'sp'||input == 'rs')   { 
            result.p1[1] = result.p1[1] + 1;
        }
        
        
        else if(input == 'rp'||input == 'ps'||input == 'sr'){
            result.p2[0] = result.p2[0] + 1;

        }
        
        
        else{

            
        }
    }
    function compete2(input){

        // p1 and p3
        

        
        if (input == 'pr'|| input == 'sp'||input == 'rs')   { 
            result.p1[2] = result.p1[2] + 1;
        }
        
        
        else if(input == 'rp'||input == 'ps'||input == 'sr'){
            result.p3[0] = result.p3[0] + 1;
        }
        
        
        else{
            
        }
    }
    function compete3(input){
        
        // p1 and p4



        if (input == 'pr'|| input == 'sp'||input == 'rs')   { 
            result.p1[3] = result.p1[3] + 1;
        }
        
        
        else if(input == 'rp'||input == 'ps'||input == 'sr'){
            result.p4[0] = result.p4[0] + 1;
        }
        
        
        else{
            
        }
    }
    function compete4(input){
        


        // p2 and p3
        
        if (input == 'pr'|| input == 'sp'||input == 'rs')   { 
            result.p2[2] = result.p2[2] + 1;
        }
        
        
        else if(input == 'rp'||input == 'ps'||input == 'sr'){
            result.p3[1] = result.p3[1] + 1;
        }
        
        
        else{
            
        }
    }
    function compete5(input){
        
        // p2 and p4



        if (input == 'pr'|| input == 'sp'||input == 'rs')   { 
            result.p2[3] = result.p2[3] + 1;
        }
        
        
        else if(input == 'rp'||input == 'ps'||input == 'sr'){
            result.p4[1] = result.p4[1] + 1;
        }
        
        
        else{
        
            
        }
    }
    function compete6(input){
        
        // p3 and p4

        inputs.push(input)



        if (input == 'pr'|| input == 'sp'||input == 'rs')   { 
            result.p3[3] = result.p3[3] + 1;
        }
        
        
        else if(input == 'rp'||input == 'ps'||input == 'sr'){
            result.p4[2] = result.p4[2] + 1;
        }
        
        
        else{
            
        }
    }

    // a loop fucntion for the no. matches or iteration 

    for (var i = 0 ; i<iteration ; i++){
         generators()
         compete1(input())
         compete2(input())
         compete3(input())
         compete4(input())
         compete5(input())
         compete6(input())
         string = JSON.parse((JSON.stringify(result)))
         inputprocessing()
         container['iteration -'+[i+1]+' ']=inputout;
         container['result -'+[i+1]+' ']=string;
         inputout ={};
        }   
        

        //sending the json containing the result
        // console.log(container)

        res.json(container);
        
})

app.listen(port,()=>{console.log(`server is listening at port ${port}`)})
    