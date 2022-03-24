AFRAME.registerComponent("game-play", {
  schema: {
    elementId: { type: "string", default: "#ring1" },    
  },
  update: function () {
    this.isCollided(this.data.elementId);
  },

  init: function () {
    var duration = 120;
    const timerEl = document.querySelector("#timer");
    this.startTimer(duration, timerEl);
  },

  startTimer: function (duration, timerEl) {
    var minutes;
    var seconds;

    var timer = setInterval(countDown, 1000);

    function countDown() {
      if (duration >= 0) {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);

        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        timerEl.setAttribute("text", {
          value: minutes + ":" + seconds,
        });

        duration -= 1;
      } 
      else {
       this.gameOver();        
      }
    }
  },
  isCollided: function (elemntId) {
    const element = document.querySelector(elemntId);
    element.addEventListener("collide", (e) => {
      if (elemntId.includes("#ring")) {
        this.updateScore()
        this.updateTargets()
        element.setAttribute("visible", false)
        
      } else {
        this.gameOver()
      }
    });
  },

  updateTargets: function(){
    const element = document.querySelector("#targets")
    var count = element.getAttribute("text").value
    var currentTargets = parseInt(count)
    currentTargets = currentTargets - 1

    element.setAttribute("text", {value: currentTargets})

  },

  updateScore: function(){
    const element = document.querySelector("#Score")
    var score = element.getAttribute("text").value
    var currentScore = parseInt(score)
    currentScore = currentScore + 20

    element.setAttribute("text", {value: currentScore})
  },

  gameOver: function(){
    const planeEl = document.querySelector("#plane_model")
    const element = document.querySelector("#gameover")

    element.setAttribute("visible", true)
    planeEl.setAttribute("dynamic-body", {mass: 1})
  }
  
});
