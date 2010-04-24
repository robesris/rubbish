// Global constants
var GAMEBOX_W = 1000;
var GAMEBOX_H = 500;
var NUM_ROWS = 2;
var NUM_COLS = 2;
var REFRESH_RATE = 15;

var SQUARE_W = 30;
var SQUARE_H = SQUARE_W;
var WALL_W = 14;

// Movement directions
var RIGHT = 0;
var DOWN = 1;
var UP = 2;
var LEFT = 3;

// Movement controls
var LEFT_KEY = 65;
var UP_KEY = 87;
var RIGHT_KEY = 68;
var DOWN_KEY = 83;

// Space walls/things
var WALLS = 0;
var THINGS = 1;

// Wall orientations
var HORIZONTAL = 0;
var VERTICAL = 1;

// Wall types
var NONE = 0;
var NORMAL = 1;
var BREAKABLE = 2;

// Thing types
var NOTHING = 0;
var RUBBISH = 1;
var BIN = 2;
var UNDEAD = 3;
var MINOTAUR = 4;
var HEALTHBOX = 5;
var KRATOS = 6;

var NO_WALL_COLOR = "#EEEEEE";

var DEFAULT_KRATOS_MAX_HEALTH = 3;

var currentLevel;

// Hardcoded Level 4 init array
var LEVEL_4 = [[ [[0,0,1,1], [2]], [[0,0,1,0], []], [[0,0,1,0], [1]], [[0,1,1,0], []], [[0,0,1,0], []], [[0,0,1,0], [2]], [[0,0,1,0], []], [[0,0,1,0], []], [[0,0,1,0], [2]], [[1,1,1,0], []], [[1,0,1,0], [1]], [[0,0,1,0], [2]], [[0,0,1,0], [4]], [[1,0,1,0], [4]]], [ [[0,0,0,1], []], [[0,0,0,0], [5]], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[1,0,0,0], [3]], [[0,0,0,0], []], [[0,0,0,0], [3]], [[0,0,0,0], []], [[0,0,0,0], []], [[1,0,0,0], []]], [ [[0,0,0,1], []], [[0,0,0,0], []], [[0,0,0,0], [4]], [[0,0,0,0], []], [[0,0,0,0], [5]], [[0,0,0,0], []], [[0,0,0,0], [4]], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], [3]], [[0,0,0,0], []], [[1,0,0,0], []]], [ [[0,0,0,1], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], [4]], [[0,0,0,0], [1]], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[1,0,0,0], []]], [ [[0,0,0,1], []], [[1,0,0,0], []], [[0,2,0,0], [0]], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], [1]], [[0,0,0,0], [6]], [[0,0,0,0], []], [[0,0,0,0], []], [[1,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], [3]], [[0,0,0,0], []], [[1,2,0,0], []]], [ [[0,0,0,1], []], [[0,0,0,0], [3]], [[0,0,0,0], []], [[0,0,0,0], []], [[0,1,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,1,0,0], []], [[0,0,0,0], []], [[0,2,0,0], [4]], [[0,0,0,0], []], [[0,0,0,0], []], [[1,0,0,0], [1]]], [ [[0,0,0,1], []], [[1,0,0,0], []], [[0,0,0,0], [5]], [[0,0,0,0], []], [[0,0,0,0], []], [[2,0,0,0], []], [[0,0,0,0], [5]], [[0,0,0,0], []], [[0,0,0,0], []], [[0,1,0,0], []], [[1,0,0,0], [2]], [[0,0,0,0], []], [[0,0,0,0], []], [[1,0,0,0], []]], [ [[0,0,0,1], []], [[0,0,0,0], [0]], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], [0]], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,1,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], [3]], [[0,0,0,0], []], [[1,0,0,0], []]], [ [[0,0,0,1], []], [[0,0,0,0], []], [[0,1,0,0], []], [[1,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,1,0,0], []], [[0,0,0,0], []], [[1,0,0,0], [0]], [[0,0,0,0], []], [[0,0,0,0], []], [[0,2,0,0], []], [[0,0,0,0], []], [[1,0,0,0], []]], [ [[0,1,0,1], []], [[0,1,0,0], []], [[1,1,0,0], []], [[0,1,0,0], []], [[0,1,0,0], []], [[0,1,0,0], []], [[0,1,0,0], []], [[1,1,0,0], []], [[0,1,0,0], []], [[0,1,0,0], [3]], [[1,1,0,0], []], [[0,1,0,0], [5]], [[0,1,0,0], []], [[1,1,0,0], []]] ];

