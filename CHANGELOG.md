## Change Log

### v1.1.5(Jul 17, 2025)
- Authenticate user with optional language parameter
  - `authenticate(userId, accessToken, language, callback)`
- Update customer's language setting after authentication
  - `setCustomerLanguage(language, callback)`
- Language format: IETF BCP 47 standard ("en", "ko", "ja")
- Fixed to include botKey and groupKey if they are strings

### v1.1.4(Aug 1, 2024)

- Added CommonJS build support
