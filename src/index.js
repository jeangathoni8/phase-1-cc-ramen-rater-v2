// index.js

//Mock API URL for fetching ramen data
const API_URL = 'http://localhost:3000/';

// Callback for handling clicks on ramen images
const handleClick = (event) => {
  // Add code
  const ramenId = event.target.getAttribute('data-id');
  fetch(`${API_URL}/${ramenId}`) // Use the provided API URL for fetching specific ramen details
    .then(response => response.json())
    .then(ramen => {
      document.querySelector('#ramen-detail .detail-image').src = ramen.image;
      document.querySelector('#ramen-detail .name').textContent = ramen.name;
      document.querySelector('#ramen-detail .restaurant').textContent = ramen.restaurant;
      document.getElementById('rating-display').textContent = ramen.rating;
      document.getElementById('comment-display').textContent = ramen.comment;
    })
    .catch(error => console.error('Error loading ramen details:', error));
};

const addSubmitListener = () => {
  // Add code
  const form = document.getElementById('new-ramen');
  const newNameInput = document.getElementById('new-name');
  // Remove the unused variable assignment
  // const newRestaurantInput = document.getElementById('new-restaurant');
  const newImageInput = document.getElementById('new-image');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const newName = newNameInput.value;
    const newImage = newImageInput.value;

    const img = document.createElement('img');
    img.src = newImage;
    img.alt = newName;
    // Optional: Add data-id attribute if integrating with a backend for consistent handleClick functionality
    document.getElementById('ramen-menu').appendChild(img);

    form.reset(); // Reset form fields after submission
  });
};

const displayRamens = () => {
  // Add code
  fetch(API_URL)
  .then(response => response.json())
  .then(ramens => {
    const menu = document.getElementById('ramen-menu');
    ramens.forEach(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.setAttribute('data-id', ramen.id); // Assuming each ramen has a unique ID
      img.addEventListener('click', handleClick);
      menu.appendChild(img);
    });
  })
  .catch(error => console.error('Error loading ramen data:', error));
};

const main = () => {
  displayRamens();// Invoke displayRamens here
  addSubmitListener();// Invoke addSubmitListener here
};

main();
// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
