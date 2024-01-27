// assetNameGenerator.ts

//
//   You are a helpful assistant who generates comma separated lists.
//   A user will pass in a category, and you should generate 5 objects in that category in a comma separated list.
//   ONLY return a comma separated list, and nothing more.
//
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

let systemPrompt = `You are a world class detection engineer who generates honeytoken and honeypot
                    asset names. A user will pass in a category of SERVICE, USERNAME, DEPARTMENT, SERVERNAME,
                    FILENAME, DATAENTRY and you should generate 5 or more fake examples in that
                    category in a comma separated list. ONLY return a comma array, and nothing more.

# Examples included below:

    services: [
        "PaymentProcessingAPI",
        "UserAuthenticationService",
        "InternalDataWarehouse",
        "CustomerRelationshipManagement",
        "SecureFileTransferService",
        "EmployeeDirectoryAPI",
        "FinancialReportingService",
        "CloudStorageManagement",
        "NetworkMonitoringSystem",
        "BackupAndRecoveryService"
    ],
    usernames: [
        "admin",
        "sysadmin",
        "root",
        "backup_admin",
        "dbadmin",
        "audit_user",
        "superuser",
        "test_user",
        "guest_account",
        "service_account"
    ],
    serverNames: [
        "DB-SERVER-01",
        "AUTH-SERVER-PROD",
        "FILE-STORAGE-02",
        "API-GATEWAY-DEV",
        "LOG-SERVER-03",
        "MAIL-SERVER-INT",
        "BACKUP-SERVER-01",
        "WEB-SERVER-PROD",
        "DATA-WAREHOUSE-04",
        "VPN-ENDPOINT-02"
    ],
    fileNames: [
        "employee_salaries_2024.xlsx",
        "customer_credit_cards.pdf",
        "company_merger_details.docx",
        "api_keys_backup.txt",
        "network_configuration.conf",
        "passwords_archive.zip",
        "financial_forecast_q4.pptx",
        "private_keys.pem",
        "project_plans_2024.mpp",
        "audit_logs_september.csv"
    ],
    dataEntries: [
        "CreditCardNumber: 4532-8723-0067-4421",
        "SSN: 123-45-6789",
        "APIKey: ak_2398ujsndfASDKJN23498u",
        "Password: P@ssw0rd!2024",
        "AuthToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "EncryptionKey: MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A...",
        "BankAccount: 0987654321",
        "LicenseKey: 4C9B1-NTV8Y-DKXKD-4GDFX-6DD28",
        "ConnectionString: Server=db-server-01;Database=ProdDB;User Id=dbadmin;Password=DbP@ss2024;",
        "PrivateKey: -----BEGIN PRIVATE KEY----- MIIEvAIBADANBg..."
    ]

`

const prompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    ["user", "{input}"],
]);

const outputParser = new StringOutputParser();

const chatModel = new ChatOpenAI({});

const chain = prompt.pipe(chatModel).pipe(outputParser);

const llmResponse = await chain.invoke({
  input: "FILENAME",
});

console.log(llmResponse);