// Hardcode an initialization array for a 2 x 2 board
var GAMEBOARD_INIT = new Array(2);
for (r = 0; r < 2; r++)
  GAMEBOARD_INIT[r] = new Array(2);

// Upper-left space
GAMEBOARD_INIT[0][0] = [[0, 0, NORMAL, NORMAL], [KRATOS]];

// Upper-right space
GAMEBOARD_INIT[0][1] = [[NORMAL, NORMAL, NORMAL], [UNDEAD]];

// Lower-left space
GAMEBOARD_INIT[1][0] = [[0, NORMAL, 0, NORMAL], [MINOTAUR]];

// Lower-right space
GAMEBOARD_INIT[1][1] = [[NORMAL, NORMAL], [BIN]];
//////////////////////////////////////////////////////

// Hardcode an alternative layout
var GAMEBOARD_ALT = new Array(2);
for (r = 0; r < 2; r++)
  GAMEBOARD_ALT[r] = new Array(2);

// Upper-left space
GAMEBOARD_ALT[0][0] = [[NORMAL, 0, NONE, 0], []];

// Upper-right space
GAMEBOARD_ALT[0][1] = [[0, 0, 0], [UNDEAD]];

// Lower-left space
GAMEBOARD_ALT[1][0] = [[NORMAL, 0, 0, NONE], [KRATOS]];

// Lower-right space
GAMEBOARD_ALT[1][1] = [[0, 0], [BIN]];
//////////////////////////////////////////////////////

var gameboard;
 
var hwallAnim;
var vwallAnim;
var hbreakWallAnim;
var vbreakWallAnim;
var kratosAnim;
var minotaurAnim;
var undeadAnim;
var rubbishAnim;
var binAnim;
var healthboxAnim;
var initArray;

// Function to initialize the game
function initGame(initArray) {
  $("#info").text(initArray.toString());
  $("#gamebox").empty();
  //$("#game_container").html("<div id='gamebox'></div>");
  $("#gamebox").playground({height: GAMEBOX_H, width: GAMEBOX_W});
  
  rows = initArray.length;
  cols = initArray[0].length;
  currentLevel = new GameLevel(4, rows, cols, 4, gameboard);
  $("#health_value").text(currentLevel.kratosMaxHealth);
  gameboard = new Array(rows);
  for (r = 0; r < rows; r++)
    gameboard[r] = new Array(cols);
  for (r = 0; r < rows; r++) {
    for (c = 0; c < cols; c++) {
      spaceInit = initArray[r][c];
      gameboard[r][c] = new Space(r, c, spaceInit[0].slice(0), spaceInit[1].slice(0));  // Use slice(0) to pass a copy instead of the original
    }
  }
  $.playground().startGame();
}

function newBoard(rows, cols) {
  
  gameArray = new Array(rows);
  for (r = 0; r < rows; r++) {
    oneRow = new Array(cols);
    for (c = 0; c < cols; c++) {
      oneRow[c] = [[NONE, NONE, NONE, NONE], []];  // An empty space with no walls
      if (r == 0) {
        oneRow[c][WALLS][UP] = NORMAL;
      }
      if (r == (rows - 1)) {
        oneRow[c][WALLS][DOWN] = NORMAL;
      }
      if (c == 0) {
        oneRow[c][WALLS][LEFT] = NORMAL;
      }
      if (c == (cols - 1)) {
        oneRow[c][WALLS][RIGHT] = NORMAL;
      }
    }
    gameArray[r] = oneRow;
  }
  
  initGame(gameArray);
}

function getGameboardString() {
  g = "[[";
  for (r = 0; r < gameboard.length; r++) {
    g += " [[";
    for (c = 0; c < (gameboard[r].length); c++) {
      // walls
      g += gameboard[r][c].walls.toString() + "], [";
      
      // things
      g += gameboard[r][c].things.toString() + "]]";
      if (c < (gameboard[r].length - 1)) {
        g += ", [[";
      }
    }
    g += "]";
    if (r < (gameboard.length - 1)) {
      g += ", ["
    }
  }
  g += " ]"
  return g;
}

