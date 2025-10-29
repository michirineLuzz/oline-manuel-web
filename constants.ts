import { GalleryImage, Video, Event } from './types';

export const PROFILE_DATA = {
    stageName: 'Oline',
    realName: 'Oline Manuel',
    dob: '3 November, 2007',
    height: '167cm',
    team: 'Trainee',
    hobbies: 'Ballet dancing, drawing, painting.',
    debut: '18 November, 2023',
    totalShow: '90+ Show',
    bio: 'Oline a member of JKT48 12th generation, has gained widespread attention for her calm charm and gentle manner of speaking. Oline has a number of interesting unique qualities. She is talented in painting with a preference for abstract art, and is skilled in ballet, which she has been practicing since an early age. Additionally, Oline enjoys collecting patterned binder paper, loves photography, and regularly creates video recordings to document precious moments with her friends. Her very slow and calm manner of speaking is a distinctive trait, and at times, her voice is barely audible when greeting others.',
    
    funFacts: [
        'Likes Gummy/Sour Gummy.',
        'Likes Hangyodon',
        'Close Friend with Erine.',
        'Her favorite food is Gado-gado, Egg and soy sauce.',
        'Has a pet dog named "Kiyo, chico, and Hope".',
        'Enjoys photography as a hobby.',
        'Collecting binder paper.',
        'Oline was called as one of the Pilar/Titan Trio in 12th generation along with Regie and Levi because of her tall body.'
    ],
    hashtags: [
        'Every Wednesday: #RabOline',
        'JKT48 Private Message: #NgobrOline',
        'Oline Raft: #OliNgerakit',
        'Friend Oline: #BrokOline',
        'Good Moring Greetings: #OhayOline'
    ],
    single: [
        { title: 'Ama Nojaku Batta', year: 2024 },
        { title: 'Chance No Junban', year: 2024 },
    ],
    careerTimeline: [
        { date: '18 November 2023', event: 'Joined JKT48 as a 12th generation trainee.' },
        { date: '1 March 2024', event: 'First stage performance with JKT48.' },
        { date: '28 March 2024', event: 'Center Yuuhi Wo Miteiruka'},
        { date: '05 May 2024', event: 'Shonichi Off Air Naraya Fest' },
        { date: '11 May 2024', event: 'Shonichi MnG & 2 Shot' },
        { date: '30 June 2024', event: 'Center Waiting Room' },
        { date: '20 August 2024', event: 'MV Ama Nojaku Batta' },
        { date: '28 September 2024', event: 'Meet & Greet Road to Sousenkyou'},
        { date: '11 February 2024', event: 'Meet & Greet Sukinanda'},
        { date: '25 October 2025', event: 'Meet & Greet “SISTER REUNION” JKT48 & AKB48'},
        { date: '25 October 2025', event: 'Promoted to JKT48 Regular Member'},

    ]
};

