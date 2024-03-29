local packer = require("packer")

packer.init {
  display = {
    open_fn = function()
      return require("packer.util").float { border = "single"}
    end,
  },
}

return packer.startup(function(use)
    -- Packer can manage itself
    use 'wbthomason/packer.nvim'

    -- colorscheme
    use {
        "catppuccin/nvim",
        as = "catppuccin",
        config = function()
            vim.g.catppuccin_flavour = "mocha" -- latte, frappe, macchiato, mocha
            require("catppuccin").setup()
            vim.api.nvim_command "colorscheme catppuccin"
        end
    }

    -- useful plugins used by others
    use "nvim-lua/popup.nvim" -- An implementation of the Popup API from vim in Neovim
    use "nvim-lua/plenary.nvim" -- Useful lua functions used ny lots of plugins


    -- cmp plugins
    use "hrsh7th/nvim-cmp" -- The completion plugin
    use "hrsh7th/cmp-buffer" -- buffer completions
    use "hrsh7th/cmp-path" -- path completions
    use "hrsh7th/cmp-nvim-lsp"
    use "hrsh7th/cmp-nvim-lua"
    use "saadparwaiz1/cmp_luasnip" -- snippet completions

    -- snippets
    use({"L3MON4D3/LuaSnip", tag = "v<CurrentMajor>.*"})
    use "rafamadriz/friendly-snippets" -- a bunch of snippets to use

    -- lsp
    use "neovim/nvim-lspconfig" -- enable LSP

    -- telescope
    use {
        'nvim-telescope/telescope.nvim', tag = '0.1.0',
        -- or                            , branch = '0.1.x',
        requires = { {'nvim-lua/plenary.nvim'} }
    }

    use { 'nvim-telescope/telescope-fzf-native.nvim', run = 'make' }

    use 'kyazdani42/nvim-web-devicons'

    -- Treesitter
    use {
        'nvim-treesitter/nvim-treesitter',
        run = ':TSUpdate',
    }
    use 'nvim-treesitter/nvim-treesitter-context'

    -- commenting
    use 'tpope/vim-commentary'

    use {
        'nvim-lualine/lualine.nvim',
        requires = { 'kyazdani42/nvim-web-devicons', opt = true },
        config = function()
            require("joker.plugins.lualine")
        end,
    }

    use {
        'goolord/alpha-nvim',
        config = function ()
            require'alpha'.setup(require'alpha.themes.dashboard'.config)
        end
    }

    use {
        'lukas-reineke/indent-blankline.nvim',
        config = function()
            require("joker.plugins.indentline")
        end,
    }

    use {
        'norcalli/nvim-colorizer.lua',
        config = function()
            require("joker.plugins.colorizer")
        end,
    }

    use 'rhysd/git-messenger.vim'

    use {
        'nvim-tree/nvim-tree.lua',
        requires = {
            'nvim-tree/nvim-web-devicons', -- optional, for file icons
        },
        tag = 'nightly', -- optional, updated every week. (see issue #1193)
        config = function()
            require("joker.plugins.nvim-tree")
        end,
    }

    use {
        'lewis6991/gitsigns.nvim',
        config = function()
            require('joker.plugins.gitsigns')
        end
    }

    use {
        'voldikss/vim-floaterm',
        config = function()
            require('joker.plugins.floaterm')
        end,
    }

    use {
        'tpope/vim-fugitive',
    }

    use {
        'tpope/vim-rhubarb',
    }

    use {
        'junegunn/gv.vim',
    }
end)
