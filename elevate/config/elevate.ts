const options = {
    Watch:'./templates', // Folder to watch for changes
    FileTypes:['html', 'jsx', 'tsx', 'astro','twig'], //Valid filetypes to watch for changes
    Output:'./src/styles', //Where to put the compiled CSS
    Extend:['./elevate/ext/fonts.css','./elevate/ext/overrides.css'], //CSS files to include as well
    ClassRegex: [
      /\bclass\s*=\s*"([^"]*)"/g,                // class="..."
      /\bclass\s*=\s*'([^']*)'/g,                // class='...'
      /\bclassName\s*=\s*"([^"]*)"/g,            // className="..."
      /\bclassName\s*=\s*'([^']*)'/g,            // className='...'
      /\bclassName\s*=\s*{\s*`([\s\S]*?)`\s*}/g,  // className={`...`}
      /\bclassName\s*=\s*{\s*"([^"]*)"\s*}/g,   // className={"..."}
      /\bclassName\s*=\s*{\s*'([^']*)'\s*}/g,   // className={'...'}
      ],
    SafeList:['glide__slides','glide__slide','glide__track','glide','fa-brands','fa-square-facebook','fa-square-instagram','fa-solid', 'fa-bars','fa-xmark']
}

export const config = options