function restartGame() {
  window.location.reload();
}

// Toggle (edit) walls on and off
function toggleWall(row, col, direction) {
  space = gameboard[row][col];
  node = $("#wall_" + row + "_" + col + "_" + direction);
  $("#info").text(space.walls[direction]);
  switch (space.walls[direction]) {
    case NONE:
    case null:
    case undefined:
      switch ($("input[name='walltype']:checked").val()) {
        case "normal":
          wallType = NORMAL;
          vAnim = vwallAnim;
          hAnim = hwallAnim;
          break;
        case "breakable":
          wallType = BREAKABLE;
          vAnim = vbreakWallAnim;
          hAnim = hbreakWallAnim;
          break;
      }
      space.walls[direction] = wallType;
      if (direction == LEFT || direction == RIGHT) {
        node.setAnimation(vAnim);
      } else {
        node.setAnimation(hAnim);
      }  
      break;
    default:
      space.walls[direction] = NONE;
      node.setAnimation(null);
      node.css("background-color", NO_WALL_COLOR);
      break;
  }
}

function addThingSprite(name, animation, space) {
  $.playground().addSprite(name, {animation: animation,
                                        posx: space.l,
                                        posy: space.t,
                                        height: SQUARE_H,
                                        width: SQUARE_W});
}

function addThing(identifier, space) {
  switch(identifier) {
    case KRATOS:
      thingName = "kratos";
      thingAnim = kratosAnim;
      break;
    case RUBBISH:
      thingName = "rubbish";
      thingAnim = rubbishAnim;
      currentLevel.rubbishRemaining++;
      break;
    case BIN:
      thingName = "bin";
      thingAnim = binAnim;
      break;
    case UNDEAD:
      thingName = "undead";
      thingAnim = undeadAnim;
      break;
    case MINOTAUR:
      thingName = "minotaur";
      thingAnim = minotaurAnim;
      break;
    case HEALTHBOX:
      thingName = "healthbox";
      thingAnim = healthboxAnim;
      break;
    default:
      thingName = "nothing";
      thingAnim = null
      break;
  }
  
  thingName += "_" + space.row + "_" + space.col;
  if (identifier == KRATOS) {
    addThingSprite(thingName, thingAnim, space);
    kratos = new Kratos("#" + thingName, space);     // There can be only one!
    kratos.node.css("z-index", 10);
  } else {
    addThingSprite(thingName, thingAnim, space);
  }
  space.things[0] = identifier;
}

function getThingTypeText(thingType) {
  switch (thingType) {
    case UNDEAD:
      return "undead";
      break;
    case MINOTAUR:
      return "minotaur";
      break;
    case RUBBISH:
      return "rubbish";
      break;
    case BIN:
      return "bin";
      break;
    case HEALTHBOX:
      return "healthbox";
      break;
    case KRATOS:
      return "kratos";
      break;
  }
}

function removeThing(space) {
  nodeName = getThingTypeText(space.things[0]) + "_" + space.row + "_" + space.col;
  $("#info").text("remove: " + nodeName);
  node = $("#" + nodeName);
  node.remove();
  space.things[0] = NOTHING;
}

// Toggle (edit) the thing in the space
function toggleThing(row, col) {
  space = gameboard[row][col];
  baseThingName = $("input[name='thingtype']:checked").val();
  $("#info").text("ToggleThing: " + row + " " + col + " " + baseThingName + " " + space.things.toString());
  
  switch (space.things[0]) {
    case NOTHING:
    case null:
    case undefined:
      switch (baseThingName) {
        case "undead":
          addThing(UNDEAD, space);
          break;
        case "minotaur":
          addThing(MINOTAUR, space);
          break;
        case "rubbish":
          addThing(RUBBISH, space);
          break;
        case "bin":
          addThing(BIN, space);
          break;
        case "healthbox":
          addThing(HEALTHBOX, space);
          break;
        case "kratos":
          addThing(KRATOS, space);
          break;
      }
      break;
    default:
      removeThing(space);
      break;
  }
}
 

  
// Kratos!
var kratos;

