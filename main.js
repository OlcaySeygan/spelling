var p = document.getElementById('hyphenated');

var message = 'Sihiri görmek için birşeyler yaz.'
p.innerHTML = message;

document.getElementById("input_word").addEventListener('focus', function() {
  this.parentElement.classList.add('active');
});

document.getElementById("input_word").addEventListener('blur', function() {
  if(this.value.length == 0) {
    this.parentElement.classList.remove('active');
  }
});

var alphabet = 'abcçdefgğhıijklmnoöprsştuüvyz'.split('');
var vowels = 'aeıioöuü'.split('');
var consonants = ['str', 'ktr', 'ntr'];

document.getElementById("input_word").addEventListener('keyup', function() {
  if(this.value.length == 0) {
    p.innerHTML = message;
    return;
  }
  
  var word = this.value;
  var syllables = [];
  
  for(var i = 0; i < word.length; i++) {
    var letters = word.split('');
    var syllable = '';
    if(vowels.includes(letters[i])){
      if(word.length <= i + 1) continue;
      if(vowels.includes(letters[i + 1])) {
        syllable = word.substring(0, i + 1);
        word = word.substring(syllable.length, word.length);
        syllables.push(syllable);
        i = -1;
      } else {
        if(word.length <= i + 2) continue;
        if(vowels.includes(letters[i + 2])) {
          syllable = word.substring(0, i + 1);
          word = word.substring(syllable.length, word.length);
          syllables.push(syllable);
          i = -1;
        } else {
          if(word.length <= i + 3) continue;
          if(vowels.includes(letters[i + 3])) {
            syllable = word.substring(0, i + 2);
            word = word.substring(syllable.length, word.length);
            syllables.push(syllable);
            i = -1;
          } else {
            if(word.length <= i + 3) continue;
            var consonant = word.substring(i + 1, i + 4);
            if(consonants.includes(consonant)) {
              syllable = word.substring(0, i + 2);
              word = word.substring(syllable.length, word.length);
              syllables.push(syllable);
              i = -1;
            } else {
              syllable = word;
              word = word.substring(syllable.length, word.length);
              syllables.push(syllable);
              i = -1;
            }
          }
        }
      }
    }
  }
  
  if(word.length > 0){
    syllables.push(word);
  }
  
  var str = "";
  for(var i = 0; i < syllables.length; i++) {
    if(i > 0) {
      str += "-";
    }
    str += syllables[i];
  }
  p.innerHTML = str;
});