export const GALLERY_IMAGES: GalleryImage[] = [
    { id: 1, url: 'https://pbs.twimg.com/media/GVbaRAYaAAA3pZu?format=jpg&name=orig', thumbnail_url: 'https://pbs.twimg.com/media/GVbaRAYaAAA3pZu?format=jpg&name=orig', category: 'performance', caption: 'Ama Nojaku Batta', width: 800, height: 1200 },
    { id: 2, url: 'https://pbs.twimg.com/media/Gtam9DLboAAfrxs?format=jpg&name=orig', thumbnail_url: 'https://pbs.twimg.com/media/Gtam9DLboAAfrxs?format=jpg&name=orig', category: 'performance', caption: 'Theater Performance', width: 1200, height: 800 },
    { id: 3, url: 'https://pbs.twimg.com/media/G2wORqQaAAUwjJu?format=jpg&name=orig', thumbnail_url: 'https://pbs.twimg.com/media/G2wORqQaAAUwjJu?format=jpg&name=orig', category: 'RabOline', caption: '#RabOline', width: 800, height: 1000 },
    { id: 4, url: 'https://pbs.twimg.com/media/G2LhrBIawAAqgR1?format=jpg&name=orig', thumbnail_url: 'https://pbs.twimg.com/media/G2LhrBIawAAqgR1?format=jpg&name=orig', category: 'RabOline', caption: '#RabOline', width: 1200, height: 800 },
    { id: 5, url: 'https://pbs.twimg.com/media/G2LhrB7aIAIDaaB?format=jpg&name=orig', thumbnail_url: 'https://pbs.twimg.com/media/G2LhrB7aIAIDaaB?format=jpg&name=orig', category: 'RabOline', caption: '#RabOline', width: 800, height: 1200 },
    { id: 6, url: 'https://pbs.twimg.com/media/Gfp3SpDaIAEipk7?format=jpg&name=orig', thumbnail_url: 'https://pbs.twimg.com/media/Gfp3SpDaIAEipk7?format=jpg&name=orig', category: 'RabOline', caption: '#RabOline', width: 800, height: 1000 },
    { id: 7, url: 'https://pbs.twimg.com/media/GbIYf-pakAECGi7?format=jpg&name=orig', thumbnail_url: 'https://pbs.twimg.com/media/GbIYf-pakAECGi7?format=jpg&name=orig', category: 'RabOline', caption: '#RabOline', width: 1200, height: 800 },
    { id: 8, url: 'https://pbs.twimg.com/media/G3Y5Mria4AA73QF?format=jpg&name=orig', thumbnail_url: 'https://pbs.twimg.com/media/G3Y5Mria4AA73QF?format=jpg&name=orig', category: 'RabOline', caption: 'Vc Events', width: 800, height: 1200 },
    { id: 9, url: 'https://pbs.twimg.com/media/GykQPnmb0AAQeF6?format=jpg&name=orig', thumbnail_url: 'https://pbs.twimg.com/media/GykQPnmb0AAQeF6?format=jpg&name=orig', category: 'performance', caption: 'Konser Kemerdekaan', width: 800, height: 1000 },
    { id: 10, url: 'https://pbs.twimg.com/media/G3Etaa3awAECGv8?format=jpg&name=orig', thumbnail_url: 'https://pbs.twimg.com/media/G3Etaa3awAECGv8?format=jpg&name=orig', category:'performance', caption: '', width: 1200, height: 800 },
    { id: 12, url: 'https://pbs.twimg.com/media/G4MrQHcWMAAOT5J?format=jpg&name=orig', thumbnail_url: 'https://pbs.twimg.com/media/G4MrQHcWMAAOT5J?format=jpg&name=orig', category: 'photoshoot', caption: '', width: 1200, height: 800 },
    { id: 13, url: 'https://pbs.twimg.com/media/GvG_2PGaAAAxW8h?format=jpg&name=orig', thumbnail_url: 'https://pbs.twimg.com/media/GvG_2PGaAAAxW8h?format=jpg&name=orig', category: 'performance', caption: '', width:800, height: 1000 },

];

export const VIDEOS: Video[] = [
    { id: '33H7HTUr0JE', title: '[CHEMISTRY] BESTIE BUKTIIN CHEMISTRY', thumbnail: 'https://img.youtube.com/vi/33H7HTUr0JE/hqdefault.jpg' },
    { id: 'KV7OJLiMu6g', title: '[CEKIDOT] WAR TAKJIL HABIS 100RB?!', thumbnail: 'https://img.youtube.com/vi/KV7OJLiMu6g/hqdefault.jpg' },
    { id: 'GI-mKEMmE6M', title: 'Breakfast Time With Oline', thumbnail: 'https://img.youtube.com/vi/GI-mKEMmE6M/hqdefault.jpg' },
    { id: 'PYeXC8aMBaw', title: 'Saatnya Kesempatan - JKT48 | Pemilihan Member Single ke-26 JKT48 Official Theme Song', thumbnail:'https://img.youtube.com/vi/PYeXC8aMBaw/hqdefault.jpg' },
    { id: 'Ztg79dr34n4', title: '[MV] Belalang yang Membangkang - JKT48 Trainee', thumbnail: 'https://img.youtube.com/vi/Ztg79dr34n4/hqdefault.jpg' },
    { id: 'e2rjHSjPyLA', title: 'Oline Manuel (Trainee) - Pemilihan Member Single ke-26 JKT48', thumbnail: 'https://img.youtube.com/vi/e2rjHSjPyLA/hqdefault.jpg' },
    { id: 'VtRUL3XyfZo', title: 'JKT48 12th Generation Profile: Oline', thumbnail: 'https://img.youtube.com/vi/VtRUL3XyfZo/hqdefault.jpg' },
];

export const EVENTS: Event[] = [
 
];
