# RubyVox MCP server — client reference

Verified on the wire 2026-09-26. Endpoint `https://rubyvox.com/mcp`. Streamable HTTP, MCP protocol `2025-06-18`, OAuth scope `mcp`. The tool list is not public: obtain a bearer token, then call `tools/list`.

## Identity

`GET https://rubyvox.com/mcp`

```json
{"name":"RubyVox MCP","version":"1.0.0","note":"Authenticate with a Bearer API key; call tools/list for your available tools."}
```

## Unauthorized call

`POST https://rubyvox.com/mcp` with no bearer returns `401` and `{"error":"unauthorized"}` with:

```
WWW-Authenticate: Bearer realm="rubyvox-mcp", resource_metadata="https://rubyvox.com/.well-known/oauth-protected-resource"
```

## Protected resource metadata

`GET https://rubyvox.com/.well-known/oauth-protected-resource`

```json
{
  "resource": "https://rubyvox.com/mcp",
  "authorization_servers": ["https://rubyvox.com"],
  "bearer_methods_supported": ["header"],
  "scopes_supported": ["mcp"]
}
```

## Authorization server metadata

`GET https://rubyvox.com/.well-known/oauth-authorization-server`

| Field | Value |
|---|---|
| issuer | `https://rubyvox.com` |
| authorization_endpoint | `https://rubyvox.com/oauth/authorize` |
| token_endpoint | `https://rubyvox.com/oauth/token` |
| registration_endpoint | `https://rubyvox.com/oauth/register` |
| response_types_supported | `code` |
| grant_types_supported | `authorization_code`, `refresh_token` |
| code_challenge_methods_supported | `S256` |
| token_endpoint_auth_methods_supported | `none` |
| scopes_supported | `mcp` |

Public clients only. No client secret.

## Dynamic client registration

`POST https://rubyvox.com/oauth/register`

```json
{
  "client_name": "RubyVox",
  "redirect_uris": ["https://YOUR-APP/oauth/callback"],
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"],
  "token_endpoint_auth_method": "none",
  "scope": "mcp"
}
```

`201` returns `client_id` as `rvxc_…`.

## Authorize

`GET https://rubyvox.com/oauth/authorize` with `response_type=code`, `client_id`, `redirect_uri`, `code_challenge` (S256), `code_challenge_method=S256`, `scope=mcp`, `resource=https://rubyvox.com/mcp`, and `state`.

## Token

`POST https://rubyvox.com/oauth/token` as `application/x-www-form-urlencoded`:

```
grant_type=authorization_code
client_id=rvxc_…
code=…
code_verifier=…
redirect_uri=…
resource=https://rubyvox.com/mcp
```

Refresh uses `grant_type=refresh_token`, `client_id`, `refresh_token`, and `resource`.

## RPC

`POST https://rubyvox.com/mcp`

```
Authorization: Bearer ACCESS_TOKEN
Content-Type: application/json
Accept: application/json, text/event-stream
MCP-Protocol-Version: 2025-06-18
MCP-Session-Id: SESSION_FROM_INITIALIZE
```

```json
{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"client","version":"1.0.0"}}}
```

Then `notifications/initialized`, then `tools/list`, then `tools/call` with `{ "name", "arguments" }`. Responses are JSON or SSE (`data:` frames). Keep `Mcp-Session-Id` from the initialize response.

## For customers

The connector URL to paste into ChatGPT or Claude is `https://rubyvox.com/mcp`. The assistant discovers its own tools after the grant. Nothing else is pasted.

## Still open

- Path-aware metadata at `/.well-known/oauth-protected-resource/mcp` should serve the same JSON as the root document (RFC 9728).
- Tools never exposed to chat clients: `confirm_booking`, `capture_card`, `notify_member`. The handler rejects them by name; the `mcp` scope excludes them.
- The consent screen must look up `client_id` unscoped by user or browser. Dynamic registration is performed by the host with no session.
