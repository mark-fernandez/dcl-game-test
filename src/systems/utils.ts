/**
 * This function takes an array of any type as an argument and returns an array of the same type. 
 * The purpose is to shuffle the elements in the array, meaning that it will randomly rearrange the order of the elements in the array.
 * Then it returns the shuffled array.
 * @param {Array} a items An array containing the items.
 * @returns {Array} The shuffled array.
 */
export function shuffle<T>(array: T[]): T[] {
    // currentIndex is the last element in the array.
    let currentIndex = array.length
    // randomIndex will be a random number between 0 and currentIndex.
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 1) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex); // Value between 0 and currentIndex
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
};