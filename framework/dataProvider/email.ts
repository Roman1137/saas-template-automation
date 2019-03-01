import {String} from "../helperTypes";
import {RandomDataGenerator} from "./randomDataGenerator";

export class Email {

    public static Empty(): string {
        return String.Empty;
    }

    public static StartingWithSpace(): string {
        return " " + RandomDataGenerator.getRandomEmail(this.nameLengthDefault);
    }

    public static WithLengthOf(length: number): string {
        return RandomDataGenerator.getRandomEmail(length);
    }

    public static ContainingSpace(): string {
        const containSpaces = true;
        return RandomDataGenerator.getRandomEmail(this.nameLengthDefault, undefined, containSpaces);
    }

    public static WithoutName(): string {
        return RandomDataGenerator.DotSign +
            RandomDataGenerator.EmailDomain +
            RandomDataGenerator.PointSign +
            RandomDataGenerator.CountryCode;
    }

    public static WithoutDotSign(): string {
        return RandomDataGenerator.getRandomName(this.nameLengthDefault) +
            RandomDataGenerator.EmailDomain +
            RandomDataGenerator.PointSign +
            RandomDataGenerator.CountryCode;
    }

    public static WithoutEmailDomain(): string {
        return RandomDataGenerator.getRandomName(this.nameLengthDefault) +
            RandomDataGenerator.DotSign +
            RandomDataGenerator.PointSign +
            RandomDataGenerator.CountryCode;
    }

    public static WithoutPointSign(): string {
        return RandomDataGenerator.getRandomName(this.nameLengthDefault) +
            RandomDataGenerator.DotSign +
            RandomDataGenerator.EmailDomain +
            RandomDataGenerator.CountryCode;
    }

    public static WithoutCountryCode(): string {
        return RandomDataGenerator.getRandomName(this.nameLengthDefault) +
            RandomDataGenerator.DotSign +
            RandomDataGenerator.EmailDomain +
            RandomDataGenerator.PointSign;
    }

    private static nameLengthDefault: number = 10;
}