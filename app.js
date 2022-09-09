
let btn = (document.getElementById("parameters")).querySelectorAll("i")
let min = document.getElementById("min")
let sec = document.getElementById("sec")
let timer = document.getElementById("timer-label")

//increment/decrement in parameters
for (let i = 0; i < btn.length; i++){
    btn[i].addEventListener("click", (e) => {
        let action =e.target.id
        let number = (e.target.parentElement.parentElement).querySelector("label")
        if (parseInt(number.innerText) > 1 & parseInt(number.innerText) < 60) { 
        switch(action) {
            case "break-decrement" : number.innerText = parseInt(number.innerText) - 1;
                                     break;
            case "break-increment" : number.innerText = parseInt(number.innerText) + 1;
                                     break;
            case "session-decrement" : number.innerText = parseInt(number.innerText) - 1;
                                     break;
            case "session-increment" : number.innerText = parseInt(number.innerText) + 1;
                                     break;
        }
      }
      else if (parseInt(number.innerText) == 1) {
        switch(action) {
            case "break-increment" : number.innerText = parseInt(number.innerText) + 1;
                                     break;
            case "session-increment" : number.innerText = parseInt(number.innerText) + 1;
                                     break;
        }
      }
      else if (parseInt(number.innerText) == 60) {
        switch(action) {
            case "break-decrement" : number.innerText = parseInt(number.innerText) - 1;
                                     break;
            case "session-decrement" : number.innerText = parseInt(number.innerText) - 1;
                                     break;
        }
      }
      //changing the timer
      if (timer.innerText == "Session" & number.parentElement.id == "session-div"){
        sec.innerText = "00";
        min.innerText = number.innerText;
      } else if (timer.innerText == "Break" & number.parentElement.id == "break-div"){
        sec.innerText = "00";
        min.innerText = number.innerText;
      }
    })
}

//timer function
let reset = document.getElementById("reset")
let play = document.getElementById("start_stop")
let numClick = 0;
let timeout

    //start-stop
 
function decrementFunc () {
  if (parseInt(sec.innerText) > 0) {
    sec.innerText = parseInt(sec.innerText) - 1 ;
  }
  else {
    // time-left == 00:00
    if (parseInt(min.innerText) == 0 ) {
      (document.querySelector("audio")).play()
  
        if (timer.innerText == "Session") {
          timer.innerText = "Break";
          min.innerText = parseInt((document.getElementById("break-length")).innerText);
          
        }
        else {
          timer.innerText = "Session";
          min.innerText = parseInt((document.getElementById("session-length")).innerText) ;
        }
      
    }
    // time-left == XX:00
    else {
      sec.innerText = 59;
      min.innerText = parseInt(min.innerText) - 1
    }
    
  }
  if (parseInt(sec.innerText) < 10) {
    sec.innerText = "0" + parseInt(sec.innerText);
  }
  if (parseInt(min.innerText) < 10) {
    min.innerText = "0" + parseInt(min.innerText);
  }
 }

function stop(interval) {
  var clear = clearInterval(interval); 
}
 
play.addEventListener("click", (e) => {
    numClick ++ ;
    if (numClick == 1){
      timeout = setInterval(decrementFunc, 1000);
    }
    if (numClick == 2) {
      stop(timeout) ;
      numClick = 0;
    }
}) 

    //reset

reset.addEventListener("click", (e) => {
  stop(timeout);
  (document.getElementById("session-length")).innerText = 25;
  (document.getElementById("break-length")).innerText = 5;
  timer.innerText = "Session";
  min.innerText = 25 ;
  sec.innerText = "00";
  
  (document.querySelector("audio")).load()
})
