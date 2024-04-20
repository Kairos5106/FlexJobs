const tagBoxInput = document.querySelector(".tag-box input");
const tagList = document.querySelector(".tag-box ul");

let tags = [];

// Add new tag to the array of tags
function addTag(e) {
    if(e.key === "Enter") {
        e.preventDefault();  // prevent form submission
        let tag = e.target.value.trim(); // remove unwanted space in user inputted tag
        console.log(tag);

        if(tag.length > 1 && !tags.includes(tag)) {
            tags.push(tag);
            console.log(tags);
            
            let liTag = `<li>${tag} <i class="fa-solid fa-xmark" onclick="remove(this, '${tag}')"></i></li>`;
            tagList.insertAdjacentHTML("afterbegin", liTag);
        }

        e.target.value = "";
    }
}

// Remove tag when user click on remove icon
function remove(element, tag) {
    let index = tags.indexOf(tag);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    element.parentElement.remove();
    console.log(tags);
}

tagBoxInput.addEventListener("keydown", addTag);
