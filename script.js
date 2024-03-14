await WebMidi.enable();

//estasblish all my shit
let myInput = WebMidi.inputs[0];
let myOutput = WebMidi.outputs[0].channels[1];

let dropIns = document.getElementById("dropdown-ins");
let dropOuts = document.getElementById("dropdown-outs");
let interval = document.getElementById("dropdown-interval");

let harmony = 0


// let maj2nd = document.getElementById("Maj2");
// let maj3rd = document.getElementById("Maj3");
// let perf4 = document.getElementById("Perf4");
// let perf5 = document.getElementById("Perf5");
// let maj6th = document.getElementById("Maj6");


//read option n shit
WebMidi.inputs.forEach(function (input, num) {
    dropIns.innerHTML += `<option value=${num}>${input.name}</option`;
});

WebMidi.inputs.forEach(function (output, num) {
    dropOuts.innerHTML += `<option value=${num}>${output.name}</option`;
});


//note reader n shit
const midiProcess = function (midiNoteInput) {

    // let pitch = midiNoteInput.note.number;
    let velocity = midiNoteInput.note.rawAttack;
    // let harmPitch = midiNoteInput.note.number + parseInt 

    // let harmony = [note1, note2];
    let note1 = midiNoteInput.note.number;
    let note2 = midiNoteInput.note.number + parseInt (interval.value);

    let midiNote1 = new Note(note1, { rawAttack: velocity });
    let midiNote2 = new Note(note2, { rawAttack: velocity });
    return [midiNote1, midiNote2];
};



dropIns.addEventListener("change", function () {
    if (myInput.hasListener("noteon")) {
    myInput.removeListener("noteon");
    }
    if(myInput.hasListener("noteoff")) {
        myInput.removeListener("noteoff");
    }

    myInput = WebMidi.inputs[dropIns.value];

    myInput.addListener("noteon", function (someMIDI) {
        myOutput.sendNoteOn(midiProcess(someMIDI));
});

    myInput.addListener("noteoff", function (someMIDI) {
        myOutput.sendNoteOff(midiProcess(someMIDI));
    });
});



dropOuts.addEventListener("change", function () {
    myOutput = WebMidi.outputs [dropOuts.value].channels[1];
    // console.log("words")
});

// //-----------------------------------------------------------------------

// dropIns.addEventListener("change", function () {
//     if (mySpecialNote.hasListener("noteon")) {
//     mySpecialNote.removeListener("noteon");
//     }
//     if(mySpecialNote.hasListener("noteoff")) {
//         mySpecialNote.removeListener("noteoff");
//     }
//     mySpecialNote = harmony;

//     mySpecialNote.addListener("noteon", function (mySpecialNote) {
//         myOutput.sendNoteOn(midiProcess(mySpecialNote));
// });

// mySpecialNote.addListener("noteoff", function (mySpecialNote) {
//         myOutput.sendNoteOff(midiProcess(mySpecialNote));
//     });
// });



// dropOuts.addEventListener("change", function () {
//     myOutput = WebMidi.outputs [dropOuts.value].channels[1];
// });