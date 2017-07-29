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


## Tech stack

* browser
* javascript
* [pixi](http://www.pixijs.com/)
  * nine slice plane [docs](http://pixijs.download/release/docs/PIXI.mesh.NineSlicePlane.html)
  * 🔥 normal light mapping [article](http://proclive.io/lights-in-pixi-js/) [repos](https://github.com/finscn/pixi.js)
  * 🔥 deferred shading for lights [example](http://www.goodboydigital.com/pixijs/pixilights/)


## Artwork stack

* graphics (inkscape, graphicsgale and/or gimp, not sure yet)
  * <https://kenney.nl/assets/robot-pack>
  * <https://kenney.nl/assets/platformer-pack-redux>
  * <https://kenney.nl/assets/background-elements>
  * <https://kenney.nl/assets/physics-assets>
  * ...

* sfx??
  * TODO

* music??
  * [aphex twin - not sure licensing](https://aphextwin.warp.net/)


## TODO list

* ~~brainstorm~~
* set up basic engine
* implement game rules
* support for editing level (adding items in-game)
