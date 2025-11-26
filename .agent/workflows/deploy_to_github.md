---
description: How to deploy the L'Ultima Torcia system to GitHub
---

Follow these steps to deploy your system to GitHub:

1.  **Create a Repository on GitHub**:
    *   Go to [GitHub.com](https://github.com/new).
    *   Name the repository `ultima-torcia`.
    *   Make it **Public**.
    *   Do **not** initialize with README, .gitignore, or License (we already created them).
    *   Click "Create repository".

2.  **Initialize Git locally**:
    Open a terminal in `c:\Progetti\UltimaTorcia` and run:
    ```powershell
    git init
    git add .
    git commit -m "Initial commit: L'Ultima Torcia system v1.0.0"
    ```

3.  **Link to GitHub**:
    Replace `USERNAME` with your GitHub username in the command below:
    ```powershell
    git branch -M main
    git remote add origin https://github.com/USERNAME/ultima-torcia.git
    git push -u origin main
    ```

4.  **Update Manifest URLs**:
    *   Edit `system.json`.
    *   Replace `USERNAME` in the `url`, `manifest`, and `download` fields with your actual GitHub username.
    *   Commit and push the change:
        ```powershell
        git add system.json
        git commit -m "Update manifest URLs"
        git push
        ```

5.  **Create a Release (Optional but Recommended)**:
    *   Go to your repository on GitHub.
    *   Click "Releases" -> "Draft a new release".
    *   Tag version: `v1.0.0`.
    *   Title: `v1.0.0`.
    *   Click "Publish release".
    *   *Note: For a fully automated release with zip generation, you'd typically set up a GitHub Action, but for now, users can install by cloning the repo.*
