# Platform360 User Vue Plugin

## Overview

This Vue plugin facilitates streamlined access to user data via `$jwtUser` and `$user` global variables, fetches user data once and clears the user cache upon logout.

### Installation

```bash
npm install @kocdigital/p360-user-vue-plugin
```

```bash
yarn add @kocdigital/p360-user-vue-plugin
```

or

```bash
yarn add git+https://github.com/kocdigital/p360-user-vue-plugin.git
```

```bash
npm install git+https://github.com/kocdigital/p360-user-vue-plugin.git
```

### Usage

After installation, you can import the plugin in your Vue application as follows:

   ```typescript
   import Vue from 'vue';
   import user from '@kocdigital/p360-user-vue-plugin';
 
   Vue.use(user);
   ```

Access user models to customize user or jwt user data:

   ```typescript
   import Vue from 'vue';
   import user from '@kocdigital/p360-user-vue-plugin';
   import {User as DefaultUser} from '@kocdigital/p360-user-vue-plugin/models';
 
   export class MyCustomUser extends DefaultUser {
     // Your customizations here
   }
 
   Vue.use(user, {
     CustomUser: MyCustomUser
   });
   ```

   ```typescript
   import Vue from 'vue';
   import user from '@kocdigital/p360-user-vue-plugin';
   import {JwtUser as DefaultJwtUser} from '@kocdigital/p360-user-vue-plugin/models';
 
   export class MyCustomJwtUser extends DefaultJwtUser {
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

### Prerequisites

- Install [Node.js 18.x](https://nodejs.org/dist/latest-v18.x/)
- Install [npm](https://www.npmjs.com/) (included with Node.js).

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/kocdigital/p360-user-vue-plugin.git
   cd p360-user-vue-plugin
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Building the Plugin

To build the plugin, you can use the following commands:

- **One-time build:**

   ```bash
   npm run build
   ```

- **Continuous build:**

  ```bash
  npm run dev
  ```

The `npm run build` command will create a production-ready build of the plugin, while `npm run dev` will run the build in watch mode, rebuilding automatically on changes.

### Linking with npm

To link this vue plugin with your main application using npm, follow these steps:

1. In the root directory of the plugin, run:

   ```bash
   npm link
   ```

2. Navigate to your main application directory:

   ```bash
   cd path/to/your/main/application
   ```

3. Link the plugin to your main application:

   ```bash
   npm link "@kocdigital/p360-user-vue-plugin"
   ```

4. Now you can develop features or fix bugs in the plugin and see the changes reflected in your main application without needing to publish the plugin to npm.
