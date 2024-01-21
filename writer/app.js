document.addEventListener('DOMContentLoaded', function () {
  const forms = document.querySelectorAll('.category-form');

  forms.forEach(form => {
      form.addEventListener('submit', function (event) {
          event.preventDefault();
      });
  });

  const sendListButton = document.getElementById('sendListButton');
  sendListButton.addEventListener('click', sendShoppingList);

});

function showCustomPopup(message) {
  const modal = document.createElement('div');
  modal.classList.add('custom-popup');
  modal.textContent = message;

  document.body.appendChild(modal);

  setTimeout(() => {
      document.body.removeChild(modal);
  }, 2000); 
}

function insertItem(outputId, input) {
  const outputArea = document.getElementById(outputId);
  const item = input;
  
  if (input.trim() === '') {
    showCustomPopup("box is empty");
    return; // Exit the function if the input is empty
  }


  showCustomPopup("Item added to list");

  const existingItems = Array.from(outputArea.childNodes).filter(child => {
      return child.nodeType === 1 && child.tagName.toLowerCase() === 'div' &&
          child.id === input;
  });

  existingItems.forEach((i) => {
      outputArea.removeChild(i);
  });

  const highestCounter = existingItems.reduce((maxCounter, div) => {
      const counter = parseInt(div.firstChild.dataset.count) || 0;
      return Math.max(maxCounter, counter);
  }, 0);

  const itemNameTextNode = document.createTextNode(item);
  const counterTextNode = document.createTextNode(`(${highestCounter + 1})`);
  const spaceTextNode = document.createTextNode(' ');

  const listDiv = document.createElement('div');
  listDiv.classList.add('listItem');
  const list = document.createElement('li');
  list.dataset.count = highestCounter + 1;

  list.appendChild(itemNameTextNode);
  list.appendChild(spaceTextNode);
  list.appendChild(counterTextNode);
  listDiv.appendChild(list);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.setAttribute("class","btn btn-success")
  deleteButton.setAttribute("id","delete-btn")

  listDiv.id = input;
  listDiv.appendChild(deleteButton);
  outputArea.appendChild(listDiv);

  deleteButton.addEventListener('click', function () {
      deleteButtonFunction(listDiv, outputArea, item);
  });
}

function deleteButtonFunction(listDiv, outputArea, item) {
  const currentCounter = parseInt(listDiv.firstChild.dataset.count) || 0;

  if (currentCounter > 1) {
      listDiv.firstChild.dataset.count = currentCounter - 1;
      listDiv.firstChild.textContent = `${item} (${currentCounter - 1})`;
  } else {
      outputArea.removeChild(listDiv);
  }
}

function sendShoppingList() {
  const outputArea = document.getElementById('outputArea');
  const shoppingListItems = Array.from(outputArea.children)
      .map(item => item.firstChild.textContent.trim());

  console.log('Shopping List Sent:', shoppingListItems);
}
