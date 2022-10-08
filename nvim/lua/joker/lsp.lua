local signs = {
    { name = "DiagnosticSignError", text = "" },
    { name = "DiagnosticSignWarn", text = "" },
    { name = "DiagnosticSignHint", text = "" },
    { name = "DiagnosticSignInfo", text = "" },
}

for _, sign in ipairs(signs) do
    vim.fn.sign_define(sign.name, { texthl = sign.name, text = sign.text, numhl = "" })
end

-- local config = {
--     -- disable virtual text
--     virtual_text = false,
--     -- show signs
--     signs = {
--         active = signs,
--     },
--     update_in_insert = true,
--     underline = true,
--     severity_sort = true,
--     float = {
--         focusable = false,
--         style = "minimal",
--         border = "rounded",
--         source = "always",
--         header = "",
--         prefix = "",
--     },
-- }
-- 
-- vim.diagnostic.config(config)

local function map(m, k, v)
    vim.keymap.set(m, k, v, { noremap = true, silent = true })
end

local capabilities = require('cmp_nvim_lsp').update_capabilities(vim.lsp.protocol.make_client_capabilities())

local function lsp_keymaps()
    map("n", "<leader>K", vim.lsp.buf.hover)
    map("n", "<leader>gd", vim.lsp.buf.definition)
    map("n", "<leader>gD", vim.lsp.buf.declaration)
    map("n", "<leader>gT", vim.lsp.buf.type_definition)
    map("n", "<leader>gi", vim.lsp.buf.implementation)
    map("n", "<leader>df", vim.diagnostic.goto_next)
    map("n", "<leader>dp", vim.diagnostic.goto_prev)
    map("n", "<leader>R", vim.lsp.buf.rename)
    map("n", "<leader>gr", vim.lsp.buf.references)
    -- map("n", "<leader>gl", vim.diagnostic.open_float)
end

require("lspconfig").pylsp.setup {
    capabilities = capabilities,
    on_attach = lsp_keymaps,
}

require("lspconfig").sumneko_lua.setup {
    capabilities = capabilities,
    on_attach = lsp_keymaps,
    settings = {
        Lua = {
            runtime = {
                -- Tell the language server which version of Lua you're using (most likely LuaJIT in the case of Neovim)
                version = "LuaJIT",
            },
            diagnostics = {
                globals = { "vim" },
            },
            workspace = {
                library = {
                    [vim.fn.expand("$VIMRUNTIME/lua")] = true,
                    [vim.fn.stdpath("config") .. "/lua"] = true,
                },
            },
        },
    },
}

require("lspconfig").clangd.setup {
    capabilities = capabilities,
    on_attach = lsp_keymaps,
}
