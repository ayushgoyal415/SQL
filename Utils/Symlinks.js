/*

    - Symlinks help in forming a shortcut for the source(file or directory) into the destination (file or directory).
    - Creating such shortcuts into node_modules can help in simplifying require() paths.

    > STEP 1 -> Run CMD as Administrator in any directory

    > SYMLINK FOR FILES

    mklink "destination_path...\destination_filename.ext" "source_path...\source_filename.ext" // ~ Filename should include extension !!

    for eg. If you want to create a symlink file :
        - in destination folder -> E:\Softy\Programming Softwares\My Projects\SQL\node_modules
        - with destination file name -> sql.js
        - from source folder -> E:\Softy\Programming Softwares\My Projects\SQL\Database
        - with source filename -> sql.js

    The command will be as follows

    mklink "E:\Softy\Programming Softwares\My Projects\SQL\node_modules\sql.js" "E:\Softy\Programming Softwares\My Projects\SQL\Database\sql.js"


    > SYMLINK FOR DIRECTORIES

    mklink /D "destination_path...\destination_folder_name" "source_path" // ~ /D is necessary !!

    for eg. If you want to create a symlink folder :
        - in destination folder -> E:\Softy\Programming Softwares\My Projects\SQL\node_modules
        - with destination folder name -> Database
        - from source folder -> E:\Softy\Programming Softwares\My Projects\SQL\Database

    The command will be as follows

    mklink /D "E:\Softy\Programming Softwares\My Projects\SQL\node_modules\Database" "E:\Softy\Programming Softwares\My Projects\SQL\Database"

   
    > The code can become easier if cmd is currently in the destination folder

    - eg. node_modules in the above example
        - FOR file -> mklink "sql.js" "E:\Softy\Programming Softwares\My Projects\SQL\Database\sql.js"
        - FOR folder -> mklink /D "Database" "E:\Softy\Programming Softwares\My Projects\SQL\Database"
    
    * Useful SYMLINK commands for the current workspace
    mklink "E:\Softy\Programming Softwares\My Projects\SQL\node_modules\sql.js" "E:\Softy\Programming Softwares\My Projects\SQL\Database\sql.js"

*/
