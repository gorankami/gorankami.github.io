const fs = require('fs')

const blogDir = __dirname + '/../src/blog/'

fs.readdir(blogDir + 'posts', (err, files) => {
  if (err) {
    throw err
  }

  // files object contains all files names
  // log them on console

  const posts = files.reverse().map((file) => {
    const date = file.substring(0, 7)
    return {
      date,
      title: file.substring(7),
      importName: 'post_' + file.replace(/\s/g, '_').replace(/\.md/g, ''),
      file,
    }
  })

  const imports = posts
    .map((p) => `import ${p.importName} from "./posts/${p.file}"`)
    .join('\n')
  const fetches = posts.map(
    (p) => `fetch(${p.importName}.replace(/\\s/g,"%20"))`,
  )
  const getPostsString = `export default function getPosts(){
        const promises = [\n${fetches.join(',\n')}\n]
        return [Promise.all(promises)
            .then(responses=>Promise.all(responses.map(res=>res.text()))), ${JSON.stringify(
              posts,
            )}]
    }`
  fs.writeFileSync(
    blogDir + 'getPosts.js',
    [imports, getPostsString].join('\n'),
    'utf8',
  )
})
