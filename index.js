function scoreWord(string) {
    let word = string.toLowerCase();
    const scores = { a:1, b:3, c:3, d:2, e:1, f:4, g:2, 
        h:4, i:1, j:8, k:5, l:1, m:3, n:1, 
        o:1, p:3, q:10, r:1, s:1, t:1, u:1, 
        v:4, w:4, x:8, y:4, z:10 };

        let multiplier = 1;

        if(word.substring(word.length - 1) === '2') {
            multiplier = 2;
            word = word.substring(0, word.length - 1);
        } else if(word.substring(word.length - 1) === '3') {
            multiplier = 3;
            word = word.substring(0, word.length - 1);
        }
    
        let bonus = word.split('').filter(char => {
            return !['*', '^'].includes(char);
        }).length >= 7 ? 50 : 0;
    
        return word.split('').reduce((score, letter, index, letters) => {
            const next = index + 1 < letters.length ? letters[index + 1] : null;
            if('abcdefghijklmnopqrstuvwxyz'.includes(letter)) {
                if(next && ['*', '^'].includes(next)) {
                    if(next === '^') {
                        return score += 0;
                    }
                    if(next === '*') {
                        if(index + 2 < letters.length && letters[index + 2] === '*') {
                            score += (scores[letter] * 3);
                        } else {
                            score += (scores[letter] * 2);
                        }
                        return score;
                    }
                }
                return score += scores[letter];
            } else {
                return score;
            }
        }, 0) * multiplier + bonus;
    }
