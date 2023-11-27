
// client.js
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('myForm').addEventListener('submit', submitForm);
  });
  
  const apiKey = ''; // Replace with your Pexels API key
  
  
  async function submitForm() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dob = document.getElementById('dob').value;
  
    const response = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, dob }),
    });
  
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = ''; // Clear previous content
  
  
    if (response.ok) {
      const jsonData = await response.json();
      console.log(jsonData)
      const messageOne = jsonData.message;
      const additionalInfo = jsonData.horoscope;
    
      let chosenSign = jsonData.sign;
      // Display only the values from the JSON response
      document.getElementById('result').textContent = messageOne;
      document.getElementById('scope').textContent = additionalInfo;
  
      await fetchRandomTarotCard(chosenSign);
      await randomTarotCard(chosenSign);
  
    } else {
      resultContainer.textContent = 'Error in submitting data.';
    }
  
  }
  
  
     // Function to fetch a random tarot card image from Pexels
     async function fetchRandomTarotCard(chosenSign) {
      try {
        const page = `1`;
        const apiUrl = `https://api.pexels.com/v1/search`;
        const query = `?query=${chosenSign}&per_page=1&page=${page}`;
        const url = new URL(apiUrl + query);
    
        const response = await fetch(url, {
          headers: {
            Authorization: apiKey,
          },
        });
        console.log(response)
  
        if (!response.ok) {
          throw new Error('Failed to fetch tarot card');
        }
  
        const data = await response.json();
  
        if (data.photos.length === 0) {
          throw new Error('No tarot card found');
        }
  
        return data.photos[0].src.large;
      } catch (error) {
        console.error(error.message);
        return ''; // Provide a placeholder image path in case of an error
      }
    }
   
  
    // Function to display a random tarot card
    async function randomTarotCard(chosenSign) {
      const imageUrl = await fetchRandomTarotCard(chosenSign);
      document.getElementById('tarotImage').src = imageUrl;
    }
  
    // Initial display of a random tarot card
  
     randomTarotCard();