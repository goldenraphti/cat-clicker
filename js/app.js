// Whole-script strict mode syntax
'use strict';


// declare the Map object recensing all cats and their properties
let cats = new Map();

class NewCatClass {
    constructor(name , photoLocation) {
        this.name = name;
        this.photoLocation = photoLocation;
        this.photoClickCounter = 0;
    }
    
    // method adding the newly created cat object to the cats gallery
    // not used yet, as it is, since we set the cat in the cats gallery manually later
    catsRegistrationInGallery() {
        console.log(`adding ${this.name} to gallery`)
        cats.set( this.name , this.name);
    }
    
    // method adding event listener on its photo
    photoAdding() {
        
        // create an image HTML element
        let newCatImg = document.createElement('img');
        // append this new image at the end of the photo gallery in the DOM
        photoGallery.appendChild(newCatImg);
        // creates the source with the corresponding photo location depending of the object of the Map
        newCatImg.setAttribute('src', `img/${this.photoLocation}`);
        // add the class photo-cat to the image
        newCatImg.setAttribute('class', 'cat-photo');
        // add event listener on its photo
        newCatImg.addEventListener('click', (function(object) {
            return function() {
                // increase the photoClicksCounter
                object.photoClickCounter++;
                // add the cat's amount of clicks beneath the displayed photo
                
                if(object.photoClickCounter === 0){
                    catClickPlacer.textContent = `The photo of ${object.name} has never yet been clicked. Let's start !`;
                } else if(object.photoClickCounter === 1) {
                    catClickPlacer.textContent = `The photo of ${object.name} has been clicked ${object.photoClickCounter} time.`;
                } else {
                    catClickPlacer.textContent = `The photo of ${object.name} has been clicked ${object.photoClickCounter} times.`;
                }
            };
        })(this));

    }
    
    // method adding the cat name in the sidebar list
    insertNameInSidebarList() {
        
        // select sidebar in the DOM
        let sidebarList = document.getElementById('sidebar-list');
        // create a <li> HTML element
        let newCatListEntry = document.createElement('li');
        // create a <a> HTML element inside the li previously created
        let newCatListLinkEntry = document.createElement('a');
        // append the a in the li element
        newCatListEntry.appendChild(newCatListLinkEntry);
        // insert cat's name in the a element
        newCatListLinkEntry.textContent = `${this.name}`;
        
        // append this cat's name in the sidebar in the DOM
        sidebarList.appendChild(newCatListEntry);
        
        // add event listener on the link, to display the corresponding photo
        newCatListLinkEntry.addEventListener('click', (function(object) {
            return function() {
                
                // removes any cat name already displayed 
                while (photoGallery.hasChildNodes()) {
                    photoGallery.removeChild(photoGallery.lastChild);
                }
                // add the photo of the current name clicked
                object.photoAdding();
                
                // removes any photo already displayed 
                while (catNamePlacer.hasChildNodes()) {
                    catNamePlacer.removeChild(catNamePlacer.lastChild);
                }
                // add the cat's name clicked above the displayed photo
                catNamePlacer.textContent = `${object.name}`;
                
                // removes any clicks indicator already displayed 
                while (catClickPlacer.hasChildNodes()) {
                    catClickPlacer.removeChild(catClickPlacer.lastChild);
                }
                // add the cat's name clicked above the displayed photo
                if(object.photoClickCounter === 0){
                    catClickPlacer.textContent = `The photo of ${object.name} has never yet been clicked. Let's start !`;
                } else if(object.photoClickCounter === 1) {
                    catClickPlacer.textContent = `The photo of ${object.name} has been clicked ${object.photoClickCounter} time.`;
                } else {
                    catClickPlacer.textContent = `The photo of ${object.name} has been clicked ${object.photoClickCounter} times.`;
                }
            };
        })(this));
    }

    
}

const cat1 = new NewCatClass('Minou', 'cat-photo-1.jpg');
const cat2 = new NewCatClass('Gros Minet', 'cat-photo-2.jpg');
const cat3 = new NewCatClass('Sami', 'cat-photo-3.jpg');
const cat4 = new NewCatClass('Keyboard Cat Fan', 'cat-photo-4.jpg');
const cat5 = new NewCatClass('Keyboard Cat', 'cat-photo-5.jpg');
const cat6 = new NewCatClass('Sundby', 'skiing-cat.png');


cats.set('cat1', cat1);
cats.set('cat2', cat2);
cats.set('cat3', cat3);
cats.set('cat4', cat4);
cats.set('cat5', cat5);
cats.set('cat6', cat6);

// select the photo gallery container in the DOM
const photoGallery = document.getElementById('cat-photo-gallery');
// select the cat name place holder in the DOM
const catNamePlacer = document.getElementById('cat-name');
// select the photo gallery container in the DOM
const catClickPlacer = document.getElementById('cat-clicks');

// function detecting the amount of pictures to create, and displaying them, it's being invoked immediately, passing cats as argument
(function createsPhotoGallery() {
    
    // function to loop through each cat in the cats gallery
    for ( const cat of cats) {
        cat[1].insertNameInSidebarList();
    }

})(cats);