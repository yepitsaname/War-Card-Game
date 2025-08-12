const { deck, Player } = require('./utilities.js');
const prompt = require('prompt-sync')({sigint: true});

// Create Players
const player = new Player('Bob', []);
const computer = new Player('Computer', []);

// Stats
const stats = {won: 0, lost: 0, tied: 0}

// Shuffle the Deck and Deal
function initialize(){
  deck.cards = deck.shuffle(deck.decklist);
  player.hand = deck.cards.map(card => card);
  computer.hand = player.hand.splice(deck.decklist.length / 2);
}

function gameManager(){
  var round = 0;
  let cards = [];
  let wars = 0;
  while(true){
    // Comment this line out if you dont want to sit through flips
    prompt('Press Enter to Flip a card!\n');

    console.clear();
    console.log(`\x1b[93mROUND ${++round}\x1b[0m\n`)

    cards.unshift(player.hand.shift(), computer.hand.shift());

    console.log(`\x1b[36mYou flipped ${cards[0] % 13 + 1}`);
    console.log(`The computer flipped ${cards[1] % 13 + 1}\n`);

    if( cards[0] % 13 < cards[1] % 13 ){
      computer.hand.push(...cards);
      cards = [];
      console.log('\x1b[31mThe computer won the hand!\x1b[0m');
    } else if ( cards[0] % 13 > cards [1] % 13 ){
      player.hand.push(...cards);
      cards = [];
      console.log('\x1b[32mYou have won the hand!\x1b[0m')
    } else {
      console.log('\x1b[4m\x1b[31mWAR~!\n\x1b[0m\x1b[31mTaking three cards from each player...\x1b[0m');
      for( let n = 0; n < 3; n++){
        cards.unshift(player.hand.shift(), computer.hand.shift());
        wars++;
      };
    }

    if(player.hand.length <= 0 && computer.hand.lenght <= 0){
      gameOver('TIED', round, wars);
      return('TIED'); };
    if(player.hand.length <= 0 ){
      gameOver('LOST', round, wars);
      return('LOST'); };
    if(computer.hand.length <= 0 ){
      gameOver('WON', round, wars);
      return('WON'); };

    console.log(`\nPlayer cards remaining: ${player.hand.length} | Computer cards remaining: ${computer.hand.length}\n`);
  }
}

function gameOver(state, rounds, wars){
  let color = state === 'WON' ? `\x1b[42m` : state === 'LOST' ? `\x1b[41m` : `\x1b[43m`
  console.clear();
  console.log(`\n\x1b[1m${color} GAME OVER - YOU ${state} \x1b[0m`);
  console.log(`\n\x1b[1mRounds:\x1b[0m \x1b[36m${rounds}\x1b[0m\n\x1b[1mWars Fought:\x1b[0m \x1b[36m${wars}\x1b[0m\n`);
  prompt('press \x1b[1m\x1b[34mENTER\x1b[0m to continue...');
}

function mainMenu(){
  while(true){
    console.clear();
    console.log('\x1b[41m\x1b[1m              WAR              \x1b[0m')
    console.log(`\n\x1b[1mWins:\x1b[0m \x1b[36m${stats.won}\x1b[0m | \x1b[1mLosses:\x1b[0m \x1b[36m${stats.lost}\x1b[0m | \x1b[1mTies:\x1b[0m \x1b[36m${stats.tied}\x1b[0m\n`);
    var response = prompt('(\x1b[1mN\x1b[0m) New Game | (\x1b[1mX\x1b[0m) Exit Game: ').toUpperCase();
    if( response === 'N' ){
      console.clear();
      initialize();
      let end_state = gameManager();
      end_state === 'WON' ? stats.won++ : end_state === 'LOST' ? stats.lost++ : stats.tied++;
    } else if( response === 'X' ) {
      break;
    } else {
      console.log(`\x1b[33mWARN:\x1b[0m Your response of '${response}' is invalid! Try '\x1b[1mN\x1b[0m' for a \x1b[1mnew game\x1b[0m or '\x1b[1mX\x1b[0m' to \x1b[1mexit\x1b[0m.`)
      prompt('Press \x1b[1m\x1b[34mENTER\x1b[0m to continue...');
    }
  }
}

mainMenu();