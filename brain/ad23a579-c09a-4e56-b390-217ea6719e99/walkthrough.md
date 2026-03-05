# Risk Detection Logic Rewrite

I have completely rewritten the risk detection engine to be more aggressive and comprehensive, addressing the user's request to catch high-risk content that was previously missed.

## Major Improvements
-   **Aggressive Risk Scoring**: High-risk clauses now trigger a "High" risk level immediately, regardless of the rest of the text.
-   **Expanded Clause Detection**: Added detection for:
    -   **Unilateral Modification**: "Modify terms at any time"
    -   **Liability Caps**: "Not liable for damages"
    -   **Indemnification**: "You agree to indemnify us"
    -   **Jury Waivers**: "Waive right to trial by jury"
    -   **Content Rights**: "Perpetual license to your content"
    -   **Moral Rights Waivers**: "Waive moral rights"
    -   **Broad Third-Party Sharing**: "Share with marketing partners"
    -   **Auto-Renewal**: "Subscription automatically renews" (Moderate Risk)
    -   **Biometrics**: "Collect biometric data"

## Verification Results

The expanded test suite (`reproduce_issue_v2.ts`) confirms the new logic works correctly.

| Clause Category | Test Text | New Score | Risk Level |
| :--- | :--- | :--- | :--- |
| **Data Sale** | "We sell your data to third parties." | **8** | **High** |
| **Arbitration** | "You agree to mandatory arbitration." | **8** | **High** |
| **Jury Waiver** | "You waive your right to a trial by jury." | **8** | **High** |
| **PII (SSN)** | "We collect your social security number." | **8** | **High** |
| **Unilateral Change** | "We reserve the right to modify these terms..." | **8** | **High** |
| **Content Rights** | "We obtain rights to all your content forever." | **8** | **High** |
| **Indemnification** | "You agree to indemnify us for everything." | **8** | **High** |
| **Liability Cap** | "We are not liable for any damages..." | **8** | **High** |
| **Sharing** | "We share your info with our marketing partners." | **8** | **High** |
| **Biometrics** | "We collect your biometric data for security." | **8** | **High** |
| **Moral Rights** | "You waive all moral rights to your content." | **8** | **High** |
| **Auto-Renewal** | "This subscription automatically renews..." | **5** | **Moderate** |

## How to Test
1.  Go to **[http://localhost:5173/](http://localhost:5173/)**.
2.  Paste any of the above phrases.
3.  Verify the "High Risk" badge appears.
