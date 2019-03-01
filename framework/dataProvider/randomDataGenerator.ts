export class RandomDataGenerator {

    public static DotSign = "@";
    public static EmailDomain = "gmail";
    public static PointSign = ".";
    public static CountryCode = "com";

    public static getRandomName(length: number, containNumbers = false, containSpace = false): string {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (containNumbers) {
            possible += "1234567890";
        }
        if (containSpace) {
            possible += " ";
        }

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    public static getRandomEmail(length: number, containNumbers = false, containSpace = false): string {
        return RandomDataGenerator.getRandomName(length, containNumbers, containSpace) +
            `${RandomDataGenerator.DotSign + RandomDataGenerator.EmailDomain + RandomDataGenerator.PointSign + RandomDataGenerator.CountryCode}`;
    }
}