function GameLevel(levelNum, rows, cols, kratosMaxHealth, gameboard) {
  this.levelNum = levelNum;
  this.rows = rows;
  this.cols = cols;
  this.gameboard = gameboard;
  this.rubbishRemaining = 0;
  
  if (kratosMaxHealth == undefined) {
    kratosMaxHealth = DEFAULT_KRATOS_MAX_HEALTH;
  } else {
    this.kratosMaxHealth = kratosMaxHealth;
  }
}

function Kratos(node, space) {
  this.MOVEMENT_RATE = 1;
  this.node = $(node);
  this.space = space;
  this.rubbishHeld = 0;
  this.minotaurEffect = false;
  this.validMoves = [true, true, true, true];
  this.maxHealth = currentLevel.kratosMaxHealth;
  this.health = this.maxHealth;  
}
Kratos.prototype.move = function(direction) {
  keepMoving = true;
  
  while (keepMoving) {
    // Check to make sure we can move in the chosen direction
    if (this.validMoves[direction] == false) {
      keepMoving = false;
    } else {
      // Remove minotaur effect
      this.minotaurEffect = false;
      this.validMoves = [true, true, true, true]; // Regain all valid moves if we didn't end on a minotaur
      
      // Handle any things on the space
      switch (this.space.things[0]) {
        case UNDEAD:
          this.health--;
          if (this.health > 0) {
            $("#health_value").text(this.health);
            removeThing(this.space);
          } else {
            $("#health_value").text("YOU ARE DEAD");
          }
          break;
        case RUBBISH:
          if (this.rubbishHeld == 0) {
            removeThing(this.space);
            this.rubbishHeld++;
            $("#rubbish_carried").text(this.rubbishHeld);
          }
          break;
        case BIN:
          if (this.rubbishHeld > 0) {
            this.rubbishHeld--;
            currentLevel.rubbishRemaining--;
            if (currentLevel.rubbishRemaining == 0) {
              $("#health_value").text("YOU WIN!");
            }
            $("#rubbish_carried").text(this.rubbishHeld);
          }
          break;
        case HEALTHBOX:
          removeThing(this.space);
          this.health = this.maxHealth;
          $("#health_value").text(this.health);
          break;
        case MINOTAUR:
          this.health -= 2;
          this.minotaurEffect = true;
          if (this.health > 0) {
            $("#health_value").text(this.health);
            removeThing(this.space);
            keepMoving = false;
            switch(direction) {
              case LEFT:
              case RIGHT:
                this.validMoves[LEFT] = false;
                this.validMoves[RIGHT] = false;
                break;
              case UP:
              case DOWN:
                this.validMoves[UP] = false;
                this.validMoves[DOWN] = false;
                break;
            }
          } else {
            $("#health_value").text("YOU ARE DEAD");
          }
          break;
      }
    }
  
    if(keepMoving) {
    
      // Check for a wall or the edge of the board in the chosen direction
      switch (this.space.wall(direction)) {
        case NORMAL:
          keepMoving = false;
          break;
        case BREAKABLE:
          keepMoving = false;
          this.space.breakWall(direction);    // break the wall
          break;
        default:
          switch(direction) {
            case RIGHT:
              if (this.space.col < (currentLevel.cols - 1)) {

                this.space = gameboard[this.space.row][this.space.col + 1];
                newPosx = this.space.l;
                this.node.css("left", "" + newPosx + "px");

              }
              break;
            case LEFT:
              if (this.space.col > 0) {
                this.space = gameboard[this.space.row][this.space.col - 1];
                newPosx = this.space.l;
                this.node.css("left", "" + newPosx + "px");
              }
              break;
            case DOWN:
              if (this.space.row < (currentLevel.rows - 1)) {
                $('#info').text("Kratos down: " + this.space.row + " " + this.space.col);
                this.space = gameboard[this.space.row + 1][this.space.col];
                newPosy = this.space.t;
                this.node.css("top", "" + newPosy + "px");
              }
              break;
            case UP:
              if (this.space.row > 0) {
                $('#info').text("Kratos up: " + this.space.row + " " + this.space.col);
                this.space = gameboard[this.space.row - 1][this.space.col];
                newPosy = this.space.t;
                this.node.css("top", "" + newPosy + "px");
              }
              break;
          }
          break;
      }
    } // if (keepMoving)
  }
}



