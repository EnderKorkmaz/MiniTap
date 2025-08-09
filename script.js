// --- FIREBASE BAĞLANTISI ---
const firebaseConfig = {
  apiKey: "AIzaSyBtBH3bA3oqv1WL9Y3BL3Zwyd0-hSBUCGc",
  authDomain: "pixaplay-liderlik.firebaseapp.com",
  projectId: "pixaplay-liderlik",
  storageBucket: "pixaplay-liderlik.appspot.com",
  messagingSenderId: "192235562122",
  appId: "1:192235562122:web:42cc3dc72e44b924e47973"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// YENİ: KÜFÜR FİLTRESİ LİSTESİ
const badWords = ["küfür", "argo", "hakaret", "sakıncalı", "reklam", "anan","bacın", "sikiş", "sex", "sik", "sikmek", "göt", "got", "pipi", "sokuş", "sokmak", "yarrak", "yarak", "çük", "am", "amcık", "pıttık", "allah"]; // Burayı istediğin kelimelerle doldur

// --- ÇEVİRİ SÖZLÜĞÜ ---
const translations = {
    "tr": {
        "page_title": "MiniTap - Hızlı ve Eğlenceli Oyunlar",
        "main_title": "PixaPlay", "start_btn": "Başla", "reset_btn": "Yeniden Başla", "footer_text": "Tüm hakları saklıdır.", "next_number": "Sıradaki Sayı: ", "score": "Skor: ", "score5":"  | Skor:", "level": "Seviye: ", "moves": "Hamle: ", "remaining_guesses": "Kalan Hak:", "next_up": "Sıradaki:", "time": "Süre: ", "time3": "  | Süre:", "clicks": "Tıklama:", "clicks4": "  | Tıklama: ", "found": " | Bulunan: ", "check_btn": "Kontrol Et", "player": "Sen", "cpu": " Bilgisayar", "leaderboard_title": "Liderlik Tablosu", "leaderboard_empty": "Henüz skor yok! İlk sen ol!", "leaderboard_input_placeholder": "İsminiz", "bigger": "Büyük", "game_win_congrats": "Tebrikler, kazandın!",
        "game1_title": "1. Kör Sıralama", "game1_desc": "1-50 arası 10 sayıyı, küçükten büyüğe sırala. Yeni gelen sayı hiçbir yere sığmazsa kaybedersin!", "game1_msg_no_fit": "Sayı sığmıyor!",
        "game2_title": "2. Büyük mü, Küçük mü?", "game2_desc": "Sıradaki sayının (1-50 arası) ekrandaki sayıdan büyük mü küçük mü olduğunu tahmin et.", "game2_btn_higher": "Büyük", "game2_btn_lower": "Küçük", "game2_msg_wrong_1": "Yanlış! Sayı", "game2_msg_wrong_2": "idi. Final skor:",
        "game3_title": "3. Renk Avı", "game3_desc": "Hedef renkteki kutuya olabildiğince hızlı tıkla! Ama dikkat et, yazının rengi seni yanıltabilir!", "game3_target": "Hedef:", "game3_msg_wrong": "Yanlış! Final Skor:", "game3_msg_timeout": "Süre bitti! Final Skor:",
        "game4_title": "4. Hızlı Tıklama (CPS)", "game4_desc": "10 saniye içinde alana olabildiğince çok tıkla! Saniyedeki tıklama sayın (CPS) ölçülecek.", "game4_click_to_start": "Başlamak için tıkla", "game4_click": "TIKLA!", "game4_msg_finished": "Bitti!", "game4_msg_cps": "CPS",
        "game5_title": "5. Hedef Vurma", "game5_desc": "20 saniye içinde ekranda rastgele beliren kırmızı hedefleri vurmaya çalış. Her vuruş 1 puan!", "game5_msg_timeout": "Süre bitti! Final skor:",
        "game6_title": "6. Kelime Tahmini", "game6_desc": "Klasik adam asmaca. Gizli kelimeyi bulmak için harflere tıkla. Sadece 6 yanlış yapma hakkın var.", "game6_msg_lost": "Kaybettin! Kelime:",
        "game7_title": "7. Sayı Hafızası", "game7_desc": "Ekranda beliren sayı dizisini aklında tutup tuş takımından doğru sırayla gir. Bakalım kaç basamağı hatırlayacaksın?", "game7_msg_memorize": "Sayıyı ezberle...", "game7_msg_your_turn": "Şimdi sen yaz!", "game7_msg_wrong": "Yanlış! Doğrusu:", "game7_msg_level_complete": "tamamlandı.",
        "game8_title": "8. Farkı Bul", "game8_desc": "Kareler arasındaki tek farklı renkteki kareyi bul. Her turda daha da zorlaşacak!", "game8_msg_wrong": "Yanlış! Seviye", "game8_msg_level_end": "'de bitti. Skor:",
        "game9_title": "9. Sıralı Tıklama", "game9_desc": "Ekranda beliren sayıları 1'den 12'ye kadar doğru sırayla olabildiğince hızlı tıkla. Süren ölçülecek (düşük olan iyidir).", "game9_msg_finished": "Bitti!", "game9_msg_congrats": "Tebrikler! Süren:", "game9_msg_seconds": "saniye.",
        "game10_title": "10. Taş-Kağıt-Makas", "game10_desc": "Bilgisayara karşı oyna. 5 puana ilk ulaşan kazanır.", "game10_msg_draw": "Berabere!", "game10_msg_win_round": "Bu turu kazandın!", "game10_msg_lose_round": "Bu turu kaybettin!", "game10_msg_win_game": "Tebrikler, oyunu kazandın!", "game10_msg_lose_game": "Kaybettin, bilgisayar kazandı!", "game10_your_turn": "Seçimini yap!",
        "game11_title": "11. Renk Hafızası", "game11_desc": "Oyunun gösterdiği renk sırasını aklında tut ve tekrarla. Bakalım hafızan ne kadar kuvvetli?", "game11_msg_memorize": "Sırayı ezberle...", "game11_msg_your_turn": "Şimdi sıra sende!", "game11_msg_correct": "Doğru!", "game11_msg_wrong": "Yanlış! Seviye", "game11_msg_level_end": "'de bitti.",
        "game12_title": "12. Hafıza Kartları", "game12_desc": "Kapalı kartları çevirerek eşlerini bul. En az hamlede bitirerek liderlik tablosuna gir!", "game12_msg_congrats": "Tebrikler!", "game12_msg_moves_end": "hamlede bitirdin.",
        "game13_title": "13. Mayın Tarlası", "game13_desc": "Klasik mayın tarlası. Seviye atladıkça mayın sayısı artar. Mayına basmadan tüm boş kareleri aç!", "game13_mines_left": " | Kalan Mayın: ", "game13_msg_win": "Tebrikler! Seviye", "game13_msg_level_complete": "tamamlandı!", "game13_msg_lose": "BOOM! Mayına bastın.",
        "game14_title": "14. Desen Hafızası", "game14_desc": "Ekranda beliren deseni aklında tut ve aynısını işaretle. Seviye atladıkça desen karmaşıklaşır.", "game14_msg_memorize": "Deseni ezberle...", "game14_msg_your_turn": "Şimdi aynısını işaretle ve kontrol et.", "game14_msg_correct": "Tebrikler, doğru!", "game14_msg_wrong": "Yanlış! Seviye",
        "game15_title": "15. Kaydırmalı Bulmaca", "game15_desc": "Karışık sayıları kaydırarak 1'den 8'e kadar sırala. En az hamleyle bitirmeye çalış!", "game15_msg_congrats": "Tebrikler!", "game15_msg_moves_end": "hamlede bitirdin.",
        "game16_title": "16. Yazma Hızı Testi", "game16_desc": "Verilen kelimeleri 30 saniyede hatasız yazmaya çalış. Dakikadaki kelime sayını (WPM) ölç!", "game16_placeholder": "Yazmaya başla...", "game16_msg_finished": "Süre bitti! Sonucun:", "game16_msg_wpm": "WPM",
        "game18_title": "17. Aritmetik Dehası", "game18_desc": "30 saniyede olabildiğince çok matematik sorusu çöz. Her doğru cevap puan kazandırır!", "game18_answer_placeholder": "Cevap","game18_msg_timeout": "Süre Bitti! Final Skor:",
        "game19_title": "18. Engelden Kaçış", "game19_desc": "Fare ile oyuncuyu kontrol ederek engellere çarpmadan en yüksek skoru yapmaya çalış.", "game19_msg_lose": "Çarptın! Final Skor:",
        
        // --- OYUN 6: KELİME TAHMİNİ ---
        "game6_word_list": ["JENERATÖR", "FİLOGENETİK", "AKSİYON", "PROGRAMLAMA", "KLAVYE", "MONİTÖR", "ALGORİTMA", "SPEKTRUM", "KUVARS", "YAYINCI", "KATMAN", "ABONE"],

        "game16_initial_text": "Oyun başlayınca kelimeler burada belirecek.",
        "game16_word_list": ["bir", "ve", "ama", "için", "çok", "daha", "kadar", "gibi", "sonra", "ancak", "yeni", "büyük", "küçük", "her", "zaman", "sadece", "artık", "önce", "yok", "var", "ben", "sen", "o", "biz", "siz", "onlar", "dedi", "diye", "şey", "bile", "yine", "işte", "böyle", "şöyle", "belki", "çünkü", "nasıl", "neden", "ne", "hangi", "kim", "nerede", "zaten", "aslında", "yani", "ise", "diğer", "bazı", "tüm", "üzerine", "arasında", "altında", "üstünde", "yanında", "karşısında", "içinde", "dışında", "ile", "birlikte", "hakkında", "göre", "doğru", "karşı", "başka", "tek", "ilk", "son", "ikinci", "üçüncü", "yüksek", "düşük", "iyi", "kötü", "güzel", "çirkin", "kolay", "zor", "genç", "yaşlı", "uzun", "kısa", "geniş", "dar", "ağır", "hafif", "açık", "kapalı", "dolu", "boş", "kalın", "ince", "sert", "yumuşak", "kurt", "zamanzingo", "kaos", "awp", "konteyner"],


        // --- TÜRKÇE SLUG'LAR ---
// "tr" nesnesinin içine ekle
"game1_slug": "kor-siralama",
"game2_slug": "buyuk-mu-kucuk-mu",
"game3_slug": "renk-avi",
"game4_slug": "hizli-tiklama",
"game5_slug": "hedef-vurma",
"game6_slug": "kelime-tahmini",
"game7_slug": "sayi-hafizasi",
"game8_slug": "farki-bul",
"game9_slug": "sirali-tiklama",
"game10_slug": "tas-kagit-makas",
"game11_slug": "renk-hafizasi",
"game12_slug": "hafiza-kartlari",
"game13_slug": "mayin-tarlasi",
"game14_slug": "desen-hafizasi",
"game15_slug": "kaydirmali-bulmaca",
"game16_slug": "yazma-hizi-testi",
"game18_slug": "aritmetik-dehasi", // ID'si 18 olan 17. oyun
"game19_slug": "engelden-kacis",  // ID'si 19 olan 18. oyun

        "terms_link": "Hizmet Koşulları",
        "privacy_link": "Gizlilik Politikası",
        "game3_color_names": ["Kırmızı", "Mavi", "Yeşil", "Sarı", "Mor", "Turuncu"]
    
               
    
    },
    "en": {
        "page_title": "MiniTap - Quick & Fun Games",
        "main_title": "PixaPlay", "start_btn": "Start", "reset_btn": "Restart", "footer_text": "All rights reserved.", "next_number": "Next Number: ", "score": "Score: ","score5":"  | Score:", "score10": "Score: You ", "level": "Level: ", "moves": "Moves: ", "remaining_guesses": "Guesses Left:", "next_up": "Next:", "time": "Time: ", "time3": "  | Time:", "clicks": "Clicks:", "clicks4": "  | Clicks", "found": " | Found: ", "check_btn": "Check", "player": "You", "cpu": " CPU", "leaderboard_title": "Leaderboard", "leaderboard_empty": "No scores yet! Be the first!", "leaderboard_input_placeholder": "Your Name", "bigger": "Bigger", "game_win_congrats": "Congratulations, you won!",
        "game1_title": "1. Blind Sort", "game1_desc": "Sort 10 numbers from 1-50. You lose if the new number doesn't fit anywhere!", "game1_msg_no_fit": "The number doesn't fit!",
        "game2_title": "2. Higher or Lower?", "game2_desc": "Guess if the next number (1-50) is higher or lower than the one on screen.", "game2_btn_higher": "Higher", "game2_btn_lower": "Lower", "game2_msg_wrong_1": "Wrong! The number was", "game2_msg_wrong_2": ". Final score:",
        "game3_title": "3. Color Hunt", "game3_desc": "Click the box with the target color as fast as you can! But beware, the color of the text might trick you!", "game3_target": "Target:", "game3_msg_wrong": "Wrong! Final Score:", "game3_msg_timeout": "Time's up! Final Score:",
        "game4_title": "4. CPS Test", "game4_desc": "Click the area as many times as you can in 10 seconds! Your Clicks Per Second (CPS) will be measured.", "game4_click_to_start": "Click to start", "game4_click": "CLICK!", "game4_msg_finished": "Finished!", "game4_msg_cps": "CPS",
        "game5_title": "5. Aim Trainer", "game5_desc": "Try to shoot the randomly appearing red targets for 20 seconds. Each hit is 1 point!", "game5_msg_timeout": "Time's up! Final score:",
        "game6_title": "6. Hangman", "game6_desc": "Classic hangman. Click the letters to find the secret word. You only have 6 wrong guesses.", "game6_msg_lost": "You lost! The word was:",
        "game7_title": "7. Number Memory", "game7_desc": "Memorize the sequence of numbers and enter it correctly using the keypad. How many digits can you remember?", "game7_msg_memorize": "Memorize the number...", "game7_msg_your_turn": "Now, your turn!", "game7_msg_wrong": "Wrong! The correct one was:", "game7_msg_level_complete": "completed.",
        "game8_title": "8. Find the Difference", "game8_desc": "Find the one square with a different color. It gets harder with each round!", "game8_msg_wrong": "Wrong! Game over at level", "game8_msg_level_end": ". Score:",
        "game9_title": "9. Reaction Time", "game9_desc": "Click the numbers from 1 to 12 in the correct order as fast as you can. Your time will be measured (lower is better).", "game9_msg_finished": "Finished!", "game9_msg_congrats": "Congratulations! Your time:", "game9_msg_seconds": "seconds.",
        "game10_title": "10. Rock-Paper-Scissors", "game10_desc": "Play against the computer. First to 5 points wins.", "game10_msg_draw": "It's a draw!", "game10_msg_win_round": "You win this round!", "game10_msg_lose_round": "You lose this round!", "game10_msg_win_game": "Congratulations, you won the game!", "game10_msg_lose_game": "You lost, the computer wins!", "game10_your_turn": "Make your choice!",
        "game11_title": "11. Color Memory", "game11_desc": "Memorize the sequence of colors shown by the game and repeat it. How strong is your memory?", "game11_msg_memorize": "Memorize the sequence...", "game11_msg_your_turn": "Now, your turn!", "game11_msg_correct": "Correct!", "game11_msg_wrong": "Wrong! Game over at level", "game11_msg_level_end": ".",
        "game12_title": "12. Memory Match", "game12_desc": "Flip the cards to find their pairs. Finish in the fewest moves to get on the leaderboard!", "game12_msg_congrats": "Congratulations!", "game12_msg_moves_end": "moves.",
        "game13_title": "13. Minesweeper", "game13_desc": "Classic minesweeper. The number of mines increases with each level. Uncover all empty cells without hitting a mine!", "game13_mines_left": " | Mines Left: ", "game13_msg_win": "Congratulations! Level", "game13_msg_level_complete": "completed!", "game13_msg_lose": "BOOM! You hit a mine.",
        "game14_title": "14. Pattern Memory", "game14_desc": "Memorize the pattern on the screen and replicate it. The pattern gets more complex with each level.", "game14_msg_memorize": "Memorize the pattern...", "game14_msg_your_turn": "Now, replicate it and check.", "game14_msg_correct": "Congratulations, correct!", "game14_msg_wrong": "Wrong! Level",
        "game15_title": "15. Sliding Puzzle", "game15_desc": "Slide the mixed-up numbers to sort them from 1 to 8. Try to finish in the fewest moves!",  "game15_msg_congrats": "Congratulations!", "game15_msg_moves_end": "moves.",
        "game16_title": "16. Typing Test", "game16_desc": "Try to type the given words flawlessly in 30 seconds. Your Words Per Minute (WPM) will be measured!", "game16_placeholder": "Start typing...", "game16_msg_finished": "Time's up! Your result:", "game16_msg_wpm": "WPM",
        "game18_title": "17. Arithmetic Genius", "game18_desc": "Solve as many math problems as you can in 30 seconds. Every correct answer earns points!", "game18_answer_placeholder": "Answer", "game18_msg_timeout": "Time's Up! Final Score:",
        "game19_title": "18. Dodge", "game19_desc": "Control the player with your mouse and get the highest score without hitting the obstacles.", "game19_msg_lose": "You crashed! Final Score:",
        
        // --- GAME 6: HANGMAN ---
        "game6_word_list": ["GENERATOR", "EVOLUTION", "KEYBOARD", "MONITOR", "ALGORITHM", "SPECTRUM", "JAVASCRIPT", "DEVELOPER", "DATABASE", "FIREBASE", "FUNCTION", "VARIABLE"],

        "game16_initial_text": "Words will appear here when the game starts.",
        "game16_word_list": ["the", "be", "to", "of", "and", "a", "in", "that", "have", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"],


        // --- İNGİLİZCE SLUG'LAR ---
// "en" nesnesinin içine ekle
"game1_slug": "blind-sort",
"game2_slug": "higher-or-lower",
"game3_slug": "color-hunt",
"game4_slug": "cps-test",
"game5_slug": "aim-trainer",
"game6_slug": "hangman",
"game7_slug": "number-memory",
"game8_slug": "find-the-difference",
"game9_slug": "reaction-time",
"game10_slug": "rock-paper-scissors",
"game11_slug": "color-memory",
"game12_slug": "memory-match",
"game13_slug": "minesweeper",
"game14_slug": "pattern-memory",
"game15_slug": "sliding-puzzle",
"game16_slug": "typing-test",
"game18_slug": "arithmetic-genius",
"game19_slug": "dodge",

            "terms_link": "Terms of Service",
            "privacy_link": "Privacy Policy",
            "game3_color_names": ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"]



    }
};

document.addEventListener('DOMContentLoaded', () => {

    // --- SES EFEKTLERİ ---
    const sounds = {
        click: new Audio('click.wav'), correct: new Audio('correct.wav'), wrong: new Audio('wrong.wav'),
        win: new Audio('win.wav'), hover: new Audio('hover.wav'), sound1: new Audio('mixkit-modern-technology-select.wav'),
        sound2: new Audio('mixkit-negative-tone-interface-tap.wav'), sound3: new Audio('mixkit-click-error.wav'), sound4: new Audio('mixkit-arcade-game-jump-coin.wav')
    };
    Object.values(sounds).forEach(s => s.volume = 0.5); // Genel ses seviyesi
    sounds.hover.volume = 0.1; sounds.sound1.volume = 0.1; sounds.sound3.volume = 0.04; sounds.sound4.volume = 0.05; sounds.click.volume = 0.2;

    // --- DİL SİSTEMİ ---
    const langBtn = document.getElementById('lang-btn');
    const langBtnText = document.getElementById('lang-btn-text');
    const langDropdown = document.getElementById('lang-dropdown');
    
        // DİL SİSTEMİ (GÜNCELLENDİ)
    function setLanguage(lang) {
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);

        // <<< YENİ SATIR BURAYA >>>
        // Sayfa başlığını çeviriden alarak güncelle
        document.title = translations[lang].page_title;

        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.dataset.langKey;
            const translation = translations[lang]?.[key];
            if (translation) {
                if (el.placeholder) {
                    el.placeholder = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });

        // <<< YENİ VE KRİTİK EKLENTİ BURASI >>>
        // Oyun 16 (Yazma Hızı Testi) o anda başlangıç ekranındaysa, metnini de güncelle.
        const game16TextInput = document.getElementById('game16-text-display');
        const game16StartButton = document.getElementById('game16-start');
        // Eğer başlangıç butonu görünür durumdaysa (yani oyun başlamamışsa)
        if (game16TextInput && game16StartButton && !game16StartButton.classList.contains('hidden')) {
            game16TextInput.textContent = translations[lang].game16_initial_text;
        }
        // <<< EKLENTİ BİTTİ >>>


        // Buton metnini ve bayrağı güncelle
        const langBtnText = document.getElementById('lang-btn-text');
        if (langBtnText) {
            langBtnText.textContent = lang === 'tr' ? 'Türkçe' : 'English';
        }

        // <<< DEĞİŞİKLİK BURADA >>>
        // Ana butondaki bayrağın SVG kodunu doğrudan değiştir
        const mainFlagIcon = document.getElementById('main-flag-icon');
        if (lang === 'tr') {
            mainFlagIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect width="900" height="600" fill="#e30a17"/><circle cx="275" cy="300" r="150" fill="#fff"/><circle cx="312.5" cy="300" r="120" fill="#e30a17"/><path d="M406.25 300l114.54 35.26-70.8-92.2L465.3 172.5l-70.8 92.2z" fill="#fff"/></svg>';
        } else {
            mainFlagIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30"><clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath><clipPath id="b"><path d="M30 15h30v15zM0 0h30v15z"/></clipPath><g clip-path="url(#a)"><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30m0-30L0 30" clip-path="url(#b)" stroke="#c8102e" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6"/></g></svg>';
        }
        
        langDropdown.classList.add('hidden');
    }

    // --- ODAK MODU (MODAL) YÖNETİCİSİ ---
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const mainContainer = document.getElementById('game-container');

    function openModal(gameCard) {
        gameCard.dataset.originalParent = 'game-container';
        gameCard.dataset.nextSiblingId = gameCard.nextElementSibling?.id || null;
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-modal-btn';
        closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
        closeBtn.onclick = closeModal;
        gameCard.appendChild(closeBtn);
        modalContent.appendChild(gameCard);
        gameCard.classList.add('focused-game');
        modalOverlay.classList.remove('hidden');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        const gameCard = modalContent.querySelector('.game-card');
        if (gameCard) {
            const closeBtn = gameCard.querySelector('.close-modal-btn');
            if(closeBtn) gameCard.removeChild(closeBtn);
            gameCard.classList.remove('focused-game');
            const nextSibling = document.getElementById(gameCard.dataset.nextSiblingId);
            mainContainer.insertBefore(gameCard, nextSibling);
        }
        modalOverlay.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }

    // --- UTILITY & LEADERBOARD MANAGER ---
    const hide = (el) => el.classList.add('hidden');
    const show = (el) => el.classList.remove('hidden');

    const leaderboardManager = {
        initDB() { return Promise.resolve(); },
        leaderboardGames: { 'game2': 'desc', 'game3': 'desc', 'game4': 'desc', 'game5': 'desc', 'game7': 'desc', 'game8': 'desc', 'game9': 'asc', 'game11': 'desc', 'game12': 'asc', 'game13': 'desc', 'game14': 'desc', 'game15': 'asc', 'game16': 'desc', 'game18': 'desc', 'game19': 'desc' },
        async checkAndPromptForScore(gameId, score, gameCard, resetBtn) { if (!this.leaderboardGames[gameId]) return; const sortOrder = this.leaderboardGames[gameId]; const leaderboardsRef = db.collection('leaderboards').doc(gameId).collection('scores'); const query = leaderboardsRef.orderBy('score', sortOrder).limit(10); const snapshot = await query.get(); const scores = snapshot.docs.map(doc => doc.data().score); let canEnter = false; if (scores.length < 10) { canEnter = true; } else { const lastScore = scores[scores.length - 1]; if (sortOrder === 'desc' && score > lastScore) canEnter = true; if (sortOrder === 'asc' && score < lastScore) canEnter = true; } if (canEnter) { this.promptForName(gameId, score, gameCard, resetBtn); } },
        // script.js içindeki leaderboardManager

        promptForName(gameId, score, gameCard, resetBtn) {
            // Mevcut dili al
            const lang = document.documentElement.lang; 
            // Placeholder metnini çeviri nesnesinden al
            const placeholderText = translations[lang].leaderboard_input_placeholder;

            const promptEl = document.createElement('div');
            promptEl.className = 'leaderboard-prompt';
            // HTML oluştururken sabit "İsminiz" yerine çevrilmiş metni kullan
            promptEl.innerHTML = `<input type="text" placeholder="${placeholderText}" maxlength="10"><button class="glowing">💾</button>`;
            gameCard.appendChild(promptEl);
            
            const input = promptEl.querySelector('input');

            // <<< YENİ VE EN ÖNEMLİ KISIM BURASI >>>
            // Cihazın dokunmatik olup olmadığını kontrol et
            const isTouchDevice = () => {
                return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
            }

            const savedName = localStorage.getItem('playerName');
            if (savedName) {
                input.value = savedName;
            }

            // Sadece dokunmatik olmayan (masaüstü) cihazlarda focus yap
            if (!isTouchDevice()) {
                input.focus();
                input.select();
            }
            // <<< DEĞİŞİKLİK BİTTİ >>>
            
            promptEl.querySelector('button').onclick = async () => {
                const name = input.value.trim() || (lang === 'tr' ? 'Anonim' : 'Anonymous'); // Anonim ismi de dile göre ayarlayalım
                 // <<< YENİ KONTROL KODU BURADA BAŞLIYOR >>>
                const isInvalid = badWords.some(word => name.toLowerCase().includes(word));
                if (isInvalid) {
                    input.style.borderColor = 'red'; // Hatalı girişi belirt
                    input.value = '';
                    input.placeholder = "Geçerli bir isim girin!";
                    setTimeout(() => {
                         input.style.borderColor = '';
                         input.placeholder = placeholderText;
                    }, 2000);
                    return; // Kaydetme işlemini durdur
                }
                // <<< KONTROL KODU BURADA BİTİYOR >>>
                promptEl.querySelector('button').disabled = true;

                // <<< YENİ EKLENEN SATIR BURASI >>>
                // 3. Yeni girilen ismi localStorage'a kaydet
                localStorage.setItem('playerName', name);

                await this.addScore(gameId, name, score);
                promptEl.remove();
                this.displayLeaderboard(gameId, gameCard, resetBtn, name, score);
            };
        },
        async addScore(gameId, name, score) { const sortOrder = this.leaderboardGames[gameId]; const leaderboardsRef = db.collection('leaderboards').doc(gameId).collection('scores'); await leaderboardsRef.add({ name, score, timestamp: new Date() }); const snapshot = await leaderboardsRef.orderBy('score', sortOrder).get(); if (snapshot.size > 10) { const docToDelete = snapshot.docs[snapshot.size - 1]; await docToDelete.ref.delete(); } },
        // script.js içindeki leaderboardManager

        async displayLeaderboard(gameId, gameCard, resetBtn, currentPlayerName = null, newPlayerScore = null) {
            if (!this.leaderboardGames[gameId]) return;

            this.clearLeaderboard(gameCard, resetBtn);

            // Mevcut dili ve çevirileri al
            const lang = document.documentElement.lang;
            const titleText = translations[lang].leaderboard_title;
            const emptyText = translations[lang].leaderboard_empty;

            const sortOrder = this.leaderboardGames[gameId];
            const leaderboardsRef = db.collection('leaderboards').doc(gameId).collection('scores');
            const query = leaderboardsRef.orderBy('score', sortOrder).limit(10);
            
            const snapshot = await query.get();
            const scores = snapshot.docs.map(doc => doc.data());

            const overlay = document.createElement('div');
            overlay.className = 'leaderboard-overlay';
            
            let playerRowId = -1;
            if(currentPlayerName !== null && newPlayerScore !== null) {
                playerRowId = scores.findIndex(s => s.name === currentPlayerName && s.score === newPlayerScore);
            }
            
            // <<< GÜVENLİK GÜNCELLEMESİ BURADA BAŞLIYOR >>>
            let listItems = scores.map((s, i) => {
                const isPlayer = (i === playerRowId);
                const scoreFormatted = s.score.toFixed(s.score % 1 !== 0 ? 2 : 0);

                // GÜVENLİ YÖNTEM: Kullanıcı adını önce bir text node olarak oluşturup
                // HTML etiketlerini etkisiz hale getiriyoruz.
                const nameSpan = document.createElement('span');
                nameSpan.textContent = `${i + 1}. ${s.name}`; // Bu komut, <img..> etiketini metne çevirir.

                const scoreSpan = document.createElement('span');
                scoreSpan.textContent = scoreFormatted;

                // Şimdi güvenli hale getirilmiş HTML'i oluşturuyoruz.
                return `<li class="${isPlayer ? 'player-score' : ''}">${nameSpan.outerHTML}${scoreSpan.outerHTML}</li>`;
            }).join('');
            // <<< GÜVENLİK GÜNCELLEMESİ BURADA BİTİYOR >>>
            // Başlık için çeviriyi kullan
            overlay.innerHTML = `<h3>${titleText}</h3><ol>${listItems}</ol>`;
            
            // Boş mesaj için çeviriyi kullan
            if (scores.length === 0) overlay.innerHTML += `<p>${emptyText}</p>`;
            
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            buttonContainer.appendChild(resetBtn);
            overlay.appendChild(buttonContainer);
            gameCard.appendChild(overlay);
        },
        clearLeaderboard(gameCard, resetBtn) { gameCard.querySelector('.leaderboard-overlay')?.remove(); gameCard.querySelector('.leaderboard-prompt')?.remove(); const btnContainer = gameCard.querySelector('.button-container'); if (btnContainer && !btnContainer.contains(resetBtn)) { btnContainer.appendChild(resetBtn); } }
    };

    // --- ANA OYUN BAŞLATMA BLOĞU ---
    leaderboardManager.initDB().then(() => {
        const games = [
            // Oyun 1-14 arası (değişiklik yok)
            { cardId: 'game1', logic: { init() { this.bindElements(); this.setupInitialState(); this.startBtn.addEventListener('click', () => this.start()); this.resetBtn.addEventListener('click', () => this.reset()); }, bindElements() { this.card = document.getElementById('card-game1'); this.startBtn = this.card.querySelector('#game1-start'); this.resetBtn = this.card.querySelector('#game1-reset'); this.area = this.card.querySelector('#game1-area'); this.message = this.card.querySelector('#game1-message'); this.nextNumberEl = this.card.querySelector('#game1-next-number'); }, setupInitialState() { this.message.textContent = ''; this.nextNumberEl.textContent = '?'; this.slots = Array(10).fill(null); this.placedCount = 0; this.usedNumbers = []; this.area.innerHTML = ''; for (let i = 0; i < 10; i++) { const sc = document.createElement('div'); sc.className = 'slot-container'; sc.innerHTML = `<span>${i + 1}.</span><div class="slot" data-index="${i}"></div>`; this.area.appendChild(sc); } this.area.style.pointerEvents = 'none'; leaderboardManager.clearLeaderboard(this.card, this.resetBtn); }, start() { show(this.resetBtn); hide(this.startBtn); this.area.style.pointerEvents = 'auto'; this.area.querySelectorAll('.slot').forEach(s => s.onclick = (e) => this.placeNumber(parseInt(e.target.dataset.index))); this.generateNewNumber(); }, reset() { hide(this.resetBtn); show(this.startBtn); this.setupInitialState(); }, generateNewNumber() { let animationInterval = setInterval(() => { this.nextNumberEl.textContent = Math.floor(Math.random() * 50) + 1; }, 50); setTimeout(() => { clearInterval(animationInterval); let newNum; do { newNum = Math.floor(Math.random() * 50) + 1; } while (this.usedNumbers.includes(newNum)); this.currentNumber = newNum; this.usedNumbers.push(newNum); this.nextNumberEl.textContent = this.currentNumber; if (this.placedCount > 0 && !this.canPlaceCurrentNumber()) { this.endGame(false, `${translations[document.documentElement.lang].game1_msg_no_fit} (${this.currentNumber})`); } }, 500); }, canPlaceCurrentNumber() { for (let i = 0; i < 10; i++) { if (this.slots[i] === null) { const p = this.slots.slice(0, i).filter(n => n !== null).pop() || 0; const n = this.slots.slice(i + 1).find(n => n !== null) || 51; if (this.currentNumber > p && this.currentNumber < n) return true; } } return false; }, placeNumber(index) { if (this.slots[index] !== null) return; const p = this.slots.slice(0, index).filter(n => n !== null).pop() || 0; const n = this.slots.slice(index + 1).find(n => n !== null) || 51; if (this.currentNumber > p && this.currentNumber < n) { sounds.sound1.currentTime = 0.01; sounds.sound1.play(); this.slots[index] = this.currentNumber; this.area.children[index].querySelector('.slot').textContent = this.currentNumber; this.area.children[index].querySelector('.slot').classList.add('filled'); this.placedCount++; if (this.placedCount === 10) { this.endGame(true, translations[document.documentElement.lang].game_win_congrats); } else { this.generateNewNumber(); } } else { this.endGame(false, translations[document.documentElement.lang].game_wrong_move); } }, endGame(isWin, msg) { this.message.textContent = msg; this.message.className = isWin ? 'message win' : 'message lose'; this.area.style.pointerEvents = 'none'; if (isWin) { sounds.sound2.play(); } else { sounds.sound3.play(); } } } },
            // OYUN 2: BÜYÜK MÜ, KÜÇÜK MÜ? (ANİMASYON HATASI GİDERİLDİ)
                        // OYUN 2: BÜYÜK MÜ, KÜÇÜK MÜ? (ANİMASYONLU VE DÜZELTİLMİŞ)
            // OYUN 2: BÜYÜK MÜ, KÜÇÜK MÜ? (MANTIK HATASI GİDERİLDİ)
            { cardId: 'game2', logic: {
                init() {
                    this.bindElements(); this.setupInitialState();
                    this.startBtn.addEventListener('click', () => this.start());
                    this.resetBtn.addEventListener('click', () => this.reset());
                    this.higherBtn.addEventListener('click', () => this.guess('higher'));
                    this.lowerBtn.addEventListener('click', () => this.guess('lower'));
                }, 
                bindElements() {
                    this.card = document.getElementById('card-game2');
                    this.startBtn = this.card.querySelector('#game2-start');
                    this.resetBtn = this.card.querySelector('#game2-reset');
                    this.message = this.card.querySelector('#game2-message');
                    this.scoreEl = this.card.querySelector('#game2-score');
                    this.numberEl = this.card.querySelector('#game2-number');
                    this.higherBtn = this.card.querySelector('#game2-higher');
                    this.lowerBtn = this.card.querySelector('#game2-lower');
                }, 
                setupInitialState() {
                    clearInterval(this.animationInterval);
                    this.message.textContent = '';
                    this.score = 0;
                    this.scoreEl.textContent = 0;
                    this.numberEl.textContent = "?";
                    this.higherBtn.disabled = true; this.lowerBtn.disabled = true;
                    leaderboardManager.clearLeaderboard(this.card, this.resetBtn);
                },
                start() {
                    show(this.resetBtn); hide(this.startBtn);
                    this.currentNum = Math.floor(Math.random() * 50) + 1;
                    this.generateNext();
                    this.animateAndDisplay(this.currentNum);
                }, 
                reset() {
                    hide(this.resetBtn); show(this.startBtn);
                    this.setupInitialState();
                }, 
                animateAndDisplay(numberToDisplay) {
                    this.higherBtn.disabled = true;
                    this.lowerBtn.disabled = true;
                    
                    this.animationInterval = setInterval(() => {
                        this.numberEl.textContent = Math.floor(Math.random() * 50) + 1;
                    }, 50);
                    
                    setTimeout(() => {
                        clearInterval(this.animationInterval);
                        this.numberEl.textContent = numberToDisplay;
                        this.higherBtn.disabled = false;
                        this.lowerBtn.disabled = false;
                    }, 500);
                },
                generateNext() {
                    do {
                        this.nextNum = Math.floor(Math.random() * 50) + 1;
                    } while (this.nextNum === this.currentNum);
                }, 
                guess(choice) {
                    this.higherBtn.disabled = true;
                    this.lowerBtn.disabled = true;
                    
                    const isCorrect = (choice === 'higher' && this.nextNum > this.currentNum) || 
                                      (choice === 'lower' && this.nextNum < this.currentNum);
                    
                    // Önce sonucu göster, sonra animasyonu başlat
                    setTimeout(() => {
                        if (isCorrect) {
                            sounds.correct.play();
                            this.score++;
                            this.scoreEl.textContent = this.score;
                            
                            // DOĞRU BİLDİĞİN SAYI YENİ SAYIN OLUYOR
                            this.currentNum = this.nextNum; 
                            this.generateNext(); // Bir sonrakini hazırla
                            
                            // Şimdi doğru bildiğin sayıyı animasyonla göster
                            this.animateAndDisplay(this.currentNum); 
                        } else {
                            this.endGame();
                        }
                    }, 300); // Küçük bir bekleme efekti
                }, 
                endGame() {
                    sounds.sound3.play();
                    this.numberEl.textContent = this.nextNum;
                    const lang = document.documentElement.lang;
                    this.message.textContent = `${translations[lang].game2_msg_wrong_1} ${this.nextNum} ${translations[lang].game2_msg_wrong_2} ${this.score}`;
                    this.message.className = 'message lose';
                    this.higherBtn.disabled = true; this.lowerBtn.disabled = true;
                    leaderboardManager.checkAndPromptForScore('game2', this.score, this.card, this.resetBtn);
                } 
            } },
                        // OYUN 3: RENK AVI (ÇEVİRİ ENTEGRASYONU TAMAMLANDI)
            { cardId: 'game3', logic: {
                init() {
                    this.bindElements();
                    this.setupInitialState();
                    this.startBtn.addEventListener('click', () => this.start());
                    this.resetBtn.addEventListener('click', () => this.reset());
                },
                bindElements() {
                    this.card = document.getElementById('card-game3');
                    this.startBtn = this.card.querySelector("#game3-start");
                    this.resetBtn = this.card.querySelector("#game3-reset");
                    this.area = this.card.querySelector("#game3-area");
                    this.message = this.card.querySelector("#game3-message");
                    this.scoreEl = this.card.querySelector("#game3-score");
                    this.targetColorNameEl = this.card.querySelector("#game3-target-color-name");
                    this.targetTextEl = this.card.querySelector("#game3-target-text");
                    this.timerEl = this.card.querySelector("#game3-timer");
                },
                // Sabit renk kodları, sıralaması translations'daki isimlerle aynı olmalı
                colorHexValues: ['#d32f2f', '#1976d2', '#388e3c', '#fbc02d', '#7b1fa2', '#f57c00'],
                
                setupInitialState() {
                    clearInterval(this.timerInterval);
                    this.score = 0;
                    this.scoreEl.textContent = 0;
                    this.timeLeft = 30;
                    this.timerEl.textContent = this.timeLeft;
                    this.message.textContent = '';
                    this.area.innerHTML = '';
                    this.targetColorNameEl.textContent = "?";
                    this.area.style.pointerEvents = 'none';
                    leaderboardManager.clearLeaderboard(this.card, this.resetBtn);
                },
                start() {
                    show(this.resetBtn);
                    hide(this.startBtn);
                    this.area.style.pointerEvents = 'auto';
                    this.nextRound();
                    this.timerInterval = setInterval(() => {
                        this.timeLeft--;
                        this.timerEl.textContent = this.timeLeft;
                        if (this.timeLeft <= 0) {
                            this.endGame(false);
                        }
                    }, 1000);
                },
                reset() {
                    hide(this.resetBtn);
                    show(this.startBtn);
                    this.setupInitialState();
                },
                nextRound() {
                    this.area.innerHTML = '';
                    const lang = document.documentElement.lang;
                    const currentLangColorNames = translations[lang].game3_color_names;
                    
                    // Renk isimleri ve hex kodlarını birleştirerek bir sözlük oluştur
                    const colorMap = Object.fromEntries(currentLangColorNames.map((name, i) => [name, this.colorHexValues[i]]));

                    // Mevcut tüm renk isimlerini karıştır
                    const shuffledColorNames = [...currentLangColorNames].sort(() => 0.5 - Math.random());
                    
                    // Ekranda gösterilecek 4 rengi ve hedef rengi seç
                    const displayColorNames = shuffledColorNames.slice(0, 4);
                    this.targetColorName = displayColorNames[Math.floor(Math.random() * 4)];
                    
                    // Hedef metninin rengi, ekranda gösterilmeyen bir renk olsun (şaşırtma amaçlı)
                    const confusingColorName = shuffledColorNames[4];
                    
                    this.targetColorNameEl.textContent = this.targetColorName;
                    this.targetTextEl.style.color = colorMap[confusingColorName];
                    
                    // Butonları karıştırıp ekrana yerleştir
                    displayColorNames.sort(() => 0.5 - Math.random()).forEach(colorName => {
                        const box = document.createElement('div');
                        box.className = 'color-box';
                        box.style.backgroundColor = colorMap[colorName];
                        box.dataset.colorName = colorName;
                        box.onclick = (e) => this.check(e);
                        this.area.appendChild(box);
                    });
                },
                check(e) {
                    sounds.sound4.play();
                    if (e.target.dataset.colorName === this.targetColorName) {
                        this.score++;
                        this.scoreEl.textContent = this.score;
                        this.nextRound();
                    } else {
                        this.endGame(true);
                    }
                },
                endGame(isWrongClick) {
                    clearInterval(this.timerInterval);
                    this.area.style.pointerEvents = 'none';
                    const lang = document.documentElement.lang;
                    if (isWrongClick) {
                        this.message.textContent = `${translations[lang].game3_msg_wrong} ${this.score}`;
                    } else {
                        this.message.textContent = `${translations[lang].game3_msg_timeout} ${this.score}`;
                    }
                    this.message.className = 'message lose';
                    leaderboardManager.checkAndPromptForScore('game3', this.score, this.card, this.resetBtn);
                }
            } },

                        // OYUN 4: HIZLI TIKLAMA (CPS) (ÇEVİRİ HATASI GİDERİLDİ)
            { cardId: 'game4', logic: {
                init() {
                    this.clickHandler = this.clickHandler.bind(this);
                    this.bindElements();
                    this.setupInitialState();
                    this.startBtn.addEventListener('click', () => this.start());
                    this.resetBtn.addEventListener('click', () => this.reset());
                },
                bindElements() { this.card = document.getElementById('card-game4'); this.startBtn = this.card.querySelector("#game4-start"); this.resetBtn = this.card.querySelector("#game4-reset"); this.message = this.card.querySelector("#game4-message"); this.timerEl = this.card.querySelector("#game4-timer"); this.clicksEl = this.card.querySelector("#game4-clicks"); this.clickArea = this.card.querySelector("#game4-click-area"); },
                
                // GÜNCELLENDİ
                setupInitialState() {
                    clearInterval(this.interval);
                    this.timer = 10;
                    this.clicks = 0;
                    this.gameOn = false;
                    this.timerEl.textContent = "10.00";
                    this.clicksEl.textContent = 0;
                    // Başlangıç metnini çeviriden al
                    this.clickArea.textContent = translations[document.documentElement.lang].game4_click_to_start;
                    this.clickArea.style.backgroundColor = 'var(--lose-color)';
                    this.clickArea.style.pointerEvents = 'none';
                    this.message.textContent = '';
                    leaderboardManager.clearLeaderboard(this.card, this.resetBtn);
                },
                start() {
                    hide(this.startBtn);
                    show(this.resetBtn);
                    this.clickArea.style.pointerEvents = 'auto';
                    this.clickArea.addEventListener('click', this.clickHandler);
                    this.clickArea.focus(); // Odaklanmayı sağla
                },
                reset() {
                    hide(this.resetBtn);
                    show(this.startBtn);
                    this.setupInitialState();
                    this.clickArea.removeEventListener('click', this.clickHandler);
                },
                // GÜNCELLENDİ
                clickHandler() {
                    if (!this.gameOn && this.timer === 10) {
                        this.gameOn = true;
                        this.clickArea.textContent = translations[document.documentElement.lang].game4_click; // Çeviriden al
                        this.clickArea.style.backgroundColor = 'var(--win-color)';
                        this.interval = setInterval(() => {
                            this.timer -= 0.01;
                            if (this.timer <= 0) {
                                this.endGame();
                            } else {
                                this.timerEl.textContent = this.timer.toFixed(2);
                            }
                        }, 10);
                    }
                    if (this.gameOn) {
                        this.clicks++;
                        this.clicksEl.textContent = this.clicks;
                    }
                },
                // GÜNCELLENDİ
                endGame() {
                    clearInterval(this.interval);
                    this.gameOn = false;
                    this.clickArea.style.pointerEvents = 'none';
                    this.timerEl.textContent = "0.00";
                    const cps = (this.clicks / 10);
                    const lang = document.documentElement.lang;
                    // "tık" kelimesini de çevir
                    const clicksText = lang === 'tr' ? 'tık' : 'clicks';
                    this.message.textContent = `${translations[lang].game4_msg_finished}! ${cps.toFixed(2)} ${translations[lang].game4_msg_cps} (${this.clicks} ${clicksText})`;
                    this.message.className = 'message win';
                    this.clickArea.textContent = translations[lang].game4_msg_finished; // Çeviriden al
                    this.clickArea.style.backgroundColor = 'var(--primary-color)';
                    sounds.sound2.play();
                    leaderboardManager.checkAndPromptForScore('game4', cps, this.card, this.resetBtn);
                }
            } },
            
            { cardId: 'game5', logic: { init() { this.bindElements(); this.setupInitialState(); this.startBtn.addEventListener('click', () => this.start()); this.resetBtn.addEventListener('click', () => this.reset()); this.target.addEventListener('click', () => this.hitTarget()); }, bindElements() {this.card = document.getElementById('card-game5'); this.startBtn=this.card.querySelector("#game5-start");this.resetBtn=this.card.querySelector("#game5-reset");this.message=this.card.querySelector("#game5-message");this.timerEl=this.card.querySelector("#game5-timer");this.scoreEl=this.card.querySelector("#game5-score");this.playArea=this.card.querySelector("#game5-play-area");this.target=this.card.querySelector("#game5-target");}, setupInitialState() { clearInterval(this.interval); this.timer = 20; this.score = 0; this.timerEl.textContent = 20; this.scoreEl.textContent = 0; hide(this.target); this.message.textContent = ''; leaderboardManager.clearLeaderboard(this.card, this.resetBtn);}, start() { show(this.resetBtn); hide(this.startBtn); this.interval = setInterval(() => { this.timer--; this.timerEl.textContent = this.timer; if(this.timer <= 0) this.endGame(); }, 1000); this.spawnTarget(); }, reset() { hide(this.resetBtn); show(this.startBtn); this.setupInitialState(); }, spawnTarget() { show(this.target); const rect = this.playArea.getBoundingClientRect(); this.target.style.top = `${Math.random() * (rect.height - 30)}px`; this.target.style.left = `${Math.random() * (rect.width - 30)}px`; }, hitTarget() { if(this.timer > 0) { sounds.win.play(); this.score++; this.scoreEl.textContent = this.score; this.spawnTarget(); } }, endGame() { clearInterval(this.interval); hide(this.target); const lang = document.documentElement.lang; this.message.textContent = `${translations[lang].game5_msg_timeout} ${this.score}`; this.message.className = 'message win'; sounds.sound2.play(); leaderboardManager.checkAndPromptForScore('game5', this.score, this.card, this.resetBtn); } } },
            
            // OYUN 6: KELİME TAHMİNİ (GÜNCELLENDİ)
            { cardId: 'game6', logic: {
                init() {
                    this.bindElements();
                    this.setupInitialState();
                    this.startBtn.addEventListener('click', () => this.start());
                    this.resetBtn.addEventListener('click', () => this.reset());
                },
                bindElements() {this.card = document.getElementById('card-game6'); this.startBtn=this.card.querySelector("#game6-start");this.resetBtn=this.card.querySelector("#game6-reset");this.message=this.card.querySelector("#game6-message");this.wordDisplay=this.card.querySelector("#game6-word-display");this.alphabetEl=this.card.querySelector("#game6-alphabet");this.guessesLeftEl=this.card.querySelector("#game6-guesses-left");},
                
                // wordList buradan kaldırıldı.

                setupInitialState() {this.message.textContent = ''; this.guessedLetters = []; this.guessesLeft = 6; this.guessesLeftEl.textContent = 6; this.wordDisplay.textContent = "_".repeat(7); this.alphabetEl.innerHTML = ''; leaderboardManager.clearLeaderboard(this.card, this.resetBtn);},
                
                start() {
                    show(this.resetBtn);
                    hide(this.startBtn);
                    
                    const lang = document.documentElement.lang;
                    // Kelime listesini seçilen dile göre al
                    const wordList = translations[lang].game6_word_list;
                    this.word = wordList[Math.floor(Math.random() * wordList.length)];
                    
                    this.alphabetEl.innerHTML = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'.split('').map(l => `<button class="letter-btn">${l}</button>`).join('');
                    this.alphabetEl.querySelectorAll('.letter-btn').forEach(b => {
                        b.addEventListener('click', (e) => {
                            sounds.sound1.play();
                            this.guessLetter(e.target);
                        });
                    });
                    this.updateWordDisplay();
                },
                
                reset() { hide(this.resetBtn); show(this.startBtn); this.setupInitialState(); },
                
                updateWordDisplay() { this.wordDisplay.textContent = this.word.split('').map(l => this.guessedLetters.includes(l) ? l : '_').join(''); if (!this.wordDisplay.textContent.includes('_')) this.endGame(true); },
                
                guessLetter(btn) { btn.disabled = true; const letter = btn.textContent; if (this.word.includes(letter)) { this.guessedLetters.push(letter); } else { this.guessesLeft--; this.guessesLeftEl.textContent = this.guessesLeft; if (this.guessesLeft === 0) this.endGame(false); } this.updateWordDisplay(); },
                
                endGame(win) {
                    this.alphabetEl.querySelectorAll('.letter-btn').forEach(btn => btn.disabled = true);
                    const lang = document.documentElement.lang;
                    if (win) {
                        this.message.textContent = translations[lang].game_win_congrats;
                        this.message.className = 'message win';
                        sounds.sound2.play();
                    } else {
                        this.message.textContent = `${translations[lang].game6_msg_lost} ${this.word}`;
                        this.message.className = 'message lose';
                        sounds.sound3.play();
                    }
                }
            } },
            
            { cardId: 'game7', logic: { init() { this.bindElements(); this.setupInitialState(); this.startBtn.addEventListener('click', () => this.start()); this.resetBtn.addEventListener('click', () => this.reset()); }, bindElements() {this.card = document.getElementById('card-game7'); this.startBtn=this.card.querySelector("#game7-start");this.resetBtn=this.card.querySelector("#game7-reset");this.message=this.card.querySelector("#game7-message");this.levelEl=this.card.querySelector("#game7-level");this.displayEl=this.card.querySelector("#game7-display");this.keypadEl=this.card.querySelector("#game7-keypad");}, setupInitialState() { this.level = 1; this.sequence = ''; this.playerInput = ''; this.message.textContent = ''; this.levelEl.textContent = 1; this.displayEl.textContent = ""; this.buildKeypad(); this.keypadEl.querySelectorAll('button').forEach(b => b.disabled = true); leaderboardManager.clearLeaderboard(this.card, this.resetBtn);}, start() { show(this.resetBtn); hide(this.startBtn); setTimeout(() => this.nextLevel(), 500); }, reset() { hide(this.resetBtn); show(this.startBtn); this.setupInitialState(); }, buildKeypad() { this.keypadEl.innerHTML = ''; for (let i = 1; i <= 9; i++) { const btn = document.createElement('button'); btn.textContent = i; btn.onclick = () => this.onKeyPress(i); this.keypadEl.appendChild(btn); } }, onKeyPress(num) { const lang = document.documentElement.lang; if (!this.playerTurn) return; this.playerInput += num; this.displayEl.textContent = this.playerInput; if (this.playerInput === this.sequence) { this.playerTurn = false; this.message.textContent = translations[lang].game11_msg_correct; this.message.className = 'message win'; sounds.sound2.play(); this.level++; setTimeout(() => this.nextLevel(), 1000); } else if (this.playerInput.length >= this.sequence.length) { this.endGame(); } }, nextLevel() { const lang = document.documentElement.lang; this.levelEl.textContent = this.level; this.message.textContent = translations[lang].game7_msg_memorize; this.message.className = 'message'; this.playerInput = ''; this.sequence = ''; for (let i = 0; i < this.level; i++) { this.sequence += Math.floor(Math.random() * 9) + 1; } this.displayEl.textContent = this.sequence; this.playerTurn = false; this.keypadEl.querySelectorAll('button').forEach(b => b.disabled = true); setTimeout(() => { this.displayEl.textContent = '_'.repeat(this.sequence.length); this.message.textContent = translations[lang].game7_msg_your_turn; this.playerTurn = true; this.keypadEl.querySelectorAll('button').forEach(b => b.disabled = false); }, 1000 + this.level * 400); }, endGame() { this.playerTurn = false; const lang = document.documentElement.lang; this.message.textContent = `${translations[lang].game7_msg_wrong} ${this.sequence}. ${translations[lang].level} ${this.level-1} ${translations[lang].game7_msg_level_complete}.`; this.message.className = 'message lose'; sounds.sound3.play(); leaderboardManager.checkAndPromptForScore('game7', this.level-1, this.card, this.resetBtn); } } },
            
            { cardId: 'game8', logic: { init() { this.bindElements(); this.setupInitialState(); this.startBtn.addEventListener('click', () => this.start()); this.resetBtn.addEventListener('click', () => this.reset()); }, bindElements() {this.card = document.getElementById('card-game8'); this.startBtn=this.card.querySelector("#game8-start");this.resetBtn=this.card.querySelector("#game8-reset");this.message=this.card.querySelector("#game8-message");this.levelEl=this.card.querySelector("#game8-level");this.scoreEl=this.card.querySelector("#game8-score");this.board=this.card.querySelector("#game8-board");}, setupInitialState() { this.level = 1; this.score = 0; this.levelEl.textContent = 1; this.scoreEl.textContent = 0; this.message.textContent = ''; this.board.innerHTML = ''; this.board.style.pointerEvents = 'none'; leaderboardManager.clearLeaderboard(this.card, this.resetBtn);}, start() { show(this.resetBtn); hide(this.startBtn); this.board.style.pointerEvents = 'auto'; this.nextLevel(); }, reset() { hide(this.resetBtn); show(this.startBtn); this.setupInitialState(); }, nextLevel() { this.levelEl.textContent = this.level; this.board.innerHTML = ''; const gridSize = Math.min(Math.floor(this.level / 1.5) + 2, 8); this.board.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`; const [r, g, b] = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]; const baseColor = `rgb(${r}, ${g}, ${b})`; const diff = Math.max(8, 40 - this.level * 2); const diffColor = `rgb(${r-diff < 0 ? r+diff:r-diff}, ${g-diff < 0 ? g+diff:g-diff}, ${b-diff < 0 ? b+diff:b-diff})`; this.diffIndex = Math.floor(Math.random() * gridSize * gridSize); for (let i = 0; i < gridSize * gridSize; i++) { const box = document.createElement('div'); box.className = 'diff-box'; box.style.backgroundColor = i === this.diffIndex ? diffColor : baseColor; box.onclick = () => this.check(i === this.diffIndex); this.board.appendChild(box); } }, check(isCorrect) { if (isCorrect) { sounds.sound2.currentTime = 0; sounds.sound2.play(); this.level++; this.score += (this.level * 10); this.scoreEl.textContent = this.score; this.nextLevel(); } else { this.endGame(); } }, endGame() { this.board.style.pointerEvents = 'none'; this.board.children[this.diffIndex].classList.add('correct-answer-highlight'); const lang = document.documentElement.lang; this.message.textContent = `${translations[lang].game8_msg_wrong} ${this.level}${translations[lang].game8_msg_level_end} ${this.score}`; this.message.className = 'message lose'; sounds.sound3.currentTime = 0; sounds.sound3.play(); leaderboardManager.checkAndPromptForScore('game8', this.score, this.card, this.resetBtn); } } },
            
            { cardId: 'game9', logic: { init() { this.bindElements(); this.setupInitialState(); this.startBtn.addEventListener('click', () => this.start()); this.resetBtn.addEventListener('click', () => this.reset()); }, bindElements() {this.card=document.getElementById('card-game9');this.startBtn=this.card.querySelector('#game9-start');this.resetBtn=this.card.querySelector('#game9-reset');this.board=this.card.querySelector('#game9-board');this.nextNumEl=this.card.querySelector('#game9-next-num');this.timerEl=this.card.querySelector('#game9-timer');this.message=this.card.querySelector('#game9-message');}, setupInitialState() { clearInterval(this.interval); this.interval = null; this.nextNum = 1; this.timer = 0; this.nextNumEl.textContent = 1; this.timerEl.textContent = "0.0"; this.board.innerHTML = ''; this.message.textContent = ''; this.board.style.pointerEvents = 'none'; leaderboardManager.clearLeaderboard(this.card, this.resetBtn);}, start() { show(this.resetBtn); hide(this.startBtn); this.board.style.pointerEvents = 'auto'; this.generateNumbers(); }, reset() { hide(this.resetBtn); show(this.startBtn); this.setupInitialState(); }, generateNumbers() { const nums = Array.from({length: 12}, (_, i) => i + 1).sort(() => 0.5 - Math.random()); const positions = []; const boardSize = 320; const numSize = 40; const checkOverlap = (pos1, pos2) => { const dx = pos1.left - pos2.left; const dy = pos1.top - pos2.top; const distance = Math.sqrt(dx * dx + dy * dy); return distance < numSize; }; nums.forEach(num => { let newPos; let isOverlapping; do { isOverlapping = false; newPos = { top: Math.random() * (boardSize - numSize), left: Math.random() * (boardSize - numSize) }; for(const pos of positions) { if(checkOverlap(newPos, pos)) { isOverlapping = true; break; } } } while (isOverlapping); positions.push(newPos); const numEl = document.createElement('div'); numEl.className = 'seq-num'; numEl.textContent = num; numEl.style.top = `${newPos.top}px`; numEl.style.left = `${newPos.left}px`; numEl.onclick = () => this.clickNum(num, numEl); this.board.appendChild(numEl); }); }, clickNum(num, el) { if (num === this.nextNum) { sounds.win.currentTime = 0; sounds.win.play(); if (this.nextNum === 1) { this.startTime = Date.now(); this.interval = setInterval(() => { this.timer = (Date.now() - this.startTime) / 1000; this.timerEl.textContent = this.timer.toFixed(1); }, 100); } el.style.display = 'none'; this.nextNum++; this.nextNumEl.textContent = this.nextNum > 12 ? translations[document.documentElement.lang].game9_msg_finished : this.nextNum; if (this.nextNum > 12) { this.endGame(); } } }, endGame() { clearInterval(this.interval); const lang = document.documentElement.lang; this.message.textContent = `${translations[lang].game9_msg_congrats} ${this.timer.toFixed(2)} ${translations[lang].game9_msg_seconds}`; this.message.className = 'message win'; sounds.sound2.currentTime = 0; sounds.sound2.play(); leaderboardManager.checkAndPromptForScore('game9', this.timer, this.card, this.resetBtn); } } },
            
            { cardId: 'game10', logic: { init() { this.bindElements(); this.setupInitialState(); this.startBtn.addEventListener('click', () => this.start()); this.resetBtn.addEventListener('click', () => this.reset()); this.choiceBtns.forEach(btn => btn.addEventListener('click', e => this.play(e.currentTarget.dataset.choice))); }, bindElements() {this.card = document.getElementById('card-game10'); this.startBtn=this.card.querySelector("#game10-start");this.resetBtn=this.card.querySelector("#game10-reset");this.message=this.card.querySelector("#game10-message");this.playerScoreEl=this.card.querySelector("#game10-player-score");this.cpuScoreEl=this.card.querySelector("#game10-cpu-score");this.playerChoiceEl=this.card.querySelector("#game10-player-choice");this.cpuChoiceEl=this.card.querySelector("#game10-cpu-choice");this.cpuChoiceBack=this.card.querySelector('#game10-cpu-choice .choice-back');this.resultsEl=this.card.querySelector("#game10-results");this.choiceBtns=this.card.querySelectorAll('#game10-choices .choice-btn');}, choices: { 'taş': '✊', 'kağıt': '✋', 'makas': '✌️' }, setupInitialState() {this.pScore = 0; this.cScore = 0; this.playerScoreEl.textContent = 0; this.cpuScoreEl.textContent = 0; this.resultsEl.textContent = ''; this.message.textContent = ''; this.playerChoiceEl.textContent = ''; this.cpuChoiceEl.classList.remove('flipped'); this.choiceBtns.forEach(b => b.disabled = true); leaderboardManager.clearLeaderboard(this.card, this.resetBtn);}, start() { show(this.resetBtn); hide(this.startBtn); this.choiceBtns.forEach(b => b.disabled = false); this.resultsEl.textContent = translations[document.documentElement.lang].game10_your_turn;}, reset() { hide(this.resetBtn); show(this.startBtn); this.setupInitialState(); }, play(playerChoice) { this.choiceBtns.forEach(b => b.disabled = true); this.playerChoiceEl.textContent = this.choices[playerChoice]; this.cpuChoiceEl.classList.remove('flipped'); const cpuChoiceKey = Object.keys(this.choices)[Math.floor(Math.random() * 3)]; this.cpuChoiceBack.textContent = this.choices[cpuChoiceKey]; setTimeout(() => { this.cpuChoiceEl.classList.add('flipped'); setTimeout(() => this.calculateResult(playerChoice, cpuChoiceKey), 600); }, 300); }, calculateResult(player, cpu) { const lang = document.documentElement.lang; let resultText; if (player === cpu) { resultText = translations[lang].game10_msg_draw; } else if ((player === 'taş' && cpu === 'makas') || (player === 'kağıt' && cpu === 'taş') || (player === 'makas' && cpu === 'kağıt')) { this.pScore++; resultText = translations[lang].game10_msg_win_round; sounds.sound2.currentTime = 0; sounds.sound2.play(); } else { this.cScore++; resultText = translations[lang].game10_msg_lose_round; sounds.sound3.currentTime = 0; sounds.sound3.play(); } this.playerScoreEl.textContent = this.pScore; this.cpuScoreEl.textContent = this.cScore; this.resultsEl.textContent = resultText; if(this.pScore === 5 || this.cScore === 5) this.endGame(); else this.choiceBtns.forEach(b => b.disabled = false); }, endGame() { const lang = document.documentElement.lang; const playerWins = this.pScore > this.cScore; this.message.textContent = playerWins ? translations[lang].game10_msg_win_game : translations[lang].game10_msg_lose_game; this.message.className = playerWins ? 'message win' : 'message lose'; this.choiceBtns.forEach(b => b.disabled = true); } } },
            
            { cardId: 'game11', logic: { init() { this.bindElements(); this.setupInitialState(); this.startBtn.addEventListener('click', () => this.start()); this.resetBtn.addEventListener('click', () => this.reset()); }, bindElements() { this.card = document.getElementById('card-game11'); this.startBtn = this.card.querySelector("#game11-start"); this.resetBtn = this.card.querySelector("#game11-reset"); this.message = this.card.querySelector("#game11-message"); this.levelEl = this.card.querySelector("#game11-level"); this.board = this.card.querySelector("#game11-board"); }, setupInitialState() { this.level = 1; this.levelEl.textContent = 1; this.sequence = []; this.playerSequence = []; this.colors = ['red', 'green', 'blue', 'yellow', 'orange', 'cyan']; this.playerTurn = false; this.message.textContent = ''; this.board.innerHTML = ''; this.colors.forEach(color => { const btn = document.createElement('div'); btn.id = `simon-${color}`; btn.className = 'simon-btn'; this.board.appendChild(btn); }); this.board.style.pointerEvents = 'none'; leaderboardManager.clearLeaderboard(this.card, this.resetBtn); }, start() { hide(this.startBtn); show(this.resetBtn); setTimeout(() => this.nextLevel(), 500); }, reset() { hide(this.resetBtn); show(this.startBtn); this.setupInitialState(); }, nextLevel() { const lang = document.documentElement.lang; this.levelEl.textContent = this.level; this.message.textContent = translations[lang].game11_msg_memorize; this.playerSequence = []; this.playerTurn = false; this.board.style.pointerEvents = 'none'; this.sequence.push(this.colors[Math.floor(Math.random() * this.colors.length)]); this.playSequence(); }, playSequence() { let i = 0; const interval = setInterval(() => { this.lightUp(this.sequence[i]); i++; if (i >= this.sequence.length) { clearInterval(interval); setTimeout(() => { this.playerTurn = true; this.board.style.pointerEvents = 'auto'; this.message.textContent = translations[document.documentElement.lang].game11_msg_your_turn; this.addPlayerControls(); }, 500); } }, 600); }, lightUp(color) { const btn = this.board.querySelector(`#simon-${color}`); btn.classList.add('lit'); if (!this.playerTurn) { sounds.sound4.currentTime = 0; sounds.sound4.play(); } setTimeout(() => btn.classList.remove('lit'), 300); }, addPlayerControls() { this.board.querySelectorAll('.simon-btn').forEach(btn => { btn.onclick = (e) => this.playerClick(e.target.id.split('-')[1]); }); }, playerClick(color) { if (!this.playerTurn) return; this.lightUp(color); this.playerSequence.push(color); const lastIndex = this.playerSequence.length - 1; if (this.playerSequence[lastIndex] !== this.sequence[lastIndex]) { this.endGame(); return; } if (this.playerSequence.length === this.sequence.length) { sounds.sound2.currentTime = 0; sounds.sound2.play(); this.level++; this.message.textContent = translations[document.documentElement.lang].game11_msg_correct; this.message.className = "message win"; setTimeout(() => this.nextLevel(), 1000); } }, endGame() { this.playerTurn = false; this.board.style.pointerEvents = 'none'; const lang = document.documentElement.lang; this.message.textContent = `${translations[lang].game11_msg_wrong} ${this.level}${translations[lang].game11_msg_level_end}`; this.message.className = 'message lose'; sounds.sound3.currentTime = 0; sounds.sound3.play(); leaderboardManager.checkAndPromptForScore('game11', this.level - 1, this.card, this.resetBtn); } } },
            
            { cardId: 'game12', logic: { init() { this.bindElements(); this.setupInitialState(); this.startBtn.addEventListener('click', () => this.start()); this.resetBtn.addEventListener('click', () => this.reset()); }, bindElements() { this.card = document.getElementById('card-game12'); this.startBtn = this.card.querySelector("#game12-start"); this.resetBtn = this.card.querySelector("#game12-reset"); this.message = this.card.querySelector("#game12-message"); this.movesEl = this.card.querySelector("#game12-moves"); this.foundEl = this.card.querySelector("#game12-found"); this.board = this.card.querySelector("#game12-board"); }, setupInitialState() { this.moves = 0; this.foundPairs = 0; this.movesEl.textContent = 0; this.foundEl.textContent = '0 / 8'; this.firstCard = null; this.secondCard = null; this.lockBoard = false; this.message.textContent = ''; this.board.innerHTML = ''; this.board.style.pointerEvents = 'none'; leaderboardManager.clearLeaderboard(this.card, this.resetBtn); }, start() { hide(this.startBtn); show(this.resetBtn); this.foundEl.textContent = '0 / 8'; this.board.style.pointerEvents = 'auto'; this.createBoard(); }, reset() { hide(this.resetBtn); show(this.startBtn); this.setupInitialState(); }, createBoard() { const icons = ['🍕', '🚀', '⭐', '😂', '😎', '👽', '👑', '🔥']; const cardIcons = [...icons, ...icons].sort(() => 0.5 - Math.random()); cardIcons.forEach(icon => { const cardElement = document.createElement('div'); cardElement.classList.add('memory-card'); cardElement.dataset.icon = icon; cardElement.innerHTML = `<div class="card-face card-front">${icon}</div><div class="card-face card-back"></div>`; cardElement.addEventListener('click', () => this.flipCard(cardElement)); this.board.appendChild(cardElement); }); }, flipCard(card) { if (this.lockBoard || card.classList.contains('flipped') || card === this.firstCard) return; card.classList.add('flipped'); if (!this.firstCard) { this.firstCard = card; return; } this.secondCard = card; this.moves++; this.movesEl.textContent = this.moves; this.checkForMatch(); }, checkForMatch() { const isMatch = this.firstCard.dataset.icon === this.secondCard.dataset.icon; isMatch ? this.disableCards() : this.unflipCards(); }, disableCards() { setTimeout(() => { sounds.sound2.currentTime = 0; sounds.sound2.play(); }, 250); this.firstCard.classList.add('matched'); this.secondCard.classList.add('matched'); this.foundPairs++; this.foundEl.textContent = `${this.foundPairs} / 8`; this.resetTurn(); if (this.foundPairs === 8) { this.endGame(); } }, unflipCards() { setTimeout(() => { sounds.sound3.currentTime = 0; sounds.sound3.play(); }, 250); this.lockBoard = true; setTimeout(() => { this.firstCard.classList.remove('flipped'); this.secondCard.classList.remove('flipped'); this.resetTurn(); }, 1000); }, resetTurn() { [this.firstCard, this.secondCard] = [null, null]; this.lockBoard = false; }, endGame() { const lang = document.documentElement.lang; this.message.textContent = `${translations[lang].game12_msg_congrats}! ${this.moves} ${translations[lang].game12_msg_moves_end}`; this.message.className = 'message win'; leaderboardManager.checkAndPromptForScore('game12', this.moves, this.card, this.resetBtn); } } },
            
            
            { cardId: 'game13', logic: {
    init() {
        this.bindElements();
        this.setupInitialState();
        this.startBtn.addEventListener('click', () => this.start());
        this.resetBtn.addEventListener('click', () => this.reset());
    },
    bindElements() {
        this.card = document.getElementById('card-game13');
        this.startBtn = this.card.querySelector("#game13-start");
        this.resetBtn = this.card.querySelector("#game13-reset");
        this.message = this.card.querySelector("#game13-message");
        this.levelEl = this.card.querySelector("#game13-level");
        this.minesLeftEl = this.card.querySelector("#game13-mines-left");
        this.boardEl = this.card.querySelector("#game13-board");
    },
    setupInitialState() {
        this.level = 1;
        this.firstClick = true;
        this.gameOver = false;
        this.board = [];
        this.rows = 0;
        this.cols = 0;
        this.mines = 0;
        this.flags = 0;
        this.revealedCount = 0;
        this.levelEl.textContent = 1;
        this.message.textContent = '';
        this.boardEl.innerHTML = '';
        this.boardEl.style.pointerEvents = 'none';
        leaderboardManager.clearLeaderboard(this.card, this.resetBtn);
    },
    start() {
        hide(this.startBtn);
        show(this.resetBtn);
        this.level = 1;
        this.nextLevel();
    },
    reset() {
        hide(this.resetBtn);
        show(this.startBtn);
        this.setupInitialState();
    },
    nextLevel() {
        this.firstClick = true;
        this.gameOver = false;
        this.message.textContent = '';
        this.levelEl.textContent = this.level;

        if (this.level >= 4) {
            this.rows = 8;
            this.cols = 8;
            this.mines = 6 + (this.level - 3) * 2;
        } else {
            this.rows = 6;
            this.cols = 6;
            this.mines = 4 + this.level;
        }

        this.flags = 0;
        this.revealedCount = 0;
        this.minesLeftEl.textContent = this.mines;
        this.boardEl.style.pointerEvents = 'auto';

        // Kritik: Geçici boş board oluşturulmalı (ilk tıklama güvenliği için)
        this.board = Array(this.rows).fill(null).map(() => Array(this.cols).fill(null).map(() => ({ 
            isMine: false, isRevealed: false, isFlagged: false, neighborMines: 0 
        })));

        this.createDisplayBoard();
    },
    createBoard(firstClickRow, firstClickCol) {
        // Sadece mayınları yerleştir
        let minesPlaced = 0;
        while (minesPlaced < this.mines) {
            const r = Math.floor(Math.random() * this.rows);
            const c = Math.floor(Math.random() * this.cols);
            if (!this.board[r][c].isMine && !(r === firstClickRow && c === firstClickCol)) {
                this.board[r][c].isMine = true;
                minesPlaced++;
            }
        }

        // Komşu mayınları say
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (!this.board[r][c].isMine) {
                    let count = 0;
                    for (let dr = -1; dr <= 1; dr++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            const nr = r + dr, nc = c + dc;
                            if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols && this.board[nr][nc].isMine) {
                                count++;
                            }
                        }
                    }
                    this.board[r][c].neighborMines = count;
                }
            }
        }
    },
    createDisplayBoard() {
        this.boardEl.innerHTML = '';
        this.boardEl.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const cell = document.createElement('div');
                cell.className = 'mine-cell';
                cell.dataset.row = r;
                cell.dataset.col = c;
                cell.addEventListener('click', () => this.handleCellClick(r, c));
                cell.addEventListener('contextmenu', e => {
                    e.preventDefault();
                    this.handleRightClick(r, c);
                });
                this.boardEl.appendChild(cell);
            }
        }
    },
    handleCellClick(r, c) {
        if (this.gameOver || this.board[r][c].isRevealed || this.board[r][c].isFlagged) return;

        sounds.correct.currentTime = 0;
        sounds.correct.play();

        if (this.firstClick) {
            this.createBoard(r, c);
            this.firstClick = false;
        }

        if (this.board[r][c].isMine) {
            this.endGame(false);
            return;
        }

        this.revealCell(r, c);
        if (this.rows * this.cols - this.revealedCount === this.mines) {
            this.endGame(true);
        }
    },
    handleRightClick(r, c) {
        if (this.gameOver || this.board[r][c].isRevealed) return;
        const cellData = this.board[r][c];
        const cellEl = this.boardEl.children[r * this.cols + c];
        cellData.isFlagged = !cellData.isFlagged;
        this.flags += cellData.isFlagged ? 1 : -1;
        cellEl.textContent = cellData.isFlagged ? '🚩' : '';
        this.minesLeftEl.textContent = this.mines - this.flags;
    },
    revealCell(r, c) {
        if (r < 0 || r >= this.rows || c < 0 || c >= this.cols) return;
        const cellData = this.board[r][c];
        if (cellData.isRevealed || cellData.isFlagged) return;

        cellData.isRevealed = true;
        this.revealedCount++;

        const cellEl = this.boardEl.children[r * this.cols + c];
        cellEl.classList.add('revealed');

        if (cellData.neighborMines > 0) {
            cellEl.innerHTML = `<span class="num-${cellData.neighborMines}">${cellData.neighborMines}</span>`;
        } else {
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    this.revealCell(r + dr, c + dc);
                }
            }
        }
    },
    endGame(isWin) {
        this.gameOver = true;
        this.boardEl.style.pointerEvents = 'none';
        const lang = document.documentElement.lang;

        if (isWin) {
            this.message.textContent = `${translations[lang].game13_msg_win} ${this.level} ${translations[lang].game13_msg_level_complete}`;
            this.message.className = 'message win';
            sounds.sound2.currentTime = 0;
            sounds.sound2.play();
            this.level++;
            setTimeout(() => this.nextLevel(), 2000);
        } else {
            this.message.textContent = translations[lang].game13_msg_lose;
            this.message.className = 'message lose';
            sounds.sound3.currentTime = 0;
            sounds.sound3.play();
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    if (this.board[r][c].isMine) {
                        this.boardEl.children[r * this.cols + c].innerHTML = '💣';
                    }
                }
            }
            leaderboardManager.checkAndPromptForScore('game13', this.level, this.card, this.resetBtn);
        }
    }
} },

            
            
            { cardId: 'game14', logic: { init() { this.bindElements(); this.setupInitialState(); this.startBtn.addEventListener('click', () => this.start()); this.resetBtn.addEventListener('click', () => this.reset()); this.checkBtn.addEventListener('click', () => this.checkPattern()); }, bindElements() { this.card = document.getElementById('card-game14'); this.startBtn = this.card.querySelector("#game14-start"); this.resetBtn = this.card.querySelector("#game14-reset"); this.message = this.card.querySelector("#game14-message"); this.levelEl = this.card.querySelector("#game14-level"); this.boardEl = this.card.querySelector("#game14-board"); this.checkBtn = this.card.querySelector("#game14-check-btn"); }, setupInitialState() { this.level = 1; this.gridSize = 25; this.pattern = []; this.lockBoard = false; this.levelEl.textContent = 1; this.message.textContent = ''; this.boardEl.innerHTML = ''; this.boardEl.style.pointerEvents = 'none'; hide(this.checkBtn); leaderboardManager.clearLeaderboard(this.card, this.resetBtn); }, start() { hide(this.startBtn); show(this.resetBtn); this.createBoard(); this.nextLevel(); }, reset() { hide(this.resetBtn); show(this.startBtn); this.setupInitialState(); }, createBoard() { this.boardEl.innerHTML = ''; for(let i=0; i < this.gridSize; i++) { const cell = document.createElement('div'); cell.className = 'pattern-cell'; cell.addEventListener('click', () => this.handleCellClick(cell)); this.boardEl.appendChild(cell); } }, nextLevel() { const lang = document.documentElement.lang; this.levelEl.textContent = this.level; this.message.textContent = translations[lang].game14_msg_memorize; this.message.className = 'message'; hide(this.checkBtn); this.boardEl.querySelectorAll('.selected, .correct, .incorrect').forEach(c => c.className = 'pattern-cell'); this.generatePattern(); this.showPattern(); }, generatePattern() { this.pattern = new Set(); const squaresToRemember = 2 + this.level; while (this.pattern.size < squaresToRemember) { this.pattern.add(Math.floor(Math.random() * this.gridSize)); } }, showPattern() { this.lockBoard = true; this.boardEl.style.pointerEvents = 'none'; this.pattern.forEach(index => this.boardEl.children[index].classList.add('active')); setTimeout(() => { this.pattern.forEach(index => this.boardEl.children[index].classList.remove('active')); this.lockBoard = false; this.boardEl.style.pointerEvents = 'auto'; this.message.textContent = translations[document.documentElement.lang].game14_msg_your_turn; show(this.checkBtn); }, 1500 + this.level * 200); }, handleCellClick(cell) { if (!this.lockBoard) cell.classList.toggle('selected'); }, checkPattern() { if (this.lockBoard) return; this.lockBoard = true; hide(this.checkBtn); const selectedIndices = new Set(); this.boardEl.querySelectorAll('.selected').forEach((cell, i) => { selectedIndices.add(Array.from(this.boardEl.children).indexOf(cell)); }); const isMatch = selectedIndices.size === this.pattern.size && [...selectedIndices].every(index => this.pattern.has(index)); if (isMatch) { sounds.sound2.currentTime = 0; sounds.sound2.play(); this.message.textContent = translations[document.documentElement.lang].game14_msg_correct; this.message.className = 'message win'; selectedIndices.forEach(i => this.boardEl.children[i].classList.add('correct')); this.level++; setTimeout(() => this.nextLevel(), 1500); } else { this.endGame(selectedIndices); } }, endGame(selectedIndices) { sounds.sound3.currentTime = 0; sounds.sound3.play(); const lang = document.documentElement.lang; this.message.textContent = `${translations[lang].game14_msg_wrong} ${this.level}${translations[lang].game11_msg_level_end}`; this.message.className = 'message lose'; this.boardEl.querySelectorAll('.pattern-cell').forEach((cell, index) => { if (this.pattern.has(index)) cell.classList.add('active'); if (selectedIndices.has(index) && !this.pattern.has(index)) cell.classList.add('incorrect'); }); leaderboardManager.checkAndPromptForScore('game14', this.level, this.card, this.resetBtn); } } },
            
            // YENİ OYUN 15: KAYDIRMALI BULMACA (GÜNCELLENDİ)
            { cardId: 'game15', logic: {
                init() { this.bindElements(); this.setupInitialState(); this.startBtn.addEventListener('click', () => this.start()); this.resetBtn.addEventListener('click', () => this.reset()); },
                bindElements() { this.card = document.getElementById('card-game15'); this.startBtn = this.card.querySelector("#game15-start"); this.resetBtn = this.card.querySelector("#game15-reset"); this.message = this.card.querySelector("#game15-message"); this.movesEl = this.card.querySelector("#game15-moves"); this.boardEl = this.card.querySelector("#game15-board"); },
                setupInitialState() { this.moves = 0; this.movesEl.textContent = 0; this.tiles = []; this.message.textContent = ''; this.boardEl.innerHTML = ''; leaderboardManager.clearLeaderboard(this.card, this.resetBtn); },
                start() { hide(this.startBtn); show(this.resetBtn); sounds.correct.volume = 0.05; this.createBoard(); },
                reset() { hide(this.resetBtn); show(this.startBtn); this.setupInitialState(); },
                createBoard() {
                    this.moves = 0; this.movesEl.textContent = 0; this.message.textContent = '';
                    let numbers = Array.from({ length: 8 }, (_, i) => i + 1); numbers.push(null);
                    
                    do { numbers.sort(() => 0.5 - Math.random()); } while (!this.isSolvable(numbers));
                    
                    this.tiles = numbers;
                    this.renderBoard();
                },
                renderBoard() {
                    this.boardEl.innerHTML = '';
                    this.tiles.forEach((tileValue, i) => {
                        const tile = document.createElement('div');
                        tile.className = 'puzzle-tile';
                        if (tileValue === null) {
                            tile.classList.add('empty');
                        } else {
                            tile.textContent = tileValue;
                        }
                        tile.addEventListener('click', () => this.moveTile(i));
                        this.boardEl.appendChild(tile);
                    });
                    if (this.isSolved()) this.endGame();
                },
                moveTile(clickedIndex) {
                    const emptyIndex = this.tiles.indexOf(null);
                    const [r1, c1] = [Math.floor(clickedIndex / 3), clickedIndex % 3];
                    const [r2, c2] = [Math.floor(emptyIndex / 3), emptyIndex % 3];
                    const isAdjacent = (Math.abs(r1 - r2) + Math.abs(c1 - c2)) === 1;

                    if (isAdjacent) {
                        sounds.correct.currentTime = 0;
                        sounds.correct.play();
                        [this.tiles[clickedIndex], this.tiles[emptyIndex]] = [this.tiles[emptyIndex], this.tiles[clickedIndex]];
                        this.moves++;
                        this.movesEl.textContent = this.moves;
                        this.renderBoard();
                    }
                },
                isSolved() {
                    for (let i = 0; i < 8; i++) { if (this.tiles[i] !== i + 1) return false; }
                    return true;
                },
                isSolvable(puzzle) {
                    let inversions = 0;
                    const p = puzzle.filter(x => x !== null);
                    for (let i = 0; i < p.length; i++) { for (let j = i + 1; j < p.length; j++) { if (p[i] > p[j]) inversions++; } }
                    return inversions % 2 === 0;
                },
                endGame() {
                    const lang = document.documentElement.lang;
                    this.message.textContent = `${translations[lang].game15_msg_congrats} ${this.moves} ${translations[lang].game15_msg_moves_end}`;
                    this.message.className = 'message win';
                    sounds.sound2.currentTime = 0;
                    sounds.sound2.play();
                    this.boardEl.querySelectorAll('.puzzle-tile').forEach(t => { if(!t.classList.contains('empty')) t.classList.add('correct'); t.style.pointerEvents = 'none'; });
                    leaderboardManager.checkAndPromptForScore('game15', this.moves, this.card, this.resetBtn);
                }
            } },

            // YENİ OYUN 16: YAZMA HIZI TESTİ (TAMAMEN ÇEVİRİYE UYGUN)
            { cardId: 'game16', logic: {
                init() {
                    this.handleKeyDown = this.handleKeyDown.bind(this);
                    this.handleInput = this.handleInput.bind(this);
                    this.bindElements(); 

                    this.originalSound1Volume = sounds.sound1.volume;
                    this.originalSound3Volume = sounds.sound3.volume;

                    this.setupInitialState(); 
                    this.startBtn.addEventListener('click', () => this.start()); 
                    this.resetBtn.addEventListener('click', () => this.reset());
                },
                bindElements() { this.card = document.getElementById('card-game16'); this.startBtn = this.card.querySelector("#game16-start"); this.resetBtn = this.card.querySelector("#game16-reset"); this.message = this.card.querySelector("#game16-message"); this.timerEl = this.card.querySelector("#game16-timer"); this.wpmEl = this.card.querySelector("#game16-wpm"); this.textDisplayEl = this.card.querySelector("#game16-text-display"); this.inputEl = this.card.querySelector("#game16-input"); },
                
                // wordList buradan kaldırıldı, artık translations nesnesinden gelecek.

                setupInitialState() {
                    clearInterval(this.timerInterval); this.timerInterval = null; this.startTime = null; this.timeLeft = 30; this.gameOn = false; this.currentWordIndex = 0; this.totalCorrectChars = 0; this.wordsToType = []; this.timerEl.textContent = 30; this.wpmEl.textContent = 0; this.inputEl.value = ''; this.inputEl.disabled = true; this.inputEl.removeEventListener('input', this.handleInput); this.inputEl.removeEventListener('keydown', this.handleKeyDown); this.message.textContent = '';
                    // Başlangıç metnini çeviriden al
                    this.textDisplayEl.textContent = translations[document.documentElement.lang].game16_initial_text;
                    leaderboardManager.clearLeaderboard(this.card, this.resetBtn);
                },
                start() { hide(this.startBtn); show(this.resetBtn); sounds.sound1.volume = 0.1; sounds.sound3.volume = 0.02; this.inputEl.disabled = false; this.inputEl.focus(); this.loadNewWords(); this.inputEl.addEventListener('input', this.handleInput); this.inputEl.addEventListener('keydown', this.handleKeyDown); },
                reset() { hide(this.resetBtn); show(this.startBtn); sounds.sound1.volume = this.originalSound1Volume; sounds.sound3.volume = this.originalSound3Volume; this.setupInitialState(); },
                
                loadNewWords() {
                    const lang = document.documentElement.lang;
                    // Kelime listesini seçilen dile göre al
                    const wordList = translations[lang].game16_word_list;

                    this.textDisplayEl.innerHTML = '';
                    this.wordsToType = [...wordList].sort(() => 0.5 - Math.random()).slice(0, 10); // Ekrana 15 kelime yükle
                    this.wordsToType.forEach(word => {
                        const wordSpan = document.createElement('span');
                        wordSpan.className = 'word';
                        wordSpan.textContent = word;
                        this.textDisplayEl.appendChild(wordSpan);
                    });
                    this.currentWordIndex = 0;
                    this.updateActiveWord();
                },
                updateActiveWord() {
                    this.textDisplayEl.querySelectorAll('.word.active').forEach(el => el.classList.remove('active'));
                    const newActiveWord = this.textDisplayEl.children[this.currentWordIndex];
                    if (newActiveWord) {
                        newActiveWord.classList.add('active');
                    }
                },
                handleKeyDown(e) {
                    if (this.gameOn && e.code === 'Space') {
                        e.preventDefault();
                        this.checkWord();
                    }
                },
                handleInput() {
                    if (!this.gameOn && this.inputEl.value.trim().length > 0) {
                        this.startGameTimer();
                    }
                    const currentWord = this.wordsToType[this.currentWordIndex];
                    let typedValue = this.inputEl.value;

                    // Eğer yazılan kelime doğru ve sonunda boşluk varsa, kelimeyi kabul et
                    if (typedValue === currentWord + " ") {
                        this.checkWord();
                    }
                },
                startGameTimer() {
                    if (this.gameOn) return;
                    this.gameOn = true;
                    this.startTime = new Date();
                    this.timerInterval = setInterval(() => {
                        this.timeLeft--;
                        this.timerEl.textContent = this.timeLeft;
                        const elapsedTimeInMinutes = (30 - this.timeLeft) / 60;
                        if (elapsedTimeInMinutes > 0) {
                            const wpm = Math.round((this.totalCorrectChars / 5) / elapsedTimeInMinutes);
                            this.wpmEl.textContent = wpm;
                        }
                        if (this.timeLeft <= 0) this.endGame();
                    }, 1000);
                },
                checkWord() {
                    const typedWord = this.inputEl.value.trim();
                    if (typedWord === '') return;

                    const wordEl = this.textDisplayEl.children[this.currentWordIndex];
                    const currentWord = this.wordsToType[this.currentWordIndex];
                    
                    if(currentWord === typedWord) {
                        sounds.sound1.currentTime = 0;
                        sounds.sound1.play();
                        this.totalCorrectChars += currentWord.length + 1;
                        wordEl.classList.add('correct-word');
                    } else {
                        sounds.sound3.currentTime = 0;
                        sounds.sound3.play();
                        wordEl.classList.add('incorrect-word');
                    }
                    
                    this.inputEl.value = '';
                    this.currentWordIndex++;
                    
                    if (this.currentWordIndex >= this.wordsToType.length) {
                        this.loadNewWords();
                    } else {
                        this.updateActiveWord();
                    }
                },
                endGame() {
                    clearInterval(this.timerInterval);
                    this.gameOn = false;
                    this.inputEl.disabled = true;

                    sounds.sound1.volume = this.originalSound1Volume;
                    sounds.sound3.volume = this.originalSound3Volume;
                    
                    const elapsedTime = (30 - this.timeLeft) / 60;
                    const wpm = elapsedTime > 0 ? Math.round((this.totalCorrectChars / 5) / elapsedTime) : 0;
                    this.wpmEl.textContent = wpm;

                    const lang = document.documentElement.lang;
                    this.message.textContent = `${translations[lang].game16_msg_finished} ${wpm} ${translations[lang].game16_msg_wpm}`;
                    this.message.className = 'message win';

                    sounds.sound2.currentTime = 0;
                    sounds.sound2.play();
                    
                    leaderboardManager.checkAndPromptForScore('game16', wpm, this.card, this.resetBtn);
                }
            } },


            // YENİ OYUN 17: ARİTMETİK DEHASI (GÜNCELLENDİ)
            { cardId: 'game18', logic: {
                init() { this.bindElements(); this.setupInitialState(); this.startBtn.addEventListener('click', () => this.start()); this.resetBtn.addEventListener('click', () => this.reset()); this.answerEl.addEventListener('input', () => this.checkAnswer()); },
                bindElements() { this.card = document.getElementById('card-game18'); this.startBtn = this.card.querySelector("#game18-start"); this.resetBtn = this.card.querySelector("#game18-reset"); this.message = this.card.querySelector("#game18-message"); this.timerEl = this.card.querySelector("#game18-timer"); this.scoreEl = this.card.querySelector("#game18-score"); this.questionEl = this.card.querySelector("#game18-question"); this.answerEl = this.card.querySelector("#game18-answer"); },
                setupInitialState() { clearInterval(this.timerInterval); this.score = 0; this.timeLeft = 30; this.correctAnswer = 0; this.scoreEl.textContent = 0; this.timerEl.textContent = 30; this.questionEl.textContent = '? + ?'; this.answerEl.value = ''; this.answerEl.disabled = true; this.message.textContent = ''; leaderboardManager.clearLeaderboard(this.card, this.resetBtn); },
                start() { hide(this.startBtn); show(this.resetBtn); this.answerEl.disabled = false; this.answerEl.focus(); this.nextQuestion(); this.timerInterval = setInterval(() => { this.timeLeft--; this.timerEl.textContent = this.timeLeft; if (this.timeLeft <= 0) this.endGame(); }, 1000); },
                reset() { hide(this.resetBtn); show(this.startBtn); this.setupInitialState(); },
                nextQuestion() { const ops = ['+', '-', '×']; const op = ops[Math.floor(Math.random() * ops.length)]; let n1, n2; if (op === '+') { n1 = Math.floor(Math.random()*20)+1; n2 = Math.floor(Math.random()*20)+1; this.correctAnswer = n1 + n2; } else if (op === '-') { n1 = Math.floor(Math.random()*20)+10; n2 = Math.floor(Math.random()*10)+1; this.correctAnswer = n1 - n2; } else { n1 = Math.floor(Math.random()*9)+2; n2 = Math.floor(Math.random()*9)+2; this.correctAnswer = n1 * n2; } this.questionEl.textContent = `${n1} ${op} ${n2}`; this.answerEl.value = ''; },
                checkAnswer() { if(this.answerEl.value == this.correctAnswer) { this.score++; this.scoreEl.textContent = this.score; sounds.sound1.currentTime = 0; sounds.sound1.play(); this.nextQuestion(); } },
                endGame() { clearInterval(this.timerInterval); this.answerEl.disabled = true; const lang = document.documentElement.lang; this.message.textContent = `${translations[lang].game18_msg_timeout} ${this.score}`; this.message.className = 'message win'; sounds.sound2.currentTime = 0; sounds.sound2.play(); leaderboardManager.checkAndPromptForScore('game18', this.score, this.card, this.resetBtn); }
            } },

            // YENİ OYUN 18: ENGELDEN KAÇIŞ (GÜNCELLENDİ)
            { cardId: 'game19', logic: {
                init() { this.bindElements(); this.setupInitialState(); this.startBtn.addEventListener('click', () => this.start()); this.resetBtn.addEventListener('click', () => this.reset()); },
                bindElements() { this.card = document.getElementById('card-game19'); this.startBtn = this.card.querySelector("#game19-start"); this.resetBtn = this.card.querySelector("#game19-reset"); this.message = this.card.querySelector("#game19-message"); this.scoreEl = this.card.querySelector("#game19-score"); this.boardEl = this.card.querySelector("#game19-board"); this.playerEl = this.card.querySelector("#game19-player"); },
                setupInitialState() { cancelAnimationFrame(this.gameLoopId); this.score = 0; this.scoreEl.textContent = 0; this.obstacles = []; this.boardEl.innerHTML = ''; this.boardEl.appendChild(this.playerEl); this.playerEl.style.top = '50%'; this.message.textContent = ''; this.removeMouseListeners(); leaderboardManager.clearLeaderboard(this.card, this.resetBtn); },
                start() { hide(this.startBtn); show(this.resetBtn); this.addMouseListeners(); this.gameLoop(); },
                reset() { hide(this.resetBtn); show(this.startBtn); this.removeMouseListeners(); this.setupInitialState(); },
                addMouseListeners() { this.boardEl.requestPointerLock(); this.boundMouseMove = (e) => this.movePlayer(e); document.addEventListener('mousemove', this.boundMouseMove); this.boundTouchMove = (e) => this.movePlayer(e, 'touch'); this.boardEl.addEventListener('touchmove', this.boundTouchMove, { passive: false }); },
                removeMouseListeners() { if(document.pointerLockElement === this.boardEl) document.exitPointerLock(); document.removeEventListener('mousemove', this.boundMouseMove); this.boardEl.removeEventListener('touchmove', this.boundTouchMove); },
                movePlayer(e, type) {
                    e.preventDefault(); // Sayfanın kaymasını engelle
                    const boardRect = this.boardEl.getBoundingClientRect();
                    let newY;

                    if (type === 'touch') {
                        // Dokunmatik hareketi
                        newY = e.touches[0].clientY - boardRect.top;
                    } else {
                        // Fare hareketi
                        const currentTop = this.playerEl.offsetTop;
                        newY = currentTop + e.movementY;
                    }
                    
                    const playerHeight = this.playerEl.offsetHeight;
                    this.playerEl.style.top = Math.max(0, Math.min(boardRect.height - playerHeight, newY)) + 'px';
                },
                gameLoop() { this.score++; this.scoreEl.textContent = this.score; if(this.score % 50 === 0) { this.spawnObstacle(); } this.moveObstacles(); if(this.checkCollision()) { this.endGame(); return; } this.gameLoopId = requestAnimationFrame(this.gameLoop.bind(this)); },
                spawnObstacle() { const obstacle = document.createElement('div'); obstacle.className = 'obstacle'; const height = Math.random() * 40 + 20; const isTop = Math.random() > 0.5; obstacle.style.height = height + '%'; obstacle.style.left = this.boardEl.offsetWidth + 'px'; if(isTop) { obstacle.style.top = '0'; } else { obstacle.style.bottom = '0'; } this.boardEl.appendChild(obstacle); this.obstacles.push(obstacle); },
                moveObstacles() { for(let i = this.obstacles.length - 1; i >= 0; i--) { let obs = this.obstacles[i]; let newLeft = obs.offsetLeft - (2 + this.score/500); obs.style.left = newLeft + 'px'; if(newLeft < -20) { obs.remove(); this.obstacles.splice(i, 1); } } },
                checkCollision() { const p = this.playerEl.getBoundingClientRect(); for(const obs of this.obstacles) { const o = obs.getBoundingClientRect(); if(p.left < o.right && p.right > o.left && p.top < o.bottom && p.bottom > o.top) return true; } return false; },
                endGame() { cancelAnimationFrame(this.gameLoopId); this.removeMouseListeners(); const lang = document.documentElement.lang; this.message.textContent = `${translations[lang].game19_msg_lose} ${this.score}`; this.message.className = 'message lose'; sounds.sound2.currentTime = 0; sounds.sound2.play(); leaderboardManager.checkAndPromptForScore('game19', this.score, this.card, this.resetBtn); }
            } }

        ];
        games.forEach(game => game.logic.init());

        setupGlobalListeners();

    }).catch(error => { console.error("Veritabanı başlatılamadı:", error); });


    function setupGlobalListeners() {
        const langBtn = document.getElementById('lang-btn');
        const langDropdown = document.getElementById('lang-dropdown');
        
        // Dil Seçimi
        langBtn.addEventListener('click', (e) => { e.stopPropagation(); langDropdown.classList.toggle('hidden'); });
        document.addEventListener('click', () => langDropdown.classList.add('hidden'));
        langDropdown.addEventListener('click', (e) => { e.preventDefault(); const langLink = e.target.closest('a'); if (langLink?.dataset.lang) setLanguage(langLink.dataset.lang); });

        // Sayfa yüklendiğinde dili ayarla
        setLanguage(localStorage.getItem('language') || 'en');

        // Tam Ekran
        document.querySelectorAll('.fullscreen-btn').forEach(btn => { btn.addEventListener('click', (e) => { e.stopPropagation(); openModal(btn.closest('.game-card')); }); });
        modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

        // Liderlik Kısayolu
        // LİDERLİK KISAYOLU (GÜVENİLİR VERSİYON)
        document.querySelectorAll('.leaderboard-shortcut-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); 

                const gameCard = btn.closest('.game-card');
                if (!gameCard) return; 

                // KARTIN ID'SİNDEN OYUN ID'SİNİ TÜRETME YÖNTEMİNE GERİ DÖNÜYORUZ
                const gameIdMatch = gameCard.id.match(/\d+/);
                if (!gameIdMatch) return;
                const gameId = 'game' + gameIdMatch[0];
                
                const resetBtn = gameCard.querySelector('[id$="-reset"]');
                if (!resetBtn) return;

                const existingOverlay = gameCard.querySelector('.leaderboard-overlay');
                
                if (existingOverlay) {
                    const buttonContainer = gameCard.querySelector('.button-container');
                    if (buttonContainer) buttonContainer.appendChild(resetBtn);
                    existingOverlay.remove();
                } else {
                    if (leaderboardManager.leaderboardGames[gameId]) {
                        leaderboardManager.displayLeaderboard(gameId, gameCard, resetBtn);
                    }
                }
            });
        });

        // YENİ: KENDİ AKICI KAYDIRMA FONKSİYONUMUZ
        function smoothScrollTo(element, duration) {
            const targetPosition = element.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 2) + (element.clientHeight / 2);
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = Math.min(1, timeElapsed / duration); // 0 ile 1 arası ilerleme
                // Yavaş başlayıp yavaş biten "easeInOut" efekti
                const ease = 0.5 * (1 - Math.cos(Math.PI * run));
                window.scrollTo(0, startPosition + distance * ease);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            requestAnimationFrame(animation);
        }

        // 4. YENİ: PAYLAŞ BUTONLARI (GÜNCELLENDİ)
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const gameCard = btn.closest('.game-card');
                const gameId = gameCard.id; // "card-game2"
                const lang = document.documentElement.lang; // Mevcut dili al (tr, en)

                // Oyunun "slug" (URL dostu metin) karşılığını çeviriden bul
                const gameKey = gameId.replace('card-', '') + '_slug'; // "card-game2" -> "game2_slug"
                const gameSlug = translations[lang][gameKey] || gameId; // Eğer çeviri yoksa, eski ID'yi kullan

                // Temiz URL oluştur (örn: https://site.com/#renk-avi?lang=tr)
                const shareUrl = `${window.location.origin}${window.location.pathname}#${gameSlug}?lang=${lang}`;
                
                navigator.clipboard.writeText(shareUrl).then(() => {
                    const originalContent = btn.innerHTML;
                    btn.innerHTML = '✔️';
                    setTimeout(() => { btn.innerHTML = originalContent; }, 1500);
                }).catch(err => {
                    console.error('Kopyalama başarısız oldu: ', err);
                });
            });
        });

        // 5. YENİ: SAYFA YÜKLENDİĞİNDE URL KONTROLÜ (GÜNCELLENDİ)
        function checkUrlForGame() {
            const url = new URL(window.location.href);
            const hash = url.hash.substring(1); // # işaretini kaldır (örn: "renk-avi?lang=tr")
            const cleanHash = hash.split('?')[0]; // Sadece oyun adını al (örn: "renk-avi")
            const langParam = url.searchParams.get('lang'); // ?lang=en parametresini al

            // Önce dili ayarla (eğer URL'de varsa)
            if (langParam === 'en' || langParam === 'tr') {
                setLanguage(langParam);
            }

            if (cleanHash) {
                let targetGameCard = null;
                
                // Gelen "slug" hangi oyuna ait, onu bul
                // Önce Türkçe slug'ları kontrol et
                let foundGameNumber = Object.keys(translations.tr).find(key => translations.tr[key] === cleanHash)?.match(/\d+/)?.[0];
                
                // Eğer bulunamadıysa, İngilizce slug'ları kontrol et
                if (!foundGameNumber) {
                    foundGameNumber = Object.keys(translations.en).find(key => translations.en[key] === cleanHash)?.match(/\d+/)?.[0];
                }

                if (foundGameNumber) {
                    targetGameCard = document.getElementById(`card-game${foundGameNumber}`);
                } else {
                    // Geriye dönük uyumluluk için eski ID sistemini de kontrol et
                    targetGameCard = document.getElementById(cleanHash);
                }

                if (targetGameCard) {
                    const scrollDuration = 1000;
                    smoothScrollTo(targetGameCard, scrollDuration);

                    if (window.innerWidth > 768) {
                        setTimeout(() => {
                            openModal(targetGameCard);
                        }, scrollDuration + 100);
                    }
                }
            }
        }
    
    // Sayfa tamamen yüklendikten biraz sonra çalıştırarak daha akıcı bir başlangıç sağla
    setTimeout(() => {
        checkUrlForGame();
    }, 100);

            document.querySelectorAll('button').forEach(button => {
            // Sadece belirli butonlar için tıklama ve hover sesleri ekle
            const isGameButton = button.id.includes('start') || 
                                 button.id.includes('reset') || 
                                 button.id.includes('check') ||
                                 button.id === 'lang-btn';

            if (isGameButton) {
                button.addEventListener('click', () => {
                    if (!button.disabled) {
                        sounds.click.play(); // veya istediğin başka bir tıklama sesi
                    }
                });

                button.addEventListener('mouseenter', () => {
                    if (!button.disabled) {
                        sounds.hover.play();
                    }
                });
            }
        });
    }

    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Kart odak modunda DEĞİLSE hover efektini uygula
            if (!card.classList.contains('focused-game')) {
                card.classList.add('card-hover-effect');
            }
        });

        card.addEventListener('mouseleave', () => {
            // Fare karttan ayrıldığında her zaman hover efektini kaldır
            card.classList.remove('card-hover-effect');
        });
    });

   
});