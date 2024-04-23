function enableEditing(category) {
    var description = document.getElementById(category + "-description");

    var saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.className = "save-button";
    saveButton.onclick = function() {
        saveChanges(category);
    };

    // Select all paragraphs and list items within the description
    var elements = description.querySelectorAll("p, li");

    elements.forEach(function(element) {
        var input = document.createElement("input");
        input.type = "text";
        input.className = "edit-input";
        input.value = element.innerText;

        // Replace the content of paragraphs and list items with input fields
        element.innerHTML = "";
        element.appendChild(input);
        element.appendChild(document.createElement("br"));

        // Add edit and delete buttons
       

        var deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.onclick = function() {
            element.parentNode.removeChild(element);
        };
        element.appendChild(deleteButton);
    });

    if (category === 'organization' || category === 'skill') {
        // Add a button for adding list items
        var addButton = document.createElement("button");
        addButton.innerText = "Add Item";
        addButton.className = "add-item-button";
        addButton.onclick = function() {
            addListItem(description);
        };
        description.appendChild(addButton);
    }
    description.appendChild(saveButton);
}




function addListItem(description) {
    var ul = description.querySelector("ul");
    
    var li = document.createElement("li");
    var input = document.createElement("input");
    input.type = "text";
    input.className = "edit-input";
    li.appendChild(input);
    // Add a delete button for each list item
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete-item-button";
    deleteButton.onclick = function() {
        ul.removeChild(li);
    };
    li.appendChild(deleteButton);
    
    ul.appendChild(li);
}

function saveChanges(category) {
    var description = document.getElementById(category + "-description");
    var inputs = description.querySelectorAll(".edit-input");
    var saveButton = description.querySelector(".save-button");

    // Create a document fragment to hold the updated content temporarily
    var fragment = document.createDocumentFragment();

    // Append the edited content to the fragment
    inputs.forEach(function(input) {
        var element;
        if (input.parentNode.tagName === "P") {
            // If the input's parent is a paragraph, create a new paragraph
            element = document.createElement("p");
        } else if (input.parentNode.tagName === "LI") {
            // If the input's parent is a list item, create a new list item
            element = document.createElement("li");
        }
        element.innerText = input.value;
        fragment.appendChild(element);
    });

    // Clear the existing content of the description
    description.innerHTML = "";

    // Append the fragment content to the description
    description.appendChild(fragment);

    // Remove the save button
    description.removeChild(saveButton);
}


function addDetailsDivision(button) {
    var container = button.closest('.container');

    var details = document.createElement('div');
    details.classList.add('details');

    if (container.querySelector('.title').textContent.includes("Education")) {
        details.innerHTML = `
            <div class="description" id="education-description">
                <div class="input-wrapper">
                    <input type="text" placeholder="University" class="new-detail-input">
                    <input type="text" placeholder="Degree" class="new-detail-input">
                    <input type="text" placeholder="Years" class="new-detail-input">
                </div>
                <div class="button-wrapper">
                    <button onclick="saveEducation(this)">Save</button>
                </div>
            </div>
        `;
    } else if (container.querySelector('.title').textContent.includes("Experience")) {
        details.innerHTML = `
            <div class="description" id="experience-description">
                <div class="input-wrapper">
                    <input type="text" placeholder="Position" class="new-detail-input">
                    <input type="text" placeholder="Company" class="new-detail-input">
                    <input type="text" placeholder="Date" class="new-detail-input">
                    <input type="text" placeholder="Location" class="new-detail-input">
                </div>
                <div class="button-wrapper">
                    <button onclick="saveExperience(this)">Save</button>
                </div>
            </div>
        `;
    } else if (container.querySelector('.title').textContent.includes("Honor")) {
        details.innerHTML = `
            <div class="description" id="honor-description">
                <div class="input-wrapper">
                    <input type="text" placeholder="Award" class="new-detail-input">
                    <input type="text" placeholder="Degree" class="new-detail-input">
                    <input type="text" placeholder="Date" class="new-detail-input">
                </div>
                <div class="button-wrapper">
                    <button onclick="saveHonor(this)">Save</button>
                </div>
            </div>
        `;
    }else if (container.querySelector('.title').textContent.includes("Organization")) {
        details.innerHTML = `
        <div class="description" id="organization-description">
        <div class="input-wrapper">
            <input type="text" placeholder="Name" class="new-detail-input">
            <input type="text" placeholder="Position" class="new-detail-input">
        </div>
       
        <div class="button-wrapper">
            <button onclick="saveOrganization(this)">Save</button>
        </div>
    </div>
        `;
    }else if(container.querySelector('.title').textContent.includes("Skill")){
    details.innerHTML = `
    <div class="description" id="skill-description">
        <div class="input-wrapper">
            <input type="text" placeholder="Skill Name" class="new-skill-input">
        </div>
        <div class="button-wrapper">
        <button onclick="addListItem(this.closest('.details'))">Add Item</button>

            <button onclick="saveSkill(this)">Save</button>
        </div>
    </div>
`;
    }
    // Append the new details at the end of the container
    container.appendChild(details);
}

