const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve HTML and CSS files
app.use(express.static('public'));

// // Endpoint for inserting words into the Trie
// app.post('/insert', (req, res) => {
//     // Execute Java code to insert words into Trie
//     exec('javac AutoComplete.java && java AutoComplete insert', { cwd: __dirname }, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error: ${error.message}`);
//             res.status(500).send('Internal Server Error');
//             return;
//         }
//         if (stderr) {
//             console.error(`stderr: ${stderr}`);
//             res.status(400).send('Bad Request');
//             return;
//         }
//         console.log(`Inserted words into Trie: ${stdout}`);
//         res.status(200).send('Words inserted successfully');
//     });
// });

// Endpoint for searching words with a given prefix
app.get('/search/:prefix', (req, res) => {
    const prefix = req.params.prefix;
    // Execute Java code to search for words with the given prefix
    exec(`javac AutoComplete.java && java AutoComplete ${prefix}`, { cwd: __dirname }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            res.status(400).send('Bad Request');
            return;
        }
        const words = stdout.split('\n').filter(word => word.trim() !== '');
        console.log(`Words matching prefix '${prefix}': ${words}`);
        res.status(200).json(words);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
