/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import java.util.Map.Entry;
import java.util.HashMap;
import java.util.Map;

 class TrieDataNode {

    private char letter;
    private Map<Character, TrieDataNode> children;
    private boolean isEndOfWord;

    /**
     * Initializes a TrieDataNode with its letter
     * @param letter The letter in this node
     */
    public TrieDataNode(char letter) {
        this.letter = letter;
        this.children = new HashMap<>();
    }

    public char getLetter() {
        return letter;
    }

    @Override
    public String toString() {
        return Character.toString(letter);
    }

    public Map<Character, TrieDataNode> getChildren() {
        return children;
    }

    public void setChildren(Map<Character, TrieDataNode> children) {
        this.children = children;
    }

    public boolean isEndOfWord() {
        return isEndOfWord;
    }

    public void setEndOfWord(boolean endOfWord) {
        isEndOfWord = endOfWord;
    }
}


public class AutoComplete {

    private TrieDataNode root;

    public AutoComplete() {
        root = new TrieDataNode('-');
    }

    public void addWord(String wordToAdd) {
        TrieDataNode currentNode = root;
        for (char letter : wordToAdd.toCharArray()) {
            if (currentNode.getChildren().containsKey(letter)) {
                currentNode = currentNode.getChildren().get(letter);
            } else {
                TrieDataNode node = new TrieDataNode(letter);
                currentNode.getChildren().put(letter, node);
                currentNode = node;
            }
        }
        currentNode.setEndOfWord(true);
    }

    public List<String> autoComplete(String baseChars) {

        StringBuilder stringBuilder = new StringBuilder();
        TrieDataNode current = root;
        for (char letter : baseChars.toCharArray()) {
            if (!current.getChildren().containsKey(Character.toUpperCase(letter)) &&
                !current.getChildren().containsKey(Character.toLowerCase(letter))) {
                return Collections.emptyList();
            }
            if (current.getChildren().get(Character.toUpperCase(letter)) != null) {
                current = current.getChildren().get(Character.toUpperCase(letter));
                stringBuilder.append(Character.toUpperCase(letter));
            } else {
                current = current.getChildren().get(Character.toLowerCase(letter));
                stringBuilder.append(Character.toLowerCase(letter));
            }
        }
        if (current.getChildren().entrySet().isEmpty()) {
            return Collections.singletonList(baseChars);
        }
        return getAllWords(current, stringBuilder.toString());
    }

    private List<String> getAllWords(TrieDataNode current, String baseChars) {
        List<String> results = new ArrayList<>();
        for (Entry<Character, TrieDataNode> map : current.getChildren().entrySet()) {
            if (map.getValue().isEndOfWord()) {
                results.add(baseChars + map.getValue().getLetter());
            }
            results.addAll(getAllWords(map.getValue(), baseChars + map.getValue().getLetter()));
        }
        Collections.sort(results);
        return results;
    }

    public boolean removeWord(String wordToRemove) {
        return remove(root, wordToRemove, 0);
    }

    private boolean remove(TrieDataNode current, String word, int index) {

        if (index == word.length()) {
            if (!current.isEndOfWord()) {
                return false;
            }
            current.setEndOfWord(false);
            return current.getChildren().isEmpty();
        }
        char ch = word.charAt(index);
        TrieDataNode node = current.getChildren().get(ch);
        if (node == null) {
            return false;
        }

        boolean deleteCurrentNode = remove(node, word, index + 1);

        if (deleteCurrentNode) {
            current.getChildren().remove(ch);
            return current.getChildren().isEmpty();
        }
        return false;
    }

    public boolean contains(String word) {
    TrieDataNode current = root;
    for (char letter : word.toCharArray()) {
        if (!current.getChildren().containsKey(Character.toUpperCase(letter)) &&
            !current.getChildren().containsKey(Character.toLowerCase(letter))) {
            return false;
        }
        if (current.getChildren().containsKey(Character.toUpperCase(letter))) {
            current = current.getChildren().get(Character.toUpperCase(letter));
        } else {
            current = current.getChildren().get(Character.toLowerCase(letter));
        }
    }
    return current.isEndOfWord();
}
    
    public static void main(String[] args) throws IOException {
        // Check if command-line argument is provided
        if (args.length == 0) {
            System.err.println("Usage: java AutoComplete <prefix>");
            System.exit(1);
        }

        // Get the prefix from command-line argument
        String prefix = args[0];

        Path worldListPath = new File("assets/wordlist.txt").toPath();
        List<String> wordList = Files.readAllLines(worldListPath);

        AutoComplete ac = new AutoComplete();
        for (String word : wordList) {
            ac.addWord(word);
        }
    List<String> autoCompleteResults = ac.autoComplete(prefix);

        // Use the prefix provided from the command line
        System.out.println(autoCompleteResults.get(0));
        System.out.println("done");
    }


}
