
const milestonesData = JSON.parse(data).data;

//load course milestones data

function loadMilestones(){
    const milestones = document.querySelector(".milestones");

    milestones.innerHTML = `${milestonesData.map(function(milestone){
        return `<div class="milestone border-b" id="${milestone._id}">
            <div class="flex">
              <div class="checkbox"><input type="checkbox" onclick="markMilestone(this,${milestone._id})" /></div>
              <div onclick="openMilestone(this,${milestone._id})">
                <p>
                  ${milestone.name}
                  <span><i class="fas fa-chevron-down"></i></span>
                </p>
              </div>
            </div>
            <div class="hidden_panel">
              ${milestone.modules.map(function(module){
              return`<div class="module border-b">
                <p>${module.name}</p>
              </div>`;              
              })}
            </div>
          </div>`
    }).join("")}`;
}

function openMilestone(milestoneElement,id){
  const currentPanel = milestoneElement.parentNode.nextElementSibling;
  const showPanel = document.querySelector(".show");
  const active = document.querySelector('.active');

//first remove previous active class if any[other than the clicked one]
  if(active && !milestoneElement.classList.contains("active")){
    active.classList.remove('active');
  }

//toggle current clicked one
  milestoneElement.classList.toggle('active');


//first hide previous panel if open[other than clicked element]
  if(!currentPanel.classList.contains("show")&& showPanel){
    showPanel.classList.remove('show');
  }


//toggle current element
  currentPanel.classList.toggle('show');

  showMilestone(id);

}

function showMilestone(id){
  const milestoneImage = document.querySelector(".milestoneImage");
  const name = document.querySelector(".title"); 
  const details = document.querySelector(".details");

  milestoneImage.computedStyleMap.opacity="0";

  milestoneImage.src = milestonesData[id].image;
  name.innerText = milestonesData[id].name;
  details.innerText = milestonesData[id].description;
}
//listen for an event
const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function(){
  this.style.opacity = "1";
};

function markMilestone(checkbox,id){
  const doneList = document.querySelector(".doneList");
  const milestonesList = document.querySelector(".milestones");
  const Item = document.getElementById(id);

  if(checkbox.checked){
    //mark as done
    milestonesList.removeChild(Item);
    doneList.appendChild(Item);
  }else{
    //back to main
    milestonesList.appendChild(Item);
    doneList.removeChild(Item);
  }
}

loadMilestones();