/**
 * Compute cosine similarity between two numeric vectors.
 * @param a First vector (must be same length as `b`).
 * @param b Second vector (must be same length as `a`).
 * @returns Similarity score in the range \([-1, 1]\) (higher means more similar).
 */
export function cosineSimilarity(a: number[], b: number[]) {
    const initialValue = 0;

    // multiply matching positions and total (e.g., (a1 + b1) + (a2 +b2) + ..)
    // calculate how aligned the vectors are
    const dot = a.reduce((accumulator, currentVal, i) => accumulator + currentVal * b[i], initialValue);

    // calculate magnitude of vector A
    const magA = Math.sqrt(a.reduce((accumulator, currentVal) => accumulator + currentVal * currentVal, initialValue));

    // calculate the magnitude of vector B
    const magB = Math.sqrt(b.reduce((accumulator, currentVal) => accumulator + currentVal * currentVal, initialValue));

    // normalise result
    // higher score (closer to 1) means the vectors are more similar
    // lower score (close to 0) means the vectors are less similar
    return dot / (magA * magB);
}
