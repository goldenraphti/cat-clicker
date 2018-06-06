// Whole-script strict mode syntax
'use strict';

// Self executed function
$(function(){
	
    // select the cat name place holder in the DOM
    const catNamePlacer = document.getElementById('cat-name');
    // select the photo gallery container in the DOM
    const catClickPlacer = document.getElementById('cat-clicks');
    // select sidebar in the DOM
    let sidebarList = document.getElementById('sidebar-list');
    // create a <li> HTML element
    let newCatListEntry = document.createElement('li');
    // create a <a> HTML element inside the li previously created
    let newCatListLinkEntry = document.createElement('a');

	

    // MODEL
    let model = {

        cats : [
            {
                name: 'Minou',
                photoLocation: 'http://img.izismile.com/img/img5/20120411/640/funny_cats_imitate_famous_paintings_640_56.jpg',
                clickCount: 0
            },
            {
                name: 'Gros Minet',
                photoLocation: 'https://pbblogassets.s3.amazonaws.com/uploads/2016/09/Garfield.jpg',
                clickCount: 0
            },
            {
                name: 'Mono Lisandro',
                photoLocation: 'http://i2.cdn.turner.com/dr/hln/www/release/sites/default/files/imagecache/horizontal_1040x585/2014/10/28/484710993.jpg',
                clickCount: 0
            },
            {
                name: 'Keyboard Cat Fan',
                photoLocation: 'https://worldwidewebadventure.files.wordpress.com/2013/05/3ffb9-keyboard-cat-autograph.jpg',
                clickCount: 0
            },
            {
                name: 'Keyboard Cat',
                photoLocation: 'http://static.boredpanda.com/blog/wp-content/uploads/2014/11/keyboardcatreal__700.gif',
                clickCount: 0
            },
            {
                name: 'Sundby',
                photoLocation: 'http://i.dailymail.co.uk/i/pix/2016/02/17/17/3151D74500000578-3451402-image-a-45_1455729680929.jpg',
                clickCount: 0
            },
        ],
        
        addCat: function(nameValue, urlValue, clicksValue) {
            model.cats.push({name: nameValue ,photoLocation: urlValue, clickCount :clicksValue});
        },

    };

    // OCTOPUS (controller)
    let octopus = {

        init : function() {
            viewList.init(model.cats);
            viewList.enablesAdminButtons();
            viewList.initAdminPanel();
        },
        
        opensAdmin: function() {
            viewList.opensAdmin();
        },
        
        closeAdmin: function(e){
            viewList.closeAdmin(e);
            e.preventDefault();
        },
        
        addCat: function(nameValue, urlValue, clicksValue) {
            model.addCat(nameValue, urlValue, clicksValue);
            viewList.render(model.cats);
            // this.closeAdmin();
        },
        
        
    };

    // View Display
    let viewDisplay = {
    
        // method adding event listener on its photo
        photoAdding: function(object) {

            // select the photo gallery container in the DOM
            const photoGallery = document.getElementById('cat-photo-gallery');

            // create an image HTML element
            let newCatImg = document.createElement('img');
            // append this new image at the end of the photo gallery in the DOM
            photoGallery.appendChild(newCatImg);
            // creates the source with the corresponding photo location depending of the object of the Map
            newCatImg.setAttribute('src', object.photoLocation);
            // add the class photo-cat to the image
            newCatImg.setAttribute('class', 'cat-photo');
            // add event listener on its photo
            newCatImg.addEventListener('click', (function(object) {
                return function() {

                    // increase the clickCount
                    object.clickCount++;
                    // add the cat's amount of clicks beneath the displayed photo

                    if(object.clickCount === 0){
                        catClickPlacer.textContent = `The photo of ${object.name} has never yet been clicked. Let's start !`;
                    } else if(object.clickCount === 1) {
                        catClickPlacer.textContent = `The photo of ${object.name} has been clicked ${object.clickCount} time.`;
                    } else {
                        catClickPlacer.textContent = `The photo of ${object.name} has been clicked ${object.clickCount} times.`;
                    }
                };
            })(object));

        },

    };

    // View List of cats
    let viewList = {
        
        // selects the admin button to click to open or close the admin panel
        adminButton : document.getElementById('admin-button'),
        // selects the admin form container containing all the inputs fields
        adminFormDiv : document.getElementById('admin-form-container'),
        adminCancelButton : document.getElementById('admin-cancel'),
        adminSubmitButton : document.getElementById('admin-submit'),
        
        

        init : function(arrayList) {

            viewList.removeExistingList();
            

            for ( const listEntry of arrayList) {
                
                // select the cat name place holder in the DOM
                const catNamePlacer = document.getElementById('cat-name');
                // select the photo gallery container in the DOM
                const catClickPlacer = document.getElementById('cat-clicks');
                // select sidebar in the DOM
                let sidebarList = document.getElementById('sidebar-list');
                // create a <li> HTML element
                let newCatListEntry = document.createElement('li');
                // create a <a> HTML element inside the li previously created
                let newCatListLinkEntry = document.createElement('a');

                // append the a in the li element
                newCatListEntry.appendChild(newCatListLinkEntry);
                // insert cat's name in the a element
                newCatListLinkEntry.textContent = `${listEntry.name}`;
                // append this cat's name in the sidebar in the DOM
                sidebarList.appendChild(newCatListEntry);

                // add event listener on the link, to display the corresponding photo
                newCatListLinkEntry.addEventListener('click', (function(object) {
                    return function() {

                        // select the photo gallery container in the DOM
                        const photoGallery = document.getElementById('cat-photo-gallery');

                        // removes any cat name already displayed 
                        while (photoGallery.hasChildNodes()) {
                            photoGallery.removeChild(photoGallery.lastChild);
                        }
                        // add the photo of the current name clicked
                        viewDisplay.photoAdding(object);

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
                        if(object.clickCount === 0){
                            catClickPlacer.textContent = `The photo of ${object.name} has never yet been clicked. Let's start !`;
                        } else if(object.clickCount === 1) {
                            catClickPlacer.textContent = `The photo of ${object.name} has been clicked ${object.clickCount} time.`;
                        } else {
                            catClickPlacer.textContent = `The photo of ${object.name} has been clicked ${object.clickCount} times.`;
                        }
                    };
                })(listEntry));

            }

        },
        
        initAdminPanel : function() {
           
            this.adminFormDiv.hidden = true;
            this.adminButton.hidden = false;
        },
        
        enablesAdminButtons: function() {
            this.adminButton.addEventListener('click', function() {
                octopus.opensAdmin();
            }, false);
            
            this.adminCancelButton.addEventListener('click', function(e){
                octopus.closeAdmin(e);
            }, false);
            
            this.adminSubmitButton.addEventListener('click', function(e) {
                let nameNewCat = document.getElementById('name').value;
                let urlNewCat = document.getElementById('url').value;
                let clicksNewCat = document.getElementById('click').value;
                
                octopus.addCat(nameNewCat, urlNewCat, clicksNewCat);
                
                e.preventDefault();
                
            }, false);
            
        },
        
        opensAdmin: function() {
            viewList.adminFormDiv.hidden = false;
            viewList.adminButton.hidden = true;
        },
        
        closeAdmin:  function() {
            viewList.adminFormDiv.hidden = true;
            viewList.adminButton.hidden = false;
        },
        
        render: function(arrayList) {
            
            viewList.removeExistingList();
            
            for ( let entryList of arrayList) {
                
                // select the cat name place holder in the DOM
                const catNamePlacer = document.getElementById('cat-name');
                // select the photo gallery container in the DOM
                const catClickPlacer = document.getElementById('cat-clicks');
                // select sidebar in the DOM
                let sidebarList = document.getElementById('sidebar-list');
                // create a <li> HTML element
                let newCatListEntry = document.createElement('li');
                // create a <a> HTML element inside the li previously created
                let newCatListLinkEntry = document.createElement('a');
                
                // append the a in the li element
                newCatListEntry.appendChild(newCatListLinkEntry);
                // insert cat's name in the a element
                newCatListLinkEntry.textContent = `${entryList.name}`;
                // append this cat's name in the sidebar in the DOM
                sidebarList.appendChild(newCatListEntry);
                
                // add event listener on the link, to display the corresponding photo
                newCatListLinkEntry.addEventListener('click', (function(object) {
                    return function() {

                        // select the photo gallery container in the DOM
                        const photoGallery = document.getElementById('cat-photo-gallery');

                        // removes any cat name already displayed 
                        while (photoGallery.hasChildNodes()) {
                            photoGallery.removeChild(photoGallery.lastChild);
                        }
                        // add the photo of the current name clicked
                        viewDisplay.photoAdding(object);

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
                        if(object.clickCount === 0){
                            catClickPlacer.textContent = `The photo of ${object.name} has never yet been clicked. Let's start !`;
                        } else if(object.clickCount === 1) {
                            catClickPlacer.textContent = `The photo of ${object.name} has been clicked ${object.clickCount} time.`;
                        } else {
                            catClickPlacer.textContent = `The photo of ${object.name} has been clicked ${object.clickCount} times.`;
                        }
                    };
                })(entryList));
            
            }
            
            
        },
        
        // removes any existing list
        removeExistingList: function() {
            
            // select sidebar in the DOM
            let sidebarList = document.getElementById('sidebar-list');
            //removes any existing child
            while (sidebarList.hasChildNodes()) {
                sidebarList.removeChild(sidebarList.lastChild);
            }
        },

    };

    // first function called, initializing the site
    octopus.init();

});
