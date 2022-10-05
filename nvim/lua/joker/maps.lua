local function map(m, k, v)
    vim.keymap.set(m, k, v, { silent = true, noremap = true })
end

map('n', '<leader>v', '"+p')
map('n', '<F2>', '<CMD>%y+<CR>')
map('n', '<C-j>', '<C-w>j')
map('n', '<C-k>', '<C-w>k')
map('n', '<C-h>', '<C-w>h')
map('n', '<C-l>', '<C-w>l')
map('n', '<leader>[', '<CMD>bp<CR>')
map('n', '<leader>]', '<CMD>bn<CR>')
map('n', '<leader>n', '<CMD>cn<CR>')
map('n', '<leader>N', '<CMD>cp<CR>')

map('v', '<leader>y', '"+y')
