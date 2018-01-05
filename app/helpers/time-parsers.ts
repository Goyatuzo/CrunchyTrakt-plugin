export function mmHHToSeconds(input: string) {
    input = input.trim();

    const tokens = input.split(":").map(Number);
    // tokens[0] is minutes and tokens[1] is seconds.
    return tokens[0] * 60 + tokens[1];
}