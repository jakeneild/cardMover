const DragDropManager = Object.create(null, {
  init: {
    value: () => {
        var holder = "";
      const stages = document.querySelectorAll(".stage")

      stages.forEach(stage => {
        // Gain reference of item being dragged
        stage.ondragstart = e => {
            holder = e.target.parentElement;  //places target into holder variable
          e.dataTransfer.setData("text", e.target.classList)
        }
      })


      const targets = document.querySelectorAll(".target")

      targets.forEach(target => {
        // Dragover not supported by default. Turn that off.
        target.ondragover = e => e.preventDefault()

        target.ondrop = e => {
            console.log(e.target)
          // Enabled dropping on targets
          e.preventDefault()

          // Determine what's being dropped
          const data = e.dataTransfer.getData("text")

          // Append card to target component as child
          // TODO: This should only happen if the target has no children nodes
          // TODO: This should not happen if the target is another stage card
          if(e.target.classList.contains("target") ==true && e.target.classList.contains("occupied") == false){
            if(holder.classList.contains("occupied")){  //removes occupied from old target
                if(holder.classList.contains("currentStage")){
                    holder.classList = "target currentStage";
                } else {
                    holder.classList = "target finishedStage"
                }
            }
            e.target.appendChild(document.querySelector(`.${data.split(" ")[1]}`))
            if(e.target.id == "target"){
                e.target.classList += " occupied" //adds occupied to new target
            }
          }
          if(e.target.parentElement.classList.contains("home")){
            if(holder.classList.contains("occupied")){  //removes occupied from old target
                if(holder.classList.contains("currentStage")){
                    holder.classList = "target currentStage";
                } else {
                    holder.classList = "target finishedStage"
                }
            }
              document.querySelector(".home").appendChild(document.querySelector(`.${data.split(" ")[1]}`));
          }
          
        }
      })
    }
  }
})

DragDropManager.init()