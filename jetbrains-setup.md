# JetBrains AI Assistant — RubyVox MCP setup

Scope: **The Dallas Play House** agent and **JetBrains** only. Recovery codes stay out of this.

## 1. Add RubyVox to AI Assistant

Settings → Tools → AI Assistant → Model Context Protocol → **+** → **As JSON**

Windows:

```json
{
  "mcpServers": {
    "rubyvox": {
      "command": "npx.cmd",
      "args": ["-y", "mcp-remote", "https://rubyvox.com/mcp", "--transport", "http-first"]
    }
  }
}
```

Mac/Linux: use `"command": "npx"` instead of `npx.cmd`.

Level: **Global**. Apply. First chat should open a RubyVox login in the browser — finish that.

Need Node 20+ on PATH. If the IDE cannot see `npx`, close it and reopen after installing Node.

## 2. Hand it to Junie / Claude Agent / Codex

`%USERPROFILE%\.jetbrains\acp.json` (Mac: `~/.jetbrains/acp.json`):

```json
{
  "default_mcp_settings": {
    "use_custom_mcp": true,
    "use_idea_mcp": false
  },
  "agent_servers": {}
}
```

Settings → Tools → AI Assistant → Agents → **Pass custom MCP servers** = on.

## 3. First prompt in AI Chat

```
You are operating my RubyVox agent via MCP.

Name: The Dallas Play House
UUID: 542e1ccb-c597-4dd1-bdeb-7f0236ca59cd
Phone: (888) 402-3220

Discover tools first. Confirm this agent is reachable.
Do not invent tool names.
```

After that you can ask: list today's calls, pull leads, draft a follow-up text, show booking slots. The full prompt set is in [README.md](README.md).

## Do not paste

- `https://rubyvox.com/a/542e1ccb-c597-4dd1-bdeb-7f0236ca59cd` into MCP settings — that page is only for callers
- JetBrains recovery codes anywhere in this setup

## If the MCP row stays red

The usual cause is Node not on the IDE's PATH, or the RubyVox login was cancelled. Say which of those you hit and fix that step only.
