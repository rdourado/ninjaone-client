# Device Manager Web Application

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)

## Introduction

Device Manager Web Application is a client web application built using React that allows users to manage a list of devices. The application provides CRUD (Create, Read, Update and Delete) operations, sorting, and filtering functionality for the list of devices.

## Features

- Create, read, update, and delete devices from the list.
- Sort devices based on system name and HDD capacity.
- Apply filters to the device list for more organized viewing.

## Technologies Used

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/) (Build Tool)
- [Wouter](https://github.com/molefrog/wouter) (For navigation)
- [Zustand](https://github.com/pmndrs/zustand) (State Management)
- [Mantine](https://mantine.dev/) (UI Components)
- [FontAwesome](https://fontawesome.com/) (Icon Library)

## Getting Started

Follow these steps to get Device Manager Web Application up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en) (v18 or higher)

### Installation

1. Install the [Backend](https://github.com/NinjaRMM/devicesTask_serverApp).

2. Clone the repository:

   ```sh
   git clone https://github.com/rdourado/ninjaone-client.git
   ```

3. Navigate to the project directory:

   ```sh
   cd ninjaone-client
   ```

4. Install dependencies:

   ```sh
   npm install
   ```

## Usage

1. Make sure the [Backend](https://github.com/NinjaRMM/devicesTask_serverApp) is running on [http://localhost:3000](http://localhost:3000).

2. Start the development server:

   ```sh
   npm run dev
   ```

3. The default browser will open automatically in the local url.

## Folder Structure

Every component follows the same folder structure, with `index.tsx` being the only required file. Components can be nested while maintaining this structure.

```
└── ComponentName/
    ├── index.tsx
    ├── ComponentName.types.ts
    ├── ComponentName.utils.ts
    ├── ComponentName.[…].ts
    ├── __assets__/
    │   └── […]
    └── __tests__/
        ├── ComponentName.utils.test.ts
        └── […]
```

- `.utils.ts` files essentially contain pure functions, each of which is accompanied by its own set of unit tests.
- Types are mainly kept close to their usage, but they can be moved to a `.types.ts` file when there's a need for sharing them.
