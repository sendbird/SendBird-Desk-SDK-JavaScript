## Change Log

### v1.2.0(Jun 24, 2026)
- Support custom API host with `ApiHostType`
- Upgrade handlebars to 4.7.9 to address CVE-2026-33941

### v1.1.5(Jul 17, 2025)
- Authenticate user with optional language parameter
  - `authenticate(userId, accessToken, language, callback)`
- Update customer's language setting after authentication
  - `setCustomerLanguage(language, callback)`
- Language format: IETF BCP 47 standard ("en", "ko", "ja")
- Fixed to include botKey and groupKey if they are strings

### v1.1.4(Aug 1, 2024)

- Added CommonJS build support
