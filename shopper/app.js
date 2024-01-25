document.addEventListener('DOMContentLoaded', function () {
  const getShoppingListButton = document.getElementById('getShoppingListButton');
  getShoppingListButton.addEventListener('click', getReceivedList);
});

function getReceivedList() {
  const outputArea = document.getElementById('outputArea');
  const oldList = document.getElementById('old-list');

  if (oldList) {
    outputArea.removeChild(oldList);
  }

  fetch('http://localhost:3000/api/get-received-list')
    .then(response => response.json())
    .then(data => {
      const receivedList = data.list.list;

      if (Array.isArray(receivedList)) {
        const newList = document.createElement('ul');
        newList.id = 'old-list';

        receivedList.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = item;
          newList.appendChild(listItem);
        });

        outputArea.appendChild(newList);
      } else {
        console.error('Received List from Server is not an array:', receivedList);
      }
    })
    .catch(error => console.error('Error:', error));
}


  
