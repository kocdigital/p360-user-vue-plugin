# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.2] - 2026-08-05

### Added

- Compatibility bridge files at package root (`models.js`, `models.cjs`, `models.d.ts`) to support `/models` subpath imports in legacy resolver setups.

### Changed

- `IUser` and `User` models now support generic property typing (`P extends IUserProperties`) for stronger type safety with custom user schemas.
- Plugin option types were consolidated under `src/types/config.ts` and re-exported from the main entrypoint.
- Promise shim declaration was moved from `src/types/shims-polyfills.d.ts` to `src/shims-polyfills.d.ts`.
- CI workflow dependencies were updated to `v7` (GitHub Actions `actions/checkout` and `actions/setup-node`).

### Fixed

- `/models` import resolution and typings were corrected for consumers using older TypeScript/Webpack module resolution behavior.

## [0.0.1] - 2025-12-08

### Added

- Initial Vue 2 user plugin with global `$jwtUser`, `$user`, and `$userLoaded` bindings.
- Default user bootstrap flow using `@kocdigital/sf-interface` token data and Identity Server user fetch.
- Configurable plugin options for `CustomUser`, `CustomJwtUser`, `fetchUserById`, `storage`, and `storageKey`.
- Published typed subpath exports for models (`@kocdigital/p360-user-vue-plugin/models`) and type declarations.

[unreleased]: https://github.com/kocdigital/p360-user-vue-plugin/compare/v0.0.2...HEAD
[0.0.2]: https://github.com/kocdigital/p360-user-vue-plugin/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/kocdigital/p360-user-vue-plugin/releases/tag/v0.0.1
[SemVer]: https://semver.org
[@asimtahir-karakus-kd]: https://github.com/asimtahir-karakus-kd