// Wall class  -- DO I NEED THIS?
function Wall(node, space, side, wallType) {
  this.node = $(node);
  this.space1 = space;
  this.wallType = wallType;
  switch(side) {
    case UP:
      if (space.row > 0) {
        this.space2 = gameboard[space.row - 1][space.col]; // bottom wall of this space
      }
      break;
    case DOWN:
      if (space.row < (NUM_ROWS - 1)) {
        this.space2 = gameboard[space.row + 1][space.col]; // top wall of this space
      }
      break;
    case LEFT:
      if (space.col > 0) {
        this.space2 = gameboard[space.row][space.col - 1]; // right wall of this space
      }
      break;
    case RIGHT:
      if (space.col < (NUM_COLS - 1)) {
        this.space2 = gameboard[space.row][space.col + 1]; // left wall of this space
      }
      break;
    default:
      this.space2 = null;
      break;
  }
}

// Space class
function Space(row, col, walls, things) {
  this.row = row;
  this.col = col;
  this.l = WALL_W + (col * (WALL_W + SQUARE_W));  // Left side
  this.t = WALL_W + (row * (WALL_W + SQUARE_H));  // Top side
  this.r = this.l + SQUARE_W;                     // Right side
  this.b = this.t + SQUARE_H;                     // Bottom side
  this.walls = walls;
  this.things = things;

  // Add a sprite for the space
  spaceNodeName = "space_" + this.row + "_" + this.col;
  $.playground().addSprite(spaceNodeName, {animation: null, 
                                            posx: this.l, 
                                            posy: this.t, 
                                            width: SQUARE_W, 
                                            height: SQUARE_H});
  $("#" + spaceNodeName).css("z-index", 20);
  $("#" + spaceNodeName).attr("onClick", "javascript:toggleThing(" + this.row + ", " + this.col + ")");

  // Build walls
  maxWall = DOWN;
  if (row == 0) maxWall = UP;
  if (col == 0) maxWall = LEFT;
  for (direction = RIGHT; direction <= maxWall; direction++) {
    nodeName = "wall_" + r + "_" + c + "_" + direction;

    switch (direction) {
      case RIGHT:
        animation = wallAnims[VERTICAL][this.walls[direction]];
        posx = this.r;
        posy = this.t;
        width = WALL_W;
        height = SQUARE_H;
        break;
      case DOWN:
        animation = wallAnims[HORIZONTAL][this.walls[direction]];
        posx = this.l;
        posy = this.b;
        width = SQUARE_W;
        height = WALL_W;
        break;
      case UP:
        animation = wallAnims[HORIZONTAL][this.walls[direction]];
        posx = this.l;
        posy = this.t - WALL_W;
        width = SQUARE_W;
        height = WALL_W;
        break;
      case LEFT:
        animation = wallAnims[VERTICAL][this.walls[direction]];
        posx = this.l - WALL_W;
        posy = this.t;
        width = WALL_W;
        height = SQUARE_H;
        break;
    }
    
    $.playground().addSprite(nodeName, {animation: animation, posx: posx, posy: posy, width: width, height: height});
    $("#" + nodeName).css("background-color", NO_WALL_COLOR);
    $("#" + nodeName).attr("onClick", "javascript:toggleWall(" + this.row + ", " + this.col + ", " + direction + ");");
  }
  
  // Add objects
  for (o = 0; o < this.things.length; o++) {
    addThing(things[o], this);
  }
}
Space.prototype.wall = function(direction) {
  switch (direction) {
    case RIGHT:
    case DOWN:
      return this.walls[direction];   // The wall we're looking for actually belongs to this space
      break;
    case UP:
      if (this.row == 0) {
        return this.walls[direction];   // Only the first row holds its own top walls
      } else {
        return gameboard[this.row - 1][this.col].walls[DOWN];   // Otherwise get the BOTTOM wall of the previous row
      }
      break;
    case LEFT:
      if (this.col == 0) {
        return this.walls[direction];   // Only the first column holds its own left walls
      } else {
        return gameboard[this.row][this.col - 1].walls[RIGHT];    // Otherwise get the RIGHT wall of the previous col
      }
      break;
  }
}

