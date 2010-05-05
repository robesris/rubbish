// Global constants
var GAMEBOX_W = 1000;
var GAMEBOX_H = 1000;
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

var DEFAULT_KRATOS_MAX_HEALTH = 3;

var currentLevel;
var gameboard;
var initArray;

// Visual Elements
var NO_WALL_COLOR = "#EEEEEE";
var INTERVAL = 1        // Number of milliseconds between calls to move animation function
var KRATOS_MOVE_RATE = 10  // Number of pixels Kratos moves each interval
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

// Function to initialize the game
function initGame(initArray, editable, kratosMaxHealth) {
  $("#info").text(initArray.toString());
  $("#gamebox").empty();
  $("#gamebox").playground({height: GAMEBOX_H, width: GAMEBOX_W});
  
  rows = initArray.length;
  cols = initArray[0].length;
  currentLevel = new GameLevel(null, rows, cols, kratosMaxHealth, gameboard);
  if (editable != undefined) {
    currentLevel.editMode = editable;
  }
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

function newBoard(rows, cols, editable) {
  
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
  
  initGame(gameArray, editable, 3);
}

function getGameboardString() {
  g = new Array(currentLevel.rows);
  for (r = 0; r < currentLevel.rows; r++) {
    g[r] = new Array(currentLevel.cols);
    for (c = 0; c < currentLevel.cols; c++) {
      oneSpace = new Array(2);
      oneSpace[WALLS] = gameboard[r][c].walls.slice(0); // copy of walls array
      oneSpace[THINGS] = gameboard[r][c].things.slice(0); // copy of things array
      g[r][c] = oneSpace;
    }
  }
  
  return JSON.stringify(g);
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
  this.editMode = false;
  
  if (kratosMaxHealth == undefined) {
    kratosMaxHealth = DEFAULT_KRATOS_MAX_HEALTH;
  } else {
    this.kratosMaxHealth = kratosMaxHealth;
  }
}

function Kratos(node, space) {
  this.movement_rate = KRATOS_MOVE_RATE;
  this.node = $(node);
  this.space = space;
  this.rubbishHeld = 0;
  this.minotaurEffect = false;
  this.validMoves = [true, true, true, true];
  this.keepMoving = false;
  this.maxHealth = currentLevel.kratosMaxHealth;
  this.health = this.maxHealth;
}
Kratos.prototype.move = function(direction) {
  kratos.keepMoving = true;
  
  // Check if Kratos' sprite is not exactly on the space
  if (kratos.node.css("left") == kratos.space.node.css("left") && kratos.node.css("top") == kratos.space.node.css("top")) {
    //while (kratos.keepMoving) {  -- only need to do this once per callback
      // Check to make sure we can move in the chosen direction
      if (kratos.validMoves[direction] == false || kratos.health <= 0) {
        kratos.keepMoving = false;
      } else {
        // Remove minotaur effect
        kratos.minotaurEffect = false;
        kratos.validMoves = [true, true, true, true]; // Regain all valid moves if we didn't end on a minotaur
      
        // Handle any things on the space
        switch (kratos.space.things[0]) {
          case UNDEAD:
            kratos.health--;
            if (kratos.health > 0) {
              $("#health_value").text(kratos.health);
              removeThing(kratos.space);
            } else {
              $("#health_value").text("YOU ARE DEAD");
            }
            break;
          case RUBBISH:
            if (kratos.rubbishHeld == 0) {
              removeThing(kratos.space);
              kratos.rubbishHeld++;
              $("#rubbish_carried").text(kratos.rubbishHeld);
            }
            break;
          case BIN:
            if (kratos.rubbishHeld > 0) {
              kratos.rubbishHeld--;
              currentLevel.rubbishRemaining--;
              if (currentLevel.rubbishRemaining == 0) {
                $("#health_value").text("YOU WIN!");
              }
              $("#rubbish_carried").text(kratos.rubbishHeld);
            }
            break;
          case HEALTHBOX:
            removeThing(kratos.space);
            kratos.health = kratos.maxHealth;
            $("#health_value").text(kratos.health);
            break;
          case MINOTAUR:
            kratos.health -= 2;
            kratos.minotaurEffect = true;
            if (kratos.health > 0) {
              $("#health_value").text(kratos.health);
              removeThing(kratos.space);
              kratos.keepMoving = false;
              switch(direction) {
                case LEFT:
                case RIGHT:
                  kratos.validMoves[LEFT] = false;
                  kratos.validMoves[RIGHT] = false;
                  break;
                case UP:
                case DOWN:
                  kratos.validMoves[UP] = false;
                  kratos.validMoves[DOWN] = false;
                  break;
              }
            } else {
              $("#health_value").text("YOU ARE DEAD");
            }
            break;
        }
      }
  
      if(kratos.keepMoving) {
    
        // Check for a wall or the edge of the board in the chosen direction
        switch (kratos.space.wall(direction)) {
          case NORMAL:
            kratos.keepMoving = false;
            break;
          case BREAKABLE:
            kratos.keepMoving = false;
            kratos.space.breakWall(direction);    // break the wall
            break;
          default:
            switch(direction) {
              case RIGHT:
                if (kratos.space.col < (currentLevel.cols - 1)) {

                  kratos.space = gameboard[kratos.space.row][kratos.space.col + 1];
                  //newPosx = kratos.space.l;
                  //kratos.node.css("left", "" + newPosx + "px");

                }
                break;
              case LEFT:
                if (kratos.space.col > 0) {
                  kratos.space = gameboard[kratos.space.row][kratos.space.col - 1];
                  //newPosx = kratos.space.l;
                  //kratos.node.css("left", "" + newPosx + "px");
                }
                break;
              case DOWN:
                if (kratos.space.row < (currentLevel.rows - 1)) {
                  $('#info').text("Kratos down: " + kratos.space.row + " " + kratos.space.col);
                  kratos.space = gameboard[kratos.space.row + 1][kratos.space.col];
                  //newPosy = kratos.space.t;
                  //kratos.node.css("top", "" + newPosy + "px");
                }
                break;
              case UP:
                if (kratos.space.row > 0) {
                  $('#info').text("Kratos up: " + kratos.space.row + " " + kratos.space.col);
                  kratos.space = gameboard[kratos.space.row - 1][kratos.space.col];
                  //newPosy = kratos.space.t;
                  //kratos.node.css("top", "" + newPosy + "px");
                }
                break;
            }
            break;
        }
      } // if (kratos.keepMoving)
      return (!kratos.keepMoving); // Keep animating sprite as long as kratos.keepMoving is true (i.e. return value of kratos callback is false)
    //} // while (kratos.keepMoving)
  } else {
  
    // Kratos' sprite needs to keep moving
    position = kratos.node.position();
    switch(direction) {
      case UP:
        if (position.top - kratos.movement_rate >= kratos.space.node.position().top) {
          kratos.node.css("top", position.top -= kratos.movement_rate);
        } else {
          kratos.node.css("top", kratos.space.node.position().top);
        }
        break;
      case DOWN:
        if (position.top + kratos.movement_rate <= kratos.space.node.position().top) {
          kratos.node.css("top", position.top += kratos.movement_rate);
        } else {
          kratos.node.css("top", kratos.space.node.position().top);
        }
        break;
      case LEFT:
        if (position.left - kratos.movement_rate >= kratos.space.node.position().left) {
          kratos.node.css("left", position.left -= kratos.movement_rate);
        } else {
          kratos.node.css("left", kratos.space.node.position().left);
        }
        break;
      case RIGHT:
        if (position.left + kratos.movement_rate <= kratos.space.node.position().left) {
          kratos.node.css("left", position.left += kratos.movement_rate);
        } else {
          kratos.node.css("left", kratos.space.node.position().left);
        }
        break;
    }
    return false;
  
  

  } // if (kratos.node.css("left") != kratos.space.node.css("left") || kratos.node.css("top") != kratos.node.space.css("top"))
}
function moveUp() { return kratos.move(UP); }
function moveDown() { return kratos.move(DOWN); }
function moveRight() { return kratos.move(RIGHT); }
function moveLeft() { return kratos.move(LEFT); }

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
  if (currentLevel.editMode == true) {
    $("#" + spaceNodeName).attr("onClick", "javascript:toggleThing(" + this.row + ", " + this.col + ")");
  }
  this.node = $("#" + spaceNodeName);
  
  // Build walls
  activeWalls = [this.walls[RIGHT], this.walls[DOWN], null, null];   // Usually we won't do anything with the up and left walls
  maxWall = DOWN;
  if (row == 0) {
    maxWall = UP;
    activeWalls[UP] = this.walls[UP];
  }
  if (col == 0) {
    maxWall = LEFT;
    activeWalls[LEFT] = this.walls[LEFT];
  }
  for (direction = RIGHT; direction <= maxWall; direction++) {
    if (activeWalls[direction] != null) {
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
      if (currentLevel.editMode == true) {
        $("#" + nodeName).attr("onClick", "javascript:toggleWall(" + this.row + ", " + this.col + ", " + direction + ");");
      }
    }
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
  
  

