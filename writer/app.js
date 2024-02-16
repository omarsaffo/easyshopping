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

function GoToDirectory(path) {
  window.location.href = path;
}

let shoppingListItems = [];

// function sendShoppingList() {
//   const outputArea = document.getElementById('outputArea');
//   shoppingListItems = Array.from(outputArea.children)
//       .map(item => item.firstChild.textContent.trim());

//   console.log('Shopping List Sent:', shoppingListItems);

// }

function sendShoppingList() {
  const outputArea = document.getElementById('outputArea');
  shoppingListItems = Array.from(outputArea.children)
      .map(item => item.firstChild.textContent.trim());
  
  console.log('Shopping List Sent:', shoppingListItems);

  if (shoppingListItems.length === 0) {
    showCustomPopup("Shopping list is empty");
    return; // Exit the function if the shopping list is empty
  }

  // Send the shopping list to the server
  fetch('/api/send-list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ list: shoppingListItems }),
  })
  .then(response => response.text())
  .then(data => {
    showCustomPopup("List sent successfully");
    console.log('Server response:', data);
    shoppingListItems = []; // clear the shopping list    
    // Handle the server response as needed
  })
  .catch(error => {
    console.error('Error sending shopping list:', error);
    showCustomPopup("Error sending shopping list");
    // Handle the error as needed
  });
}


