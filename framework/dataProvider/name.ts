import {String} from "../helperTypes";
import {RandomDataGenerator} from "./randomDataGenerator";

export class Name {

    public static Empty(): string {
        return String.Empty;
    }

    public static StartingWithSpace(): string {
        return " " + RandomDataGenerator.getRandomName(this.nameLengthDefault);
    }

    public static WithLengthOf(length: number): string {
        return RandomDataGenerator.getRandomName(length);
    }

    public static ContainingSpace(): string {
        const containSpaces = true;
        return RandomDataGenerator.getRandomName(this.nameLengthDefault, undefined, containSpaces);
    }

    public static ContainingNumers(): string {
        const containNumbers = true;
        return RandomDataGenerator.getRandomName(this.nameLengthDefault, containNumbers);
    }

    private static nameLengthDefault: number = 10;
}
