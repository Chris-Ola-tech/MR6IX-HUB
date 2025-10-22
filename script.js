// === HEADER SCROLL EFFECT ===
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    // When scrolled, make background solid
    header.querySelector('.header-wrapper').style.backgroundColor = 'cadetblue';
    header.querySelector('.header-wrapper').style.transition = 'background-color 0.3s ease';
  } else {
    // When at top, make background transparent
    header.querySelector('.header-wrapper').style.backgroundColor = 'transparent';
  }
});


// === NOTIFICATION DROPDOWN ===
const notificationBtn = document.querySelector('.btn');
const notificationBadge = document.querySelector('.notification');
let notificationDropdown = null;

// Create notification dropdown HTML
function createNotificationDropdown() {
  const dropdown = document.createElement('div');
  dropdown.className = 'notification-dropdown';
  dropdown.innerHTML = `
    <div class="notification-dropdown-header">
      <h3>Notifications</h3>
      <span class="notification-count">4 New</span>
    </div>
    <div class="notification-list">
      <div class="notification-item">
        <div class="notification-img-placeholder">
        <img src="./assets/trending/dk.jpg"   alt="Drake" class="notification-artist-img"> 
        </div>
        <div class="notification-content">
          <h4>Drake hit 40 million views on MR6IX</h4>
          <p>His latest single is breaking records!</p>
          <span class="notification-time">2 mins ago</span>
        </div>
      </div>
      
      <div class="notification-item">
        <div class="notification-img-placeholder">
      <img src="./assets/trending/nicki.jpg"   alt="Nicki Minaj" class="notification-artist-img"> 
       </div>
        <div class="notification-content">
          <h4>Nicki Minaj just dropped an album</h4>
          <p>"Pink Friday 3" is now available</p>
          <span class="notification-time">1 hour ago</span>
        </div>
      </div>
      
      <div class="notification-item">
        <div class="notification-img-placeholder">
          <img src="./assets/trending/jw.jpg"   alt="Juice Wrld" class="notification-artist-img"> 
        </div>
        <div class="notification-content">
          <h4>Juice WRLD trending on MR6IX</h4>
          <p>"Lucid Dreams" hit 500M streams</p>
          <span class="notification-time">3 hours ago</span>
        </div>
      </div>
      
      <div class="notification-item">
        <div class="notification-img-placeholder">
          <img src="./assets/trending/wizzy.jpg"   alt="wizkid" class="notification-artist-img"> 
        </div>
        <div class="notification-content">
          <h4>Wizkid releases new single</h4>
          <p>"Essence Remix" featuring Tems</p>
          <span class="notification-time">5 hours ago</span>
        </div>
      </div>
  `;
  
  document.querySelector('.btn-wrap').appendChild(dropdown);
  notificationDropdown = dropdown;
}

// Toggle notification dropdown
notificationBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  
  if (!notificationDropdown) {
    createNotificationDropdown();
  }
  
  notificationDropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (notificationDropdown && !notificationDropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
    notificationDropdown.classList.remove('active');
  }
});

// Prevent dropdown from closing when clicking inside it
document.addEventListener('click', (e) => {
  if (notificationDropdown && notificationDropdown.contains(e.target)) {
    e.stopPropagation();
  }
});










// === MOBILE MENU TOGGLE ===
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const hamburger = document.querySelector('.hamburger');

// Open mobile menu when hamburger is clicked
hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  mobileMenuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
});

// Close mobile menu when X button is clicked
mobileMenuClose.addEventListener('click', (e) => {
  e.stopPropagation();
  mobileMenuOverlay.classList.remove('active');
  document.body.style.overflow = 'auto'; // Enable scrolling
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (mobileMenuOverlay.classList.contains('active') && 
      !mobileMenuOverlay.contains(e.target) && 
      !hamburger.contains(e.target)) {
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Close menu when clicking any link
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});


// === HERO SECTION ANIMATIONS ===

// 1. Create Floating Particles
function createHeroParticles() {
  const container = document.getElementById('heroParticles');
  const particles = ['♪', '♫', '♬', '♩', '🎵︎', '🎶'];
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle-note';
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.fontSize = (Math.random() * 1 + 1) + 'rem';
    container.appendChild(particle);
  }
}

// 2. Typing Effect
const typingTexts = [
  'From Drake, Juice WRLD, Nicki Minaj & Wizkid',
  'High Quality MP3 Downloads',
  'Latest Hits & Trending Music',
  'Your Favorite Artists in One Place'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
  const typingElement = document.getElementById('typingText');
  const currentText = typingTexts[textIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
    typingSpeed = 500;
  }
  
  setTimeout(typeText, typingSpeed);
}

// 3. Stats Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      
      if (current < target) {
        if (isDecimal) {
          counter.textContent = current.toFixed(1);
        } else {
          counter.textContent = Math.floor(current).toLocaleString();
        }
        requestAnimationFrame(updateCounter);
      } else {
        if (isDecimal) {
          counter.textContent = target.toFixed(1);
        } else {
          counter.textContent = target.toLocaleString();
        }
      }
    };
    
    updateCounter();
  });
}

// 4. Scroll-triggered Stats Animation
let statsAnimated = false;

function checkStatsInView() {
  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection || statsAnimated) return;
  
  const rect = statsSection.getBoundingClientRect();
  const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
  
  if (isInView && !statsAnimated) {
    animateCounters();
    statsAnimated = true;
  }
}

// 5. Card Fade-in Animation
function animateCards() {
  const cards = document.querySelectorAll('.artist-card-hero');
  
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    }, index * 100);
  });
}

// Initialize Hero Animations
document.addEventListener('DOMContentLoaded', () => {
  createHeroParticles();
  typeText();
  animateCards();
  
  // Trigger stats animation on scroll
  window.addEventListener('scroll', checkStatsInView);
  checkStatsInView(); // Check on load
});

// Button Click Events (You can customize these)
document.querySelectorAll('.hero-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const btnText = btn.querySelector('span').textContent;
    console.log(`${btnText} button clicked!`);
    // Add your navigation logic here
  });
});




