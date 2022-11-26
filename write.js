//attempt to write folder into jsonz format

let fs = require('fs');
let encoding = require('encoding-japanese');
let file;
let b;
if (process.argv[0] == "node" || process.argv[0].endsWith("node.exe")){
    file = require("./" + process.argv[2]); //idk how nw.js works
    b = process.argv[2]
}else{
    file = require("./" + process.argv[1]);
    b = process.argv[1]
}
function en(c){var x='charCodeAt',b,e={},f=c.split(""),d=[],a=f[0],g=256;for(b=1;b<f.length;b++)c=f[b],null!=e[a+c]?a+=c:(d.push(1<a.length?e[a]:a[x](0)),e[a+c]=g,g++,a=c);d.push(1<a.length?e[a]:a[x](0));for(b=0;b<d.length;b++)d[b]=String.fromCharCode(d[b]);return d.join("")}
function de(b){var a,e={},d=b.split(""),c=f=d[0],g=[c],h=o=256;for(b=1;b<d.length;b++)a=d[b].charCodeAt(0),a=h>a?d[b]:e[a]?e[a]:f+c,g.push(a),c=a.charAt(0),e[o]=f+c,o++,f=a;return g.join("")}
let old = file;
let files = fs.readdirSync(file.name);
let contents = {};
let startTime = Date.now();
function processFolder(f){
    filest = fs.readdirSync(file.name + "/" + f);
    for (let i = 0; i < filest.length; i++){
        if (fs.lstatSync(file.name + "/" + f + "/" + filest[i]).isDirectory()){
            contents[f].contents[filest[i]] = {}
            contents[f].contents[filest[i]].folder = true;
            processFolder(f[i])
        }else{
            contents[f].contents[filest[i]] = {}
            contents[f].contents[filest[i]].folder = false;
            contents[f].contents[filest[i]].encoding = encoding.detect(fs.readFileSync(file.name + "/" + f + "/" + filest[i]));
            //console.log(fs.readFileSync(file.name + "/" + f + "/" + files[i]))
            contents[f].contents[filest[i]].contents = en(fs.readFileSync(file.name + "/" + f + "/" + filest[i],{encoding:file.encoding}))
        }
    }
}

console.log("");
console.log("[                                                                                                    ] 0%");
for (let i = 0; i < files.length; i++){
    if (fs.lstatSync(file.name + "/" + files[i]).isDirectory()){
        contents[files[i]] = {}
        contents[files[i]].folder = true;
        contents[files[i]].contents = {};
        processFolder(files[i])
    }else{
        contents[files[i]] = {}
        contents[files[i]].folder = false;
        contents[files[i]].encoding = encoding.detect(fs.readFileSync(file.name + "/" + files[i]));
        contents[files[i]].contents = en(fs.readFileSync(file.name + "/" + files[i],{encoding:file.encoding}))
    }
    progress = "["
    for (let j = 0; j < Math.round(100/files.length)*(i+1); j++){
        progress += "#"
    }
    for (let j = 0; j < 100-(Math.round(100/files.length)*(i+1)); j++){
        progress += " "
    }
    progress += "] " + String(Math.round(100/files.length)*(i+1)) + "%"
    console.log(progress);
}
file.contents = contents;
file.convert = "zip";
file.folder = true;
fs.writeFileSync(b,JSON.stringify(file,null,2),file.encoding)
//console.log("[####################################################################################################] 100%");
console.log("");
console.log("Done! " + ((Date.now()-startTime)/1000) + "s")