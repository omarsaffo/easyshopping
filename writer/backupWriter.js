//writer.js
document.addEventListener('DOMContentLoaded', function (id) {
// Event listener for the "Send Shopping List" button
const sendListButton = document.getElementById('sendListButton');
sendListButton.addEventListener('click', sendShoppingList);

});

 function insertText(outputId, input) {
    const outputArea = document.getElementById(outputId);
    const item = input;

    // Find all existing spans with the same text content
    const existingItems = Array.from(outputArea.childNodes).filter(
      (child) => child.textContent.startsWith(input)
    ); 
    //creates new array upon function call, but is eligible for garbage collection(JS thing) once the function execution is complete.

    // Remove all existing spans
     existingItems.forEach((i) => { //might use a lot of memory??
      outputArea.removeChild(i); //edit: I don't think so, since there is usually only one existing item
    });

    // Determine the highest counter (if any)
    const highestCounter = existingItems.reduce((maxCounter, item) => {
      const counter = parseInt(item.dataset.count) || 0;
      return Math.max(maxCounter, counter);
    }, 0);


    // Create separate text nodes for item name, counter, and space
    const itemNameTextNode = document.createTextNode(item);
    const counterTextNode = document.createTextNode(`(${highestCounter + 1})`);
    const spaceTextNode = document.createTextNode(' ');

    // Create a new list with the highest counter + 1
    const list = document.createElement('li');
    list.dataset.count = highestCounter + 1;
    list.classList.add('list-item');
    // list.textContent = `${item} (${highestCounter + 1})`;


    list.appendChild(itemNameTextNode);
    list.appendChild(spaceTextNode);
    list.appendChild(counterTextNode);
    outputArea.appendChild(list);


    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    list.appendChild(deleteButton);

    
    deleteButton.addEventListener('click', function () {
        deleteButtonFunction(list, outputArea);
    });
}

    function deleteButtonFunction(list, outputArea) {

        // const currentCounter = parseInt(list.dataset.count) || 0;
        // console.log("Debug: delete button is clicked");

        // if (currentCounter > 1) {
        //     // Decrease the item counter by one
        //     list.dataset.count = currentCounter - 1;
        //     console.log('Counter successfully decreased by one');

        //     // Update the text content to reflect the new counter
        //     list.textContent = `${item} (${currentCounter - 1})`;
        //   } else { commented out as it proved difficult to implement and could potentially be a feature in the future, not now

            outputArea.removeChild(list);
            console.log('Item successfully deleted');
          }
    //}

  // Function to send the shopping list to the server
    // function sendShoppingList() {
    //   const outputArea = document.getElementById('outputArea');

    //   const shoppingListItems = Array.from(outputArea.children)
    //     .filter(item => item.classList.contains('list-item'))
    //     .map(item => item.textContent.trim());

    //   fetch('http://localhost:3000/api/send-list', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ list: shoppingListItems }),
    //   })
    //     .then(response => response.text())
    //     .then(data => console.log(data))
    //     .catch(error => console.error('Error:', error));
    // }
