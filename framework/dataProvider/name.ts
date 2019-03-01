import {String} from "../helperTypes";
import {RandomDataGenerator} from "./randomDataGenerator";

export class Name {

    public static LengthMax(): number {
        return 1024;
    }

    public static LengthMin(): number {
        return 3;
    }

    public static Empty(): string {
        return String.Empty;
    }

    public static Valid(): string {
        return RandomDataGenerator.getRandomName(this.nameLengthDefault);
    }

    public static StartingFromSpace(): string {
        return " " + RandomDataGenerator.getRandomName(this.nameLengthDefault);
    }

    public static WithLengthOf(length: number): string {
        return RandomDataGenerator.getRandomName(length);
    }

    public static ContainingNumers(): string {
        const containNumbers = true;
        return RandomDataGenerator.getRandomName(this.nameLengthDefault, containNumbers);
    }

    private static nameLengthDefault: number = 10;
}
