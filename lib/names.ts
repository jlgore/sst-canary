// assetNameGenerator.ts
type Dictionary = string[];
type DictionaryName = "services" | "usernames" | "deviceNames" | "fileNames" | "dataEntries";

// Define dictionaries
const dictionaries: Record<DictionaryName, Dictionary> = {
    services: ["SecureFTP", "AdminDB", "BackupServer", "VIPAccess"],
    usernames: ["admin", "root", "sysadmin", "director"],
    deviceNames: ["HR-Server", "Finance-DB", "Exec-Workstation", "Dev-Laptop"],
    fileNames: ["Confidential_SalaryInfo2024.xlsx", "MergerDetails_Draft.pdf"],
    dataEntries: ["TransferCompleted", "VIPClientMessage"],
};

// Function to select a random item from a dictionary
const selectRandom = (dictionary: Dictionary): string => {
    const index = Math.floor(Math.random() * dictionary.length);
    return dictionary[index];
};

// Function to generate a unique asset name based on passed dictionary names
export const generateAssetName = (selectedDictNames: DictionaryName[]): string => {
    const selectedParts: string[] = selectedDictNames.map(dictName => {
        const dictionary = dictionaries[dictName];
        return selectRandom(dictionary);
    });

    return selectedParts.join("-");
};

// Example usage:
console.log(generateAssetName(["services", "usernames", "deviceNames"]));
console.log(generateAssetName(["fileNames", "dataEntries"]));