// ===  REVEAL ANIMATIONS ===
function revealOnScroll() {
  const reveals = document.querySelectorAll('.scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-up');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 100;
    
    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('revealed');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// === SEE MORE TRENDING MUSIC ===
const seeMoreBtn = document.getElementById('seeMoreBtn');
const hiddenSongs = document.querySelectorAll('.hidden-song');

seeMoreBtn.addEventListener('click', () => {
  const isShowing = seeMoreBtn.classList.contains('hide-songs');
  
  if (isShowing) {
    // Hide songs
    hiddenSongs.forEach(song => {
      song.classList.remove('show');
    });
    seeMoreBtn.innerHTML = '<span>See More Trending Music</span><span class="arrow">↓</span>';
    seeMoreBtn.classList.remove('hide-songs');
  } else {
    // Show songs
    hiddenSongs.forEach(song => {
      song.classList.add('show');
    });
    seeMoreBtn.innerHTML = '<span>Show Less</span><span class="arrow">↑</span>';
    seeMoreBtn.classList.add('hide-songs');
    
    // Scroll to reveal new songs
    setTimeout(() => {
      hiddenSongs[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
});

// === VOLUME SLIDER ===
const volumeSliders = document.querySelectorAll('.volume-slider');

volumeSliders.forEach(slider => {
  slider.addEventListener('input', (e) => {
    const value = e.target.value;
    // Visual feedback
    e.target.style.background = `linear-gradient(to right, #ff007f 0%, #6a00ff ${value}%, rgba(255,255,255,0.1) ${value}%, rgba(255,255,255,0.1) 100%)`;
    
    // You can add actual audio control here
    console.log(`Volume set to: ${value}%`);
  });
});

// === INFO MODAL ===
const infoModal = document.getElementById('infoModal');
const closeInfoModal = document.getElementById('closeInfoModal');
const infoButtons = document.querySelectorAll('.info-btn');

// Sample song data (YOU CUSTOMIZE THIS)
const songsData = {
  1: {
    title: "BAND4BAND",
    artist: "Central Cee & Lil Baby",
    album: "Can’t Rush Greatness",
    date: "2024",
    genre: "British hip hop / UK drill",
    duration: "2:21"
  },
  2: {
    title: "Not Like Us",
    artist: "Kendrick Lamare",
    album: "",
    date: "2024",
    genre: "West Coast hip hop / Hyphy",
    duration: "4:34"
  },
  3: {
    title: "God's Plan",
    artist: "Drake",
    album: "Scorpion",
    date: "2018",
    genre: "Hip-Hop/Rap",
    duration: "3:19"
  },
  4: {
  title: "Ordinary",
  artist: "Alex Warren",
  album: "You’ll Be Alright, Kid",
  date: "2025",
  genre: "Pop / Chamber Pop",
  duration: "3:06"
},
  5: {
    title: "Die With a Smile",
  artist: "Lady Gaga & Bruno Mars",
  album: "Mayhem",
  date: "2024",
  genre: "Pop / Soft Rock",
  duration: "4:09"
  },
  6: {
    title: "APT.",
  artist: "ROSÉ & Bruno Mars",
  album: "rosie",
  date: "2024",
  genre: "Pop / Pop-punk / New Wave",
  duration: "2:49"
  },
  7: {
    title: "Gimme Dat",
  artist: "Ayra Starr & Wizkid",
  album: "Single",
  date: "2025",
  genre: "Afrobeats",
  duration: "3:44"
  },
  8: {
    title: "Ozeba",
  artist: "Rema",
  album: "HEIS",
  date: "2024",
  genre: "Afrobeats / Afrorave",
  duration: "2:17"
  },
  9: {
    title: "Texas Hold 'Em",
  artist: "Beyoncé",
  album: "Cowboy Carter",
  date: "2024",
  genre: "Country Pop / Western / Soul",  // blends country pop, western and soul influences :contentReference[oaicite:0]{index=0}
  duration: "3:53"
  },
  10: {
    title: "With You",
  artist: "Davido featuring Omah Lay",
  album: "5ive",
  date: "2025",
  genre: "Afrobeats",
  duration: "3:34"
  },
  11: {
    title: "REBEL HEART",
  artist: "IVE",
  album: "IVE EMPATHY",
  date: "2025",
  genre: "K-pop",
  duration: "3:08"
  },
  12: {
    title: "Blue",
  artist: "Yung Kai",
  album: "Stay with the Ocean, I’ll Find You",
  date: "2024",
  genre: "Indie Pop / Alternative Pop",
  duration: "3:34"
  },
  // Add data for songs 3-12
};

infoButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const songId = e.currentTarget.getAttribute('data-song');
    const songData = songsData[songId] || songsData[1];
    
    // Populate modal
    document.getElementById('infoTitle').textContent = songData.title;
    document.getElementById('infoArtist').textContent = songData.artist;
    document.getElementById('infoAlbum').textContent = songData.album;
    document.getElementById('infoDate').textContent = songData.date;
    document.getElementById('infoGenre').textContent = songData.genre;
    document.getElementById('infoDuration').textContent = songData.duration;
    
    infoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

closeInfoModal.addEventListener('click', () => {
  infoModal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// === LYRICS MODAL ===
const lyricsModal = document.getElementById('lyricsModal');
const closeLyricsModal = document.getElementById('closeLyricsModal');
const lyricsButtons = document.querySelectorAll('.lyrics-btn');

// Sample lyrics (YOU ADD YOUR LYRICS HERE)
const songsLyrics = {
  1: `[Verse 1: Central Cee]
I'm not in the mood cah my flight delayed
So I jumped on a private jet and I'm askin' the pilot the ETA
Lambo' parked on the landin' strip, everyone in my gang and my DJ paid
Why's my man talkin' 'bout inshallah? These times, he don't even pray
Why's my man wearing a Jesus piece?
How does she squeeze in them jeans? Big behind and petitest waist
Take time with the GBG, we don't beef nobody like GBK
Woke up on the wrong side of bed, so he's gonna get slappеd if I don't have my P's today
I love my young boy, I won't lead him 'stray, I'm stuck to Lil Bro likе PVA
Paid already, I don't need no hit song
We don't need ID, Lil Bro seventeen in the club, he ain't scrollin' TikTok
F's just saw him a thick one, "Which one? Who do you want, bro? Pick one"
If I shoot my shot, I'll hit one, matter of time till I get them all ticked off
Alright

[Chorus: Central Cee & Lil Baby]
We can go band for band
Fuck that, we can go M for M
Quarter mil' for the Maybach truck
Double R with the factory rims
I got the 90, the Urus, the Virgil, the Brabus, I'm really a threat
It's got to the point that I don't even care
I got jewels in the safe that I don't even wear

[Verse 2: Lil Baby & Central Cee]
Uh, bro'll do it for some shoes and some clothes, you'll see what he'll do for a necklace
'Rari truck look like a spider, it's crawlin' a dollar on just accessories (Damn)
She made me wanna go harder, I like her whole aura, I think I'm obsessed with her
They hit him up on his birthday, did him the worst way, he had a death wish
I get right under they skin, I don't even try, I guess I can't help that shit
I'ma have love for bro for life if we talk or not, I step with him
Of course you can beat me at talkin', ain't no back-and-forth, wait 'til we catch up with them niggas
Knockin' a bag and makin' the opposite mad, I done fell in love with it
UK Selfridges with a cute one (Ooh)
Bank account look good, this a new one (Yeah)
You the type like to type on computers (Wow)
Got a mask, but he ain't no shooter (Haha)
Top ten, but she don't act bougie
Me and your friends can go to Aruba
Hit France, it depend on my mood
This a Maybach van, this ain't no Uber
We can go band for band
Fuck that, we can go M for M
Mama got a body like Kim and them
Mama been killin' that gym
We can go watch for watch, from chain to chain, the rings, I'm him
I done got rich, but I'm still with the shit, land in London and go to the ends
[Chorus: Central Cee & Lil Baby]
We can go band for band
Fuck that, we can go M for M
Quarter mil' for the Maybach truck
Double R with the factory rims
I got the 90, the Urus, the Virgil, the Brabus, I'm really a threat
It's got to the point that I don't even care
I got jewels in the safe that I don't even wear`,
  2: `[Intro]
Psst, I see dead people
(Mustard on the beat, ho)

[Verse 1]
Ayy, Mustard on the beat, ho
Deebo any rap nigga, he a free throw
Man down, call an amberlamps, tell him, "Breathe, bro"
Nail a nigga to the cross, he walk around like Teezo
What's up with these jabroni-ass niggas tryna see Compton?
The industry can hate me, fuck 'em all and they mama
How many opps you really got? I mean, it's too many options
I'm finna pass on this body, I'm John Stockton
Beat your ass and hide the Bible if God watchin'
Sometimes you gotta pop out and show niggas
Certified boogeyman, I'm the one that up the score with 'em
Walk him down, whole time, I know he got some ho in him
Pole on him, extort shit, bully Death Row on him
Say, Drake, I hear you like 'em young
You better not ever go to cell block one
To any bitch that talk to him and they in love
Just make sure you hide your lil' sister from him
They tell me Chubbs the only one that get your hand-me-downs
And Party at the party playin' with his nose now
And Baka got a weird case, why is he around?
Certified Lover Boy? Certified pedophiles
Wop, wop, wop, wop, wop, Dot, fuck 'em up
Wop, wop, wop, wop, wop, I'ma do my stuff
Why you trollin' like a bitch? Ain't you tired?
Tryna strike a chord and it's probably A minor
[Chorus]
They not like us, they not like us, they not like us
They not like us, they not like us, they not like us

[Verse 2]
You think the Bay gon' let you disrespect Pac, nigga?
I think that Oakland show gon' be your last stop, nigga
Did Cole foul, I don't know why you still pretendin'
What is the owl? Bird niggas and burnt bitches, go
The audience not dumb
Shape the stories how you want, hey, Drake, they're not slow
Rabbit hole is still deep, I can go further, I promise
Ain't that somethin'? B-Rad stands for bitch and you Malibu most wanted
Ain't no law, boy, you ball boy, fetch Gatorade or somethin'
Since 2009, I had this bitch jumpin'
You niggas'll get a wedgie, be flipped over your boxers
What OVO for? The "Other Vaginal Option"? Pussy
Nigga better straighten they posture, got famous all up in Compton
Might write this for the doctorate, tell the pop star quit hidin'
Fuck a caption, want action, no accident
And I'm hands-on, he fuck around, get polished
Fucked on Wayne girl while he was in jail, that's connivin'
Then get his face tatted like a bitch apologizin'
I'm glad DeRoz' came home, y'all didn't deserve him neither
From Alondra down to Central, nigga better not speak on Serena
And your homeboy need subpoena, that predator move in flocks
That name gotta be registered and placed on neighborhood watch
I lean on you niggas like another line of Wock'
Yeah, it's all eyes on me, and I'ma send it up to Pac, ayy
Put the wrong label on me, I'ma get 'em dropped, ayy
Sweet Chin Music and I won't pass the aux, ayy
How many stocks do I really have in stock? Ayy
One, two, three, four, five, plus five, ayy
Devil is a lie, he a 69 God, ayy
Freaky-ass niggas need to stay they ass inside, ayy
Roll they ass up like a fresh pack of 'za, ayy
City is back up, it's a must, we outside, ayy

[Chorus]
They not like us, they not like us, they not like us
They not like us, they not like us, they not like us

[Verse 3]
Once upon a time, all of us was in chains
Homie still doubled down callin' us some slaves
Atlanta was the Mecca, buildin' railroads and trains
Bear with me for a second, let me put y'all on game
The settlers was usin' townfolk to make 'em richer
Fast-forward, 2024, you got the same agenda
You run to Atlanta when you need a check balance
Let me break it down for you, this the real nigga challenge
You called Future when you didn't see the club (Ayy, what?)
Lil Baby helped you get your lingo up (What?)
21 gave you false street cred
Thug made you feel like you a slime in your head (Ayy, what?)
Quavo said you can be from Northside (What?)
2 Chainz say you good, but he lied
You run to Atlanta when you need a few dollars
No, you not a colleague, you a fuckin' colonizer
The family matter and the truth of the matter
It was God's plan to show y'all the liar

[Bridge]
Mm
Mm-mm
He a fan, he a fan, he a fan (Mm)
He a fan, he a fan, he a
Freaky-ass nigga, he a 69 God
Freaky-ass nigga, he a 69 God
Hey, hey, hey, hey, run for your life
Hey, hey, hey, hey, run for your life
Freaky-ass nigga, he a 69 God
Freaky-ass nigga, he a 69 God
Hey, hey, hey, hey, run for your life
Hey, hey, hey, hey, run for your life
Let me hear you say, "OV-ho" (OV-ho)
Say, "OV-ho" (OV-ho)
Then step this way, step that way
Then step this way, step that way

[Outro]
Are you my friend?
Are we locked in?
Then step this way, step that way
Then step this way, step that way`,
3: `[Intro]
And they wishin' and wishin'
And wishin' and wishin', they wishin' on me
Yeah

[Verse 1]
I been movin' calm, don't start no trouble with me
Tryna keep it peaceful is a struggle for me
Don't pull up at 6 a.m. to cuddle with me
You know how I like it when you lovin' on me
I don't wanna die for them to miss me
Yes, I see the things that they wishin' on me
Hope I got some brothers that outlive me
They gon' tell the story, shit was different with me

[Pre-Chorus]
God's plan, God's plan
I hold back, sometimes, I won't, yeah
I feel good, sometimes, I don't (Ayy, don't)
I finessed down Weston Road (Ayy, 'nessed)
Might go down a G-O-D (Yeah, wait)
I go hard on Southside G (Yeah, wait)
I make sure that north-side eat
And still

[Chorus]
Bad things
It's a lot of bad things that they wishin' and wishin'
And wishin' and wishin', they wishin' on me
Bad things
It's a lot of bad things that they wishin' and wishin'
And wishin' and wishin', they wishin' on me
Yeah, ayy, ayy
[Verse 2]
She say, "Do you love me?" I tell her, "Only partly
I only love my bed and my mama, I'm sorry"
Fifty Dub, I even got it tatted on me
Eighty-one, they'll bring the crashers to the party
And you know me
Turn the O2 into the O3, dog
Without 40, Oli, there'd be no me
'Magine if I never met the broskies

[Pre-Chorus]
God's plan, God's plan
I can't do this on my own, ayy (No, ayy)
Someone watchin' this shit close (Yep, close)
I've been me since Scarlett Road, ayy (Road, ayy)
Might go down as G-O-D (Yeah, wait, yeah)
I go hard on Southside G (Ayy, wait, ayy)
I make sure that north-side eat, yeah
And still

[Chorus]
Bad things
It's a lot of bad things that they wishin' and wishin'
And wishin' and wishin', they wishin' on me
Yeah, yeah
Bad things
It's a lot of bad things that they wishin' and wishin'
And wishin' and wishin', they wishin' on me
Yeah`,
4: `[Verse 1]
They say, "The holy water's watered down
And this town's lost its faith
Our colors will fade eventually"
So, if our time is runnin' out
Day after day
We'll make the mundane our masterpiece

[Pre-Chorus]
Oh, my, my
Oh, my, my love
I take one look at you

[Chorus]
You're takin' me out of the ordinary
I want you layin' me down 'til we're dead and buried
On the edge of your knife, stayin' drunk on your vine
The angels up in the clouds are jealous knowin' we found
Somethin' so out of the ordinary
You got me kissin' thе ground of your sanctuary
Shatter me with your touch, oh, Lord, return mе to dust
The angels up in the clouds are jealous knowin' we found

[Verse 2]
Hopeless hallelujah
On this side of Heaven's gate
Oh, my life, how do ya
Breathe and take my breath away?
At your altar, I will pray
You're the sculptor, I'm the clay
[Pre-Chorus]
Oh, my, my

[Chorus]
You're takin' me out of the ordinary
I want you layin' me down 'til we're dead and buried
On the edge of your knife, stayin' drunk on your vine
The angels up in the clouds are jealous knowin' we found
Somethin' so out (Out) of the ordinary (Ordinary)
You got me kissing the ground (Ground) of your sanctuary (Sanctuary)
Shatter me with your touch, oh, Lord, return me to dust
The angels up in the clouds are jealous knowin' we found

[Bridge]
Somethin' so heavenly, higher than ecstasy
Whenever you're next to me, oh, my, my
World was in black and white until I saw your light
I thought you had to die to find

[Chorus]
Somethin' so out of the ordinary
I want you laying me down 'til we're dead and buried
On the edge of your knife, stayin' drunk on your vine
The angels up in the clouds are jealous knowin' we found
Somethin' so out (Out) of the ordinary
You got me kissing the ground (Ground) of your sanctuary (Sanctuary)
Shatter me with your touch, oh, Lord, return me to dust
The angels up in the clouds are jealous knowin' we found`,
5: `[Intro: Bruno Mars]
(Ooh, ooh)

[Verse 1: Bruno Mars]
I, I just woke up from a dream
Where you and I had to say goodbye
And I don't know what it all means
But since I survived, I realized

[Pre-Chorus: Bruno Mars]
Wherever you go, that's where I'll follow
Nobody's promised tomorrow
So I'ma love you every night like it's the last night
Like it's the last night

[Chorus: Bruno Mars]
If the world was ending
I'd wanna be next to you
If the party was over
And our time on Earth was through
I'd wanna hold you just for a while
And die with a smile
If the world was ending
I'd wanna be next to you

[Post-Chorus: Bruno Mars]
(Ooh, ooh)
[Verse 2: Lady Gaga, Lady Gaga & Bruno Mars]
Ooh, lost, lost in the words that we scream
I don't even wanna do this anymore
'Cause you already know what you mean to me
And our love's the only war worth fighting for

[Pre-Chorus: Lady Gaga & Bruno Mars]
Wherever you go, that's where I'll follow
Nobody's promised tomorrow
So I'ma love you every night like it's the last night
Like it's the last night

[Chorus: Lady Gaga & Bruno Mars, Lady Gaga]
If the world was ending
I'd wanna be next to you
If the party was over
And our time on Earth was through
I'd wanna hold you just for a while
And die with a smile
If the world was ending
I'd wanna be next to you

[Bridge: Bruno Mars, Lady Gaga, Both]
Right next to you
Next to you
Right next to you
Oh-oh
[Chorus: Lady Gaga, Lady Gaga & Bruno Mars, Bruno Mars]
If the world was ending
I'd wanna be next to you
If the party was over
And our time on Earth was through
I'd wanna hold you just for a while
And die with a smile
If the world was ending
I'd wanna be next to you
If the world was ending
I'd wanna be next to you

[Outro: Bruno Mars, Lady Gaga & Bruno Mars]
(Ooh, ooh)
I'd wanna be next to you`,
6: `Chaeyoung-ie ga...
Johahaneun...
Random...
Game!...
Random...
Game!...
Game...
Start!


Apateu, Apateu
Apateu, Apateu
Apateu, Apateu...
Uh,
uh-huh, uh-huh
Apateu, Apateu
Apateu, Apateu
Apateu, Apateu...
Uh,
uh-huh, uh-huh


Kissy face,
Kissy face,
Sent to your phone...
But,
I'm trying to kiss your lips,
For real.
(Uh, uh-huh, uh-huh)
Red hearts,
Red hearts,
That’s what I’m on...
Yeah...
-Come give me something...
I can feel,
Oh-oh,
Oh...

...Don't
You want...me...
Like I want you,
Baby?...
...Don't
You need...me...
Like I need you...
Now?...
...Sleep tomorrow!...
But tonight,
Go crazy...
All you gotta do-
is just...
Meet me...
At the...


Apateu, Apateu
Apateu, Apateu
Apateu, Apateu...
Uh,
uh-huh, uh-huh
Apateu, Apateu
Apateu, Apateu
Apateu, Apateu...
Uh,
uh-huh, uh-huh


-It’s what-eva-
it’s what-eva
it’s whatever you like...(Woo!)
-Turn this Apateu,
Into a club...
(Uh, uh-huh, uh-huh)
-I’m talking drink,
dance,
smoke, freak,
Party all night...
-Come on!
...Geonbae geonbae!
Girl,
What’s up?
Oh-oh,
Oh...

...Don't
You want...me...
Like I want you,
Baby?...
...Don't
You need...me...
Like I need you...
Now?...
...Sleep tomorrow...
But tonight,
Go crazy...
All you gotta do-
is just...
Meet me...
At the...


Apateu, Apateu
Apateu, Apateu
Apateu, Apateu...
Uh,
uh-huh, uh-huh
Apateu, Apateu
Apateu, Apateu
Apateu, Apateu...
Uh,
uh-huh, uh-huh


Hey!...
-So now you know the game?
Are you ready?...
Cause I'm coming...
to get ya...
-Get ya,
GET YA!-

-Hold on!
Hold on!...
I'm on my...
Way!...
Yeah! Yeah!-
-Yeah-yeah,
-Yeah!...
I'm on my...
Way!...
Hold on!
Hold on!
I'm on my...
Way!...
Yeah! Yeah!-
-Yeah-yeah,
-Yeah!...
I'm on my...
Way...
-Ay
-ay
-ay
-ay...

...Don't
You want...me...
Like I want you,
Baby?...
...Don't
You need...me...
Like I need you...
Now?...
...Sleep tomorrow!...
But tonight,
Go crazy...
All you gotta do-
is just...
Meet me...
At the...

Apateu, Apateu
Apateu, Apateu
Apateu, Apateu...
...Just meet me at the...
Apateu, Apateu
Apateu, Apateu
Apateu, Apateu...
...Just meet me at the...
Apateu, Apateu
Apateu, Apateu
Apateu, Apateu...
...Just meet me at the...
Apateu, Apateu
Apateu, Apateu
Apateu, Apateu...
Uh,
Uh-huh, uh-huh.`,

7: `[Verse 1: Ayra Starr]
Gimme that love, gimme peace of mind, o ṣere cure me with your rizz line
I want that peace of mind wey dey come with awoof (Wey dey come with awoof)
Baby, na one man race we dey run, so make you no come waste time
Oh no, no pressure

[Pre-Chorus: Ayra Starr]
Make you gimme me that love
If you gimme, me I no go let go
Gimme make I cure my sanko
Feelings got me hitting on a freakin' dance floor
Make you gimme that love
If you gimme, me I no go let go
Make you gimme make I cure my sanko
Feelings got me hitting on a freakin' dance floor (Floor)

[Chorus: Ayra Starr]
Diallo, Diallo
If I give you my love, oh (If I give you my love)
Make you no disappoint, oh (Make you disappoint)
Me I get you for mind, oh
Diallo, Diallo
If I give you my love, oh (If I give you my love)
Make you no disappoint, oh (Make you disappoint)
Me I gat you for mind (On my mind, oh)
[Verse 2: Wizkid]
Godamn, arábìnrin, godamn
Get the way your body makes me feel excited
Loving you dey put me on a different mindset
Girl, na only you go make me stick to one girl
Goddamn, man I need you elẹyinju ẹgẹ, God damn (Go-Go-Godamn)
Picture perfect, no dey mind them
Keep it private, f'ọkàn bale
If you need me, baby, I'll be right there
One more time for my lady, oh (For my lady, oh)
Pump action you dey gbe mi o (Gbe mi o)
Do me many things, ti o le ye mi o (Ye mi o)
I'm ready if you're ready to

[Pre-Chorus: Ayra Starr]
Gimme that love (Gimme that love)
If you gimme, me I no go let go
Gimme make I cure my sanko
Feelings got me hitting on a freakin' dance floor
Make you gimme that love (Gimme that love)
If you gimme, me I no go let go
Make you gimme make I cure my sanko
Feelings got me hitting on a freakin' dance floor (Floor)

[Chorus: Ayra Starr]
Diallo, Diallo
If I give you my love, oh (If I give you my love)
Make you no disappoint, oh (Make you no disappoint)
Me I get you for mind, oh
Diallo, Diallo
If I give you my love, oh (If I give you my love)
Make you no disappoint, oh (Make you no disappoint)
Me I gat you for mind (On my mind, oh)

[Verse 3: Ayra Starr]
So many people wan lick my stew
So, baby, chill make I survey your tools (Ahh)
And if I handle your two by two
You fit to scream, you fit to lose your cool (Ahh)
So many reasons are written in the stars, oh my God
You're the reason I do what I do (Ahh)
So, baby, make you give me your love (Love)

[Pre-Chorus: Ayra Starr & Wizkid]
Make you gimme that love (Gimme that love)
If you gimme, (Oh) me I no go let go (I no go let go)
Make you give me make I cure my sanko (Mm)
Feelings got me hitting on a freakin' dance floor (Mm)
Make you gimme that love (Gimme that love)
If you gimme, me I no go let go (I no go let go)
Make you gimme make I cure my sanko
Feelings got me hitting on a freakin' dance floor (Floor)

[Chorus: Ayra Starr]
Diallo, Diallo
If I give you my love, oh (If I give you my love)
Make you no disappoint, oh (Make you disappoint)
Me I get you for mind, oh
Diallo, Diallo
If I give you my love, oh (If I give you my love)
Make you no disappoint, oh (Make you disappoint)
Me I gat you for mind (For my mind, oh)

[Outro]
Vybe O
Gidigidi gidigidi gidigidi
No worry!`,
8: `[Intro]
London
Another banger

[Verse 1]
All of my guys dem dey tell me say, me I be party animal
Who be that girl wey dey shake her ikebe for back? Me I want her, I like her (Arrg-arrg)
Whether the ikebe na real or fake, abeg, just dey back am (Come)
How you go sell me money, then I spray the money, then you come dey pack am?
You no see say na Balenciaga I dey rock? Abeg, no dey march am
Mе wey be area-boy, I dеy do my things, zaga-zigi, zigi-zaga (Grr)

[Pre-Chorus]
(Rema, what is the matter?)
I go prove to them say somebody badder, eh
Somebody wicked, eh
I go do my best to make all of una vex
I don commot for my set, I don intercept
I don put the game for reset
Shey, you wan gatekeep who sabi jump fence, eh?

[Chorus]
Ozeba, ozeba, ozeba, ozeba, ozeba
Ozeba, ozeba, ozeba, ozeba, ozeba (Hm)
Ozeba, ozeba (Hm, hm, hm), ozeba, ozeba, ozeba (Arrg-ra-ra)
Ozeba, ozeba, ozeba, ozeba, ozeba
[Verse 2]
Emi ati awon guys e mi italawo, e mi itolowo
Italawa, itolowo, ita, itolow, eh-eh
They want a banger, eh-eh?
Give them back to back, eh-eh
Buss up their medulla, arrg-arrg
Tell all your faves that I ask you to ask them, "Who's their daddy?", huh
H-I-M, huh, I'm that nigga (Uh-huh)
I'm that, huh, I'm that nigga, huh (Uh-huh)
Father figure (Uh-huh), huh, huh
I dey vex every day, only thing wey fit make me dey happy na ikebe
Internet gangster, that thing wey you talk, make you come my front, make you for répété

[Pre-Chorus]
(Rema, what is the matter?)
I go prove to them say somebody badder, eh (Eh?)
Somebody wicked, eh (Eh?)
I go do my best to make all of una vex
I don commot for my set, I don intercept
I don put the game for reset
Shey, you wan gatekeep who sabi jump fence, eh?

[Chorus]
Ozeba, ozeba (Hm, hm, hm), ozeba, ozeba, ozeba (Arrg-ra-ra)
Ozeba, ozeba, ozeba, ozeba, ozeba
Ozeba, ozeba (Ayy, ayy, ayy, ayy), ozeba, ozeba, ozeba
Ozeba, ozeba (Rrg, rrg, rrg), ozeba, ozeba, ozeba (Ahh)
Ozeba, ozeba, ozeba, ozeba, ozeba
Ozeba, ozeba, ozeba, ozeba, ozeba (Arrg-ra-ra)
Ozeba, ozeba, ozeba, ozeba, ozeba
Ozeba, ozeba, ozeba, ozeba, ozeba`,
9 : `[Chorus]
This ain't Texas (Woo)
Ain't no hold 'em (Hey)
So lay your cards down, down, down, down
So park your Lexus (Woo)
And throw your keys up (Hey)
Stick around, 'round, 'round, 'round, 'round (Stick around)
And I'll be damned if I can't slow-dance with you
Come pour some sugar on me, honey, too
It's a real-life boogie and a real-life hoedown
Don't be a bitch, come take it to the floor now, woo, ha (Woo)

[Verse 1]
There's a tornado (There's a tornado)
In my city (In my city)
Hit the basement (Hit the basement)
That shit ain't pretty (That shit ain't pretty)
Rugged whiskey (Rugged whiskey)
'Cause we survivin' ('Cause we survivin')
Off red-cup kisses, sweet redemption, passin' time, yeah

[Pre-Chorus]
Ooh, one step to the right
We heading to the dive bar we always thought was nice
Ooh, run me to the left
Then spin me in the middle, boy, I can't read your mind
[Chorus]
This ain't Texas (Woo)
Ain't no hold 'em (Hey)
So lay your cards down, down, down, down
So park your Lexus (Woo)
And throw your keys up (Hey)
And stick around, 'round, 'round, 'round, 'round (Stick around)
And I'll be damned if I can't slow-dance with you
Come pour some sugar on me, honey, too
It's a real-life boogie and a real-life hoedown
Don't be a bitch, come take it to the floor now, woo
And I'll be damned if I cannot dance with you
Come pour some liquor on me, honey, too
It's a real-life boogie and a real-life hoedown
Don't be a bitch, come take it to the floor now, woo

[Post-Chorus]
Woo-hoo
Woo-hoo
Woo-hoo

[Verse 2]
There's a heatwave (There's a heatwave)
Comin' at us (Comin' at us)
Too hot to think straight (Too hot to think straight)
Too cold to panic (Cold to panic)
All of the problems
Just feel dramatic (Just feel dramatic)
And now we're runnin' to the first bar that we find, yeah
[Pre-Chorus]
Ooh, one step to the right
We heading to the dive bar we always thought was nice
Ooh, you run to the left
Just work me in the middle, boy, I can't read your mind

[Chorus]
This ain't Texas (Woo)
Ain't no hold 'em (Hey)
So lay your cards down, down, down, down, oh
So park your Lexus (Hey)
And throw your keys up (Hey)
And stick around, 'round, 'round, 'round, 'round (Stick around)
And I'll be damned if I cannot dance with you
Come pour some sugar on me, honey, too
It's a real-life boogie and a real-life hoedown
Don't be a bitch, come take it to the floor now (Woo)
And I'll be damned if I cannot dance with you
Come pour some liquor on me, honey, too
It's a real-life boogie and a real-life hoedown
Don't be a—, come take it to the floor now, ooh

[Outro]
Take it to the floor now, ooh
Hoops, spurs, boots
To the floor now, ooh
Tuck, back, oops (Ooh, ooh, ooh)
Shoot
Come take it to the floor now, ooh
And I'll be damned if I cannot dance with you
Baby, pour that sugar and liquor on me, too
Furs, spurs, boots
Solargenic, photogenic, shoot`,
10 : `[Intro: Omah Lay]
(Oh)
(Mad)
Ooh
Ooh
Ooh
Ooh

[Verse 1: Omah Lay]
Baby, the weather
Is getting cold
Cold inside
Double sweater
I am your own
Ordinary
Paranoid
I can't picture this world, without you in my life, oh
Baby

[Chorus: Omah Lay]
Uhh-uhh-uhh, uh, uh, uh
Uhh, uhh, uhh, uh, uh, uh
Uhh-uhh-uhh, uh, uh, uh (My love, my love, my love)
Uhh, uhh, uhh, uh, uh, uh (My love, my love, my love)

[Verse 2: Davido]
Sweet Fanta Diallo, I no fit forget you o
Ebezina, ebezina, Nsọgbu Sọọgbu o (Yeah)
If I speak English, oh-oh
Chọ-chọ-chọ, no workings
I no wan punish you, whoa, whoa
I want to polish you (Ìdí ará bànkó)
If you see my baby, you go shut up, oh, (Ìdí ará bànkó)
Ọmọge too fine, no be makeup, oh
Ó ya baby, lie down, oh
Finish work for me, oh
Oh, Tomato, put that thing back, oh (Yeah)
Ah, baby
[Outro: Omah Lay & Davido]
Uhh-uhh-uhh, uh, uh, uh
Uhh, uhh, uhh, uh, uh, uh
Baby, baby, baby
Uhh-uhh-uhh, uh, uh, uh
Uhh, uhh, uhh, uh, uh, uh
Baby, baby, baby
Oh, na, na
Uhh-uhh-uhh, uh, uh, uh
Uhh, uhh, uhh, uh, uh, uh
My love, my love, my love
Baby, oh`,
11 : `[Intro: Jang Wonyoung]
Rebels in our heart

[Verse 1: An Yujin, Liz, Rei, Leeseo]
Sijageun hangsang da irun geotcheoreom
Endingeun machi seungnihan geotcheoreom
Geomnaeji anko maeumeul ssodeullae
Nae moyangdaero
Ije deo isang singyeong sseuji ana (deo isang)
Eodieseodo nae mameul jikigi
Ohae badeul ttaen jayue matgyeodullae
Da alge doel geonikka

[Chorus: Jang Wonyoung, An Yujin, Gaeul, Leeseo]
So you can love me, hate me
You will nеver be, nevеr be, never be me
Try me, I'll break free
You will never be, never be, never be me
We are rebels in our heart, rebels in our heart
We are rebels in our heart
We are rebels in our heart, kkeokkiji ana
We are rebels in our heart

[Verse 2: Rei, Gaeul, Leeseo]
Neoneun eodiga jogeum bujokae
Neoneun geogiga mwonga jom neomchyeo
I don't care, mwodeun mareun cham swipji
Geurae silhaengi eoryeoun geoya
Do it, move it, do it
Urin geunyang halge
Nae gal gireun meolgo
Geu wieneun deuramaga isseo
[Pre-Chorus: Jang Wonyoung]
Tto oeroumi neomu gireojineun bamen
Geu mameul ssoa ollyeo (Oh)

[Chorus: An Yujin, Liz, Jang Wonyoung, Rei]
Love me, hate me
You will never be, never be, never be me
Try me, I'll break free
You will never be, never be, never be me
We are rebels in our heart, rebels in our heart
We are rebels in our heart
We are rebels in our heart, kkeokkiji ana
We are rebels in our heart (Rebels in our heart)

[Post-Chorus: An Yujin, Jang Wonyoung]
La-la-la-la, la-la-la, la-la-la
Rebels in our heart, rebels in our heart
La-la-la-la, la-la-la, la-la-la
Rebels in our heart, rebels in our heart

[Bridge: Jang Wonyoung, Liz]
Urin ttaro iyureul mutji anko
Seoroga pillyohal ttaega isseo
Geureon mami eotteon geonji jal algie
Yeongwoneul baraneun saibodan
Jigeumeul ihaehaejugo sipeo
We will always be the rebels`,
12 : `[Verse 1]
Your morning eyes, I could stare like watching stars
I could walk you by, and I'll tell without a thought
You'd be mine, would you mind if I took your hand tonight?
Know you're all that I want this life

[Chorus]
I'll imagine we fell in love
I'll nap under moonlight skies with you
I think I'll picture us, you with the waves
The ocean's colors on your face
I'll leave my heart with your air
So let me fly with you
Will you be forever with me?

[Verse 2]
My love will always stay by you
I'll keep it safe, so don't you worry a thing
I'll tell you I love you more
It's stuck with you forever, so promise you won't let it go
I'll trust the universe will always bring me to you

[Chorus]
I'll imagine we fell in love
I'll nap under moonlight skies with you
I think I'll picture us, you with the waves
The ocean's colors on your face
I'll leave my heart with your air
So let me fly with you
Will you be forever with me?`,
};

lyricsButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const songId = e.currentTarget.getAttribute('data-song');
    const lyrics = songsLyrics[songId] || "Lyrics will be added soon...";
    
    document.querySelector('.lyrics-text').textContent = lyrics;
    
    lyricsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

closeLyricsModal.addEventListener('click', () => {
  lyricsModal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Close modals on outside click
[infoModal, lyricsModal].forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});




// === MUSIC PLAYER LOGIC ===
const playButtons = document.querySelectorAll('.play-btn');
const progressSliders = document.querySelectorAll('.progress-slider');
const downloadButtons = document.querySelectorAll('.download-btn');

// === PLAY / PAUSE ===
// === PLAY / PAUSE ===
playButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    const card = btn.closest('.music-card');
    const audio = card.querySelector('.music-audio');
    const slider = card.querySelector('.progress-slider');

    // Pause all other audio INCLUDING the artist player
    document.querySelectorAll('.music-audio').forEach(a => {
      if (a !== audio) a.pause();
    });
    
    // Pause the artist section player
    const artistPlayer = document.getElementById('audioPlayer');
    if (artistPlayer) {
      artistPlayer.pause();
      const playPauseIcon = document.getElementById('playPauseIcon');
      if (playPauseIcon) playPauseIcon.textContent = '▶';
    }

    // Toggle play / pause
    if (audio.paused) {
      audio.play();
      btn.textContent = '⏸';

      // Update slider as music plays
      audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        slider.value = progress || 0;
      });
    } else {
      audio.pause();
      btn.textContent = '▶';
    }
  });
});

// === FAST FORWARD / REWIND USING SLIDER ===
progressSliders.forEach(slider => {
  slider.addEventListener('input', () => {
    const card = slider.closest('.music-card');
    const audio = card.querySelector('.music-audio');
    if (audio.duration > 0) {
      const seekTime = (slider.value / 100) * audio.duration;
      audio.currentTime = seekTime;
    }
  });
});

// === DOWNLOAD SONG (with glowing animation) ===
downloadButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const file = btn.getAttribute('data-audio');

    // Create a temporary link
    const link = document.createElement('a');
    link.href = file;
    link.download = file.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Add glow and text feedback
    btn.textContent = '⬇ Downloading...';
    btn.classList.add('downloading'); // 🌟 animation starts
    btn.style.opacity = '0.6';

    setTimeout(() => {
      btn.textContent = '⬇ Download';
      btn.classList.remove('downloading'); // 🌟 animation stops
      btn.style.opacity = '1';
    }, 2000);

    console.log(`🎵 Downloading: ${file}`);
  });
});











