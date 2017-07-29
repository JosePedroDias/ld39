# Theme

Running out of power


Who we are

* robot/machine
* factory management/maintenance
* human depending on faulty machinery
* the world, trying to aid the character
* we're power itself and we must feed who needs us


What needs to be done

* evacuation going on - need to make machines cope with humans, get somewhere without dying and/or with time limit. think lemmings
  (traffic lights changing, railroad path choosing, bridge placement, place barriers)
  -> heavy work on simulating actors such as cars and people interacting with roads, etc.

* mash vehicles in a way to be efficient with low resources
  -> heavy physics and accurate simulation work, not experienced in this

* simple platformer with a twist in locomotion and/or how its movement gets affected over time/environment
  -> could work but need a simple set of original rules...

* racing game in a post-apocalyptic scenario - we must reach the other side of the city, dodging faulty traffic and scared mobs
  -> heavy work on level generation and maybe on the simulation itself. rad though

* puzzle - setup a circuit such that the level mission is accomplished. think the incredible machine / pipe mania
  -> relatively straightforward to setup the engine. hard to do challenging/original levels

* solve engineering problems. think pontifex
  -> same problems as prev, with harder engine setup

* minimalist racing game. think micromachines
  -> twist is? level design? car design? car response to usage

* platformer with dynamic terrain and grapple hook. think worms/liero
  -> vs fight? lemmings get to somewhere?

* flappy bird with limited fuel (thx @asilva4000 !)
  -> no excuses. basic game engine easy to set up. leaves time for level design, gfx and polish. may go for this one! 


# Classification

Type

* puzzle
* platformer
* fps
* rts
* turn based
* point & click
* racer
* beat 'em up
* sport sym
* infinite runner
* arcade


Levels

* procedurally generated
* designed


Interaction

* keys
* gamepad
* touch
* webcam
* hand
* gyro


Artwork

* 2d tiles
* 2d collisions
* 3D
* 3D voxels


# Tech stack

For the sake of moving fast due to the hackaton time constraints (and not to diverge from the goal of implementing a game)
I find it best to still to technology I know by heart.

So first choice is:
browser / javascript / pixi

Then I could also benefit from fantasy console RAD tools but usage depends on game chose
TIC80/PICO8 / lua or javascript

If I would go for 3D or 2D with physics or basic collisions, I'd choose
