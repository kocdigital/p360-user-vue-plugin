# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.1] - 2025-12-08

### Added

- Initial Vue 2 user plugin with global `$jwtUser`, `$user`, and `$userLoaded` bindings.
- Default user bootstrap flow using `@kocdigital/sf-interface` token data and Identity Server user fetch.
- Configurable plugin options for `CustomUser`, `CustomJwtUser`, `fetchUserById`, `storage`, and `storageKey`.
- Published typed subpath exports for models (`@kocdigital/p360-user-vue-plugin/models`) and type declarations.

[unreleased]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/olivierlacan/keep-a-changelog/releases/tag/v0.0.1
[SemVer]: https://semver.org
[@asimtahir-karakus-kd]: https://github.com/asimtahir-karakus-kd