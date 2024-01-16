//writer.js
document.addEventListener('DOMContentLoaded', function () {
const forms = document.querySelectorAll('.category-form'); // Assuming you add the class 'category-form' to all your forms

  forms.forEach(form => { //what does this do, why is the input only captured from the breadlist
    form.addEventListener('submit', function(event) {
      event.preventDefault();
    });
  });

  const sendListButton = document.getElementById('sendListButton');
  sendListButton.addEventListener('click', sendShoppingList);

});

 function insertItem(outputId, input) {
    const outputArea = document.getElementById(outputId);
    const item = input;

    const existingItems = Array.from(outputArea.childNodes).filter(child => {
    return child.nodeType === 1 && child.tagName.toLowerCase() === 'div' &&
        child.id === input;
});
    existingItems.forEach((i) => { 
    // console.log(`Debug: existing items: ${existingItems.textContent}`); //don't know how to print this properly
    outputArea.removeChild(i); //I don't it will use a lot of memory, since there is usually only one existing item
    console.log(`child has been removed and replaced from outputArea`);
    });
    const highestCounter = existingItems.reduce((maxCounter, div) => { //div, item, hokuspokus, doesn't matter, it's just for readability
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
    console.log(`the counter for ${item} is at ${list.dataset.count}`);
    
    list.appendChild(itemNameTextNode);
    list.appendChild(spaceTextNode);
    list.appendChild(counterTextNode);
    listDiv.appendChild(list);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    listDiv.id = input;
    listDiv.appendChild(deleteButton);
    outputArea.appendChild(listDiv);
    
    deleteButton.addEventListener('click', function () {
        deleteButtonFunction(listDiv, outputArea, item);
    });
}

    function deleteButtonFunction(listDiv, outputArea, item) {
        const currentCounter = parseInt(listDiv.firstChild.dataset.count) || 0;
        console.log("Delete button is clicked");

        if (currentCounter > 1) {
            // Decrease the item counter by one
            listDiv.firstChild.dataset.count = currentCounter - 1;
            console.log(`Counter for ${item} decreased to ${listDiv.firstChild.dataset.count}`);

            // Update the text content to reflect the new counter
            listDiv.firstChild.textContent = `${item} (${currentCounter - 1})`;
          } else { 
            outputArea.removeChild(listDiv);
            console.log('Item successfully deleted');
          }
            }



    
  // Function to send the shopping list to the server
    function sendShoppingList() {
        const outputArea = document.getElementById('outputArea');
        const shoppingListItems = Array.from(outputArea.children)
            .map(item => item.firstChild.textContent.trim());

      fetch('http://localhost:3000/api/send-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ list: shoppingListItems }),
      })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }
