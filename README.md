# Platform360 User Vue Plugin

## Overview

This Vue plugin facilitates streamlined access to user data via `$jwtUser` and `$user` global variables, fetches user data once and clears the user cache upon logout.

## Getting Started

### Prerequisites

- Install [Node.js 16.x](https://nodejs.org/dist/latest-v16.x/)
- Install [Yarn](https://yarnpkg.com/) if you haven't already.
  - Enable `yarn` with `corepack enable` if you're using Node.js 16.10 or later.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kocdigital/p360-user-vue-plugin.git
   cd p360-user-vue-plugin
   ```

2. Install the dependencies:

   ```bash
   yarn install
   ```

### Building the Plugin

To build the plugin, you can use the following commands:

- **One-time build:**

   ```bash
   yarn build
   ```

- **Continuous build:**

  ```bash
  yarn dev
  ```

The `yarn build` command will create a production-ready build of the plugin, while `yarn dev` will run the build in watch mode, rebuilding automatically on changes.

### Linking with Yarn

To link this vue plugin with your main application using Yarn, follow these steps:

1. In the root directory of the plugin, run:

   ```bash
   yarn link
   ```

2. Navigate to your main application directory:

   ```bash
   cd path/to/your/main/application
   ```

3. Link the plugin to your main application:

   ```bash
   yarn link "@kocdigital/p360-user-vue-plugin"
   ```

4. Now you can import and use the vue plugin in your main application as needed.

### Usage

After linking, you can import the plugin in your Vue application as follows:

   ```typescript
   import Vue from 'vue';
   import user from '@kocdigital/p360-user-vue-plugin';
 
   Vue.use(user);
   ```

Access user models to customize user or jwt user data:

   ```typescript
   import Vue from 'vue';
   import user from '@kocdigital/p360-user-vue-plugin';
   import {User} from '@kocdigital/p360-user-vue-plugin/models';
 
   export class MyCustomUser extends User {
     // Your customizations here
   }
 
   Vue.use(user, {
     CustomUser: MyCustomUser
   });
   ```

   ```typescript
   import Vue from 'vue';
   import user from '@kocdigital/p360-user-vue-plugin';
   import {JwtUser} from '@kocdigital/p360-user-vue-plugin/models';
 
   export class MyCustomJwtUser extends JwtUser {
     // Your customizations here
   }
 
   Vue.use(user, {
     CustomJwtUser: MyCustomJwtUser
   });
   ```

Customize the user fetching logic by providing your own `fetchUserById` function:

   ```typescript
   import Vue from 'vue';
   import user from '@kocdigital/p360-user-vue-plugin';
 
   import type {IUser} from '@kocdigital/p360-user-vue-plugin/models';
 
   Vue.use(user, {
     fetchUserById: async (userId): Promise<IUser> => {
       // Your custom fetch logic here
       const response = await fetch(`/api/users/${userId}`);
       const data: IUser = await response.json();
 
       return data; // Must return `IUser`, otherwise throw type error
     }
   });
   ```

Customize user cache target by providing storage options:

```typescript
   import Vue from 'vue';
   import user from '@kocdigital/p360-user-vue-plugin';
 
   Vue.use(user, {
     storage: sessionStorage, // default is `localStorage`
     storageKey: 'my-custom-user-cache' // default is "x-user"
   });
```

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.