function saveEducation(button) {
    var container = button.closest('.container');
    var universityInput = container.querySelector('.new-detail-input:nth-of-type(1)');
    var degreeInput = container.querySelector('.new-detail-input:nth-of-type(2)');
    var yearsInput = container.querySelector('.new-detail-input:nth-of-type(3)');
    var educationDescription = container.querySelector('#education-description');

    // Check if all inputs are filled
    if (universityInput.value.trim() === '' || degreeInput.value.trim() === '' || yearsInput.value.trim() === '') {
        alert('Please fill all fields.');
        return;
    }

    // Create new elements for education details
    var universityParagraph = document.createElement('p');
    universityParagraph.textContent = universityInput.value.trim();

    var degreeParagraph = document.createElement('p');
    degreeParagraph.textContent = degreeInput.value.trim();

    var yearsParagraph = document.createElement('p');
    yearsParagraph.textContent = yearsInput.value.trim();

    // Append the new elements to the description
    educationDescription.appendChild(document.createElement('br'));
    educationDescription.appendChild(universityParagraph);
    educationDescription.appendChild(degreeParagraph);
    educationDescription.appendChild(yearsParagraph);


    // Remove the input fields and buttons
    universityInput.parentNode.removeChild(universityInput);
    degreeInput.parentNode.removeChild(degreeInput);
    yearsInput.parentNode.removeChild(yearsInput);
    button.parentNode.removeChild(button);
}

function saveExperience(button) {
    var container = button.closest('.container');
    var positionInput = container.querySelector('.new-detail-input:nth-of-type(1)');
    var companyInput = container.querySelector('.new-detail-input:nth-of-type(2)');
    var duration = container.querySelector('.new-detail-input:nth-of-type(3)');
    var locationInput = container.querySelector('.new-detail-input:nth-of-type(4)');
    var experienceDescription = container.querySelector('#experience-description');

    // Check if all inputs are filled
    if (positionInput.value.trim() === '' || companyInput.value.trim() === '' || duration.value.trim() === '' || locationInput.value.trim() === '') {
        alert('Please fill all fields.');
        return;
    }

    // Create new elements for experience details
    var positionParagraph = document.createElement('p');
    positionParagraph.textContent = positionInput.value.trim();

    var companyParagraph = document.createElement('p');
    companyParagraph.textContent = companyInput.value.trim();

    var dateParagraph = document.createElement('p');
    dateParagraph.textContent = duration.value.trim();

    var locationParagraph = document.createElement('p');
    locationParagraph.textContent = locationInput.value.trim();

    // Append the new elements to the description
    experienceDescription.appendChild(document.createElement('br'));
    experienceDescription.appendChild(positionParagraph);
    experienceDescription.appendChild(companyParagraph);
    experienceDescription.appendChild(dateParagraph);
    experienceDescription.appendChild(locationParagraph);

    // Remove the input fields and buttons
    positionInput.parentNode.removeChild(positionInput);
    companyInput.parentNode.removeChild(companyInput);
    duration.parentNode.removeChild(duration);
    locationInput.parentNode.removeChild(locationInput);
    button.parentNode.removeChild(button);
}

