## Swear-detector

A javaScript Library for chat application users who want to moderate their chatrooms.

## Features
* Functions that detect the use of swear words, and if wanted, to censor them against a set of whitelisted words.
* Functions that attempt to catch evasions from said methods specified above.

## How to Use

```
npm install swear-detector
```

After you do this, in order to bring these methods into your project, you must require them into your module.

```
const swears = require('swear-detector/swears')
const evasion = require('swear-detector/evasion')
```

## Documentation

### [defaults](https://github.com/kennykimjr/swear-detector/blob/master/defaults.js)

This module contains all the default parameters that are used in the case that the user does not specify what to use for the parameters.

### [swears.js](https://github.com/kennykimjr/swear-detector/blob/master/swears.js)

```
parseMessage(message, delimiters=defaultDelimiters)
```
Where nessage us a string, and delimiters is a ``` Set ``` of charaters to split a message. This returns a set of all unique "words", separated by whatever ```delimiters``` specified. If no parameters are specified, then it goes to ```defaultDelimiters```.

```
hasSwear(parsedMessage, swears=defaultSwears)
```
Where ```parsedMessage``` is a ```Set``` of strings. This returns an ```Object``` with keys ```hasSwear```, a ```bool``` that tells you if a "swear" was found. This is usually checked against ```defaultSwears```. The second key ```swears``` returns a ```Set``` of words that are **both** in ```parsedMessage``` and ```swears```.

```
censor(word, mode=undefined, censors=defaultCensors, whitelist=newSet())
```

This method censors a word. That is, it obscures the part of the word that is matched against ```censors```. Depending on the ```mode``` specified, if no mode is specified, then it will attempt to censor **all** occurences of the phrase in a word. Otherwise, if the word is in ```censors``` but is also in the ```whitelist```, then it will not be censored out. If the word is not found within censors at all, it will return the origin word. Otherwise, it return a new "censored" word.  


```
censorSentence(sentence, mode=undefined, censors=defaultCensors, delimiters=defaultDelimiters, whitelist=new Set())
```

Censors a whole message. Generalizes the ```censor()``` function to a whole message. It returns the new "censored" message.

### [evasion.js](https://github.com/kennykimjr/swear-detector/blob/master/evasion.js)

This module allows one to possibly, check if a word is being typed out in a way that could disrupt the behavior of ```swears.js```. This library implements a set of functions that can be used to unobscure words and/or sentences.

```
translate(phrase, substitutes=defaultSubs)
```

 This function returns a "translated"  string, or simply, replaces "foreign" characters with its matched substitute.


```
unDodgeWordByDelimiters(word, delimiters=defaultDelimiters)
```

This function returns a "unobstructed" string that is potentially obscured by ```delimiters``` in order to hide its true meaning. ```word``` is a potential word that is obscured.

```
function unDodgeWordByAddition(word, alphabet=alphabet)
```

This function returns a ```Set``` of all the possible combinations of the ```word``` specified by inserting a character at every position in the string. This is used to detect an attempt to potentially dodge the swear methods by removing a character at a randomized position.

```
function unDodgeWordByDeletion(word)
```

This function returns a ```Set``` of all the possible combinations of the ```word``` specified by removing a character at every position in the string. This is used to detect an attempt to potentially dodge the filter by adding a character at a specified position.

```
unDodgeWordbyReplacement(word, alphabet=alphabet)
```

This function returns a ```Set``` of all the possible combinations of the ```word``` by replacing at every position in the word a character with every combination from the ```alphabet``` specified. This is used to detect an atempt to potentially dodge the filter by replacing a character at a specified position.
