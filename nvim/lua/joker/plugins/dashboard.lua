local home = os.getenv('HOME')
local db = require('dashboard')
db.preview_command = 'cat'
db.preview_file_path = home .. '/.config/nvim/static/neovim.cat'
db.preview_file_height = 11
db.preview_file_width = 70
db.custom_center = {
    {icon = '  ',
        desc = 'Recently latest session                 ',
        shortcut = 'SPC s l',
        action ='SessionLoad'},
    {icon = '  ',
        desc = 'Recently opened files                   ',
        action =  'DashboardFindHistory',
        shortcut = 'SPC f h'},
    {icon = '  ',
        desc = 'Find  File                              ',
        action = 'Telescope find_files find_command=rg,--hidden,--files',
        shortcut = 'SPC f f'},
    {icon = '  ',
        desc ='File Browser                            ',
        action =  'Telescope file_browser',
        shortcut = 'SPC f b'},
    {icon = '  ',
        desc = 'Find  word                              ',
        action = 'Telescope live_grep',
        shortcut = 'SPC l g'},
    {icon = '  ',
        desc = 'Open Personal dotfiles                  ',
        action = 'Telescope dotfiles path=' .. home ..'/.dotfiles',
        shortcut = 'SPC f d'},
}