function saveHonor(button) {
    var container = button.closest('.container');
    var award = container.querySelector('.new-detail-input:nth-of-type(1)');
    var organization = container.querySelector('.new-detail-input:nth-of-type(2)');
    var duration = container.querySelector('.new-detail-input:nth-of-type(3)');
    var honorDescription = container.querySelector('#honor-description');

    if (award.value.trim() === '' || organization.value.trim() === '' || duration.value.trim() === '') {
        alert('Please fill all fields.');
        return;
    }

    var awardParagraph = document.createElement('p');
    awardParagraph.textContent = award.value.trim();

    var organizationParagraph = document.createElement('p');
    organizationParagraph.textContent = organization.value.trim();

    var durationParagraph = document.createElement('p');
    durationParagraph.textContent = duration.value.trim();

    honorDescription.appendChild(document.createElement('br'));
    honorDescription.appendChild(awardParagraph);
    honorDescription.appendChild(organizationParagraph);
    honorDescription.appendChild(durationParagraph);

    award.parentNode.removeChild(award);
    organization.parentNode.removeChild(organization);
    duration.parentNode.removeChild(duration);
    button.parentNode.removeChild(button);
}

function saveSkill(button) {
    var container = button.closest('.container');
    var skillInput = container.querySelector('.new-skill-input');
    var skillDescription = container.querySelector('#skill-description ul');

    // Check if the input field is empty
    if (skillInput.value.trim() === '') {
        alert('Please enter a skill name.');
        return;
    }

    // Create a new list item for the skill
    var skillItem = document.createElement('li');
    skillItem.textContent = skillInput.value.trim();

    // Append the new skill to the list of skills
    skillDescription.appendChild(skillItem);

    // Remove the input field and save button
    skillInput.parentNode.parentNode.removeChild(skillInput.parentNode);
    button.parentNode.parentNode.removeChild(button.parentNode);
}


function saveOrganization(button) {
    var container = button.closest('.container');
    var nameInput = container.querySelector('.new-detail-input:nth-of-type(1)');
    var positionInput = container.querySelector('.new-detail-input:nth-of-type(2)');

    // Check if all inputs are filled
    if (nameInput.value.trim() === '' || positionInput.value.trim() === '') {
        alert('Please fill all fields.');
        return;
    }

    // Create new elements for organization details
    var nameParagraph = document.createElement('p');
    nameParagraph.textContent = nameInput.value.trim();

    var positionParagraph = document.createElement('p');
    positionParagraph.textContent = positionInput.value.trim();

    // Append the new elements to the description
    var organizationDescription = container.querySelector('.description');
    organizationDescription.appendChild(document.createElement('br'));
    organizationDescription.appendChild(nameParagraph);
    organizationDescription.appendChild(positionParagraph);

    // Remove the input fields and buttons
    nameInput.parentNode.removeChild(nameInput);
    positionInput.parentNode.removeChild(positionInput);
    button.parentNode.removeChild(button);
}


function addListItem(description) {
    var ul = description.querySelector("ul");
    var li = document.createElement("li");
    var input = document.createElement("input");
    input.type = "text";
    input.className = "edit-input";
    li.appendChild(input);

    // Add a delete button for each list item
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete-item-button";
    deleteButton.onclick = function() {
        li.parentNode.removeChild(li);
    };
    li.appendChild(deleteButton);

    if (ul) {
        // If <ul> exists in the description, append to it
        ul.appendChild(li);
    } else {
        // If <ul> doesn't exist, append to the description directly
        description.appendChild(li);
    }
}


