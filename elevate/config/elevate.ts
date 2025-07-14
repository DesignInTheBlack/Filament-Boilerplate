const options = {
    Watch:'./templates', // Folder to watch for changes
    FileTypes:['html', 'jsx', 'tsx', 'astro','twig'], //Valid filetypes to watch for changes
    Output:'./src/styles', //Where to put the compiled CSS
    Extend:['./elevate/ext/fonts.css'], //CSS files to include as well
    ClassRegex: [
        /class\s*=\s*"([^"]+)"/g, // Matches class="..."
    ]
}

export const config = options




