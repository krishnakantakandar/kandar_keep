const addButton = document.querySelector('#add');

const updateLocalStorageArea =()=>{
    const textareaData = document.querySelectorAll('textarea'); // saves in arry format querySelectorAll this is used as all the nodes ar accessing
    const notes =[];
    //console.log(textareaData);
    textareaData.forEach((note)=>{
        return notes.push(note.value)
    })
    // console.log(notes);
    localStorage.setItem('notes',JSON.stringify(notes));// we can pass only string (json)'notes' is key
}

const addNewNote = (text = '') =>{
    const note = document.createElement('div');
    note.classList.add('note');// giving div a class
    const htmlData =`<div class="operation">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
</div>
<div class="main ${text ? "":'hidden'}" > </div>
<textarea class="${text ? 'hidden' :""}"></textarea>`;

note.insertAdjacentHTML('afterbegin',htmlData); 
const editButton= note.querySelector('.edit');
const delButton= note.querySelector('.delete');
const mainDiv= note.querySelector('.main');
const textarea= note.querySelector('textarea');

// deleting the note

delButton.addEventListener('click',()=>{
    note.remove();
    updateLocalStorageArea();// to ufate the local storage 
});
textarea.value = text;
mainDiv.innerHTML =text;
editButton.addEventListener('click',()=>{
    mainDiv.classList.toggle('hidden'); // if u click on edit button then main div will hide and textarea will show up vise-versa

    textarea.classList.toggle('hidden');
});
textarea.addEventListener('change',(event) =>{
    const value1 = event.target.value;
    mainDiv.innerHTML =value1;

    updateLocalStorageArea();
});

document.body.appendChild(note);

}
// getting data back from local storage
const notes = JSON.parse(localStorage.getItem('notes'))
if(notes){
    notes.forEach((note)=>addNewNote(note))
};
addButton.addEventListener('click',()=>addNewNote());