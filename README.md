# Project Setup and Running Instructions

## Running the Applications

This project consists of three applications: **App1**, **App2**, and **Shell App**. Follow the steps below to set up and run the applications.

---

### App1 Setup

1. **Install dependencies**:
    ```bash
    npm install
    ```

2. **Start App1**:
    ```bash
    npm run start
    ```

---

### App2 Setup

1. **Install dependencies**:
    ```bash
    npm install
    ```

2. **Start App2**:
    ```bash
    npm run start
    ```

---

### Shell App Setup

1. **Build the shell app**:
    ```bash
    npm run build
    ```

2. **Start the shell app**:
    ```bash
    npm run start
    ```

## Application Screeshots
   
![Screenshot 2025-05-19 at 1 02 06 PM](https://github.com/user-attachments/assets/a81d0107-cb8c-4b80-845a-fa1e800cb4ce)


![Screenshot 2025-05-19 at 1 06 43 PM](https://github.com/user-attachments/assets/a9171508-5e47-45cf-baec-1d891e139d0f)


---

## Additional Details

After setting up and running the apps, here’s an overview of the structure and concepts used within the project.

---

### App1

**App1** demonstrates the concept of **virtualization** and includes **React Profiler** to compare the performance of a virtualized list versus a non-virtualized list. 

- **Virtualization** optimizes performance by rendering only the items visible in the viewport, which is especially useful for large lists. In this project, we use the **`react-window`** library for virtualization, which renders only the elements that are in view rather than rendering the entire list. This significantly reduces the number of DOM nodes and improves the overall performance.

- **React Profiler** is used to measure the performance of the virtualized list and compare it with the non-virtualized list. This allows us to visualize how much time is spent rendering components, giving us insights into the performance improvements gained from virtualization.

- **Lazy loading** is used to load the Virtualized and NonVirtualizeList lists only when needed, improving initial load performance and keeping the bundle size small.

---

### React-Focused Exercises in App1

#### 3.1 **Custom Hooks & `useMemo`/`useCallback`**

In **App1**, we've implemented a custom hook, `useFetchWithCache(url)`, that leverages **`useMemo`** and **`useCallback`** to manage fetching data with caching and performance optimizations.

##### Task:
- Build a custom hook `useFetchWithCache(url)` that:
  - **Caches fetched results** in memory.
  - **Avoids re-fetching** the same data if the same URL is passed again.
  - Uses **`useMemo`** and **`useCallback`** to avoid unnecessary re-renders.

##### Focus:
- **Hook Composition**: The custom hook is built to encapsulate the fetching logic and cache handling in a reusable way.
- **Memoization**: Using **`useMemo`** and **`useCallback`** ensures that the hook doesn’t trigger unnecessary fetches or re-renders, optimizing the app's performance.
- **Cache Handling**: The hook stores fetched results in memory to ensure the same request isn't repeated, which is particularly useful for scenarios where the same data might be requested multiple times.

##### How It Works:
1. **`useMemo`** is used to memoize the cached data, so it isn't recalculated unless the URL changes.
2. **`useCallback`** ensures that the fetch function is not recreated on every render, improving performance by maintaining the same function reference.

This approach improves performance by reducing redundant network requests and minimizing re-renders, particularly when the same data is requested multiple times.

##### Benefits:
- **Efficiency**: Fetching data only once for the same URL reduces network traffic and improves app responsiveness.
- **Performance Tuning**: The use of **`useMemo`** and **`useCallback`** ensures that unnecessary re-renders are avoided, which is especially important in larger applications.

---

### App2

**App2** is an additional app that you can run to test various features or interact with App1 and Shell App.

---

### Shell App

**The Shell App** is set up for **Server-Side Rendering (SSR)** using dynamic imports for optimized loading. This approach allows us to load only the necessary components on demand, reducing the initial page load time.

---

### Utilities in Shell App

In the **`utils`** folder under the **Shell App**, you’ll find several key files and coding exercises:

1. **Coding Exercises**:
   - **`createScheduler`**: This file contains exercises for working with data transformations or UI behavior.
   - **`composedFn`**: This file includes coding exercises focused on functional programming techniques, particularly composing multiple functions.
   
2. **Types**:
   - In the **`types`** file under **`utils`**, you will find the **`requiredKeys`** type, which is used to define the necessary keys required for certain objects or structures in your application.

These utilities enhance code reusability and support efficient development practices.

---

### Bundle Optimization
 - We configured Webpack to split large bundles into smaller, manageable chunks. This helps ensure that only the required code is loaded for a specific view or component.
 - Common dependencies are extracted into shared chunks to avoid duplication across bundles.

### Notes
- Ensure you run the commands in the respective directories for each application.
- If you encounter any issues during the setup, check the logs for potential errors or missing dependencies.

### Technical Debt

- Helm and CI integration has not been implemented yet due to time constraints.
Given additional time, Helm chart configurations and CI pipeline setup could be added for deploying and automation.

---

Happy coding! 🚀
