// Get the elements
const testText = document.querySelector('.test-text p');
const originText = testText.innerHTML;
const textArea = document.querySelector('.text-area');
const theTimer = document.querySelector('.timer p');
const errors = document.querySelector('.errors p');
const speed = document.querySelector('.speed p');
const resetBtn = document.querySelector('.btn.reset');
// Declaring Variables
var timeInterval;
var timer = [0,0,0,0];
var textEntered;
var originTextMatch;
var speedInterval;
var errorsCount = 0;
var timerRunning = false;
// Adding Zero to numbers from 1 to 9
function zeroBeforeOneToNine(time) {
      if (time <= 9) {
            time = "0" + time;
      }
      return time;
}; 
// To run the countup timer
function runTheTimer() {
      // What appears in webpage
      let currentTime = zeroBeforeOneToNine(timer[0]) + ":" + zeroBeforeOneToNine(timer[1]) + ":" + zeroBeforeOneToNine(timer[2]);
      theTimer.innerHTML = currentTime;
      // Some math to declare min, sec and mil-sec
      timer[3]++
      // Convert all units to minute to do get the current minute
      // Adding math.floor to get Non-decimal Number
      timer[0] = Math.floor((timer[3]/100)/60);
      // Convert all units to seconds to do get the current second
      timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
      // Convert all units to milli-seconds to get the current milli second
      timer[2] = Math.floor((timer[3] - (timer[1] * 100) - (timer[0] * 6000)));
};
// Check entered text if matches the origin text or not
function spellCheck() {
      textEntered = textArea.value;
      // Get part of origin text to match with entered text
      originTextMatch = originText.substring(0, textEntered.length);      
      if(textEntered == originText) {
            // No need to timer and speed tester after finishing
            // I set the intervals in the start function below
            clearInterval(timeInterval);
            clearInterval(speedInterval);
            // No need to write in the text area
            textArea.setAttribute("readonly", "true");
            // Adding green color to the border to feel success
            textArea.style.borderColor = "#1A535C";
      }else {
            if(textEntered == originTextMatch) {
                  // If text entered matches before finishing
                  textArea.style.borderColor = "#166088"
            }else {
                  // There is an error here
                  // Count The Errors
                  errorsCount++;
                  errors.innerHTML = errorsCount; 
                  textArea.style.borderColor = "#FF6B6B";
            }
      }
};
// Speed Function
function speedResult() {
      // You can get the equation from google but you must convert all units to minute and combine them first
      let currentSpeed = Math.floor((originTextMatch.length/5)/((timer[1]/60)+(timer[0])+(timer[2])/6000));
      speed.innerHTML = currentSpeed + " WPM";
};
// Start when user starts typing
function start() {
      // Get the length
      let textEnteredLength = textArea.value.length;
      if (textEnteredLength === 0 &!timerRunning) {   
            timerRunning = true;
            // Set the intervals         
            timeInterval = setInterval(runTheTimer, 10);
            speedInterval = setInterval(speedResult, 200);            
      }
};
// Reset All
function reset(e) {
      e.preventDefault();
      timerRunning = false;            
      clearInterval(timeInterval);
      clearInterval(speedInterval);
      errorsCount = 0;
      timer = [0,0,0,0];
      speed.innerHTML = "-";
      errors.innerHTML = "-";
      theTimer.innerHTML = "00:00:00";
      textArea.removeAttribute("readonly");
      textArea.value = "";
      textArea.style.borderColor = "#0B132B";
};
// Adding Events to do the job
textArea.addEventListener('keypress', start, false);
textArea.addEventListener('keydown', function(e) {
      if (e.which === 229) {
            start();
      }
}, false);
textArea.addEventListener('keyup', spellCheck, false);
resetBtn.addEventListener('click', reset, false);