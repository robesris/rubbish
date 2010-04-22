// Global constants
var GAMEBOX_W = 500;
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

// Wall orientations
var HORIZONTAL = 0;
var VERTICAL = 1;

// Wall types
var NONE = 0;
var NORMAL = 1;
var BREAKABLE = 2;

// Thing types
var RUBBISH = 1;
var BIN = 2;
var UNDEAD = 3;
var MINOTAUR = 4;
var HEALTHBOX = 5;
var KRATOS = 6;

var NO_WALL_COLOR = "#EEEEEE";

// Hardcode an initialization array for a 2 x 2 board
var GAMEBOARD_INIT = new Array(2);
for (r = 0; r < 2; r++)
  GAMEBOARD_INIT[r] = new Array(2);

// Upper-left space
GAMEBOARD_INIT[0][0] = [[0, 0, NORMAL, NORMAL], [KRATOS]];

// Upper-right space
GAMEBOARD_INIT[0][1] = [[NORMAL, NORMAL, NORMAL], [UNDEAD]];

// Lower-left space
GAMEBOARD_INIT[1][0] = [[0, NORMAL, 0, NORMAL], []];

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
var kratosAnim;
var initArray;
// Function to initialize the game
function initGame(initArray) {
  $("#info").text(initArray.toString());
  $("#gamebox").empty();
  //$("#game_container").html("<div id='gamebox'></div>");
  $("#gamebox").playground({height: GAMEBOX_H, width: GAMEBOX_W});

  rows = initArray.length;
  cols = initArray[0].length;
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
      space.walls[direction] = NORMAL;
      if (direction == LEFT || direction == RIGHT) {
        node.setAnimation(vwallAnim);
      } else {
        node.setAnimation(hwallAnim);
      }  
      break;
    default:
      space.walls[direction] = NONE;
      node.setAnimation(null);
      node.css("background-color", NO_WALL_COLOR);
      break;
  }

}
 

  
// Kratos!
var kratos;

// Game objects
function Kratos(node, space) {
  this.MOVEMENT_RATE = 1;
  this.node = $(node);
  this.space = space;
  this.rubbishHeld = 0;
  this.validMoves = [UP, DOWN, LEFT, RIGHT];
  this.maxHealth = 3;
  this.health = this.maxHealth;  
}
Kratos.prototype.move = function(direction) {
  
  switch(direction) {
    case RIGHT:
      if (this.space.col < (NUM_COLS - 1)) {
        // newSpace = gameboard[this.space.row][this.space.col + 1];
        // newPosx = this.space.l;
        // while (newPosx < newSpace.l) {
        //   newPosx += this.MOVEMENT_RATE;
        //   if (newPosx > newSpace.l) {
        //     newPosx = newSpace.l;
        //   }
        //   this.node.css("left", "" + newPosx + "px");
        // }
        // 
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
      if (this.space.row < (NUM_ROWS - 1)) {
        this.space = gameboard[this.space.row + 1][this.space.col];
        newPosy = this.space.t;
        this.node.css("top", "" + newPosy + "px");
      }
      break;
    case UP:
      if (this.space.row > 0) {
        this.space = gameboard[this.space.row - 1][this.space.col];
        newPosy = this.space.t;
        this.node.css("top", "" + newPosy + "px");
      }
      break;
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
        kratosName = "kratos";
        addThingSprite(kratosName, kratosAnim, space);
        kratos = new Kratos("#" + kratosName, space);
        break;
    }
    
    
  }

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
  
  // // -- Right Wall
  //     if (walls[RIGHT] == NORMAL) {
  //       nodeName = "wall_" + r + "_" + c + "_" + RIGHT;
  //       $.playground().addSprite(nodeName, {animation: vwallAnim,
  //                                           posx: this.r,
  //                                           posy: this.t,
  //                                           width: WALL_W,
  //                                           height: SQUARE_H});
  //       $("#" + nodeName).attr("onClick", "javascript:toggleWall(" + this.row + ", " + this.col + ", " + RIGHT + ");");
  //     }
  //     
  //     // -- Bottom Wall
  //     if (walls[DOWN] == NORMAL) {
  //       nodeName = "wall_" + r + "_" + c + "_" + DOWN;
  //       $.playground().addSprite(nodeName, {animation: hwallAnim,
  //                                           posx: this.l,
  //                                           posy: this.b,
  //                                           width: SQUARE_W,
  //                                           height: WALL_W});
  //       $("#" + nodeName).attr("onClick", "javascript:toggleWall(" + this.row + ", " + this.col + ", " + DOWN + ");");
  //     }
  //     
  //     // -- Top Wall - only the top row worries about this
  //     if (row == 0 && walls[UP] == NORMAL) {
  //       nodeName = "wall_" + r + "_" + c + "_" + UP;
  //       $.playground().addSprite(nodeName, {animation: hwallAnim,
  //                                            posx: this.l,
  //                                            posy: this.t - WALL_W,
  //                                            width: SQUARE_W,
  //                                            height: WALL_W});
  //       $("#" + nodeName).attr("onClick", "javascript:toggleWall(" + this.row + ", " + this.col + ", " + UP + ");");
  //     }
  //     
  //     // -- Left Wall - only the left column worries about this
  //     if (col == 0 && walls[LEFT] == NORMAL) {
  //       nodeName = "wall_" + r + "_" + c + "_" + LEFT;
  //       $.playground().addSprite(nodeName, {animation: vwallAnim,
  //                                           posx: this.l - WALL_W,
  //                                           posy: this.t,
  //                                           width: WALL_W,
  //                                           height: SQUARE_H});
  //       $("#" + nodeName).attr("onClick", "javascript:toggleWall(" + this.row + ", " + this.col + ", " + LEFT + ");");
  //     }
  
  
  
  // Add objects
  for (o = 0; o < things.length; o++) {
    addThing(things[o], this);
  }
}
  
  
$(function() {
  // Animations (not really animated, but all graphics are "animations")
  hwallAnim = new $.gameQuery.Animation({imageURL: "horizontal_wall.png"});
  vwallAnim = new $.gameQuery.Animation({imageURL: "vertical_wall.png"});
  hbreakWallAnim = new $.gameQuery.Animation({imageURL: "horizontal_breakable_wall.png"});
  vbreakWallAnim = new $.gameQuery.Animation({imageURL: "vertical_breakable_wall.png"});

  wallAnims = [[null, hwallAnim, hbreakWallAnim], [null, vwallAnim, vbreakWallAnim]];
  kratosAnim = new $.gameQuery.Animation({imageURL: "kratos.png"});  

  
  // Controls
  $(document).keydown(function(e){
    switch(e.keyCode){
      case LEFT_KEY:
        kratos.move(LEFT);
        break;
      case UP_KEY:
        kratos.move(UP);
        break;
      case RIGHT_KEY:
        kratos.move(RIGHT);
        break;
      case DOWN_KEY:
        kratos.move(DOWN);
        break;
    }
  });
  

  initGame(GAMEBOARD_INIT);
  $.playground().startGame();

});
