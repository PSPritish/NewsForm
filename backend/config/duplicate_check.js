const stringSimilarity = require("string-similarity");

async function isDuplicate(newsEntry, existingNews) {
    // Ensure all existing descriptions are non-null
    const descriptions = existingNews
        .map(item => item.description)
        .filter(desc => typeof desc === "string" && desc.trim().length > 0);

    // If there are no valid descriptions, return false (not a duplicate)
    if (descriptions.length === 0) return false;

    const matches = stringSimilarity.findBestMatch(newsEntry.description, descriptions);
    return matches.bestMatch.rating > 0.8; // If similarity > 80%, reject
}

module.exports = isDuplicate;