Space.prototype.breakWall = function(direction) {
  switch (direction) {
    case RIGHT:
    case DOWN:
      this.walls[direction] = NONE;   // The wall we're looking for actually belongs to this space
      $("#wall_" + this.row + "_" + this.col + "_" + direction).remove();
      break;
    case UP:
      if (this.row == 0) {
        this.walls[direction] = NONE;   // Only the first row holds its own top walls
        $("#wall_" + this.row + "_" + this.col + "_" + direction).remove();
      } else {
        gameboard[this.row - 1][this.col].walls[DOWN] = NONE;   // Otherwise get the BOTTOM wall of the previous row
        $("#wall_" + (this.row - 1) + "_" + this.col + "_" + DOWN).remove();
      }
      break;
    case LEFT:
      if (this.col == 0) {
        this.walls[direction] = NONE;   // Only the first column holds its own left walls
        $("#wall_" + this.row + "_" + this.col + "_" + direction).remove();
      } else {
        gameboard[this.row][this.col - 1].walls[RIGHT] = NONE;    // Otherwise get the RIGHT wall of the previous col
        $("#wall_" + this.row + "_" + (this.col - 1) + "_" + RIGHT).remove();
      }
      break;
  }
}
  
  
$(function() {
  // Animations (not really animated, but all graphics are "animations")
  hwallAnim = new $.gameQuery.Animation({imageURL: "horizontal_wall.png"});
  vwallAnim = new $.gameQuery.Animation({imageURL: "vertical_wall.png"});
  hbreakWallAnim = new $.gameQuery.Animation({imageURL: "horizontal_breakable_wall.png"});
  vbreakWallAnim = new $.gameQuery.Animation({imageURL: "vertical_breakable_wall.png"});
  minotaurAnim = new $.gameQuery.Animation({imageURL: "minotaur.png"});
  undeadAnim = new $.gameQuery.Animation({imageURL: "undead.png"});
  rubbishAnim = new $.gameQuery.Animation({imageURL: "rubbish.png"});  
  binAnim = new $.gameQuery.Animation({imageURL: "bin.png"});
  healthboxAnim = new $.gameQuery.Animation({imageURL: "healthbox.png"});

  wallAnims = [[null, hwallAnim, hbreakWallAnim], [null, vwallAnim, vbreakWallAnim]];
  kratosAnim = new $.gameQuery.Animation({imageURL: "kratos.png"});  

  
  // Controls
  $(document).keydown(function(e){
    switch(e.keyCode){
      case LEFT_KEY:
        kratos.move(LEFT);
        break;
      case UP_KEY:
        $('#info').text("Pressed up");
        kratos.move(UP);
        break;
      case RIGHT_KEY:
        kratos.move(RIGHT);
        break;
      case DOWN_KEY:
      $('#info').text("Pressed down");
        kratos.move(DOWN);
        break;
    }
  });
  
  //initGame([[ [[0,0,1,1], []], [[0,0,1,0], []], [[0,0,1,0], []], [[0,0,1,0], []], [[0,0,1,0], []], [[0,0,1,0], []], [[0,0,1,0], []], [[0,0,1,0], []], [[0,0,1,0], []], [[0,0,1,0], []], [[0,0,1,0], []], [[0,0,1,0], []], [[0,0,1,0], []], [[1,0,1,0], []]], [ [[0,0,0,1], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[1,0,0,0], []]], [ [[0,0,0,1], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[1,0,0,0], []]], [ [[0,0,0,1], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[1,0,0,0], []]], [ [[0,0,0,1], []], [[0,0,0,0], []], [[0,0,0,0], [3]], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[1,0,0,0], []]], [ [[0,0,0,1], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[1,0,0,0], []]], [ [[0,0,0,1], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[1,0,0,0], []]], [ [[0,0,0,1], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[1,0,0,0], []]], [ [[0,0,0,1], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[0,0,0,0], []], [[1,0,0,0], []]], [ [[0,1,0,1], []], [[0,1,0,0], []], [[0,1,0,0], []], [[0,1,0,0], []], [[0,1,0,0], []], [[0,1,0,0], []], [[0,1,0,0], []], [[0,1,0,0], []], [[0,1,0,0], []], [[0,1,0,0], []], [[0,1,0,0], []], [[0,1,0,0], []], [[0,1,0,0], []], [[1,1,0,0], []]] ]);
  initGame(LEVEL_4);
  //initGame(GAMEBOARD_INIT);
  //$.playground().startGame();

});
