# LD39 - gas it up


This is my Ludum Dare 39 compo entry.


## Game summary

  * rules
    * 1HP, must pick fuel periodically (in tough spots) and may pick coins
    * constant player movement in XX
    * vertical impulses to keep ship above ground

  * items
    * gas (required to keep gas level above 0 else game over)
    * coins (best effort. catching all in a level unlocks full level completion)
    * power ups

  * score
    * survived game time and picked coins

  * obstacles
    * static platforms
    * moving platforms (recurring movement/rotation)
      * gates opening/closing
      * rotating elements

  * item placement
    * items can be static, but also tied to platforms and or with assigned paths (if so, one must grasp them fast otherwise too hard)

  * enemies (not sure these are necessary given the game constraints, only relevant if we can affect them in some way)
    * classic patrolling movement around point
    * sine wave movement à là r-type

  * power ups
    * invincible
    * speed up/down XX speed
    * power up centers camera ahead of player, allowing to see more of the level
    * rotate the camera (harder to reason about)
    * kill visible enemies
    * kill destructible obstacles (are these any of these?)
    * invert YY gravity

  * game appearance / vibe
    * average/poor art, best effort (most likely)
    * crude solids with vibrant colors (geometry dash)
    * dramatic with normal lights


  * nice to haves
    * decent sprites (may drop compo to jam and use artwork from elsewhere such as [kenney](https://kenney.nl/assets))
    * music (either: none, use free licensed, from a friend - therefore jam)
    * sfx (might do with simple generators since the theme is simple enough)
    * lighting as an obstacle (would require sprites to have )


## Supported browsers

* tested / targetted
  * android chrome
  * mobile safari (iphone/ipad)
* best effort
  * chrome, safari


## Tech stack

* browser and javascript
* 2D gfx with [pixi](http://www.pixijs.com/)
* collision detection with [bump](https://github.com/kittykatattack/bump)
* audio with [howler](https://howlerjs.com/) [docs](https://github.com/goldfire/howler.js#documentation)


## Artwork stack

* graphics (inkscape, graphicsgale and/or gimp, not sure yet)
  * <> jumper pack - item/coins
  * <https://kenney.nl/assets/platformer-pack-redux>
  * <https://kenney.nl/assets/background-elements>
  * <https://kenney.nl/assets/physics-assets>
  * <https://kenney.nl/assets/space-shooter-redux> - item/pills
  * <> shooting gallery - bg/*
  * ...

* sfx
  * [bfxr](http://www.bfxr.net/)

* music??
  * [8 bit detective (placeholder)](https://www.dl-sounds.com/royalty-free/8-bit-detective/)
  * [aphex twin - not sure licensing](https://aphextwin.warp.net/)


## some references

* <https://github.com/kittykatattack/learningPixi>

## TODO list

* ~~brainstorm~~
* set up basic engine
  * ~~renders sprites~~
  * ~~touch support~~
  * ~~music and sfx playback~~
  * ~~level loading~~
  * keep aspect ratio and viewport independent of screen
* implement game rules
  * ~~xx constant movement~~
  * ~~impulse~~
  * ~~texture loading~~
  * ~~basic box collision support~~
  * pick up coin
  * gas tank
* support for editing level (adding items in-game)
