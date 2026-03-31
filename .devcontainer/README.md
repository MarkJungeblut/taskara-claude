# Dev Container (GitHub Codespaces)

## What's included

| Tool | Version |
|------|---------|
| .NET SDK | 10 |
| Node.js | 22 |
| Claude Code CLI | latest |

VS Code extensions for C# (Dev Kit + CSharpier), ESLint, and Prettier are installed automatically. Format-on-save is enabled for all supported file types.

## Required: Anthropic API key

Claude Code needs an API key to run. Add it as a **Codespaces secret** in your GitHub account **before** starting a Codespace — it will be injected automatically.

1. Go to [github.com/settings/codespaces](https://github.com/settings/codespaces)
2. Under **Secrets**, add a new secret:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your key from [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
3. Grant access to this repository

## Starting a Codespace

Open this repository on GitHub and click **Code → Codespaces → Create codespace on main**.

The `postCreateCommand` will install Claude Code and restore the .NET local tools (CSharpier) automatically. This takes a minute on first start.
