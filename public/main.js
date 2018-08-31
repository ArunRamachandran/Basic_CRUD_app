//main.js

var update = document.getElementById('update');

update.addEventListener('click', () => {
  // Send PUT request from here
  fetch('update_quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: 'Deepu',
      quote: 'Reverting back'
    })
  })
});
