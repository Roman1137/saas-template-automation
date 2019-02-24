import {IAllure} from "./allureTypes/IAllure";
import {Severity} from "./allureTypes/severity";

declare const allure: IAllure;

export class ReporterLogger {
    /**
     * Define step function.Result of each call of this function will be recorded into report.
     */
    public static createStep(stepName: string, stepFn: () => void): any {
        return allure.createStep(stepName, stepFn);
    }

    /**
     * Save attachment to test. If you're calling this inside step function or during its execution (e.g. asynchronously via promises), attachment will be saved to step function.
     *
     * @param name attachment name.Note that it is not then name of the file, actual filename will be generated.
     * @param content attachment content.If you pass Buffer or String, it will be saved to file immediately.If you are passing Function, you will get decorated function and you can call it several times to trigger attachment.General purpose of the second case is an ability to create utility function to take screenshot.You can define function for you test framework only once and then call it each time you need a screenshot.
     * @param type attachment MIME - type.If you omit this argument we'll try to detect type automatically via file-type library
     */
    public static createAttachment(name: string, content: Buffer | String | Function, type?: string): any {
        return allure.createAttachment(name, content, type);
    }

    /**
     * set detailed test description, if test name is not enough.
     */
    public static description(description: string): any {
        return allure.description(description);
    }

    /**
     * set test severity, one of: blocker, critical, normal, minor, trivial.You can also use constants like allure.SEVERITY.BLOKER.
     */
    public static severity(severity: Severity): any {
        return allure.severity(severity);
    }

    /**
     * assign epic to test
     */
    public static epic(epicName: string): any {
        return allure.epic(epicName);
    }

    /**
     * assign feature to test
     */
    public static feature(featureName: string): any {
        return allure.feature(featureName);
    }

    /**
     * assign user story to test.See documentation for details
     */
    public static story(storyName: string): any {
        return allure.story(storyName);
    }

    /**
     * provide parameters, which had been used in test.Unlike other languages, javascript test methods usually doesn't have special arguments (only callbacks), so developers use other way to populate parameters to test. This method is to provide them to Allure
     */
    public static addArgument(argName: string, argValue: string): any {
        return allure.addArgument(argName, argValue);
    }

    /**
     * save environment value.It is similar to addArgument method, but it is designed to store more verbose data, like HTTP - links to test page or used package version.
     */
    public static addEnvironment(envName: string, envValue: string): any {
        return allure.addEnvironment(envName, envValue);
    }

    /**
     * assign any label to test
     */
    public static addLabel(labelName: string, labelValue: string): any {
        return allure.addLabel(labelName, labelValue);
    }
}
