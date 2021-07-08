//Musics constructor
class Musics {
    
    constructor (artist, song) {
        this.artist= artist;
        this.song= song;
    }
}

//UI constructor
class UI {

    addMusic(music) {
        //Define and create element
        const task = document.querySelector('.task');
        const li = document.createElement('li');
        

        //Add class to element
        li.className = 'mstyle';
        //append and create text node 
        li.appendChild(document.createTextNode(`${music.artist}`));
        li.appendChild(document.createTextNode(", "));
        li.appendChild(document.createTextNode(`${music.song}`));
   
        //create 'a' element with class and innerHTML
        const remove = document.createElement('a');
    
        remove.className = 'delete-item secondary-content';
    
        remove.innerHTML =  '<i class="fa fa-window-close" aria-hidden="true"></i>';
    
        //append 'a' tag and li
        li.appendChild(remove);
    
        task.appendChild(li);

    }

    //Method to remove li from list-area  
    removeMusics(target) {
        if(target.parentElement.classList.contains ('delete-item')) {
            target.parentElement.parentElement.remove();
         
        }
    }

    //Method to show alert-empty input
    showAlert() {
        let alerts = document.querySelector('.alerts');

        const div = document.createElement('div');

        div.className = 'alertstyle';

        div.appendChild(document.createTextNode( "Please input artist or song so we can jam!!"));

        alerts.appendChild(div);

        let handle = setTimeout( function() {alerts.removeChild(div);}, 3000);
        clearTimeout(handle);

        }
    } 

//Storage constructor
class Storing {

    //Get music input from local-storage
    static getMusic() {
        let musics;

        if(localStorage.getItem('musics') === null) {
        musics = [];
    } else {
        musics = JSON.parse(localStorage.getItem('musics'));
    }

    return musics;
    }       

    //Display music input from local-storage
    static displayMusic() {
        const musics = Storing.getMusic();

        musics.forEach(function(music){
            const ui = new UI;
            ui.addMusic(music);
        })
    }

    //Add music input to local-storage
    static addMusicToStorage(music) {
        const musics = Storing.getMusic();

        musics.push(music);
        
        localStorage.setItem('musics', JSON.stringify(musics));
    }

    //Delete music li from local-storage
    static deleteMusics(music) {

        const musics = Storing.getMusic();
        
        musics.forEach(function(music, index) {
            if(`${music.song} === ${music.song}`) {
                musics.splice(index, 1);
                console.log(`${music.song}`);
            }
        });

        localStorage.setItem('musics', JSON.stringify(musics));

    }
}

//DisplayMusic event listener
document.addEventListener('DOMContentLoaded', Storing.displayMusic);

//Submit form event listener
document.querySelector('#form').addEventListener('submit', 
function (e) {

const artist = document.querySelector('#artistname').value;
const song = document.querySelector('#songname').value;

const music = new Musics(artist, song);

const ui = new UI();

ui.addMusic(music);

Storing.addMusicToStorage(music);

if(artist === '' && song === '') {
  ui.showAlert();
} else {
    document.querySelector('#artistname').value = '';
    document.querySelector('#songname').value = '';
    
}

e.preventDefault();


});

//Click on li a-tag remove event listener
document.querySelector('.formall').addEventListener('click', function (e){
    
    const ui = new UI();

    ui.removeMusics(e.target);

    Storing.deleteMusics(e.target.parentElement.parentElement);

    e.preventDefault();
});