// === ARTISTS SECTION - WAIT FOR DOM ===
document.addEventListener('DOMContentLoaded', () => {
  initArtistsSection();
});

function initArtistsSection() {
  // Check if elements exist
  const artistsSection = document.getElementById('artists');
  if (!artistsSection) {
    console.log('Artists section not found');
    return;
  }

  // Artist Songs Data
  const artistsSongsData = {
    jcole: {
      name: "J.Cole",
      songs: [
        {
          title: "3001",
          cover: "./assets/j.cole/J_Cole Might Delete Later cover.jpg",
          audio: "./assets/j.cole/J_Cole_-_3001_@BaseNaija.mp3",
          lyrics: `What I need with ten cars? I can't drive but one
This for my niggas listening in 3001
As I'm writin' through this song, this world's gone insane
I know you feel me 'cause I bet that shit still ain't changed
I'm on a mission for this chicken, I'ma kill everything
I'm stackin' for a rainy day and it still ain't rained
Why niggas never open up? The answer had me chokin' up
It ain't enough words around to reveal their pain

I'm holdin' on tight to what it feel like to live a peaceful life
Since ridin' a bike, all that I ever knew was beef and strife
Goin' to sleep at night, prayin' that God release the stress
Now I'm on G4 jets across the seas to decompress
My recent checks, how much you think? Hm, decent guess
They're growin' more eager, "Cole, who you gon' kill on a feature next?"
Who would you suggest? My nigga just told me the streets a myth
And he's perplexed, they're tellin' on people like the teacher's pet
He took a pull of his weed, he high as the trees where eagles nest
I started chiefin' less and less, it had my cerebral vexed
Too many blessings to be depressed
Went from too stressed to being blessed
Now, my new recipe's just keep that fuck shit from my desk
I don't want shit but my breath, I don't want shit but my fam'
Thought I used superglue, nigga, how this gun stick to my hand
I don't even tote no pistol, but that shit sounded so hard
Plus, I don't give a fuck about lyin' once I learned these niggas fraud
I'm finna burn these niggas, dog
Bring me that urn, these nigga char
Cole, I'ma send 'em to crossroads with the lost souls
I saw Nia Long quote
I would've poked, back when my heart cold
Give her three or four strokes
Then I'm onto the next, shit like a par four
I'm a raw-ass nigga, 6'4", tall-ass nigga
With a sick flow, y'all ask Jigga
How much did the kid gross for that label
Paid dues, had to pay dude for my masters, but I'm grateful
Shit, business is business
I'm in the Ville, the windows is tinted
Keeping my dick in my britches, y'all get to the bitches
Me, I'ma get to this money and split with the missus
Nigga, this vicious, and I'm the truth
All of these niggas fictitious
Look at Jermaine, still runnin' the game
Damn, this physical fitness
Fuck with me, man

What I need with ten cars? I can't drive but one
This for my niggas listening in 3001
As I'm writin' through this song, this world's gone insane
I know you feel me 'cause I bet that shit still ain't changed
I'm on a mission for this chicken, I'ma kill everything
I'm stackin' for a rainy day and it still ain't rained
Why niggas never open up? The answer had me chokin' up
It ain't enough words around to reveal their pain
`
        },
        {
          title: "Pi",
          cover: "./assets/j.cole/J_Cole Might Delete Later cover.jpg",
          audio: "./assets/j.cole/J_Cole_-_Pi_feat_Daylyt_Ab-Soul__@BaseNaija (1).mp3",
          lyrics: `Know what I'm sayin'
Lights off, lights goin', know what I'm sayin'?
Ha-ha, uh
So soulful, don't you agree?
I do, yeah
Is it a room full of, full of mirrors or a room full of Motown? I don't know
Shout-out to Zordon, if you know, you know
(She makes the rain fall from my eyes) Yo
Ay
You know that I do belie— (Man)

The criteria for this tier is just a open pride
Hope and cries, but so can I
I drop the unprovoken crimes
Pray to the heaven, God, with no disguise
We roll the dice and hope the soul unties
Reap the fruit with no bow tie
Sensitive Pisces, still thuggin', baby, ain't 'fraid to cry
Skinny, biggy, lens is tinted, ain't got no lazy eye
Heart of gold, almost sold it in Saudi Arabia
Quill told me the clouds ain't real, God gotta paint the sky
So I'm a student of Sophia Stewart, the Matrix ain't a lie
Tainted Gods fall from the sky
Tie in inception
When you wake inside this dream, you a weapon
Step in the cypher, know the beef real
Your life at stake, ages with each meal
Real estate of mind, you need equity? Let the beat build
Poison in my cup, I need to refill
I feel it in my gut, you niggas meek still
I inherit the Earth
Like three wise men pulled up to cherish my birth
They placed me in a manger, wasn't that major at first
But what a mess I'll leave, I'm the savior at work
I ain't sayin' I'm Jesus
Got the job of the messiah, Ty and Joe, we block all devils
Get y'all shovels, can ya dig it?
We gon' riot if y'all pick it
Sign of danger, oh, we anger from my past, can't get past that
We the last batch and the cause installed, we got black facts
Grow a spinal cord or backtrack
The homies call me Batman, I'm the African Ben Affleck
Publishin' some other shit, like is something up with ASCAP?
It's training day, don't get your ass capped
Givenchy snapback with the rhinestones, you ain't never had that
Was at Saks Fifth with Doe, that's a double entendre
Everything I say is dope, is this a microphone or contra?
Bands in my pocket
See what they told Malcolm X to do with his hands?
That shit was out of pocket
Picked up shotguns that came in handy, wasn't no plan B
Kid gone, who can fuck with him? Knew them shots would muzzle him
Knew the blocks would puzzle him
Let' go stupid because of him
Shells fallin' like Nephilim
Gilgamesh, who can fuck with him? (Perfect)

Oh, y'all thought we was done wit' em? Huh
Y'all must be stupid, we finna go dumb on 'em
Just keep your ears open like Dumbo and them
Good luck to them, it's up for them
Piece of the pie edge, we gon' crumble 'em
Three fourteen on the guy head when we rumble 'em
Ha-ha-ha, on second thought, that's enough for them
Nah, you gotta chill, bro (ha-ha-ha)

She makes a tear fall from my eye
Ah, man, I wish it was the rain
You gotta reach out to them
She makes the rain fall from my eye

Uh, prayer hands for the land where they're sprayin' pellets
And turning your mans to an angelic
Being and freeing him from this crammed, hellish hole
The weather's cold from jealous souls that fanned fellas
I danced as well as Chris Breezy when the bullets start strayin' careless
I won't let him Swiss cheese me, got plans that I can't fail at
Seen plenty bodies trembling, resembling Cam Reddish
So full of potential, but never given a real chance to develop
My head envelops the pen, these ain't fan letters I craft
His album dropped, it was trash
I litter it like I can't spell it
Is you a demon or is that demeanor for the 'Gram? Tell us
They plead the fifth, I'm seeing hints of a trans fella
In cancel culture's vicinity, he's no killer, trust me
Beneath his chosen identity, there is still a pussy, period
Blood spillin' monthly, rather weekly as a myriad of bodies drop
Where bricks get karate chopped to maximize the dojo, comprende
I wonder, will my friends make it past the pearly gates, so we could kick it
But based on what their sins say, probably not
Hit lick after lick like a lollipop
You niggas take a lie detect', the polygraph'll probably pop
You know my zone, I live here at the top
Right now, I'm home alone, Macaulay cot
I keep the shotty cocked in 'case somebody plot to rob me of this godly spot
Jermaine monstrous
Like that nigga off Jumanji, they know how he rock
All these bodies I done caught, I should probably stop
Nah, fuck that, I willingly venture into a den full of lions
On some kill or be sent to a funeral home facility
To test my ability with this thrilling agenda
But it's hard to meet my match when my raps ain't really that tender
Since birth, the kid knew his worth
Never wallowed in sorrow, the game he dispersed
In these verses, bring a gillie potential, a milli' from pencils
Never will my ability cripple
Now please, hold yo' L like you guardin' Philly's young center
Quick to leave a chick curved
It's only one of me, but bet it's like six hers
In my mobile device, you feel the motive in these quotables, right?
Cole is the nicest, but ain't shit about these vocals polite
Focusin' like bifocals while I'm walkin' on tightropes from a height
You folks'll only get this scope from a flight
How many "Verses Of The Year" this year is Cole gonna write? Uh

You know that I do believe, she
She makes a tear fall from my eye
Falling, I
You know that I do believe, she, I
`
        },
        {
          title: "Stealth Mode",
          cover: "./assets/j.cole/J_Cole Might Delete Later cover.jpg",
          audio: "./assets/j.cole/J_Cole_-_Stealth_Mode_feat_Bas__@BaseNaija.mp3",
          lyrics: `We don't do sparklers
We give specific instructions to bring out the bottles in stealth mode
I'm hearing there's rats in the building
They saying it's not up to par with the health code
I feel like that's none of my business
Nigga be steadily giving opinions
On shit that don't even concern 'em
I got a lot to get off of my sternum

I been considerin' extending an olive branch
Building bridges with niggas that burned 'em
Like life too short to hold on to things
When Los was calling my line I stared at the screen whenever the phone would ring
Wish I could've said goodbye, even now I might cry while I'm writing this poem to sing
Life is a crazy thing
Look how I got cut from the team, now I own the team
Just a little piece, I ain't tryna make a scene
Like it's something it's not, my whole regime
Is up in the spot
Carefully watched by dozens of thots
Fuck it, I'll just have a couple of shots
Take off the edge and get out my head
When you up at the top it's a coveted spot

We don't do sparklers
We give specific instructions to bring out the bottles in stealth mode
I'm hearing there's rats in the building
They saying it's not up to par with the health code
I feel like that's none of my business
Nigga be steadily giving opinions
On shit that don't even concern 'em
I got a lot to get off of my sternum

I got a lot to get off of my sternum
I got a lot to get off of my sternum (Yeah)
Bas, you should come right here

[Bas:]
Niggas love talking a whole lot of bullshit and calling it guidance
I been in my mode, I'm not gonna hold you
I doubled my commas
I cycle through hoes, I gaze on the lotus
Get head while I'm driving
You blow up a phone, we didn't even notice
'Cause we was just vibing

Niggas love talking a whole lot of bullshit and calling it guidance
I been in my mode, I'm not gonna hold you
I doubled my commas
I cycle through hoes, I gaze on the lotus
Get head while I'm driving
You blow up a phone, we didn't even notice
'Cause we was just vibing

We was just vibing
We was just vibing`
        },
        {
          title: "Trae The Truth in Ibiza",
          cover: "./assets/j.cole/J_Cole Might Delete Later cover.jpg",
          audio: "./assets/j.cole/J_Cole_-_Trae_The_Truth_in_Ibiza_@BaseNaija.mp3",
          lyrics: `Nigga done got spoiled off these fuckin' PJ's
I'm not—, It's not like I'm too good to fly commercial, that shit just—
It's a hassle at this point, you know what I mean?
Yeah

At a hundred degrees, I freeze the temp
Got my grip and I never proceed to slip
Feel the weight like I just had my Caesar clipped
Got a family to feed, I squeeze the clip
Walk in front of the judge and plead the fifth
I'm a legend but it ain't no need for myth
Better get you a visa, he's a trip
I had Trae The Truth in Ibiza lit

Niggas ain't 'bout to outwork me
Go to sleep late, still wakin' up early
Look at my belly, I'm hungry
Y'all niggas desperate and thirsty
You can't even tell there's a difference
Hungry is when you're relentless
Even when one of your idols look dead in your face and he tell you, "You can't," and you know that he meant it
But when you Cole, you attempt it
Come, let me show you a template
I had to grow out the concrete
I had to stroll through the trenches, uh
I had to stroll through the trenches

At a hundred degrees, I freeze the temp (Temp)
Got my grip and I never proceed to slip (Slip)
Feel the weight like I just had my Caesar clipped (Clipped)
Got a family to feed, I squeeze the clip
Walk in front of a judge and plead the fifth
I'm a legend but it ain't no need for myth
Better get you a visa, he's a trip
I had Trae The Truth in Ibiza lit
I had Trae The Truth in Ibiza lit
Yeah, that's my nigga
I had Trae The Truth in Ibiza lit

I can't do edibles
My head is spinnin' too much
Fell off the pedestal
And I'm never gettin' back up
Done tryna to be perfect, that shit is exhausting
An infinite force that nitpicking niggas get lost in
I'm scribbilin' thoughts, my pencil is sharpening
Trust in my pen, been tryna limit the crossing
The best part of makin' this cake is lickin' the frosting
And Barry been sayin' he love when I spit like I'm dark skin
And you know what he mean
I got a thirty-four waist
I had a forty jeans
Somehow I still got too big for my britches and tore the seams
There go my Achilles' heel
Been tryna do everything
Thank God for my nigga Ib
What would I do with no team?
I wouldn't do anything
I would just sit on this music and hold it
Waiting for some perfect moment
Wondering why it ain't came
Meanwhile the world done changed
Suddenly songs I was loving last year don't feel the same
Somebody feel my pain
Please, somebody say I changed
All of these years done passed, I hope I ain't still the same
All of these songs I'm on, ain't nobody kill Jermaine
Isn't that rather strange?
I wrote a number of bad refrains
But isn't that life, dude?
Make a few hits but you gotta live with the strikes too
Instead of pretending I'm some incredible nigga, just let 'em hear all of it
The good, the bad, the ugly, the strong, the weak, it's me
The nigga that thought of it
All the portrayals of anything different or fraudulent
You wanna tap into your greatness, well this is the starter kit
The Fall Off, how many these bullets can fit in the cartridges
I'm lettin' 'em off on intentions to rip through your cartilage
My nigga just told me, "You trippin' for thinkin' of callin' quits."

[Trae The Truth:]
No lie
God is good, for real
I'm just sittin' here askin' myself
The fuck was I even doin' here?
Fresh out the hospital bed, one to the back
Arm in a sling
And in the same breath, I'm in Ibiza
I ain't never fathomed seeing another side of this shit
I know you felt the same
Hell, I remember we used to pray for it, but hell
Look at ya', bro
People speak greatness these days when the name get mentioned
But what is greatness?
Nah, nigga we lit
Iconic, ha-ha
It ain't over 'til we tap out
Cole, you better make these niggas feel you
We done seen 'em come
We done seen 'em go
From the Come Up to the Fall Off
And even when we fall off, we don't fall off, nigga`
        },
        {
          title: "Power Trip",
          cover: "./assets/j.cole/powertrip.jpg",
          audio: "./assets/j.cole/J_Cole_-_Power_Trip_feat_Miguel__@BaseNaija.mp3",
          lyrics: `Got me up all night
All I'm singin' is love songs
She got me up all night
Constant drinkin' and love songs
She got me up all night
Down-and-out with these love songs
She got me up all night
Drownin' out with these love songs
She got me up all night (Yeah)
All I'm singin' is love songs
She got me up all night (Yeah)
Constant drinkin' and love songs
She got me up all night (Yeah)
Down-and-out with these love songs
She got me open all night (Uh-huh)
Got me open all night, hey

Okay, back when I was sleeping in my mama crib
Or even back when I was up there in Mohammed crib
Paying seventeen hundred for the rent, money well spent
No heater, but a nigga made heat, may I vent?
Had a thing for ya, even wrote the song "Dreams" for ya
'Cause I had dreams for ya, thoughts of a ring for ya
Childish shit, you know child and shit
Anonymous flowers sent, you know coward shit
Now a nigga signed to Hov, took a power trip
Back home, I'm grown now, and the city's my throne now, huh
The same clubs that I used to get tossed out
Life got Kriss Kross'd: totally crossed out
'Cause now I'm in this bitch and I'm totally bossed out
Old chicks crying 'cause they know that they lost out
But I'm still on you, I'm still on you
My drink spill on me, while I feel on you, I'm sayin'—

[Miguel:]
Would you believe me if I said I'm in love?
Baby, I want you to want me
Would you believe me if I said I'm in love?
Baby, I want ya

[J. Cole:]
And we are, we are, we are
Got me up all night
And we are, we are, we are
All I'm singin' is love songs
And we are, we are, we are
Got me up all night
And we are, we are, we are (She got me)
And we are, we are, we are (She got me)

Well, this has got to be the longest crush ever
If I ever get to fuck it'd be the longest bust ever
Love is a drug, like the strongest stuff ever and
Fuck it, I'm on one, you feel me?
She on a power trip, she got me where she want a nigga
Wife'ing in the club, man, my homies gon' disown a nigga
Like, "Give me twenty dollars, dollars!"
Ass stupid, how you get to college, college?
I'm in your city and I'm wonderin' if you're home now
Went and found a man, but I'm hopin' you're alone now
Can't help but feeling like I dropped the ball, cliché
I used to pop up on you at the mall each day
Now, typically I kick game like Eastbay
But you got a nigga freeze-framed yelling: "Please play!"
For Pete's sake, homie, pull it together
Just fuck her one time and be through with forever, but—

[Miguel:]
Would you believe me if I said I'm in love?
Baby, I want you to want me
Would you believe me if I said I'm in love?
Baby, I want ya, yeah

[J. Cole:]
And we are, we are, we are
Got me up all night
And we are, we are, we are
All I'm singin' is love songs
And we are, we are, we are
Got me up all night
And we are, we are, we are (She got me)
And we are, we are, we are (She got me)

Got me up all night (All night)
All I'm singin' is love songs
She got me up all night (All night)
Constant drinkin' and love songs
She got me up all night (All night)
Down-and-out with these love songs
She got me up all night (All night)
Drownin' out with these love songs
She got me up all night (Yeah)
All I'm singin' is love songs
She got me up all night (Yeah)
Constant drinkin' and love songs
She got me up all night (Yeah)
Down-and-out with these love songs
She got me open all night (Uh-huh)
Got me open all night, hey

Back when I was sleeping in my mama crib
`
        },
        {
          title: "7 Minutes Drill",
          cover: "./assets/j.cole/J_Cole Might Delete Later cover.jpg",
          audio: "./assets/j.cole/J_Cole_-_7_Minute_Drill_@BaseNaija.mp3",
          lyrics: `Yeah
Turn it up
Yeah, turn the vocal up
Uh

Light work like it's PwC
It's a cold world, keep the heat under your seat
I got a phone call, they say that somebody dissin'
You want some attention, it come with extensions
My dog like, "Say the word." He on bullshit, he itchin'
Done put in so much work in these streets, he got pension
I told him chill out, how I look havin' henchmen?
If shots get to poppin', I'm the one doin' the clenchin'

I came up in the Ville, so I'm good when it's tension
He still doin' shows, but fell off like The Simpsons
Your first shit was classic, your last shit was tragic
Your second shit put niggas to sleep, but they gassed it
Your third shit was massive and that was your prime
I was trailin' right behind and I just now hit mine
Now I'm front of the line with a comfortable lead
How ironic, soon as I got it, now he want somethin' with me
Well, he caught me at the perfect time, jump up and see
Boy, I got here off of bars, not no controversy
Funny thing about it, bitch, I don't even want the prestige
Fuck the Grammys 'cause them crackers ain't never done nothin' for me, ho
Slugs took my nigga's soul, drugs took another one
The rap beef ain't realer than the shit I seen in Cumberland
He averagin' one hard verse like every thirty months or somethin'
If he wasn't dissin', then we wouldn't be discussin' him
Lord, don't make me have to smoke this nigga 'cause I fuck with him
But push come to shove, on this mic, I will humble him
I'm Nino with this thing, this that New Jack City meme
Yeah, I'm aimin' at G-Money, cryin' tears before I bust at him

Light work like it's PwC
It's a cold world, keep the heat under your seat
I got a phone call, they say that somebody dissin'
You want some attention, it come with extensions
My dog like, "Say the word." He on bullshit, he itchin'
Done put in so much work in these streets, he got pension
I told him chill out, how I look havin' henchmen?
If shots get to poppin', I'm the one doin' the— (Conductor, conductor, conductor)

I got mixed feelings 'bout these fuckin' rap niggas
It's over for that cap, we official cap peelers
Two-six, we don't at niggas, we get at niggas
Shoot a nigga lights out, yeah, my dogs stat fillers
Stat stuffers, triple-double, get your ass black-duffled
Body bag, body bag, body bag
Cole World your instructor for Pilates class
Get a nigga stretched if I feel the disrespect, uh
Your arms might be too short to box with the God
Who live his life without the pressures of a constant facade
I pray for peace, but if a nigga cease these positive vibes
A Falcon 9 inside my pocket, bitch, this rocket gon' fly
Now it's poppin' outside like the top of July
My text flooded with the hunger for a toxic reply
I'm hesitant, I love my brother, but I'm not gonna lie
I'm powered up for real, that shit would feel like swattin' a fly
Four albums in twelve years, nigga, I can divide
Shit, if this is what you want, I'm indulgin' in violence
Put pictures in my home, aim the chrome at your eyelids
Fly pebbles at your dome, we the Stone Temple Pilots
This is merely a warning shot to back niggas down
Back in the town where they whippin' work and traffickin' pounds
My jack jumpin' 'bout a rapper makin' blasphemous sounds
Switchin' sides like the tassel on the cap and the gown
I'm fully loaded, nigga, I can drop two classics right now

Hah, let me chill out, man (Conductor)
The Fall Off on the way, nigga
`
        },
        
      ]
    },
    drake: {
      name: "Drake",
      songs: [
        {
          title: "Uuugly",
          cover: "./assets/drake/uuugly.jpg",
          audio: "./assets/drake/Drake_-_Uuugly_@BaseNaija.mp3",
          lyrics: `CC, they want me to break it down
CC, they need me to break it down
Then we gon' break it down
We should just take the things I say as truth
There's not a measuring tape long enough that could measure the distance that I went for you
Please don't make me
Please don't make me
Don't make me pull out these credit card statements and show you the proof
It'll get ugly, ugly
This heart was broken a long time ago
My blood, it pumps from my hungover liver then straight to my bones
Taught you everything you know
Just for your new link to think you a pro
What does he know?
What does he really know?
Two hands on your waist
One hand on my face
For someone so lost in life, you always manage to end up at my place
Trying me
Trying me
Trying me
Trying me, trying me

`
        },
        {
          title: "Push Ups",
          cover: "./assets/drake/pushups.jpg",
          audio: "./assets/drake/Drake_-_Push_Ups_@BaseNaija.mp3",
          lyrics: `I could never be nobody number-one fan
Your first number one, I had to put it in your hand
You pussies can't get booked outside America for nan'
I'm out in Tokyo because I'm big in Japan
I'm the hitmaker y'all depend on
Backstage in my city, it was friendzone
You won't ever take no chain off of us
How the fuck you big steppin' with a size-seven men's on?
This the bark with the bite, nigga, what's up?
I know my picture on the wall when y'all cook up
Extortion baby, whole career, you been shook up
'Cause Top told you, "Drop and give me fifty," like some push-ups, huh
Your last one bricked, you really not on shit
They make excuses for you 'cause they hate to see me lit
Pull your contract 'cause we gotta see the split
The way you doin' splits, bitch, your pants might rip
You better do that motherfuckin' show inside the bity
Maroon 5 need a verse, you better make it witty
Then we need a verse for the Swifties
Top say drop, you better drop and give 'em fifty
Pipsqueak, pipe down
You ain't in no big three, SZA got you wiped down
Travis got you wiped down, Savage got you wiped down
Like your label, boy, you in a scope right now
And you gon' feel the aftermath of what I write down
I'm at the top of the mountain, so you tight now
Just to have this talk with your ass, I had to hike down
Big difference 'tween Mike then and Mike now
What the fuck is this, a twenty-v-one, nigga?
What's a prince to a king? He a son, nigga
Get more love in the city that you from, nigga
Metro, shut your ho ass up and make some drums, nigga
Yeah, I'm the 6ix God, I'm the frontrunner
Y'all nigga manager was Chubbs lil' blunt runner
Claim the 6ix and you boys ain't even come from it
And when you boys got rich, you had to run from it
Cash blowin' Abel bread, out here trickin' (Out here trickin')
Shit we do for bitches, he doin' for niggas (What the fuck?)
Jets, whips, chains, wicked, wicked, wicked (Wicked, wicked)
Spend it like you tryna fuck, boy, you trippin', boy, you trippin'
Drizzy Chip 'n Dale, probably got your bitch Chanel
I just got 'em done, boy, don't make me have to chip a nail
Rolling Loud stage, y'all were turnt, that was slick as hell
Shit'll probably change if your BM start to kiss and tell
Hugs and kisses, man, don't tell me 'bout no switches
I'll be rockin' every fuckin' chain I own next visit, ayy
I be with some bodyguards like Whitney
Top say drop, your little midget ass better fuckin'

Ayy, better drop and give me fifty, ayy
Drop and give me fifty, drop and give me fifty, ayy
Niggas really got me out here talkin' like I'm 50, ayy
Niggas really got me out here rappin' what I'm livin'

I might take your latest girl and cuff her like I'm Ricky
Can't believe he jumpin' in, this nigga turnin' fifty
Every song that made it on the chart, he got from Drizzy
Spend that lil' check you got and stay up out my business
Nigga, shout out to the hooper that be bustin' out the griddy
We know why you mad, nigga, I ain't even trippin'
All that lil' heartbroken Twitter shit for bitches
This for all the top dogs, drop and give me fifty, drop, drop
And that fuckin' song y'all got did not start the beef with us
This shit been brewin' in a pot, now I'm heatin' up
I don't care what Cole think, that Dot shit was weak as fuck
Champagne trippin', he is not fuckin' easin' up
Nigga callin' Top to see if Top wanna peace it up
"Top, wanna peace it up? Top, wanna peace it up?"
Nah, pussy, now you on your own when you speakin' up
You done rolled deep to this, it's not fuckin' deep enough
Beggin' Kai Cenat, boy, you not fuckin' beatin' us
Numbers-wise, I'm out of here, you not fuckin' creepin' up
Money-wise, I'm out of here, you not fuckin' sneakin' up
Cornball, your show money merch money fee to us
I'ma let you niggas work it out because I seen enough
This ain't even everything I know, don't wake the demon up
This ain't even everything I know, don't wake the demon up
Drop and give me fifty, all you fuck niggas teamin' up

What top five you smokin' on, Kendrick?

Mmm, mmm, yeah
Drop, drop, drop, drop
Drop a fifty bag for the mob in the spot
Drop a fifty bag, twenty-nine for the thot
Uh, I was really, really tryna keep it PG`
        },
        {
          title: "What did i miss",
          cover: "./assets/drake/What Did I Miss_.jpg",
          audio: "./assets/drake/Drake_-_What_Did_I_Miss__@BaseNaija.mp3",
          lyrics: `I don't give a fuck if you love me, I don't give a fuck if you like me
Askin' me, "How did it feel?" Can't say it didn't surprise me
Last time I looked to my right, you niggas was standing beside me
How can some people I love hang around pussies who try me? Let's go
What did I miss?
What did I miss?
What did I miss?
What did I miss?
Let's go, let's go

I'm whippin' around on like six hundred acres, let's go, let's go, let's go
You niggas just better not ask for no favors, let's go, let's go, let's go
It's love for my brothers and death to a traitor, let's go
She might decide to say no to me now, but say yes to me later, let's go
Her ass is all natty like Florida Gator, let's go
You switched on the guys and supported a hater, let's go
What's the get-back for niggas? It's TBD
I look at this shit like a BTC
Could be down this week, then I'm up next week

I don't give a fuck if you love me, I don't give a fuck if you like me
Askin' me "How did it feel?" Can't say it didn't surprise me
Last time I looked to my right, you niggas was standing beside me
How can some people I love hang around pussies who try me? Let's go
What did I miss?
What did I miss?
What did I miss?
What did I miss?
Let's go

Ayy, let's go, let's go
Ayy, ayy, let's go, let's go
Ayy, ayy, let's go
Ayy, let's go, ayy, let's go

Yeah, niggas get punched in the face on some TLC shit, on the dead guys
Some TLC shit 'cause, my nigga, you gon' need a chilly ice pack for your left eye
I'm back in your city tonight, walkin' around with my head high
I saw bro went to Pop Out with them, but been dick riding gang since "Headlines"
It feels like nobody's there until you start givin' out two-tones
And nobody cares until they in front of your tombstone
Y'all been on that type of timing for too long
Iceman, Tiffany blue stones
I done made plenty shit right out of two wrongs, shit, let's go

Let's go
Let's go, let's go
Ayy, yeah
Let's go, let's go
Yeah, yeah, let's go
Yeah, let's go, let's go

What did I miss?
When I was looking at y'all and cooking with y'all
And giving out verses and bookings to y'all?
Making sure wires were hit, man, what did I miss?
When you was all in my crib lookin' at hoes
Word for word at all of the shows
You always felt like this, man, what did I miss?

.`
        },
        {
          title: "Which one",
          cover: "./assets/drake/which one.jpg",
          audio: "./assets/drake/Drake_-_Which_One_feat_Central_Cee__@BaseNaija.mp3",
          lyrics: `Does my hair look beautiful? (Yeah)
Do my titties look right?
Think I can knock a boy off right now?

[Drake:]
All the girls that's here for the truth, come put both hands on the DJ booth
Then wine your waist to the big man sound

And I get too stiff 'cause that ting's too round, good God
Make me lift up your gown, but your face so sweet, wanna spin you around
If I go link gang, I'll bring you around
If I go to the bar, I'll bring you around
Which one? Which one?
You're not like the tings you're around
You're a real good girl, so I'm bringin' you down
But come to the bed, I'll fling you around, weh
These guys can't make songs for the gyal dem
Trust me, this how the single should sound
Fuck anyone that's bringing you down
Sweetheart, you're doing your thing right now, good God

Yeah, all the girls that's here for the truth, come put two hands pon the DJ booth
Then wine your waist pon a real good yute dem

You want Cench or your ex, which one?
You want friends or success, which one?
Tell the sound man, "Spin this one"
Play this for the gyal dem party, dun

[Central Cee:]
God forbid a girl's tryna have fun
I got X if you wanna take drugs
You wanna have sex or do you wanna make love?
Which one? Which one? Which one? Which one?
Got a fairy ting and I got a witch one
A G'd up ting that I bring sticks 'round
And I've got a good girl, good girl, snitch one
Too many gyal, now I gotta switch one
Turn the hotel to a twenty V. one
Three-sixty, my head got spun
Junk in the trunk, can see it from front
Girl, your body is tea, it's pain, I'm sprung
Your backside weighin' you down, one ton
I got a chopstick for your wonton
Tell me what you want, what you really, really want
Put a coin in the slot, ya just hit jackpot

[Drake:]
Ayy, all the girls that's here for the truth, come put two hands on the DJ booth
Then wine your waist for the six-side yute and

Put your head inna the pillow, face first
Face first, face first, face first
Ayy, face first, face first
Put your head inna the pillow, face first
I'm in the jam, know the mandem, burst
You got makeup on the white shirt
I wanna fuck out your face and skrrt
You need to throw that ting inna reverse
Then work, work, work, work, work
Yeah, work, work, work, work, work
Your last man broke your heart and it hurts
You could cry out ya eye and curse
You want diamond watch, you want purse
You don't need swimsuit, take off your shirt
Bend your back, gyal, don't say a word
Face of a angel, I come like church
I can't wait, girl, I'm not a waiter
But you're sexy, you still get served
I'm at the Claridge's in London, burst
Put your head inna the pillow, face first

Yeah, all the girls that's here for the truth, come put two hands on the DJ booth
Then wine your waist for the six-side yute dem

Ayy, you want Cench or your ex, which one?
You want friends or success, which one?
Tell the sound man, "Spin this one"
Play this for the gyal dem party, dun`
        },
        {
          title: "She Will",
          cover: "./assets/drake/She Will_ Lil Wayne feat_ Drake.jpg",
          audio: "./assets/drake/Lil_Wayne_Drake_-_She_Will_@BaseNaija.mp3",
          lyrics: `I tell her, "Now go and pop that pussy for a real nigga!"
I already know that life is deep, but I still dig her
Niggas is jealous, but really I could care less
I'm in Hell's Kitchen with an apron and a hairnet
Devil on my shoulder, the Lord as my witness
So on my Libra scale I'm weighin' sins and forgiveness
What goes around comes around like a hula hoop
Karma is a bitch? Well, just make sure that bitch is beautiful
Life on the edge, I'm danglin' my feet
I tried to pay attention but attention paid me
Haters can't see me: nose-bleed seats
And today I went shoppin' and talk is still cheap
I rock to the beat of my drum set
I been at the top for a while and I ain't jump yet
But I'm Ray Charles to the bullshit
Now jump up on that dick and do a full split!

Uh, she just started to pop it for a nigga
And looked back and told me, "Baby, it's real."
And I say, "I ain't doubt you for a second."
I squeeze it and I could tell how it feel
I wish we could take off and go anywhere but here
Baby, you know the deal
And she bad, so maybe she won't, ugh
But shit, then again, maybe she will, yeah
Do it for the realest niggas in the fuckin' game right now
She will, yeah
Do it for the realest niggas in the fuckin' game right now
She will, she will, she will, ugh
Maybe for the money and the power and the fame right now
She will, she will, she will (Ugh)
Do it for the realest niggas in the fuckin' game right now
She will

I tell her, "Now go and pop that pussy for me!"
Haters can't see me, but them bitches still lookin' for me
And you could take it to the bank and deposit that
Put your two cents in and get a dollar back
Some people hang you out to dry like a towel rack
I'm all about I, give the rest of the vowels back
I like my girl thick, not just kinda fine
Eat her 'til she cry—call that "wine 'n' dine"
Try to check me and I'ma have 'em checkin' pulses
They say, "Choose wisely," that's why I was chosen
Rockin' like asphalt, it's the cash fault
Looked in the face of death and took its mask off
Now, I like my house big and my grass soft
I like my girl face south and her ass north
But I'm Ray Charles to the bullshit
Now hop up on that dick and do a full split!

Uh, she just started to pop it for a nigga
And looked back and told me, "Baby, it's real."
And I say, "I ain't doubt you for a second."
I squeeze it and I could tell how it feel
I wish we could take off
And go anywhere but here, baby, you know the deal
'Cause she bad so maybe she won't
Uh, but shit, then again, maybe she will
Do it for the realest niggas
In the fuckin' game right now, she will
Do it for the realest niggas
In the fuckin' game right now, she will
Maybe for the money and the power
And the fame right now, she will
Do it for the realest niggas
In the fuckin' game right now, she will

Uh, she just started to pop it for a nigga
And looked back and told me, "Baby, it's real."
And I say I ain't doubt you for a second
I squeeze it and I could tell how it feel (I feel like the sky is opening, and I'm get to it)
I wish we could take off and go anywhere but here baby you know the deal
(Feel like like the world is falling and I am rising)
'Cause she bad, so maybe she won't
Uh, but shit then again maybe she will
Carter 4 Tunechi
Do it for the realest niggas in the fuckin' game right now
She will
Do it for the realest niggas in the fuckin' game right now
She will, she will, she will
Maybe for the money and the power and the fame right now
She will, she will, she will
Do it for the realest niggas in the fuckin' game right now
She will, she will, she will
I think I love her
.`
        },
        {
          title: "Somebody Loves Me Pt. 2",
          cover: "./assets/drake/pt2.jpg",
          audio: "./assets/drake/PARTYNEXTDOOR_Drake_Cash_Cobain_-_SOMEBODY_LOVES_ME_PT_2_@BaseNaija.mp3",
          lyrics: `My name's Slizzy, but this bitch forgot
Run my city, they won't take my spot
Nigga run up, then he gon' get shot
I just ran a millie up, on God
Beat that pussy, she scream out, "No más"
Claim they real but that shit a façade
Gave me chills when I found out you lied
The nerve of you, I thought you would ride, thought you would slide
My bitch says she need a Cash App, I'ma send that like hi
I don't even wonder why, know my bitch so fly
I know she the prize, light skin, 5'5"
Nice eyes, ass on my thighs
Your bitch is good, but she is not better than mine
My bitch not friendly, don't like none of my guys
Nigga run up, then he gon' get shot
I just ran a millie up, on God

On God, yeah

We out in Brooklyn, turnin' up another notch
I'm Slizzy Drizzy, baby, you know how I rock
I'm doin' toasts with mimosas at the spa
I'm a stunna, I'm with C, that's on God
Your man time's up, bae, he's on the clock
I wear my Rollie upside down in the spot
That way the sixes is always on top
She said her bestie wanna get on and swap
I said, "Well, this time, I might have to-"
I said, "Well, this time, I might be a thot"
I can't tell you I'll stop
She just did a bean out in Boston, oh my
A Tesla in Texas, self-drive
A thizz on a bridge, see the city lights
Her name on the guest list, so am I
Let's go inside, aye
Okay

I'm still in the club, lookin' for love, oh no, no, nah
Done what it is, not what it was, had to switch it up
Super turned up, off two-threes, off two-threes
Better turn up, better turn up
Whoa, okay, yeah

Yeah, yeah
Somebody who loves me in the buildin'
Somebody who feels me in the buildin'
We throw fifty thou' to the ceiling
Oh yeah

I know there's somebody who loves me
Somebody who really loves me (Who loves me)
And that's all I need
Yeah`
        },

      ]
    },
    juicewrld: {
      name: "Juice WRLD",
      songs: [
        {
          title: "Fast",
          cover: "./assets/juice wrld/fast.jpg",
          audio: "./assets/juice wrld/Juice_WRLD_-_Fast_@BaseNaija.com.mp3",
          lyrics: `Well, I've been livin' fast, fast, fast, fast
Feelin' really bad, bad, bad, bad
Time really moves fast, fast, fast, fast
Better hurry up, and get in your bag, bag, bag, bag
I wear Dior, not a flag, -ag, -ag, -ag
I know all these niggas gettin' mad, mad, mad, mad
My hand on my trigger, I'm 'a die with respect, yeah
Fuckin' with my money, you'll get dealt like that, yeah

I took too many pills, count up the bills, uh
Molly in my cup, I can't tell you how I feel
Uh-uh, last call
Uh-uh, it's gnarly
Every day I be countin' up, countin' up the blues
Gotta win sometimes, when you always lose
I get high as a bitch, still the same dude I was back then
And now I'm lost and confused

I ain't see it coming
I ain't see it coming
But it still came
I'm talking 'bout life, aye
(Talkin' 'bout life)

Well, I've been livin' fast, fast, fast, fast
Feelin' really bad, bad, bad, bad
Time really moves fast, fast, fast, fast
Better hurry up, and get in your bag, bag, bag, bag
I wear Dior, not a flag, -ag, -ag, -ag
I know all these niggas gettin' mad, mad, mad, mad
My hand on my trigger, I'm 'a die with respect, yeah
Fuckin' with my money, you'll get dealt like that, yeah

I go through so much, I'm 19 years old
It's been months since I've felt at home
But it's okay 'cause I'm rich,
Psych! I'm still sad as a bitch

Right, I don't want nobody to think that I'm a asshole
I don't try to be mean on purpose, I promise
My momma taught me better than that, I'll be honest
I'll blame it on the drugs and this life I'm involved in

I ain't see it coming (I ain't see it)
I ain't see it coming (I ain't see it)
But it still came (Yeah, yeah, it still came)
I'm talking 'bout life, aye
(Talkin' 'bout life, yeah)

I've been livin' fast, fast, fast, fast
Feelin' really bad, bad, bad, bad
Time really moves fast, fast, fast, fast
Better hurry up, and get in your bag, bag, bag, bag
I wear Dior, not a flag, -ag, -ag, -ag
I know all these niggas gettin' mad, mad, mad, mad
My hand on my trigger, I'm 'a die with respect, yeah
Fuckin' with my money, you'll get dealt like that, yeah

Elevate, elevate, elevate myself
Now I'm on the ground, on the ground, haven't been myself,
But it's OK, it's cool, won't push the issue
What happens next? (a story to be continued)
Yeah

I've been livin' fast, fast, fast, fast
Feelin' really bad, bad, bad, bad
Time really moves fast, fast, fast, fast
Better hurry up, and get in your bag, bag, bag, bag
I wear Dior, not a flag, -ag, -ag, -ag
I know all these niggas gettin' mad, mad, mad, mad
My hand on my trigger, I'm 'a die with respect, yeah
Fuckin' with my money, you'll get dealt like that, yeah

(This is fire)
(Yeah, yo)
(This is fire)
.`
        },
        {
          title: "Come and Go",
          cover: "./assets/juice wrld/Juice WRLD Fighting Demons Art Cover.jpg",
          audio: "./assets/juice wrld/juice-wrld_juice-wrld-come-go-feat-marshmallow-make-out-life.mp3",
          lyrics: `Woah
Uh (Uh)
Oh, oh-oh, oh (Mello made it right, uh)

I try to be everything that I can
But sometimes I come out as bein' nothin'
I try to be everything that I can
But sometimes I come out as bein' nothin'
I pray to God that he make me a better man (Uh)
Maybe one day I'ma stand for somethin'
I'm thankin' God that he made you part of the plan
I guess I ain't go through all that Hell for nothin'
I'm always fuckin' up and wreckin' shit, it seems like I perfected it
I offer you my love, I hope you take it like some medicine
You tell me, ain't nobody better than me
I think that there's better than me
Hope you see the better in me
Always end up betterin' me

I don't wanna ruin this one
This type of love don't always come and go
I don't wanna ruin this one
This type of love don't always come and go
I don't wanna ruin this one
This type of love don't always come and go
I don't wanna ruin this one
This type of love don't always come and go

I don't wanna ruin this one
This type of love don't always come and go
I don't wanna ruin this one
This type of love don't always come and go

We take drugs then you hold me close
Then I tell you how you make me whole
Sometimes I feel you like bein' alone
Then you tell me that I shoulda stayed in the room
Guess I got it all wrong, all along, my fault
My mistakes prolly wipe all the rights I've done
Sayin' goodbye to bygones, those are bygones
Head up, baby stay strong, we gon' live long

I don't wanna ruin this one
This type of love don't always come and go
I don't wanna ruin this one
This type of love don't always come and go
I don't wanna ruin this one
This type of love don't always come and go
I don't wanna ruin this one
This type of love don't always come and go

I don't wanna ruin this one
This type of love don't always come and go
I don't wanna ruin this one
This type of love don't always come and go (Go, go)`
        },
        {
          title: "Man Of The Year",
          cover: "./assets/juice wrld/download.jpg",
          audio: "./assets/juice wrld/juice-wrld_juice-wrld-man-of-the-year-official-audio.mp3",
          lyrics: `Cheers
Sippin' Codeine like it's beer
I'm in London, so I'm screaming, "Cheers!"

Man of the year, still got problems
Lookin' in the mirror, you look awful
Talkin' to myself, do it too often
JK, Juice WRLD, you're so awesome
I'm running up funds
Bottle full of pills, let's have fun
No cheap thrills, only rich ones
Fire drills, hotter than the sun

My ups and downs
I'll jot them down
In London town
Cheers to the golden years

Let's raise our hands, let's sing and dance
I know I'm here to save you, I know I'm here to save you
Let's raise our hands and sing and dance
I know my lyrics saved you, I know I helped you break through

They say life's a puzzle, I'ma piece it together
But from the way I'm movin', I'll probably be piecing forever
I date a bad bitch, she'll be over decent forever
Even with fake tits, these other hoes just decent forever
My lady said she saw a baddie in the hotel lobby
Well, love, let's fuck her together
We got the world to our backs, give a fuck, never have
Middle fingers up, we're screamin', "Fuck 'em forever!"

[Alternative verse:]
Buzzin' like I'm Lightyear, infinity and beyond
Big-headed, in my mind, I'm always thinking of songs
Big dick too, probably won't fit in your mom
I made my shorty thick, that's the type of shit that I'm on
I got to admit it, she helped me find where I belong
Stayed down with me through all of my rights and my wrongs
So now it's me and her together a life long
Lock her heart up, hide the key, she ain't finna make bond

My ups and downs
I'll jot them down
In London town
Cheers to the golden years
My ups and downs
I'll jot them down
In London town
Cheers to the golden years

Let's raise our hands, let's sing and dance
I know I'm here to save you, I know I'm here to save you
Let's raise our hands and sing and dance
I know my lyrics saved you, I know I helped you break through`
        },
        {
          title: "Conversation",
          cover: "./assets/juice wrld/fast.jpg",
          audio: "./assets/juice wrld/juice-wrld_juice-wrld-conversations-official-audio.mp3",
          lyrics: `Oh my God, Ronny

The devil hit my phone, he wanna talk
But I'm not really up for conversations
I can have my cake and eat it, too
I just gotta make a reservation
Chillin' in my head, but it's hot
Flames everywhere, I see Satan
Demons tryna run up in my spot a lot
Really, really runnin' out of patience

T— Timing, timing, timing
All about timing, timing, timing
Sit back in my chair, relaxing and reclining
He has not a care in the world, no, I'm lying
Takin' all these meds to the face got me flying
Takin' all these meds to the face got me dying
Smoke 'til my mind frying, eyes red, high and crying
Numb the pain with Oxy and Dior, yeah, pricey
Juice like 2Pac Shakur, no ice tea
Givenchy, Louis V, Double V, icy
Wedding ring, better things, better half, wifey
Only things numbing me from this hard life, uh, uh, alright

The devil hit my phone, he wanna talk
But I'm not really up for conversations
I can have my cake and eat it, too
I just gotta make a reservation
Chillin' in my head, but it's hot
Flames everywhere, I see Satan
Demons tryna run up in my spot a lot
Really, really runnin' out of patience

I'm waiting, waiting, waiting, sittin' up
Waiting, waiting, waiting, contemplating
My heart racing
Feels like I'ma die every second of the day
So I gotta get high
Ain't no coming down, ain't no coming down, why?
My anxiety bring me down, that's the fucking downside
It's like every time I ball, I just end up off-sides
This light of mine goes dim tonight
Will I be alright?
Let me guess, no answer, right?

The devil hit my phone, he wanna talk
But I'm not really up for conversations
I can have my cake and eat it, too
I just gotta make a reservation
Chillin' in my head, but it's hot
Flames everywhere, I see Satan
Demons tryna run up in my spot a lot
Really, really runnin' out of patience`
        },
        {
          title: "Fighting Demons",
          cover: "./assets/juice wrld/Juice Wrld - Legends Never Die (2020 - Eu - Original).jpg",
          audio: "./assets/juice wrld/juice-wrld_juice-wrld-fighting-demons-official-audio.mp3",
          lyrics: `Run away
In fear of me dying today

Yeah, I run away
In fear of me dying today, ah
And I'm not the same
Who said I was subject to change?
My demons are breakin' out of their cage
I'm praying that I see another day (Chill, chill)
I said my demons are breakin' out of their cage
On my knees, I pray for better days

Chip, chip, cheerio, everything's all good, right?
I got rich, I got rich, I'm livin' that fast life
Couple M's in my bank account, I got cash, right?
And that's supposed to make me happy
I got a couple questions
How come that shit don't ever make me happy?
Money give me an erection
But that don't mean it's gon' be everlasting
Yeah, I know it's a blessing
But how come it always feel like the devil plottin'
And the devil watchin'?
He see me buyin' all these watches
Benjamin Franklin in my pockets
Ooh, been a year of the glitz and the glam
And the TV channels, brain's going scramble
Scrambling sometimes 'cause this shit is hard to handle
Demons in my heart (Yeah), they destroy me like a vandal (Ah)

Take my hand
Don't give up
Take my hand
Don't give up

Yeah, I run away
In fear of me dying today, ah
And I'm not the same
Who said I was subject to change?
My demons are breakin' out of their cage
I'm praying that I see another day (Chill, chill)
I said my demons are breakin' out of their cage
On my knees, I pray for better days

Karma ain't what you think it is
Super stressed, still handle all of my business
Do the best I can, yes, I can
Yes, I am, misfortune
I know in the dark, they be lurking (Why?)
Same way they lurk in your head when they get in your mind
You don't wanna know what they're tryin' to find
I'll protect your soul (Ah)

Take my hand
Don't give up
Take my hand
Don't give up

Yeah, I run away
In fear of me dying today, ah
And I'm not the same
Who said I was subject to change?
My demons are breakin' out of their cage
I'm praying that I see another day (Chill, chill)
I said my demons are breakin' out of their cage
On my knees, I pray for better days`
        },
        {
          title: "Righteous",
          cover: "./assets/juice wrld/righteous.jpg",
          audio: "./assets/juice wrld/juice-wrld_juice-wrld-righteous.mp3",
          lyrics: `I will (I will)
I will (I will)
I will
Oh-ooh (Oh-ooh)
Uh (Uh)

All white Gucci suit, I'm feeling righteous, yeah
I know that the truth is hard to digest, yeah
Five or six pills in my right hand, yeah
Codeine runneth over on my nightstand
Takin' medicine to fix all of the damage
My anxiety the size of a planet (Yeah, ooh)
Holes in my skull, over time
My heart's over ice (Woah)

Over ice, I'm freezing
Beautiful eyes, deceiving
We may die this evening
Coughing and wheezing, bleeding
Hi, I'm anxious so
Blood moons are my eyes, stay low
Red and black, they glow
Under attack, in my soul
When it's my time, I'll know
Never seen a hell so cold
Yeah, we'll make it out, I know
We'll run right through the flames, let's go

All white Gucci suit, I'm feeling righteous, yeah
I know that the truth is hard to digest, yeah
Five or six pills in my right hand, yeah
Codeine runneth over on my nightstand
Taking medicine to fix all of the damage
My anxiety the size of a planet (Yeah, ooh)
Holes in my skull, over time
My heart's over ice (Woah, uh)

I'm in too deep
Can't swim like me
We're drowning, so I will sing
My demons turn face under me
Inhale, exhale, but I can't breathe
Too busy drinking codeine doin' high speeds
Crash (Shh), pour a four, sip it slow, make the time pass
Take a pill for the thrill, have a relapse
Devil in my head tryna run gym laps
I ain't tryna race, he don't even know me like that

All white Gucci suit, I'm feeling righteous
I know that the truth is hard to digest
Five or six pills in my right hand
Codeine runneth over on my nightstand
Taking medicine to fix all of the damage
My anxiety the size of a planet (Yeah, ooh)
Holes in my skull, over time
My heart's over ice (Woah)

I will sing`
        },
        
        
      ]
    },
    wizkid: {
      name: "Wizkid",
      songs: [
        {
          title: "DYNAMITE",
          cover: "./assets/wizkid/Tyla & Wizkid - DYNAMITE.jpg",
          audio: "./assets/wizkid/Tyla-ft-Wizkid-DYNAMITE-(TrendyBeatz.com).mp3",
          lyrics: `Banger with the rhythm, dance to the beat
Keep that thing before you live on it
'Cause you will make a better maker dim, better maker
Banger with the rhythm, dance to the beat (Dum-dum-dum)
Keep that thing before you live on it (Deep)
'Cause you will, yeah

Why don't you bring on my way?
Hold me 'round my waist
We can take it slow, baby, you control the pace
The way I rotate, baby, that's a little taste
The way I rotate, I'ma put you in your place
Bad gyal, no delay
Baby, less shit
I don't wanna stop, baby, I don't need a break
For the rotate, you know I don't wanna wait
We can go late, make my body celebrate

I just wanna back it up on beat
Sing your name in key
I know what I want from you
You know what you want from me
I just wanna back it up beat
Sing your name in key
I've been waiting hard and all week
So tell me where you wanted me to be, oh, yeah

Freeze at your back
The way I like it, can't deny it
Your body bang like dynamite
You the feeling, you're kinda nice
See me eye to eye
We go back to back
We go night to night
Body on it, dynamite
Take it to my poison, we can finalize

Backstroke on it, swimming in the kitchen in the bus
Do everything to me, my baby, don't stop
You don't even need my consent, killing me, babe
I just want a likkle bit of your time, making this, oh
Everyday, tonight, take a drunk call on you
You can call me every time you want more (Mm, mm)
Move that thing, come rest on me now
I get the candy, way gon' make you bend for me now
All night, baby, all night, bend your back all night, hold my hand
Now you been making a nigga fantasize
I be done and all your real and I
It's alright, real life
Come on time, you're my ride

I just wanna back it up on beat
Sing your name in key
I know what I want from you
You know what you want from me
I just wanna back it up beat
Sing your name in key
I've been waiting hard and all week
So tell me where you wanted me to be, oh, yeah

Freeze at your back
The way I like it, can't deny it
Your body bang like dynamite
You the feeling, you're kinda nice
See me eye to eye
We go back to back
We go night to night
Body on it, dynamite
Take it to my poison, we can finalize

Move that thing, come rest on me now
I get the candy, way gon' make you bend for me now
All night, baby, all night, bend your back all night, hold my hand
Now you been making a nigga fantasize
I be done and all your real and I
It's alright, real life
Come on time, you're my ride
Freeze`
        },
        {
          title: "Forever Be Mine",
          cover: "./assets/wizkid/gunna.jpeg",
          audio: "./assets/wizkid/Gunna_-_Forever_Be_Mine_feat_Wizkid__@BaseNaija.mp3",
          lyrics: `You gon' forever be mine
You gon' forever be mine

She know I'm one a kind
She don't see none of these guys
She know I don't do no womanizin'
I stroke her and give her massages
I push her and tell her to strive
Rolls Phantom, I let her recline (Damn)
She say you forever be mine

You wanna chill or t-up?
Um, bring me them guns, get 'em beat up
Slow it down, baby, we ain't got to rush
Unless you want me to speed up
Hit it like a clutch, put some speed on it, uh
Open it, lick it, and spit on it
You countin' on me, you can bet on it
We flyin' Gulfstream with the bat on it
She said she don't care if it's sweat on it
She wash it and clean it and take care of it
It's covered, you know I took care of it
In public, she covered like Arabics
This money forever, inherit it

She know I'm one a kind (Uh)
She don't see none of these guys (Uh)
She know I don't do no womanizin' (Yeah)
I stroke her and give her massages (Yeah)
I push her and tell her to strive (Uh)
Rolls Phantom, I let her recline (Uh)
She say you forever be mine

Say she forever be mine (Uh)
Baby na, you be my type (Uh)
Omoge, show me the sign (Yeah)
Say she forever be mine
Swim in your ocean, baby girl come with the motion
Dey make me lose my composure, my lady one of a kind
I dey with you, my lady one of a kind
Chasin' the money and na you dey, back of my mind, omo
I dey with you, my lady one of a kind
She don't see none of you guys, she know I'm one a kind

(Yeah) She know I'm one a kind (Yeah)
She don't see none of these guys (Yeah)
She know I don't do no womanizin' (Yeah)
I stroke her and give her massages (Uh)
I push her and tell her to strive (Uh)
Rolls Phantom, I let her recline (Yeah)
She say you forever be mine

You give me the rush
I want the thighs to vibrate
I like the vibe we curated
Take a little piece and we go to the moon
Shake up the room, earthquake
Stare in her eyes, all day
Lil' mama fine, a mermaid
I take it with pride, she like my design, never decline a good face
Low-key when we slidin', straight-A
When you with me, it's a good day
When I'm fuckin on you, if I'm tellin' the truth, I've been thinkin' about you since the tour date
Thinkin' about you, if you missin' me too, well, I'm out in Saint-Tropez

(Yeah) She know I'm one a kind (Yeah)
She don't see none of these guys (Yeah)
She know I don't do no womanizin' (Yeah)
I stroke her and give her massages (Uh)
I push her and tell her to strive (Uh)
Rolls Phantom, I let her recline (Yeah)
She say you forever be mine

(Forever) Give me the rush
(Run it back, Turbo)`
        },
        {
          title: "Come Closer",
          cover: "./assets/wizkid/comecloser.jpg",
          audio: "./assets/wizkid/Wizkid_-_Come_Closer_feat_Drake__@BaseNaija.mp3",
          lyrics: `[Drake:] Go outside, big time forward, heh
[Wizkid:] Starboy dey here suh

Came into the game, no one replace me
Me love my Hennessy straight with no chaser
All of my guys know me all about me paper
Me got me girls all around me, me no chaser, yah
Starboy, call me number one
When me tune drop, the girls, they bounce along
Me no let nothing come between me and me paper
So when me come inna di place, me undertaker

Yeah, yeah, yeah, yeah
Yeah, yeah, yeah, yeah
Baby, come closer
Yeah, yeah, yeah, yeah
Yeah, yeah, yeah, yeah
Baby, come closer

Me, me number one inna me city
Me steady repping, representing for me city, yo
African-born, me rep my ting, yo
Me come clean like me come inna me video
Me, me come through like a soldier
She give me tease and she pleasing my roja
She got the keys to my Porsche and my Rover
We in Miami living La Vida Loca, ayy

Girl you got that ting, I know
You got the body, I know oh
You make me sing, I know
You make me sing, I know oh

Girl you got that ting, I know
You got the body, I know oh
You make me sing, I know
You make me sing, I know oh

Yeah, yeah, yeah, yeah
Yeah, yeah, yeah, yeah
Baby, come closer
Yeah, yeah, yeah, yeah
Yeah, yeah, yeah, yeah
Baby, come closer

[Drake:]
Too mix up in drama to go outside
Too mix up in drama to free my mind
Jealous people around me, I need to change my life
I just turn colder every time I try
What would I do without you, my chargie?
I don't feel that way with anybody
Tell me your secrets, I'm not messy
Steady it for me, girl, hold steady
I wanna put you in my life
Your hair smell like the tropics, your body look nice
One fuck cyaan hold me, we gotta go twice
I'm here for you, just tell me what you like
I wanna put you in my life

[Wizkid:]
Yeah, yeah, yeah, yeah
Yeah, yeah, yeah, yeah
Baby, come closer
Yeah, yeah, yeah, yeah
Yeah, yeah, yeah, yeah
Baby, come closer
`
        },
        {
          title: "Kai",
          cover: "./assets/wizkid/Olamide-Wizkid-Kai-678x381.jpg",
          audio: "./assets/wizkid/Olamide_-_Kai_feat_Wizkid__@BaseNaija.mp3",
          lyrics: `[Olamide:]
Yea
Mr. Bombastic, Mr. Romantic, Mr. Fantastic

Nothing is carved in stone
You know the night is young
I'm feeling good, I'm in my zone
Roll me a fat big blunt
And awọn t'emi tó bá wọlé (bàbá wọlé wá)
Don Perignon malati wole (hmmm)
Dorime dori like what?
Casamigo nlor
Abi, shey make I stop?
I'm so fly, my God!
Mr. Bombastic, Mr. Romantic
African boy wey dey do magic
Came in a Porsche left in a lambo
Banga boy, everybody wan blow
Pound sterling, lana tabi tí dé agbò
Mind over matter, I'm happy I know

Omo aleyi wa jo (jo, jo)
And you go loose control (tro, tro)
Bend your knees, touch your toes (toes, toes)
Give you the Badman love (Give you the Badman love)
Omo aleyi wa jo! (Omo aleyi wa jo)
And you go loose control (And you go loose control)
Bend your knees, touch your toes (Bend your knee, touch your toe)
Give you the Badman love (Give you the Badman love)

Omo l'ọ́pọ̀ tó dùn báyìí (báyìí)
Chineke spent lotta time (time)
When he dey make you, Kai!
Throw it to me left and right, baby, Kai! (Kai)
Kai! (Kai)
No kill~e person, baby, Kai
Kílówá dé gangan báyìí (báyìí)
Ebelebe, baby, Kai! (Kai)
Kai!

[Wizkid:]
It's too easy 'cause the money surplus
Na money dey stop long talk, long talk
How many things you wan count?
You better relate with your mind
I still dey find weytin dey do me
No come use your own come confuse me
Jeje I dey, nothing dey do me
Hot box spice, baby fun mi
Fun mi
Diamonds every new week
If there's something you wanna do, do it
Oohn, won le le, won le mumi
Men dey physicallly fit won le mun mi
Hmm
Owo nbe lapo mi o
Omo wa bamijo
Pour more Casamigos
Hmm~hmm~hmm

[Olamide:]
Omo aleyi wa jo (jo, jo)
And you go loose control (tro, tro)
Bend your knees, touch your toes (toes, toes)
Give you the Badman love (give you the Badman love)
Omo aleyi wa jo! (Omo aleyi wa jo)
And you go loose control (And you go loose control)
Bend your knees, touch your toes (Bend your knee, touch your toe)
Give you the Badman love (Give you the Badman love)

Omo l'ọ́pọ̀ tó dùn báyìí (báyìí)
Chineke spent lotta time (time)
When he dey make you, Kai!
Throw it to me left and right, baby, Kai! (Kai)
Kai! (Kai)
No kill~e person, baby, Kai
Kílówá dé gangan báyìí
Ebelebe, baby, Kai!
Kai!

Hmmm~mssssm
Yea
Mr. Bombastic, Mr. Romantic, Mr. Fantastic, O yapayastic`
        },

        
      ]
    },
    asake: {
      name: "Asake",
      songs: [
        {
          title: "Active",
          cover: "./assets/asake/Asake - Lungu B🛞Y (2024).jpg",
          audio: "./assets/asake/Asake_-_Active_feat_Travis_Scott__@BaseNaija.mp3",
          lyrics: `[Oh mhen am active
Oh mhen am active
Oh mhen am active
Oh mhen am active

Gbe mi dele o, gbe mi de'bẹ o
Two short o ma gbe mi de'bẹ o
E too sure iwọ gan-an maa de'bẹ o
Straight forward I no get kay leg o yeye o, ko sepe o
24/7 me I dey here o
You no strong make you dey for daycare o
Mo n gbona ori mi dey there o
Kampe o, kampe o
Mo duro mo duro kampe o
Oti pẹ ti mo ti sa nle o
Have been active aja mi sare o, sare o, sare o
Mo gbe wọn mo gbe wọn sare o
Ẹyin temi ẹ jẹ ka jaye o
Aye kan lo wa, ko saye o

Oh mhen am active
Oh mhen am active
Oh mhen am active
Oh mhen am active

Ahh yea this my shit
Left yo section to come to my shit
That ain't yo bitch that's my bitch
You don't like it you can suck my dick
I just hopped off from the PJ from the H to Ikeja
Got a fetish for the money yessir
If she think then I wanna pay her
Bring more naira I do it major
And I'm outside with the tribe
Gang activity I slide
Please believe I done seen the other side
Remember all we had to be was alive
Now I got 20 Vs in garage
Each house beach house overseas and a lodge
That was 30 mgs every P I'm prescribed
You can see it in my eyes
Don't bother me I be in the streets on 10 When I'm high

Oh mhen am active
Oh mhen am active
Oh mhen am active
Oh mhen am active

And if you wish me bad I swear na back to sender
Ṣe jẹjẹ lọmọ Eko mi lọ emi o bother
And if my success dey disturb you go recover
If e no be money no de call me no disturbance
I'm alright, I'm alright
Check your time
Check calendar
I'm alright, I'm alright
Check your time
Check calendar
`
        },
        {
          title: "Ligali",
          cover: "./assets/asake/Asake - Lungu B🛞Y (2024).jpg",
          audio: "./assets/asake/Asake_-_Ligali_@BaseNaija.mp3",
          lyrics: `Mr. Money with the vibe right now
Mr. Money with the vibe right now
Mr. Money with the vibe right now, right now, right now, right now, right now
Mr. Money with the vibe right now
Mr. Money with the vibe right now
Mr. Money with the-

Find me I dey Cali'
Free road see no traffic
2 girls for my backseat
We dey go my house mo fe ṣaye
Sweet life bi ti maggi
She dey whine waist over sabi
Gbe sunmọ mi ka ma lavi
No dey waste my time ọmọ gba 'bi
Ọmọ sunmọ mi ko jẹ ka reason
O mọ pe life is easy
For your own case mi o busy
Mi o fọ ọmọ zero kizzy
Ba mi fo mi o like agidi
Fashionnova ọmọ gidi
Casamigos mo ti wa mo ti dizzy, dizzy, dizzy

Blow my trumpet gan-an Ọlọhun, uhhn
O dẹ n gbe mi de'bẹ gan-an Ọlọhun, uhhn
Blow my trumpet gan-an Ọlọhun, uhhn
O dẹ n gbe mi de'bẹ gan-an Ọlọhun, uhhn

Gan-angster ọmọ ka ligali, ka ligali
Dance now odikwa big your ibadi
Calm down ọmọ ka ligali, ka ligali
Dance now ah ah ah ah ah
Gan-angster ọmọ ka ligali, ka ligali
Dance now odikwa big your ibadi
Calm down ọmọ ka ligali, ka ligali
Dance now ah ah

Blow my trumpet gan-an Ọlọhun, uhhn
O dẹ n gbe mi de'bẹ gan-an Ọlọhun, uhhn
Blow my trumpet gan-an Ọlọhun, uhhn
O dẹ n gbe mi de'bẹ gan-an Ọlọhun, uhhn

Find me I dey Cali'
Free road see no traffic
2 girls for my backseat
We dey go my house mo fe ṣaye
Sweet life bi ti maggi
She dey whine waist over sabi
Gbe sunmọ mi ka ma lavi
No dey waste my time ọmọ gba 'bi
Ọmọ sunmọ mi ko jẹ ka reason
O mọ pe life is easy
For your own case mi o busy
Mi o fọ ọmọ zero kizzy
Ba mi fo mi o like agidi
Fashionnova ọmọ gidi
Casamigos mo ti wa mo ti dizzy, dizzy, dizzy, dizzy, dizzy
`
        },
        {
          title: "Mentally",
          cover: "./assets/asake/Asake - Lungu B🛞Y (2024).jpg",
          audio: "./assets/asake/Asake_-_Mentally_@BaseNaija.mp3",
          lyrics: `Mentally mentally
I dey strategize mentally
No slaking no slaking
Ka ṣa ma lọ no shaking
Ọmọ them no fit imagine
Where I go dey tọmọrrow I dey move like magic
I fit dey for Cicinatti
Pass their go Abudhabi, anyhow e go be

In case you wan do pass yourself go front
Na money we dey use ball for here, ṣo mọ?
Aye yii ko pe meji jẹun lọ
Many people don go many people don come show love

Skibi kobobo skibi kobo
If I don dey dull give me liquor
Ọmọ ọpẹ lawa awa n gbọpẹ o
Alhadullilah a o ni na tan o
Ti n ba rọmọ mẹfa mo ma ṣọpẹ o
Ice on my neck
LV fuck am big on flex
Thug life make I dey shirtless
I dey reckless ko dẹ ni walẹ
Lagbara Satiramoni
Moving fast bi Sarkodie, Animakoli
O legendary
Uh nor nor nor is plenty
Loke loke jẹjẹly
Ridding slow in my Mercedes
Base one or two mehn am still on cruise
Ti n ba rọmọ mẹfa mo ma pọn mi kun

Timberland is my favorite shoe
Moving like I be scooby doo
My brother tell me what it do
A o ṣa le ku
OG's know me for my hood
Wọn ma n sọ pe mo n gara ju
Ọlọhun mi lo le humble mi
Bọlọ wan dey gum body
Hm hm hm hm hm comot body

Mentally mentally
I dey strategize mentally
No slaking no slaking
Ka ṣa ma lọ no shaking
Ọmọ them no fit imagine
Where I go dey tọmọrrow I dey move like magic
I fit dey for Cicinatti
Pass their go Abudhabi, anyhow e go be

In case you wan do pass yourself go front
Na money we dey use ball for here, ṣo mọ?
Aye yii ko pe meji jẹun lọ
Many people don go many people don come show love

Leg over, leg over, leg over, leg over, leg over, Muhammad Sallah
Cashing out, cashing out, cashing out, cashing cashing out, everyday na sallah
Fuck it up, fuck it up, fuck it up, fuck it up, fuck it up, baby you gat the power
Buss it down, buss it down, buss it down, buss it down, baby no wahala
Leg over, leg over, leg over, leg over, leg over, Muhammad Sallah
Cashing out, cashing out, cashing out, cashing cashing out, everyday na sallah
Fuck it up, fuck it up, fuck it up, fuck it up, fuck it up, baby you gat the power
Buss it down, buss it down, buss it down, buss it down, baby no wahala

Ṣo n lọ?
Ọmọ ṣo n lọ?
Ṣo n lọ?
Ṣo n lọ?
Ṣo n lọ?
`
        },
        {
          title: "Start",
          cover: "./assets/asake/Asake - Lungu B🛞Y (2024).jpg",
          audio: "./assets/asake/Asake_-_Start_@BaseNaija.mp3",
          lyrics: `Ojúmọ́ ti mọ́
Ojúmọ́ ti mọ́ mi
Nílẹ̀ yìí o
Ojúmọ́ ti mọ́, mo ríre o
Ojúmọ́ ti mọ́
Ojúmọ́ ti mọ́ mi
Nílẹ̀ yìí o
Ojúmọ́ ti mọ́, mo ríre o

Mr money steady killing show
Anywhere me I enter Issa big intro
Ọtọ la wa kogbagidi gbos
Street orientation as ọmọ iko
Paparanpa paparanpa
Ba ṣe n gbo Afro-beat la n calypso
Original boy from Lungu to space
New sound am feeling cool
Me I wan free my mind
Make I no yan too much
Elevate my mind make I no talk too much
Oh God am praying aba father give me more life
Wo wo wo wo oh wo wo wo thug life
`
        },
        {
          title: "Uhh Yeah",
          cover: "./assets/asake/Asake - Lungu B🛞Y (2024).jpg",
          audio: "./assets/asake/Asake_-_Uhh_Yeahh_@BaseNaija.mp3",
          lyrics: `Uhh yeah, uhh yeah
Uhh yeah, uhh yeah
Uhn uhn, uhn uhn
Uhn uhn, uhn uhn

Faji lawa
Ma lọ ṣe jagajaga
Ọgbaa lawa
Beere mi ni Kakawa
Big boys lawa
And we are living our lives
No sleep tonight
Just be doing as you like

Uhh yeah, uhh yeah
Uhh yeah, uhh yeah
Uhn uhn, uhn uhn
Uhn uhn, uhn uhn

Jo bi serpent
To ba fun mi I go dey on silent
If you buss my head you will never regret
I no say na turn by turn na me still be next, uhn uhn, uhn uhn
Jo bi serpent
To ba fun I go dey on silent
If you buss my head you will never regret
I no say na turn by turn na me still be next, uhn uhn, yeah

Faji lawa
Ma lọ ṣe jagajaga
Ọgbaa lawa
Beere mi ni Kakawa
Big boys lawa
And we are living our lives
No sleep tonight
Just be doing as you like

Faji lawa
Ma lọ ṣe jagajaga
Ọgbaa lawa
Beere mi ni Kakawa
Big boys lawa
And we are living our lives
No sleep tonight
Just be doing as you like

Uhh yeah, uhh yeah
Uhh yeah, uhh yeah
Uhn uhn, uhn uhn
Uhn uhn, uhn uhn

Barka de sallah
Asantesana
Men dey on power
Ma lọ tapo saala
You lot got to calm down
Shukushuku bambam
Watch me go big big in your eyes
Ọmọ I will bring you surprise
Ma ko ba mi, ma ko ba mi
Handle your business, ṣo gbọ mi?
I no say you like to faji
You can call Mr Money, President Giran-an Republic
Everyday na me be their topic
Wọn gbe mi sori bi fila boys
Spending money like philanthropy

Jo bi serpent
To ba fun I go dey on silent
If you buss my head you will never regret
I no say na turn by turn na me still be next, uhn uhn, yeah

Uhh yeah, uhh yeah
Uhh yeah, uhh yeah
Uhn uhn, uhn uhn
Uhn uhn, uhn uhn
`
        },
        {
          title: "Whine",
          cover: "./assets/asake/Asake - Lungu B🛞Y (2024).jpg",
          audio: "./assets/asake/Asake_-_Whine_feat_LUDMILLA__@BaseNaija.mp3",
          lyrics: `SAK PASE

Oh, baby, whine, baby, whine, baby, whine, baby, whine, baby, whine
Me, I wan dey fire, make we fire dey go ah
And if you want to loco, make we loco dey go ah
Baby, don't be shy
Oh, baby, whine, baby, whine, baby, whine, baby, whine, baby, whine
Me, I wan dey fire, make we fire dey go ah
And if you want to loco, make we loco dey go ah
Baby, don't be shy

She feels like sex to me
Tell me what you put in your recipe
Opor you bring out the best in me
Omo, me plus you say na destiny
So, baby, be my fine mamacita
At the end of the day you know say me na badman
Kosi wahala peace sign
E too clear for my face say na God with the design
Omo, see, I don see signs
All I see is you, mami, you too good
Your win na my win, no play
Whenever bad man chilling next to you
E be like say I dey lose my cool
Slow pace, baby girl, no rush
Toba fe wa loke ishe nu tun lor
By the time the sun rise, me, I'm okay

Oh, baby, whine, baby, whine, baby, whine, baby, whine, baby, whine
Me, I wan dey fire, make we fire dey go ah
And if you want to loco, make we loco dey go ah
Baby, don't be shy
Oh, baby, whine, baby, whine, baby, whine, baby, whine, baby, whine
Me, I wan dey fire, make we fire dey go ah
And if you want to loco, make we loco dey go ah
Baby, don't be shy

Baby, let me redefine sexy
Shake your body, mete dança à la BR
Se apaixona não 'cause I'm a bad bitch
'Cê vem com os papo' torto' que eu mando o sete
Viciante igual Nutella
Vai botar uma foto minha na tua tela
Crazy, crazy in love
Show me what you do no meu funk
Ele pede pra mamacita
Esse movimento lento excita
'Cê me pede certin'
Até brinco com a ponta da língua
Você nem imagina por onde você vai me ver chorar
Baby, vai, baby, vai, baby, vai, baby, vai, baby, vai
Bota tudo dentro, vai ficar querendo mais
Só sentada firme, apaga a luz, se satisfaz
Baby, don't be shy

Oh, baby, whine, baby, whine, baby, whine, baby, whine, baby, whine
Me, I wan dey fire, make we fire dey go ah
And if you want to loco, make we loco dey go ah
Baby, don't be shy
Oh, baby, whine, baby, whine, baby, whine, baby, whine, baby, whine
Me, I wan dey fire, make we fire dey go ah
And if you want to loco, make we loco dey go ah
Baby, don't be shy

`
        },
      ]
    },
    centralcee: {
      name: "CentralCee",
      songs: [
        {
          title: "Let go",
          cover: "./assets/centrall cee/let go.jpg",
          audio: "./assets/centrall cee/Central Cee - Let Go [Music Video].mp3",
          lyrics: `Well, you only need the light when it's burning low
Only miss the sun when it starts to snow (Nastylgia)
Only know you love her when you let her go
Mm-mhm, alright

Only know you've been high when you're feeling low
Only hate the roads when you're missing home
Only know you love her when you let her go
You said that pussy's mine, so why'd you let it go?
You're such a ho

I loved you until you try to get in my head
And that's why I lost respect
You're doin' the most to get my attention, baby, I'm not impressed, uh
I changed my bedsheets, but I still smell your flesh
I don't know how we got in this mess
I rarely get this in depth
This girl made me question love
This girl made me feel like less of a man 'cause I'm feelin' depressed and stuff
Can't believe I was willing to drop everyone and invest in us
The last time that we fucked was fucked, the way you got up, got dressed and cut
Look, I thought that we could have been
Maybe, I was too optimistic
Tell me what you need, I'll provide everythin'
Baby, you don't know what you're missin'
Our chemistry fucked quantum psychics, psychics
Feelin' your energy, feelin' your spirit
If this is the end, I need one more visit
They're showin' me love but I still feel empty
I need somethin' a lot more fulfillin', uh
Move out of London town then move to a rural village
She made me delete that pic off my phone
But I close my eyes, still see that image
Won't chase it, my heart ain't in it, it's finished
Too far gone can't fix it, missed it, damage is done

Well, you only need the light when it's burning low
Only miss the sun when it starts to snow
Only know you love her when you let her go
Mm-mhm, alright

Only know you've been high when you're feeling low
Only hate the roads when you're missing home
Only know you love her when you let her go
You said that pussy's mine, so why'd you let it go?
You're such a ho

I called four times on a private caller, I feel like a creep, uh
I know there's plenty of fish in the sea but I fucked those girls, got you in my mind
When you fucked those guys did you wish they were me?
Turn them around and I put them in doggy, I don't even fuck them in missionary
There's no intimacy and additionally, it's obligatory
When I fucked that opp thot
I don't even take my socks off and I don't even know why I did it
As soon as I'm finished, I'm gettin' 'em dropped off
And what makes it worse I know that she's tellin' her friends that I chopped her
I don't know what you're doin' when we're not together
It's drivin' me mad, 'cause I can't even stop ya
Type in your bank details and sent you a bag, I'm rich like, "Bitch, unblock me"
Make it quick, can you do that promptly?
If you won't give me your love for free, I'll buy it, just tell me how much it'll cost me
Your new man ain't got nothin' on me
Fuck your annual wage, I can make that monthly, huh, alright

Well, you only need the light when it's burning low
Only miss the sun when it starts to snow
Only know you love her when you let her go
Mm-mhm, alright

Only know you've been high when you're feeling low
Only hate the roads when you're missing home
Only know you love her when you let her go
You said that pussy's mine, so why'd you let it go?
You're such a ho

`
        },
        {
          title: "CRG",
          cover: "./assets/centrall cee/crg and gbp.jpg",
          audio: "./assets/centrall cee/Central_Cee_-_CRG_feat_Dave__@BaseNaija.mp3",
          lyrics: `Slow down with the greatness gotta take time
Poles out on a bait ting on a date night
They try imitate mine that's a hate crime
Bro's in the can throwing hands, that's a cage fight
Big crib and the gates high, got the canine
ZK knife, sit right on the waistline
Heard through the grapevine, it don't make wine
They hope and they pray I don't stay high

I changed when I got famous, I'll explain it
My fam hating, they say that I got favourites
Paid, but I got payments upon payments
I'm in pain but I'm not blaming, I'm just saying
And my bro's blood thirsty he's got cravings
If he lean out the window he's not aiming
Remember hearing the door knock and it's bailiffs
Now it's acres, I ain't even got neighbours

40, 000 square feet off of this pain
Look at me I got heart acres
You don't know what heartache is
I can't ask no one for a teaspoon of sugar
It's tough, got no neighbours
My uncles had no papers
We sold sweets in school
Made sense that the mandem grew up and sold flavours
Wanted a million so much
Went to the perfume store bought Paco Rabanne
TSG had me in the back of the van and prang
Wanna book a flight, Japan
I'm on a private jet and the pilots telling me jokes
Selling me land

I'm driving on a ban
True say I got disqualifications
Asking God, why bless me? I'm a sinner
Why bless me when I've sinned?
I don't care if the next man lose
I just wanna see us man win
Business class is free
So my mum takes every snack and every drink
For the times that we struggled and we never had
I get on my-, I'm tellin 'em

Slow down with the greatness gotta take time
Poles out on a bait ting on a date night
They try imitate mine that's a hate crime
Bro's in the can throwing hands, that's a cage fight
Big crib and the gates high, got the canine
ZK knife, sit right on the waistline
Heard through the grapevine, it don't make wine
They hope and they pray I don't stay high

I changed when I got famous, I'll explain it
My fam hating, they say that I got favourites
Paid, but I got payments upon payments
I'm in pain but I'm not blaming, I'm just saying
And my bro's blood thirsty he's got cravings
If he lean out the window he's not aiming
Remember hearing the door knock and it's bailiffs
Now it's acres, I ain't even got neighbours

You know that you're rich when you get a new crib
But it don't have a number, shit's got a name
My white ting said she only listens to house
But she listen to rap if it's Cench or Dave
25 and I'm sitting on 25m
Mummy ain't gotta stress now the rent get paid
And they wonder why they ain't getting blessed same way
'Cause they ain't on taking the risk that we-

Practice makes perfect
And I'm scratching the surface, expanding
I was sofa surfing, no mattress
And I slept in the trap, smelt like cat piss
Now I'm with a Scarlett Johansen
A-List actress said I'm so handsome
When I wanted a fit I would go Camden
Now it's Rodeo Drive, let's go Lanvin
Nobody else from London's gone Hollywood
Just Cee or the boy Damson
20 bags for the sofa and one lamp
And I got marble floors, I ain't got damp anymore
Tom Ford fragrance well pampered
And my passport full so they can't stamp it
In Dubai and I'm staying in Atlantis
I ain't snapped it once 'cause I'm not gassed

I'm front row at the fashion show
Tryna see which model that I wanna fuck next
She watching her weight 'cause she doing campaigns
Tell her ride this dick, she ain't done enough steps
I see those guys, from the other side
On a keto diet 'cause they don't get bread
Money don't buy happiness 'cause I'm upset
The more money that you get make you give a fuck less

`
        },
        {
          title: "GUILT TRIPPIN",
          cover: "./assets/centrall cee/guilt tripping.jpg",
          audio: "./assets/centrall cee/Central_Cee_-_GUILT_TRIPPIN_feat_Sexyy_Red__@BaseNaija.mp3",
          lyrics: `Uh

Baby, I'm built different, I feel bad, so I put you on a jet quick
And that's the real definition of some guilt trippin'
You're a feminist, you don't believe in gender roles
Somehow I got you in the kitchen doin' meal preppin'
Cut the pepper, girl, I love a lil' stir fry
I ain't gotta add a scotch bonnet, you're already fire
Fling you on the bonnet, have your pussy by the Merc' sign, hm
I ain't perfect, I'm a mess
You ain't gotta up and leave me so quick, I wanna learn from my mistakes
Got me playin' mind games, tryna find out how you feel
We're both young and unhinged, so we probably feel the same
I shot and hit your leg, gotta sharpen up my aim
I was tryna get your heart, but instead I caused you pain
I'm ashamed, I see red and start thinkin' that you're fake
Girl, I'm sorry cah I never should've called you them names

You ain't a bitch, but baby, you're my bitch
You ain't no ho, but baby, you're my ho
I gotta repay you cah I treat you like shit
I'll buy you real VVS, I ain't gon' get you rhinestones
You ain't a bitch, but baby, you're my bitch
You ain't no ho, but baby, you're my ho
I've been around the world while I realise this (Yeah, yeah, yeah)
You're the one that I want, there's no place like home (Say)

Say I'm your bitch, better act like it then
I think we're in love, I'm your lil' evil twin
I like how we vibe, you're my lover and friend
Stuntin' on bitches, I'm drivin' his Benz (Skrrt, skrrt)
But damn, too many hoes on my line
You let go of yours, I'ma let go of mine (Sike)
Nigga, you know that I'm lyin'
Don't play by my feelings 'cause niggas be dyin'
I do what I want 'cause I'm grown
Act like I'm mad, but you turnin' me on
We out in public, can't wait to get home
We all in the car, he rippin' my thong
Can't stay mad at you and I know that you wrong
I can't help myself, my mind really gone
I be missin' you bad, wanna kiss through the phone (Mwuah)
Come fuck with a boss, you scared? Come on

You a dog, but baby, you my dog (Grr)
Fuck these hoes and niggas, we gon' ball
I been around the world, I ain't met a nigga yet
That get my coochie wet, I be all in his draws (Ah)
You a dog, but baby, you my dog (Grr)
Fuck these hoes and niggas we gon' ball
I been around the world, I ain't met a nigga yet
That get my coochie wet, I be nuttin' in my draws (Bae)

You ain't a bitch, but baby, you're my bitch
You ain't a ho, but baby, you're my ho
I gotta repay you cah I treat you like shit
I'll buy you real VVS, I ain't gon' get you rhinestones
You ain't a bitch, but baby, you're my bitch
You ain't a ho, but baby, you're my ho
I been around the world, but I realise this
You're the one that I want, there's no place like home`
        },
        {
          title: "GBP",
          cover: "./assets/centrall cee/crg and gbp.jpg",
          audio: "./assets/centrall cee/Central_Cee_-_GBP_feat_21_Savage__@BaseNaija.mp3",
          lyrics: `Yo, come on, Mitch, you know I gotta go
Bring your motherfuckin' ass

If it weren't the UK, would've had a AK-47 with a hundred rounds
Red carpet in my trackie and Air Max, they want a boy with a London style
We ain't got generational wealth, got a couple of mill' for my unborn child
If I pay a man a hundred thousand pound, I can get man bun right in front of a crowd, uh
That's GBP, the price go up if it's USD
Better watch your words, I'll get you X'd 'bout the shit you tweet (On God)
I told lil' bro if it's personal, he better jump out and do it on feet
We got somethin' in common with scuba divers, why? 'Cause the guys in deep

If it weren't the UK, would've had a AK, gang outside with a samurai sword
Nike Tech Fleece with the Air Force 1, my ski mask on, but we don't snowboard
Go on a glide, leave your phone at home, what's wrong with these guys? They go and record
So distraught, we was broke as hell, well, until we broke the law
If I lived in Harlem, I would've been Mitch, them man would've been like Ace and snitched
If it was Oakland, I would've been a pimp
If it was 1930, North Carolina, I would've been Frank with the mink
If the opps got nominated for the BRITs, would've went to the ceremony with sticks
And the G-17 would've came with a switch

If it weren't the UK, would've had a AK-47 with a hundred rounds
Red carpet in my trackie and Air Max, they want a boy with a London style
We ain't got generational wealth, got a couple of mill' for my unborn child
If I pay man a hundred thousand pound, I can get man bun right in front of a crowd, uh (Pussy)
That's GBP, the price go up if it's USD (21)
Better watch your words, I'll get you X'd 'bout the shit you tweet (On God)
I told lil' bro if it's personal, he better jump out and do it on feet (21)
We got somethin' in common with scuba divers, why? 'Cause the guys in deep

Latex gloves, I'm on a drill, watch 'em fall, Jack and Jill
Up on the opps, seven to nil, Premier League, I'm in the field
Two things that you'll never see is me run from a opp or a bitch in my will
Got day-ones, and I'm with 'em still, fightin' demons, swallowin' pills
I still want a deal with Nike (On God)
I can't get caught on no ring, so I'm inside-outtin' the shiesty (Straight up)
We go through the front door, 'cause they gon' tell when that back door shit get spicy (Rats)
Internet beef, if I catch you in traffic, the fuck you gon' do, nigga, type me? (Pussy)
I put this on God, I hit the bitch once, she already tryna be wifey (Damn)
I'm from the street and I got opps, I don't got time to go sightsee (Damn)
Wake me up with head, put this in your purse and shut the fuck up if you like me (21)
I'll fill up your closet with Birkins, buy you a wagon and make sure you icy (Alright)

Alright, If it weren't the UK, would've had an AK-47 with a hundred rounds
Red carpet in my trackie and Air Max, they want a boy with a London style
We ain't got generational wealth, got a couple of mill' for my unborn child
If I pay man a hundred thousand pound, I can get man bun right in front of a crowd, uh (Pussy)
That's GBP, the price go up if it's USD (21)
Better watch your words, I'll get you X'd 'bout the shit you tweet (On God)
I told lil' bro if it's personal, he better jump out and do it on feet (21)
We got somethin' in common with scuba divers, why? 'Cause the guys in deep
`
        },
        {
          title: "TOO MUCH",
          cover: "./assets/centrall cee/central cee.jpg",
          audio: "./assets/centrall cee/The_Kid_LAROl_Jung_Kook_Central_Cee_-_TOO_MUCH_@BaseNaija.mp3",
          lyrics: `Uh, if we had the chance and the time to spend
Would you do it again? Would you do it again?
Was it too much? Uh, yeah (Too much)
Was it too much? Ayy, uh (Too much)
Now you're callin' your friends 'cause I'm gone again
When I'm back around, would you do it again?
Was it too much? Uh, ayy (Too much)
Was it too much? Uh, ayy (Too much)

So tell me what got in the way
And how I thought it was good that it changed
And I'm sayin' I'm sorry again
Oh, I could never get out of my way
Hit the store and your wardrobe's replaced
And still all that you do is complain
You keep on throwin' it back in my face
And now you're tellin' me I need some space

So I'm layin' in my bed, tripped off the shrooms now
I'll be dead before I'm without you now
Realizin' I'm addicted to you now
Come right here, baby, relax and cool down (Let's go)
What you sayin'? Hit me back with the move now (Ooh)
In my brain, no one else, it's just you now (Yeah)
Let me love you the way that I do now
I never knew how

If we had the chance and the time to spend
Would you do it again? Would you do it again?
Was it too much? Uh, yeah (Too much)
Was it too much? Ayy, uh (Too much)
Now you're callin' your friends 'cause I'm gone again
When I'm back around, would you do it again?
Was it too much? Uh, ayy (Too much)
Was it too much? Uh, ayy (Too much)
Was it too much?

Am I doin' too much?
Do you understand my slang and get my sense of humor?
When your girlfriends tell you I been fuckin' 'round
Would you believe me if I told you that they lyin' and that's just a rumor?
Send you my personal driver, man, this ain't just a Uber
You know it's serious when you stay at mine and bring your toothbrush
Extra panties in your bag and some makeup removers
You know I'm hardly on my own 'cause I stay with a shooter
She call me daddy, she got issues, I am not her father
Hop off the boat, into the jet, leave the yacht at the harbor
She injectin' with Ozempic, tryna stop her hunger
Huh, I wanked before you came so I can fuck you longer
S650, chauffeur driven, just tap your address in
Pack your bags and we can board the next flight, we can check in
Make sure you check that you ain't forgot your anti-depressants
Before I fly you out again and you make me regret it (Ooh)

Uh, it's that time, pour it up, let's take one into the head
Top down, almost crashed 'cause I'm lookin' at your texts
Back and forth, and you mad about shit I never said
Double text, no reply, but I'm knowin' that you read it
What you sayin'? Hit me back with the move now (Ooh)
In my brain, no one else, it's just you now (Yeah)
Let me love you the way that I do now
I never knew how

If we had the chance and the time to spend
Would you do it again? Would you do it again?
Was it too much? Uh, yeah (Too much, ooh)
Was it too much? Ayy, uh (Too much)
Now you're callin' your friends 'cause I'm gone again
When I'm back around, would you do it again? (Would you do it again?)
Was it too much? Uh, ayy (Too much)
Was it too much? Uh, ayy (Tell me, was it too much?)
Was it too much?

Was it too much? (Ooh)
Was it too much? (Ooh)
Was it too much?`
        },
        
      ]
    }
  };

  // DOM Elements
  const artistCards = document.querySelectorAll('.artist-card');
  const artistsGrid = document.getElementById('artistsGrid');
  const artistsHeader = document.getElementById('artistsHeader');
  const songsListContainer = document.getElementById('songsListContainer');
  const songsList = document.getElementById('songsList');
  const currentArtistName = document.getElementById('currentArtistName');
  const backToArtistsBtn = document.getElementById('backToArtists');

  // Music Player Elements
  const musicPlayer = document.getElementById('musicPlayer');
  const audioPlayer = document.getElementById('audioPlayer');
  const playerSongTitle = document.getElementById('playerSongTitle');
  const playerArtistName = document.getElementById('playerArtistName');
  const playerCover = document.getElementById('playerCover');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playPauseIcon = document.getElementById('playPauseIcon');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const playerProgress = document.getElementById('playerProgress');
  const currentTime = document.getElementById('currentTime');
  const totalTime = document.getElementById('totalTime');
  const playerDownloadBtn = document.getElementById('playerDownloadBtn');
  const closePlayerBtn = document.getElementById('closePlayerBtn');

  // Lyrics Modal Elements
  const lyricsModalArtist = document.getElementById('lyricsModalArtist');
  const closeLyricsArtist = document.getElementById('closeLyricsArtist');
  const lyricsModalTitle = document.getElementById('lyricsModalTitle');
  const lyricsText = document.getElementById('lyricsText');

  // Player State
  let currentPlaylist = [];
  let currentTrackIndex = 0;
  let currentArtistKey = '';
  let isPlaying = false;

  // Debug log
  console.log('Artist cards found:', artistCards.length);

  // === ARTIST CARD CLICK ===
  artistCards.forEach((card, index) => {
    console.log('Adding listener to card', index);
    card.addEventListener('click', () => {
      const artistKey = card.getAttribute('data-artist');
      console.log('Clicked artist:', artistKey);
      showArtistSongs(artistKey);
    });
  });

  // Show Artist Songs
  function showArtistSongs(artistKey) {
    console.log('Showing songs for:', artistKey);
    currentArtistKey = artistKey;
    const artistData = artistsSongsData[artistKey];
    
    if (!artistData) {
      console.error('Artist data not found for:', artistKey);
      return;
    }
    
    // Update playlist
    currentPlaylist = artistData.songs.map((song, index) => ({
      ...song,
      artist: artistData.name,
      index: index
    }));
    
    // Hide artists grid and header
    artistsGrid.classList.add('hide');
    artistsHeader.classList.add('hide');
    
    // Show back button
    backToArtistsBtn.classList.add('show');
    
    // Update artist name
    currentArtistName.textContent = artistData.name;
    
    // Render songs
    renderSongs(artistData.songs, artistData.name);
    
    // Show songs container
    setTimeout(() => {
      songsListContainer.classList.add('show');
    }, 300);
  }

  // Render Songs
  function renderSongs(songs, artistName) {
    songsList.innerHTML = '';
    
    songs.forEach((song, index) => {
      const songItem = document.createElement('div');
      songItem.className = 'song-item';
      songItem.innerHTML = `
        <div class="song-cover-container">
          <img src="${song.cover}" alt="${song.title}" class="song-cover">
        </div>
        <div class="song-info-section">
          <h4 class="song-title">${song.title}</h4>
          <p class="song-artist">${artistName}</p>
        </div>
        <div class="song-actions">
          <button class="song-action-btn play-btn-song" data-index="${index}">
            <span>▶</span>
            <span>Play</span>
          </button>
          <button class="song-action-btn download-btn-song" data-index="${index}">
            <span>⬇</span>
            <span>Download</span>
          </button>
          <button class="song-action-btn lyrics-btn-song" data-index="${index}">
            <span></span>
            <span>Lyrics</span>
          </button>
        </div>
      `;
      
      songsList.appendChild(songItem);
    });
    
    // Add event listeners to song buttons
    addSongEventListeners();
  }

  // Add Event Listeners to Song Buttons
  function addSongEventListeners() {
    // Play buttons
    document.querySelectorAll('.play-btn-song').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-index'));
        playTrack(index);
      });
    });
    
    // Download buttons
    document.querySelectorAll('.download-btn-song').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-index'));
        downloadTrack(index);
      });
    });
    
    // Lyrics buttons
    document.querySelectorAll('.lyrics-btn-song').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-index'));
        showLyrics(index);
      });
    });
  }

  // === BACK TO ARTISTS ===
  if (backToArtistsBtn) {
    backToArtistsBtn.addEventListener('click', () => {
      // Hide songs container
      songsListContainer.classList.remove('show');
      
      // Hide back button
      backToArtistsBtn.classList.remove('show');
      
      // Show artists grid and header
      setTimeout(() => {
        artistsGrid.classList.remove('hide');
        artistsHeader.classList.remove('hide');
      }, 300);
    });
  }

  // === MUSIC PLAYER FUNCTIONS ===

  // Play Track
  function playTrack(index) {
    currentTrackIndex = index;
    const track = currentPlaylist[index];
    
    if (!track) return;
    
    // Update player UI
    playerSongTitle.textContent = track.title;
    playerArtistName.textContent = track.artist;
    playerCover.src = track.cover;
    
    // Alert if no audio file
    if (!track.audio || track.audio === 'path/to/unavailable.mp3') {
      alert('Audio file not added yet! Add your MP3 file path in the JavaScript.');
      return;
    }
    
    // Set audio source
    audioPlayer.src = track.audio;

    // Pause all trending music players
document.querySelectorAll('.music-audio').forEach(audio => {
  audio.pause();
});
document.querySelectorAll('.play-btn').forEach(btn => {
  btn.textContent = '▶';
});

// Play audio
audioPlayer.play();
    
    // Play audio
    audioPlayer.play();
    isPlaying = true;
    playPauseIcon.textContent = '⏸';
    
    // Show player
    musicPlayer.classList.add('show');
  }

  // Play/Pause Toggle
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        playPauseIcon.textContent = '▶';
      } else {
        audioPlayer.play();
        isPlaying = true;
        playPauseIcon.textContent = '⏸';
      }
    });
  }

  // Previous Track
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentTrackIndex > 0) {
        playTrack(currentTrackIndex - 1);
      } else {
        playTrack(currentPlaylist.length - 1);
      }
    });
  }

  // Next Track
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentTrackIndex < currentPlaylist.length - 1) {
        playTrack(currentTrackIndex + 1);
      } else {
        playTrack(0);
      }
    });
  }

  // Auto-play next track
  if (audioPlayer) {
    audioPlayer.addEventListener('ended', () => {
      if (currentTrackIndex < currentPlaylist.length - 1) {
        playTrack(currentTrackIndex + 1);
      } else {
        playTrack(0);
      }
    });

    // Update Progress Bar
    audioPlayer.addEventListener('timeupdate', () => {
      if (audioPlayer.duration) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        playerProgress.value = progress;
        
        currentTime.textContent = formatTime(audioPlayer.currentTime);
        totalTime.textContent = formatTime(audioPlayer.duration);
      }
    });
  }

  // Seek functionality
  if (playerProgress) {
    playerProgress.addEventListener('input', (e) => {
      const seekTime = (e.target.value / 100) * audioPlayer.duration;
      audioPlayer.currentTime = seekTime;
    });
  }

  // Format Time
  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Download Track
  function downloadTrack(index) {
    const track = currentPlaylist[index];
    if (!track) return;
    
    if (!track.audio || track.audio === 'path/to/unavailable.mp3') {
      alert('Audio file not added yet!');
      return;
    }
    
    const link = document.createElement('a');
    link.href = track.audio;
    link.download = `${track.title} - ${track.artist}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    const downloadBtns = document.querySelectorAll('.download-btn-song');
    const btn = downloadBtns[index];
    if (btn) {
      btn.innerHTML = '<span>✓</span><span>Downloaded</span>';
      setTimeout(() => {
        btn.innerHTML = '<span>⬇</span><span>Download</span>';
      }, 2000);
    }
  }

  // Player Download Button
  if (playerDownloadBtn) {
    playerDownloadBtn.addEventListener('click', () => {
      downloadTrack(currentTrackIndex);
    });
  }

  // Close Player
  if (closePlayerBtn) {
    closePlayerBtn.addEventListener('click', () => {
      audioPlayer.pause();
      isPlaying = false;
      playPauseIcon.textContent = '▶';
      musicPlayer.classList.remove('show');
    });
  }

  // === LYRICS MODAL ===

  // Show Lyrics
  function showLyrics(index) {
    const track = currentPlaylist[index];
    if (!track) return;
    
    lyricsModalTitle.textContent = `${track.title} - ${track.artist}`;
    lyricsText.textContent = track.lyrics;
    
    lyricsModalArtist.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  // Close Lyrics Modal
  if (closeLyricsArtist) {
    closeLyricsArtist.addEventListener('click', () => {
      lyricsModalArtist.classList.remove('show');
      document.body.style.overflow = 'auto';
    });
  }

  // Close lyrics when clicking outside
  if (lyricsModalArtist) {
    lyricsModalArtist.addEventListener('click', (e) => {
      if (e.target === lyricsModalArtist) {
        lyricsModalArtist.classList.remove('show');
        document.body.style.overflow = 'auto';
      }
    });
  }

  console.log('Artists section initialized successfully!');
}


const artistsGrid = document.getElementById('artistsGrid');
const artistsHeader = document.getElementById('artistsHeader');
const songsListContainer = document.getElementById('songsListContainer');
const songsList = document.getElementById('songsList');
const currentArtistName = document.getElementById('currentArtistName');
const backToArtistsBtn = document.getElementById('backToArtists');

// Music Player Elements
const musicPlayer = document.getElementById('musicPlayer');
const audioPlayer = document.getElementById('audioPlayer');
const playerSongTitle = document.getElementById('playerSongTitle');
const playerArtistName = document.getElementById('playerArtistName');
const playerCover = document.getElementById('playerCover');
const playPauseBtn = document.getElementById('playPauseBtn');
const playPauseIcon = document.getElementById('playPauseIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playerProgress = document.getElementById('playerProgress');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const playerDownloadBtn = document.getElementById('playerDownloadBtn');
const closePlayerBtn = document.getElementById('closePlayerBtn');

// Lyrics Modal Elements
const lyricsModalArtist = document.getElementById('lyricsModalArtist');
const closeLyricsArtist = document.getElementById('closeLyricsArtist');
const lyricsModalTitle = document.getElementById('lyricsModalTitle');
const lyricsText = document.getElementById('lyricsText');

// Player State
let currentPlaylist = [];
let currentTrackIndex = 0;
let currentArtistKey = '';
let isPlaying = false;

// === ARTIST CARD CLICK ===


// Show Artist Songs
function showArtistSongs(artistKey) {
  currentArtistKey = artistKey;
  const artistData = artistsSongsData[artistKey];
  
  if (!artistData) return;
  
  // Update playlist
  currentPlaylist = artistData.songs.map((song, index) => ({
    ...song,
    artist: artistData.name,
    index: index
  }));
  
  // Hide artists grid and header
  artistsGrid.classList.add('hide');
  artistsHeader.classList.add('hide');
  
  // Show back button
  backToArtistsBtn.classList.add('show');
  
  // Update artist name
  currentArtistName.textContent = artistData.name;
  
  // Render songs
  renderSongs(artistData.songs, artistData.name);
  
  // Show songs container
  setTimeout(() => {
    songsListContainer.classList.add('show');
  }, 300);
}

// Render Songs
function renderSongs(songs, artistName) {
  songsList.innerHTML = '';
  
  songs.forEach((song, index) => {
    const songItem = document.createElement('div');
    songItem.className = 'song-item';
    songItem.innerHTML = `
      <div class="song-cover-container">
        <img src="${song.cover}" alt="${song.title}" class="song-cover">
      </div>
      <div class="song-info-section">
        <h4 class="song-title">${song.title}</h4>
        <p class="song-artist">${artistName}</p>
      </div>
      <div class="song-actions">
        <button class="song-action-btn play-btn-song" data-index="${index}">
          <span>▶</span>
          <span>Play</span>
        </button>
        <button class="song-action-btn download-btn-song" data-index="${index}">
          <span>⬇</span>
          <span>Download</span>
        </button>
        <button class="song-action-btn lyrics-btn-song" data-index="${index}">
          <span></span>
          <span>Lyrics</span>
        </button>
      </div>
    `;
    
    songsList.appendChild(songItem);
  });
  
  // Add event listeners to song buttons
  addSongEventListeners();
}

// Add Event Listeners to Song Buttons
function addSongEventListeners() {
  // Play buttons
  document.querySelectorAll('.play-btn-song').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.currentTarget.getAttribute('data-index'));
      playTrack(index);
    });
  });
  
  // Download buttons
  document.querySelectorAll('.download-btn-song').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.currentTarget.getAttribute('data-index'));
      downloadTrack(index);
    });
  });
  
  // Lyrics buttons
  document.querySelectorAll('.lyrics-btn-song').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.currentTarget.getAttribute('data-index'));
      showLyrics(index);
    });
  });
}

// === BACK TO ARTISTS ===
backToArtistsBtn.addEventListener('click', () => {
  // Hide songs container
  songsListContainer.classList.remove('show');
  
  // Hide back button
  backToArtistsBtn.classList.remove('show');
  
  // Show artists grid and header
  setTimeout(() => {
    artistsGrid.classList.remove('hide');
    artistsHeader.classList.remove('hide');
  }, 300);
});

// === MUSIC PLAYER FUNCTIONS ===

// Play Track
function playTrack(index) {
  currentTrackIndex = index;
  const track = currentPlaylist[index];
  
  if (!track) return;
  
  // Update player UI
  playerSongTitle.textContent = track.title;
  playerArtistName.textContent = track.artist;
  playerCover.src = track.cover;
  
  // Set audio source
  audioPlayer.src = track.audio;
  
  // Pause all trending music players
document.querySelectorAll('.music-audio').forEach(audio => {
  audio.pause();
});
document.querySelectorAll('.play-btn').forEach(btn => {
  btn.textContent = '▶';
});

// Play audio
audioPlayer.play();
  // Play audio
  audioPlayer.play();
  isPlaying = true;
  playPauseIcon.textContent = '⏸';
  
  // Show player
  musicPlayer.classList.add('show');
}

// Play/Pause Toggle
playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    audioPlayer.pause();
    isPlaying = false;
    playPauseIcon.textContent = '▶';
  } else {
    audioPlayer.play();
    isPlaying = true;
    playPauseIcon.textContent = '⏸';
  }
});

// Previous Track
prevBtn.addEventListener('click', () => {
  if (currentTrackIndex > 0) {
    playTrack(currentTrackIndex - 1);
  } else {
    playTrack(currentPlaylist.length - 1); // Loop to last track
  }
});

// Next Track
nextBtn.addEventListener('click', () => {
  if (currentTrackIndex < currentPlaylist.length - 1) {
    playTrack(currentTrackIndex + 1);
  } else {
    playTrack(0); // Loop to first track
  }
});

// Auto-play next track when current ends
audioPlayer.addEventListener('ended', () => {
  if (currentTrackIndex < currentPlaylist.length - 1) {
    playTrack(currentTrackIndex + 1);
  } else {
    playTrack(0); // Loop back to first track
  }
});

// Update Progress Bar
audioPlayer.addEventListener('timeupdate', () => {
  if (audioPlayer.duration) {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    playerProgress.value = progress;
    
    // Update time displays
    currentTime.textContent = formatTime(audioPlayer.currentTime);
    totalTime.textContent = formatTime(audioPlayer.duration);
  }
});

// Seek functionality
playerProgress.addEventListener('input', (e) => {
  const seekTime = (e.target.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
});

// Format Time (seconds to mm:ss)
function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Download Track
function downloadTrack(index) {
  const track = currentPlaylist[index];
  if (!track) return;
  
  // Create download link
  const link = document.createElement('a');
  link.href = track.audio;
  link.download = `${track.title} - ${track.artist}.mp3`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Visual feedback
  const downloadBtns = document.querySelectorAll('.download-btn-song');
  const btn = downloadBtns[index];
  if (btn) {
    btn.innerHTML = '<span>✓</span><span>Downloaded</span>';
    setTimeout(() => {
      btn.innerHTML = '<span>⬇</span><span>Download</span>';
    }, 2000);
  }
}

// Player Download Button
playerDownloadBtn.addEventListener('click', () => {
  downloadTrack(currentTrackIndex);
});

// Close Player
closePlayerBtn.addEventListener('click', () => {
  audioPlayer.pause();
  isPlaying = false;
  playPauseIcon.textContent = '▶';
  musicPlayer.classList.remove('show');
});

// === LYRICS MODAL ===

// Show Lyrics
function showLyrics(index) {
  const track = currentPlaylist[index];
  if (!track) return;
  
  lyricsModalTitle.textContent = `${track.title} - ${track.artist}`;
  lyricsText.textContent = track.lyrics;
  
  lyricsModalArtist.classList.add('show');
  document.body.style.overflow = 'hidden';
}

// Close Lyrics Modal
closeLyricsArtist.addEventListener('click', () => {
  lyricsModalArtist.classList.remove('show');
  document.body.style.overflow = 'auto';
});

// Close lyrics when clicking outside
lyricsModalArtist.addEventListener('click', (e) => {
  if (e.target === lyricsModalArtist) {
    lyricsModalArtist.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
});

// === KEYBOARD SHORTCUTS ===
document.addEventListener('keydown', (e) => {
  if (musicPlayer.classList.contains('show')) {
    // Space bar - play/pause
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
      e.preventDefault();
      playPauseBtn.click();
    }
    
    // Arrow Left - previous
    if (e.code === 'ArrowLeft') {
      prevBtn.click();
    }
    
    // Arrow Right - next
    if (e.code === 'ArrowRight') {
      nextBtn.click();
    }
  }
});



 // Sample news data
        const browseNewsData = [
            {
                id: 'news-1',
                artistImg: './assets/trending/dojahcat news.jpg',
                artistName: 'Doja Cat',
              title: 'Doja Cat Drops Surprise Single "Galactic Vibes"',
              description: 'The genre-blending hit comes with a vibrant music video, instantly trending across all major streaming platforms and social media.',
              date: '1 hour ago'

            },
            {
                id: 'news-2',
                artistImg: './assets/trending/Cardi b news.jpg',
                artistName: 'Cardi B',
                title: 'Cardi B Dominates the Charts Again',
                description: 'Cardi B\'s newest hit has stormed the streaming platforms, hitting 100M streams in under a week and cementing her status as one of the most influential female rappers of her generation.',

                date: '5 hours ago'
            },
            {
                id: 'news-3',
                artistImg: './assets/trending/juice wrld news.jpg',
                artistName: 'Juice WRLD',
                title: 'Posthumous Juice WRLD Documentary Coming Soon',
                description: 'A new documentary exploring the life and legacy of Juice WRLD is set to premiere next month, featuring never-before-seen footage and interviews.',
                date: '8 hours ago'
            },
            {
                id: 'news-4',
                artistImg: './assets/trending/wizkid news.jpg',
                artistName: 'Wizkid',
                title: 'Wizkid Announces World Tour 2025',
                description: 'The Afrobeats superstar reveals dates for his highly anticipated global tour, with stops in over 30 cities across 5 continents.',
                date: '12 hours ago'
            },
            {
                id: 'news-5',
                artistImg: './assets/trending/travis scott news.jpg',
                artistName: 'Travis Scott',
                title: 'Travis Scott Collaborates with Nike',
                description: 'La Flame teams up with Nike once again for an exclusive sneaker drop. The limited edition collection drops this Friday at midnight.',
                date: '1 day ago'
            },
            {
                id: 'news-6',
                artistImg: './assets/trending/omahlay news.jpg',
                artistName: 'Omah Lay',
                title: 'Omah Lay Stuns Fans at Paris Fashion Week',
                description: 'Omah Lay turns heads with a bold red and white checkered outfit, making waves in both music and fashion circles.',
                date: '2 days ago'

            }
        ];

        // Sample comments for each post
        const browseInitialComments = {
            'news-1': [
                {
                    avatar: 'https://i.pravatar.cc/150?img=12',
                    author: 'MusicLover23',
                    text: 'That video is so creative! Loving the aesthetics 😍',
                    date: '1 hour ago'
                },
                {
                    avatar: 'https://i.pravatar.cc/150?img=25',
                    author: 'HipHopFan',
                    text: 'Galactic Vibes is already on repeat in my playlist 👌',
                    date: '45 mins ago'
                },
                {
                    avatar: 'https://i.pravatar.cc/150?img=25',
                    author: 'HipHopFan',
                    text: 'Doja Cat never misses, queens only 👑',
                    date: '50 mins ago'
                },
            ],
            'news-2': [
                {
                    avatar: 'https://i.pravatar.cc/150?img=33',
                    author: 'Barb4Life',
                    text: 'Queen did it again! 👑💕',
                    date: '3 hours ago'
                },
                {
                    avatar: 'https://i.pravatar.cc/150?img=47',
                    author: 'RapEnthusiast',
                    text: 'She\'s breaking all the records. Legend status!',
                    date: '2 hours ago'
                },
                {
                    avatar: 'https://i.pravatar.cc/150?img=47',
                    author: 'RapEnthusiast',
                    text: '100M streams in a week? That’s insane! Respect 🙌',
                    date: '2 hours ago'
                },
            ],
            'news-3': [
                {
                    avatar: 'https://i.pravatar.cc/150?img=8',
                    author: 'JuiceForever',
                    text: 'Still can\'t believe he\'s gone. RIP legend 999 🕊️',
                    date: '6 hours ago'
                },
                {
                    avatar: 'https://i.pravatar.cc/150?img=8',
                    author: 'Jamesx',
                    text: 'Hope they show the behind-the-scenes stuff from his studio days 😭',
                    date: '6 hours ago'
                },
                {
                    avatar: 'https://i.pravatar.cc/150?img=8',
                    author: 'ferran yamal',
                    text: 'The world really lost someone special. Excited but nervous to watch this.',
                    date: '6 hours ago'
                },
            ],
            'news-4': [
                {
                    avatar: 'https://i.pravatar.cc/150?img=52',
                    author: 'AfrobeatLover',
                    text: 'Finally! Been waiting for this tour announcement! 🌍',
                    date: '10 hours ago'
                },
                {
                    avatar: 'https://i.pravatar.cc/150?img=18',
                    author: 'GlobalVibes',
                    text: 'Wizkid bringing that African heat worldwide! 🔥',
                    date: '9 hours ago'
                }
            ],
            'news-5': [
                {
                    avatar: 'https://i.pravatar.cc/150?img=31',
                    author: 'SneakerHead',
                    text: 'The Travis x Nike collabs are always instant classics!',
                    date: '20 hours ago'
                }
            ],
            'news-6': [
                {
                    avatar: 'https://i.pravatar.cc/150?img=44',
                    author: 'BeyHive4Ever',
                    text: 'Not just a musician, he’s a style icon now too. Respect! ❤️',
                    date: '1 day ago'
                },
                {
                    avatar: 'https://i.pravatar.cc/150?img=29',
                    author: 'InspiredDaily',
                    text: 'Can’t wait to see him in more fashion events. He’s really stepping up!',
                    date: '1 day ago'
                },
            ]
        };

        // Initialize localStorage if needed
        function browseInitStorage() {
            if (!localStorage.getItem('browseLikes')) {
                localStorage.setItem('browseLikes', JSON.stringify({}));
            }
            if (!localStorage.getItem('browseComments')) {
                localStorage.setItem('browseComments', JSON.stringify(browseInitialComments));
            }
        }

        // Get likes from storage
        function browseGetLikes() {
            return JSON.parse(localStorage.getItem('browseLikes'));
        }

        // Save likes to storage
        function browseSaveLikes(likesObj) {
            localStorage.setItem('browseLikes', JSON.stringify(likesObj));
        }

        // Get comments from storage
        function browseGetComments() {
            return JSON.parse(localStorage.getItem('browseComments'));
        }

        // Save comments to storage
        function browseSaveComments(commentsObj) {
            localStorage.setItem('browseComments', JSON.stringify(commentsObj));
        }

        // Format date for new comments
        function browseFormatDate() {
            return 'Just now';
        }

        // Render a single comment
        function browseRenderComment(commentData) {
            return `
                <div class="browse-comment">
                    <img src="${commentData.avatar}" alt="${commentData.author}" class="browse-comment-avatar">
                    <div class="browse-comment-content">
                        <div class="browse-comment-author">${commentData.author}</div>
                        <div class="browse-comment-text">${commentData.text}</div>
                        <div class="browse-comment-date">${commentData.date}</div>
                    </div>
                </div>
            `;
        }

        // Create a news post
        function browseCreatePost(newsItem) {
            const currentLikes = browseGetLikes();
            const likeCount = currentLikes[newsItem.id] || 0;
            const isLiked = likeCount > 0;
            const allComments = browseGetComments();
            const postComments = allComments[newsItem.id] || [];

            return `
                <article class="browse-post" data-post-id="${newsItem.id}">
                    <div class="browse-post-header">
                        <img src="${newsItem.artistImg}" alt="${newsItem.artistName}" class="browse-artist-img">
                        <div class="browse-post-info">
                            <h2 class="browse-post-title">${newsItem.title}</h2>
                            <p class="browse-post-desc">${newsItem.description}</p>
                            <span class="browse-post-date">${newsItem.date}</span>
                        </div>
                    </div>
                    
                    <div class="browse-actions">
                        <button class="browse-action-btn browse-like-btn ${isLiked ? 'browse-liked' : ''}" data-post-id="${newsItem.id}">
                            <span class="browse-action-icon">${isLiked ? '❤️' : '🤍'}</span>
                            <span class="browse-like-count">${likeCount}</span>
                        </button>
                        <button class="browse-action-btn browse-comment-btn" data-post-id="${newsItem.id}">
                            <span class="browse-action-icon">💬</span>
                            <span>${postComments.length} Comments</span>
                        </button>
                    </div>

                    <div class="browse-comments-section" id="comments-${newsItem.id}">
                        <div class="browse-comments-list">
                            ${postComments.map(c => browseRenderComment(c)).join('')}
                        </div>
                        <div class="browse-comment-input-area">
                            <input 
                                type="text" 
                                class="browse-comment-input" 
                                placeholder="Write a comment..."
                                data-post-id="${newsItem.id}"
                            >
                            <button class="browse-comment-submit" data-post-id="${newsItem.id}">Post</button>
                        </div>
                    </div>
                </article>
            `;
        }

        // Handle like button click
        function browseHandleLike(postId) {
            const likesObj = browseGetLikes();
            const currentLikes = likesObj[postId] || 0;
            
            // Toggle like
            if (currentLikes > 0) {
                likesObj[postId] = 0;
            } else {
                likesObj[postId] = currentLikes + 1;
            }
            
            browseSaveLikes(likesObj);
            
            // Update UI
            const likeBtn = document.querySelector(`.browse-like-btn[data-post-id="${postId}"]`);
            const likeCount = likeBtn.querySelector('.browse-like-count');
            const likeIcon = likeBtn.querySelector('.browse-action-icon');
            
            if (likesObj[postId] > 0) {
                likeBtn.classList.add('browse-liked');
                likeIcon.textContent = '❤️';
                likeCount.textContent = likesObj[postId];
            } else {
                likeBtn.classList.remove('browse-liked');
                likeIcon.textContent = '🤍';
                likeCount.textContent = '0';
            }
        }

        // Handle comment button click
        function browseToggleComments(postId) {
            const commentsSection = document.getElementById(`comments-${postId}`);
            commentsSection.classList.toggle('browse-open');
        }

        // Handle posting a new comment
        function browsePostComment(postId, inputElem) {
            const commentText = inputElem.value.trim();
            
            if (!commentText) return;
            
            const newComment = {
                avatar: 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70),
                author: 'You',
                text: commentText,
                date: browseFormatDate()
            };
            
            const allComments = browseGetComments();
            if (!allComments[postId]) {
                allComments[postId] = [];
            }
            allComments[postId].push(newComment);
            browseSaveComments(allComments);
            
            // Update UI
            const commentsList = document.querySelector(`#comments-${postId} .browse-comments-list`);
            commentsList.insertAdjacentHTML('beforeend', browseRenderComment(newComment));
            
            // Update comment count
            const commentBtn = document.querySelector(`.browse-comment-btn[data-post-id="${postId}"] span:last-child`);
            commentBtn.textContent = `${allComments[postId].length} Comments`;
            
            // Clear input
            inputElem.value = '';
        }

        // Scroll reveal animation
        function browseRevealOnScroll() {
            const posts = document.querySelectorAll('.browse-post');
            
            posts.forEach(post => {
                const postTop = post.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (postTop < windowHeight - 100) {
                    post.classList.add('browse-visible');
                }
            });
        }

        // Initialize the feed
        function browseInitFeed() {
            browseInitStorage();
            
            const feedContainer = document.getElementById('browseFeed');
            const postsHTML = browseNewsData.map(news => browseCreatePost(news)).join('');
            feedContainer.innerHTML = postsHTML;
            
            // Add event listeners
            document.addEventListener('click', (evt) => {
                // Like button
                if (evt.target.closest('.browse-like-btn')) {
                    const postId = evt.target.closest('.browse-like-btn').dataset.postId;
                    browseHandleLike(postId);
                }
                
                // Comment toggle button
                if (evt.target.closest('.browse-comment-btn')) {
                    const postId = evt.target.closest('.browse-comment-btn').dataset.postId;
                    browseToggleComments(postId);
                }
                
                // Comment submit button
                if (evt.target.closest('.browse-comment-submit')) {
                    const postId = evt.target.closest('.browse-comment-submit').dataset.postId;
                    const inputElem = document.querySelector(`.browse-comment-input[data-post-id="${postId}"]`);
                    browsePostComment(postId, inputElem);
                }
            });
            
            // Handle Enter key in comment inputs
            document.addEventListener('keypress', (evt) => {
                if (evt.key === 'Enter' && evt.target.classList.contains('browse-comment-input')) {
                    const postId = evt.target.dataset.postId;
                    browsePostComment(postId, evt.target);
                }
            });
            
            // Scroll animations
            window.addEventListener('scroll', browseRevealOnScroll);
            browseRevealOnScroll(); // Initial check
        }

        // Start the app
        browseInitFeed();









        // Search Functionality
