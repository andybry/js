"use strict";
/*
 * This script compiles all the definitions in the definitions folder
 * to produce individual JavaScript files
 */
var File = java.io.File;
var PrintWriter = java.io.PrintWriter;

// delete a file or directory
function deleteFile(file) {
  if(file.isFile()) {
    file["delete"]();
  } else {
    var files = file.listFiles()
    for(var index in files) {
      deleteFile(files[index]);
    }
    file["delete"]();
  }
}

/* Clean up and recreate the output directory */
var distDirectory = new File("dist");
deleteFile(distDirectory);
distDirectory.mkdir();

/* loop through files in the definitions directory */
var definitionsDirectory = new File("definitions");
var definitions = definitionsDirectory.list();
for(var definitionsIndex in definitions) {
  // get source files
  var filename = definitions[definitionsIndex];
  var fileContents = readFile("definitions/" + filename);
  var lines = fileContents.split("\n");
  var sourceFiles = [];
  for(var lineIndex in lines) {
    var line = lines[lineIndex];
    var match = /load\("(src\/.*)"\)/.exec(line);
    if(match) {
      sourceFiles.push(match[1]);
    }
  }
  // get source lines
  var sourceLines = [];
  sourceLines.push('"use strict";');
  sourceLines.push("");
  for(var fileIndex in sourceFiles) {
    var sourceFile = sourceFiles[fileIndex];
    sourceLines.push("// start of file: " + sourceFile);
    var sourceFileContent = readFile(sourceFile);
    var sourceFileLines = sourceFileContent.split("\n");
    for(lineIndex in sourceFileLines) {
      line = sourceFileLines[lineIndex];
      var match = /"use strict";/.exec(line);
      if(!match) {
        sourceLines.push(line);
      }
    }
    sourceLines.push("// end of file: " + sourceFile);
    sourceLines.push("");
    sourceLines.push("");
    sourceLines.push("");
  }

  // output the source code to the dist folder in a file with
  // the same name
  var source = sourceLines.join("\n");
  source = source.replace(/\r/g, "");
  var printWriter = new PrintWriter("dist/" + filename);
  printWriter.print(source);
  printWriter.flush();
  printWriter.close();
  
}
