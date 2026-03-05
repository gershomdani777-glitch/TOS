const arbitrationRegex = /(arbitration|class action|jury trial|trial by jury|dispute resolution).{0,150}(waive|binding|mandatory|renounce|give up)|(waive|binding|mandatory|renounce|give up).{0,50}(arbitration|class action|jury trial|trial by jury|dispute resolution)/i;
const ipGrabRegex = /(perpetual|irrevocable|worldwide).{0,100}(license|rights? (to|in)|ownership)|(license|rights? (to|in)|ownership).{0,100}(content|media|submission).{0,100}(forever|perpetual)|(obtain|grant).{0,50}(rights? (to|in)|ownership).{0,50}(content|media).{0,50}(forever|perpetual)/i;

const juryText = "You waive your right to a trial by jury.";
const contentText = "We obtain rights to all your content forever.";

console.log("Testing Jury Waiver:");
console.log(`Text: "${juryText}"`);
const juryMatch = arbitrationRegex.exec(juryText);
console.log("Match:", juryMatch ? "YES" : "NO");
if (juryMatch) console.log(juryMatch);

console.log("\nTesting Content Rights:");
console.log(`Text: "${contentText}"`);
const contentMatch = ipGrabRegex.exec(contentText);
console.log("Match:", contentMatch ? "YES" : "NO");
if (contentMatch) console.log(contentMatch);