(function() {
    'use strict';

    // Your search data
    const searchData = [
        { type: 'artist', name: 'Drake', section: 'drake', icon: '🎤' },
        { type: 'artist', name: 'J.Cole', section: 'jcole', icon: '🎤' },
        { type: 'artist', name: 'Juice WRLD', section: 'juicewrld', icon: '🎤' },
        { type: 'artist', name: 'Wizkid', section: 'wizkid', icon: '🎤' },
        { type: 'artist', name: 'Asake', section: 'asake', icon: '🎤' },
        { type: 'artist', name: 'Centralcee', section: 'centralcee', icon: '🎤' },



        { type: 'song', name: 'What did i miss', artist: 'Drake', section: 'drake', icon: '🎵' },
        { type: 'song', name: 'Push ups', artist: 'Drake', section: 'drake', icon: '🎵' },
        { type: 'song', name: 'Uuugly', artist: 'Drake', section: 'drake', icon: '🎵' },
        { type: 'song', name: 'Somebody Loves Me Pt. 2', artist: 'Drake', section: 'drake', icon: '🎵' },
        { type: 'song', name: 'She will', artist: 'Drake', section: 'drake', icon: '🎵' },
        { type: 'song', name: 'Which one', artist: 'Drake', section: 'drake', icon: '🎵' },
        




        { type: 'song', name: 'Fast', artist: 'Juice WRLD', section: 'juicewrld', icon: '🎵' },
        { type: 'song', name: 'Come and go', artist: 'Juice WRLD', section: 'juicewrld', icon: '🎵' },
        { type: 'song', name: 'Man of the year', artist: 'Juice WRLD', section: 'juicewrld', icon: '🎵' },
        { type: 'song', name: 'Conversation', artist: 'Juice WRLD', section: 'juicewrld', icon: '🎵' },
        { type: 'song', name: 'Fighting Demons', artist: 'Juice WRLD', section: 'juicewrld', icon: '🎵' },
        { type: 'song', name: 'Righteous', artist: 'Juice WRLD', section: 'juicewrld', icon: '🎵' },


        { type: 'song', name: 'Whine', artist: 'Asake', section: 'asake', icon: '🎵' },
        { type: 'song', name: 'Start', artist: 'Asake', section: 'asake', icon: '🎵' },
        { type: 'song', name: 'Ligali', artist: 'Asake', section: 'asake', icon: '🎵' },
        { type: 'song', name: 'Active', artist: 'Asake', section: 'asake', icon: '🎵' },
        { type: 'song', name: 'Uhh Yeah', artist: 'Asake', section: 'asake', icon: '🎵' },
        { type: 'song', name: 'Mentally', artist: 'Asake', section: 'asake', icon: '🎵' },


        { type: 'song', name: 'Let go', artist: 'Central Cee', section: 'centralcee', icon: '🎵' },
        { type: 'song', name: 'CRG', artist: 'Central Cee', section: 'centralcee', icon: '🎵' },
        { type: 'song', name: 'Guilt trippin', artist: 'Central Cee', section: 'centralcee', icon: '🎵' },
        { type: 'song', name: 'GBP', artist: 'Central Cee', section: 'centralcee', icon: '🎵' },
        { type: 'song', name: 'Too much', artist: 'Central Cee', section: 'centralcee', icon: '🎵' },




        { type: 'song', name: 'Pi', artist: 'J cole', section: 'jcole', icon: '🎵' },
        { type: 'song', name: '3001', artist: 'J cole', section: 'jcole', icon: '🎵' },
        { type: 'song', name: 'Stealth Mode', artist: 'J cole', section: 'jcole', icon: '🎵' },
        { type: 'song', name: 'Power Trippin', artist: 'J cole', section: 'jcole', icon: '🎵' },
        { type: 'song', name: ' Trae The Truth in Ibiza', artist: 'J cole', section: 'jcole', icon: '🎵' },
        { type: 'song', name: ' 7 minutes drill', artist: 'J cole', section: 'jcole', icon: '🎵' },


       { type: 'song', name: 'Come Closer', artist: 'WIZKID', section: 'wizkid', icon: '🎵' },
       { type: 'song', name: 'Kai', artist: 'WIZKID', section: 'wizkid', icon: '🎵' },
       { type: 'song', name: 'Forever Be Mine', artist: 'WIZKID', section: 'wizkid', icon: '🎵' },
       { type: 'song', name: 'DYNAMITE', artist: 'WIZKID', section: 'wizkid', icon: '🎵' },


        // Add more songs and artists
    ];

    // Get elements
    const desktopInput = document.getElementById('searchInputDesktop');
    const mobileInput = document.getElementById('searchInputMobile');
    const desktopSuggestions = document.getElementById('searchSuggestionsDesktop');
    const mobileSuggestions = document.getElementById('searchSuggestionsMobile');
    const desktopNoResults = document.getElementById('noResultsDesktop');
    const mobileNoResults = document.getElementById('noResultsMobile');

    // Search function
    function performSearch(query, suggestionsEl, noResultsEl) {
        const term = query.toLowerCase().trim();

        if (term === '') {
            suggestionsEl.classList.remove('active');
            noResultsEl.style.display = 'none';
            return;
        }

        const results = searchData.filter(item => {
            const nameMatch = item.name.toLowerCase().includes(term);
            const artistMatch = item.artist ? item.artist.toLowerCase().includes(term) : false;
            return nameMatch || artistMatch;
        });

        if (results.length > 0) {
            displayResults(results, suggestionsEl);
            noResultsEl.style.display = 'none';
        } else {
            suggestionsEl.classList.remove('active');
            noResultsEl.style.display = 'block';
            setTimeout(() => { noResultsEl.style.display = 'none'; }, 3000);
        }
    }

    // Display results
    function displayResults(results, container) {
        const artists = results.filter(r => r.type === 'artist');
        const songs = results.filter(r => r.type === 'song');

        let html = '';

        if (artists.length > 0) {
            html += '<div class="suggestion-category">Artists</div>';
            artists.forEach(a => {
                html += `
                    <div class="search-suggestion-item" data-section="${a.section}">
                        <span class="suggestion-icon">${a.icon}</span>
                        <div class="suggestion-content">
                            <div class="suggestion-title">${a.name}</div>
                            <div class="suggestion-type">Artist</div>
                        </div>
                    </div>
                `;
            });
        }

        if (songs.length > 0) {
            html += '<div class="suggestion-category">Songs</div>';
            songs.forEach(s => {
                html += `
                    <div class="search-suggestion-item" data-section="${s.section}">
                        <span class="suggestion-icon">${s.icon}</span>
                        <div class="suggestion-content">
                            <div class="suggestion-title">${s.name}</div>
                            <div class="suggestion-meta">${s.artist}</div>
                        </div>
                    </div>
                `;
            });
        }

        container.innerHTML = html;
        container.classList.add('active');

        container.querySelectorAll('.search-suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                const section = this.getAttribute('data-section');
                navigateTo(section);
                container.classList.remove('active');
            });
        });
    }

    // Navigate to section
    function navigateTo(sectionId) {
        let target = document.getElementById(sectionId) || document.querySelector(`[data-artist="${sectionId}"]`);
        
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (desktopInput) desktopInput.value = '';
            if (mobileInput) mobileInput.value = '';
        }
    }

    // Setup input listeners
    if (desktopInput) {
        desktopInput.addEventListener('input', function(e) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                performSearch(e.target.value, desktopSuggestions, desktopNoResults);
            }, 300);
        });
    }

    if (mobileInput) {
        mobileInput.addEventListener('input', function(e) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                performSearch(e.target.value, mobileSuggestions, mobileNoResults);
            }, 300);
        });
    }

    // Close on outside click
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search') && !e.target.closest('.search-mobile')) {
            if (desktopSuggestions) desktopSuggestions.classList.remove('active');
            if (mobileSuggestions) mobileSuggestions.classList.remove('active');
            if (desktopNoResults) desktopNoResults.style.display = 'none';
            if (mobileNoResults) mobileNoResults.style.display = 'none';
        }
    });

    console.log('Search functionality ready!');
})();