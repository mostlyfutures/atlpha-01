interface ImageData {
  id: number | string;
  title: string;
  author: string;
  description: string;
  url: { small: string; large: string };
  dimensions: { width: number; height: number };
}

const rawData = [
    {
      "id": 1,
      "url": "https://picsum.photos/id/10/400/750",
      "title": "Mountain Majesty",
      "author": "Liam O'Connell",
      "description": "A lone hiker stands before a vast, snow-capped mountain range."
    },
    {
      "id": 2,
      "url": "https://picsum.photos/id/20/400/500",
      "title": "Urban Geometry",
      "author": "Chen Wei",
      "description": "Sharp architectural lines create a mesmerizing pattern against a clear blue sky."
    },
    {
      "id": 3,
      "url": "https://picsum.photos/id/30/400/600",
      "title": "Forgotten Pages",
      "author": "Isabella Rossi",
      "description": "A dusty, leather-bound book lies open on a rustic wooden table."
    },
    {
      "id": 4,
      "url": "https://picsum.photos/id/40/400/450",
      "title": "Golden Hour Fields",
      "author": "Freya Nilsson",
      "description": "Warm evening light bathes a field of wheat in a golden glow."
    },
    {
      "id": 5,
      "url": "https://picsum.photos/id/50/400/800",
      "title": "Coastal Fury",
      "author": "Kaelen Cross",
      "description": "Powerful waves crash against jagged cliffs during a dramatic sea storm."
    },
    {
      "id": 6,
      "url": "https://picsum.photos/id/60/400/520",
      "title": "Market Colors",
      "author": "Sofia Al-Jamil",
      "description": "A vibrant spice market bustles with activity and rich, earthy colors."
    },
    {
      "id": 7,
      "url": "https://picsum.photos/id/70/400/680",
      "title": "Forest Cathedral",
      "author": "Elara Vance",
      "description": "Sunbeams pierce the dense fog of a serene and ancient pine forest."
    },
    {
      "id": 8,
      "url": "https://picsum.photos/id/80/400/480",
      "title": "Midnight Commute",
      "author": "Marcus Thorne",
      "description": "The blurred lights of a subway train speeding through a dark tunnel."
    },
    {
      "id": 9,
      "url": "https://picsum.photos/id/90/400/720",
      "title": "Desert Solitude",
      "author": "Anya Petrova",
      "description": "Rippling sand dunes stretch to the horizon under a vast, empty sky."
    },
    {
      "id": 10,
      "url": "https://picsum.photos/id/100/400/550",
      "title": "Reflective Puddle",
      "author": "Noah Sterling",
      "description": "A city skyline is perfectly mirrored in a puddle on a wet pavement."
    },
    {
      "id": 11,
      "url": "https://picsum.photos/id/101/400/630",
      "title": "Autumn's Embrace",
      "author": "Liam O'Connell",
      "description": "A single, vibrant red leaf rests on a mossy stone."
    },
    {
      "id": 12,
      "url": "https://picsum.photos/id/102/400/400",
      "title": "Morning Ritual",
      "author": "Isabella Rossi",
      "description": "Steam rises from a freshly brewed cup of coffee on a windowsill."
    },
    {
      "id": 13,
      "url": "https://picsum.photos/id/103/400/780",
      "title": "Stairway to Nowhere",
      "author": "Marcus Thorne",
      "description": "An abstract view of a winding spiral staircase from below."
    },
    {
      "id": 14,
      "url": "https://picsum.photos/id/104/400/580",
      "title": "The Watcher",
      "author": "Freya Nilsson",
      "description": "A curious fox pauses in a snowy landscape, looking directly at the camera."
    },
    {
      "id": 15,
      "url": "https://picsum.photos/id/106/400/660",
      "title": "Industrial Sunset",
      "author": "Kaelen Cross",
      "description": "The silhouette of a factory is framed by a fiery, polluted sunset."
    },
    {
      "id": 16,
      "url": "https://picsum.photos/id/108/400/490",
      "title": "Library Whispers",
      "author": "Elara Vance",
      "description": "Rows of old books create a warm, inviting pattern in a quiet library."
    },
    {
      "id": 17,
      "url": "https://picsum.photos/id/110/400/710",
      "title": "Glacial Blue",
      "author": "Anya Petrova",
      "description": "Intense blue light emanates from a crevasse in a massive glacier."
    },
    {
      "id": 18,
      "url": "https://picsum.photos/id/111/400/530",
      "title": "Street Musician's Soul",
      "author": "Sofia Al-Jamil",
      "description": "The weathered hands of a musician playing a soulful melody on a guitar."
    },
    {
      "id": 19,
      "url": "https://picsum.photos/id/113/400/610",
      "title": "Rain on Glass",
      "author": "Noah Sterling",
      "description": "Abstract patterns of raindrops trickling down a window pane."
    },
    {
      "id": 20,
      "url": "https://picsum.photos/id/117/400/470",
      "title": "The Weaver's Loom",
      "author": "Chen Wei",
      "description": "Colorful threads are intricately woven on a traditional hand loom."
    },
    {
      "id": 21,
      "url": "https://picsum.photos/id/119/400/740",
      "title": "Canyon Depths",
      "author": "Liam O'Connell",
      "description": "Looking down into a deep, winding river canyon carved through red rock."
    },
    {
      "id": 22,
      "url": "https://picsum.photos/id/120/400/560",
      "title": "Neon Diner Sign",
      "author": "Marcus Thorne",
      "description": "A retro neon sign glows brightly against the dark night sky."
    },
    {
      "id": 23,
      "url": "https://picsum.photos/id/122/400/690",
      "title": "Ocean's Breath",
      "author": "Kaelen Cross",
      "description": "The foamy texture of a wave receding from a sandy beach."
    },
    {
      "id": 24,
      "url": "https://picsum.photos/id/124/400/510",
      "title": "Artist's Studio",
      "author": "Isabella Rossi",
      "description": "A chaotic but inspiring glimpse of a painter's messy workspace."
    },
    {
      "id": 25,
      "url": "https://picsum.photos/id/125/400/620",
      "title": "Winter's Silence",
      "author": "Anya Petrova",
      "description": "A lone, snow-covered cabin sits peacefully in a silent winter forest."
    },
    {
      "id": 26,
      "url": "https://picsum.photos/id/133/400/730",
      "title": "Skyscraper's Peak",
      "author": "Chen Wei",
      "description": "Looking straight up the facade of a modern glass skyscraper into the clouds."
    },
    {
      "id": 27,
      "url": "https://picsum.photos/id/135/400/440",
      "title": "Dew on a Petal",
      "author": "Freya Nilsson",
      "description": "A macro shot of a single drop of dew resting on a vibrant flower petal."
    },
    {
      "id": 28,
      "url": "https://picsum.photos/id/137/400/570",
      "title": "Abandoned Tracks",
      "author": "Noah Sterling",
      "description": "Overgrown railway tracks disappear into the distant, misty woods."
    },
    {
      "id": 29,
      "url": "https://picsum.photos/id/145/400/670",
      "title": "Lantern Festival",
      "author": "Sofia Al-Jamil",
      "description": "Hundreds of glowing paper lanterns float up into the twilight sky."
    },
    {
      "id": 30,
      "url": "https://picsum.photos/id/147/400/540",
      "title": "The Old Lighthouse",
      "author": "Elara Vance",
      "description": "A historic lighthouse stands guard on a windswept, rocky point."
    }
  ];
  
  const images: ImageData[] = rawData.map(img => {
      const urlParts = img.url.split('/');
      const height = parseInt(urlParts[urlParts.length - 1], 10);
      const width = parseInt(urlParts[urlParts.length - 2], 10);
      const imageId = urlParts[urlParts.length - 3];
      
      return {
          id: img.id,
          title: img.title,
          author: img.author,
          description: img.description,
          url: {
              small: img.url,
              large: `https://picsum.photos/id/${imageId}/${width * 2}/${height * 2}`
          },
          dimensions: {
              width: width,
              height: height
          }
      };
  });
  
  export default images; 