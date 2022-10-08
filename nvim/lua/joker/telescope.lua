require("telescope").load_extension("fzf")

require("telescope").setup {
    defaults = {
        vimgrep_arguments = {
            "rg",
            "--color=never",
            "--no-heading",
            "--with-filename",
            "--line-number",
            "--column",
            "--smart-case",
            "--trim",
            "--glob",
            "!vevn/",
            "--glob",
            "!fashion_data/",
            "--glob",
            "!.git/"
        },

        winblend = 0,

        layout_strategy = "horizontal",
        layout_config = {
            width = 0.95,
            height = 0.85,
            -- preview_cutoff = 120,
            prompt_position = "top",

            horizontal = {
                preview_width = function(_, cols, _)
                    if cols > 200 then
                        return math.floor(cols * 0.4)
                    else
                        return math.floor(cols * 0.6)
                    end
                end,
            },

            vertical = {
                width = 0.9,
                height = 0.95,
                preview_height = 0.5,
            },

            flex = {
                horizontal = {
                    preview_width = 0.9,
                },
            },
        },
        prompt_prefix = " ",
        selection_caret = " ",
        path_display = { "smart" },

        file_ignore_patterns = {
            "venv/.*",
            "fashion_data/.*",
            "__pychache__/.*",
            "%.pyc",
        },
    },
    pickers = {
        find_files = {
            find_command = { "fd", "--strip-cwd-prefix", "--type", "f" },
            hidden = true,
        },
    },
}
