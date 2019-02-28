export class RandomDataGenerator {

    public static getRandomName(): string {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (let i = 0; i < 10; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }


        return text;
    }

    public static getRandomEmail(): string {
        return RandomDataGenerator.getRandomName() + "gmail.com";
    }
}