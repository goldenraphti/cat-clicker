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
        
        console.log('starting photoClickingListening method');
        
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
                object.photoClickCounter++;
                console.log(`The photo of ${object.name} has been clicked ${object.photoClickCounter} times`);
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

// function detecting the amount of pictures to create, and displaying them, it's being invoked immediately, passing cats as argument
(function createsPhotoGallery() {
    
    // function to loop through each cat in the cats gallery
    for ( const cat of cats) {
        cat[1].photoAdding();
    }
    
    
    
    
})(cats);

// select all photos of cats on the page
let photoCat = document.getElementsByClassName('cat-photo');



// function increasing the cat counter, to be used when click the photo
function increaseCatPhotoCounter() {
    console.log('clicking photo');
    this.photoClickCounter++;
    console.log(this.photoClickCounter);
    return this.photoClickCounter;
}