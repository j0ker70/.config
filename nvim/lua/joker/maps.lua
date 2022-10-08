-- Modes
--   normal_mode = "n",
--   insert_mode = "i",
--   visual_mode = "v",
--   visual_block_mode = "x",
--   term_mode = "t",
--   command_mode = "c",


local function map(m, k, v)
    vim.keymap.set(m, k, v, { silent = true, noremap = true })
end

map("n", "<leader>v", "\"+p")
map("n", "<F2>", "<CMD>%y+<CR>")
map("n", "<C-j>", "<C-w>j")
map("n", "<C-k>", "<C-w>k")
map("n", "<C-h>", "<C-w>h")
map("n", "<C-l>", "<C-w>l")
map("n", "<leader>[", "<CMD>bp<CR>")
map("n", "<leader>]", "<CMD>bn<CR>")
map("n", "<leader>n", "<CMD>cn<CR>")
map("n", "<leader>N", "<CMD>cp<CR>")
map("n", "<leader>T", ":vs +te")

map("v", "<leader>y", "\"+y")

map("t", "<C-h>", "<C-\\><C-N><C-w>h")
map("t", "<C-j>", "<C-\\><C-N><C-w>j")
map("t", "<C-k>", "<C-\\><C-N><C-w>k")
map("t", "<C-l>", "<C-\\><C-N><C-w>l")

map("n", "<leader>ff", "<CMD>Telescope find_files<CR>")
map("n", "<leader>lg", "<CMD>Telescope live_grep<CR>")
