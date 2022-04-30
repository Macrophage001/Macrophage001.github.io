let notes = []

// When using querySelector, you specify the css name.
// if the css name is an ID for an element, then you would use '#' before the name.
// If it's a class then you use '.' before the name, just like how you'd write it in the css file itself.

let titleDisplay = document.querySelector("#note-title");
let textAreaDisplay = document.querySelector("#note-content");
let noteStorageDisplay = document.querySelector("#notes");


const toggleNote = (index) => {
    // This is called deconstruction.
    // essentially just removes an extra step
    // to get to the information you want.

    // It's the same as saying:
    // let note = notes[index];
    // let title = note.title;
    // let content = note.content;
    const { title, content } = notes[index];
    
    let selectedNote = document.querySelectorAll(".stored-note")[index];
    
    // Since the note is too small when it's inside the note storage area, we can click on it to make it grow bigger,
    // when that happens, the content within the note is changed so that it shows the full piece of text that note stores (shortenedInnerHTML).
    // when it shrinks again, the full text is replaced by a shortened version with 3 dots at the end (fullInnerHTML)
    let shortenedInnerHTML = `
        <h3>${title}</h3>
        <p>${content.length > 24 ? content.slice(0, 24) : content}...</p>
    `;

    let fullInnerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
    `;

    // Dynamically introduces a new class to the stored note element in the HTML.
    // Adding and removing this class is what makes the note grow and shrink when you click on it.
    // check out the class in the css file to see how that works.
    let storedNoteClassName = 'stored-note-full';
    
    if (selectedNote.classList.contains(storedNoteClassName))
    {
        selectedNote.classList.remove(storedNoteClassName);
        selectedNote.innerHTML = shortenedInnerHTML;
    }
    else
    {
        selectedNote.classList.add(storedNoteClassName);
        selectedNote.innerHTML = fullInnerHTML;
    }
    
    console.log("Selected Note: " + selectedNote.innerHTML);
}


// You can consider this a template for how the stored note needs to look as an element in
// the html. Whenever this function gets called below, it will create a new copy of this template,
// filling in the necessary bits of info (index, title, content) using the parameters that are passed in.
let createNoteElement = (index, title, content) => {
    return`
    <button class='stored-note' onclick="toggleNote(${index})">
        <h3>${title}</h3>
        <p>${content.length > 24 ? content.slice(0, 24) : content}...</p>
    </button>`
}

const updateStoredNotesDisplay = () => {
    let storedNoteElements = []
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        let title = note.title;
        let content = note.content;

        // The new stored note elements are created right here.
        let storedNoteElement = createNoteElement(i, title, content);
        storedNoteElements[i] = storedNoteElement;
    }

    noteStorageDisplay.innerHTML = "";

    storedNoteElements.forEach(element => { noteStorageDisplay.innerHTML += element; });
    // This is the exact same as saying:

    // for (let i = 0; i < storedNoteElements.length; i++)
    // {
    //     let element = storedNoteElements[i];
    
    //     noteStorageDisplay.innerHTML += element;
    // }

    // The 'forEach' function is just a convenience supplied by Javascript.
}

const saveNote = () => {
    console.log("Saving note...")

    if (titleDisplay.value === "")
    {
        return console.error("Please specify a title for the note");
    }

    notes.push({ index: notes.length, title: titleDisplay.value, content: textAreaDisplay.value });

    updateStoredNotesDisplay();
}

const clearNote = () => {
    titleDisplay.value = "";
    textAreaDisplay.value = "";
}

const deleteStoredNotes = () => {
    notes = [];
    noteStorageDisplay.innerHTML = "";
}