document.addEventListener('DOMContentLoaded', function () {
  const getShoppingListButton = document.getElementById('getShoppingListButton');
  getShoppingListButton.addEventListener('click', getReceivedList);
});

  function getReceivedList() {
    const outputArea = document.getElementById('outputArea');
    const itemsList = document.createElement('li');
    const oldList = document.getElementById('old-list');
    // const existingList = Array.from(outputArea.childNodes); //this would probably work

    if (oldList) {
    outputArea.removeChild(oldList); 
}
    // existingList.forEach((i) => { 
    // outputArea.removeChild(i); //i could have used this like the writer app, I wonder which is better
    // console.log(`previous list has been removed`);
    // });

    fetch('http://localhost:3000/api/get-received-list')
      .then(response => response.json())
      .then(data => {
        const receivedList = data.list;
        console.log('Received List from Server:', receivedList);

      itemsList.textContent = receivedList;
      outputArea.appendChild(itemsList); 
      itemsList.id = 'old-list';
      })
      .catch(error => console.error('Error:', error));
  }
