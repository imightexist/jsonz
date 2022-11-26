//attempts to read json and extract it

let fs = require('fs')
let file;
if (process.argv[0] == "node" || process.argv[0].endsWith("node.exe")){
    file = require("./" + process.argv[2]); //idk how nw.js works
}else{
    file = require("./" + process.argv[1]);
}
if (!fs.existsSync(file.name)){
    fs.mkdirSync(file.name);
}
function en(c){var x='charCodeAt',b,e={},f=c.split(""),d=[],a=f[0],g=256;for(b=1;b<f.length;b++)c=f[b],null!=e[a+c]?a+=c:(d.push(1<a.length?e[a]:a[x](0)),e[a+c]=g,g++,a=c);d.push(1<a.length?e[a]:a[x](0));for(b=0;b<d.length;b++)d[b]=String.fromCharCode(d[b]);return d.join("")}
function de(b){var a,e={},d=b.split(""),c=f=d[0],g=[c],h=o=256;for(b=1;b<d.length;b++)a=d[b].charCodeAt(0),a=h>a?d[b]:e[a]?e[a]:f+c,g.push(a),c=a.charAt(0),e[o]=f+c,o++,f=a;return g.join("")}
function processFolder(f,a){
    if (!fs.existsSync(file.name + "/" + a)){
        fs.mkdirSync(file.name + "/" + a);
    }
    for (let i = 0; i < Object.keys(f.contents).length; i++){
        filename = Object.keys(f.contents)[i];
        e = f.contents[filename];
        if (e.folder){
            processFolder(e,a + "/" + filename)
        }else{
            fs.writeFileSync(file.name + "/" + a + "/" + filename,de(e.contents),e.encoding);
        }
    }
}

console.log("Extracting to: " + file.name);
console.log("Author: " + file.author);
if (typeof file.comment != undefined){
    console.log(file.comment);
}
let startTime = Date.now();
console.log("");
console.log("[                                                                                                    ] 0%");
for (let i = 0; i < Object.keys(file.contents).length; i++){
    filename = Object.keys(file.contents)[i];
    e = file.contents[filename];
    if (e.folder){
        processFolder(e,filename)
    }else{
        fs.writeFileSync(file.name + "/" + filename,de(e.contents),e.encoding);
    }
    progress = "["
    for (let j = 0; j < Math.round(100/Object.keys(file.contents).length)*(i+1); j++){
        progress += "#"
    }
    for (let j = 0; j < 100-(Math.round(100/Object.keys(file.contents).length)*(i+1)); j++){
        progress += " "
    }
    progress += "] " + String(Math.round(100/Object.keys(file.contents).length)*(i+1)) + "%"
    console.log(progress);
}
//console.log("[####################################################################################################] 100%");
console.log("");
console.log("Done! " + ((Date.now()-startTime)/1000) + "s");