# LD39 - Soaring

This is a Ludum Dare 39 game jam entry.


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

* graphics
  * used [blender3D](https://www.blender.org/), [inkscape](https://inkscape.org/),  [gimp](https://www.gimp.org/) and generated some procedural textures with [tg](http://blackpawn.com/dev/tg.html)
  * the background sky and a couple of pill sprites came up from kenney.nl, didn't manage to replace those in time :P

* sfx and music

  full credits to [@asilva4000](https://twitter.com/asilva4000)

  composed with [reason](https://www.propellerheads.se/en/reason)

  audio encoding with [xmedia recode](http://www.xmedia-recode.de/download.html)

## some references

* <https://github.com/kittykatattack/learningPixi>

## TODO list

* ~~brainstorm~~
* ~~set up basic engine~~
  * ~~renders sprites~~
  * ~~touch support~~
  * ~~music and sfx playback~~
  * ~~level loading~~
  * ~~keep aspect ratio and viewport independent of screen~~
* implement game rules
  * ~~xx constant movement~~
  * ~~impulse~~
  * ~~texture loading~~
  * ~~basic box collision support~~
  * ~~pick up coin~~
  * ~~gas tank logic~~
* ~~tiling bg~~
* ~~animated items (coins etc)~~
* ~~start screen > play > game over | pause states~~
* ~~compress audio to howler compatible formats~~
* ~~request fs and avoid double events~~
* ~~reset time on game over~~
* ~~level transition~~
* ~~highscores (displayed on game over)~~
* ~~pitch ship according to y speed (requires improved collision det)~~
* ~~graphics made with blender, tg (procedural) and gimp~~
* ~~prepare publish~~

MAYBE
* animate title screen
* toggle sfx and audio (persist to LS) -> done. still no way of toggling
* google analytics, if time permits

DOUBT IT
* review cleanup (ex: sprite.destroy())
* implement and add power-ups
* particle effects
* additional backgrounds with different parallax?
