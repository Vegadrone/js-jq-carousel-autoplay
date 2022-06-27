//!################################################ CONSEGNA ################################################:
// * Dato un array contenente una lista di sei immagini(url), creare un carosello come nello screenshot allegato.
// *     MILESTONE 1
// * Per prima cosa, creiamo il markup statico: costruiamo il container e inseriamo un'immagine grande al centro:
// * avremo così la struttura base e gli stili pronti per poterci poi concentrare solamente sull'aspetto logico.
// *     MILESTONE 2
// * Adesso rimuoviamo tutto il markup statico e inseriamo tutte le immagini dinamicamente servendoci dell'array fornito
// * e un semplice ciclo for che concatena un template literal.
// * Tutte le immagini saranno nascoste, tranne la prima, che avrà una classe specifica che la renderà visibile.
// * Al termine di questa fase ci ritroveremo con lo stesso slider stilato nella milestone 1,
// * ma costruito dinamicamente attraverso JavaScript.
// *     MILESTONE 3
// * Al click dell'utente sui bottoni/frecce, il programma cambierà l’immagine attiva,
// * che quindi verrà visualizzata al posto della precedente.
// * BONUS 1:
// * Aggiungere il ciclo infinito del carosello.Ovvero se è attiva la prima immagine e l'utente clicca la freccia
// * per andare all’immagine precedente, dovrà comparire l’ultima immagine dell’array e viceversa.
// * BONUS 2:
// * Aggiungere la visualizzazione thumbnails, realizzate a piacere(pallini o miniature).
// * Tutte le thumbnails avranno una classe inattiva, tranne quella corrispondente all’immagine attiva,
// * che invece avrà una classe attiva(che la distinguerà con un bordo, un colore, ecc).
// * Al click delle frecce, oltre al cambio di immagine attiva, gestire il cambio di miniatura attiva.
// TODO Prima di partire a scrivere codice:
// TODO Non lasciamoci spaventare dalla complessità apparente dell'esercizio, ma analizziamo prima,
// TODO come abbiamo fatto sempre, cosa ci potrebbe aspettare.
// TODO Abbiamo completato ormai da qualche giorno la sessione HTML e CSS,
// TODO se non ci ricordiamo qualcosa andiamo pure a riguardare alcuni argomenti.
// TODO Non dedichiamo però al ripasso più di una mezz'ora, così da non perdere di vista il focus dell'esercizio.
// TODO Consigli del giorno:
// TODO Costruiamo del carosello una versione statica contenente solamente un'immagine. Di questa versione
// TODO statica al momento opportuno commenteremo (oscureremo) alcuni elementi per poterli riprodurre dinamicamente in js.
// TODO Potremo quindi usarli come "template".
// TODO Scriviamo sempre prima per punti il nostro algoritmo in italiano per capire cosa vogliamo fare
// TODO Al momento giusto(ihihhi starà a voi capire quale) rispondete a questa domanda: "Quanti cicli servono?"

//?################################################ ESERCIZIO ################################################


//!ARRAY CON LINK DI IMMAGINI
const images = [
    'https://cdn.photographycourse.net/wp-content/uploads/2022/04/Portrait-vs-Landscape-Featured-Image-3.jpg',
    'https://i.natgeofe.com/n/2a832501-483e-422f-985c-0e93757b7d84/6.jpg',
    'https://cdn.photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg',
    'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg',
    'https://iso.500px.com/wp-content/uploads/2021/02/Torres-Del-Paine-Sunset-By-Paul-Reiffer-2-1500x1000.jpg',
    'https://mymodernmet.com/wp/wp-content/uploads/2020/02/Landscape-Photographer-of-the-Year-Sander-Grefte.jpg'
];

//!CREO COSTANTI PER:
    //! - IL WRAPPER DELLE IMG
    //! - CREAZIONE DELL'ELEMENTO IMG
    //! - BOTTONE NEXT 
    //! - BOTTONE PREVIOUS
//!TUTTO CIò VA RECUPERATO VIA document.getElementById ('nome id') DAL DOCUMENT HTML

const imgWrapper = document.getElementById('img-wrapper');
const imgElement = document.createElement('img')
const nextButton = document.getElementById('next-btn');
const previousButton = document.getElementById('previous-btn');

//!PER EVITARE DI METTERE TUTTE LE IMG A MANO CREO UN CICLO FOR E CI METTO:
    //! - LA COSTANTE PER LA CREAZIONE DEI TAG IMG.
    //! - "container-parent".append PER METTERE ALL'INTERNO I TAG CREATI SOPRA.
    //! - UN "elemento".classList.add PER AGGIUNGERE AD OGNI NUOVO TAG IMG CREATO UNA O + CLASSI A MIA SCELTA.
    //! - UN "elemento".setAttribute ('src', nomeArray [i]) PER METTERE DENTRO OGNI ATTRIBUTO SRC CREATO SU OGNI TAG
    //!   IMG CREATO SOPRA IL LINK CHE CORRISPONDE ALL'INDICE DI OGNI ELEMENTO DELL'ARRAY.

