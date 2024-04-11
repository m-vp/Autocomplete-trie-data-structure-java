// // Frontend code (assuming you're using JavaScript and a browser environment)
// const inputElement = document.getElementById('searchInput');

// inputElement.addEventListener('input', () => {
//     const searchValue = inputElement.value;
//     console.log(searchValue)
//     fetch(`http://localhost:3000/search/${searchValue}`)
//         .then(response => response.json())
//         .then(data => console.log(data,data))
//         .catch(error => console.error('Error:', error));
// });



// Frontend code (assuming you're using JavaScript and a browser environment)
// const inputElement = document.getElementById('searchInput');

// let completedWord = ''; // Store the completed word

// inputElement.addEventListener('input', () => {
//     const searchValue = inputElement.value;
//     console.log(searchValue)
//     fetch(`http://localhost:3000/search/${searchValue}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Autocomplete results:', data[0]);
//             completedWord = data[0]; // Store the completed word from autocomplete results
//             // Display autocomplete results in your UI as needed
//             // For example, you can iterate over 'data' and populate a dropdown or list
//         })
//         .catch(error => console.error('Error:', error));
// });

// inputElement.addEventListener('keydown', (event) => {
//     // Check if the Tab key is pressed
//     if (event.key === 'Tab') {
//         event.preventDefault(); // Prevent the default Tab behavior
//         if (completedWord) {
//             inputElement.value = completedWord; // Set the completed word in the input field
//             inputElement.style.color = 'gray'; // Set the color of the completed word to gray
//         }
//     }
// });







// const inputElement = document.getElementById('searchInput');
// const suggestedWordElement = document.getElementById('suggestedWord');

// let completedWord = ''; // Store the completed word

// inputElement.addEventListener('input', () => {
//     const incompleteWord = inputElement.value;
//     console.log(incompleteWord)
//     fetch(`http://localhost:3000/search/${incompleteWord}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Autocomplete results:', data[0]);
//             completedWord = data[0]; // Store the completed word from autocomplete results
//             // Display autocomplete results in the suggested word element
//             suggestedWordElement.innerHTML = completedWord ? completedWord : ''; // Show completed word if available
//         })
//         .catch(error => console.error('Error:', error));
// });

// inputElement.addEventListener('keydown', (event) => {
//     // Check if the Tab key is pressed
//     if (event.key === 'Tab') {
//         event.preventDefault(); // Prevent the default Tab behavior
//         if (completedWord) {
//             inputElement.value = completedWord; // Set the completed word in the input field
//             inputElement.style.color = 'black'; // Set the color of the completed word to black
//         }
//     }
// });



const inputElement = document.getElementById('input');
const suggestedWordElement = document.getElementById('suggestedWord');

let completedWord = ''; // Store the completed word

inputElement.addEventListener('input', () => {
    const incompleteWord = inputElement.value.trim(); // Trim leading and trailing whitespace
    const lastSpaceIndex = incompleteWord.lastIndexOf(' ');
    const currentWord = incompleteWord.substring(lastSpaceIndex + 1); // Get the current word after the last space
    console.log(currentWord);
    if (currentWord.length === 0) {
        // If current word is empty, reset completed word
        completedWord = '';
        suggestedWordElement.innerHTML = '';
        return;
    }

    fetch(`http://localhost:3000/search/${currentWord}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Autocomplete results:', data[0]);
            completedWord = data[0]; // Store the completed word from autocomplete results
            // Display autocomplete results in the suggested word element
            suggestedWordElement.innerHTML = completedWord ? completedWord : ''; // Show completed word if available
        })
        .catch(error => console.error('Error:', error));
});

inputElement.addEventListener('keydown', (event) => {
    // Check if the Tab key is pressed
    if (event.key === 'Tab') {
        event.preventDefault(); // Prevent the default Tab behavior
        if (completedWord) {
            const inputValue = inputElement.value.trim(); // Trim leading and trailing whitespace
            const lastSpaceIndex = inputValue.lastIndexOf(' ');
            const incompletePart = inputValue.substring(0, lastSpaceIndex + 1); // Get the incomplete part before the last space
            inputElement.value = incompletePart + completedWord; // Replace the incomplete word with the completed word
        }
    }
});


// const inputElement = document.getElementById('searchInput');
// const suggestedWordElement = document.getElementById('suggestedWord');

// let completedWord = ''; // Store the completed word

// inputElement.addEventListener('input', () => {
//     const inputValue = inputElement.value.trim(); // Trim leading and trailing whitespace
//     const lastSpaceIndex = inputValue.lastIndexOf(' ');

//     // Split input value into individual words
//     const words = inputValue.split(' ');

//     // Get the current word (the last word in the input)
//     const currentWord = words[words.length - 1];

//     if (currentWord.length === 0) {
//         // If current word is empty, reset completed word
//         completedWord = '';
//         suggestedWordElement.innerHTML = '';
//         inputElement.style.textDecoration = 'none'; // Remove text decoration
//         return;
//     }

//     if (!completedWord.startsWith(currentWord)) {
//         // If the current word is not a prefix of the completed word, underline it in red
//         inputElement.style.textDecoration = 'underline red';
//     } else {
//         // Otherwise, remove the red underline
//         inputElement.style.textDecoration = 'none';
//     }

//     fetch(`http://localhost:3000/search/${currentWord}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Autocomplete results:', data[0]);
//             completedWord = data[0]; // Store the completed word from autocomplete results
//             // Display autocomplete results in the suggested word element
//             suggestedWordElement.innerHTML = completedWord ? completedWord : ''; // Show completed word if available
//         })
//         .catch(error => console.error('Error:', error));
// });

// inputElement.addEventListener('keydown', (event) => {
//     // Check if the Tab key is pressed
//     if (event.key === 'Tab') {
//         event.preventDefault(); // Prevent the default Tab behavior
//         if (completedWord) {
//             const inputValue = inputElement.value.trim(); // Trim leading and trailing whitespace
//             const lastSpaceIndex = inputValue.lastIndexOf(' ');
//             const incompletePart = inputValue.substring(0, lastSpaceIndex + 1); // Get the incomplete part before the last space
//             inputElement.value = incompletePart + completedWord; // Replace the incomplete word with the completed word
//         }
//     }
// });
