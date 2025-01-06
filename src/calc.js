import {useState} from 'react';
export function Calculator(){
    const [display,setDisplay]=useState('');
    return (
        <div id='calc'>
            <div id='display'>{display==''?0:display}</div>
            <div id='buttons' onClick={(e)=>{setDisplay(handler(e,display))}}>
                <button id='clear' className='clear'>AC</button>
                <button id='divide' className='operator'>/</button>
                <button id='multiply' className='operator'>*</button>
                <button id='seven' className='number'>7</button>
                <button id='eight' className='number'>8</button>
                <button id='nine' className='number'>9</button>
                <button id='subtract' className='subtract'>-</button>
                <button id='four' className='number'>4</button>
                <button id='five' className='number'>5</button>
                <button id='six' className='number'>6</button>
                <button id='add' className='operator'>+</button>
                <button id='one' className='number'>1</button>
                <button id='two' className='number'>2</button>
                <button id='three' className='number'>3</button>
                <button className='equal calculate' id='equals'>=</button>
                <button id='zero' className='number'>0</button>
                <button id='decimal' className='decimal'>.</button>
            </div>
        </div>
    )
}

let lastVar;
let afterEqual;
let afterOperator=false;
function handler(e,display){
    const operator = e.target.id;
    
    //Do not allow operators back to back
    if(lastVar == 'subtract'&& e.target.className == 'subtract'){
        lastVar = e.target.className;
        return display
    };
    if(lastVar == 'subtract' && e.target.className == 'operator'){
        lastVar = e.target.className;
        return display.slice(0,-1)+e.target.innerText;
    }
    if(lastVar!==undefined&&lastVar==='operator'){
        if(e.target.className=='operator'){
            lastVar = e.target.className;
            return display.slice(0,-1)+e.target.innerText;
                    
        }
    };
    lastVar = e.target.className;
    //display to reset after result and key press
    if(e.target.className==='number'&& afterEqual===true){
        afterEqual = false;
        return e.target.innerText;
       
    };
   //set variable for after an operator is pressed
    if(operator === 'add'||operator==='subtract'||operator==='divide'||operator==='multiply'){
        afterOperator=true;
        afterEqual = false;
    };
   
    //pressing clear key and equals key
    if(e.target.innerText=='AC'){
        afterOperator = false;
        return '';
        
    };
    if(e.target.innerText === '='){
        afterEqual = true;
        afterOperator = false;
        if(display.match(/(\+|\*|\/|\-){2,}/gm)){
            let arr = display.match(/(\+|\*|\/|\-){2,}/gm).toString().split('');
            if(arr[arr.length-1]!=='-'){
                let digit = arr[arr.length-1];
                let newStr = display.replace(/(\+|\*|\/|\-){2,}/gm,digit.toString())
                display = newStr
            }
            
            }
       const result = Function('return '+display)();
        return result
    };
    //handle decimals after operator
    if(afterOperator === true && 
        e.target.innerText === '.'&&
        display.toString().match(/(\d)(\+|\*|\/|\-)(\d)(\.)/)===null
        
    ){
        return display + e.target.innerText
    }
    if(afterOperator === true && 
        e.target.innerText === '.'&&
        display.toString().match(/(\d)(\+|\*|\/|\-)(\d)(\.)/)!==null){
            return display
        }
    //handle decimals before operator
    if(e.target.innerText === '.'&&afterOperator==false){
        if(display.toString().match(/\./)!==null){
            return display
        }else{
            return display + e.target.innerText
        }
        }
        //get rid of the placeholder zero after pressing keys
        if(display !== '0' &&
            display.length === 1
        ){return display + e.target.innerText};
        
        if(e.target.innerText==='0'){
            if(display.length===1){
                return display
            }else{return display + e.target.innerText}
        }else{
            return display + e.target.innerText
             }
}