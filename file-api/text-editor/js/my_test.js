const throttle = ( handler, ms ) => {
  let timeout;
  return () => {
    clearTimeout( timeout );
    timeout = setTimeout( handler, ms );
  }
};

const editor = document.getElementById('editor');
const title = document.querySelector('.text-editor__title');
const textContent = document.querySelector('.text-editor__content');
const hint = document.querySelector('.text-editor__hint');
const hintContent = document.querySelector('.text-editor__hint-content');

textContent.addEventListener('dragover', (event) => {
	event.preventDefault();
	hint.classList.add('text-editor__hint_visible');
})
textContent.addEventListener('dragleave', (event) => {
	event.preventDefault();
	hint.classList.remove('text-editor__hint_visible');
})

textContent.addEventListener('drop', onDrop);

function onDrop(event) {
	event.preventDefault();
	const files = Array.from(event.dataTransfer.files);
	console.log(event);
	title.textContent = files[0].name;
	// textContent.value = files[0].
}





// class TextEditor {
//   constructor( container, storageKey = '_text-editor__content' ) {
//     this.container = container;
//     this.contentContainer = container.querySelector( '.text-editor__content' );
//     this.hintContainer = container.querySelector( '.text-editor__hint' );
//     this.filenameContainer = container.querySelector( '.text-editor__filename' );
//     this.storageKey = storageKey;
//     this.registerEvents();
//     this.load( this.getStorageData());
//   }
//   registerEvents() {
//     const save = throttle( this.save.bind( this ), 1000 );
//     this.contentContainer.addEventListener( 'input', save );
//   }
//   loadFile( e ) {
                
//   }
//   readFile( file ) {

//   }
//   setFilename( filename ) {
//     this.filenameContainer.textContent = filename;
//   }
//   showHint( e ) {
//     preventDefault();
//     this.hintContainer.classList.add('text-editor__hint_visible');
//   }
//   hideHint() {
//     this.hintContainer.classList.remove('text-editor__hint_visible');
//   }
//   load( value ) {
//     this.contentContainer.value = value || '';
//   }
//   getStorageData() {
//     return localStorage[ this.storageKey ];
//   }
//   save() {
//     localStorage[ this.storageKey ] = this.contentContainer.value;
//   }

//   // contentContainer.addEventListener( 'dragover', showHint );
  

// }

// new TextEditor( document.getElementById( 'editor' ));

// document.getElementById( 'editor' ).addEventListener('dragover', showHint)