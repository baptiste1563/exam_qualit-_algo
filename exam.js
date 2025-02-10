// ----------------------------------------------- fonction a tester --------------------------------------------------------

// find artist index

function findArtistIndex(artists, name) {
  for (let i = 0; i < artists.length; i++) {
    if (artists[i].name === name) {
      return artists[i].id;
    }
  }
  return -1;
}


function findArtistIndexopti(artists, name) {
    let left = 0;
    let right = artists.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (artists[mid].name === name) {
            return artists[mid].id;
        } else if (artists[mid].name < name) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
  }

function assignStages(artists, stages) {
  for (let stage of stages) {
    for (let artist of artists) {
      if (stage.genres.includes(artist.genre)) {
        artist.stage = stage.id;
        break;
      }
    }
  }
}

// ------------------------------------------------- outils pour le benchmark -------------------------------------------------

// find artist index

const artists_list = [{name: "artist1", id: 1}, {name: "artist2", id: 2}, {name: "artist3", id: 3}, {name: "artist4", id: 4}, {name: "artist5", id: 5}];

function generateRandomName() {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  function generateArtists(n) {
    const artists = [];
    for (let i = 0; i < n; i++) {
      const newArtist = {
        id: (i + 1).toString(),
        name: generateRandomName()
      };
      artists.push(newArtist);
    }
    artists.sort((a, b) => a.name.localeCompare(b.name));
    return artists;
  }
  
  // assign stages
  // Example artists and stages for testing
const artists = [
  { id: '1', name: 'Artist1', genre: 'Jazz', stage: '' },
  { id: '2', name: 'Artist2', genre: 'Jazz', stage: '' },
  { id: '3', name: 'Artist3', genre: 'Pop', stage: '' },
  { id: '4', name: 'Artist4', genre: 'Rock', stage: '' },
  { id: '5', name: 'Artist5', genre: 'Classical', stage: '' }
];

const stages = [
  { id: 'A', name: 'Stage A', genres: ['Rock'] },
  { id: 'B', name: 'Stage B', genres: ['Jazz'] },
  { id: 'C', name: 'Stage C', genres: ['Classical'] }
];


// Assign stages to artists
assignStages(artists, stages);
console.log(artists);

  function Benchmark() {
    console.log("Benchmark findArtistIndex ... ");
    console.log("Creation données ... ");
    const n = 1000000; // Nombre d'artistes à générer
    const artists = generateArtists(n);


    console.log("Test avec liste predefini : normal");
    if (findArtistIndex(artists_list, "artist5") === 5) {
        console.log("Test reussi");
    } else {
        console.log("Test echoué");
    };
    console.log("Test avec liste predefini : optimisé");
    if (findArtistIndexopti(artists_list, "artist5") === 5) {
        console.log("Test reussi");
    } else {
        console.log("Test echoué");
    };

    console.log("Test avec liste aleatoire : normal");
    const start = performance.now();
    const artistIndex = findArtistIndex(artists, "artisteImpossibleATrouver");
    const end = performance.now();
    console.log(`temps: ${end - start} ms`);

    console.log("Test avec liste aleatoire : optimisé");
    const startopti = performance.now();
    const artistIndexopti = findArtistIndexopti(artists, "artisteImpossibleATrouver");
    const endopti = performance.now();
    console.log(`temps: ${endopti - startopti} ms`);

    if (artistIndex === -1 && artistIndexopti === -1) {
        console.log("Test reussi");
    } else {
        console.log("Test echoué");
    };

    console.log("Benchmark assignStages ... ");

    console.log("Test normal");
    

  }


  Benchmark()