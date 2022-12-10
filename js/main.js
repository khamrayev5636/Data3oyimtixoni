const elForm = document.querySelector(".form");
const elSearch = elForm.querySelector(".input-search");
const elSelect = elForm.querySelector(".select-js");
const elList = document.querySelector(".data-list")


// Domga render qilish

function renderData(item , regex = ""){
    
    
    elList.innerHTML = ""
    
    item.forEach(element => {
        
        
        // CreatElement yaratish
        
        const newItem = document.createElement("li");
        newItem.classList.add("item-js")
        const newPost = document.createElement("span");
        newPost.classList.add("post-js");
        const newTitle = document.createElement("h3");
        newTitle.classList.add("title-js");
        const newDiv = document.createElement("div");
        newDiv.classList.add("email-js");
        const newEmail = document.createElement("p");
        newEmail.classList.add("badge" , "text-bg-warning",)
        const newBody = document.createElement("p");
        newBody.classList.add("text-js");
        const deletBtn = document.createElement("button");
        deletBtn.type = "button";
        deletBtn.textContent = "delete"
        deletBtn.dataset.id = element.id;
        deletBtn.classList.add("delete-btn" , "btn" , "btn-warning" , "px-4" , "mb-4")
        
        // Qiymat berish
        
        newPost.textContent = element.postId;
        
        if(regex.source !== "(?:)" && regex){
            
            newTitle.innerHTML = element.name.replace(regex , `<mark class="bg-danger">${regex.source}</mark>`);
        }else {
            newTitle.textContent = element.name;
        }
        
        newEmail.textContent = element.email;
        newBody.textContent = element.body;
        
        // Append qilish
        
        newDiv.appendChild(newEmail)
        newItem.append(newPost , newTitle , newDiv , newBody, deletBtn);
        elList.appendChild(newItem);
        
    });
    
}

// Categoriya buyicha sortlash


function renderSelect(render){
    
    const arr =[]
    
    render.forEach((list) => {
        list.postId.toString().split(" ").forEach((renderlist) =>{
            if(!arr.includes(renderlist)){
                arr.push(renderlist);
            };
        });
    });
    
    
    arr.forEach((option) =>{

        const elOption = document.createElement("option");

        elOption.value = option;
        elOption.textContent = option;

        elSelect.appendChild(elOption);
    });
    
}





// Event Delegation delete 

elList.addEventListener("click" , evt => {
    
    if(evt.target.matches(".delete-btn")){
        const delBtn = Number(evt.target.dataset.id);
        const findData = data.findIndex((del) =>{
            return  del.id === delBtn 
        })
        
        data.splice(findData , 1);
        renderData(data);
    }
    
})


// Form eshitish 

elForm.addEventListener("submit" , evt => {
    evt.preventDefault();
    
    const searchValue = elSearch.value.trim();
    const selectValue = elSelect.value.trim();
    
    const elReg = new RegExp(searchValue , "gi");
    
    const filterData = data.filter((item) => (item.name.match(elReg)) && (item.postId == selectValue || selectValue === "all"));
    
    if(filterData.length > 0){
        renderData(filterData , elReg);
    }else {
        alert("Bunday qiymat yuuuqq!!")
    }
})


renderSelect(data);
renderData(data);