for (let i = 0; i < images.length; i++){
    const imgElement = document.createElement('img');
    imgWrapper.append(imgElement);
    imgElement.classList.add('ms_img');
    imgElement.setAttribute('src', images[i]);
}

//! CREO UNA LISTA DI IMMAGINI PRENDENDO L'IMG WRAPPER E TARGETTANDONE I FIGLI IN QUESTO MODO (imgWrapper.children)
//! I FIGLI SONO STATI GENERATI PRIMA CON IL CICLO FOR
    //! QUESTO SI COMPORTERà COME SE FOSSE UN'ARRAY.
//! CREO UNA LET DANDOGLI UN NOME E SCEGLIENDO IL NUMERO (CHE POI SARà L'INDICE DELL'"ARRAY" LISTA DI IMMAGINI) DA CUI 
    //! VOGLIO PARTIRE.


const imgElementList = imgWrapper.children;
let imgElementActive = 0

//!ASSEGNO LA CLASSE ACTIVE ALL'ELEMENTO DELLA LISTA DI IMG CREATA CHE HO SCELTO CREANDO LA LET. 
//!IN QUESTO MODO L'IMG SI VEDE.

imgElementList[imgElementActive].classList.add('active');

//!FACCIO PARTIRE LEVENT CLICK E DENTRO METTO:
//! - RIMUOVO DALL'ELEMENTO ATTIVO LA CLASSE ACTIVE
//! - INCREMENTO IL CONTATORE DI UNO CON ++ SULLA LET CREATA CON IL NUMERO DELL'INDICE DEL NUOVO "ARRAY" LISTA IMG
//! - CREO UNA CONDIZIONE IF PER IL QUALE SE IL NUMERO DELL'INDICE è UGUALE AL NUMERO DELLA LUNGEZZA DEL NUOVO ARRAY
//! - ESSO RIPARTIRà DA ZERO MANDANDO IN LOOP IL CAROSELLO.
//! - DO ALL'IMMAGINE DOPO (QUELLA CHE è DIVENTATA ATTIVA DOPO AVER DATO ++ AL NUMERO DELL'INDICIE LA CLASSE ACTIVE).
//! - PER OGNI CLICK SUL BOTTONE SUCCEDERà:
//!     - RIMUOVO LA CLASSE ACTIVE DA [0]
//!     - AUMENTO DI UNO E QUINDI [0] DIVENTERà [1] TARGETTANDO L'IMMAGINE CON INDICE 1 NELLA LISTA DELLE IMG
//!     - FINCHè L'INDICE (IN QUESTO CASO [1]) è MINORE DEL NUMERO PIù ALTO NELLA LISTA [5]
//!       IL CAROSELLO ANDRà AVANTI. SE DIVENTA UGUALE L'INDICE RITORNA AD ESSERE [0]
//!     - AGGIUNGO LA CLASSE ACTIVE ALL'ELEMENTO ATTIVO E CIOè [1] 


nextButton.addEventListener('click', function () {

    imgElementList[imgElementActive].classList.remove('active');

    imgElementActive++;

    if (imgElementActive === imgElementList.length) {
        imgElementActive = 0;
    }

    imgElementList[imgElementActive].classList.add('active');
})

const clock = setInterval(slideshow, 3000)

function slideshow() {

    imgElementList[imgElementActive].classList.remove('active');

    imgElementActive++;

    if (imgElementActive === imgElementList.length) {
        imgElementActive = 0;
    }

    imgElementList[imgElementActive].classList.add('active');
}

//!FACCIO PARTIRE LEVENT CLICK E DENTRO METTO:
//! - FUNZIONA UGUALE A SOPRA CON LA DIFFERENZA CHE IL CONTATORE VA A DECREMENTARE --
//! - E CHE L'INDICE PER LOOPARE DEVE ESSERE UGUALE A -1 POICHé IL PRIMO ELEMENTO DELL'ARRAY è UGUALE A 0
//! - IL CONTATORE DEVE RIPARTIRE DA [5] PER          CHé L'ULTIMO ELEMENTO DELL'ARRAY HA INDICE [5] ESSENDO L'ARRAY COMPOSTO
//!   DA 6 ELEMENTI.

previousButton.addEventListener('click', function () {

    imgElementList[imgElementActive].classList.remove('active');

    imgElementActive--;

    if (imgElementActive === -1) {
        imgElementActive = 5;
    }

    imgElementList[imgElementActive].classList.add('active');
})

   
