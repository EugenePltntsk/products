

export const fetchCountries = (name) => {
   return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(response => {
        if (!response.ok) {
           
            return [];
        }
            return response.json();
        })
    
    
};


// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов

// https://restcountries.com/v2/{service}?fields={field},{field},{field}
// https://restcountries.com/v2/all?fields=name,capital,currencies




// function fetchPosts() {
//     // Change the number of items in the group here  
//     return fetch("https://jsonplaceholder.typicode.com/posts?_limit=5").then(
//       (response) => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//       }
//     );
//   }
