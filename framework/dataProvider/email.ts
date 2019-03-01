import {String} from "../helperTypes";
import {RandomDataGenerator} from "./randomDataGenerator";

export class Email {

    public static LengthMax(): number {
        return 1024;
    }

    public static LengthMin(): number {
        return 10;
    }

    public static Valid(): string {
        return RandomDataGenerator.getRandomEmail(this.lengthDefault);
    }

    public static Empty(): string {
        return String.Empty;
    }

    public static StartingFromSpace(): string {
        return " " + RandomDataGenerator.getRandomEmail(this.lengthDefault);
    }

    public static WithLengthOf(length: number): string {
        return RandomDataGenerator.getRandomEmail(length);
    }

    public static ContainingSpace(): string {
        const containSpaces = true;
        return RandomDataGenerator.getRandomEmail(this.lengthDefault, undefined, containSpaces);
    }

    public static WithoutName(): string {
        return RandomDataGenerator.DotSign +
            RandomDataGenerator.EmailDomain +
            RandomDataGenerator.PointSign +
            RandomDataGenerator.CountryCode;
    }

    public static WithoutDotSign(): string {
        return RandomDataGenerator.getRandomName(this.lengthDefault) +
            RandomDataGenerator.EmailDomain +
            RandomDataGenerator.PointSign +
            RandomDataGenerator.CountryCode;
    }

    public static WithoutEmailDomain(): string {
        return RandomDataGenerator.getRandomName(this.lengthDefault) +
            RandomDataGenerator.DotSign +
            RandomDataGenerator.PointSign +
            RandomDataGenerator.CountryCode;
    }

    public static WithoutPointSign(): string {
        return RandomDataGenerator.getRandomName(this.lengthDefault) +
            RandomDataGenerator.DotSign +
            RandomDataGenerator.EmailDomain +
            RandomDataGenerator.CountryCode;
    }

    public static WithoutCountryCode(): string {
        return RandomDataGenerator.getRandomName(this.lengthDefault) +
            RandomDataGenerator.DotSign +
            RandomDataGenerator.EmailDomain +
            RandomDataGenerator.PointSign;
    }

    private static lengthDefault: number = 10;
}