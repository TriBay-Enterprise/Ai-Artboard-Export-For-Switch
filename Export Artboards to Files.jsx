var document = $doc;
var boards = document.artboards;

if ($extension != "ai") {
    $error = "This script is for Illustrator files only."
    throw $error;
}

// loop through all artboards, make each one active and render before moving onto the next
for (var i = 0; i < boards.length; i++) {
    document.artboards.setActiveArtboardIndex(i);
    var saveOptions = new IllustratorSaveOptions();
    var thePath = Folder.temp + "/" + $filename; //temp output path
    var aiDoc = new File(thePath);
    saveOptions.saveMultipleArtboards = true;
    saveOptions.artboardRange = (i+1).toString();
    document.saveAs(aiDoc, saveOptions);
    //get board name if there is one
    var boardName; 
    if (!boards[i].name.match(/Artboard\s[0-9]+/)) {
        thePath = thePath + "_" + boards[i].name + ".ai"; //path with artboard name
    } else {
        thePath = thePath + "-" + boardNumber(i) + ".ai"; //path with artboard number
    }
    $outfiles.push(thePath); //Send to Switch Output
}

function boardNumber (num) {
    if (num + 1 < 10) num = "0" + (num + 1);
    else num = (num + 1).toString();
    return num;
}