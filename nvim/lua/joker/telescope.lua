require("telescope").load_extension("fzf")

require("telescope").setup {
    defaults = {
        layout_config = {
            prompt_position = "top",
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
