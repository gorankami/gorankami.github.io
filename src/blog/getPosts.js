import post_20201211_I_started_a_website from "./posts/20201211 I started a website.md"
export default function getPosts(){
        const promises = [
fetch(post_20201211_I_started_a_website.replace(/\s/g,"%20"))
]
        return [Promise.all(promises)
            .then(responses=>Promise.all(responses.map(res=>res.text()))), [{"date":"2020121","title":"1 I started a website.md","importName":"post_20201211_I_started_a_website","file":"20201211 I started a website.md"}]]
    }